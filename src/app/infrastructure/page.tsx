import type { Metadata } from "next";
import Image from "next/image";
import {
  DeepPageHero,
  EvidenceNote,
  NextChapter,
  ScreenshotStage,
  SectionHeader,
} from "@/components/deep-page";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { ContainerTopologyDiagram } from "@/components/technical-diagrams";
import atlas from "@/components/atlas-sections.module.css";

export const metadata: Metadata = {
  title: "Local infrastructure",
  description:
    "Inside the School UI DGX Spark: SGLang inference, embeddings, local speech, runtime monitoring, observer isolation, benchmarks, and transactional updates.",
  alternates: { canonical: "/infrastructure" },
};

const services = [
  ["01 / data plane", "Inference", ":8000", "SGLang serves the local GPT-OSS-120B model through an OpenAI-compatible API."],
  ["02 / data plane", "Embedding", ":8001", "A local gte-Qwen2-1.5B service creates vectors and waits for inference readiness before launch."],
  ["03 / control plane", "Runtime", ":8003", "FastAPI publishes GPU, memory, temperature, power, container and request metrics to authorised admins."],
  ["04 / boundary", "Observer", "Unix socket", "The only Compose service with Docker-socket access exposes a small allowlisted read surface and no network interface."],
  ["05 / optional", "Speech", ":8006", "A profile-gated CPU service uses sherpa-onnx to synthesize authenticated WAV responses without text or audio logs."],
  ["06 / retention", "Log rotation", "no port", "A utility container bounds and compresses technical logs; application content is excluded by policy."],
  ["07 / outside Compose", "Supervisor", ":8002", "A separate privileged service prepares, verifies, switches, probes and compensates stack releases."],
  ["08 / host", "Coordinator", "systemd", "A narrow host process performs the final safe Supervisor handoff and crash recovery."],
] as const;

const isolationCards = [
  ["01 / no network", "Observer speaks Unix", "The Observer has no IP interface. Runtime reaches its allowlisted status and log methods through a shared read-only Unix-socket volume."],
  ["02 / reduced surface", "No exec or mutation", "The adapter does not offer a general Docker proxy, command execution, start, stop or arbitrary container selection."],
  ["03 / container hardening", "Drop what is not needed", "Read-only filesystem, all Linux capabilities dropped, no-new-privileges, PID/CPU/memory bounds and a small temporary filesystem."],
  ["04 / signed admin path", "Runtime verifies intent", "Short-lived Ed25519 JWTs bind issuer, audience, role, subject and time before an admin WebSocket can receive status or logs."],
  ["05 / separate privilege", "Supervisor is explicit", "The service that can update Docker remains outside Compose, behind the stronger super-admin audience and scope contract."],
  ["06 / verification", "Local harnesses, narrow CI", "Backend security contracts and recovery behavior use reproducible local test and Docker crash-recovery harnesses. A separate frontend GitHub Actions workflow performs secret scanning; it does not deploy the Spark."],
] as const;

const releaseSteps = [
  ["01", "Prepare", "Resolve read-only source commits and build a frozen local candidate without touching the running generation."],
  ["02", "Bind", "Confirmation carries a plan ID and hash tied to source, diff and current/previous release generations."],
  ["03", "Lock", "An operations lock and write-ahead log record intent before any state-changing step."],
  ["04", "Reconcile", "Services change in dependency order from immutable local release material and pinned dependency evidence."],
  ["05", "Qualify", "Readiness, health and smoke probes decide whether the new generation is accepted."],
  ["06", "Compensate", "A failed transaction returns to the exact job-start generation; Current and Previous remain locally addressable."],
] as const;

const benchmarkFacts = [
  ["Run", "03 Jun 2026", "Run ID 2026-06-03_225234_concurrency_instant; recorded from 22:52 to 23:51 CEST."],
  ["Mode", "Instant", "Synthetic German explanation prompts called the OpenAI-compatible inference API directly with low reasoning effort."],
  ["Load", "1 → 90", "Nine simultaneous-user levels, three repeats per level, with 30-second warm-up and cool-down periods."],
  ["Prompt", "500 tokens", "Fixture de_explanation_medium_001, temperature 0.2; answer quality and browser performance were outside the measurement."],
  ["Result", "723 / 723", "All requests in this particular run completed successfully. That is evidence for the run—not a future availability promise."],
  ["Build", "f92491e", "Frontend commit f92491e on PHP 8.4.20; the manifest records the target model alias as school-ui."],
] as const;

