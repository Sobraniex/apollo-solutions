"""Build the four bilingual, crawlable Apollo service pages."""

from html import escape
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BASE = "https://sobraniex.github.io/apollo-solutions/"

UI = {
    "en": {
        "skip": "Skip to content", "services": "Services", "booking": "Booking ↗",
        "switch": "Switch to Slovenian", "switch_text": "SL",
        "covers": "What this service covers", "fit": "Where it helps", "fit_intro": "Start with the people and the job the product must do.",
        "process": "How we shape the work", "process_eyebrow": "Project process", "process_intro": "The exact features and delivery plan are agreed after we understand your needs.",
        "prepare": "Useful details to bring", "prepare_eyebrow": "Before a project", "prepare_intro": "These questions help us define a realistic first scope.",
        "next": "Next step", "next_title": "Start with the task, then define the scope.",
        "next_text": "A public project enquiry route is being prepared. Pricing and delivery dates are agreed for each project; this page does not accept a booking.",
        "back": "Explore all services ↗", "related": "Other Apollo services", "solo": "See the one-Spark installation ↗",
        "models": "Explore model options ↗", "footer": "Software. Intelligence. Human potential.",
        "top": "Back to top ↑", "nav_label": "Main navigation",
    },
    "sl": {
        "skip": "Preskoči na vsebino", "services": "Storitve", "booking": "Rezervacije ↗",
        "switch": "Switch to English", "switch_text": "EN",
        "covers": "Kaj vključuje storitev", "fit": "Kje pomaga", "fit_intro": "Začnemo pri ljudeh in nalogi, ki jo mora rešitev opraviti.",
        "process": "Kako oblikujemo projekt", "process_eyebrow": "Potek projekta", "process_intro": "Funkcije in načrt izvedbe določimo, ko razumemo vaše potrebe.",
        "prepare": "Koristne informacije za začetek", "prepare_eyebrow": "Pred začetkom", "prepare_intro": "Ta vprašanja nam pomagajo določiti uresničljiv začetni obseg.",
        "next": "Naslednji korak", "next_title": "Začnite z nalogo, nato določimo obseg.",
        "next_text": "Javno pot za projektna povpraševanja še pripravljamo. Ceno in rok izvedbe dogovorimo za vsak projekt posebej; na tej strani ni mogoče oddati rezervacije.",
        "back": "Raziščite vse storitve ↗", "related": "Druge Apollove storitve", "solo": "Oglejte si namestitev ene naprave Spark ↗",
        "models": "Raziščite možnosti modelov ↗", "footer": "Programi. Inteligenca. Človeški potencial.",
        "top": "Nazaj na vrh ↑", "nav_label": "Glavna navigacija",
    },
}

