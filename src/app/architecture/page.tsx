import type { Metadata } from "next";
import atlas from "@/components/atlas-sections.module.css";
import {
  DeepPageHero,
  EvidenceNote,
  NextChapter,
  SectionHeader,
} from "@/components/deep-page";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { SystemArchitectureDiagram } from "@/components/technical-diagrams";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "A detailed map of School UI: the PHP application, encrypted data layer, local DGX Spark services, request flows, retrieval, and trust boundaries.",
  alternates: { canonical: "/architecture" },
};

const chatFlow = [
  [
    "01",
    "Request",
    "The browser submits a message to the same-origin PHP application.",
  ],
  [
    "02",
    "Authorise",
    "Session, role, project boundary and Vault availability are checked.",
  ],
  [
    "03",
    "Queue",
    "The job payload and private artifacts are encrypted before durable storage.",
  ],
  [
    "04",
    "Assemble",
    "Prompts, project rules, recent context and selected retrieval are composed.",
  ],
  [
    "05",
    "Infer",
    "Approved plaintext is sent server-to-server to the local SGLang model.",
  ],
  [
    "06",
    "Stream",
    "Response chunks use an encrypted DB buffer and a non-persistent speed layer.",
  ],
  [
    "07",
    "Render",
    "SSE returns the answer; the browser renders constrained, inspectable outputs.",
  ],
] as const;

const ragFlow = [
  [
    "01",
    "Validate",
    "A file must pass size, type, magic-byte and container checks.",
  ],
  [
    "02",
    "Encrypt",
    "The original is written outside the web root as an EFR1 encrypted stream.",
  ],
  [
    "03",
    "Extract",
    "Local format-specific readers normalize text without online converters.",
  ],
  ["04", "Chunk", "Text is divided into bounded overlapping passages."],
  [
    "05",
    "Embed",
    "Plaintext chunks visit the local embedding service for the active request.",
  ],
  [
    "06",
    "Protect",
    "Both chunk text and vectors return to encrypted MySQL storage.",
  ],
  [
    "07",
    "Retrieve",
    "PHP compares vectors and decrypts only selected passages into context.",
  ],
] as const;

const residency = [
  [
    "Browser",
    "Visible",
    "The active prompt and response are visible to the signed-in person. UI preferences may persist locally; private chat content does not.",
  ],
  [
    "PHP request memory",
    "Transient",
    "Authorised content is decrypted here for context assembly, rendering, export, search, or a model call.",
  ],
  [
    "MySQL + file storage",
    "Persistent",
    "Durable truth: encrypted chats, jobs, files, chunks, vectors, project state, and operational records.",
  ],
  [
    "Valkey / Redis",
    "Transient",
    "A same-host, non-persistent acceleration layer for encrypted stream buffers and worker wakeups—not a second database.",
  ],
  [
    "DGX Spark memory",
    "Transient",
    "Inference, embedding and optional speech see approved plaintext only while servicing the request. They do not persist a user-content database.",
  ],
  [
    "Technical logs",
    "Metadata only",
    "Timestamps, status, latency and counts are allowed. Prompts, answers, audio text, DEKs and tokens are excluded by policy.",
  ],
] as const;

const invariants = [
  [
    "01 / authority",
    "The model does not choose access",
    "Roles, Vault state, project participation, file ownership and retrieval scope are resolved in the PHP application before inference.",
  ],
  [
    "02 / persistence",
    "The Spark is not the database",
    "There is no vector database or durable chat store on the DGX Spark. The school web tier remains the source of truth.",
  ],
  [
    "03 / egress",
    "The model does not browse",
    "Configured web knowledge and Wikipedia are fetched through controlled web-server services. The Spark receives selected context, not free network access.",
  ],
  [
    "04 / rendering",
    "Generated does not mean executable",
    "Charts, drawings, chemistry and plots use bounded data formats and sandboxed renderers instead of arbitrary generated JavaScript.",
  ],
  [
    "05 / durability",
    "MySQL remains durable truth",
    "A restart can discard the speed layer without discarding the canonical encrypted job, conversation or project record.",
  ],
  [
    "06 / honesty",
    "Encryption has a cleartext window",
    "Content must be readable in the browser and in local request memory to be useful. The design minimizes and localizes that window; it does not deny it.",
  ],
] as const;

