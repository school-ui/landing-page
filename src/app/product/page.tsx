import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import atlas from "@/components/atlas-sections.module.css";
import {
  DeepPageHero,
  NextChapter,
  SectionHeader,
} from "@/components/deep-page";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { manualCoverage, productPages } from "@/data/product-pages";
import styles from "./product.module.css";

export const metadata: Metadata = {
  title: "Product atlas",
  description:
    "Explore School UI conversations, teacher projects, visualizations, encrypted knowledge, personal control, operations, and governance.",
  alternates: { canonical: "/product" },
};

export default function ProductPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <DeepPageHero
          index="P / 01"
          eyebrow="The product atlas"
          title={
            <>
              The whole school,
              <br />
              one <em>calm interface.</em>
            </>
          }
          lead="School UI connects private conversation, teacher-guided projects, visual explanation, local knowledge, personal control and accountable operations without pretending they are the same thing."
          note="The screenshots below show the current Ephraim-branded pilot interface with documented fictional handbook personas. School UI is the public platform identity; the in-product brand transition is configurable but not complete in every string."
          tone="paper"
          stats={[
            { value: "07", label: "curated product chapters" },
            { value: "61", label: "registered manual topics mapped" },
            { value: "71", label: "source captures reviewed" },
            { value: "05", label: "supported UI languages" },
          ]}
        >
          <div className={styles.heroMosaic} aria-hidden="true">
            <div className={styles.mosaicMain}>
              <Image
                src="/images/showcase/chat-start.webp"
                alt=""
                fill
                sizes="38vw"
                priority
              />
            </div>
            <div className={styles.mosaicLeft}>
              <Image
                src="/images/showcase/visualization-plot.webp"
                alt=""
                fill
                sizes="20vw"
              />
            </div>
            <div className={styles.mosaicRight}>
              <Image
                src="/images/showcase/teacher-project-builder.webp"
                alt=""
                fill
                sizes="18vw"
              />
            </div>
          </div>
        </DeepPageHero>

        <section className={atlas.blueSection}>
          <SectionHeader
            index="01"
            eyebrow="Choose a chapter"
            title={
              <>
                Go from interface
                <br />
                to <em>implementation.</em>
              </>
            }
            lead="Each chapter pairs real pilot captures with the service, security and data behavior underneath the visible surface."
            light
          />
          <div className={atlas.chapterGrid}>
            {productPages.map((page) => (
              <Link
                className={atlas.chapterCard}
                href={`/product/${page.slug}`}
                key={page.slug}
              >
                <span>
                  {page.number} / {page.eyebrow}
                </span>
                <b aria-hidden="true">↗</b>
                <h3>{page.titleEmphasis}</h3>
                <p>{page.lead}</p>
              </Link>
            ))}
          </div>
          <div className={`${styles.pilotBand} ${atlas.topGap}`}>
            <span>Current project status</span>
            <p>
              The application is a substantial working pilot being prepared for
              controlled classroom introduction. The atlas describes implemented
              behavior without presenting it as proven school-wide deployment.
            </p>
          </div>
        </section>

        <section className={atlas.brightSection}>
          <SectionHeader
            index="02"
            eyebrow="Manual coverage map"
            title={
              <>
                Everything the manuals explain—
                <br />
                reorganised around <em>understanding.</em>
              </>
            }
            lead="Instead of reproducing dozens of thin pages, the atlas groups every registered topic into coherent product, architecture, security, operations and governance narratives."
          />
          <div className={atlas.featureIndex}>
            {manualCoverage.map((group) => (
              <article className={atlas.featureGroup} key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={atlas.orangeSection}>
          <div className={styles.sourceNote}>
            <strong>61</strong>
            <div>
              <h2>Source topics, one navigable story.</h2>
              <p>
                The manual taxonomy spans users, administrators, legal context
                and code security. This site keeps that breadth while adding
                cross-system request traces, formulas, container maps and honest
                claims that are verified against the application code and
                technical documentation—not just the manual prose.
              </p>
            </div>
          </div>
        </section>

        <NextChapter
          href="/product/chat"
          index="P / 02"
          label="First product chapter"
          title="A classroom workspace, not a blank chatbot."
          text="Start with streaming conversation, inspectable activity, summaries, export, local speech and the security contracts underneath."
        />
      </main>
      <SiteFooter />
    </>
  );
}