SERVICES = [
    {
        "slug": "business-websites",
        "en": {
            "name": "Business websites", "meta": "Business websites | Apollo Solutions",
            "description": "Business websites shaped around your audience, content and enquiry path. Explore how Apollo scopes a clear, usable site.",
            "eyebrow": "01 / Business websites", "headline": "A website that helps people take the next step.",
            "intro": "For service businesses, accommodation providers and teams that need a clear online home. We organise the content around what visitors want to find and what you want them to do next.",
            "signal": ["Clear information", "Mobile use", "Enquiry path"],
            "features": [
                ("A useful structure", "Plan pages, images and calls to action around the questions visitors actually bring. Content and photography are agreed before build work starts."),
                ("A site people can use", "Design for phones and larger screens, readable content, keyboard access and clear navigation. Check loading speed on the finished pages."),
                ("A clear next step", "Choose the right contact or booking journey for the business. Forms, booking tools and content editing are scoped only after the workflow is understood."),
            ],
            "steps": [
                ("Understand the audience", "Identify visitor questions, existing material and the action each page should support."),
                ("Agree on content and functions", "Set the page structure, editing needs, integrations and any enquiry or booking flow."),
                ("Build, check and hand over", "Review the site on real screen sizes, test links and agreed interactions, then document how it is maintained."),
            ],
            "questions": ["Who should the website reach?", "What content and images are ready?", "What should a visitor do after reading?"],
        },
        "sl": {
            "name": "Poslovne spletne strani", "meta": "Poslovne spletne strani | Apollo Solutions",
            "description": "Poslovne spletne strani po meri obiskovalcev, vsebine in poti do povpraševanja. Oglejte si, kako Apollo določi obseg uporabne strani.",
            "eyebrow": "01 / Poslovne spletne strani", "headline": "Spletna stran, ki obiskovalcu pokaže naslednji korak.",
            "intro": "Za storitvena podjetja, ponudnike nastanitev in ekipe, ki potrebujejo jasno spletno predstavitev. Vsebino uredimo glede na to, kaj obiskovalci iščejo in kaj želimo, da storijo naprej.",
            "signal": ["Jasne informacije", "Uporaba na telefonu", "Pot do povpraševanja"],
            "features": [
                ("Uporabna struktura", "Strani, fotografije in pozive k dejanju načrtujemo glede na vprašanja obiskovalcev. O vsebini in fotografijah se dogovorimo pred začetkom razvoja."),
                ("Stran, ki jo je mogoče uporabljati", "Oblikujemo za telefone in večje zaslone, berljivo vsebino, dostop s tipkovnico in jasno navigacijo. Hitrost preverimo na dokončanih straneh."),
                ("Jasen naslednji korak", "Izberemo primerno pot do stika ali rezervacije. Obrazce, rezervacijska orodja in urejanje vsebin določimo, ko razumemo delovni proces."),
            ],
            "steps": [
                ("Razumemo obiskovalce", "Ugotovimo, kaj obiskovalce zanima, katera gradiva že imate in katero dejanje naj omogoča posamezna stran."),
                ("Določimo vsebino in funkcije", "Dogovorimo se o strukturi strani, urejanju, povezavah z drugimi orodji in morebitni poti do povpraševanja ali rezervacije."),
                ("Zgradimo, preverimo in predamo", "Stran pregledamo na različnih zaslonih, preizkusimo povezave in dogovorjene funkcije ter dokumentiramo vzdrževanje."),
            ],
            "questions": ["Koga želite doseči?", "Katere vsebine in fotografije so pripravljene?", "Kaj naj obiskovalec naredi po branju?"],
        },
    },
    {
        "slug": "web-shops",
        "en": {
            "name": "Optimised web shops", "meta": "Optimised web shops | Apollo Solutions",
            "description": "Web shops planned around product discovery, mobile checkout and fulfilment. Explore how Apollo scopes an online store.",
            "eyebrow": "02 / Web shops", "headline": "Help customers find it, choose it and buy it.",
            "intro": "An online shop needs more than product cards. We plan the buying journey around your catalogue, the way you handle orders and the devices your customers use.",
            "signal": ["Product discovery", "Mobile checkout", "Order workflow"],
            "features": [
                ("Findable products", "Shape categories, product information, search and filters around the actual catalogue. Search visibility starts with clear, useful product pages."),
                ("A usable checkout", "Plan basket, payment and delivery choices for the market you serve. Test the full path on phones and larger screens before launch."),
                ("Operations behind the shop", "Agree on stock, order handling, analytics, access and any integrations before choosing the platform. Measure speed with the real catalogue."),
            ],
            "steps": [
                ("Map the catalogue", "Review product types, variants, content and how customers currently choose."),
                ("Define the transaction", "Agree on payments, delivery, tax, stock and who handles each order stage."),
                ("Build and test the journey", "Check discovery, checkout and order notifications with representative products and devices."),
            ],
            "questions": ["How many products and variants are there?", "Which payments and delivery routes are needed?", "Who maintains products and handles orders?"],
        },
        "sl": {
            "name": "Optimizirane spletne trgovine", "meta": "Optimizirane spletne trgovine | Apollo Solutions",
            "description": "Spletne trgovine, načrtovane glede na iskanje izdelkov, nakup na telefonu in izpolnjevanje naročil. Oglejte si, kako Apollo določi obseg.",
            "eyebrow": "02 / Spletne trgovine", "headline": "Strankam olajšajte iskanje, izbiro in nakup.",
            "intro": "Spletna trgovina potrebuje več kot kartice izdelkov. Nakupno pot načrtujemo glede na vaš katalog, obdelavo naročil in naprave, ki jih uporabljajo stranke.",
            "signal": ["Iskanje izdelkov", "Nakup na telefonu", "Obdelava naročil"],
            "features": [
                ("Izdelki, ki jih stranke najdejo", "Kategorije, informacije, iskanje in filtre oblikujemo glede na dejanski katalog. Vidnost v iskalnikih se začne z jasnimi in uporabnimi stranmi izdelkov."),
                ("Uporaben zaključek nakupa", "Košarico, plačilo in dostavo načrtujemo za trg, ki ga nagovarjate. Pred objavo preizkusimo celotno pot na telefonih in večjih zaslonih."),
                ("Delo v ozadju trgovine", "Pred izbiro platforme se dogovorimo o zalogi, naročilih, analitiki, dostopu in povezavah. Hitrost izmerimo z dejanskim katalogom."),
            ],
            "steps": [
                ("Pregledamo katalog", "Preverimo vrste izdelkov, različice, vsebino in način, kako stranke trenutno izbirajo."),
                ("Določimo nakupni postopek", "Dogovorimo se o plačilih, dostavi, davkih, zalogi in odgovornostih pri obdelavi naročil."),
                ("Zgradimo in preizkusimo pot", "Iskanje, nakup in obvestila o naročilih preverimo z reprezentativnimi izdelki in napravami."),
            ],
            "questions": ["Koliko izdelkov in različic imate?", "Katere načine plačila in dostave potrebujete?", "Kdo ureja izdelke in obdeluje naročila?"],
        },
    },
    {
        "slug": "private-apps",
        "en": {
            "name": "Private apps", "meta": "Private apps | Apollo Solutions",
            "description": "Private business apps shaped around your workflow, access rules and data. Explore how Apollo scopes focused software.",
            "eyebrow": "03 / Private apps", "headline": "Software shaped around the work your team does.",
            "intro": "A focused app can bring scattered steps into one workflow. We start with the people, decisions and data involved, then choose a small useful first scope.",
            "signal": ["Real workflows", "Defined access", "Clear handover"],
            "features": [
                ("Workflow first", "Map the current process, its exceptions and the people responsible for each decision before defining screens or automation."),
                ("Access and data choices", "Define who can see or change records, where data should live and which existing systems need to connect. Private does not automatically mean on-device."),
                ("A useful first release", "Build and test the core task with the people who will use it. Document limits, backups, maintenance and later additions as part of the scope."),
            ],
            "steps": [
                ("Observe the work", "List the tasks, users, handoffs and data sources that matter."),
                ("Agree on the first version", "Separate essential actions from later ideas and define access and success checks."),
                ("Test and hand over", "Verify the workflow with representative cases and record how the app is operated and maintained."),
            ],
            "questions": ["Which repeated task causes the most friction?", "Who needs access, and to which data?", "Which systems must the app work with?"],
        },
        "sl": {
            "name": "Zasebne aplikacije", "meta": "Zasebne aplikacije | Apollo Solutions",
            "description": "Zasebne poslovne aplikacije po meri vašega delovnega procesa, pravil dostopa in podatkov. Oglejte si, kako Apollo določi obseg programske opreme.",
            "eyebrow": "03 / Zasebne aplikacije", "headline": "Programska oprema po meri dela vaše ekipe.",
            "intro": "Osredotočena aplikacija lahko poveže razdrobljene korake v en delovni proces. Začnemo pri ljudeh, odločitvah in podatkih, nato izberemo majhen, uporaben začetni obseg.",
            "signal": ["Dejanski procesi", "Določen dostop", "Jasna predaja"],
            "features": [
                ("Najprej delovni proces", "Pred oblikovanjem zaslonov ali avtomatizacij opišemo trenutni proces, izjeme in ljudi, odgovorne za posamezne odločitve."),
                ("Odločitve o dostopu in podatkih", "Določimo, kdo lahko vidi ali spreminja zapise, kje naj bodo podatki in katere obstoječe sisteme je treba povezati. Zasebna aplikacija ne pomeni samodejno delovanja na napravi."),
                ("Uporabna prva različica", "Osrednjo nalogo zgradimo in preizkusimo z bodočimi uporabniki. Omejitve, varnostne kopije, vzdrževanje in poznejše dodatke vključimo v dogovorjeni obseg."),
            ],
            "steps": [
                ("Spoznamo delo", "Popišemo naloge, uporabnike, predaje in pomembne vire podatkov."),
                ("Dogovorimo se o prvi različici", "Nujna dejanja ločimo od poznejših zamisli ter določimo dostop in merila uspeha."),
                ("Preizkusimo in predamo", "Proces preverimo z reprezentativnimi primeri in zabeležimo uporabo ter vzdrževanje aplikacije."),
            ],
            "questions": ["Katera ponavljajoča se naloga povzroča največ težav?", "Kdo potrebuje dostop in do katerih podatkov?", "S katerimi sistemi mora aplikacija sodelovati?"],
        },
    },
    {
        "slug": "local-llm-installations",
        "en": {
            "name": "Local LLM installations", "meta": "Local LLM installations | Apollo Solutions",
            "description": "Explore Apollo's planned local LLM installations: task and data review, model and hardware fit, setup, test and handover.",
            "eyebrow": "04 / Local LLM installations", "headline": "Choose the task before the model.",
            "intro": "Local AI can be useful when the data route, regular usage or a tailored setup matters. Apollo is preparing remote DGX Spark installations; the model and technical plan must fit the task and hardware.",
            "signal": ["Task and data", "Hardware fit", "Verified setup"],
            "features": [
                ("A clear data path", "Decide what information a model needs, who can use it and where prompts, logs, backups and connected tools will go."),
                ("Model and hardware fit", "Compare open-model options with available memory, storage, network and intended users. Published reference figures are not Apollo benchmarks."),
                ("A running install", "The planned service covers configuration, a test request and handover notes. Exact scope depends on the selected one-, two- or four-Spark tier."),
            ],
            "steps": [
                ("Define the use case", "Describe the task, data sensitivity and how a useful answer will be checked."),
                ("Confirm the setup", "Review the number of Sparks, model fit, access and the relevant installation tier."),
                ("Install and verify", "Run a real request on the agreed hardware and document the configuration and limits."),
            ],
            "questions": ["What task should the model perform?", "Which data may reach it?", "What hardware and network access are available?"],
        },
        "sl": {
            "name": "Namestitve lokalnih jezikovnih modelov", "meta": "Namestitve lokalnih jezikovnih modelov | Apollo Solutions",
            "description": "Raziščite načrtovane Apollove namestitve lokalnih jezikovnih modelov: pregled naloge in podatkov, izbira modela in opreme, namestitev, preizkus ter predaja.",
            "eyebrow": "04 / Namestitve lokalnih modelov", "headline": "Najprej izberite nalogo, nato model.",
            "intro": "Lokalna AI je lahko uporabna, kadar so pomembni tok podatkov, redna uporaba ali prilagojena postavitev. Apollo pripravlja oddaljene namestitve za DGX Spark; model in tehnični načrt morata ustrezati nalogi in opremi.",
            "signal": ["Naloga in podatki", "Ustreznost opreme", "Preverjena postavitev"],
            "features": [
                ("Jasna pot podatkov", "Določimo, katere podatke model potrebuje, kdo ga lahko uporablja in kam gredo pozivi, dnevniki, varnostne kopije ter povezane aplikacije."),
                ("Ustreznost modela in opreme", "Možnosti odprtih modelov primerjamo z razpoložljivim pomnilnikom, shrambo, omrežjem in predvidenimi uporabniki. Objavljene referenčne številke niso Apollove meritve."),
                ("Delujoča namestitev", "Načrtovana storitev vključuje nastavitve, preizkusno zahtevo in navodila ob predaji. Natančen obseg je odvisen od izbranega paketa za eno, dve ali štiri naprave Spark."),
            ],
            "steps": [
                ("Določimo primer uporabe", "Opišemo nalogo, občutljivost podatkov in način preverjanja uporabnega odgovora."),
                ("Potrdimo postavitev", "Pregledamo število naprav Spark, ustreznost modela, dostop in primeren paket namestitve."),
                ("Namestimo in preverimo", "Na dogovorjeni opremi preizkusimo resnično zahtevo ter dokumentiramo konfiguracijo in omejitve."),
            ],
            "questions": ["Katero nalogo naj model opravi?", "Katere podatke lahko prejme?", "Katera oprema in omrežni dostop sta na voljo?"],
        },
    },
]