export default function ArchitecturePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <DeepPageHero
          index="A / 01"
          eyebrow="Logical architecture"
          title={
            <>
              One question.
              <br />
              Four <em>boundaries.</em>
            </>
          }
          lead="School UI separates the place people work, the place durable data lives, the restricted link between systems, and the local machine that computes an answer."
          note="This is the implemented pilot architecture—not a generic cloud diagram and not a claim of school-wide production deployment."
          stats={[
            { value: "04", label: "explicit trust boundaries" },
            { value: "87", label: "application API entrypoints" },
            { value: "01", label: "durable system of record" },
            { value: "0", label: "RAG databases on the Spark" },
          ]}
        />

        <section className={atlas.brightSection}>
          <div className={atlas.statement}>
            <span>Core separation</span>
            <h2>
              Decide on the web tier. <em>Compute</em> on the Spark. Persist in
              the encrypted data layer.
            </h2>
            <p>
              The local model is deliberately downstream of identity, permission
              and context decisions. It receives a bounded request; it does not
              become the authority for the school&apos;s data.
            </p>
          </div>
        </section>

        <section className={atlas.blueSection}>
          <SectionHeader
            index="01"
            eyebrow="The whole system"
            title={
              <>
                A map you can <em>interrogate.</em>
              </>
            }
            lead="Orange is the active data plane. Dashed blue is the privileged control plane. Scroll the technical plate on smaller screens."
            light
          />
          <div className={atlas.diagramWrap}>
            <SystemArchitectureDiagram />
          </div>
        </section>

        <section className={atlas.paperSection}>
          <SectionHeader
            index="02"
            eyebrow="Chat request / sequence"
            title={
              <>
                The answer is the <em>last</em> step.
              </>
            }
            lead="A message crosses identity, encryption, context and streaming layers before it becomes a rendered response."
          />
          <div className={atlas.flowGrid}>
            {chatFlow.map(([number, title, text], index) => (
              <article className={atlas.flowStep} key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                {index < chatFlow.length - 1 ? (
                  <b aria-hidden="true">→</b>
                ) : null}
              </article>
            ))}
          </div>
          <div className={atlas.formulaBand}>
            <span>Conceptual context assembly</span>
            <div>
              <code>
                request = system + role + project + conversation +
                topK(retrieval)
              </code>
              <p>
                The exact prompt is assembled server-side from authorised
                components. Personal memories and calendars are not injected
                into bounded project contexts.
              </p>
            </div>
          </div>
        </section>

        <section className={atlas.orangeSection}>
          <SectionHeader
            index="03"
            eyebrow="Retrieval / encrypted RAG"
            title={
              <>
                Sources become context—
                <br />
                not a <em>shadow cloud.</em>
              </>
            }
            lead="Extraction, vector comparison and context selection are local. Both the human-readable chunks and their derived vectors are treated as protected data."
          />
          <div className={atlas.flowGrid}>
            {ragFlow.map(([number, title, text], index) => (
              <article className={atlas.flowStep} key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                {index < ragFlow.length - 1 ? (
                  <b aria-hidden="true">→</b>
                ) : null}
              </article>
            ))}
          </div>
          <div className={atlas.formulaBand}>
            <span>Query-time ranking</span>
            <div>
              <code>cos(q, d) = (q · d) / (‖q‖ × ‖d‖)</code>
              <p>
                PHP calculates cosine similarity over locally generated vectors,
                selects the highest-scoring bounded passages, and decrypts only
                those passages into the prompt. Typical ingest uses
                approximately 320-token chunks with a 60-token overlap and a
                200-chunk cap.
              </p>
            </div>
          </div>
        </section>

        <section className={atlas.brightSection}>
          <SectionHeader
            index="04"
            eyebrow="Data residency / plain language"
            title={
              <>
                What exists <em>where.</em>
              </>
            }
            lead="Local-first is meaningful only when persistence and cleartext boundaries are stated precisely."
          />
          <div className={atlas.truthTable}>
            {residency.map(([place, state, explanation]) => (
              <article className={atlas.truthRow} key={place}>
                <h3>{place}</h3>
                <strong>{state}</strong>
                <p>{explanation}</p>
              </article>
            ))}
          </div>
          <div className={`${atlas.max} ${atlas.topGap}`}>
            <EvidenceNote label="Precise promise">
              “Encrypted at rest and processed in plaintext only for the active
              request on school-controlled systems” is accurate. “Never
              decrypted,” “zero knowledge,” and “air-gapped” are not.
            </EvidenceNote>
          </div>
        </section>

        <section className={atlas.paperSection}>
          <SectionHeader
            index="05"
            eyebrow="Architectural invariants"
            title={
              <>
                Six rules that keep the <em>shape</em> intact.
              </>
            }
          />
          <div className={atlas.cardGrid}>
            {invariants.map(([label, title, text]) => (
              <article className={atlas.card} key={label}>
                <span>{label}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <NextChapter
          href="/security"
          index="A / 02"
          label="Next technical chapter"
          title="Encrypted at rest. Honest in motion."
          text="Follow the password, KEK, User-DEK, file stream and explicit cleartext windows through the security architecture."
        />
      </main>
      <SiteFooter />
    </>
  );
}
