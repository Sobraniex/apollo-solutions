# Apollo Solutions

Independent AI and software studio in Slovenia. The homepage leads with six DGX Spark model configurations and three installation tiers. Hermes Dental has a small product section and its own site.

## Live site

One GitHub Pages URL for the studio and the first product:

- Studio: https://sobraniex.github.io/apollo-solutions/
- Hermes Dental: https://sobraniex.github.io/apollo-solutions/hermes/
- macOS app: https://github.com/Sobraniex/apollo-solutions/releases/download/v0.3.3/Hermes-Dental-v0.3.3.zip

## Local preview

```sh
cd /Users/julijan/apollo-solutions
python3 -m http.server 8101 --bind 127.0.0.1
```

- Studio: http://127.0.0.1:8101/
- Solo DGX Spark installation: http://127.0.0.1:8101/solo-dgx-spark.html
- Hermes: http://127.0.0.1:8101/hermes/
- Plans: http://127.0.0.1:8101/hermes/pricing.html

No package installation is required. After editing homepage translations, run `python3 scripts/build-sl.py` to regenerate the static Slovenian homepage. Relative links also work at the GitHub Pages project path, /apollo-solutions/.

## Site structure

- index.html, sl/index.html, home.css, studio.css, models.css, privacy.css, home.js: separate English and Slovenian homepage URLs. `scripts/build-sl.py` generates the Slovenian page from the bilingual source. The company-specific visual layers are isolated so plan pages keep their existing layout.
- solo-dgx-spark.html, sl/solo-dgx-spark.html, solo-dgx-spark.css: dedicated bilingual €500 Solo installation offer. `scripts/build-sl.py` also regenerates the Slovenian service page.
- hermes/: existing product site and documentation.
- hermes/pricing.html, trial.html, plan-info.css, plan-info.js: public plan information and trial availability.
- blog/ and news/: historical articles, no longer promoted on the homepage. They have archive notices and are excluded from indexing.
- app.js and styles.css: retained for the historical articles.

The Hermes application lives separately in ../hermes-dental-clone/app.

## Guided AI and data privacy introduction — 25 September 2026

- The `00 / Before the models` section uses a small shop’s customer email to compare hosted and carefully configured local AI data paths. Three separate cards explain model training, data retention, and lawful government requests.
- Published provider terms show differences between personal chat and business/API accounts. The US and China legal cards explain jurisdiction and cross-border limits without suggesting automatic government access. The EU timeline reflects the AI Omnibus dates verified against European Commission guidance, alongside GDPR principles and practical preparation.
- The five-question takeaway is available in English and Slovenian. The source links are on the page. Recheck provider terms and regulatory guidance when they change.

## Solo DGX Spark service page — 25 September 2026

- The homepage Solo card links to a dedicated English or Slovenian page covering one compatible model on one customer-owned Spark, remote access, configuration, a test request, one session, handoff document, and seven days of follow-up.
- Order and cart buttons are visible and disabled until a booking route exists. The €1,000 and €2,000 tiers, model catalog, price comparison, empty Apollo GitHub slots, and exact docs placeholder remain on the homepage.

## API cost comparison — 25 September 2026

- Restored the interactive input/output cost chart using the then-current published standard Claude Opus 5.5 rates ($4 input, $20 output per million tokens) and DeepSeek V4.1 Flash peak rates ($0.30 input, $1.20 output per million tokens), with uncached input.
- The 1M input + 1M output example is $24 versus $1.50, a 93.75% lower API token price for DeepSeek. The chart allows input-only and output-only views.
- The explanation covers selective computation, smaller cache, cached input, off-peak pricing, provider pricing choices, and why equal tokens do not imply equal task quality. It also separates API fees from local hardware and installation costs.
- Provider pages are linked directly in the section. The comparison is dated because rates can change.

## DGX Spark catalog — 25 September 2026

- Six model cards mirror the configurations listed by Mia AI Lab, with its published decode speeds explicitly labelled as reference figures. Apollo has not measured them.
- The public GitHub slots are intentionally empty until the owner provides Apollo repository URLs. The source repositories for each slot are listed below so the mapping is unambiguous. All six upstream repositories report AGPL-3.0; preserve their license and attribution when reposting derivative code.
- The installation tiers are 1 Spark (€500), 2 Sparks (€1,000), and 4 Sparks (€2,000). Each outlines one remote installation session, handover notes, and seven days of follow-up. Hardware is separate. Booking and payment links are pending.
- The website displays the requested placeholder text: `apollo docs to be made by you`.

