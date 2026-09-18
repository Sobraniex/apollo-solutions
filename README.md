# Apollo Solutions

Independent software studio in Slovenia. We build paid software for better workplaces: workflows, automation, local technology, and data protection. Hermes Dental is the first product.

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
- Hermes: http://127.0.0.1:8101/hermes/
- Plans: http://127.0.0.1:8101/hermes/pricing.html

No build step or package installation is required. Relative links also work at the GitHub Pages project path, /apollo-solutions/.

## Site structure

- index.html, home.css, studio.css, home.js: studio homepage, English and Slovenian. The company-specific visual layer is isolated in studio.css so plan pages keep their existing layout.
- hermes/: existing product site and documentation.
- hermes/pricing.html, trial.html, plan-info.css, plan-info.js: public plan information and trial availability.
- blog/ and news/: historical articles, no longer promoted on the homepage. They have archive notices and are excluded from indexing.
- app.js and styles.css: retained for the historical articles.

The Hermes application lives separately in ../hermes-dental-clone/app.

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

Add a real public contact route before accepting pricing enquiries or trial registrations. Confirm the commercial terms before enabling signup or payment. Existing Hermes security, legal, download, and service-status pages predate this positioning update and still need a product-specific accuracy review; the homepage does not repeat their certification or service-level claims.

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
