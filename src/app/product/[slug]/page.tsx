import type { Metadata } from "next";
import { notFound } from "next/navigation";
import atlas from "@/components/atlas-sections.module.css";
import {
  DeepPageHero,
  NextChapter,
  ScreenshotStage,
} from "@/components/deep-page";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { getProductPage, productPages } from "@/data/product-pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return productPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getProductPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.eyebrow.replace(" + ", " & "),
    description: page.lead,
    alternates: { canonical: `/product/${page.slug}` },
  };
}

const sectionClasses = [
  atlas.brightSection,
  atlas.paperSection,
  atlas.skySection,
  atlas.brightSection,
] as const;

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getProductPage(slug);

  if (!page) {
    notFound();
  }

  const currentIndex = productPages.findIndex(
    (item) => item.slug === page.slug,
  );
  const nextPage = productPages[currentIndex + 1];

  return (
    <>
      <SiteHeader />
      <main>
        <DeepPageHero
          index={page.number}
          eyebrow={page.eyebrow}
          title={
            <>
              {page.title}
              <br />
              <em>{page.titleEmphasis}</em>
            </>
          }
          lead={page.lead}
          note={page.note}
          stats={page.stats}
          tone={page.slug === "visualizations" ? "orange" : "blueprint"}
        />

        {page.chapters.map((chapter, index) => {
          const copy = (
            <div className={atlas.stickyCopy}>
              <p className={atlas.kicker}>
                {chapter.index} — {chapter.eyebrow}
              </p>
              <h2>
                {chapter.title} <em>{chapter.emphasis}</em>
              </h2>
              <p>{chapter.copy}</p>
              <ul className={atlas.annotationList}>
                {chapter.annotations.map((annotation, annotationIndex) => (
                  <li key={annotation}>
                    <span>{String(annotationIndex + 1).padStart(2, "0")}</span>
                    {annotation}
                  </li>
                ))}
              </ul>
            </div>
          );

          const screenshot = (
            <ScreenshotStage
              src={chapter.image.src}
              alt={chapter.image.alt}
              width={chapter.image.width}
              height={chapter.image.height}
              label={chapter.image.label}
              caption="Controlled manual-fixture capture shown under the pilot’s Ephraim brand; any visible learner personas are synthetic, and the image is evidence of implemented behavior—not a production-uptime claim."
              accent={chapter.accent}
              contain={page.slug === "visualizations"}
            />
          );

          return (
            <section
              className={sectionClasses[index % sectionClasses.length]}
              key={chapter.index}
            >
              <div
                className={`${atlas.split} ${index % 2 ? atlas.splitReverse : ""}`}
              >
                {index % 2 ? screenshot : copy}
                {index % 2 ? copy : screenshot}
              </div>
              <div className={atlas.formulaBand}>
                <span>What happens underneath</span>
                <div>
                  <code>{chapter.underneath.join(" → ")}</code>
                  <p>
                    The visible interaction is backed by explicit service and
                    data boundaries. The chapter annotations above describe the
                    user-facing result; this rail names the implementation path.
                  </p>
                </div>
              </div>
            </section>
          );
        })}

        <NextChapter
          href={nextPage ? `/product/${nextPage.slug}` : "/architecture"}
          index={nextPage?.number ?? "A / 01"}
          label={nextPage ? "Next product chapter" : "Next systems chapter"}
          title={
            nextPage?.titleEmphasis ?? "One question. Four trust boundaries."
          }
          text={
            nextPage?.lead ??
            "Trace the product through the PHP application, encrypted data layer, restricted internal link and local DGX Spark."
          }
        />
      </main>
      <SiteFooter />
    </>
  );
}