| Model card | Upstream source | Apollo URL |
| --- | --- | --- |
| Qwen3.8 Flash Next, 1 Spark | https://github.com/MiaAI-Lab/Qwen3.8-Flash-Next-Single-DGX-Spark | Pending |
| GLM 5.3 Flash, 2–4 Sparks | https://github.com/MiaAI-Lab/GLM-5.3-Flash-EXL3-2x-DGX-Sparks | Pending |
| Qwen3.8 Flash Next, 2 Sparks | https://github.com/MiaAI-Lab/Qwen3.8-Flash-Next-Dual-DGX-Sparks | Pending |
| DeepSeek V4.1 Flash EXL3, 2 Sparks | https://github.com/MiaAI-Lab/DeepSeek-v4.1-Flash-EXL3-2x-DGX-Sparks | Pending |
| MiMo V2.6 Flash, 2 Sparks | https://github.com/MiaAI-Lab/MiMo-V2.6-Flash-2x-DGX-Sparks | Pending |
| DeepSeek V4.1 Flash, 3–4 Sparks | https://github.com/MiaAI-Lab/DeepSeek-v4.1-Flash-DGX-Sparks | Pending |

## Homepage direction — 25 September 2026

- Local AI is the primary offer in the headline, navigation, service cards, and process section. The page explains hardware review, model selection, installation, integration, testing, and handover.
- The service is labelled as in development. There is no invented booking link, public email address, hardware package, benchmark, or pricing promise.
- Hermes Dental appears as a compact product card linking to its existing product site. Its detailed scope and plan information remain there.
- Removed the dental-specific interactive workbench and model cost comparison from the homepage. The English and Slovenian pages and metadata share the new positioning.
- This earlier version was published as commit `8bcc1c7` before the DGX Spark catalog revision.

## Site accuracy update — 25 September 2026

- Added a crawlable `/sl/` homepage with its own canonical URL, reciprocal language links, translated metadata, and sitemap entry.
- The Hermes pricing page now states the current fit: independent private practices with one chair, macOS, and a person responsible for rollout. Scope and price are agreed in writing.
- Corrected the Hermes security page using the current application: the local SQLite file is not encrypted by the app, backups use AES-256-GCM, and local and hosted staff authentication use different password hashing methods.
- Replaced unsupported trial, cancellation, GDPR, legal-entity, and response-time promises on public supporting pages. Removed a cookie banner that claimed PostHog and Sentry were active, although neither script was loaded.
- A public enquiry address and legal operator name/address still need owner confirmation. The site does not submit enquiries or state an unverified identity.

## Positioning update — 17 September 2026

- New homepage: “Architects of better work”, one featured product with actual application screenshots, four design principles, studio introduction, FAQ, and contact availability.
- Removed the reserved product cards and placeholder posts. Historical essays are marked as archived because their commercial positioning is superseded.
- Paid monthly plans; pricing on request. No public plan amounts.
- No Apollo contact email exists yet. The site states that contact details are coming soon; it does not invent an address or accept enquiries.
- The previous draft trial form depended on an unconfigured API endpoint. The public trial page now explains availability instead of collecting details. The original draft files were copied outside the public site to /Users/julijan/apollo-site-backups/2026-09-17-before-positioning/.
- Updated Hermes landing-page copy to match the paid model. Fixed gallery initialization so the language switch and screenshots work.
- Homepage mobile menu supports keyboard focus, Escape, link selection, and closing outside the header. Motion respects the reduced-motion preference.
- No deployment, commit, or push performed as part of this update.

## Remaining publication decisions

Add a verified public contact route before accepting pricing enquiries or trial registrations. Confirm the legal operator details and commercial terms before enabling signup or payment. Download and service-status pages still need product-specific accuracy review; the homepage does not repeat their certification or service-level claims.

A custom domain has not been selected. Canonical and share URLs currently use the existing GitHub Pages address.

## Company-first refinement — 17 September 2026

The homepage now leads with Apollo’s purpose: affordable workflow software, practical AI, and more room for people to do useful work. Three focus areas distinguish connected software, agents on private computers, and assistants inside apps. These are clearly described as the direction of the company; Hermes remains the first product.

Added three interactive, bilingual workflow illustrations (scheduling, organising documents, and following up). These are static examples, not a live agent or a form. Language switching preserves the selected example. No model requests or record writes occur.

Replaced the orbit-only logo with an A monogram, orbital stroke, and warm accent; updated the favicon and sharing image. Hermes now has a compact dark product section. Added more detail on affordability, reviewable accuracy, data boundaries, and the social motivation behind Apollo. No prices, contact address, customer metrics, or certification claims were invented.

## Interactive workbench — 18 September 2026

The former text-only workflow examples are now one tabbed Explore Apollo section, implemented in workbench.js and workbench.css. It contains:

