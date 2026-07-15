import type { Metadata } from "next";
import {
  DeepPageHero,
  EvidenceNote,
  NextChapter,
  SectionHeader,
} from "@/components/deep-page";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { VaultKeyDiagram } from "@/components/technical-diagrams";
import atlas from "@/components/atlas-sections.module.css";

export const metadata: Metadata = {
  title: "Encryption deep dive",
  description:
    "The School UI key hierarchy: Argon2id, KEKs, User-DEKs, XChaCha20-Poly1305, encrypted files, purpose-bound server keys, and recovery boundaries.",
  alternates: { canonical: "/security/encryption" },
};

const keyDomains = [
  [
    "01 / personal",
    "User Vault",
    "A random 32-byte User-DEK protects private chats, titles, summaries, memories, private AI artifacts, file chunks and encrypted embeddings.",
  ],
  [
    "02 / calendar",
    "Private source key",
    "Each private calendar receives its own source key, wrapped by the owner’s User-DEK. It remains outside project context.",
  ],
  [
    "03 / collaboration",
    "Project file key",
    "A deliberate project copy gets its own server-protected key so authorised participants can share it without opening the teacher’s private original.",
  ],
  [
    "04 / application",
    "Purpose-bound server key",
    "Encrypted sessions, TOTP secrets, project-builder state and temporary artifacts use keys derived for a named purpose from the at-rest server secret.",
  ],
  [
    "05 / school knowledge",
    "Knowledge key",
    "Global sources need a separate server-controlled domain so scheduled refresh and retrieval can run without any person’s Vault being unlocked.",
  ],
  [
    "06 / streaming",
    "Job envelopes",
    "Private AI-job payloads and artifacts remain user-key protected; transient stream chunks use encrypted envelopes in durable and non-persistent buffers.",
  ],
] as const;

const lifecycle = [
  ["01", "Create", "Generate a random User-DEK; derive a KEK from password + per-account salt; store only the wrapped DEK."],
  ["02", "Unlock", "Verify the login password, derive the KEK again, unwrap the same User-DEK, then establish the bounded session."],
  ["03", "Change", "With the Vault already open, derive a new KEK and rewrap the unchanged User-DEK. Private ciphertext remains untouched."],
  ["04", "Recover", "If the optional buddy system was prepared, a live approved case can recover and rewrap the same DEK without revealing chats to the buddy."],
  ["05", "Reset", "Without old password or prepared recovery, a destructive reset creates a new Vault and removes private data tied to the unreachable old DEK."],
] as const;

const recoverySteps = [
  ["01 / prepare", "Invite", "The owner invites an eligible school account. The response does not confirm whether an entered address exists."],
  ["02 / consent", "Accept", "The buddy accepts while their own Vault is unlocked; that creates a recipient key, not access to the owner’s data."],
  ["03 / activate", "Wrap", "The owner activates the relationship. A random recovery secret wraps the Owner-DEK and is sealed to active buddy public keys."],
  ["04 / verify", "Compare", "In a live case, owner and buddy compare a nine-word SAS and verify identity outside the app before approval."],
  ["05 / wait", "Cooling-off", "A successful approval still waits through a server-enforced cooling-off period. The owner receives a single-use veto path."],
  ["06 / finish", "Rewrap", "The same Owner-DEK is wrapped with the new password. Sessions and the old recovery setup are revoked and must be prepared again."],
] as const;

const limits = [
  ["01 / storage theft", "What at-rest encryption helps", "A database or file-store copy does not directly contain readable private chats, file contents, private chunks, vectors or the User-DEK."],
  ["02 / weak password", "What the KDF slows", "Argon2id makes each offline password guess memory- and compute-intensive; it does not make a weak password impossible to guess."],
  ["03 / privileged runtime", "What it cannot hide", "Authorised server code must handle plaintext during a valid request. Malicious root-level or deployed application code is outside the promise of storage encryption."],
  ["04 / browser compromise", "Why CSP still matters", "A compromised same-origin browser context could see content already displayed to the user, so output sandboxing and script policy remain essential."],
  ["05 / deliberate export", "Where control changes", "PDF, HTML, clipboard and archive exports are user-authorised cleartext copies; their later protection belongs to the chosen destination."],
  ["06 / operations", "Keys need a lifecycle", "Backups, rotation, loss, recovery testing and access to deployment secrets remain operational responsibilities—not properties of a cipher alone."],
] as const;