export default function InfrastructurePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <DeepPageHero
          index="I / 01"
          eyebrow="Local compute + operations"
          title={
            <>
              A school lab.
              <br />
              Not a model <em>cloud.</em>
            </>
          }
          lead="One compact NVIDIA system hosts the model data plane and a deliberately separated control plane for monitoring, speech, updates and rollback."
          note="The planned V1 model path is local. The machine is not described as air-gapped: software maintenance and the separate school web tier have their own controlled network responsibilities."
          stats={[
            { value: "120B", label: "local GPT-OSS parameters" },
            { value: "128GB", label: "unified system memory" },
            { value: "32K", label: "configured chat context" },
            { value: "15", label: "maximum running chat requests" },
          ]}
        >
          <div className={atlas.heroHardware}>
            <Image
              src="/images/dgx-editorial.webp"
              alt="Editorial portrait of the DGX Spark with its NVIDIA mark visible"
              fill
              priority
              loading="eager"
              sizes="(max-width: 960px) 90vw, 36vw"
            />
          </div>
        </DeepPageHero>

        <section className={atlas.blueSection}>
          <SectionHeader
            index="01"
            eyebrow="Service topology"
            title={
              <>
                Six composed. Two outside.
                <br />
                Every boundary has a <em>reason.</em>
              </>
            }
            lead="With local speech enabled, six containers share a Compose lifecycle. The privileged Supervisor and its narrow host Coordinator stay outside so they can recover the stack they manage."
            light
          />
          <div className={atlas.diagramWrap}>
            <ContainerTopologyDiagram />
          </div>
        </section>

        <section className={atlas.brightSection}>
          <SectionHeader
            index="02"
            eyebrow="Service field guide"
            title={
              <>
                Every process gets a <em>job.</em>
              </>
            }
            lead="The model server is only one part of the machine. Search vectors, speech, observability, retention and update safety are separate services with separate constraints."
          />
          <div className={atlas.serviceGrid}>
            {services.map(([label, title, port, text]) => (
              <article className={atlas.serviceCard} key={label}>
                <span>{label}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <code>{port}</code>
              </article>
            ))}
          </div>
        </section>

        <section className={atlas.blueSection}>
          <SectionHeader
            index="03"
            eyebrow="Compute envelope"
            title={
              <>
                Capacity is a <em>budget.</em>
              </>
            }
            lead="Context length, concurrency and static memory fractions are configured together for the GB10’s unified-memory architecture and a small-school workload."
            light
          />
          <div className={atlas.metricGrid}>
            <article className={atlas.metric}>
              <span>Chat context</span>
              <strong>32,768</strong>
              <p>tokens per request, preventing one request from consuming the whole KV-cache pool</p>
            </article>
            <article className={atlas.metric}>
              <span>Chat concurrency</span>
              <strong>15</strong>
              <p>maximum running inference requests in the current school-tuned configuration</p>
            </article>
            <article className={atlas.metric}>
              <span>Embedding context</span>
              <strong>8,192</strong>
              <p>tokens with up to 64 embedding requests in the configured local service</p>
            </article>
            <article className={atlas.metric}>
              <span>Static fraction</span>
              <strong>0.80</strong>
              <p>of the inference service memory budget reserved by the current SGLang launch profile</p>
            </article>
          </div>
          <div className={atlas.formulaBand}>
            <span>Scheduling intuition</span>
            <div>
              <code>available ≈ unified memory − weights − KV cache − runtime headroom</code>
              <p>
                This is a capacity model, not a marketing benchmark. Model
                weights, active contexts, embedding work and system headroom
                share one physical memory pool, so configuration changes are
                qualified together.
              </p>
            </div>
          </div>
        </section>

        <section className={atlas.paperSection}>
          <SectionHeader
            index="04"
            eyebrow="Benchmark notebook"
            title={
              <>
                Measure the queue,
                <br />
                not just the <em>model.</em>
              </>
            }
            lead="A local school system is judged by response latency under concurrent arrivals and by aggregate throughput—not by a single clean prompt."
          />
          <div className={atlas.benchmarkGrid}>
            <figure className={atlas.benchmarkPlate}>
              <Image
                src="/images/benchmarks/concurrency-latency.svg"
                alt="Benchmark plate comparing latency across concurrent local inference requests"
                width={960}
                height={520}
              />
              <figcaption>
                <span>01 / latency</span>
                One controlled benchmark capture from the project manual; useful
                as a capacity study, not a universal performance guarantee.
              </figcaption>
            </figure>
            <figure className={atlas.benchmarkPlate}>
              <Image
                src="/images/benchmarks/concurrency-throughput.svg"
                alt="Benchmark plate comparing throughput across concurrent local inference requests"
                width={960}
                height={520}
              />
              <figcaption>
                <span>02 / throughput</span>
                Aggregate token delivery is read beside per-request experience;
                optimizing one without the other would misdescribe classroom load.
              </figcaption>
            </figure>
          </div>
          <div className={`${atlas.truthTable} ${atlas.topGap}`}>
            {benchmarkFacts.map(([subject, value, detail]) => (
              <article className={atlas.truthRow} key={subject}>
                <h3>{subject}</h3>
                <strong>{value}</strong>
                <p>{detail}</p>
              </article>
            ))}
          </div>
          <div className={`${atlas.max} ${atlas.topGap}`}>
            <EvidenceNote label="Benchmark rule">
              The essential run context is printed above; the source archive
              retains the full manifest, raw request records and methodology.
              This synthetic load test does not measure answer quality, browser
              performance or a real lesson.
            </EvidenceNote>
          </div>
        </section>

        <section className={atlas.orangeSection}>
          <SectionHeader
            index="05"
            eyebrow="Docker-socket boundary"
            title={
              <>
                Observe narrowly.
                <br />
                Escalate <em>deliberately.</em>
              </>
            }
            lead="Runtime does not mount the Docker socket. A hardened Observer translates a small read-only contract; privileged updates go through the separately authenticated Supervisor."
          />
          <div className={atlas.cardGrid}>
            {isolationCards.map(([label, title, text]) => (
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
              <p className={atlas.kicker}>06 — Operations surface</p>
              <h2>
                Local does not mean <em>invisible.</em>
              </h2>
              <p>
                Authorised administrators can inspect health, power,
                temperature, memory, model readiness and container state without
                placing personal prompt content in those telemetry payloads.
              </p>
              <ul className={atlas.annotationList}>
                <li><span>01</span> GPU, RAM, power and temperature snapshots</li>
                <li><span>02</span> Readiness for inference, embedding and optional speech</li>
                <li><span>03</span> Request, latency and token counters held in memory</li>
                <li><span>04</span> Allowlisted container log tails through the Observer</li>
              </ul>
            </div>
            <ScreenshotStage
              src="/images/system-status.webp"
              alt="Current pilot system-status dashboard showing DGX Spark and container health"
              width={1440}
              height={1250}
              label="Operations / status"
              caption="Current pilot-interface capture. Status is an operational view, not evidence of permanent uptime or a completed production approval."
              accent="orange"
              contain
            />
          </div>
        </section>

        <section className={atlas.paperSection}>
          <SectionHeader
            index="07"
            eyebrow="Transactional maintenance"
            title={
              <>
                Change is a transaction.
                <br />
                Failure has a <em>route home.</em>
              </>
            }
            lead="A release is prepared and bound to immutable local material before the running generation changes. Health gates decide whether it commits or compensates."
          />
          <div className={atlas.releaseTimeline}>
            {releaseSteps.map(([number, title, text]) => (
              <article className={atlas.releaseStep} key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className={atlas.formulaBand}>
            <span>Acceptance rule</span>
            <div>
              <code>commit ⇔ source_bound ∧ material_verified ∧ probes_pass</code>
              <p>
                Otherwise the controller follows the write-ahead record back to
                the exact starting generation. Upstream container images are
                digest-pinned and Python dependency locks include hashes.
              </p>
            </div>
          </div>
        </section>

        <NextChapter
          href="/product"
          index="P / 01"
          label="Product atlas"
          title="Now see what all of this enables."
          text="Move from the machine room into conversations, projects, visual explanations, knowledge, personal control and school operations."
        />
      </main>
      <SiteFooter />
    </>
  );
}