def h(value):
    return escape(value, quote=True)


def render(service, lang):
    copy = service[lang]
    ui = UI[lang]
    slug = service["slug"]
    local = lang == "sl"
    assets = "../../" if local else "../"
    home = "../"
    language_href = f"../../services/{slug}.html" if local else f"../sl/services/{slug}.html"
    en_url = f"{BASE}services/{slug}.html"
    sl_url = f"{BASE}sl/services/{slug}.html"
    canonical = sl_url if local else en_url
    cards = "".join(
        f'<article><span>{i:02d}</span><h3>{h(title)}</h3><p>{h(body)}</p></article>'
        for i, (title, body) in enumerate(copy["features"], 1)
    )
    steps = "".join(
        f'<li><span>{i:02d}</span><div><h3>{h(title)}</h3><p>{h(body)}</p></div></li>'
        for i, (title, body) in enumerate(copy["steps"], 1)
    )
    questions = "".join(f"<li>{h(question)}</li>" for question in copy["questions"])
    related = "".join(
        f'<a href="{other["slug"]}.html">{h(other[lang]["name"])} <span aria-hidden="true">↗</span></a>'
        for other in SERVICES if other is not service
    )
    ai_links = ""
    if slug == "local-llm-installations":
        ai_links = f'<div class="service-ai-links"><a href="{home}solo-dgx-spark.html">{h(ui["solo"])}</a><a href="{home}#models">{h(ui["models"])}</a></div>'
    signals = "".join(f"<li>{h(item)}</li>" for item in copy["signal"])
    mark = '<svg class="apollo-mark" viewBox="0 0 64 64" aria-hidden="true"><path d="M13 51 30 12h5l17 39H41L32.5 29 24 51Z" fill="currentColor"/><path d="m8 43 43-18" fill="none" stroke="#ffa982" stroke-width="4"/><path d="m51 6 1.8 5.2L58 13l-5.2 1.8L51 20l-1.8-5.2L44 13l5.2-1.8Z" fill="#ffa982"/></svg>'
    return f'''<!DOCTYPE html>
<html lang="{lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{h(copy["meta"])}</title>
  <meta name="description" content="{h(copy["description"])}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="{h(copy["meta"])}" />
  <meta property="og:description" content="{h(copy["description"])}" />
  <meta property="og:image" content="{BASE}images/apollo-social.png" />
  <meta property="og:url" content="{canonical}" />
  <meta name="theme-color" content="#101014" />
  <link rel="canonical" href="{canonical}" />
  <link rel="alternate" hreflang="en" href="{en_url}" />
  <link rel="alternate" hreflang="sl" href="{sl_url}" />
  <link rel="icon" href="{assets}favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="{assets}home.css" />
  <link rel="stylesheet" href="{assets}service-pages.css" />
</head>
<body>
  <a href="#main" class="skip-link">{h(ui["skip"])}</a>
  <header class="site-header"><div class="wrap header-inner service-header">
    <a class="brand" href="{home}" aria-label="Apollo Solutions">{mark}<span>Apollo <span class="brand-light">Solutions</span></span></a>
    <nav aria-label="{h(ui["nav_label"])}"><a href="{home}#solutions">{h(ui["services"])}</a><a href="{home}#kontakt">{h(ui["booking"])}</a></nav>
    <a class="language" href="{language_href}" aria-label="{h(ui["switch"])}">{ui["switch_text"]}</a>
  </div></header>
  <main id="main">
    <div class="wrap service-breadcrumb"><a href="{home}#solutions">{h(ui["services"])}</a><span aria-hidden="true">/</span><span>{h(copy["name"])}</span></div>
    <section class="wrap service-hero" aria-labelledby="service-title"><div class="service-hero-copy">
      <p class="eyebrow">{h(copy["eyebrow"])}</p><h1 id="service-title">{h(copy["headline"])}</h1><p class="service-lede">{h(copy["intro"])}</p>
      <a class="service-hero-link" href="#scope">{h(ui["covers"])} <span aria-hidden="true">↓</span></a>
    </div><div class="service-hero-panel" aria-hidden="true"><div class="service-panel-top"><span>APOLLO / SERVICES</span><span>✦</span></div><div class="service-panel-orbit"><div>{h(copy["name"])}</div></div><ul>{signals}</ul></div></section>
    <section class="service-fit" id="scope" aria-labelledby="fit-title"><div class="wrap"><div class="service-section-heading"><p class="eyebrow">{h(ui["fit"])}</p><h2 id="fit-title">{h(ui["covers"])}</h2><p>{h(ui["fit_intro"])}</p></div><div class="service-feature-grid">{cards}</div>{ai_links}</div></section>
    <section class="wrap service-process" aria-labelledby="process-title"><div class="service-section-heading"><p class="eyebrow">{h(ui["process_eyebrow"])}</p><h2 id="process-title">{h(ui["process"])}</h2><p>{h(ui["process_intro"])}</p></div><ol>{steps}</ol></section>
    <section class="service-prepare" aria-labelledby="prepare-title"><div class="wrap service-prepare-grid"><div><p class="eyebrow">{h(ui["prepare_eyebrow"])}</p><h2 id="prepare-title">{h(ui["prepare"])}</h2><p>{h(ui["prepare_intro"])}</p></div><ul>{questions}</ul></div></section>
    <section class="wrap service-next" aria-labelledby="next-title"><div><p class="eyebrow">{h(ui["next"])}</p><h2 id="next-title">{h(ui["next_title"])}</h2><p>{h(ui["next_text"])}</p></div><a href="{home}#solutions">{h(ui["back"])}</a></section>
    <section class="wrap service-related" aria-labelledby="related-title"><h2 id="related-title">{h(ui["related"])}</h2><div>{related}</div></section>
  </main>
  <footer class="wrap footer service-footer"><a class="brand" href="{home}">{mark}<span>Apollo <span class="brand-light">Solutions</span></span></a><span>{h(ui["footer"])}</span><a href="#main">{h(ui["top"])}</a></footer>
</body>
</html>
'''


def build():
    for service in SERVICES:
        for lang in ("en", "sl"):
            directory = ROOT / ("sl/services" if lang == "sl" else "services")
            directory.mkdir(parents=True, exist_ok=True)
            (directory / f'{service["slug"]}.html').write_text(render(service, lang), encoding="utf-8")


if __name__ == "__main__":
    build()
