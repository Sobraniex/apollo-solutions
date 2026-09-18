#!/usr/bin/env node
/**
 * One-shot generator for the 7 "user guide" doc pages.
 * Run from this directory: `node _gen-docs.mjs`.
 * Idempotent — overwrites the .html files.
 */

import { writeFileSync } from "node:fs";

const PAGES = [
  { slug: "urnik", title: "Urnik", summary: "Rezervacije, blokade, čakalna vrsta.", body: `
    <h2>Dan v živo</h2>
    <p><strong>Urnik</strong> prikazuje vse termine za izbrani dan v stolpcih (en stolpec na zobozdravnika). Trenutni čas je označen s horizontalno modro črto.</p>
    <h2>Bližnjice</h2>
    <ul>
      <li><strong>Klik na prazen termin</strong> → nov termin</li>
      <li><strong>Klik na termin</strong> → podrobnosti</li>
      <li><strong>Drag</strong> → prestavi termin</li>
      <li><strong>Klik na uro zgoraj</strong> → skoči na ta čas</li>
    </ul>
    <h2>Čakalna vrsta</h2>
    <p>Na desni strani. Če bolnik odpove termin, ga lahko s klikom ponudite prvemu v vrsti.</p>
  ` },
  { slug: "bolniki", title: "Bolniki", summary: "Kartoteka, odontogram, priloge.", body: `
    <h2>Iskanje</h2>
    <p>Vpišite ime, priimek ali telefon. Rezultati se filtrirajo sproti.</p>
    <h2>Kartoteka</h2>
    <p>Kliknite bolnika → vidite: osebni podatki, CAVE opozorila, obiski, datoteke, soglasja.</p>
    <h2>Odontogram (FDI)</h2>
    <p><strong>Kartoteka → Odontogram</strong>. Klik na zob označi stanje. Barve: modra = zdrav, rdeča = karies, zelena = zdravljen, siva = izpuljen.</p>
  ` },
  { slug: "zdravljenje", title: "Načrt zdravljenja", summary: "Predračuni, podpis.", body: `
    <h2>Dodajanje storitev</h2>
    <p>Izberite bolnika → <strong>Načrt zdravljenja</strong> → kliknite "Dodaj storitev". Vsaka storitev ima ceno iz cenika.</p>
    <h2>Predračun s podpisom</h2>
    <p>Iz načrta → <strong>Ustvari predračun za podpis</strong>. Pacient podpiše na zaslonu ali vpiše ime. Podpisana predračuna ni mogoče izbrisati.</p>
    <h3>Soglasje</h3>
    <p>Privzeto besedilo: "Strinjam se z načrtom zdravljenja in cenami." Sprememba v <strong>Nastavitve → Ordinacija → Soglasje</strong>.</p>
  ` },
  { slug: "finance", title: "Finance", summary: "Računi, predračuni, plačila.", body: `
    <h2>Vrste dokumentov</h2>
    <ul>
      <li><strong>Predračun</strong> — pred izvedbo</li>
      <li><strong>Račun</strong> — po izvedbi</li>
      <li><strong>Avansni račun</strong> — predplačilo</li>
      <li><strong>Dobropis</strong> — vračilo</li>
      <li><strong>Prejeti račun</strong> — od dobavitelja</li>
    </ul>
    <h2>Plačila</h2>
    <p>Kliknite "Plačano" na računu → izberite način (gotovina, kartica, nakazilo, zavarovalnica).</p>
    <h2>Izvoz za knjigovodjo</h2>
    <p><strong>Finance → Izvozi</strong> → CSV ali Excel. Filter po obdobju, statusu, ceni.</p>
  ` },
  { slug: "ordinacija", title: "Ordinacija", summary: "Zaloga, laboratorij, sterilizacija.", body: `
    <h2>Zaloga</h2>
    <p>Seznam materialov. Ko pade pod minimalno količino, se obarva rdeče.</p>
    <h2>Laboratorij</h2>
    <p>Sledenje primerom, poslanim v laboratorij. Statusi: osnutek, poslano, v izdelavi, gotovo, vstavljeno.</p>
    <h2>Sterilizacija</h2>
    <p>Dnevnik ciklov avtoklavov. <strong>Spore test</strong> — vsak cikel 1× mesečno obvezno.</p>
  ` },
  { slug: "kolektiv", title: "Kolektiv", summary: "Razpored, dopusti, bolniške.", body: `
    <h2>Osnovni koncept</h2>
    <p>Kolektiv = vsi člani ordinacije (zobozdravniki, asistenti, receptorji, lastnik).</p>
    <h2>Razpored</h2>
    <p>Tedenski prikaz. Vsak član ima delovne ure, odmore, dopust, bolniško.</p>
    <h2>Dopusti in bolniške</h2>
    <p>Kliknite na dan → izberite vrsto odsotnosti. Vpliva na razporejanje terminov.</p>
  ` },
  { slug: "nastavitve", summary: "Profil, cenik, varnostne kopije.", title: "Nastavitve", body: `
    <h2>Profil ordinacije</h2>
    <p>Ime, naslov, davčna, TRR, izdajatelj. To se izpiše na PDF računu.</p>
    <h2>Cenik</h2>
    <p>Storitve in cene. Skupine: kurativa, protetika, kirurgija, estetika, drugo.</p>
    <h2>Komunikacija</h2>
    <p>SMS in e-pošta opomniki. Privzeto: 24h pred terminom.</p>
    <h2>Varnostne kopije</h2>
    <p>Samodejno dnevno ali ročno. Šifrirano z vašim geslom. Restorate v 5 minutah.</p>
  ` },
];

