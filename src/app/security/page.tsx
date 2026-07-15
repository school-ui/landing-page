import type { Metadata } from "next";
import {
  DeepPageHero,
  EvidenceNote,
  NextChapter,
  ScreenshotStage,
  SectionHeader,
} from "@/components/deep-page";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { VaultKeyDiagram } from "@/components/technical-diagrams";
import atlas from "@/components/atlas-sections.module.css";

export const metadata: Metadata = {
  title: "Security & privacy",
  description:
    "A precise explanation of School UI encryption, session controls, upload security, safe rendering, logging, and cleartext boundaries.",
  alternates: { canonical: "/security" },
};

const truthRows = [
  [
    "Private content at rest",
    "Encrypted",
    "Chats, titles, summaries, memories, personal files, file chunks and private vectors are protected by the user Vault key domain.",
  ],
  [
    "Project + school context",
    "Separated",
    "Intentionally shared project material and centrally maintained knowledge use distinct server-protected key domains—not a student’s private Vault key.",
  ],
  [
    "Authorised model request",
    "Plaintext",
    "The PHP application and local inference, embedding or speech process must briefly read approved content to perform the requested work.",
  ],
  [
    "Export + clipboard",
    "Deliberate boundary",
    "Copying, Markdown, HTML, TeX, PDF and data export move selected content into user-controlled cleartext by explicit action.",
  ],
  [
    "Technical telemetry",
    "Minimised",
    "Status, latency, token counts and operational events may be recorded. Prompts, answers, TTS text/audio, DEKs and tokens are excluded.",
  ],
  [
    "Compromised server code",
    "Out of scope for at-rest crypto",
    "Encryption at rest protects stored material; it cannot make malicious privileged runtime code unable to read content during a valid request.",
  ],
] as const;

const authCards = [
  ["01 / password", "Two different jobs", "bcrypt cost 12 checks the login secret. Argon2id separately derives a KEK for Vault unlocking; the password hash is not an encryption key."],
  ["02 / sessions", "Bounded lifetime", "Encrypted PHP sessions use HttpOnly, SameSite=Lax and strict mode, with a 45-minute idle limit and a 12-hour absolute ceiling."],
  ["03 / rotation", "Activity, not polling", "Meaningful browser activity renews and rotates the native session identifier. Admin resets can revoke all existing sessions through a version counter."],
  ["04 / second factor", "TOTP-ready", "Accounts can be required to complete TOTP setup and challenge before ordinary application access is granted."],
  ["05 / mutations", "CSRF + ownership", "State-changing APIs require an authenticated role, a valid CSRF token and domain-specific ownership or permission checks."],
  ["06 / operations", "Short-lived signed access", "Runtime WebSockets use Ed25519-signed JWTs with issuer, audience, role, subject and a maximum default lifetime of five minutes."],
] as const;

const uploadFlow = [
  ["01", "Gate", "Authentication, CSRF, owner Vault and quota are checked."],
  ["02", "Name", "Filenames are sanitized; dangerous names and unsupported aliases are rejected."],
  ["03", "Inspect", "Extension, MIME, magic bytes and structured Office/iWork containers must agree."],
  ["04", "Scan", "When ClamAV is enabled, unavailable or suspicious scans fail closed."],
  ["05", "Encrypt", "The file becomes a chunked EFR1 XChaCha20 secretstream outside the web root."],
  ["06", "Index", "Local readers extract bounded text; the local Spark produces embeddings."],
  ["07", "Protect", "Extracted chunks and embeddings return to encrypted relational storage."],
] as const;

const renderingCards = [
  ["01 / math", "KaTeX, locally bundled", "Mathematical notation is rendered from text without loading an external runtime."],
  ["02 / charts", "Constrained JSON", "Chart types and values come through a bounded data contract rather than generated executable code."],
  ["03 / plots", "Safe DSL + sandbox", "Functions, points, parameters and surfaces are parsed by a controlled DSL; no eval or Function constructor is used."],
  ["04 / chemistry", "Local SMILES rendering", "Two-dimensional chemical structures use a local renderer with validated textual input."],
  ["05 / HTML preview", "Opaque sandbox", "Explicit previews run without same-origin access, application cookies or unrestricted network authority."],
  ["06 / CSP", "No inline execution", "Application behavior and style stay in first-party modules and stylesheets under a centrally managed Content Security Policy."],
] as const;

const cleartextFlow = [
  ["01", "Unlock", "The password-derived KEK unwraps the User-DEK for the authenticated session."],
  ["02", "Select", "Only data required by the requested view, search, export or model operation is decrypted."],
  ["03", "Process", "Approved plaintext exists in PHP and the relevant local compute service during the request."],
  ["04", "Return", "The response reaches the browser; durable content is written back encrypted."],
  ["05", "Expire", "Request memory and non-persistent buffers are not the canonical record."],
] as const;