- Workflow Lab: three fictional examples (documents, scheduling, follow-ups). Visitors inspect source excerpts, prepare a draft, review a missing decision, apply it to the sample, undo, and reset. Applying the update requires a valid explicit choice. Nothing is sent or saved to a product.
- Time calculator: people × repetitions per person per day × minutes per repetition × working days ÷ 60. The visitor selects the assumed reduction; an optional EUR hourly cost estimates the value of freed capacity. It does not claim cash savings or net returns. Inputs are bounded and validated, with zero-workload and blank optional-cost states supported.
- Data & control: local and external-model paths, clickable source/application/model nodes, and plain explanations of permissions, external context transfer, and separate backup/integration flows. These are educational configurations, not live settings or promises that every product supports every arrangement.

The controls work in English and Slovenian, retain selections and calculator inputs across language/tab switches, and support keyboard tab navigation. The workbench uses no model calls, uploads, API requests, cookies, or persistent sample state. The existing language preference still uses localStorage. Existing font and image assets can make normal browser asset requests.

Validation: all three lab lifecycles, required review, source inspection, undo/reset, calculator arithmetic and invalid/zero/maximum inputs, both data paths, keyboard controls, language-state persistence, no API/write requests, 320/390/768/1024/1440px layouts in EN/SL, no-JavaScript fallback, and reduced-motion behaviour. JavaScript syntax and git diff whitespace checks passed.

Pricing remains on request and public contact details remain pending. No deployment, commit, or push was performed.

## Everyday work refinement — 18 September 2026

Replaced the Sources / Draft / Review / Result wizard with immediately visible question-and-answer examples: finding an appointment in a dental clinic, checking unfinished tasks in a beauty clinic, and asking about tomorrow from a phone. Visitors choose a situation; there are no workflow stages to learn. Conversations use fictional information and do not connect to a clinic or change records.

The homepage now explains the purpose around an eight-to-ten-hour working day: less repetitive admin, fewer interruptions, and less unfinished work to carry home. Dental and beauty clinics are the initial focus; Hermes Dental remains the first named product. Copy describes tailored open-source agent installations on private computers, phone access, and lower-cost AI models. Phone access depends on the configured connections, permissions, and work computer being available. Local installation and local AI processing remain clearly distinguished.

Renamed the interactive tabs to Your working day / Time saved / Your data. The calculator also shows estimated minutes freed per day across the team; its monthly calculation, editable assumptions, and cost caveats remain. The data explanations use simpler language. All changes include English and Slovenian copy.

No 85% cost reduction or guaranteed efficiency multiplier is published: the comparison has not been substantiated, and the owner agreed to continue without the percentage. Monthly pricing stays on request; public contact details are still pending.

Validation: all three conversations, language and selection persistence, daily/monthly calculator arithmetic and invalid inputs, data choices, keyboard tab controls, EN/SL layouts at 320/390/768/1024/1440px, and the no-JavaScript fallback passed. Browser checks found no JavaScript errors or API/write requests. JavaScript syntax and git diff whitespace checks passed. Desktop and Slovenian phone screenshots were visually reviewed. No deployment, commit, or push was performed.

The clinic examples now appear inside a desktop app illustration with diary/task context and an embedded assistant. Away from work uses a separate, narrower phone frame with teal messaging bubbles, a phone status bar, and a decorative message composer. The composer and app navigation are non-interactive illustration elements; no real messaging integration is implied. Both layouts were checked in EN/SL at 320/390/768/1440px and visually reviewed on desktop and a narrow phone screen. Language switching preserves the selected example.

## Affordability and agent setup — 18 September 2026

The owner clarified that the earlier 85% comparison concerned hosted model usage prices, not the total Apollo service cost. Added a bilingual affordability section explaining Apollo’s setup expertise, open-source agents, choosing models for specific tasks, and reducing unnecessary processing. A clinic example distinguishes the model’s language/tool-selection role from scheduling checks and software-controlled execution. Comparable outcomes are explained as task-dependent and subject to verification, not a measured Apollo performance claim.

New expandable answers explain why model serving can cost less (selective computation, compact memory, input reuse, and off-peak rates), and why agent tools can let different models reach the same correct result on a bounded task. Sources link directly to DeepSeek’s V4.1 Flash model card and pricing, plus Anthropic’s agent design and evaluation articles. Architecture is not presented as the sole cause of provider price differences. No fixed percentage, universal quality equivalence, or guaranteed lowest-price claim was added.

Setup/service costs remain distinct from model usage, and a private agent installation does not imply that the model runs locally. Monthly pricing remains on request. Checked the new section and expanded FAQs in EN/SL at 320/390/768/1440px, including visual review and no browser errors. No commit, push, or deployment performed.
