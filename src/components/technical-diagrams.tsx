import { useId } from "react";
import styles from "./technical-diagrams.module.css";

function SvgText({
  x,
  y,
  title,
  detail,
  align = "start",
}: {
  x: number;
  y: number;
  title: string;
  detail?: string;
  align?: "start" | "middle";
}) {
  return (
    <text x={x} y={y} textAnchor={align} className={styles.nodeText}>
      <tspan x={x} className={styles.nodeTitle}>
        {title}
      </tspan>
      {detail ? (
        <tspan x={x} dy="22" className={styles.nodeDetail}>
          {detail}
        </tspan>
      ) : null}
    </text>
  );
}

export function SystemArchitectureDiagram() {
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descId = `${baseId}-desc`;
  const arrowId = `${baseId}-arrow`;
  const gridId = `${baseId}-grid`;
  return (
    <figure className={styles.figure}>
      <div className={styles.figureTopline}>
        <span>Logical system map</span>
        <span>Data plane + control plane</span>
      </div>
      <div className={styles.scrollArea}>
        <svg
          className={styles.systemMap}
          viewBox="0 0 1440 850"
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
        >
          <title id={titleId}>School UI system architecture</title>
          <desc id={descId}>
            Browser clients connect to the PHP web application. The application
            stores durable encrypted data in MySQL and encrypted file storage,
            uses a non-persistent Valkey speed layer, and calls the local DGX
            Spark for inference, embeddings, speech, and runtime monitoring.
          </desc>
          <defs>
            <marker
              id={arrowId}
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 Z" className={styles.arrowHead} />
            </marker>
            <pattern
              id={gridId}
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 28 0 L 0 0 0 28" className={styles.gridLine} />
            </pattern>
          </defs>

          <rect width="1440" height="850" className={styles.mapBackground} />
          <rect width="1440" height="850" fill={`url(#${gridId})`} />

          <text x="54" y="44" className={styles.coordinate}>
            TRUST BOUNDARY 01 / PEOPLE
          </text>
          <text x="360" y="44" className={styles.coordinate}>
            TRUST BOUNDARY 02 / WEB + DATA
          </text>
          <text x="1032" y="44" className={styles.coordinate}>
            TRUST BOUNDARY 03 / LOCAL COMPUTE
          </text>

          <rect
            x="48"
            y="68"
            width="248"
            height="720"
            className={styles.paperZone}
          />
          <rect
            x="340"
            y="68"
            width="620"
            height="720"
            className={styles.webZone}
          />
          <rect
            x="1004"
            y="68"
            width="388"
            height="720"
            className={styles.sparkZone}
          />

          <text x="70" y="102" className={styles.zoneLabelDark}>
            BROWSER CLIENTS
          </text>
          <rect
            x="70"
            y="126"
            width="204"
            height="108"
            className={styles.paperNode}
          />
          <SvgText
            x={92}
            y={164}
            title="Students"
            detail="chat · files · projects"
          />
          <rect
            x="70"
            y="258"
            width="204"
            height="108"
            className={styles.paperNode}
          />
          <SvgText
            x={92}
            y={296}
            title="Teachers"
            detail="context · projects"
          />
          <rect
            x="70"
            y="390"
            width="204"
            height="108"
            className={styles.paperNode}
          />
          <SvgText
            x={92}
            y={428}
            title="Administrators"
            detail="status · governance"
          />
          <rect
            x="70"
            y="612"
            width="204"
            height="132"
            className={styles.orangeNote}
          />
          <text x="92" y="648" className={styles.noteTitle}>
            DISPLAY BOUNDARY
          </text>
          <text x="92" y="678" className={styles.noteBody}>
            <tspan x="92">Approved plaintext is visible</tspan>
            <tspan x="92" dy="20">
              only for the active experience.
            </tspan>
          </text>

          <text x="364" y="102" className={styles.zoneLabelLight}>
            SCHOOL WEB TIER
          </text>
          <rect
            x="364"
            y="126"
            width="572"
            height="122"
            className={styles.primaryNode}
          />
          <SvgText
            x={390}
            y={166}
            title="PHP application + Vanilla JS / HTMX"
            detail="identity · roles · context assembly · APIs · SSE"
          />
          <text x="904" y="156" textAnchor="end" className={styles.portStamp}>
            HTTPS
          </text>

          <rect
            x="364"
            y="286"
            width="270"
            height="130"
            className={styles.darkNode}
          />
          <SvgText
            x={390}
            y={328}
            title="MySQL"
            detail="durable encrypted truth"
          />
          <text
            x="606"
            y="316"
            textAnchor="end"
            className={styles.portStampLight}
          >
            PERSISTENT
          </text>

          <rect
            x="666"
            y="286"
            width="270"
            height="130"
            className={styles.darkNode}
          />
          <SvgText
            x={692}
            y={328}
            title="Valkey / Redis"
            detail="encrypted stream speed layer"
          />
          <text
            x="908"
            y="316"
            textAnchor="end"
            className={styles.portStampLight}
          >
            NO DISK
          </text>

          <rect
            x="364"
            y="448"
            width="270"
            height="130"
            className={styles.darkNode}
          />
          <SvgText
            x={390}
            y={490}
            title="Encrypted files"
            detail="outside the web root"
          />
          <text
            x="606"
            y="478"
            textAnchor="end"
            className={styles.portStampLight}
          >
            EFR1
          </text>

          <rect
            x="666"
            y="448"
            width="270"
            height="130"
            className={styles.darkNode}
          />
          <SvgText
            x={692}
            y={490}
            title="Workers + cron"
            detail="jobs · indexing · cleanup"
          />
          <text
            x="908"
            y="478"
            textAnchor="end"
            className={styles.portStampLight}
          >
            LOCAL
          </text>

          <rect
            x="364"
            y="626"
            width="572"
            height="118"
            className={styles.webNote}
          />
          <text x="390" y="660" className={styles.noteTitleLight}>
            THE WEB APPLICATION DECIDES
          </text>
          <text x="390" y="690" className={styles.noteBodyLight}>
            <tspan x="390">
              Permissions, retrieval and context selection happen here—
            </tspan>
            <tspan x="390" dy="20">
              before any local model request is assembled.
            </tspan>
          </text>

          <rect
            x="974"
            y="86"
            width="18"
            height="684"
            className={styles.bridge}
          />
          <text
            x="986"
            y="430"
            transform="rotate(-90 986 430)"
            textAnchor="middle"
            className={styles.bridgeText}
          >
            RESTRICTED SCHOOL-CONTROLLED LINK
          </text>

          <text x="1028" y="102" className={styles.zoneLabelDark}>
            DGX SPARK / LOCAL MODEL RUNTIME
          </text>
          <rect
            x="1028"
            y="126"
            width="340"
            height="100"
            className={styles.sparkNodeStrong}
          />
          <SvgText
            x={1052}
            y={164}
            title="Inference"
            detail="SGLang · GPT-OSS-120B · :8000"
          />

          <rect
            x="1028"
            y="246"
            width="164"
            height="100"
            className={styles.sparkNode}
          />
          <SvgText x={1050} y={282} title="Embedding" detail="local · :8001" />
          <rect
            x="1204"
            y="246"
            width="164"
            height="100"
            className={styles.sparkNode}
          />
          <SvgText x={1226} y={282} title="Speech" detail="profile · :8006" />

          <rect
            x="1028"
            y="386"
            width="340"
            height="100"
            className={styles.sparkNodeStrong}
          />
          <SvgText
            x={1052}
            y={424}
            title="Runtime"
            detail="metrics + admin WebSockets · :8003"
          />

          <rect
            x="1028"
            y="506"
            width="164"
            height="100"
            className={styles.sparkNode}
          />
          <SvgText
            x={1050}
            y={542}
            title="Observer"
            detail="Unix socket only"
          />
          <rect
            x="1204"
            y="506"
            width="164"
            height="100"
            className={styles.sparkNode}
          />
          <SvgText
            x={1226}
            y={542}
            title="Supervisor"
            detail="outside Compose · :8002"
          />

          <rect
            x="1028"
            y="646"
            width="340"
            height="98"
            className={styles.sparkNote}
          />
          <text x="1052" y="678" className={styles.noteTitle}>
            REQUEST-ONLY COMPUTE
          </text>
          <text x="1052" y="706" className={styles.noteBody}>
            <tspan x="1052">No prompt, response or RAG database</tspan>
            <tspan x="1052" dy="19">
              is persisted on the Spark.
            </tspan>
          </text>

          <path
            d="M274 180 H364"
            className={styles.flowLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M274 312 C316 312 316 202 364 202"
            className={styles.flowLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M274 444 C318 444 316 224 364 224"
            className={styles.flowLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M500 248 V286"
            className={styles.internalLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M650 248 C650 268 800 264 800 286"
            className={styles.internalLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M500 416 V448"
            className={styles.internalLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M800 416 V448"
            className={styles.internalLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M936 164 H1028"
            className={styles.flowLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M936 184 C974 184 976 296 1028 296"
            className={styles.flowLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M936 204 C974 204 976 316 1204 316"
            className={styles.flowLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M936 226 C974 226 974 436 1028 436"
            className={styles.controlLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M1198 486 V506"
            className={styles.controlLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M1198 556 H1204"
            className={styles.controlLine}
            markerEnd={`url(#${arrowId})`}
          />
        </svg>
      </div>
      <figcaption className={styles.caption}>
        Orange traces the authorised request path. Dashed blue traces the admin
        control path. Durable personal and project data remains in the web tier;
        the Spark is a local compute destination, not the system of record.
      </figcaption>
    </figure>
  );
}

export function VaultKeyDiagram() {
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descId = `${baseId}-desc`;
  const arrowId = `${baseId}-arrow`;
  return (
    <figure className={`${styles.figure} ${styles.lightFigure}`}>
      <div className={styles.figureTopline}>
        <span>Private Vault / normal unlock</span>
        <span>Key path, not a metaphor</span>
      </div>
      <div className={styles.scrollArea}>
        <svg
          className={styles.vaultMap}
          viewBox="0 0 1400 560"
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
        >
          <title id={titleId}>School UI Vault key hierarchy</title>
          <desc id={descId}>
            A password and per-account salt are processed by Argon2id to derive
            a key-encryption key. That key unwraps a random user data-encryption
            key, which protects private content with XChaCha20-Poly1305.
          </desc>
          <defs>
            <marker
              id={arrowId}
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 Z" className={styles.vaultArrowHead} />
            </marker>
          </defs>
          <rect width="1400" height="560" className={styles.vaultBackground} />
          <path
            d="M210 192 H342"
            className={styles.vaultLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M210 342 C270 342 278 238 342 238"
            className={styles.vaultLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M550 216 H674"
            className={styles.vaultLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M890 216 H1012"
            className={styles.vaultLine}
            markerEnd={`url(#${arrowId})`}
          />

          <rect
            x="50"
            y="132"
            width="160"
            height="120"
            className={styles.keyInput}
          />
          <text x="72" y="168" className={styles.keyIndex}>
            INPUT 01
          </text>
          <SvgText
            x={72}
            y={202}
            title="Password"
            detail="not stored as a key"
          />

          <rect
            x="50"
            y="292"
            width="160"
            height="100"
            className={styles.saltInput}
          />
          <text x="72" y="326" className={styles.keyIndex}>
            INPUT 02
          </text>
          <SvgText x={72} y={360} title="16-byte salt" />

          <rect
            x="342"
            y="146"
            width="208"
            height="140"
            className={styles.kdfNode}
          />
          <text x="366" y="182" className={styles.keyIndexLight}>
            KDF
          </text>
          <text x="366" y="222" className={styles.cryptoTitle}>
            Argon2id
          </text>
          <text x="366" y="250" className={styles.cryptoDetail}>
            opslimit 3 · 64 MiB
          </text>

          <rect
            x="674"
            y="146"
            width="216"
            height="140"
            className={styles.kekNode}
          />
          <text x="698" y="182" className={styles.keyIndexLight}>
            DERIVED
          </text>
          <text x="698" y="222" className={styles.cryptoTitle}>
            KEK
          </text>
          <text x="698" y="250" className={styles.cryptoDetail}>
            unwraps one key
          </text>

          <rect
            x="1012"
            y="126"
            width="328"
            height="180"
            className={styles.dekNode}
          />
          <text x="1038" y="164" className={styles.keyIndexLight}>
            RANDOM / 32 BYTES
          </text>
          <text x="1038" y="208" className={styles.cryptoTitle}>
            User-DEK
          </text>
          <text x="1038" y="240" className={styles.cryptoDetail}>
            protects the private Vault
          </text>
          <text
            x="1314"
            y="278"
            textAnchor="end"
            className={styles.portStampLight}
          >
            XCHACHA20
          </text>

          <rect
            x="342"
            y="354"
            width="548"
            height="130"
            className={styles.separateHash}
          />
          <text x="366" y="390" className={styles.keyIndex}>
            SEPARATE LOGIN CHECK
          </text>
          <text x="366" y="430" className={styles.hashTitle}>
            bcrypt · cost 12
          </text>
          <text x="366" y="458" className={styles.hashDetail}>
            The password hash is not a data-encryption key.
          </text>

          <path
            d="M1176 306 V354"
            className={styles.vaultLine}
            markerEnd={`url(#${arrowId})`}
          />
          <rect
            x="1012"
            y="354"
            width="328"
            height="130"
            className={styles.dataNode}
          />
          <text x="1038" y="390" className={styles.keyIndex}>
            PROTECTED CONTENT
          </text>
          <text x="1038" y="430" className={styles.dataTitle}>
            Chats · files · memories
          </text>
          <text x="1038" y="458" className={styles.hashDetail}>
            summaries · private embeddings
          </text>

          <text x="50" y="520" className={styles.formulaText}>
            KEK = Argon2id(password, salt, 3 ops, 64 MiB)
          </text>
          <text
            x="890"
            y="520"
            textAnchor="end"
            className={styles.formulaTextMuted}
          >
            DEK ≠ password ≠ password hash
          </text>
        </svg>
      </div>
      <figcaption className={styles.captionDark}>
        A password change derives a new KEK and rewraps the same User-DEK; the
        encrypted private content does not need to be rewritten.
      </figcaption>
    </figure>
  );
}

export function ContainerTopologyDiagram() {
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descId = `${baseId}-desc`;
  const arrowId = `${baseId}-arrow`;
  return (
    <figure className={styles.figure}>
      <div className={styles.figureTopline}>
        <span>DGX Spark service topology</span>
        <span>6 Compose containers + Supervisor + host Coordinator</span>
      </div>
      <div className={styles.scrollArea}>
        <svg
          className={styles.containerMap}
          viewBox="0 0 1440 840"
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
        >
          <title id={titleId}>DGX Spark container topology</title>
          <desc id={descId}>
            Six containers share a Docker Compose lifecycle when optional
            text-to-speech is enabled, but they do not share one network mode.
            Inference, embedding, Runtime, and speech use host networking;
            Observer uses no network; log rotation uses the default network. The
            Supervisor and host Coordinator sit outside Compose.
          </desc>
          <defs>
            <marker
              id={arrowId}
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 Z" className={styles.arrowHead} />
            </marker>
          </defs>
          <rect width="1440" height="840" className={styles.mapBackground} />
          <rect
            x="44"
            y="54"
            width="1050"
            height="728"
            rx="2"
            className={styles.composeBoundary}
          />
          <text x="68" y="88" className={styles.zoneLabelLight}>
            DOCKER COMPOSE / MIXED NETWORK MODES
          </text>
          <text x="1068" y="88" textAnchor="end" className={styles.coordinate}>
            LIFECYCLE BOUNDARY ≠ SHARED NETWORK
          </text>

          <rect
            x="80"
            y="126"
            width="448"
            height="190"
            className={styles.containerPrimary}
          />
          <text x="108" y="164" className={styles.containerIndex}>
            01 / DATA PLANE
          </text>
          <text x="108" y="214" className={styles.containerTitle}>
            school-ui-inference
          </text>
          <text x="108" y="248" className={styles.containerDetail}>
            SGLang · GPT-OSS-120B · host
          </text>
          <text
            x="500"
            y="288"
            textAnchor="end"
            className={styles.containerPort}
          >
            :8000
          </text>

          <rect
            x="566"
            y="126"
            width="448"
            height="190"
            className={styles.containerNode}
          />
          <text x="594" y="164" className={styles.containerIndexDark}>
            02 / DATA PLANE
          </text>
          <text x="594" y="214" className={styles.containerTitleDark}>
            school-ui-embedding
          </text>
          <text x="594" y="248" className={styles.containerDetailDark}>
            SGLang · gte-Qwen2-1.5B · host
          </text>
          <text
            x="986"
            y="288"
            textAnchor="end"
            className={styles.containerPortDark}
          >
            :8001
          </text>

          <rect
            x="80"
            y="354"
            width="286"
            height="160"
            className={styles.containerNode}
          />
          <text x="106" y="390" className={styles.containerIndexDark}>
            03 / CONTROL
          </text>
          <text x="106" y="434" className={styles.containerTitleSmall}>
            Runtime
          </text>
          <text x="106" y="466" className={styles.containerDetailDark}>
            host · metrics · WebSockets · :8003
          </text>

          <rect
            x="394"
            y="354"
            width="286"
            height="160"
            className={styles.containerNode}
          />
          <text x="420" y="390" className={styles.containerIndexDark}>
            04 / BOUNDARY
          </text>
          <text x="420" y="434" className={styles.containerTitleSmall}>
            Observer
          </text>
          <text x="420" y="466" className={styles.containerDetailDark}>
            Unix socket · no network
          </text>

          <rect
            x="708"
            y="354"
            width="306"
            height="160"
            className={styles.containerOptional}
          />
          <text x="734" y="390" className={styles.containerIndexDark}>
            05 / OPTIONAL PROFILE
          </text>
          <text x="734" y="434" className={styles.containerTitleSmall}>
            Local speech
          </text>
          <text x="734" y="466" className={styles.containerDetailDark}>
            host · sherpa-onnx · CPU · :8006
          </text>

          <rect
            x="80"
            y="552"
            width="934"
            height="112"
            className={styles.containerUtility}
          />
          <text x="108" y="590" className={styles.containerIndexDark}>
            06 / RETENTION UTILITY
          </text>
          <text x="108" y="630" className={styles.containerTitleSmall}>
            school-ui-logrotate
          </text>
          <text
            x="986"
            y="630"
            textAnchor="end"
            className={styles.containerDetailDark}
          >
            default network · bounded logs · no port
          </text>

          <rect
            x="1138"
            y="164"
            width="258"
            height="410"
            className={styles.supervisorZone}
          />
          <text x="1164" y="202" className={styles.containerIndex}>
            OUTSIDE COMPOSE
          </text>
          <text x="1164" y="254" className={styles.supervisorTitle}>
            Supervisor
          </text>
          <text x="1164" y="290" className={styles.containerDetail}>
            <tspan x="1164">prepare</tspan>
            <tspan x="1164" dy="25">
              verify
            </tspan>
            <tspan x="1164" dy="25">
              switch
            </tspan>
            <tspan x="1164" dy="25">
              probe
            </tspan>
            <tspan x="1164" dy="25">
              rollback
            </tspan>
          </text>
          <text
            x="1370"
            y="544"
            textAnchor="end"
            className={styles.containerPort}
          >
            :8002
          </text>

          <rect
            x="1138"
            y="618"
            width="258"
            height="122"
            className={styles.hostCoordinator}
          />
          <text x="1164" y="654" className={styles.containerIndexDark}>
            HOST CONTROL
          </text>
          <text x="1164" y="696" className={styles.containerTitleSmall}>
            Coordinator
          </text>
          <text x="1164" y="718" className={styles.containerDetailDark}>
            safe supervisor handoff
          </text>

          <path
            d="M528 220 H566"
            className={styles.flowLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M366 434 H394"
            className={styles.controlLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M680 434 H708"
            className={styles.internalLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M1014 434 C1080 434 1080 370 1138 370"
            className={styles.controlLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M1266 574 V618"
            className={styles.controlLine}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M1138 238 C1098 238 1088 220 1014 220"
            className={styles.controlLine}
            markerEnd={`url(#${arrowId})`}
          />
          <text x="70" y="742" className={styles.formulaTextLight}>
            readiness(inference) → start(embedding)
          </text>
          <text
            x="1014"
            y="742"
            textAnchor="end"
            className={styles.formulaTextLight}
          >
            observer → allowlisted read operations only
          </text>
        </svg>
      </div>
      <figcaption className={styles.caption}>
        The outline marks the Compose lifecycle, not a shared application
        network. TTS is profile-gated. The Supervisor and host Coordinator are
        intentionally separate from the stack they recover.
      </figcaption>
    </figure>
  );
}
