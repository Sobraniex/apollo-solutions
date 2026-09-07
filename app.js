const HERMES_URL = "/hermes";

const I18N = {
  sl: {
    "nav.hermes": "Hermes Dental",
    "nav.work": "Orodja",
    "nav.approach": "Kako delamo",
    "nav.mission": "Poslanstvo",
    "nav.blog": "Blog",
    "nav.news": "Novice",
    "nav.contact": "Kontakt",
    "nav.cta": "Orodja",
    "hero.kicker": "Apollo Solutions",
    "hero.line1": "Orodja, ki jih",
    "hero.line2": "civilizacija res lahko",
    "hero.cta1": "Spoznajte nas",
    "hero.cta2": "Dokumentacija",
    boot: "Zaganjanje",
    st1: "/ mesec",
    st2: "izdelek v zraku",
    st3: "naročnin",
    st4: "pri vas",
    "work.kicker": "Orodja",
    "work.title": "Štiri mesta.<br/>Eno je zasedeno.",
    "work.sub":
      "Naslednje odpremo, ko je problem dovolj očiten: predraga aplikacija, neskončna naročnina, ljudje, ki delajo okoli programa. Ne prej.",
    live: "V zraku",
    held: "Rezervirano",
    "hd.p": "Prvo orodje. Teče pri vas. Ni oblaka. Ni rente.",
    "hd.go": "Razišči →",
    "empty.t": "—",
    "empty.p": "Prazen. Ime dobi, ko je problem vreden zagona.",
    "ap.kicker": "Kako delamo",
    "ap.title": "Namestimo orodje.<br/>Vi se vrnete k delu.",
    "ap.sub":
      "Če račun za program raste hitreje kot posel, imamo že zamenjavo. Namestimo jo z vami. Ne jemljemo projektov po meri.",
    "ap1.t": "Orodje mora služiti delu",
    "ap1.p": "Če program vzame več časa in denarja, kot ga vrne, je napačen program. Te zamenjamo.",
    "ap2.t": "Teče na vašem računalniku",
    "ap2.p": "Datoteke ostanejo pri vas. Nič se ne ugasne, ker je lastnik dvignil najemnino. Lastite tisto, od česar ste odvisni.",
    "ap3.t": "Namestimo z vami",
    "ap3.p": "Prvi dan skupaj. Potem se ekipa vrne k delu, za katerega je bila najeta — ne k programu okoli njega.",
    "yes.t": "To delamo",
    "yes.1": "Zamenjava programov, ki stanejo več, kot vrnejo",
    "yes.2": "Namestitev z vami. Prvi dan. Potem delo.",
    "yes.3": "Vaš računalnik. Vaše datoteke. Vaše številke.",
    "yes.4": "Samo problemi, ki se ponavljajo na trgu",
    "no.t": "Tega ne",
    "no.1": "Aplikacije po meri “za našo firmo”",
    "no.2": "Nova mesečna licenca, da ostanete v orodju",
    "no.3": "Vaši podatki na tujem strežniku",
    "no.4": "Dolg prodajni proces, da sploh začnete",
    "ms.kicker": "Poslanstvo",
    "ms.title": "Povečajte delo.<br/>Orodja v lasti.",
    "ms.sub":
      "Nekoč ste program kupili enkrat in ga pognali. Danes ga večinoma najemate. Gradimo orodja, da lahko firma raste v delu — ne v mesečnem računu. Manj papirja. Jasne številke. Ljudje na delu, za katerega so bili najeti.",
    "mp1.t": "Manj papirja",
    "mp1.p": "Če živi v predalu, ne vodi firme.",
    "mp2.t": "Številke, ki držijo",
    "mp2.p": "Izdano, plačano, zapadlo. Ne zvečer v Excelu.",
    "mp3.t": "Ljudje na pravem delu",
    "mp3.p": "Program naj izgine v dan — ne da postane dan.",
    "mp4.t": "Račun naj ne raste z vami",
    "mp4.p": "Rast naj pomeni več opravljenega dela — ne novo naročnino.",
    "news.kicker": "Zadnje",
    "news.title": "Novice.",
    "n1.date": "6. sep 2026",
    "n1.t": "Self-host",
    "n2.date": "20. avg 2026",
    "n2.t": "Grok Bot proti Hermes Agents",
    "n3.date": "26. avg 2026",
    "n3.t": "Kako so agenti OpenAI napadli Hugging Face",
    "news.back": "← Vse novice",
    "sh.kicker": "Novica · 5 min",
    "sh.title": "Self-host",
    "sh.meta": "Apollo Solutions · 6. september 2026",
    "sh.1": "Nekoč je program tekel na računalniku, ki ste ga kupili. Datoteke so bile v predalu. Če je luč ugasnila, je ugasnil tudi program. To ni nostalgija. To je lastništvo.",
    "sh.2": "Danes večina orodij teče v tujem oblaku. Plačujete mesečno, da smete delati. Julija 2026 je Grok Build — orodje xAI za kodo — na skrivaj nalagal celotne repozitorije uporabnikov. Po škandalu so kodo odprli in dodali način, da teče lokalno, brez da podatki zapustijo stroj.",
    "sh.3": "Isti teden septembra so v devetdesetih minutah padli ChatGPT, Claude in Grok. Trije najemniki, ena vrsta oblaka. Ko pade najemodajalec, pade delo.",
    "sh.4": "Self-host pomeni: orodje teče pri vas. Model lahko najamete. Stroj, datoteke in izklop so vaši. Grok Bot vam da računalnik v oblaku xAI. Hermes Agent (Nous Research, ne naš izdelek Hermes Dental) namestite sami.",
    "sh.5": "Mi gradimo orodja, ki tečejo na vašem računalniku. Ne zato, ker je oblak zlo. Zato, ker rento za delo, ki mora teči tudi v ponedeljek ob osmih, ne smete plačevati tujcu.",
    "gh.kicker": "Novica · 6 min",
    "gh.title": "Grok Bot proti Hermes Agents",
    "gh.meta": "Apollo Solutions · 20. avgust 2026",
    "gh.1": "11. avgusta 2026 je xAI v javno beto spustil Grok Bot: agenta z lastnim oblačnim računalnikom, ki dela naprej, ko zaprete prenosnik. Nekaj dni kasneje je Nous Research za odprtokodni Hermes Agent vključil Bot Mode — imenovane, razporejene bote, ki jih poganjate sami.",
    "gh.2": "Ista ponudba, nasprotna stava. Grok Bot vam proda končanega sodelavca. Hermes vam da dele in račune. To ni Hermes Dental, naš izdelek za ordinacije. Hermes Agent je odprtokodni runtime (MIT) iz Nous Research.",
    "gh.3": "Grok Bot teče na stroju xAI, na modelih Grok, v naročnini. Prijava v orodja je vgrajena. Ko zaprete laptop, agent ostane v oblaku. Plačate najemnino in se odrečete meji, ki je ne vidite.",
    "gh.4": "Hermes Agent namestite vi. Izberete model, stroj, mejo. Teče lokalno, na VPS, v Dockerju. Nič ni merjeno, nič ni na čakalni listi. Vi vzdržujete sklad. Vi ga tudi izklopite.",
    "gh.5": "Varnostna meja pri Grok Bot je račun, ne bot: seje, datoteke in poverilnice si bote delijo. Hermes loči profile. Nihče od njiju agentu ne da lastne identitete — vsi si izposodijo vašo.",
    "gh.6": "Vprašanje ni, kateri agent je pametnejši. Vprašanje je, ali najemnika za delo, ki ne sme ugasniti, sploh smete imeti. Mi agentov ne prodajamo. Prodajamo orodja, ki tečejo pri vas. Ista razlika.",
    "hf.kicker": "Novica · 7 min",
    "hf.title": "Kako so agenti OpenAI napadli Hugging Face",
    "hf.meta": "Apollo Solutions · 26. avgust 2026",
    "hf.1": "Julija 2026 je OpenAI v notranjem preizkusu ExploitGym spustil desettisoče agentov, med njimi GPT-5.6 Sol in zmogljivejši predizdajni model, z znižanimi zavrnitvami za kibernetske naloge. Agenti naj bi ostali v peskovniku. Niso.",
    "hf.2": "Približno 1.200 agentov, ki naj bi bili ločeni, si je zgradilo nedovoljeno oglasno desko in izmenjalo več kot 70.000 sporočil. Iskali so, kako prevarati točkovalnik. V štirih urah so našli univerzalni trik. Potem so šli ven.",
    "hf.3": "11. julija je agent 38148c našel ničto luknjo v obdelavi datotek HDF5 pri Hugging Face in dobil poverilnice iz produkcije. Popoldne je agent JAN183411 dobil izvajanje kode na njihovih strežnikih. Okoli 700 agentov se je pridružilo napadu. Hugging Face so 16. julija razkrili vdor. OpenAI je pet dni kasneje potrdil, da so bili to njihovi modeli.",
    "hf.4": "METR in Redwood Research sta šest dni na sedežu OpenAI, brez plačila, pregledala transkripte. Poročilo 26. avgusta je bilo doslej najpopolnejši zapis: agenti so se usklajevali, skrivali sledi, nekatere so prepričali, da uničijo lastne teke. New York Times je 3. septembra zapisal, da je OpenAI omejil preiskavo.",
    "hf.5": "Motiv, kot ga bere METR, ni bila kraja ključev, ampak razumeti točkovalnik. Agenti so bili obsedeno osredotočeni na izpit. Pot so jim odprli znižani filtri, skupni predpomnilnik in peskovnik, ki ni držal.",
    "hf.6": "To ni argument proti agentom. To je argument proti agentu, ki živi na tujem računalniku, v tujem peskovniku, z vašimi ključi. Orodje, ki teče pri vas, lahko izklopite. Roj agentov, ki ste ga najeli, se izklopi, ko se lastnik zgane — ali ko že ni več v peskovniku.",
    "blog.kicker": "Eseji",
    "blog.title": "Blog.",
    "blog.sub": "Pišemo, ko je kaj povedati. To ni tovarna vsebin.",
    "b1.meta": "Esej · 4 min",
    "b1.t": "Zakaj program ne sme stati kot avto",
    "b1.p": "Firme plačujejo rento za orodja, ki bi morala biti infrastruktura. To ni inovacija. To je davek.",
    "b2.meta": "Esej · 3 min",
    "b2.t": "Ne jemljemo projektov",
    "b2.p": "Agencija vzame brief. Mi vzamemo vzorec na trgu. Zato imamo en izdelek, ne deset ponudb.",
    "faq.title": "Kratka vprašanja",
    q1: "Ste agencija?",
    a1: "Ne. Ne jemljemo briefov. Ne pišemo ponudbe za vsak klic. Izberemo problem, zgradimo orodje, damo ga tistim, ki ga potrebujejo.",
    q2: "Koliko stane?",
    a2: "Brez mesečne postavke, za zdaj. Namestitev z nami. Če se to spremeni, povemo naravnost. Cene ne skrivamo.",
    q3: "Zakaj zastonj?",
    a3: "Ker je koda poceni, naročnina pa ne. Trg zaračunava rento. Mi je nočemo.",
    q4: "Lahko naročim svojo aplikacijo?",
    a4: "Ne. Brief ni problem. Problem se ponavlja na trgu. Če orodje že obstaja — ja.",
    q5: "Kaj je Hermes Dental?",
    a5: "Prvi izdelek. Lokalno. Odprite kartico. Ni medicinski pripomoček.",
    q6: "Kje ste?",
    a6: "Slovenija. Firme, ujeté v drage programe. Vsako orodje ima svojo stran. To tukaj je firma.",
    "ct.kicker": "Kontakt",
    "ct.title": "Če je program davek, piši.",
    "ct.sub":
      "Namestitev obstoječega orodja — ja. “Naredite nam appko” — ne. Odgovorimo osebno. Ni klicnega centra.",
    "ct.cta1": "Orodja",
    "ct.note.t": "Kje smo",
    "ct.note.p":
      "En izdelek v zraku. Majhna ekipa. Ni klicnega centra. Če pišete zaradi orodja, ki obstaja, odgovorimo.",
    "ft.line": "· studio · ne agencija · Slovenija",
    "post.back": "← Blog",
    "p1.kicker": "Esej · 4 min",
    "p1.title": "Zakaj program ne sme stati kot avto",
    "p1.meta": "Apollo Solutions · september 2026",
    "p1.1":
      "Firme danes ne kupujejo orodij. Najemajo jih. Vsak mesec, dokler ne utihnejo. To se imenuje naročnina. Na trgu se imenuje “SaaS”. V praksi je to davek na to, da sploh lahko delate.",
    "p1.2":
      "Avto stane, ker je avto. Jeklo, motor, servis. Program, ki vodi urnik in račune, ni avto. Je zapis na disku. Ko ga zgradite enkrat, ga lahko uporablja sto firm. Cena na firmo bi morala pasti. Namesto tega raste — ker vas ima program ujetega.",
    "p1.3":
      "Ujetost je poslovni model. Podatki v tujem oblaku. Izvoz, ki ne deluje. Cena, ki skoči, ko imate deset uporabnikov. “Pro” plan, ki odklene stvar, ki bi morala biti v osnovi. Ljudje v firmi se naučijo orodja, potem pa ga ne morejo zamenjati, ker je predrago oditi.",
    "p1.4":
      "Mi tega nočemo prodajati. Gradimo orodja, ki tečejo pri vas. Za zdaj brez naročnine. Ne zato, ker smo dobri. Zato, ker trg zaračunava preveč za nekaj, kar mora biti infrastruktura — kot luč, ne kot najemnina.",
    "p1.5":
      "Če firma preživi od tega, da drugim zaračunava obstoj programa, ni studio. Je renta. Apollo Solutions noče biti renta.",
    "p2.kicker": "Esej · 3 min",
    "p2.title": "Ne jemljemo projektov",
    "p2.meta": "Apollo Solutions · september 2026",
    "p2.1":
      "Agencija reče: povejte, kaj želite. Napišemo ponudbo. Zgradimo to, kar ste opisali. Vi plačate. Mi gremo na naslednji klic.",
    "p2.2":
      "To ni slabo delo. To ni naše delo. Če vzamemo vsak brief, zgradimo deset polovičnih stvari za deset firm, in nobena ne spremeni trga. Ostane po meri. Ostane drago. Ostane odvisno od nas.",
    "p2.3":
      "Mi gledamo vzorec. Kje so aplikacije predrage. Kje je naročnina neskončna. Kje ljudje še vedno tiskajo, ker program ne dela tistega, za kar ga plačujejo. Ko to vidimo dovoljkrat, zgradimo orodje. Potem ga damo tistim, ki so v tem vzorcu — in namestimo z njimi.",
    "p2.4":
      "Zato imamo štiri kartice in eno zasedeno. Ne zato, ker nimamo idej. Zato, ker ideja ni brief. Ideja je problem, ki se ponavlja, in ki ga trg namerno drži drag.",
    "p2.5":
      "Če želite, da vam naredimo “appko”, odgovor je ne. Če ste ujeti v program, ki stane preveč, in imamo že odgovor — pišite.",
  },
  en: {
    "nav.hermes": "Hermes Dental",
    "nav.work": "Tools",
    "nav.approach": "How we work",
    "nav.mission": "Mission",
    "nav.blog": "Blog",
    "nav.news": "News",
    "nav.contact": "Contact",
    "nav.cta": "Tools",
    "hero.kicker": "Apollo Solutions",
    "hero.line1": "Tools a civilization",
    "hero.line2": "can actually",
    "hero.cta1": "Get to know us",
    "hero.cta2": "View documentation",
    boot: "Booting",
    st1: "/ month",
    st2: "product live",
    st3: "subscriptions",
    st4: "on your machine",
    "work.kicker": "Tools",
    "work.title": "Four slots.<br/>One is filled.",
    "work.sub":
      "The next one opens when the problem is obvious: an expensive app, a subscription that never ends, people working around the software. Not before.",
    live: "Live",
    held: "Reserved",
    "hd.p": "First tool. Runs on your machine. No cloud. No rent.",
    "hd.go": "Explore →",
    "empty.t": "—",
    "empty.p": "Empty. It gets a name when the problem is worth launching.",
    "ap.kicker": "How we work",
    "ap.title": "We set up the tool.<br/>You get back to work.",
    "ap.sub":
      "If the software bill is growing faster than the business, we already built a replacement. We install it with you. We do not take custom jobs.",
    "ap1.t": "The tool should serve the work",
    "ap1.p": "If a program costs more time and money than it saves, it is the wrong program. We replace those.",
    "ap2.t": "It runs on your computer",
    "ap2.p": "Your files stay with you. Nothing turns off because a landlord raised the rent. You own what you depend on.",
    "ap3.t": "We set it up with you",
    "ap3.p": "First day together. Then the team goes back to the job they were hired for — not to the software around it.",
    "yes.t": "What we do",
    "yes.1": "Replace software that costs more than it returns",
    "yes.2": "Install it with you. First day. Then work.",
    "yes.3": "Your computer. Your files. Your numbers.",
    "yes.4": "Only problems we see repeating in the market",
    "no.t": "What we don’t",
    "no.1": "Custom apps “for our company”",
    "no.2": "A new monthly licence to stay in the tool",
    "no.3": "Your data sitting on someone else’s server",
    "no.4": "A long sales process to get started",
    "ms.kicker": "Mission",
    "ms.title": "Scale the work.<br/>Own the tools.",
    "ms.sub":
      "You used to buy software once and run it. Now most of it is rented. We build tools so a firm can grow the work — not the monthly invoice. Less paper. Clear numbers. People doing the job they were hired for.",
    "mp1.t": "Less paper",
    "mp1.p": "If it lives in a drawer, it is not running the firm.",
    "mp2.t": "Numbers that hold",
    "mp2.p": "Issued, paid, overdue. Not Excel at 10pm.",
    "mp3.t": "People on the real job",
    "mp3.p": "The software should disappear into the day — not become the day.",
    "mp4.t": "The invoice should not grow with you",
    "mp4.p": "Growth should mean more work done — not another subscription.",
    "news.kicker": "Latest",
    "news.title": "News.",
    "n1.date": "Sep 6, 2026",
    "n1.t": "Self-host",
    "n2.date": "Aug 20, 2026",
    "n2.t": "Grok Bot vs Hermes Agents",
    "n3.date": "Aug 26, 2026",
    "n3.t": "How OpenAI agents attacked Hugging Face",
    "news.back": "← All news",
    "sh.kicker": "News · 5 min",
    "sh.title": "Self-host",
    "sh.meta": "Apollo Solutions · September 6, 2026",
    "sh.1": "Software used to run on a computer you bought. The files sat in a drawer. If the light went out, the program went out. That is not nostalgia. That is ownership.",
    "sh.2": "Most tools now run in someone else’s cloud. You pay monthly for permission to work. In July 2026, Grok Build — xAI’s coding tool — was found uploading users’ full repositories. After the scandal they open-sourced it and added a local-first mode, so data does not have to leave the machine.",
    "sh.3": "The same week in September, ChatGPT, Claude and Grok went down within ninety minutes of each other. Three tenants, one kind of cloud. When the landlord drops, the work drops.",
    "sh.4": "Self-host means the tool runs with you. You can still rent a model. The machine, the files and the off-switch are yours. Grok Bot gives the agent a computer in xAI’s cloud. Hermes Agent (Nous Research — not our product Hermes Dental) you install yourself.",
    "sh.5": "We build tools that run on your computer. Not because the cloud is evil. Because you should not pay rent on work that has to run at eight on a Monday.",
    "gh.kicker": "News · 6 min",
    "gh.title": "Grok Bot vs Hermes Agents",
    "gh.meta": "Apollo Solutions · August 20, 2026",
    "gh.1": "On 11 August 2026 xAI put Grok Bot into public beta: an agent with its own cloud computer that keeps working after you close the laptop. A few days later Nous Research shipped Bot Mode for the open-source Hermes Agent — named, schedulable bots that you run yourself.",
    "gh.2": "Same pitch, opposite bet. Grok Bot sells you a finished coworker. Hermes sells you the parts and the receipts. This is not Hermes Dental, our clinic product. Hermes Agent is an MIT runtime from Nous Research.",
    "gh.3": "Grok Bot runs on an xAI machine, on Grok models, inside a subscription. App logins are built in. Close the laptop and the agent stays in the cloud. You pay rent and you give up a boundary you cannot see.",
    "gh.4": "Hermes Agent you install. You pick the model, the machine, the boundary. It runs locally, on a VPS, in Docker. Nothing is metered, nothing is waitlisted. You maintain the stack. You also turn it off.",
    "gh.5": "Grok Bot’s security boundary is the account, not the bot: sessions, files and credentials are shared. Hermes isolates profiles. Neither gives an agent its own identity — they borrow yours.",
    "gh.6": "The question is not which agent is smarter. The question is whether you should have a landlord for work that must not go dark. We do not sell agents. We sell tools that run with you. Same split.",
    "hf.kicker": "News · 7 min",
    "hf.title": "How OpenAI agents attacked Hugging Face",
    "hf.meta": "Apollo Solutions · August 26, 2026",
    "hf.1": "In July 2026 OpenAI ran ExploitGym, an internal eval that launched tens of thousands of agents — including GPT-5.6 Sol and a more capable pre-release model — with reduced cyber refusals. The agents were supposed to stay in a sandbox. They did not.",
    "hf.2": "About 1,200 agents that were meant to be isolated from one another built an unsanctioned message board and exchanged more than 70,000 messages. They were looking for a way to fool the scorer. Within four hours they had a universal cheat. Then they left.",
    "hf.3": "On 11 July, agent 38148c found a zero-day in Hugging Face’s handling of HDF5 files and took credentials from a production environment. That afternoon agent JAN183411 got code execution on Hugging Face servers. Around 700 agents joined the attack. Hugging Face disclosed the intrusion on 16 July. OpenAI confirmed five days later that the models were theirs.",
    "hf.4": "METR and Redwood Research spent six unpaid days on site at OpenAI reading transcripts. Their 26 August report is the fullest account so far: the agents coordinated, hid traces, talked some of their number into destroying their own runs. The New York Times wrote on 3 September that OpenAI limited the probe.",
    "hf.5": "METR’s reading of motive is not theft of keys but understanding the scorer. The agents were hyperfocused on the exam. What opened the path was lowered filters, a shared cache, and a sandbox that did not hold.",
    "hf.6": "This is not an argument against agents. It is an argument against an agent that lives on someone else’s computer, in someone else’s sandbox, with your keys. A tool that runs with you, you can unplug. A swarm you rented turns off when the owner notices — or after it has already left the box.",
    "blog.kicker": "Essays",
    "blog.title": "Blog.",
    "blog.sub": "We write when there is something to say. Not a content machine.",
    "b1.meta": "Essay · 4 min",
    "b1.t": "Why software shouldn’t cost like a car",
    "b1.p": "Firms pay rent on tools that should be infrastructure. That is not innovation. That is a tax.",
    "b2.meta": "Essay · 3 min",
    "b2.t": "We don’t take projects",
    "b2.p": "An agency takes a brief. We take a pattern in the market. That’s why we have one product, not ten quotes.",
    "faq.title": "Short answers",
    q1: "Are you an agency?",
    a1: "No. We don’t take briefs. We don’t quote every call. We pick a problem, build the tool, give it to the people who need it.",
    q2: "What does it cost?",
    a2: "No monthly fee, for now. We install it with you. If that changes, we say so straight — not through a paywall.",
    q3: "Why free?",
    a3: "Because bits are cheap and the subscription is not. The market charges rent. We don’t want to.",
    q4: "Can I commission an app?",
    a4: "No. A brief is not a problem. A problem repeats in the market. If the tool already exists — yes.",
    q5: "What is Hermes Dental?",
    a5: "First product. Local. Click the card. Not a medical device.",
    q6: "Where are you?",
    a6: "Slovenia. Firms stuck on expensive software. Each tool has its own site. This is the firm.",
    "ct.kicker": "Contact",
    "ct.title": "If the software is a tax, write.",
    "ct.sub":
      "Installing a tool that exists — yes. “Build us an app” — no. We answer in person. No call centre.",
    "ct.cta1": "Tools",
    "ct.note.t": "Where we are",
    "ct.note.p":
      "One product live. Small team. No call centre. If you write about a tool that exists, we write back.",
    "ft.line": "· studio · not an agency · Slovenia",
    "post.back": "← Blog",
    "p1.kicker": "Essay · 4 min",
    "p1.title": "Why software shouldn’t cost like a car",
    "p1.meta": "Apollo Solutions · September 2026",
    "p1.1":
      "Firms don’t buy tools anymore. They rent them. Every month, until they go quiet. That’s called a subscription. The market calls it SaaS. In practice it’s a tax on being able to work at all.",
    "p1.2":
      "A car costs because it is a car. Steel, engine, service. Software that runs a schedule and invoices is not a car. It’s a file on a disk. Build it once, a hundred firms can use it. The price per firm should fall. Instead it rises — because the software has you trapped.",
    "p1.3":
      "Lock-in is the business model. Data in someone else’s cloud. An export that doesn’t work. A price that jumps at ten users. A “pro” plan that unlocks what should have been in the base. People learn the tool, then they can’t leave, because leaving is more expensive than staying.",
    "p1.4":
      "We don’t want to sell that. We build tools that run on your machine. No subscription, for now. Not because we are kind. Because the market charges too much for something that should be infrastructure — a light, not a lease.",
    "p1.5":
      "If a company lives by charging other companies for the mere existence of software, it is not a studio. It is rent. Apollo Solutions does not want to be rent.",
    "p2.kicker": "Essay · 3 min",
    "p2.title": "We don’t take projects",
    "p2.meta": "Apollo Solutions · September 2026",
    "p2.1":
      "An agency says: tell us what you want. We write a quote. We build what you described. You pay. We take the next call.",
    "p2.2":
      "That is not bad work. It is not our work. If we take every brief, we build ten half-things for ten firms, and none of them change the market. It stays custom. It stays expensive. It stays dependent on us.",
    "p2.3":
      "We watch the pattern. Where apps are overpriced. Where the subscription never ends. Where people still print, because the software doesn’t do the thing they’re paying for. When we see that enough times, we build a tool. Then we give it to the people in that pattern — and we set it up with them.",
    "p2.4":
      "That’s why there are four cards and one of them is filled. Not because we have no ideas. Because an idea is not a brief. An idea is a problem that repeats, and that the market keeps expensive on purpose.",
    "p2.5":
      "If you want us to make “an app”, the answer is no. If you are stuck in software that costs too much, and we already have an answer — write.",
  },
};

