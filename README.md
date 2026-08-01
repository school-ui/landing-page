# School UI systems atlas

The public website for [School UI](https://school-ui.com): a locally operated school-AI project developed at Lessing-Gymnasium Karlsruhe. The site begins as an editorial landing page and opens into a technical atlas of the product, privacy model, infrastructure and classroom workflows.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production checks

```bash
npm run lint
npm run build
```

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- CSS Modules
- `next/image` and `next/font`
- Biome (linter + formatter)

## Site map

- `/` — public landing page
- `/architecture` — request paths, trust boundaries, RAG and observability
- `/security` — privacy model and implemented control map
- `/security/encryption` — key domains, envelopes and recovery boundaries
- `/infrastructure` — DGX Spark, containers, model placement and benchmarks
- `/product` — the manual reimagined as a visual product atlas
- `/product/*` — chat, projects, visualizations, files, personal space, operations and governance

The architecture drawings are code-native, responsive SVG diagrams with text alternatives. The product atlas is statically generated from a typed content model in `src/data/product-pages.ts`.

## Image notes

The product screenshots and benchmark plots are drawn from the School UI application manuals. Screenshots retain the pilot application's Ephraim-era interface where that is what the manual records; captions identify them as pilot UI rather than presenting them as a renamed production release. Gallery captures use documented fictional handbook fixtures or identity-free operational views; captures bearing a real project-lead account name are excluded.

The editorial school and hardware images were generated from project-owned references for this site. The DGX Spark portrait preserves the NVIDIA mark visible on the supplied hardware reference. The team artwork is intentionally anonymous and does not reproduce the identities in the private source photograph.

The generated editorial set used three art directions: a blue-hour architectural school portrait, an NVIDIA-logo-preserving DGX Spark product study based on the supplied reference, and an anonymous cut-paper teacher/student collaboration scene.

The technical copy describes the current pilot implementation. It deliberately does not claim certification, zero-knowledge operation, legal compliance, an air gap or a production deployment. The School UI application itself is internal; this repository contains only the public website.