const SIDEBAR = `
<aside class="docs-side">
  <h3>Uporabniški vodič</h3>
  ${PAGES.map((p) => `  <a href="${p.slug}.html">${p.title}</a>`).join("\n  ")}
  <h3>Administrativa</h3>
  <a href="../security.html">Varnost in GDPR</a>
  <a href="../faq.html">FAQ</a>
  <h3>Status</h3>
  <a href="https://status.hermes-dental.si">Status stran</a>
</aside>`;

const TEMPLATE = (p) => `<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${p.title} — Hermes Dental dokumentacija</title>
  <link rel="icon" href="../favicon.svg" type="image/svg+xml" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../styles.css" />
  <style>
    .docs-wrap { display: grid; grid-template-columns: 240px 1fr; gap: 32px; max-width: 1100px; margin: 0 auto; padding: 32px 20px; }
    .docs-side { position: sticky; top: 24px; align-self: start; font-size: 13px; }
    .docs-side h3 { font-size: 11px; text-transform: uppercase; letter-spacing: 0.6px; color: var(--muted); margin: 18px 0 6px; }
    .docs-side a { display: block; padding: 4px 0; color: var(--fg); text-decoration: none; }
    .docs-side a:hover { color: var(--eu-blue); }
    .docs-main h1 { margin: 0 0 8px; font-family: var(--serif); }
    .docs-main h2 { margin: 28px 0 8px; padding-top: 16px; border-top: 1px solid var(--border); }
    .docs-main p, .docs-main li { line-height: 1.7; }
    @media (max-width: 800px) { .docs-wrap { grid-template-columns: 1fr; } .docs-side { position: static; } }
  </style>
</head>
<body>
  <header class="nav">
    <div class="wrap nav-inner">
      <a class="brand" href="../index.html">
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect width="48" height="48" rx="10" fill="#3A4258"/>
          <path d="M15 11v26M33 11v26" stroke="#F4F6FA" stroke-width="4.2" stroke-linecap="round"/>
          <path d="M15 24.5c6-4.2 12-4.2 18 0" fill="none" stroke="#F4F6FA" stroke-width="3.6" stroke-linecap="round"/>
        </svg>
        <span>Hermes <em>Dental</em></span>
      </a>
      <div class="nav-actions"><a class="btn btn-navy" href="../index.html">Domov</a></div>
    </div>
  </header>

  <main class="docs-wrap">
    ${SIDEBAR}

    <article class="docs-main">
      <h1>${p.title}</h1>
      <p class="muted">${p.summary}</p>
${p.body}
    </article>
  </main>
</body>
</html>
`;

for (const p of PAGES) {
  const path = `./${p.slug}.html`;
  writeFileSync(path, TEMPLATE(p));
  console.log("wrote", path);
}
