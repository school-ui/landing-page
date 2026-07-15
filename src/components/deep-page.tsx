import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./site-shell";
import styles from "./deep-page.module.css";

export type HeroStat = {
  value: string;
  label: string;
};

export function Breadcrumbs({
  items,
}: {
  items: ReadonlyArray<{ label: string; href?: string }>;
}) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
          {index < items.length - 1 ? <b aria-hidden="true">/</b> : null}
        </span>
      ))}
    </nav>
  );
}

export function DeepPageHero({
  index,
  eyebrow,
  title,
  lead,
  note,
  stats = [],
  tone = "blueprint",
  children,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead: string;
  note?: string;
  stats?: ReadonlyArray<HeroStat>;
  tone?: "blueprint" | "paper" | "orange";
  children?: ReactNode;
}) {
  return (
    <section className={`${styles.hero} ${styles[tone]}`}>
      <div className={styles.heroTopline}>
        <span>{index}</span>
        <span>{eyebrow}</span>
        <span>School UI / systems atlas</span>
      </div>
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <h1>{title}</h1>
          <p className={styles.heroLead}>{lead}</p>
          {note ? <p className={styles.heroNote}>{note}</p> : null}
        </div>
        <div className={styles.heroAside}>
          {children}
          {stats.length ? (
            <div className={styles.statRail}>
              {stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  lead,
  light = false,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  light?: boolean;
}) {
  return (
    <header className={`${styles.sectionHeader} ${light ? styles.sectionHeaderLight : ""}`}>
      <p className={styles.sectionIndex}>{index}</p>
      <div>
        <p className={styles.sectionEyebrow}>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {lead ? <p className={styles.sectionLead}>{lead}</p> : null}
    </header>
  );
}

export function ScreenshotStage({
  src,
  alt,
  label,
  caption,
  width,
  height,
  accent = "blue",
  contain = false,
}: {
  src: string;
  alt: string;
  label: string;
  caption: string;
  width: number;
  height: number;
  accent?: "blue" | "orange" | "sky";
  contain?: boolean;
}) {
  return (
    <figure className={`${styles.screenshotStage} ${styles[`accent${accent}`]}`}>
      <div className={styles.windowBar}>
        <span className={styles.windowDots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>{label}</span>
        <span>current pilot UI</span>
      </div>
      <div className={`${styles.screenshotImage} ${contain ? styles.contain : ""}`}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 900px) 94vw, 72vw"
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function EvidenceNote({
  label = "Evidence note",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <aside className={styles.evidenceNote}>
      <span>{label}</span>
      <p>{children}</p>
    </aside>
  );
}

export function NextChapter({
  href,
  index,
  label,
  title,
  text,
}: {
  href: string;
  index: string;
  label: string;
  title: string;
  text: string;
}) {
  return (
    <section className={styles.nextChapter}>
      <div className={styles.nextMeta}>
        <span>{index}</span>
        <span>{label}</span>
      </div>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <Link href={href} className={styles.nextLink}>
        Open chapter <Arrow />
      </Link>
    </section>
  );
}

export { styles as deepStyles };
