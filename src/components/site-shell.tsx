import Link from "next/link";
import styles from "./site-shell.module.css";

export function BrandMark() {
  return (
    <span className={styles.brandMark} aria-hidden="true">
      <span />
      <span />
      <i />
    </span>
  );
}

export function Brand({ href = "/" }: { href?: string }) {
  return (
    <Link className={styles.brand} href={href} aria-label="School UI home">
      <BrandMark />
      <span className={styles.brandText}>
        school<span>/ui</span>
      </span>
    </Link>
  );
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className={styles.arrow}>
      {diagonal ? "↗" : "→"}
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className={styles.siteHeader}>
      <Brand />

      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/product">Product</Link>
        <Link href="/architecture">Architecture</Link>
        <Link href="/security">Security</Link>
        <Link href="/infrastructure">Infrastructure</Link>
      </nav>

      <details className={styles.mobileMenu}>
        <summary>
          Explore <span aria-hidden="true">+</span>
        </summary>
        <nav aria-label="Mobile navigation">
          <Link href="/product">Product atlas</Link>
          <Link href="/architecture">Architecture</Link>
          <Link href="/security">Security</Link>
          <Link href="/infrastructure">Infrastructure</Link>
          <a
            href="https://github.com/school-ui/landing-page"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </nav>
      </details>

      <a
        className={styles.headerCta}
        href="https://github.com/school-ui/landing-page"
        target="_blank"
        rel="noreferrer"
      >
        GitHub <Arrow diagonal />
      </a>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Brand />
      <p>
        A school-native AI project from Lessing-Gymnasium Karlsruhe.
        <br />
        Built locally. Explained honestly.
      </p>
      <div className={styles.footerLinks}>
        <Link href="/product">Product atlas</Link>
        <Link href="/architecture">Architecture</Link>
        <Link href="/security">Security</Link>
        <Link href="/infrastructure">Infrastructure</Link>
        <a
          href="https://github.com/school-ui/landing-page"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
      </div>
      <span className={styles.footerYear}>© 2026</span>
    </footer>
  );
}