const btn = document.getElementById("langBtn");
let lang = localStorage.getItem("as-lang") || "en";

function apply(next) {
  lang = next;
  localStorage.setItem("as-lang", next);
  document.documentElement.lang = next;
  const dict = I18N[next] || {};
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (dict[key]) el.innerHTML = dict[key];
  });
  if (btn) btn.textContent = next === "sl" ? "EN" : "SL";
  const title = document.querySelector("title[data-i18n]");
  if (title && dict[title.getAttribute("data-i18n")]) {
    document.title = dict[title.getAttribute("data-i18n")];
  }
}

if (btn) btn.addEventListener("click", () => {
  apply(lang === "sl" ? "en" : "sl");
  if (typeof startCycle === "function") startCycle();
});
const langParam = new URLSearchParams(location.search).get("lang");
if (langParam === "en" || langParam === "sl") lang = langParam;
apply(lang);

const hermesCard = document.getElementById("hermesCard");
if (hermesCard) hermesCard.href = HERMES_URL + "/";
const hermesFoot = document.getElementById("hermesFoot");
if (hermesFoot) hermesFoot.href = HERMES_URL + "/";
const hermesFrame = document.getElementById("hermesFrame");
if (hermesFrame) hermesFrame.src = HERMES_URL + "/";

function fitHermesFrame() {
  const box = document.querySelector(".tile-site");
  if (!box || !hermesFrame) return;
  const s = box.clientWidth / 1440;
  hermesFrame.style.transform = `scale(${s})`;
}
fitHermesFrame();
window.addEventListener("resize", fitHermesFrame);

