/* eslint-disable */
// Hermes Dental — interactive website demo
// All state is in-memory. Nothing is sent anywhere.

(function () {
  // ---------- State ----------
  const state = {
    tab: "domov",
    online: true,
    language: "sl",
    userName: "Lata",
    patientQuery: "",
    selectedPatientId: "p1",
    selectedFdi: null,
    invTab: "bills", // bills | quotes | incoming | overview | template
    invFilter: "all",
    invYear: 2026,
    invQuery: "",
    invSelectedId: "i2",
    kolWeekOffset: 0,
    // clinic settings
    clinic: {
      name: "JS Dental", issuer: "Lata Kovač s.p.", address: "Trg Republike 4, 1000 Ljubljana",
      tax: "SI12345678", vat: true, iban: "SI56 0201 0000 1234 567", bic: "LJBASI2X",
      bank: "Nova Ljubljanska banka d.d.", matična: "1234567890",
    },
    // invoice template
    template: {
      accentColor: "#3a5589", headingSize: 24, bodySize: 10,
      introText: "Zahvaljujemo se vam za zaupanje.",
      footNote: "Sklic: 26-0001 · IBAN: SI56 0201 0000 1234 567",
      showPaymentBlock: true, showLegalFooter: true, showFURS: false, showDraftMark: true,
      showUnit: true, unitText: "kos",
    },
    // services
    services: [
      { id: "sv1", name: "Pregled", price: 30, durMin: 30 },
      { id: "sv2", name: "Higiena", price: 55, durMin: 45 },
      { id: "sv3", name: "Zalivka", price: 65, durMin: 45 },
      { id: "sv4", name: "Endodontija", price: 180, durMin: 90 },
      { id: "sv5", name: "Prevleka", price: 480, durMin: 90 },
      { id: "sv6", name: "RTG", price: 35, durMin: 15 },
      { id: "sv7", name: "Anestezija", price: 40, durMin: 15 },
    ],
    // patients
    patients: [
      {
        id: "p1", firstName: "Ana", lastName: "Kovač", phone: "041 123 456",
        kzz: "0321-599-201", email: "ana.kovac@demo.si", birthDate: "1987-03-14",
        address: "Ljubljanska 8, 1000 Ljubljana", cave: "Penicillin — huda alergija",
        consentAt: "2025-09-12", notes: "Zelo boji. Rada anestezijo.",
        teeth: { 11: "karies", 26: "zalivka", 36: "prevleka", 46: "endo" },
        plan: [
          { id: "pl1", serviceId: "sv3", fdi: "26", price: 65, durMin: 45, status: "planned" },
          { id: "pl2", serviceId: "sv2", fdi: null, price: 55, durMin: 45, status: "planned" },
          { id: "pl3", serviceId: "sv1", fdi: null, price: 30, durMin: 30, status: "done" },
          { id: "pl4", serviceId: "sv5", fdi: "16", price: 480, durMin: 90, status: "planned" },
        ],
      },
      {
        id: "p2", firstName: "Janez", lastName: "Kovač", phone: "041 999 111",
        kzz: "1124-882-330", email: "janez.kovac@demo.si", birthDate: "1972-11-05",
        address: "Cesta v Gorice 45, 1000 Ljubljana", cave: null,
        consentAt: "2024-06-01", notes: null,
        teeth: { 16: "prevleka", 21: "manjka" }, plan: [],
      },
      {
        id: "p3", firstName: "Marija", lastName: "Lipnik", phone: "031 555 222",
        kzz: "0089-110-554", email: null, birthDate: "1955-07-22",
        address: "Šubičeva 3, 1000 Ljubljana", cave: "Latex",
        consentAt: "2023-02-14", notes: "Visok pritisk.",
        teeth: { 47: "manjka" }, plan: [],
      },
      {
        id: "p4", firstName: "Tomaž", lastName: "Mrvar", phone: "040 777 888",
        kzz: "2207-441-901", email: "tomaz.mrvar@demo.si", birthDate: "1991-08-30",
        address: "Polanski 18, 1000 Ljubljana", cave: null,
        consentAt: null, notes: null,
        teeth: {}, plan: [],
      },
      {
        id: "p5", firstName: "Petra", lastName: "Horvat", phone: "051 333 444",
        kzz: "4012-667-210", email: "petra.horvat@demo.si", birthDate: "1984-12-02",
        address: "Židovska 21, 1000 Ljubljana", cave: "Latex",
        consentAt: "2025-01-20", notes: null,
        teeth: { 11: "karies" }, plan: [],
      },
      {
        id: "p6", firstName: "Marko", lastName: "Novak", phone: "040 111 222",
        kzz: "5554-990-118", email: "marko.novak@demo.si", birthDate: "1995-05-19",
        address: "Podmilščakova 5, 1000 Ljubljana", cave: null,
        consentAt: "2026-08-10", notes: null,
        teeth: { 45: "zalivka" }, plan: [],
      },
    ],
    // appointments — time as "HH:MM" on a single day
    appointments: [
      { id: "a1", time: "08:00", durMin: 45, kind: "hig", patientId: "p1", status: "completed", confirmed: true },
      { id: "a2", time: "09:00", durMin: 30, kind: "preg", patientId: "p6", status: "scheduled", confirmed: false },
      { id: "a3", time: "10:00", durMin: 30, kind: "malica", patientId: null, status: "block", confirmed: true },
      { id: "a4", time: "10:30", durMin: 60, kind: "kar", patientId: "p5", status: "scheduled", confirmed: true },
      { id: "a5", time: "12:00", durMin: 60, kind: "malica", patientId: null, status: "block", confirmed: true },
      { id: "a6", time: "14:00", durMin: 30, kind: "rtg", patientId: "p2", status: "scheduled", confirmed: true },
      { id: "a7", time: "15:00", durMin: 30, kind: "preg", patientId: "p4", status: "scheduled", confirmed: false },
      { id: "a8", time: "16:00", durMin: 45, kind: "endo", patientId: "p3", status: "scheduled", confirmed: true },
      { id: "a9", time: "17:00", durMin: 30, kind: "preg", patientId: "p1", status: "no_show", confirmed: true },
    ],
    // waitlist
    waitlist: [
      { id: "w1", patientName: "Luka Petrič", phone: "041 222 000", note: "Samo zjutraj", added: "3.9." },
      { id: "w2", patientName: "Maja Šušteršič", phone: "031 999 888", note: "Nujno — bolečina", added: "5.9." },
    ],
    // invoices
    invoices: [
      { id: "i1", number: "26-0118", title: "Pregled + RTG", patientId: "p1", partyName: "Ana Kovač", issuedAt: "2026-09-01", dueAt: "2026-09-15", lang: "sl", status: "paid", paidCents: 12000, totalCents: 12000, method: "card", reverseCharge: false, lines: [ { name: "Pregled", qty: 1, cents: 3000 }, { name: "Higiena", qty: 1, cents: 5500 }, { name: "RTG", qty: 1, cents: 3500 } ] },
      { id: "i2", number: "26-0119", title: "Prevleka · zob 16", patientId: "p2", partyName: "Janez Kovač", issuedAt: "2026-09-02", dueAt: "2026-09-16", lang: "sl", status: "issued", paidCents: 0, totalCents: 48000, method: "transfer", reverseCharge: false, lines: [ { name: "Prevleka · zob 16", qty: 1, cents: 48000 } ] },
      { id: "i3", number: "26-0120", title: "Plomba + higiena", patientId: "p5", partyName: "Petra Horvat", issuedAt: "2026-09-03", dueAt: "2026-09-03", lang: "sl", status: "overdue", paidCents: 0, totalCents: 20000, method: "cash", reverseCharge: false, lines: [ { name: "Plomba · zob 11", qty: 1, cents: 6500 }, { name: "Higiena", qty: 1, cents: 5500 }, { name: "Anestezija", qty: 2, cents: 4000 } ] },
      { id: "i4", number: "26-0121", title: "Higiena", patientId: "p3", partyName: "Marija Lipnik", issuedAt: "2026-09-04", dueAt: "2026-09-18", lang: "sl", status: "issued", paidCents: 0, totalCents: 5500, method: null, reverseCharge: false, lines: [ { name: "Higiena", qty: 1, cents: 5500 } ] },
      { id: "i5", number: "26-0122", title: "Pregled", patientId: "p6", partyName: "Marko Novak", issuedAt: "2026-09-05", dueAt: "2026-09-19", lang: "sl", status: "draft", paidCents: 0, totalCents: 3000, method: null, reverseCharge: false, lines: [ { name: "Pregled", qty: 1, cents: 3000 } ] },
      { id: "i6", number: "26-0117", title: "Zalivka · zob 45", patientId: "p6", partyName: "Marko Novak", issuedAt: "2026-08-28", dueAt: "2026-09-11", lang: "sl", status: "paid", paidCents: 6500, totalCents: 6500, method: "cash", reverseCharge: false, lines: [ { name: "Zalivka · zob 45", qty: 1, cents: 6500 } ] },
    ],
    // incoming bills
    incoming: [
      { id: "in1", supplier: "Dentamed d.o.o.", no: "DM-2026-0891", date: "2026-09-04", totalCents: 89000, status: "paid" },
      { id: "in2", supplier: "Kettenbach", no: "KB-4451", date: "2026-09-07", totalCents: 34000, status: "issued" },
      { id: "in3", supplier: "Straumann", no: "ST-2026-112", date: "2026-08-22", totalCents: 125000, status: "paid" },
    ],
    // suppliers
    suppliers: [
      { id: "s1", name: "Dentamed d.o.o.", taxId: "SI88123412", city: "Maribor", phone: "02 555 01 00" },
      { id: "s2", name: "Kettenbach", taxId: "DE812551230", city: "Eschenburg", phone: "+49 2 77 00 33 55" },
      { id: "s3", name: "Straumann", taxId: "CH123456789", city: "Basel", phone: "+41 61 965 11 11" },
    ],
    // team
    team: [
      { id: "m1", name: "Lata Kovač", role: "zdravnik", phone: "041 123 000", active: true },
      { id: "m2", name: "Maja Šušteršič", role: "receptorka", phone: "031 999 000", active: true },
      { id: "m3", name: "Nina Zupan", role: "asistent", phone: "040 777 111", active: true },
      { id: "m4", name: "Žan Erjavec", role: "higienik", phone: "051 555 666", active: true },
      { id: "m5", name: "Alja Kavčič", role: "čistilka", phone: "051 444 333", active: false },
    ],
    // shifts — key = memberId + ISO date string, value = array of shifts
    shifts: [],
    // time off
    timeOff: [
      { id: "t1", memberId: "m4", kind: "training", startDate: iso(addDays(nowD(), 2)), endDate: iso(addDays(nowD(), 2)), label: "Izobraževanje" },
      { id: "t2", memberId: "m3", kind: "vacation", startDate: iso(addDays(nowD(), 9)), endDate: iso(addDays(nowD(), 11)), label: "Dopust" },
    ],
  };

  function nowD() { const d = new Date(); d.setHours(0,0,0,0); return d; }
  function addDays(d, n) { const x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }
  function iso(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }

  // populate week shifts for current week
  function seedShifts() {
    const mon = mondayOf(nowD());
    for (const m of state.team.filter((x) => x.active)) {
      for (let i = 0; i < 7; i++) {
        const d = iso(addDays(mon, i));
        const key = `${m.id}__${d}`;
        if (m.id === "m1") {
          if (i === 0 || i === 1) state.shifts.push({ memberId: m.id, date: d, startMin: 8*60, endMin: 14*60, breakMin: 30 });
          else if (i === 2) state.shifts.push({ memberId: m.id, date: d, startMin: 12*60, endMin: 18*60, breakMin: 30 });
          else if (i === 3) {} // off
          else if (i === 4) state.shifts.push({ memberId: m.id, date: d, startMin: 8*60, endMin: 13*60, breakMin: 0 });
        } else if (m.id === "m2") {
          if (i < 5) state.shifts.push({ memberId: m.id, date: d, startMin: 7*60, endMin: 14*60, breakMin: 30 });
        } else if (m.id === "m3") {
          if (i <= 1) state.shifts.push({ memberId: m.id, date: d, startMin: 13*60, endMin: 19*60, breakMin: 30 });
          else if (i === 3) state.shifts.push({ memberId: m.id, date: d, startMin: 13*60, endMin: 19*60, breakMin: 30 });
          else if (i === 4) state.shifts.push({ memberId: m.id, date: d, startMin: 13*60, endMin: 19*60, breakMin: 30 });
        } else if (m.id === "m4") {
          if (i === 3) state.shifts.push({ memberId: m.id, date: d, startMin: 9*60, endMin: 13*60, breakMin: 0 });
        }
      }
    }
  }

  function mondayOf(d) {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const dow = x.getDay();
    x.setDate(x.getDate() + (dow === 0 ? -6 : 1 - dow));
    return x;
  }

  // ---------- Utilities ----------
  function t(key) {
    const lang = localStorage.getItem("hds-lang") || "sl";
    const dict = DICT[lang] || DICT.sl;
    return dict[key] != null ? dict[key] : key;
  }
  function kindLabel(k) {
    const map = { preg: "Pregled", hig: "Higiena", kar: "Karies", endo: "Endo", rtg: "RTG", malica: "Malica", dopust: "Dopust", nujni: "Nujni buffer" };
    return map[k] || k;
  }
  function toothStateLabel(s) {
    const map = { zdrav: "Zdrav", karies: "Karies", zalivka: "Zalivka", prevleka: "Prevleka", manjka: "Manjka", implant: "Implantat", endo: "Endodontija" };
    return map[s] || s;
  }
  function roleLabel(r) {
    const map = { zdravnik: "Zdravnik", asistent: "Asistent", receptorka: "Receptorka", higienik: "Higienik", čistilka: "Čistilka", other: "Drug" };
    return map[r] || r;
  }
  function statusLabel(s) {
    const map = { scheduled: "Načrtovan", completed: "Opravljen", cancelled: "Preklican", no_show: "Ni prišel", block: "" };
    return map[s] || s;
  }
  function invStatusLabel(s) {
    const map = { draft: "Predračun", issued: "Izdan", paid: "Plačan", overdue: "Zapadel", cancelled: "Storniran" };
    return map[s] || s;
  }
  function methodLabel(m) {
    const map = { cash: "Gotovina", card: "Kartica", transfer: "Nakazilo", insurance: "Zavarovanje" };
    return map[m] || m;
  }
  function kindColor(k) {
    const map = { preg: "#3a5589", hig: "#047857", kar: "#c23b3b", endo: "#6b21a8", rtg: "#b45309" };
    return map[k] || "#6b7285";
  }
  function timeToMin(t) { const [h,m] = t.split(":").map(Number); return h*60+m; }
  function minToTime(m) { return `${String(Math.floor(m/60)).padStart(2,"0")}:${String(m%60).padStart(2,"0")}`; }
  function fmtEur(cents) { return (cents/100).toLocaleString("sl-SI",{minimumFractionDigits:2})+" €"; }
  function fmtMin(m) { const h=Math.floor(m/60); return h===0?`${m} min`:(m%60===0?`${h} h`:`${h} h ${m%60} min`); }
  function pad(n) { return n < 10 ? `0${n}` : String(n); }
  function todayStr() { return new Date().toLocaleDateString("sl-SI", { weekday:"long", day:"numeric", month:"long", year:"numeric" }); }
  function el(html) { const t=document.createElement("template"); t.innerHTML=html.trim(); return t.content.firstElementChild; }

  // ---------- Toast ----------
  let toastTimer = null;
  function toast(msg) {
    const el = document.getElementById("demoToast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
  }

  // ---------- Render ----------
  function render() {
    document.getElementById("dTitle").textContent = TITLES[state.tab][(localStorage.getItem("hds-lang")||"sl")];
    document.querySelectorAll(".dtab").forEach(b => b.classList.toggle("active", b.dataset.tab === state.tab));
    document.getElementById("onlineText").textContent = state.online ? t("onlineOk") : t("offline");
    document.getElementById("onlineDot").classList.toggle("off", !state.online);

    const pane = document.getElementById("demoPane");
    if (!pane) return;
    pane.innerHTML = "";
    pane.appendChild(renderPanel());
  }

  function renderPanel() {
    const pane = document.getElementById("demoPane");
    pane.style.background = "#f7f8fb";
    switch (state.tab) {
      case "domov": return renderDomov();
      case "urnik": return renderUrnik();
      case "bolniki": return renderBolniki();
      case "finance": return renderFinance();
      case "kolektiv": return renderKolektiv();
      case "nastavitve": return renderNastavitve();
      default: return el("<div></div>");
    }
  }

  // ---------- TITLES / dict ----------
  const TITLES = {
    domov: { sl: "Domov", en: "Home" },
    urnik: { sl: "Urnik", en: "Schedule" },
    bolniki: { sl: "Bolniki", en: "Patients" },
    finance: { sl: "Finance", en: "Billing" },
    kolektiv: { sl: "Kolektiv", en: "Team" },
    nastavitve: { sl: "Nastavitve", en: "Settings" },
  };

  const DICT = {
    sl: {
      onlineOk: "API · povezan", offline: "Brez povezave · API ne odgovori",
      searchPh: "Išči bolnike, storitve, orodja …",
      dmK1: "Nepotrjeni", dmK2: "Recare", dmK3: "Čakalna", dmK4: "Odprto",
      deskHintAll: "Vsi termini so potrjeni.", deskHintEmpty: "Nihče ni zapadel.", deskHintNone: "Prazna vrsta.", deskHintMoney: "Neplačani računi.",
      dmAgenda: "Danes · stol 1", dmAgendaSub: "",
      dmUrnikLink: "Urnik →",
      connectors: "Povezave", connectorsSub: "Pošta in koledar v brskalniku. Sinhronizacija v ordinacijo pride kasneje.",
      callList: "Klicati danes", callListSub: "Brez termina · 4+ mesecev",
      toolsKicker: "Orodja",
      statsToday: "Danes", statsPatients: "bolnikov", statsOpen: "Odprto", statsMonth: "Ta mesec",
      callAction: "Klici", openAction: "Odpri",
      urnikHeader: "Teden · Stol 1",
      urnikHint: "Kliknite prost termin, da ga ustvarite. Kliknite zasedenega, da ga zaključite, prekličete ali označite kot \"ni prišel\".",
      waitlistTitle: "Čakalnavrsta", todaySum: "Danes", bookNow: "+ knjiga", added: "dodano",
      uDone: "Zaključi", uNoShow: "Ni prišel", uCancel: "Storno", uDel: "Izbriši",
      uCreate: "Nov termin",
      uNext: "Naslednji termin",
      weekLabel: "Ta teden", prevWeek: "‹ Prej", nextWeek: "Naprej ›",
      qaLunch: "+ Malica 12:00", qaVac: "+ Dopust dan", qaEmg: "+ Nujni buffer",
      patCount: "bolnikov", patNew: "+ Nov bolnik",
      odonTitle: "Odontogram", odonPick: "Izberite zob",
      odonState: "Stanje", planTitle: "Načrt zdravljenja", planAdd: "+ storitev",
      planSumPlanned: "Odprto", planSumDone: "Opravljeno",
      planToInvoice: "Predračun",
      chartFiles: "Datoteke", visitsTitle: "Obiski",
      kZZ: "KZZ", email: "E-pošta", birth: "Rojstvo", address: "Naslov", notes: "Opombe",
      consentYes: "Soglasje zabeleženo", consentNo: "Soglasje ni zabeleženo",
      finTabsBills: "Izdani računi", finTabsQuotes: "Predračuni", finTabsIncoming: "Prejeti računi", finTabsOverview: "Pregled", finTabsTemplate: "Predloga",
      finSearchPh: "Išči št., naziv ali bolnika …",
      finFilterAll: "Vsi", finFilterUnpaid: "Neplačani", finFilterPaid: "Plačani", finFilterOver: "Zapadli", finFilterCancelled: "Stornirani",
      finNoInvoice: "Izberite dokument na levi.",
      invLines: "Postavke", invSubtotal: "Skupaj", invTotal: "Za plačilo", invDue: "Rok", invMethod: "Način plačila", invReverse: "Reverse charge (76.a člen)",
      invPay: "Plačano", invIssue: "V račun", invPdf: "PDF", invEmail: "E-pošta", invStorno: "Storno", invDelete: "Izbriši",
      incomingTitle: "Prejeti računi", incomingDrop: "Povlecite PDF ali sliko · kliknite za izbiro",
      incomingSupp: "Dobavitelji", incomingReceipts: "Računi",
      ovKIssued: "Izdano", ovKPaid: "Plačano", ovKUnpaid: "Neplačano", ovKAvg: "Povprečen račun", ovKDue: "Zapadlo", ovKDisc: "Popusti", ovKQuotes: "Predračuni", ovKCancel: "Storno",
      ovMonth: "Prihodek po mesecih", ovMethod: "Način plačila",
      ovTopSvc: "Naj storitve", ovTopPat: "Naj bolniki", ovOwed: "Odprte terjatve",
      tplTitle: "Predloga računa", tplLogo: "Logotip", tplColor: "Barvni poudarek", tplHeadSize: "Velikost naslova", tplBodySize: "Velikost pisave",
      tplIntro: "Tekst nad postavkami", tplFooter: "Besedilo desno v nogi",
      tplPayBlock: "Plačilni blok (TRR, sklic)", tplLegalFoot: "Pravna noga (davčna, matična)", tplFursNote: "FURS opomba", tplDraftMark: "Draft opomba", tplUnitCol: "Stolpec \"Enota\"",
      tplSave: "Shrani predlogo", tplReset: "Ponastavi",
      kolTitle: "Kolektiv", kolWkPrev: "Prejšnji teden", kolWkDanes: "Ta teden", kolWkNext: "Prihodnji teden",
      kolMember: "Član", kolHours: "Ure",
      setTitle: "Nastavitve", setSubtitle: "Podatki lokalno · ~/Library/Application Support/HermesDental/",
      setSave: "Shrani profil", setSaveOk: "Shranjeno (v brskalniku).",
      setBackupT: "Varnostna kopija", setBackup: "Prenesi .db", setRestore: "Povrni iz datoteke",
      setSvcT: "Cenik storitev",
      setOffline: "Preklop povezave",
      toastCall: "Klic v teku …", toastPaid: "Račun plačan.", toastOpen: "Dokument odprt.",
      toastAdd: "Dodano.", toastSaved: "Shranjeno.",
      toastDel: "Izbrisano.", toastDone: "Obisk zaključen.",
      toastTooth: "Zob", toastOops: "Najprej izberite zob.",
      toastInv: "Račun izdan.",
      toastShift: "Izmena shranjena.",
      toastTimeOff: "Odsotnost zabeležena.",
    },
    en: {
      onlineOk: "API · connected", offline: "Offline · API unreachable",
      searchPh: "Search patients, services, tools …",
      dmK1: "Unconfirmed", dmK2: "Recare", dmK3: "Waitlist", dmK4: "Outstanding",
      deskHintAll: "All appointments confirmed.", deskHintEmpty: "No one overdue.", deskHintNone: "Empty queue.", deskHintMoney: "Unpaid invoices.",
      dmAgenda: "Today · chair 1", dmAgendaSub: "",
      dmUrnikLink: "Schedule →",
      connectors: "Connectors", connectorsSub: "Mail and calendar open in the browser. Sync into the practice comes later.",
      callList: "Call today", callListSub: "No booking · 4+ months",
      toolsKicker: "Tools",
      statsToday: "Today", statsPatients: "patients", statsOpen: "Outstanding", statsMonth: "This month",
      callAction: "Call", openAction: "Open",
      urnikHeader: "Week · Chair 1",
      urnikHint: "Click an empty slot to create. Click an occupied one to complete, cancel or mark as no-show.",
      waitlistTitle: "Waitlist", todaySum: "Today", bookNow: "+ book", added: "added",
      uDone: "Complete", uNoShow: "No-show", uCancel: "Cancel", uDel: "Delete",
      uCreate: "New slot",
      uNext: "Next free slot",
      weekLabel: "This week", prevWeek: "‹ Prev", nextWeek: "Next ›",
      qaLunch: "+ Lunch 12:00", qaVac: "+ Vacation day", qaEmg: "+ Emergency buffer",
      patCount: "patients", patNew: "+ New patient",
      odonTitle: "Odontogram", odonPick: "Pick a tooth",
      odonState: "State", planTitle: "Treatment plan", planAdd: "+ service",
      planSumPlanned: "Open", planSumDone: "Done",
      planToInvoice: "Estimate",
      chartFiles: "Files", visitsTitle: "Visits",
      kZZ: "KZZ", email: "Email", birth: "Born", address: "Address", notes: "Notes",
      consentYes: "Consent on file", consentNo: "Consent not recorded",
      finTabsBills: "Issued invoices", finTabsQuotes: "Estimates", finTabsIncoming: "Incoming", finTabsOverview: "Overview", finTabsTemplate: "Template",
      finSearchPh: "Search number, title or patient …",
      finFilterAll: "All", finFilterUnpaid: "Unpaid", finFilterPaid: "Paid", finFilterOver: "Overdue", finFilterCancelled: "Cancelled",
      finNoInvoice: "Pick a document on the left.",
      invLines: "Lines", invSubtotal: "Subtotal", invTotal: "Total", invDue: "Due", invMethod: "Method", invReverse: "Reverse charge (Art. 76.a)",
      invPay: "Mark paid", invIssue: "Convert", invPdf: "PDF", invEmail: "Email", invStorno: "Void", invDelete: "Delete",
      incomingTitle: "Incoming bills", incomingDrop: "Drag PDF or image · click to pick",
      incomingSupp: "Suppliers", incomingReceipts: "Receipts",
      ovKIssued: "Issued", ovKPaid: "Paid", ovKUnpaid: "Unpaid", ovKAvg: "Avg invoice", ovKDue: "Overdue", ovKDisc: "Discounts", ovKQuotes: "Drafts", ovKCancel: "Cancelled",
      ovMonth: "Revenue by month", ovMethod: "Payment method",
      ovTopSvc: "Top services", ovTopPat: "Top patients", ovOwed: "Open receivables",
      tplTitle: "Invoice template", tplLogo: "Logo", tplColor: "Accent colour", tplHeadSize: "Heading size", tplBodySize: "Body size",
      tplIntro: "Text above lines", tplFooter: "Right-side footer",
      tplPayBlock: "Payment block (IBAN, ref)", tplLegalFoot: "Legal footer (tax ID, reg no)", tplFursNote: "FURS note", tplDraftMark: "Draft note", tplUnitCol: "\"Unit\" column",
      tplSave: "Save template", tplReset: "Reset",
      kolTitle: "Team", kolWkPrev: "Previous week", kolWkDanes: "This week", kolWkNext: "Next week",
      kolMember: "Member", kolHours: "Hours",
      setTitle: "Settings", setSubtitle: "Local data · ~/Library/Application Support/HermesDental/",
      setSave: "Save profile", setSaveOk: "Saved (in browser).",
      setBackupT: "Backup", setBackup: "Download .db", setRestore: "Restore from file",
      setSvcT: "Service price list",
      setOffline: "Toggle connection",
      toastCall: "Calling …", toastPaid: "Invoice paid.", toastOpen: "Document opened.",
      toastAdd: "Added.", toastSaved: "Saved.",
      toastDel: "Deleted.", toastDone: "Visit completed.",
      toastTooth: "Tooth", toastOops: "Pick a tooth first.",
      toastInv: "Invoice issued.",
      toastShift: "Shift saved.",
      toastTimeOff: "Absence recorded.",
    },
  };

  // ---------- Domov ----------
  function renderDomov() {
    const wrap = el(`<div></div>`);
    const now = new Date();
    wrap.appendChild(el(`<div>
      <div class="dgreet">${greeting()}, ${state.userName}</div>
      <div class="ddate">${todayStr()} · ${t("dmAgenda")}</div>
    </div>`));

    // desk cards
    const unconf = state.appointments.filter(a => a.status === "scheduled" && !a.confirmed);
    const overdue = state.invoices.filter(i => i.status === "overdue" || (i.status === "issued" && i.dueAt < iso(nowD())));
    const overdueCents = overdue.reduce((s,i)=>s+(i.totalCents - (i.paidCents||0)),0);
    const unconfHint = unconf[0] ? (nameOf(unconf[0].patientId) + " · " + unconf[0].time) : t("deskHintAll");
    const recHint = state.waitlist.length ? state.waitlist[0].patientName + " · " + state.waitlist[0].added : t("deskHintEmpty");
    const wlHint = state.waitlist.length ? state.waitlist[0].patientName : t("deskHintNone");
    const openHint = fmtEur(overdueCents);
    wrap.appendChild(el(`<div class="desk-row">
      <button class="desk-card" data-j="urnik"><div class="kicker">${t("dmK1")}</div><div class="num">${unconf.length}</div><div class="hint">${unconfHint}</div></button>
      <button class="desk-card" data-j="bolniki"><div class="kicker">${t("dmK2")}</div><div class="num">${state.waitlist.length}</div><div class="hint">${recHint}</div></button>
      <button class="desk-card" data-j="urnik"><div class="kicker">${t("dmK3")}</div><div class="num">${state.waitlist.length}</div><div class="hint">${wlHint}</div></button>
      <button class="desk-card" data-j="finance"><div class="kicker">${t("dmK4")}</div><div class="num">${openHint}</div><div class="hint">${t("deskHintMoney")}</div></button>
    </div>`));
    wrap.querySelectorAll("[data-j]").forEach(b => b.addEventListener("click", () => { state.tab = b.dataset.j; render(); }));

    // universal search
    const sWrap = el(`<div class="dsearch-box"><input class="dsearch" placeholder="${t("searchPh")}" /><div class="dsearch-hits" style="display:none"></div></div>`);
    const inp = sWrap.querySelector(".dsearch");
    const hits = sWrap.querySelector(".dsearch-hits");
    const TOOLS = [
      { id: "e", l: "eZdravje", h: "Portal" }, { id: "z", l: "ZZZS", h: "Zavarovalnica" },
      { id: "ed", l: "eDavki", h: "FURS" }, { id: "n", l: "NIJZ", h: "Javno zdravje" },
      { id: "zb", l: "Zbornica", h: "Zdravniki" },
      { id: "u", l: "Urnik", h: "Stol 1", tab: "urnik" },
      { id: "b", l: "Kartotека", h: "Bolniki", tab: "bolniki" },
      { id: "f", l: "Računi", h: "Finance", tab: "finance" },
      { id: "gc", l: "Google Koledar", h: "Zunanji koledar" },
      { id: "gm", l: "Gmail", h: "Pošta v brskalniku" },
    ];
    inp.addEventListener("input", () => {
      const q = inp.value.trim().toLowerCase();
      hits.innerHTML = "";
      if (q.length < 2) { hits.style.display = "none"; return; }
      hits.style.display = "block";
      const tHits = TOOLS.filter(x => (x.l + " " + x.h).toLowerCase().includes(q));
      const pHits = state.patients.filter(p => (p.lastName + " " + p.firstName).toLowerCase().includes(q) || (p.phone||"").includes(q) || (p.kzz||"").includes(q));
      if (tHits.length) tHits.slice(0, 3).forEach(x => {
        hits.appendChild(el(`<div class="dhit" data-tool="${x.tab||x.l}"><span class="l">${x.l}</span><span class="r">${x.h}</span></div>`));
      });
      pHits.slice(0, 3).forEach(p => hits.appendChild(el(`<div class="dhit" data-pat="${p.id}"><span class="l">${p.lastName} ${p.firstName}</span><span class="r">${p.phone || "Kartoteka"}</span></div>`)));
      if (!tHits.length && !pHits.length) hits.appendChild(el(`<div class="dhit-empty">Ni zadetkov.</div>`));
      hits.querySelectorAll(".dhit").forEach(h => h.addEventListener("click", () => {
        inp.value = ""; hits.style.display = "none";
        if (h.dataset.pat) { state.tab = "bolniki"; state.selectedPatientId = h.dataset.pat; render(); }
        else if (h.dataset.tool && (h.dataset.tool === "urnik" || h.dataset.tool === "bolniki" || h.dataset.tool === "finance")) { state.tab = h.dataset.tool; render(); }
        else toast("Odpiram: " + h.dataset.tool);
      }));
    });
    wrap.appendChild(sWrap);

    // agenda + connectors
    const row = el(`<div class="domov-row"></div>`);
    const left = el(`<div></div>`);
    const scheduled = state.appointments.filter(a => a.status === "scheduled").sort((a,b)=>timeToMin(a.time)-timeToMin(b.time));
    const agendaCard = el(`<div class="agenda-card"></div>`);
    agendaCard.appendChild(el(`<div class="agenda-head"><div><div class="kicker">${t("dmAgenda").split("·")[0].trim()}</div><h3 style="font-size:15px">${scheduled.length} terminov</h3></div><button class="dlink" data-goto="urnik">${t("dmUrnikLink")}</button></div>`));
    state.appointments.forEach((a, i) => {
      const isNext = a.status === "scheduled" && a.time >= minToTime(now.getHours()*60+now.getMinutes());
      const name = a.kind === "malica" || a.kind === "dopust" ? (a.patientId ? nameOf(a.patientId) : "—") : nameOf(a.patientId);
      const row = el(`<div class="agenda-row ${isNext ? "next" : ""}">
        <span class="at">${a.time}</span>
        <span class="an"><b>${name}</b><small>${kindLabel(a.kind)} · ${a.durMin} min${a.confirmed ? " · potrjeno" : ""}</small></span>
        <span class="ac">Klic</span>
      </div>`);
      row.querySelector(".ac").addEventListener("click", () => toast(t("toastCall")));
      agendaCard.appendChild(row);
    });
    left.appendChild(agendaCard);

    // connectors column (right)
    const right = el(`<div>
      <div class="kicker">${t("connectors")}</div>
      <div style="font-size:11px; color:#6b7285; margin-bottom:8px; line-height:1.35;">${t("connectorsSub")}</div>
    </div>`);
    [
      { name: "Google Koledar", hint: "Zunanji koledar — Urnik ostane stol 1.", dot: "#1A73E8" },
      { name: "Gmail", hint: "Pošta ordinacije v brskalniku.", dot: "#EA4335" },
      { name: "Outlook", hint: "Microsoft 365 / Hotmail.", dot: "#0A5ED7" },
    ].forEach(c => {
      const card = el(`<div class="conn-card"><span class="dot" style="background:${c.dot}"></span><span class="body"><div class="name">${c.name}</div><div class="hint">${c.hint}</div></span><span class="act">${t("openAction")}</span></div>`);
      card.addEventListener("click", () => toast("Odpiram: " + c.name));
      right.appendChild(card);
    });
    row.appendChild(left); row.appendChild(right);
    wrap.appendChild(row);

    // call list
    const calls = el(`<div class="call-list">
      <div class="agenda-head"><div><div class="kicker">${t("callList")}</div><h3 style="font-size:15px">${t("callListSub")}</h3></div></div>
    </div>`);
    [
      { name: "Ana Kovač", months: 7, lv: "12. 2." }, { name: "Janez Kovač", months: 6, lv: "5. 3." }, { name: "Luka Petrič", months: 5, lv: "8. 4." },
      { name: "Tomaž Mrvar", months: 4, lv: "3. 5." }, { name: "Alja Kavčič", months: 4, lv: "21. 5." },
    ].forEach(c => {
      const r = el(`<div class="call-row">
        <div class="call-copy"><div class="cn">${c.name}</div><div class="cm">Zadnji obisk · ${c.lv} · ${c.months} mesecev</div></div>
        <button class="dbtn tiny ghost">${t("callAction")}</button>
      </div>`);
      r.querySelector("button").addEventListener("click", () => toast(t("toastCall")));
      calls.appendChild(r);
    });
    wrap.appendChild(calls);

    // tools
    const tools = el(`<div>
      <div class="kicker" style="margin-bottom:8px">${t("toolsKicker")}</div>
      <div class="tools-row">
        <button class="tool-chip" data-t="urnik"><div class="tl">Urnik</div><div class="th">Stol 1</div></button>
        <button class="tool-chip" data-t="bolniki"><div class="tl">Kartoteka</div><div class="th">Bolniki</div></button>
        <button class="tool-chip" data-t="finance"><div class="tl">Računi</div><div class="th">Finance</div></button>
        <button class="tool-chip"><div class="tl">eZdravje</div><div class="th">Portal</div></button>
        <button class="tool-chip"><div class="tl">ZZZS</div><div class="th">Zavarovalnica</div></button>
        <button class="tool-chip"><div class="tl">eDavki</div><div class="th">FURS</div></button>
        <button class="tool-chip"><div class="tl">NIJZ</div><div class="th">Javno zdravje</div></button>
        <button class="tool-chip"><div class="tl">Zbornica</div><div class="th">Zdravniki</div></button>
      </div>
    </div>`);
    tools.querySelectorAll(".tool-chip[data-t]").forEach(ch => ch.addEventListener("click", () => { state.tab = ch.dataset.t; render(); }));
    tools.querySelectorAll(".tool-chip:not([data-t])").forEach(ch => ch.addEventListener("click", () => toast("Odpiram: " + ch.querySelector(".tl").textContent)));
    wrap.appendChild(tools);

    // footer stats
    wrap.appendChild(el(`<div class="stats-line">
      <span>${t("statsToday")} <b>${state.appointments.filter(a=>a.status==="scheduled").length} terminov</b></span><span class="sep">·</span>
      <span><b>${state.patients.length}</b> ${t("statsPatients")}</span><span class="sep">·</span>
      <span>${t("statsOpen")} <b>${fmtEur(overdueCents)}</b></span><span class="sep">·</span>
      <span>${t("statsMonth")} <b>${fmtEur(185000)}</b></span>
    </div>`));

    return wrap;
  }

  function greeting() {
    const h = new Date().getHours();
    if (h < 10) return "Dobro jutro";
    if (h < 18) return "Dober dan";
    return "Dober večer";
  }
  function nameOf(id) { const p = state.patients.find(x => x.id === id); return p ? `${p.lastName} ${p.firstName}` : "Bolnik"; }

  // ---------- Urnik ----------
  function renderUrnik() {
    const wrap = el(`<div></div>`);
    const dayDate = iso(nowD());
    const weekStart = mondayOf(nowD());

    // header with toggle + quick-add + legend
    const head = el(`<div class="uhead">
      <div class="week-nav">
        <button class="nav-b">‹</button>
        <span class="week-label">${t("urnikHeader")} · ${todayStr()}</span>
        <button class="nav-b">›</button>
      </div>
      <div class="toggle"><button class="on">Teden</button><button>Mesec</button></div>
      <div class="qa">
        <button class="qbtn" data-qa="malica">${t("qaLunch")}</button>
        <button class="qbtn" data-qa="dopust">${t("qaVac")}</button>
        <button class="qbtn" data-qa="nujni">${t("qaEmg")}</button>
      </div>
    </div>`);
    head.querySelectorAll(".qbtn").forEach(b => b.addEventListener("click", () => {
      const k = b.dataset.qa;
      const times = { malica: "12:00", dopust: "08:00", nujni: "16:00" };
      state.appointments.push({ id: "b"+Date.now(), time: times[k], durMin: k==="dopust" ? 600 : k==="malica" ? 60 : 15, kind: k, patientId: null, status: "block", confirmed: true });
      toast(t("toastAdd"));
      render();
    }));
    wrap.appendChild(head);

    // occupancy color for each day of week
    const days = Array.from({length:7}, (_,i)=>addDays(weekStart, i));
    const occ = days.map(d => {
      const key = iso(d);
      const busy = state.appointments.filter(a => a.status === "scheduled" || a.status === "done").length;
      return Math.min(600, busy * 45) / 600;
    });

    const wrapRow = el(`<div class="urnik-wrap"></div>`);

    // --- schedule (left) ---
    const sched = el(`<div class="usched"></div>`);
    const gutter = el(`<div class="ugutter"></div>`);
    const body = el(`<div class="ubody"><div class="ugrid" id="ugrid"></div></div>`);
    sched.appendChild(gutter); sched.appendChild(body);

    const HOUR_START = 8; const HOUR_END = 18; const PX_PER_HOUR = 60; const SLOT_MIN = 15;
    const GRID_MIN = (HOUR_END - HOUR_START) * 60; const GRID_PX = (GRID_MIN / 60) * PX_PER_HOUR;
    for (let h = HOUR_START; h <= HOUR_END; h++) {
      const row = el(`<div class="gh">${pad(h)}:00</div>`); gutter.appendChild(row);
    }
    body.querySelector(".ugrid").style.height = GRID_PX + "px";
    for (let m = 0; m <= GRID_MIN; m += SLOT_MIN) {
      const line = el(`<div class="uslot-line ${m % 60 === 0 ? "hour" : ""}" style="top:${(m/60)*PX_PER_HOUR}px"></div>`);
      body.querySelector(".ugrid").appendChild(line);
    }

    // now line (only if today)
    const now = new Date();
    const nowMin = now.getHours()*60+now.getMinutes();
    if (nowMin >= HOUR_START*60 && nowMin <= HOUR_END*60) {
      const top = ((nowMin - HOUR_START*60)/60)*PX_PER_HOUR;
      body.querySelector(".ugrid").appendChild(el(`<div class="u-now" style="top:${top}px"></div>`));
    }

    // ghost hover slot
    const ghost = el(`<button class="uhint" style="display:none; top:0"></button>`);
    body.querySelector(".ugrid").appendChild(ghost);

    // appointments
    state.appointments.forEach(a => {
      const minStart = timeToMin(a.time); const minEnd = minStart + a.durMin;
      if (minStart < HOUR_START*60 || minEnd > HOUR_END*60) return;
      const top = ((minStart - HOUR_START*60)/60)*PX_PER_HOUR;
      const height = Math.max(22, (a.durMin/60)*PX_PER_HOUR - 2);
      const name = a.kind === "malica" || a.kind === "dopust" || a.kind === "nujni" ? "" : nameOf(a.patientId);
      const isDone = a.status === "completed";
      const chip = el(`<div class="u-apt ${isDone?"done":""} k-${a.kind}" style="top:${top}px;height:${height}px" data-id="${a.id}">
        <span>${name ? `${name} · ${kindLabel(a.kind)}` : kindLabel(a.kind)}${a.confirmed && a.status==="scheduled" ? " ✓" : ""}</span>
        <span class="am">${a.durMin}m</span>
        <span class="uact">
          ${a.status === "scheduled" ? `
            <button data-do="done">${t("uDone").substring(0,5)}</button>
            <button data-do="show">${t("uNoShow").substring(0,4)}</button>
            <button data-do="canc">${t("uCancel")}</button>` : a.status === "done" ? "" : ""}
        </span>
      </div>`);
      chip.querySelectorAll("[data-do]").forEach(btn => btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const done = btn.dataset.do;
        if (done === "done") { a.status = "completed"; toast(t("toastDone")); }
        else if (done === "show") { a.status = "no_show"; toast("Označeno kot ni prišel."); }
        else if (done === "canc") { a.status = "cancelled"; toast("Termin preklican."); }
        render();
      }));
      chip.addEventListener("click", () => {
        if (a.status === "scheduled") { a.status = "completed"; toast(t("toastDone")); render(); }
      });
      body.querySelector(".ugrid").appendChild(chip);
    });

    // ghost handler
    body.addEventListener("mousemove", (e) => {
      const rect = body.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const totalMin = HOUR_START*60 + (y / PX_PER_HOUR) * 60;
      const snapped = Math.round(totalMin / SLOT_MIN) * SLOT_MIN;
      if (snapped < HOUR_START*60 || snapped >= HOUR_END*60) { ghost.style.display = "none"; return; }
      const top = ((snapped - HOUR_START*60)/60)*PX_PER_HOUR;
      const occupied = state.appointments.some(a => {
        const s = timeToMin(a.time); const eEnd = s + a.durMin;
        return !(snapped >= eEnd || snapped + 30 <= s);
      });
      if (!occupied) {
        ghost.style.top = top + "px";
        ghost.textContent = "+ " + t("uCreate") + " · " + minToTime(snapped);
        ghost.dataset.time = minToTime(snapped);
        ghost.style.display = "block";
        ghost.classList.add("show");
      } else {
        ghost.style.display = "none";
        ghost.classList.remove("show");
      }
    });
    body.addEventListener("mouseleave", () => { ghost.style.display = "none"; });
    ghost.addEventListener("click", () => {
      const time = ghost.dataset.time || "09:00";
      const kinds = ["preg","hig","kar","rtg"]; const k = kinds[Math.floor(Math.random()*kinds.length)];
      const pids = state.patients.map(p=>p.id);
      state.appointments.push({ id: "n"+Date.now(), time, durMin: 30, kind: k, patientId: pids[Math.floor(Math.random()*pids.length)], status: "scheduled", confirmed: false });
      toast(t("toastAdd"));
      render();
    });

    wrapRow.appendChild(sched);

    // --- right pane ---
    const pane = el(`<div class="upane"></div>`);

    // KPIs
    pane.appendChild(el(`<div class="dcard">
      <h4>${t("todaySum")}</h4>
      <div class="ukpis">
        <div class="u"><b>${state.appointments.filter(a=>a.status!=="block").length}</b><span>terminov</span></div>
        <div class="u"><b>${Math.round(state.appointments.filter(a=>a.status!=="block").reduce((s,a)=>s+a.durMin,0)/6) }%</b><span>zasedeno</span></div>
        <div class="u"><b>${fmtFree()}</b><span>prosto</span></div>
      </div>
    </div>`));

    // waitlist
    const wl = el(`<div class="dcard"><h4>${t("waitlistTitle")}</h4></div>`);
    state.waitlist.forEach(w => {
      const item = el(`<div class="waitlist-item">
        <div><b>${w.patientName}</b><div class="wm">${w.note} · ${t("added")} ${w.added}</div></div>
        <button class="dbtn tiny green">${t("bookNow")}</button>
      </div>`);
      item.querySelector("button").addEventListener("click", () => {
        const free = findFreeSlot();
        if (!free) { toast("Ni prostih terminov danes."); return; }
        const idx = state.waitlist.indexOf(w);
        state.waitlist.splice(idx, 1);
        state.appointments.push({ id:"b"+Date.now(), time: free, durMin: 30, kind: "preg", patientId: state.patients[0].id, status: "scheduled", confirmed: true });
        toast("Termin rezerviran: " + free);
        render();
      });
      wl.appendChild(item);
    });
    pane.appendChild(wl);

    // blockouts
    const blocks = state.appointments.filter(a => a.status === "block");
    if (blocks.length) {
      const bl = el(`<div class="dcard"><h4>Blokade</h4></div>`);
      blocks.forEach(b => {
        const chip = el(`<div class="dcard" style="padding:6px 8px; border-left:2px solid ${b.kind==="vacation"?"#3B82F6":b.kind==="malica"?"#F59E0B":"#DC2626"}; margin-bottom:4px; font-size:11px; color:#2b3040;">
          <b>${kindLabel(b.kind)}</b> · ${b.time} (${b.durMin} min)
        </div>`);
        bl.appendChild(chip);
      });
      pane.appendChild(bl);
    }

    // next slot
    const next = findFreeSlot();
    if (next) pane.appendChild(el(`<div class="dcard today-sum"><b>${t("uNext")} · ${next}</b></div>`));

    pane.appendChild(el(`<div class="ulegend">
      <span><i class="dot" style="background:${kindColor("preg")}"></i>Pregled</span>
      <span><i class="dot" style="background:${kindColor("hig")}"></i>Higiena</span>
      <span><i class="dot" style="background:${kindColor("kar")}"></i>Karies</span>
      <span><i class="dot" style="background:${kindColor("rtg")}"></i>RTG</span>
      <span><i class="dot" style="background:${kindColor("endo")}"></i>Endo</span>
    </div>`));

    wrapRow.appendChild(pane);
    wrap.appendChild(wrapRow);
    return wrap;

    function fmtFree() {
      const busy = state.appointments.filter(a=>a.status!=="block").reduce((s,a)=>s+a.durMin,0);
      const total = 600;
      return minToTime(Math.max(0, total - busy));
    }
    function findFreeSlot() {
      for (let m = HOUR_START*60; m <= HOUR_END*60 - 30; m += SLOT_MIN) {
        if (!state.appointments.some(a => {
          const s = timeToMin(a.time); const e = s + a.durMin;
          return !(m >= e || m + 30 <= s);
        })) return minToTime(m);
      }
      return null;
    }
  }

  // ---------- Bolniki ----------
  function renderBolniki() {
    const wrap = el(`<div></div>`);

    // toolbar
    wrap.appendChild(el(`<div class="bol-toolbar">
      <div>
        <div class="pageKicker">Kartoteka</div>
        <div class="pageTitle">${state.patients.length} ${t("patCount")}</div>
      </div>
      <div style="flex:1"></div>
      <input class="search" id="bolQ" placeholder="${t("patSearchPh")}" />
      <button class="dbtn" id="bolNew">${t("patNew")}</button>
    </div>`));

    const layout = el(`<div class="bol-wrap"></div>`);
    const patients = state.patients.slice().sort((a,b) => a.lastName.localeCompare(b.lastName, "sl"));
    const filtered = state.patientQuery ? patients.filter(p => (p.lastName+" "+p.firstName+" "+(p.kzz||"")+" "+(p.phone||"")).toLowerCase().includes(state.patientQuery.toLowerCase())) : patients;
    const selected = filtered.find(p => p.id === state.selectedPatientId) || filtered[0];
    if (selected) state.selectedPatientId = selected.id;

    // list column
    const listCol = el(`<div class="bol-list">
      <div class="col-head"><span>Priimek, ime</span><span>Telefon</span></div>
      <div class="rows" id="bolRows"></div>
    </div>`);
    const rowsEl = listCol.querySelector("#bolRows");
    if (!filtered.length) rowsEl.appendChild(el(`<div class="bol-empty">Ni bolnikov.</div>`));
    filtered.forEach(p => {
      const row = el(`<div class="bol-row ${p.id === state.selectedPatientId ? "active" : ""}" data-pid="${p.id}">
        <div><div class="pn">${p.cave ? '<span class="pdot"></span>' : ''}${p.lastName}, ${p.firstName}</div><div class="pm">${p.kzz ? "KZZ " + p.kzz : (p.email || "brez e-pošte")}</div></div>
        <div class="ph">${p.phone || "—"}</div>
      </div>`);
      row.addEventListener("click", () => { state.selectedPatientId = p.id; state.selectedFdi = null; render(); });
      rowsEl.appendChild(row);
    });
    layout.appendChild(listCol);

    // detail
    const detail = el(`<div class="bol-detail"></div>`);
    if (selected) {
      detail.appendChild(el(`<div class="bol-head">
        <div>
          <div class="name">${selected.lastName} ${selected.firstName}</div>
          <div class="sub">${selected.phone || "Brez telefona"}${selected.consentAt ? " · soglasje " + selected.consentAt : " · soglasje ni zabeleženo"}</div>
        </div>
        <button class="dbtn tiny ghost">Uredi</button>
      </div>`));
      detail.querySelector("button").addEventListener("click", () => toast("Urejanje bolnika (demo)."));

      // CAVE
      if (selected.cave) {
        detail.appendChild(el(`<div class="cave-banner"><div class="k">⚠ CAVE</div><div class="v">${selected.cave}</div></div>`));
      }

      // odontogram
      const odon = el(`<div class="odon-block"><h4>${t("odonTitle")}</h4><svg viewBox="0 0 320 90" id="odonSvg"></svg></div>`);
      const svg = odon.querySelector("#odonSvg");
      const upper = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
      const lower = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
      const plannedFdis = new Set(selected.plan.filter(x => x.status === "planned" && x.fdi).map(x => x.fdi));
      const drawArch = (nums, y) => {
        nums.forEach((fdi, i) => {
          const x = 8 + i * 19.5;
          const rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
          rect.setAttribute("x", x); rect.setAttribute("y", y);
          rect.setAttribute("width", 16); rect.setAttribute("height", 26); rect.setAttribute("rx", 3);
          let fill = "none"; let stroke = "#3a4258"; let sw = 1;
          const s = selected.teeth[fdi];
          if (s === "karies") fill = "rgba(194,59,59,0.5)";
          else if (s === "zalivka") fill = "rgba(58,85,137,0.5)";
          else if (s === "prevleka") fill = "rgba(5,150,105,0.5)";
          else if (s === "endo") fill = "rgba(180,83,9,0.5)";
          else if (s === "implant") fill = "rgba(107,33,168,0.45)";
          else if (s === "manjka") fill = "rgba(107,114,133,0.15)";
          if (fdi === state.selectedFdi) { stroke = "#3a5589"; sw = 2.2; fill = "rgba(58,85,137,0.18)"; }
          rect.setAttribute("fill", fill); rect.setAttribute("stroke", stroke); rect.setAttribute("stroke-width", sw);
          rect.style.cursor = "pointer";
          if (s === "manjka") {
            const line = document.createElementNS("http://www.w3.org/2000/svg","line");
            line.setAttribute("x1", x); line.setAttribute("y1", y);
            line.setAttribute("x2", x+16); line.setAttribute("y2", y+26);
            line.setAttribute("stroke","#6b7285"); line.setAttribute("stroke-width",1.4);
            line.setAttribute("pointer-events","none");
            svg.appendChild(line);
          }
          if (plannedFdis.has(fdi)) {
            const dot = document.createElementNS("http://www.w3.org/2000/svg","circle");
            dot.setAttribute("cx", x + 13); dot.setAttribute("cy", y + 4);
            dot.setAttribute("r", 2.5); dot.setAttribute("fill","#3a5589");
            dot.setAttribute("pointer-events","none");
            svg.appendChild(dot);
          }
          rect.addEventListener("click", () => { state.selectedFdi = fdi; render(); });
          svg.appendChild(rect);
          const lbl = document.createElementNS("http://www.w3.org/2000/svg","text");
          lbl.setAttribute("x", x + 8); lbl.setAttribute("y", y + 16);
          lbl.setAttribute("text-anchor","middle"); lbl.setAttribute("font-size","7.5"); lbl.setAttribute("fill","#3a4258");
          lbl.textContent = fdi;
          lbl.setAttribute("pointer-events","none");
          svg.appendChild(lbl);
        });
      };
      drawArch(upper, 8);
      drawArch(lower, 54);
      detail.appendChild(odon);

      // state picker
      const tools = el(`<div class="odon-tools"></div>`);
      ["zdrav","karies","zalivka","prevleka","manjka","implant","endo"].forEach(s => {
        const b = el(`<button class="ts ${selected.teeth[state.selectedFdi] === s ? "on" : ""}">${toothStateLabel(s)}</button>`);
        b.addEventListener("click", () => {
          if (!state.selectedFdi) { toast(t("toastOops")); return; }
          if (s === "zdrav") delete selected.teeth[state.selectedFdi]; else selected.teeth[state.selectedFdi] = s;
          toast(`${t("toastTooth")} ${state.selectedFdi} → ${toothStateLabel(s)}`);
          if (s === "karies" || s === "zalivka") {
            selected.plan.push({ id: "pl"+Date.now(), serviceId: "sv3", fdi: String(state.selectedFdi), price: 65, durMin: 45, status: "planned" });
            toast("Odontogram in plan sinhronizirana.");
          }
          render();
        });
        tools.appendChild(b);
      });
      detail.appendChild(tools);

      // treatment plan
      const plan = el(`<div class="plan-table">
        <h4>${t("planTitle")}<button class="dbtn tiny" id="addPl">${t("planAdd")}</button></h4>
        <div class="plan-head"><span>Storitev</span><span>Zob</span><span>Cena</span><span>Trajanje</span><span>Status</span></div>
        <div id="planRows"></div>
        <div class="plan-sum" id="planSum"></div>
      </div>`);
      plan.querySelector("#addPl").addEventListener("click", () => {
        if (!state.selectedFdi) { toast(t("toastOops")); return; }
        selected.plan.push({ id:"pl"+Date.now(), serviceId: "sv3", fdi: String(state.selectedFdi), price: 65, durMin: 45, status: "planned" });
        toast(t("toastAdd"));
        render();
      });
      const rows = plan.querySelector("#planRows");
      selected.plan.forEach(row => {
        const svc = state.services.find(s=>s.id===row.serviceId);
        const r = el(`<div class="plan-row">
          <span class="svc">${svc ? svc.name : row.serviceId}</span>
          <span class="zob">${row.fdi || "—"}</span>
          <span class="cena">${fmtEur(row.price*100)}</span>
          <span class="cena" style="font-weight:400; color:#6b7285; font-size:11px;">${row.durMin} min</span>
          <span class="st ${row.status}" data-s="${row.status}">${row.status === "planned" ? t("planSumPlanned") : row.status === "done" ? t("planSumDone") : "Preklicano"}</span>
        </div>`);
        r.querySelector(".st").addEventListener("click", () => {
          const cycle = { planned: "done", done: "cancelled", cancelled: "planned" };
          row.status = cycle[row.status] || "planned";
          render();
        });
        rows.appendChild(r);
      });
      const openSum = selected.plan.filter(r=>r.status==="planned").reduce((s,r)=>s+r.price,0);
      const doneSum = selected.plan.filter(r=>r.status==="done").reduce((s,r)=>s+r.price,0);
      plan.querySelector("#planSum").innerHTML = `<span>${t("planSumPlanned")}: <b style="font-size:12px">${fmtEur(openSum*100)}</b></span><span>${t("planSumDone")}: <b style="font-size:12px">${fmtEur(doneSum*100)}</b></span><button class="dbtn tiny green" id="issueDraft">${t("planToInvoice")}</button>`;
      plan.querySelector("#issueDraft").addEventListener("click", () => {
        const open = selected.plan.filter(r=>r.status==="planned");
        const cents = open.reduce((s,r)=>s+r.price,0) * 100;
        if (cents <= 0) { toast("Ni odprtih postavk."); return; }
        state.invoices.push({
          id: "i"+Date.now(),
          number: "26-" + String(123 + Math.floor(Math.random()*900)),
          title: `Načrt · ${selected.lastName}`,
          patientId: selected.id, partyName: selected.lastName + " " + selected.firstName,
          issuedAt: iso(nowD()), dueAt: iso(addDays(nowD(), 15)),
          lang: "sl", status: "draft", paidCents: 0, totalCents: cents, method: null, reverseCharge: false,
          lines: open.map(r => {
            const svc = state.services.find(s=>s.id===r.serviceId);
            return { name: `${svc ? svc.name : r.serviceId}${r.fdi ? " · zob " + r.fdi : ""}`, qty: 1, cents: r.price*100 };
          }),
        });
        state.tab = "finance"; state.invTab = "quotes";
        toast(t("toastInv")); render();
      });
      detail.appendChild(plan);

      // files
      const files = el(`<div class="chart-files"><h4>${t("chartFiles")}</h4>
        <div class="file-row"><span class="fn">rtg_14_02_2026.jpg</span><span class="fs">2,4 MB</span><span class="fd">RTG</span><button class="dbtn tiny ghost" style="padding:1px 4px; font-size:9px">×</button></div>
        <div class="file-row"><span class="fn">ortopan.jpg</span><span class="fs">4,1 MB</span><span class="fd">RTG</span><button class="dbtn tiny ghost" style="padding:1px 4px; font-size:9px">×</button></div>
        <div class="file-row"><span class="fn">anapamneza.pdf</span><span class="fs">0,9 MB</span><span class="fd">PDF</span><button class="dbtn tiny ghost" style="padding:1px 4px; font-size:9px">×</button></div>
      </div>`);
      files.querySelectorAll(".fn").forEach(f => f.addEventListener("click", () => toast("Preview: " + f.textContent)));
      files.querySelectorAll("button").forEach(b => b.addEventListener("click", () => toast("Izbrisano.")));
      detail.appendChild(files);

      // detail grid
      const grid = el(`<div class="detail-grid">
        <div class="df"><span class="dk">${t("kZZ")}</span><span class="dv">${selected.kzz || "—"}</span></div>
        <div class="df"><span class="dk">${t("email")}</span><span class="dv">${selected.email || "—"}</span></div>
        <div class="df"><span class="dk">${t("birth")}</span><span class="dv">${selected.birthDate || "—"}</span></div>
        <div class="df"><span class="dk">${t("address")}</span><span class="dv">${selected.address || "—"}</span></div>
        <div class="df"><span class="dk">${t("notes")}</span><span class="dv">${selected.notes || "—"}</span></div>
      </div>`);
      detail.appendChild(grid);

      // visits
      const visits = el(`<div class="visits-list"><h4>${t("visitsTitle")}</h4></div>`);
      if (selected.id === "p1") {
        [
          { d: "24. 8. 2026", t: "Higiena + prevleka 16", n: "Higiena OK, prevleka OK. Recare v 6 mesecih." },
          { d: "3. 6. 2026", t: "Pregled", n: "Vse v redu. Naslednji RTG čez 12 mesecev." },
          { d: "15. 3. 2026", t: "Plomba 26", n: "Karies v zobu 26, sanirano." },
        ].forEach(v => visits.appendChild(el(`<div class="visit-row"><div class="vd">${v.d}</div><div class="vt">${v.t}</div><div class="vn">${v.n}</div></div>`)));
      } else {
        visits.appendChild(el(`<div class="visit-row" style="color:#6b7285; font-size:11px;">Ni še obiskov.</div>`));
      }
      detail.appendChild(visits);
    }
    layout.appendChild(detail);
    wrap.appendChild(layout);

    // wire toolbar
    const qInput = wrap.querySelector("#bolQ");
    qInput.value = state.patientQuery;
    let deb;
    qInput.addEventListener("input", () => {
      clearTimeout(deb);
      deb = setTimeout(() => { state.patientQuery = qInput.value; render(); }, 150);
    });
    wrap.querySelector("#bolNew").addEventListener("click", () => {
      state.patients.push({ id: "p"+Date.now(), firstName: "Nov", lastName: "Bolnik", phone: "", kzz: "", email: "", birthDate: "", address: "", cave: null, consentAt: null, notes: "", teeth: {}, plan: [] });
      toast(t("toastAdd")); render();
    });

    return wrap;
  }

  // ---------- Finance ----------
  function renderFinance() {
    const wrap = el(`<div></div>`);

    // sub-tab bar
    const tabs = el(`<div class="fin-tabs"></div>`);
    [
      ["bills", t("finTabsBills")], ["quotes", t("finTabsQuotes")], ["incoming", t("finTabsIncoming")], ["overview", t("finTabsOverview")], ["template", t("finTabsTemplate")],
    ].forEach(([id, label]) => {
      const b = el(`<button class="${state.invTab === id ? "on" : ""}">${label}</button>`);
      b.addEventListener("click", () => { state.invTab = id; render(); });
      tabs.appendChild(b);
    });
    wrap.appendChild(tabs);

    // toolbar
    const tb = el(`<div class="fin-toolbar"></div>`);
    if (["bills","quotes","incoming"].includes(state.invTab)) {
      tb.appendChild(el(`<input class="search" placeholder="${t("finSearchPh")}" id="finQ" />`));
      const yy = el(`<div class="year-pills"></div>`);
      [2024, 2025, 2026].forEach(y => {
        const p = el(`<button class="yp ${state.invYear === y ? "on" : ""}">${y}</button>`);
        p.addEventListener("click", () => { state.invYear = y; render(); });
        yy.appendChild(p);
      });
      tb.appendChild(yy);
    }
    if (state.invTab === "bills") {
      const sp = el(`<div class="status-pills"></div>`);
      [["all",t("finFilterAll")],["unpaid",t("finFilterUnpaid")],["paid",t("finFilterPaid")],["overdue",t("finFilterOver")],["cancelled",t("finFilterCancelled")]].forEach(([id,label]) => {
        const b = el(`<button class="sp ${state.invFilter === id ? "on" : ""}">${label}</button>`);
        b.addEventListener("click", () => { state.invFilter = id; render(); });
        sp.appendChild(b);
      });
      tb.appendChild(sp);
    }
    if (tb.childNodes.length) wrap.appendChild(tb);

    // content by tab
    if (state.invTab === "overview") { wrap.appendChild(renderOverview()); return wrap; }
    if (state.invTab === "template") { wrap.appendChild(renderTemplate()); return wrap; }
    if (state.invTab === "incoming") { wrap.appendChild(renderIncoming()); return wrap; }

    // bills / quotes
    const list = (state.invTab === "quotes" ? state.invoices.filter(i=>i.status==="draft") : state.invoices.filter(i=>i.status!=="draft"))
      .filter(i => new Date(i.issuedAt).getFullYear() === state.invYear)
      .filter(i => !state.invQuery || (i.number + " " + i.title + " " + i.partyName).toLowerCase().includes(state.invQuery.toLowerCase()))
      .filter(i => {
        if (state.invTab === "quotes") return true;
        if (state.invFilter === "all") return true;
        if (state.invFilter === "unpaid") return (i.status === "issued" || i.status === "overdue");
        if (state.invFilter === "paid") return i.status === "paid";
        if (state.invFilter === "overdue") return i.status === "overdue" || (i.status === "issued" && i.dueAt < iso(nowD()));
        if (state.invFilter === "cancelled") return i.status === "cancelled";
        return true;
      })
      .slice().sort((a,b) => b.number.localeCompare(a.number));

    const grid = el(`<div class="fin-grid"></div>`);
    const listCol = el(`<div class="fin-list">
      <div class="fin-head"><span>Številka</span><span>Bolnik / naziv</span><span>Datum</span><span>Rok</span><span>Status</span><span style="text-align:right">Znesek</span><span style="text-align:right">Dejanja</span></div>
      <div id="finRows"></div>
    </div>`);
    const rowsEl = listCol.querySelector("#finRows");
    if (!list.length) rowsEl.appendChild(el(`<div style="padding:24px; font-size:12px; color:#6b7285;">Ni dokumentov.</div>`));
    list.forEach(inv => {
      const due = inv.dueAt; const isOverdue = inv.status !== "paid" && due < iso(nowD());
      const row = el(`<div class="fin-row ${inv.id === state.invSelectedId ? "active" : ""}" data-id="${inv.id}">
        <span class="fno">${inv.number}</span>
        <span class="fti"><b>${inv.partyName}</b><small>${inv.title}</small></span>
        <span class="fdt">${inv.issuedAt}</span>
        <span class="fdt">${due}</span>
        <span class="fst ${isOverdue ? "overdue" : inv.status}">${isOverdue ? "zapadel" : invStatusLabel(inv.status)}</span>
        <span class="fam">${fmtEur(inv.totalCents)}</span>
        <span class="fac">
          <button class="dbtn tiny ghost" data-a="pdf">${t("invPdf")}</button>
          ${inv.status !== "paid" && inv.status !== "cancelled" ? `<button class="dbtn tiny green" data-a="pay">${t("invPay")}</button>` : ""}
          ${state.invTab === "quotes" ? `<button class="dbtn tiny" data-a="issue">${t("invIssue")}</button>` : ""}
        </span>
      </div>`);
      row.addEventListener("click", (e) => { if (e.target.dataset.a) return; state.invSelectedId = inv.id; render(); });
      row.querySelectorAll("[data-a]").forEach(b => b.addEventListener("click", (e) => {
        e.stopPropagation();
        if (b.dataset.a === "pdf") toast("PDF bi se odprl v novem zavihku.");
        if (b.dataset.a === "pay") { inv.status = "paid"; inv.paidCents = inv.totalCents; inv.method = "cash"; toast(t("toastPaid")); render(); }
        if (b.dataset.a === "issue") {
          inv.status = "issued";
          state.invoices.push({ ...JSON.parse(JSON.stringify(inv)), id: "i"+Date.now(), number: "26-" + String(200 + Math.floor(Math.random()*800)), title: inv.title, status: "issued", issuedAt: iso(nowD()), dueAt: iso(addDays(nowD(),15)), notes: "Iz predračuna " + inv.number });
          toast("Predračun → račun.");
          render();
        }
      }));
      rowsEl.appendChild(row);
    });
    grid.appendChild(listCol);

    // detail
    const detail = el(`<div class="inv-detail-panel"></div>`);
    const inv = state.invoices.find(i => i.id === state.invSelectedId);
    if (!inv) {
      detail.appendChild(el(`<div style="color:#6b7285; font-size:12px;">${t("finNoInvoice")}</div>`));
    } else {
      const due = inv.dueAt; const isOverdue = inv.status !== "paid" && due < iso(nowD());
      detail.appendChild(el(`<div class="inv-head">
        <div><div class="num">${inv.number}</div><div class="sub">${inv.partyName} · ${inv.title}</div></div>
        <span class="fst ${isOverdue ? "overdue" : inv.status}" style="font-size:10px; padding:3px 8px; border-radius:6px; font-weight:600;">${isOverdue ? "Zapadel" : invStatusLabel(inv.status)}</span>
      </div>`));
      detail.appendChild(el(`<div class="inv-lines"><div style="font-size:10px; font-weight:600; color:#6b7285; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px;">${t("invLines")}</div></div>`));
      inv.lines.forEach(l => {
        const subtotal = l.qty * l.cents;
        detail.querySelector(".inv-lines").appendChild(el(`<div class="inv-line"><span>${l.name}</span><span class="lq">×${l.qty}</span><span class="lp">${fmtEur(l.cents)}</span><span class="lt">${fmtEur(subtotal)}</span></div>`));
      });
      detail.appendChild(el(`<div class="inv-totals"><div>${t("invSubtotal")}</div><div class="grand">${fmtEur(inv.totalCents)}</div></div>`));
      detail.appendChild(el(`<div class="inv-meta">
        <span>${t("invDue")}: <b>${due}</b></span>
        ${inv.method ? `<span>${t("invMethod")}: <b>${methodLabel(inv.method)}</b></span>` : ""}
        <span>Paid: <b>${fmtEur(inv.paidCents||0)}</b></span>
      </div>`));
      const rc = el(`<label class="inv-rc"><input type="checkbox" ${inv.reverseCharge ? "checked" : ""}/> ${t("invReverse")}</label>`);
      rc.querySelector("input").addEventListener("change", (e) => { inv.reverseCharge = e.target.checked; });
      detail.appendChild(rc);

      const actions = el(`<div style="display:flex; gap:6px; padding-top:10px; flex-wrap:wrap;">
        <button class="dbtn tiny ghost">${t("invPdf")}</button>
        <button class="dbtn tiny ghost">${t("invEmail")}</button>
        ${inv.status !== "paid" && inv.status !== "cancelled" ? `<button class="dbtn tiny green" id="payBtn">${t("invPay")}</button>` : ""}
        ${inv.status !== "cancelled" ? `<button class="dbtn tiny red" id="stornoBtn">${t("invStorno")}</button>` : ""}
        <button class="dbtn tiny ghost" id="delBtn">${t("invDelete")}</button>
      </div>`);
      detail.appendChild(actions);
      const pb = actions.querySelector("#payBtn");
      if (pb) pb.addEventListener("click", () => { inv.status = "paid"; inv.paidCents = inv.totalCents; inv.method = "cash"; toast(t("toastPaid")); render(); });
      const sb = actions.querySelector("#stornoBtn");
      if (sb) sb.addEventListener("click", () => { inv.status = "cancelled"; toast("Stornirano."); render(); });
      const db = actions.querySelector("#delBtn");
      db.addEventListener("click", () => { state.invoices = state.invoices.filter(x => x.id !== inv.id); state.invSelectedId = null; toast(t("toastDel")); render(); });
    }
    grid.appendChild(detail);
    wrap.appendChild(grid);

    // wire search
    const sq = wrap.querySelector("#finQ");
    if (sq) {
      sq.value = state.invQuery;
      let deb;
      sq.addEventListener("input", () => { clearTimeout(deb); deb = setTimeout(() => { state.invQuery = sq.value; render(); }, 180); });
    }

    return wrap;
  }

  // --- incoming ---
  function renderIncoming() {
    const w = el(`<div class="incoming-wrap"></div>`);
    const supp = el(`<div class="supp-list"><div class="col-head">${t("incomingSupp")}</div></div>`);
    state.suppliers.forEach(s => {
      const row = el(`<div class="supp-row"><div><b>${s.name}</b><div style="font-size:10px; color:#6b7285">${s.city} · ${s.taxId}</div></div><span>→</span></div>`);
      row.addEventListener("click", () => { toast(s.name + " · " + s.phone); });
      supp.appendChild(row);
    });
    w.appendChild(supp);

    const recBox = el(`<div></div>`);
    const drop = el(`<div class="ddzone">${t("incomingDrop")}</div>`);
    drop.addEventListener("click", () => toast("Izberi datoteko (demo)."));
    drop.addEventListener("dragover", (e) => { e.preventDefault(); drop.style.background = "rgba(58,85,137,0.1)"; });
    drop.addEventListener("dragleave", () => drop.style.background = "");
    drop.addEventListener("drop", (e) => { e.preventDefault(); drop.style.background = ""; toast("Račun prevzet (demo)."); });
    recBox.appendChild(drop);

    const list = el(`<div class="fin-list"></div>`);
    list.appendChild(el(`<div class="fin-head" style="grid-template-columns: 1.4fr 1fr 1fr 80px 60px;"><span>Dobavitelj</span><span>Številka</span><span>Datum</span><span>Status</span><span style="text-align:right">Znesek</span></div>`));
    state.incoming.forEach(r => {
      list.appendChild(el(`<div class="fin-row" style="grid-template-columns: 1.4fr 1fr 1fr 80px 60px;">
        <span class="fti"><b>${r.supplier}</b></span>
        <span class="fno">${r.no}</span>
        <span class="fdt">${r.date}</span>
        <span class="fst ${r.status}">${r.status === "paid" ? "Plačan" : "Izdan"}</span>
        <span class="fam">${fmtEur(r.totalCents)}</span>
      </div>`));
    });
    recBox.appendChild(list);
    w.appendChild(recBox);
    return w;
  }

  // --- overview ---
  function renderOverview() {
    const w = el(`<div></div>`);
    const issued = state.invoices.filter(i => i.status !== "draft" && i.status !== "cancelled");
    const paid = issued.filter(i => i.status === "paid");
    const issuedTotal = issued.reduce((s,i)=>s+i.totalCents,0);
    const paidTotal = paid.reduce((s,i)=>s+i.totalCents,0);
    const unpaidTotal = issuedTotal - paidTotal;
    const avg = issued.length ? Math.round(issuedTotal / issued.length) : 0;
    const overdue = issued.filter(i => i.status === "overdue" || (i.status === "issued" && i.dueAt < iso(nowD())));
    const overdueCents = overdue.reduce((s,i)=>s+(i.totalCents - (i.paidCents||0)),0);
    const drafts = state.invoices.filter(i=>i.status==="draft").length;
    const cancelled = state.invoices.filter(i=>i.status==="cancelled").length;

    w.appendChild(el(`<div class="ov-kpis">
      <div class="ov-kpi"><div class="kl">${t("ovKIssued")}</div><div class="kv">${fmtEur(issuedTotal)}</div><div class="km">${issued.length} dokumentov</div></div>
      <div class="ov-kpi"><div class="kl">${t("ovKPaid")}</div><div class="kv" style="color:#047857">${fmtEur(paidTotal)}</div><div class="km">${paid.length} plačanih</div></div>
      <div class="ov-kpi"><div class="kl">${t("ovKUnpaid")}</div><div class="kv" style="color:#c23b3b">${fmtEur(unpaidTotal)}</div><div class="km">${overdue.length} zapadlih</div></div>
      <div class="ov-kpi"><div class="kl">${t("ovKAvg")}</div><div class="kv">${fmtEur(avg)}</div><div class="km">${paidTotal && issuedTotal ? Math.round((paidTotal/issuedTotal)*100) + "% pobrano" : "—"}</div></div>
    </div>`));
    w.appendChild(el(`<div class="ov-kpis" style="margin-top:8px;">
      <div class="ov-kpi"><div class="kl">${t("ovKDue")}</div><div class="kv">${fmtEur(overdueCents)}</div><div class="km">${overdue.length} računov</div></div>
      <div class="ov-kpi"><div class="kl">${t("ovKDisc")}</div><div class="kv">€0</div><div class="km">0</div></div>
      <div class="ov-kpi"><div class="kl">${t("ovKQuotes")}</div><div class="kv">${drafts}</div><div class="km">čaka na izdajo</div></div>
      <div class="ov-kpi"><div class="kl">${t("ovKCancel")}</div><div class="kv">${cancelled}</div><div class="km">stornirano</div></div>
    </div>`));

    // monthly bars — fake data for last 12 months, current highlighted
    const months = ["sep","okt","nov","dec","jan","feb","mar","apr","maj","jun","jul","avg"];
    const vals = [2840, 3100, 2980, 1850, 3120, 3450, 2980, 3210, 2950, 2780, 3450, 3120];
    const best = Math.max(...vals);
    const chart = el(`<div class="ov-chart"><h4>${t("ovMonth")}</h4><div class="bars"></div></div>`);
    vals.forEach((v, i) => {
      const col = el(`<div class="bar-col">
        <div class="bar-v">${v === best ? "€" + v.toLocaleString("sl-SI") : ""}</div>
        <div class="bar ${v === best ? "best" : ""}" style="height:${(v/best)*100}px"></div>
        <div class="bar-l">${months[i]}</div>
      </div>`);
      chart.querySelector(".bars").appendChild(col);
    });
    w.appendChild(chart);

    // payment methods
    const methods = { cash: 0, card: 0, transfer: 0, insurance: 0 };
    state.invoices.filter(i => i.status === "paid").forEach(i => { if (i.method) methods[i.method] = (methods[i.method]||0) + i.totalCents; });
    const tot = Object.values(methods).reduce((a,b)=>a+b,0) || 1;
    const pmChart = el(`<div class="ov-chart"><h4>${t("ovMethod")}</h4><div class="pm-bars">
      <div class="pm-bar cash" style="flex:${methods.cash/tot}">gotovina ${Math.round((methods.cash/tot)*100)}%</div>
      <div class="pm-bar card" style="flex:${methods.card/tot}">kartica ${Math.round((methods.card/tot)*100)}%</div>
      <div class="pm-bar transfer" style="flex:${methods.transfer/tot}">nakazilo ${Math.round((methods.transfer/tot)*100)}%</div>
      <div class="pm-bar ins" style="flex:${(methods.insurance||0)/tot}">zavarovanje ${Math.round(((methods.insurance||0)/tot)*100)}%</div>
    </div><div class="pm-labels"><span>gotovina ${fmtEur(methods.cash||0)}</span><span>kartica ${fmtEur(methods.card||0)}</span><span>nakazilo ${fmtEur(methods.transfer||0)}</span></div></div>`);
    w.appendChild(pmChart);

    // top services & patients
    const svcCount = {};
    state.invoices.filter(i=>i.status === "paid").forEach(i => i.lines.forEach(l => {
      const name = l.name.split("·")[0].trim();
      svcCount[name] = (svcCount[name]||0) + l.cents;
    }));
    const svcList = Object.entries(svcCount).sort((a,b)=>b[1]-a[1]).slice(0,4);
    const patCount = {};
    state.invoices.filter(i=>i.status==="paid").forEach(i => { patCount[i.partyName] = (patCount[i.partyName]||0) + i.totalCents; });
    const patList = Object.entries(patCount).sort((a,b)=>b[1]-a[1]).slice(0,4);

    const dual = el(`<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:10px;">
      <div class="ov-chart"><h4>${t("ovTopSvc")}</h4>${svcList.map(([n,c]) => `<div class="file-row"><span class="fn">${n}</span><span></span><b class="lt">${fmtEur(c)}</b><span></span></div>`).join("")}</div>
      <div class="ov-chart"><h4>${t("ovTopPat")}</h4>${patList.map(([n,c]) => `<div class="file-row"><span class="fn">${n}</span><span></span><b class="lt">${fmtEur(c)}</b><span></span></div>`).join("")}</div>
    </div>`);
    w.appendChild(dual);

    // open receivables
    const owed = state.invoices.filter(i => i.status !== "paid" && i.status !== "draft" && i.status !== "cancelled").sort((a,b) => a.dueAt.localeCompare(b.dueAt));
    if (owed.length) {
      const wEl = el(`<div class="ov-chart" style="margin-top:10px;"><h4>${t("ovOwed")}</h4></div>`);
      owed.forEach(o => {
        wEl.appendChild(el(`<div class="file-row"><span class="fn">${o.number} · ${o.partyName}</span><span class="fd">${o.dueAt}</span><b class="lt">${fmtEur(o.totalCents - (o.paidCents||0))}</b><span></span></div>`));
      });
      w.appendChild(wEl);
    }

    return w;
  }

  // --- template editor ---
  function renderTemplate() {
    const w = el(`<div class="tpl-wrap"></div>`);
    const tpl = state.template;
    const form = el(`<div class="tpl-form">
      <div class="tpl-field"><label>${t("tplIntro")}</label><input type="text" id="tplIntro" value="${tpl.introText}"/></div>
      <div class="tpl-field"><label>${t("tplFooter")}</label><input type="text" id="tplFoot" value="${tpl.footNote}"/></div>
      <div class="tpl-field"><label>${t("tplColor")}</label><div class="tpl-colors">
        ${["#3a5589","#0d9488","#b91c1c","#b45309","#4f46e5","#1d4ed8","#1e2430"].map(c => `<div class="csw ${c === tpl.accentColor ? "on" : ""}" data-c="${c}" style="background:${c}"></div>`).join("")}
        <input class="chex" id="tplHex" type="text" value="${tpl.accentColor}"/>
      </div></div>
      <div class="tpl-field"><label>${t("tplHeadSize")}: <span id="hsv">${tpl.headingSize} pt</span></label><input type="range" min="14" max="34" value="${tpl.headingSize}" id="tplHs"/></div>
      <div class="tpl-field"><label>${t("tplBodySize")}: <span id="bsv">${tpl.bodySize} pt</span></label><input type="range" min="8" max="14" value="${tpl.bodySize}" id="tplBs"/></div>
      <div class="tpl-toggles">
        <label class="tt"><input type="checkbox" id="tplPay" ${tpl.showPaymentBlock?"checked":""}/> ${t("tplPayBlock")}</label>
        <label class="tt"><input type="checkbox" id="tplLeg" ${tpl.showLegalFooter?"checked":""}/> ${t("tplLegalFoot")}</label>
        <label class="tt"><input type="checkbox" id="tplFur" ${tpl.showFURS?"checked":""}/> ${t("tplFursNote")}</label>
        <label class="tt"><input type="checkbox" id="tplDrf" ${tpl.showDraftMark?"checked":""}/> ${t("tplDraftMark")}</label>
        <label class="tt"><input type="checkbox" id="tplUnt" ${tpl.showUnit?"checked":""}/> ${t("tplUnitCol")}</label>
      </div>
      <div style="display:flex; gap:6px;">
        <button class="dbtn" id="tplSave">${t("tplSave")}</button>
        <button class="dbtn ghost" id="tplReset">${t("tplReset")}</button>
      </div>
    </div>`);

    const preview = el(`<div class="tpl-preview" id="tplPrev"></div>`);
    const renderPrev = () => {
      const ac = tpl.accentColor;
      preview.innerHTML = `
        <div class="ph" style="border-bottom: 2px solid ${ac}; padding-bottom: 8px;">
          <div class="brand"><div class="brand-lg" style="background:${ac}"></div><div class="brand-t"><div class="bt">${state.clinic.name}</div><div class="bs">${state.clinic.address}</div></div></div>
          <div class="meta">26-0123<br/>1. 9. 2026<br/>Rok: 15. 9. 2026</div>
        </div>
        <div class="intro" style="font-size:${tpl.bodySize+1}px">${tpl.introText}</div>
        <div class="lines">
          <div class="line lh" style="font-size:${tpl.bodySize}px"><span>Storitev</span>${tpl.showUnit?'<span style="text-align:center">Enota</span>':''}<span style="text-align:right">Cena</span><span style="text-align:right">Skupaj</span></div>
          <div class="line" style="font-size:${tpl.bodySize}px"><span>Pregled + RTG</span>${tpl.showUnit?'<span style="text-align:center">kos</span>':''}<span style="text-align:right">30,00 €</span><span style="text-align:right">30,00 €</span></div>
          <div class="line" style="font-size:${tpl.bodySize}px"><span>Higiena</span>${tpl.showUnit?'<span style="text-align:center">kos</span>':''}<span style="text-align:right">55,00 €</span><span style="text-align:right">55,00 €</span></div>
          <div class="line" style="font-size:${tpl.bodySize}px"><span>RTG</span>${tpl.showUnit?'<span style="text-align:center">kos</span>':''}<span style="text-align:right">35,00 €</span><span style="text-align:right">35,00 €</span></div>
        </div>
        <div class="tot" style="color:${ac}">Za plačilo: 120,00 €</div>
        ${tpl.showPaymentBlock ? `<div class="paymeta" style="border-top:1px solid ${ac}22; margin-top:14px; padding-top:8px;">TRR: ${state.clinic.iban}<br/>Sklic: 26-0001<br/>Banka: ${state.clinic.bank}</div>` : ``}
        ${tpl.showLegalFooter ? `<div class="paymeta">${state.clinic.name} · ${state.clinic.issuer} · davčna ${state.clinic.tax} · matična ${state.clinic.matična}</div>` : ``}
        ${tpl.showFURS ? `<div class="paymeta" style="color:#b45309">Blagajniški račun izdan preko davčne blagajne FURS.</div>` : ``}
        ${tpl.showDraftMark ? `<div class="paymeta" style="color:#b45309">PREDRAČUN — ni davčni dokument.</div>` : ``}
        <div style="font-size:11px; text-align:right; margin-top:10px; color:#6b7285;">${tpl.footNote}</div>
      `;
    };

    form.querySelector("#tplIntro").addEventListener("input", (e) => { tpl.introText = e.target.value; renderPrev(); });
    form.querySelector("#tplFoot").addEventListener("input", (e) => { tpl.footNote = e.target.value; renderPrev(); });
    form.querySelector("#tplHex").addEventListener("input", (e) => { const v = e.target.value.trim(); if (/^#?[0-9a-f]{6}$/i.test(v.replace(/^#?/, ""))) { tpl.accentColor = v.startsWith("#") ? v : "#" + v; form.querySelectorAll(".csw").forEach(s=>s.classList.toggle("on", s.dataset.c === v.replace(/^#?/, "#").toLowerCase())); renderPrev(); }});
    form.querySelectorAll(".csw").forEach(s => s.addEventListener("click", () => { tpl.accentColor = s.dataset.c; form.querySelectorAll(".csw").forEach(x=>x.classList.toggle("on", x.dataset.c === tpl.accentColor)); form.querySelector("#tplHex").value = tpl.accentColor; renderPrev(); }));
    form.querySelector("#tplHs").addEventListener("input", (e) => { tpl.headingSize = +e.target.value; form.querySelector("#hsv").textContent = e.target.value + " pt"; renderPrev(); });
    form.querySelector("#tplBs").addEventListener("input", (e) => { tpl.bodySize = +e.target.value; form.querySelector("#bsv").textContent = e.target.value + " pt"; renderPrev(); });
    [["tplPay","showPaymentBlock"],["tplLeg","showLegalFooter"],["tplFur","showFURS"],["tplDrf","showDraftMark"],["tplUnt","showUnit"]].forEach(([id,key]) => {
      form.querySelector("#"+id).addEventListener("change", (e) => { tpl[key] = e.target.checked; renderPrev(); });
    });
    form.querySelector("#tplSave").addEventListener("click", () => toast(t("toastSaved")));
    form.querySelector("#tplReset").addEventListener("click", () => { tpl.accentColor = "#3a5589"; tpl.headingSize = 24; tpl.bodySize = 10; tpl.introText = "Zahvaljujemo se vam za zaupanje."; tpl.footNote = "Sklic: 26-0001 · IBAN: SI56 0201 0000 1234 567"; render(); });

    renderPrev();
    w.appendChild(form);
    w.appendChild(preview);
    return w;
  }

  // ---------- Kolektiv ----------
  function renderKolektiv() {
    const wrap = el(`<div></div>`);
    const weekStart = addDays(mondayOf(nowD()), state.kolWeekOffset * 7);
    const days = Array.from({length:7}, (_,i) => addDays(weekStart, i));
    const todayIsoStr = iso(nowD());
    const isCurrentWeek = iso(days[0]) <= todayIsoStr && todayIsoStr <= iso(days[6]);

    wrap.appendChild(el(`<div class="kol-week">
      <div class="wk">
        <button data-wk="-1">‹</button>
        <button ${isCurrentWeek ? "disabled" : ""} data-wk="0">${t("kolWkDanes")}</button>
        <button data-wk="1">›</button>
      </div>
      <span class="wkl">${iso(days[0])} → ${iso(days[6])}</span>
      <span class="tot">${state.team.filter(m=>m.active).length} aktivni · ${totalWeekMinutes()}h ${fmtWeekMinutes()}</span>
    </div>`));

    wrap.querySelectorAll("[data-wk]").forEach(b => b.addEventListener("click", () => {
      if (b.dataset.wk === "0") state.kolWeekOffset = 0;
      else state.kolWeekOffset += (+b.dataset.wk);
      render();
    }));
    function totalWeekMinutes() { return state.shifts.reduce((s,x)=>s+(x.endMin-x.startMin-x.breakMin),0); }
    function fmtWeekMinutes() { const total=totalWeekMinutes(); const net=total; return `brutto · ${Math.round(net*0.92)}h neto`; }

    // grid
    const grid = el(`<div class="kol-grid"></div>`);
    const hdr = el(`<div class="kol-h"><div>${t("kolMember")}</div></div>`);
    days.forEach((d, i) => {
      const isToday = iso(d) === todayIsoStr;
      const dow = ["Pon","Tor","Sre","Čet","Pet","Sob","Ned"][i];
      hdr.appendChild(el(`<div class="${isToday?"today":""}">${dow}<div style="font-size:9px; font-weight:500; margin-top:1px;">${d.getDate()}.${d.getMonth()+1}.</div></div>`));
    });
    grid.appendChild(hdr);

    state.team.filter(m => m.active).forEach(m => {
      const r = el(`<div class="kol-r"><div class="kol-member"><b>${m.name.split(" ")[0]}</b><span class="mr">${roleLabel(m.role)}</span><span class="mh">${memberWeekHours(m.id)}h</span></div></div>`);
      days.forEach((d, i) => {
        const dateStr = iso(d);
        const off = state.timeOff.find(t => t.memberId === m.id && dateStr >= t.startDate && dateStr <= t.endDate);
        const cell = el(`<div class="kol-cell ${i===6?"last":""} ${iso(d)===todayIsoStr?"today-bg":""}" data-mid="${m.id}" data-date="${dateStr}"></div>`);
        if (off) {
          cell.appendChild(el(`<div class="timeoff-chip ${off.kind}">${off.label}</div>`));
        } else {
          const rows = state.shifts.filter(s => s.memberId === m.id && s.date === dateStr);
          if (!rows.length) {
            cell.appendChild(el(`<span class="add">${t("uCreate")}</span>`));
          } else {
            rows.forEach(sh => {
              const netMin = sh.endMin - sh.startMin - sh.breakMin;
              const hh = minToTime(sh.startMin); const ee = minToTime(sh.endMin);
              const chip = el(`<div class="shift-chip">${hh}–${ee} <span class="sn">${sh.breakMin ? `odmor ${sh.breakMin}'` : ""} · ${Math.floor(netMin/60)}h ${(netMin%60)?(netMin%60)+"m":""} neto</span></div>`);
              cell.appendChild(chip);
            });
          }
        }
        cell.addEventListener("click", () => {
          if (off) {
            state.timeOff = state.timeOff.filter((t) => t !== off);
            toast(t("toastDel")); render(); return;
          }
          const existing = state.shifts.filter((s) => s.memberId === m.id && s.date === dateStr);
          if (!existing.length) {
            state.shifts.push({ memberId: m.id, date: dateStr, startMin: 8*60, endMin: 14*60, breakMin: 30 });
            toast(t("toastAdd"));
          } else {
            state.shifts = state.shifts.filter((s) => !existing.includes(s));
            toast(t("toastDel"));
          }
          render();
        });
        r.appendChild(cell);
      });
      grid.appendChild(r);
    });
    wrap.appendChild(grid);

    // footer
    const brutto = totalWeekMinutes();
    const netto = Math.round(brutto * 0.92);
    wrap.appendChild(el(`<div class="kol-foot">
      <span>Ta teden<br/><b>pon ${iso(days[0])} – ned ${iso(days[6])}</b></span>
      <span><b>${fmtTotal(brutto)}</b> brutto · <b>${fmtTotal(netto)}</b> neto · <b>${state.team.filter(m=>m.active).length}</b> aktivni</span>
    </div>`));

    return wrap;

    function memberWeekHours(mid) {
      const total = state.shifts.filter(s => s.memberId === mid).reduce((sum,s)=>sum+(s.endMin-s.startMin-s.breakMin),0);
      return Math.round(total/60);
    }
    function fmtTotal(m) { const h=Math.floor(m/60); const mn=m%60; return mn===0?`${h}h`:`${h}h ${mn}m`; }
  }

  // ---------- Nastavitve ----------
  function renderNastavitve() {
    const wrap = el(`<div></div>`);
    wrap.appendChild(el(`<div>
      <div class="dgreet" style="font-size:19px;">${t("setTitle")}</div>
      <div class="ddate">${t("setSubtitle")}</div>
    </div>`));

    const wrapRow = el(`<div class="set-wrap"></div>`);

    const form = el(`<div class="dcard set-form">
      <div class="set-row">
        <label>Ime ordinacije<input id="fName" value="${state.clinic.name}"/></label>
        <label>Zastopnik<input id="fIssuer" value="${state.clinic.issuer}"/></label>
      </div>
      <div class="set-row">
        <label>Naslov<input id="fAddr" value="${state.clinic.address}"/></label>
        <label>Telefon<input id="fPhone" value="+386 41 111 222"/></label>
      </div>
      <div class="set-row">
        <label>Davčna<input id="fTax" value="${state.clinic.tax}"/></label>
        <label>Matična<input id="fMatična" value="${state.clinic.matična}"/></label>
      </div>
      <div class="set-row">
        <label>IBAN<input id="fIban" value="${state.clinic.iban}"/></label>
        <label>Banka<input id="fBank" value="${state.clinic.bank}"/></label>
      </div>
      <label class="set-toggle"><input type="checkbox" id="fVat" ${state.clinic.vat?"checked":""}/> Zavezanec za DDV · 22%</label>
      <div class="set-actions">
        <button class="dbtn" id="saveBtn">${t("setSave")}</button>
        <button class="dbtn ghost" id="offlineToggle">${t("setOffline")}</button>
      </div>
    </div>`);
    wrapRow.appendChild(form);

    // right column
    const side = el(`<div class="set-side"></div>`);
    const svcList = el(`<div class="dcard"><h4>${t("setSvcT")}</h4></div>`);
    state.services.forEach(s => {
      svcList.appendChild(el(`<div class="svc-row"><b>${s.name}</b><span>${s.price} €</span><span class="dur">${s.durMin} min</span></div>`));
    });
    side.appendChild(svcList);

    const backup = el(`<div class="dcard"><h4>${t("setBackupT")}</h4>
      <div style="font-size:11px; color:#6b7285; margin-bottom:6px;">Zadnja: ${iso(nowD())} · 4,1 MB</div>
      <div style="display:flex; gap:4px;">
        <button class="dbtn tiny green" id="bkp">${t("setBackup")}</button>
        <button class="dbtn tiny ghost" id="rst">${t("setRestore")}</button>
      </div>
    </div>`);
    backup.querySelector("#bkp").addEventListener("click", () => {
      const payload = { clinic: state.clinic, appointmentCount: state.appointments.length, patientCount: state.patients.length, exportedAt: new Date().toISOString() };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "hermes-backup-" + iso(nowD()) + ".json"; a.click();
      URL.revokeObjectURL(url);
      toast("Varnostna kopija prenesena.");
    });
    backup.querySelector("#rst").addEventListener("click", () => toast("V produkciji: naloži .db datoteko."));
    side.appendChild(backup);

    const staff = el(`<div class="dcard"><h4>Osebje</h4></div>`);
    state.team.filter(m=>m.active).forEach(m => {
      staff.appendChild(el(`<div class="svc-row"><b>${m.name}</b><span>${roleLabel(m.role)}</span><span class="dur">${m.phone}</span></div>`));
    });
    side.appendChild(staff);

    wrapRow.appendChild(side);
    wrap.appendChild(wrapRow);

    // wire form
    form.querySelector("#saveBtn").addEventListener("click", () => {
      state.clinic.name = form.querySelector("#fName").value;
      state.clinic.issuer = form.querySelector("#fIssuer").value;
      state.clinic.address = form.querySelector("#fAddr").value;
      state.clinic.tax = form.querySelector("#fTax").value;
      state.clinic.matična = form.querySelector("#fMatična").value;
      state.clinic.iban = form.querySelector("#fIban").value;
      state.clinic.bank = form.querySelector("#fBank").value;
      state.clinic.vat = form.querySelector("#fVat").checked;
      toast(t("setSaveOk"));
    });
    form.querySelector("#offlineToggle").addEventListener("click", () => { state.online = !state.online; render(); });

    return wrap;
  }


  // ---------- wiring ----------
  document.querySelectorAll(".dtab").forEach(b => b.addEventListener("click", () => { state.tab = b.dataset.tab; render(); }));
  const lo = document.getElementById("logoutBtn");
  if (lo) lo.addEventListener("click", () => toast("Odjava (demo· seja ostane)."));
  const rs = document.getElementById("resetBtn");
  if (rs) rs.addEventListener("click", () => { location.reload(); });

  // Re-render demo when language changes
  document.getElementById("langBtn").addEventListener("click", () => setTimeout(render, 0));

  seedShifts();
  render();
})();