export default function SecurityPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <DeepPageHero
          index="S / 01"
          eyebrow="Security + privacy architecture"
          title={
            <>
              Encrypted at rest.
              <br />
              Honest <em>in motion.</em>
            </>
          }
          lead="Security is not a lock icon. It is a map of key domains, access checks, temporary cleartext, bounded rendering and the places where trust still matters."
          note="These controls describe the implemented pilot. They are not a claim of certification, zero knowledge, or automatic legal approval."
          stats={[
            { value: "32 bytes", label: "random User-DEK" },
            { value: "64MiB", label: "Argon2id memory limit" },
            { value: "45m", label: "session idle limit" },
            { value: "12h", label: "absolute session ceiling" },
          ]}
        />

        <section className={atlas.brightSection}>
          <SectionHeader
            index="01"
            eyebrow="Truth table"
            title={
              <>
                The precise <em>promise.</em>
              </>
            }
            lead="Every useful privacy statement needs a location, a time window and an authority attached to it."
          />
          <div className={atlas.truthTable}>
            {truthRows.map(([subject, state, text]) => (
              <article className={atlas.truthRow} key={subject}>
                <h3>{subject}</h3>
                <strong>{state}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={atlas.paperSection}>
          <SectionHeader
            index="02"
            eyebrow="Private Vault / key hierarchy"
            title={
              <>
                A password opens a key.
                <br />
                The key opens the <em>Vault.</em>
              </>
            }
            lead="The random User-DEK is separate from the login hash and separate from the password-derived key used to wrap it."
          />
          <div className={atlas.diagramWrap}>
            <VaultKeyDiagram />
          </div>
          <div className={`${atlas.max} ${atlas.topGap}`}>
            <EvidenceNote label="Why separation matters">
              A normal password change only rewraps the existing User-DEK with a
              newly derived KEK. The system does not need to decrypt and rewrite
              every chat and file merely because the password changed.
            </EvidenceNote>
          </div>
        </section>

        <section className={atlas.orangeSection}>
          <SectionHeader
            index="03"
            eyebrow="Identity + session controls"
            title={
              <>
                Trust is <em>time-bounded.</em>
              </>
            }
            lead="Identity is checked at login, but authority continues to be re-evaluated at page, API, project and file boundaries."
          />
          <div className={atlas.cardGrid}>
            {authCards.map(([label, title, text]) => (
              <article className={atlas.card} key={label}>
                <span>{label}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={atlas.brightSection}>
          <div className={atlas.split}>
            <div className={atlas.stickyCopy}>
              <p className={atlas.kicker}>04 — Visible control</p>
              <h2>
                Security that a person can <em>act on.</em>
              </h2>
              <p>
                The pilot interface puts password change, second factor,
                session review and optional recovery setup in one human-facing
                place. Recovery is feature-gated and disabled by default.
              </p>
              <ul className={atlas.annotationList}>
                <li><span>01</span> Review and revoke active sessions</li>
                <li><span>02</span> Change a password without replacing Vault data</li>
                <li><span>03</span> Configure TOTP where deployment policy requires it</li>
                <li><span>04</span> See recovery readiness without exposing key material</li>
              </ul>
            </div>
            <ScreenshotStage
              src="/images/showcase/settings-security.webp"
              alt="Security settings in the current Ephraim-branded pilot interface"
              width={1440}
              height={1000}
              label="Settings / security"
              caption="Current pilot-interface capture shown under its Ephraim brand. The public School UI identity is configurable, but that transition is not yet complete in every string."
              accent="sky"
            />
          </div>
        </section>

        <section className={atlas.blueSection}>
          <SectionHeader
            index="05"
            eyebrow="File intake / defence in depth"
            title={
              <>
                Upload is a <em>pipeline,</em> not a folder.
              </>
            }
            lead="A filename alone never decides what a file is. Validation, optional malware scanning, encryption and bounded local extraction happen before it can become AI context."
            light
          />
          <div className={atlas.flowGrid}>
            {uploadFlow.map(([number, title, text], index) => (
              <article className={atlas.flowStep} key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                {index < uploadFlow.length - 1 ? <b aria-hidden="true">→</b> : null}
              </article>
            ))}
          </div>
          <div className={atlas.formulaBand}>
            <span>Encrypted file format</span>
            <div>
              <code>EFR1 ‖ secretstream_header ‖ Σ(lengthᵢ ‖ cipher_chunkᵢ)</code>
              <p>
                Files are encrypted in one-mebibyte plaintext chunks with
                XChaCha20-Poly1305 secretstream. The final authenticated tag is
                required; downloads decrypt directly to the response stream.
              </p>
            </div>
          </div>
        </section>

        <section className={atlas.paperSection}>
          <SectionHeader
            index="06"
            eyebrow="Output safety"
            title={
              <>
                Rich answers, bounded <em>execution.</em>
              </>
            }
            lead="School UI treats model output as untrusted input to constrained renderers—not as permission to run arbitrary code in the application origin."
          />
          <div className={atlas.cardGrid}>
            {renderingCards.map(([label, title, text]) => (
              <article className={atlas.card} key={label}>
                <span>{label}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={atlas.skySection}>
          <SectionHeader
            index="07"
            eyebrow="Plaintext lifecycle"
            title={
              <>
                Useful means briefly <em>readable.</em>
              </>
            }
            lead="The design narrows the cleartext window to an authorised request on school-controlled systems. It does not pretend the window does not exist."
          />
          <div className={atlas.flowGrid}>
            {cleartextFlow.map(([number, title, text], index) => (
              <article className={atlas.flowStep} key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                {index < cleartextFlow.length - 1 ? <b aria-hidden="true">→</b> : null}
              </article>
            ))}
          </div>
        </section>

        <NextChapter
          href="/security/encryption"
          index="S / 02"
          label="Encryption deep dive"
          title="Six key domains. One honest map."
          text="Go deeper into private Vault data, project material, central knowledge, server secrets, stream envelopes and optional buddy recovery."
        />
      </main>
      <SiteFooter />
    </>
  );
}