export default function EncryptionPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <DeepPageHero
          index="S / 02"
          eyebrow="Cryptographic architecture"
          title={
            <>
              The key is never
              <br />
              just <em>one thing.</em>
            </>
          }
          lead="School UI separates login verification, password-based key derivation, private user data, intentionally shared project data, operational secrets, and local runtime authentication."
          note="Algorithms and constants below come from the application code. They describe the current implementation, not a substitute for independent deployment review."
          stats={[
            { value: "06", label: "separate data-key domains" },
            { value: "24 bytes", label: "XChaCha20 nonce" },
            { value: "1MiB", label: "file plaintext chunk" },
            { value: "1-of-n", label: "optional recovery target" },
          ]}
        />

        <section className={atlas.paperSection}>
          <SectionHeader
            index="01"
            eyebrow="Normal Vault unlock"
            title={
              <>
                Derive one key to unwrap <em>another.</em>
              </>
            }
            lead="The password never becomes the data-encryption key. A random User-DEK remains stable across ordinary password changes."
          />
          <div className={atlas.diagramWrap}>
            <VaultKeyDiagram />
          </div>
        </section>

        <section className={atlas.brightSection}>
          <SectionHeader
            index="02"
            eyebrow="Key separation"
            title={
              <>
                Six domains. Six different <em>reasons.</em>
              </>
            }
            lead="A school system needs both private user data and shared operational data. One master key for everything would erase that distinction."
          />
          <div className={atlas.cardGrid}>
            {keyDomains.map(([label, title, text]) => (
              <article className={atlas.card} key={label}>
                <span>{label}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={atlas.blueSection}>
          <SectionHeader
            index="03"
            eyebrow="Authenticated encryption / formulas"
            title={
              <>
                Confidentiality plus <em>tamper detection.</em>
              </>
            }
            lead="XChaCha20-Poly1305 encrypts and authenticates in one construction. A wrong key, wrong purpose or modified ciphertext fails instead of producing plausible text."
            light
          />
          <div className={atlas.formulaBand}>
            <span>Vault text fields</span>
            <div>
              <code>stored = Base64(nonce₂₄ ‖ AEAD(key, plaintext, ∅))</code>
              <p>
                The random nonce is stored beside the ciphertext; it is not a
                secret. Security depends on the key and on never reusing a
                nonce-key pair.
              </p>
            </div>
          </div>
          <div className={atlas.formulaBand}>
            <span>Purpose-bound server data</span>
            <div>
              <code>Kₚ = SHA-256(K_at-rest ‖ &quot;|&quot; ‖ purpose)</code>
              <p>
                The purpose string is also authenticated data. A ciphertext
                created for a TOTP secret cannot simply be replayed as project
                configuration under another domain.
              </p>
            </div>
          </div>
          <div className={atlas.formulaBand}>
            <span>Streaming files</span>
            <div>
              <code>EFR1 ‖ header₂₄ ‖ Σ(lenᵢ ‖ secretstream(chunkᵢ, tagᵢ))</code>
              <p>
                The final chunk carries an authenticated FINAL tag. A truncated
                file is rejected, and decryption can stream straight to the
                response without a plaintext file on disk.
              </p>
            </div>
          </div>
        </section>

        <section className={atlas.orangeSection}>
          <SectionHeader
            index="04"
            eyebrow="Password + Vault lifecycle"
            title={
              <>
                Rewrap when possible.
                <br />
                Reset only when <em>necessary.</em>
              </>
            }
            lead="The difference between a password change, data-preserving recovery and a destructive reset is the continued availability of the same User-DEK."
          />
          <div className={atlas.flowGrid}>
            {lifecycle.map(([number, title, text], index) => (
              <article className={atlas.flowStep} key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                {index < lifecycle.length - 1 ? <b aria-hidden="true">→</b> : null}
              </article>
            ))}
          </div>
          <div className={`${atlas.max} ${atlas.topGap}`}>
            <EvidenceNote label="Deployment status">
              Buddy recovery is configuration-gated and disabled by default. It
              is described here because the implementation exists, not because
              every School UI installation exposes it.
            </EvidenceNote>
          </div>
        </section>

        <section className={atlas.paperSection}>
          <SectionHeader
            index="05"
            eyebrow="Optional data-preserving recovery"
            title={
              <>
                A buddy approves a moment—
                <br />
                not access to a <em>Vault.</em>
              </>
            }
            lead="The target is a one-of-n live approval with a separate identity check, cooling-off period, owner veto and automatic invalidation after success."
          />
          <div className={atlas.cardGrid}>
            {recoverySteps.map(([label, title, text]) => (
              <article className={atlas.card} key={label}>
                <span>{label}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={atlas.brightSection}>
          <SectionHeader
            index="06"
            eyebrow="Threat-model limits"
            title={
              <>
                A cipher protects bytes.
                <br />
                A system protects <em>people.</em>
              </>
            }
            lead="At-rest encryption is one control in a wider design that still depends on passwords, sessions, code integrity, operations and conscious user choices."
          />
          <div className={atlas.cardGrid}>
            {limits.map(([label, title, text]) => (
              <article className={atlas.card} key={label}>
                <span>{label}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <NextChapter
          href="/infrastructure"
          index="I / 01"
          label="Next technical chapter"
          title="Six containers. Two host controls."
          text="Open the DGX Spark, every container, its real network mode, model scheduling, observer boundary, benchmark plates and transactional update path."
        />
      </main>
      <SiteFooter />
    </>
  );
}
