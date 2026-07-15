import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import styles from "./page.module.css";

const productCapabilities = [
  {
    number: "01",
    title: "Ask with context",
    text: "School-approved knowledge, personal files and project material become useful context—not another tab to search.",
  },
  {
    number: "02",
    title: "Teach with intent",
    text: "Teachers shape a project, its sources, learning goal, participants and privacy rules before the first prompt is sent.",
  },
  {
    number: "03",
    title: "See the idea",
    text: "Math plots, chemistry, diagrams, tables and code turn explanations into things students can inspect and question.",
  },
  {
    number: "04",
    title: "Keep control",
    text: "Roles, encrypted storage, quotas and live operations make AI infrastructure governable by the school itself.",
  },
] as const;

const architectureSteps = [
  ["01", "Browser", "Identity, role and the learning moment"],
  ["02", "School UI", "Authorised context, encrypted storage"],
  ["03", "DGX Spark", "Local inference, embeddings and speech"],
  ["04", "Answer", "Streamed back into the student workspace"],
] as const;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className={styles.arrow}>
      {diagonal ? "↗" : "→"}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
      <section className={styles.hero} id="top">
        <div className={styles.heroGrid}>
          <div className={`${styles.heroCopy} ${styles.enterOne}`}>
            <p className={styles.eyebrow}>
              School-controlled AI <span>Karlsruhe · 2026</span>
            </p>
            <h1>
              AI belongs
              <br />
              <em>inside</em> the school.
            </h1>
            <div className={styles.heroIntro}>
              <p>
                School UI is a private, local AI workspace designed with the
                people who teach and learn there.
              </p>
              <div className={styles.heroActions}>
                <Link className={styles.primaryButton} href="/product">
                  Explore the product <Arrow />
                </Link>
                <Link className={styles.textLink} href="/architecture">
                  How it works <Arrow diagonal />
                </Link>
              </div>
            </div>
          </div>

          <div className={`${styles.heroVisual} ${styles.enterTwo}`}>
            <Image
              src="/images/school-editorial.webp"
              alt="Editorial architectural rendering of Lessing-Gymnasium Karlsruhe at blue hour"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 58vw"
            />
            <div className={styles.heroVisualTopline}>
              <span>Built at a real school</span>
              <span>01 / 07</span>
            </div>
            <div className={styles.heroSignal}>
              <span className={styles.pulse} />
              Preparing for controlled classroom introduction
            </div>
            <div className={styles.heroCaption}>
              <span>Lessing-Gymnasium Karlsruhe</span>
              <span>School-owned infrastructure</span>
            </div>
          </div>
        </div>

        <div className={`${styles.heroRail} ${styles.enterThree}`}>
          <span>A chat that understands school</span>
          <span aria-hidden="true">✦</span>
          <span>Context stays under school control</span>
          <span aria-hidden="true">✦</span>
          <span>Built with students, not just for them</span>
        </div>
      </section>

      <section className={styles.manifesto}>
        <div className={styles.sectionIndex}>00 — Premise</div>
        <div className={styles.manifestoStatement}>
          <p>The school is not a market segment.</p>
          <h2>
            It is a living system of people, trust, knowledge and responsibility.
            The AI should understand that.
          </h2>
        </div>
        <div className={styles.manifestoNote}>
          <span className={styles.noteLine} />
          <p>
            Developed for controlled introduction at Lessing-Gymnasium
            Karlsruhe—not presented as a finished school-wide deployment.
          </p>
        </div>
      </section>

      <section className={styles.experience} id="experience">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>01 — The experience</p>
            <h2>One calm place to think, make and teach.</h2>
          </div>
          <p>
            The interface gets out of the way. Underneath, roles, projects,
            retrieval and local models keep the experience grounded in school.
          </p>
        </div>

        <div className={styles.productStage}>
          <div className={styles.productWindowMain}>
            <div className={styles.windowBar}>
              <div className={styles.windowDots} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span>Student workspace / live product</span>
              <span>DE</span>
            </div>
            <div className={styles.windowImage}>
              <Image
                src="/images/chat-screen.webp"
                alt="School UI student chat workspace with school-focused prompt suggestions"
                fill
                sizes="(max-width: 900px) 94vw, 66vw"
              />
            </div>
          </div>

          <div className={styles.productWindowSide}>
            <div className={styles.sideLabel}>Teacher view</div>
            <Image
              src="/images/project-builder.webp"
              alt="Teacher project builder with goals, tasks and guided starter questions"
              fill
              sizes="(max-width: 900px) 80vw, 32vw"
            />
          </div>

          <div className={styles.productSticker}>
            <span>School context</span>
            <strong>without</strong>
            <span>model-cloud context</span>
          </div>
        </div>

        <div className={styles.capabilityGrid}>
          {productCapabilities.map((capability) => (
            <article className={styles.capability} key={capability.number}>
              <span>{capability.number}</span>
              <h3>{capability.title}</h3>
              <p>{capability.text}</p>
            </article>
          ))}
        </div>
        <div className={styles.deepLinks}>
          <Link className={styles.textLink} href="/product">
            Open the complete product atlas <Arrow diagonal />
          </Link>
        </div>
      </section>

      <section className={styles.learningSection}>
        <div className={styles.learningCopy}>
          <p className={styles.eyebrow}>02 — Made for learning</p>
          <h2>
            Not answers.
            <br />
            <em>Momentum.</em>
          </h2>
          <p className={styles.learningLead}>
            A student can move from a question to a plot, from project material
            to reflection, and from an explanation to the next better question.
          </p>
          <ul className={styles.learningList}>
            <li>
              <span>01</span> Guided teacher projects
            </li>
            <li>
              <span>02</span> Local file and knowledge retrieval
            </li>
            <li>
              <span>03</span> Mathematics, chemistry and diagrams
            </li>
            <li>
              <span>04</span> Export, reflection and feedback
            </li>
          </ul>
        </div>

        <div className={styles.learningVisual}>
          <div className={styles.plotCard}>
            <div className={styles.plotMeta}>
              <span>Interactive output</span>
              <span>MAT / PLOT</span>
            </div>
            <Image
              src="/images/visualization-plot.webp"
              alt="Interactive quadratic-function plot generated inside School UI"
              width={1120}
              height={721}
              sizes="(max-width: 900px) 92vw, 50vw"
            />
          </div>
          <div className={styles.orbitOne} aria-hidden="true" />
          <div className={styles.orbitTwo} aria-hidden="true" />
          <div className={styles.formula} aria-hidden="true">
            y = a·x² − 1
          </div>
          <div className={styles.learningStamp}>Inspectable, not magical</div>
        </div>
      </section>

      <section className={styles.hardware} id="architecture">
        <div className={styles.hardwareHeader}>
          <p className={styles.eyebrow}>03 — School-owned intelligence</p>
          <h2>
            The cloud can stay
            <br />
            <em>outside.</em>
          </h2>
        </div>

        <div className={styles.hardwareGrid}>
          <div className={styles.hardwareVisual}>
            <Image
              src="/images/dgx-editorial.webp"
              alt="Editorial product portrait of the on-site DGX Spark used by School UI"
              fill
              sizes="(max-width: 900px) 100vw, 58vw"
            />
            <div className={styles.hardwareCredit}>
              <span>On-site inference</span>
              <span>DGX Spark / School lab</span>
            </div>
          </div>

          <div className={styles.hardwareFacts}>
            <div className={styles.factHero}>
              <span>Model</span>
              <strong>120B</strong>
              <p>GPT-OSS parameters served locally through SGLang.</p>
            </div>
            <div className={styles.factSplit}>
              <article>
                <span>Memory</span>
                <strong>128 GB</strong>
                <p>Unified memory in the compact school-owned system.</p>
              </article>
              <article>
                <span>External model clouds</span>
                <strong>0</strong>
                <p>in the planned V1 production inference path.</p>
              </article>
            </div>
            <p className={styles.hardwareBody}>
              Inference, embeddings and speech run on the school&apos;s own hardware.
              The web application selects only authorised context and keeps the
              persistent data layer separate from the model runtime.
            </p>
          </div>
        </div>

        <div className={styles.architectureFlow}>
          {architectureSteps.map(([number, title, text], index) => (
            <article className={styles.architectureStep} key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              {index < architectureSteps.length - 1 ? (
                <b aria-hidden="true">→</b>
              ) : null}
            </article>
          ))}
        </div>

        <div className={styles.privacyNote}>
          <span>Plain language, precise promise</span>
          <p>
            Personal content is encrypted at rest. The authorised prompt exists
            briefly in cleartext only where the local model needs it—on
            school-controlled infrastructure.
          </p>
        </div>
        <div className={`${styles.deepLinks} ${styles.deepLinksLight}`}>
          <Link className={styles.textLink} href="/architecture">
            Architecture deep dive <Arrow diagonal />
          </Link>
          <Link className={styles.textLink} href="/security">
            Security + encryption <Arrow diagonal />
          </Link>
          <Link className={styles.textLink} href="/infrastructure">
            Inside the DGX Spark <Arrow diagonal />
          </Link>
        </div>
      </section>

      <section className={styles.operations}>
        <div className={styles.operationsCopy}>
          <p className={styles.eyebrow}>04 — Built to be operated</p>
          <h2>Trust needs a dashboard.</h2>
          <p>
            Local does not mean invisible. School UI exposes runtime health,
            container status, power, temperature and capacity to authorised
            administrators.
          </p>
          <div className={styles.operationTags}>
            <span>Live status</span>
            <span>Allowlisted logs</span>
            <span>Transactional updates</span>
            <span>Rollback</span>
          </div>
          <div className={styles.deepLinks}>
            <Link className={styles.textLink} href="/product/operations">
              Explore operations <Arrow diagonal />
            </Link>
          </div>
        </div>
        <div className={styles.operationsVisual}>
          <div className={styles.operationsBar}>
            <span>System status / manual capture</span>
            <span className={styles.liveDot}>Live</span>
          </div>
          <Image
            src="/images/system-status.webp"
            alt="School UI system-status dashboard showing local runtime and containers"
            width={1440}
            height={1250}
            sizes="(max-width: 900px) 94vw, 55vw"
          />
        </div>
      </section>

      <section className={styles.story} id="story">
        <div className={styles.storyVisual}>
          <Image
            src="/images/team-editorial.webp"
            alt="Anonymous cut-paper illustration of a teacher and students building School UI together"
            fill
            sizes="(max-width: 900px) 100vw, 56vw"
          />
          <p>
            Editorial illustration based on the project&apos;s collaborative team
            composition; all figures are intentionally anonymous.
          </p>
        </div>

        <div className={styles.storyCopy}>
          <p className={styles.eyebrow}>05 — Built with its users</p>
          <h2>
            Students are not
            <br />
            the <em>test audience.</em>
          </h2>
          <p className={styles.storyLead}>They are part of the team.</p>
          <p>
            School UI grew inside Lessing-Gymnasium Karlsruhe through a
            teacher–student collaboration spanning software, design, testing,
            documentation and the hard questions around privacy.
          </p>
          <div className={styles.storyQuote}>
            <span>Built in school</span>
            <strong>for school</strong>
            <span>with school.</span>
          </div>
          <p className={styles.supportNote}>
            The project&apos;s DGX Spark was supported by the HOPP Foundation.
          </p>
        </div>
      </section>

      <section className={styles.schoolOrigin}>
        <div className={styles.originCopy}>
          <p className={styles.eyebrow}>06 — A familiar front door</p>
          <h2>Technology should look like it belongs.</h2>
          <p>
            The login begins with the school itself—not a stock cloud, a robot
            mascot or a promise from somewhere else.
          </p>
          <a
            href="https://lessing-gymnasium-karlsruhe.de"
            target="_blank"
            rel="noreferrer"
            className={styles.textLink}
          >
            Visit the school <Arrow diagonal />
          </a>
        </div>
        <div className={styles.loginFrame}>
          <div className={styles.loginFrameMeta}>
            <span>Original Ephraim pilot login</span>
            <span>1365 × 900</span>
          </div>
          <Image
            src="/images/login-screen.png"
            alt="Original Ephraim-branded pilot login using the school building artwork"
            width={1365}
            height={900}
            sizes="(max-width: 900px) 94vw, 58vw"
          />
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalTopline}>
          <span>07 — Next period</span>
          <span>school-ui.com</span>
        </div>
        <h2>
          Build the AI
          <br />
          your school can <em>own.</em>
        </h2>
        <div className={styles.finalBottom}>
          <p>
            School UI is being prepared for controlled classroom introduction.
            Follow the public landing-page project as the story develops.
          </p>
          <a
            className={styles.finalButton}
            href="https://github.com/school-ui/landing-page"
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub <Arrow diagonal />
          </a>
        </div>
      </section>

      </main>
      <SiteFooter />
    </>
  );
}