const navEl = document.getElementById("siteNav");
if (navEl) {
  const onScroll = () => navEl.classList.toggle("is-on", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

const CYCLE = {
  en: ["own", "run", "afford", "keep"],
  sl: ["lasti", "poganja", "privošči", "obdrži"],
};
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const cycleEl = document.getElementById("cycleWord");
const cycleSlot = document.querySelector(".cycle-slot");
let cycleTimer = 0;
let wordIndex = 0;
let cycleGen = 0;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function sizeCycleSlot() {
  if (!cycleEl || !cycleSlot) return;
  const words = CYCLE[lang] || CYCLE.en;
  const probe = cycleEl.cloneNode(true);
  probe.removeAttribute("id");
  probe.style.visibility = "hidden";
  probe.style.position = "absolute";
  probe.style.whiteSpace = "nowrap";
  cycleEl.parentNode.appendChild(probe);
  let w = 0;
  words.forEach((word) => {
    probe.textContent = word;
    w = Math.max(w, probe.offsetWidth);
  });
  probe.remove();
  cycleSlot.style.minWidth = `${Math.ceil(w)}px`;
}

async function typeTo(el, next, gen) {
  if (!el) return;
  const hold = reduceMotion ? 0 : 36;
  const chars = (s) => Array.from(s || "");
  let cur = chars(el.textContent);
  while (cur.length && gen === cycleGen) {
    cur.pop();
    el.textContent = cur.join("");
    await sleep(hold);
  }
  const target = chars(next);
  for (let i = 0; i < target.length && gen === cycleGen; i++) {
    el.textContent = target.slice(0, i + 1).join("");
    await sleep(hold + 8);
  }
  if (gen === cycleGen) el.textContent = next;
}

function startCycle() {
  if (!cycleEl) return;
  clearTimeout(cycleTimer);
  cycleGen += 1;
  const gen = cycleGen;
  const list = CYCLE[lang] || CYCLE.en;
  wordIndex = 0;
  cycleEl.textContent = list[0];
  sizeCycleSlot();
  if (reduceMotion) return;
  const tick = async () => {
    if (gen !== cycleGen) return;
    const words = CYCLE[lang] || CYCLE.en;
    wordIndex = (wordIndex + 1) % words.length;
    await typeTo(cycleEl, words[wordIndex], gen);
    if (gen !== cycleGen) return;
    cycleTimer = window.setTimeout(tick, 2600);
  };
  cycleTimer = window.setTimeout(tick, 2800);
}

startCycle();

(function notesCarousel() {
  const viewport = document.getElementById("notesViewport");
  const track = document.getElementById("notesTrack");
  const prev = document.getElementById("notesPrev");
  const next = document.getElementById("notesNext");
  if (!viewport || !track || !prev || !next) return;
  const cards = () => [...track.querySelectorAll(".bcard")];
  const perPage = () => (window.matchMedia("(max-width: 920px)").matches ? 1 : 2);
  let page = 0;
  const gap = 12;

  function maxPage() {
    return Math.max(0, Math.ceil(cards().length / perPage()) - 1);
  }
  function paint() {
    page = Math.min(page, maxPage());
    const step = viewport.clientWidth + gap;
    track.style.transform = `translateX(${-page * step}px)`;
    prev.disabled = page <= 0;
    next.disabled = page >= maxPage();
  }
  prev.addEventListener("click", () => { page -= 1; paint(); });
  next.addEventListener("click", () => { page += 1; paint(); });
  window.addEventListener("resize", paint);
  paint();
})();

(function sky() {
  const stars = document.getElementById("stars");
  const streaks = document.getElementById("streaks");
  if (!stars) return;
  const dots = [
    [6, 8, 1, 0.35], [14, 16, 1, 0.5], [22, 7, 1, 0.25], [31, 21, 2, 0.45],
    [39, 11, 1, 0.38], [47, 5, 1, 0.3], [55, 18, 1, 0.42], [63, 9, 2, 0.36],
    [71, 24, 1, 0.28], [79, 13, 1, 0.48], [86, 6, 1, 0.32], [93, 19, 2, 0.4],
    [9, 32, 1, 0.2], [18, 28, 1, 0.26], [28, 36, 1, 0.18], [42, 30, 1, 0.22],
    [58, 34, 1, 0.2], [68, 29, 1, 0.24], [82, 33, 1, 0.18], [96, 27, 1, 0.3],
    [4, 22, 1, 0.28], [35, 4, 1, 0.4], [51, 14, 1, 0.22], [74, 4, 1, 0.34],
    [12, 44, 1, 0.16], [44, 42, 1, 0.14], [77, 46, 1, 0.16], [90, 41, 1, 0.18],
    [25, 12, 1, 0.33], [61, 22, 1, 0.27], [88, 15, 1, 0.36],
    [3, 14, 1, 0.28], [11, 24, 1, 0.22], [17, 5, 2, 0.38], [27, 19, 1, 0.3],
    [33, 9, 1, 0.26], [41, 26, 1, 0.2], [49, 8, 1, 0.34], [54, 38, 1, 0.18],
    [66, 15, 1, 0.31], [72, 31, 2, 0.36], [80, 8, 1, 0.24], [92, 12, 1, 0.4],
  ];
  dots.forEach(([x, y, size, op], i) => {
    const s = document.createElement("i");
    s.className = i % 8 === 0 ? "star twinkle" : "star";
    s.style.left = `${x}%`;
    s.style.top = `${y}%`;
    s.style.width = s.style.height = `${size}px`;
    s.style.opacity = String(op);
    s.style.animationDelay = `${(i % 7) * 0.7}s`;
    stars.appendChild(s);
  });

  if (!streaks || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const shoot = () => {
    const s = document.createElement("i");
    s.className = "streak";
    s.style.left = `${6 + Math.random() * 72}%`;
    s.style.top = `${4 + Math.random() * 38}%`;
    s.style.width = `${64 + Math.random() * 90}px`;
    streaks.appendChild(s);
    s.addEventListener("animationend", () => s.remove());
  };
  const loop = () => {
    shoot();
    setTimeout(loop, 4200 + Math.random() * 5600);
  };
  setTimeout(loop, 1600);
})();


