(() => {
  'use strict';
  const root = document.getElementById('apollo-workbench');
  if (!root) return;
  // Everything below is an in-memory illustration. No uploads, fetches, model calls,
  // persistent records, or application settings are involved.
  let language = document.documentElement.lang === 'sl' ? 'sl' : 'en';
  const state = {
    tool: 'lab', example: 'dental',
    mode: 'local', node: 'app',
    costs: { people: '5', repeats: '1', minutes: '15', days: '20', reduction: '40', rate: '20' }
  };
  const tr = (en, sl) => language === 'sl' ? sl : en;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const pair = values => values[language === 'sl' ? 1 : 0];
  const number = value => new Intl.NumberFormat(language === 'sl' ? 'sl-SI' : 'en-GB', { maximumFractionDigits: 1 }).format(value);

  const examples = {
    dental: {
      name: ['Dental clinic', 'Zobozdravstvena ordinacija'],
      heading: ['Find a gap without stopping the team.', 'Poiščite prost termin brez prekinjanja ekipe.'],
      moment: ['Between appointments', 'Med obravnavami'],
      before: ['Someone needs an appointment. You are already with a patient. Finding a time should not mean another phone call to reception.', 'Nekdo potrebuje termin, vi pa ste že pri pacientu. Iskanje termina naj ne pomeni še enega klica na recepcijo.'],
      question: ['Do we have 30 minutes free tomorrow morning?', 'Imamo jutri dopoldne prostih 30 minut?'],
      answer: ['There are two gaps in the sample diary:', 'V vzorčnem urniku sta dva prosta termina:'],
      lines: [['09:30–10:00 · Room 1', '09:30–10:00 · Ordinacija 1'], ['11:00–11:30 · Room 1', '11:00–11:30 · Ordinacija 1']],
      closing: ['Both fit 30 minutes. Nothing has been booked.', 'Oba ustrezata 30 minutam. Nič še ni rezervirano.'],
      source: ['Appointment diary', 'Urnik terminov'],
      benefit: ['Less searching. Fewer interruptions.', 'Manj iskanja. Manj prekinitev.'],
      detail: ['Get the available options in one place, then decide what works for the patient and the team.', 'Proste možnosti dobite na enem mestu, nato izberete tisto, ki ustreza pacientu in ekipi.']
    },
    beauty: {
      name: ['Beauty clinic', 'Kozmetični salon'],
      heading: ['Know what is left before you close.', 'Pred zaprtjem veste, kaj še čaka.'],
      moment: ['At the end of the day', 'Ob koncu dneva'],
      before: ['After a full day of appointments, the little things are easy to lose track of. You should not have to keep every reminder in your head.', 'Po celem dnevu obravnav hitro izgubite pregled nad malenkostmi. Ni treba, da vsak opomnik nosite v glavi.'],
      question: ['What still needs doing before we close?', 'Kaj moramo še urediti pred zaprtjem?'],
      answer: ['Two things are still open in the sample task list:', 'Na vzorčnem seznamu sta še dve odprti nalogi:'],
      lines: [['Confirm tomorrow’s 14:00 appointment.', 'Potrdite jutrišnji termin ob 14.00.'], ['Check the stock of disposable gloves.', 'Preverite zalogo rokavic za enkratno uporabo.']],
      closing: ['The other tasks on this list are marked complete.', 'Ostale naloge na tem seznamu so označene kot opravljene.'],
      source: ['Daily task list', 'Dnevni seznam nalog'],
      benefit: ['A clearer finish to the day.', 'Bolj miren zaključek dneva.'],
      detail: ['See the outstanding tasks together, so the next shift has a clear starting point.', 'Odprte naloge vidite skupaj, da naslednja izmena ve, kje začeti.']
    },
    phone: {
      name: ['Away from work', 'Zunaj delovnega mesta'],
      heading: ['A work question? Just send a message.', 'Vprašanje o delu? Pošljite sporočilo.'],
      moment: ['From your phone', 'S telefona'],
      before: ['You are away from the clinic and need one detail for tomorrow. Ask your assistant instead of opening a laptop or interrupting a colleague.', 'Niste v ordinaciji ali salonu, za jutri pa potrebujete eno informacijo. Vprašajte pomočnika, namesto da odpirate računalnik ali prekinjate sodelavca.'],
      question: ['When is my first appointment tomorrow, and is anything still unconfirmed?', 'Kdaj imam jutri prvi termin in ali kateri še ni potrjen?'],
      answer: ['Your sample diary starts at 08:30.', 'Vaš vzorčni urnik se začne ob 8.30.'],
      lines: [['08:30 · First appointment · Confirmed', '08:30 · Prvi termin · Potrjen'], ['14:00 · Still awaiting confirmation', '14:00 · Še čaka na potrditev']],
      closing: ['I have not sent any reminders or changed the diary.', 'Nisem poslal opomnikov ali spreminjal urnika.'],
      source: ['Appointment diary', 'Urnik terminov'],
      benefit: ['The answer you need. Then back to your day.', 'Odgovor, ki ga potrebujete. Nato nazaj k svojemu dnevu.'],
      detail: ['Phone access is set up around your team’s permissions. The work computer needs to be available for the assistant to answer.', 'Dostop s telefona uredimo glede na dovoljenja vaše ekipe. Delovni računalnik mora biti na voljo, da pomočnik lahko odgovori.']
    }
  };


  function conversation(item) {
    const away = state.example === 'phone';
    const messages = '<div class="example-messages"><div class="message-question"><span class="message-label">' + tr('You', 'Vi') + '</span><p>' + escape(pair(item.question)) + '</p></div><div class="message-answer"><span class="message-label">Apollo</span><p>' + escape(pair(item.answer)) + '</p><ul>' + item.lines.map(line => '<li>' + escape(pair(line)) + '</li>').join('') + '</ul><p>' + escape(pair(item.closing)) + '</p><span class="message-source">' + tr('Checked: ', 'Preverjeno: ') + escape(pair(item.source)) + '</span></div></div>';
    if (away) {
      return '<div class="remote-example"><p class="example-location">' + tr('ON YOUR PHONE', 'NA VAŠEM TELEFONU') + '</p><div class="phone-example"><div class="phone-status" aria-hidden="true"><span>18:42</span><span class="phone-speaker"></span><span>▮▮▮ ▰</span></div><div class="conversation-top"><span class="phone-back" aria-hidden="true">‹</span><span class="phone-avatar" aria-hidden="true">A</span><div><strong>Apollo</strong><span>' + tr('Work assistant · message example', 'Pomočnik pri delu · primer sporočila') + '</span></div></div><p class="message-time">' + tr('Today · 18:42', 'Danes · 18:42') + '</p>' + messages + '<div class="phone-composer" aria-hidden="true"><span>+</span><span>' + tr('Message Apollo…', 'Sporočilo za Apollo…') + '</span><span>↑</span></div><div class="phone-home" aria-hidden="true"></div></div><p class="example-caption">' + tr('One message, wherever you are.', 'Eno sporočilo, kjerkoli ste.') + '</p></div>';
    }
    const dental = state.example === 'dental';
    return '<div class="clinic-example"><div class="clinic-window"><span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>' + (dental ? tr('Dental workspace', 'Delovno okolje ordinacije') : tr('Beauty workspace', 'Delovno okolje salona')) + '</span><span class="clinic-sample">' + tr('Example', 'Primer') + '</span></div><div class="clinic-nav" aria-hidden="true"><span>' + tr('Diary', 'Urnik') + '</span><span>' + tr('Tasks', 'Naloge') + '</span><span class="is-active">' + tr('Assistant', 'Pomočnik') + '</span></div><div class="clinic-context"><span>' + escape(pair(item.source)) + '</span><strong>' + (dental ? tr('Tomorrow · 2 available slots', 'Jutri · 2 prosta termina') : tr('Today · 2 tasks left', 'Danes · še 2 nalogi')) + '</strong></div><div class="conversation-top"><span class="phone-avatar" aria-hidden="true">A</span><div><strong>' + tr('Apollo assistant', 'Pomočnik Apollo') + '</strong><span>' + tr('Inside your clinic software', 'V programu vaše ordinacije ali salona') + '</span></div></div>' + messages + '<div class="clinic-footer">' + tr('Your diary, tasks, and assistant in one place.', 'Urnik, naloge in pomočnik na enem mestu.') + '</div></div>';
  }

  function lab() {
    const item = examples[state.example];
    return '<div class="workbench-intro"><div><p class="eyebrow">' + tr('Small moments. Less extra work.', 'Majhni trenutki. Manj dodatnega dela.') + '</p><h3>' + tr('What could you ask your assistant?', 'Kaj bi vprašali svojega pomočnika?') + '</h3></div><span class="demo-label">' + tr('Illustrative conversations', 'Ponazoritve pogovorov') + '</span></div>' +
      '<div class="day-cases" role="group" aria-label="' + tr('Choose an everyday example', 'Izberite primer iz vsakdana') + '">' + Object.entries(examples).map(([key, value]) => '<button type="button" data-example="' + key + '" aria-pressed="' + (key === state.example) + '" aria-controls="day-example">' + escape(pair(value.name)) + '</button>').join('') + '</div>' +
      '<div id="day-example" class="day-layout" aria-live="polite" aria-atomic="true"><div class="day-story"><p class="eyebrow">' + escape(pair(item.moment)) + '</p><h4>' + escape(pair(item.heading)) + '</h4><p>' + escape(pair(item.before)) + '</p><div class="day-benefit"><span aria-hidden="true">↗</span><div><strong>' + escape(pair(item.benefit)) + '</strong><p>' + escape(pair(item.detail)) + '</p></div></div></div>' +
      conversation(item) + '</div>' +
      '<p class="workbench-note">' + tr('These are made-up conversations to show the idea. This page does not connect to a clinic, send messages, or change appointments. Available features depend on the software and connections we set up with you.', 'To so izmišljeni pogovori za ponazoritev ideje. Stran se ne povezuje z ordinacijo ali salonom, ne pošilja sporočil in ne spreminja terminov. Razpoložljive funkcije so odvisne od programa in povezav, ki jih uredimo z vami.') + '</p>';
  }
  const fields = [
    ['people', ['People doing the task', 'Osebe, ki opravljajo nalogo'], 1, 1000, 1],
    ['repeats', ['Times per person / day', 'Ponovitve na osebo / dan'], 0, 100, 1],
    ['minutes', ['Minutes each time', 'Minute na ponovitev'], 0, 240, 0.5],
    ['days', ['Working days / month', 'Delovni dnevi / mesec'], 1, 31, 1],
    ['rate', ['Hourly cost in EUR (optional)', 'Urni strošek v EUR (neobvezno)'], 0, 1000, 0.5]
  ];
  function calculator() {
    return '<div class="workbench-intro"><div><p class="eyebrow">' + tr('Make the workload visible', 'Prikažite obseg dela') + '</p><h3>' + tr('A few minutes a day add up.', 'Nekaj minut na dan se nabere.') + '</h3></div><span class="demo-label">' + tr('Your assumptions · your estimate', 'Vaše predpostavke · vaša ocena') + '</span></div>' +
      '<div class="calculator-layout"><div><fieldset class="calculator-fields"><legend class="sr-only">' + tr('Workload assumptions', 'Predpostavke o obsegu dela') + '</legend>' + fields.map(([key, label, min, max, step]) => '<div class="calculator-field"><label for="calc-' + key + '">' + escape(pair(label)) + '</label><input id="calc-' + key + '" data-cost="' + key + '" type="number" min="' + min + '" max="' + max + '" step="' + step + '" inputmode="decimal" value="' + escape(state.costs[key]) + '"' + (key !== 'rate' ? ' required' : '') + ' aria-describedby="calc-error"/></div>').join('') + '</fieldset>' +
      '<div class="reduction-field"><label for="calc-reduction">' + tr('Assumed time reduction', 'Predpostavljeno zmanjšanje časa') + ' <output id="reduction-value" for="calc-reduction"></output></label><input id="calc-reduction" data-cost="reduction" type="range" min="0" max="100" step="5" value="' + escape(state.costs.reduction) + '"/><p>' + tr('Adjust this assumption. It is not a measured Apollo result.', 'Prilagodite predpostavko. To ni izmerjen rezultat Apolla.') + '</p></div><p id="calc-error" class="calculator-error" role="status"></p></div>' +
      '<div class="calculator-result" aria-live="polite" aria-atomic="true"><p class="eyebrow">' + tr('Potential time freed / month', 'Možni sproščeni čas / mesec') + '</p><p class="result-main"><strong id="calc-freed">—</strong><span>' + tr('hours', 'ur') + '</span></p><div class="capacity-bar" aria-hidden="true"><span id="capacity-fill"></span></div><dl><div><dt>' + tr('Time back each day, across the team', 'Pridobljeni čas na dan za celotno ekipo') + '</dt><dd id="calc-daily">—</dd></div><div><dt>' + tr('Current workload', 'Trenutni obseg dela') + '</dt><dd id="calc-total">—</dd></div><div><dt>' + tr('Remaining workload', 'Preostali obseg dela') + '</dt><dd id="calc-remaining">—</dd></div><div><dt>' + tr('Value of freed capacity', 'Vrednost sproščene zmogljivosti') + '</dt><dd id="calc-value">—</dd></div></dl><p class="result-caveat">' + tr('Capacity value is not cash saved or a net return. Software, setup, AI usage, and ongoing review costs are not included.', 'Vrednost zmogljivosti ni denarni prihranek ali neto donos. Stroški programa, uvedbe, uporabe AI in nadaljnjega pregleda niso vključeni.') + '</p></div></div>' +
      '<details class="calculation-details"><summary>' + tr('See the calculation', 'Poglejte izračun') + '</summary><p id="calc-formula"></p><p>' + tr('Time freed = current hours × assumed reduction. Capacity value = time freed × hourly cost. Start with one task to avoid counting the same time twice.', 'Sproščeni čas = trenutne ure × predpostavljeno zmanjšanje. Vrednost zmogljivosti = sproščeni čas × urni strošek. Začnite z eno nalogo, da istega časa ne štejete dvakrat.') + '</p></details><div class="calculator-footer"><button type="button" class="workbench-quiet" data-action="reset-calculator">' + tr('Restore example values', 'Obnovi vzorčne vrednosti') + '</button><a class="text-link" href="hermes/pricing.html?lang=' + language + '">' + tr('Monthly plans · pricing on request ↗', 'Mesečni paketi · cena po povpraševanju ↗') + '</a></div>';
  }

  function updateCalculation() {
    const reduction = Number(state.costs.reduction);
    root.querySelector('#reduction-value').textContent = number(reduction) + ' %';
    const controls = [...root.querySelectorAll('[data-cost]')];
    let invalid = false;
    controls.forEach(input => {
      const bad = !input.checkValidity();
      input.setAttribute('aria-invalid', String(bad));
      invalid ||= bad;
    });
    const message = root.querySelector('#calc-error');
    message.textContent = invalid ? fields.filter(([key]) => !root.querySelector('#calc-' + key).checkValidity()).map(([, label, min, max, step]) => pair(label) + ': ' + number(min) + '–' + number(max) + tr(', increments of ', ', korak ') + number(step) + '.').join(' ') : '';
    const ids = ['calc-daily', 'calc-freed', 'calc-total', 'calc-remaining', 'calc-value'];
    if (invalid) {
      ids.forEach(id => { root.querySelector('#' + id).textContent = '—'; });
      root.querySelector('#capacity-fill').style.width = '0%';
      root.querySelector('#calc-formula').textContent = tr('Complete the assumptions to see the calculation.', 'Za izračun izpolnite predpostavke.');
      return;
    }
    const { people, repeats, minutes, days, rate } = state.costs;
    const total = Number(people) * Number(repeats) * Number(minutes) * Number(days) / 60;
    const freed = total * reduction / 100;
    root.querySelector('#calc-daily').textContent = number(freed / Number(days) * 60) + ' min';
    root.querySelector('#calc-freed').textContent = number(freed);
    root.querySelector('#calc-total').textContent = number(total) + ' h';
    root.querySelector('#calc-remaining').textContent = number(total - freed) + ' h';
    root.querySelector('#calc-value').textContent = rate === '' ? tr('Add an hourly cost', 'Dodajte urni strošek') : new Intl.NumberFormat(language === 'sl' ? 'sl-SI' : 'en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(freed * Number(rate));
    root.querySelector('#capacity-fill').style.width = (total ? reduction : 0) + '%';
    root.querySelector('#calc-formula').textContent = [people, repeats, minutes, days].map(Number).map(number).join(' × ') + ' ÷ 60 = ' + number(total) + tr(' hours per month.', ' ur na mesec.');
  }

  function dataGuide() {
    const local = state.mode === 'local';
    const nodes = {
      files: {
        label: tr('Your files', 'Vaše datoteke'), symbol: '01',
        title: tr('You choose what it can see.', 'Vi izberete, kaj lahko vidi.'),
        body: tr('The assistant works with the files and records you allow. It does not need access to every folder to help with a particular task.', 'Pomočnik uporablja datoteke in evidence, do katerih mu dovolite dostop. Za pomoč pri določeni nalogi ne potrebuje dostopa do vsake mape.'),
        check: tr('Which records it may use, who can ask questions, and which information stays out of reach.', 'Katere evidence sme uporabljati, kdo lahko postavlja vprašanja in kateri podatki ostanejo nedostopni.')
      },
      app: {
        label: tr('The application', 'Aplikacija'), symbol: '02',
        title: tr('You set the rules.', 'Vi določite pravila.'),
        body: tr('The software checks what the assistant is allowed to do. We agree which tasks it may handle and which changes need a person to approve them.', 'Program preveri, kaj pomočnik sme narediti. Dogovorimo se, katere naloge lahko opravi in katere spremembe mora potrditi človek.'),
        check: tr('Which changes need your approval, how you can check what happened, and what can be undone.', 'Katere spremembe potrebujejo vašo potrditev, kako preverite opravljeno delo in kaj je mogoče razveljaviti.')
      },
      model: {
        label: local ? tr('Local AI model', 'Lokalni model AI') : tr('External AI provider', 'Zunanji ponudnik AI'), symbol: '03',
        title: local ? tr('The model runs on the device.', 'Model teče na napravi.') : tr('Some information leaves the computer.', 'Del podatkov zapusti računalnik.'),
        body: local ? tr('Here, the AI works through the question on your computer. Other features, such as phone access and backups, may still use an internet connection.', 'Tu AI obdela vprašanje na vašem računalniku. Druge funkcije, kot so dostop s telefona in varnostne kopije, lahko še vedno uporabljajo internetno povezavo.') : tr('To answer your question, the assistant sends the relevant information to the chosen AI provider. Installing an assistant on your computer does not, on its own, keep everything there.', 'Za odgovor na vaše vprašanje pomočnik ustrezne podatke pošlje izbranemu ponudniku AI. Sama namestitev pomočnika na računalniku še ne pomeni, da vsi podatki ostanejo na njem.'),
        check: local ? tr('Whether your computer can run the AI well, and which parts of the setup still need an online service.', 'Ali je vaš računalnik dovolj zmogljiv in kateri deli postavitve še potrebujejo spletno storitev.') : tr('Which provider is used, what it receives, where it processes your data, and how long it keeps it.', 'Katerega ponudnika uporabimo, kaj prejme, kje obdela vaše podatke in koliko časa jih hrani.')
      }
    };
    const selected = nodes[state.node];
    return '<div class="workbench-intro"><div><p class="eyebrow">' + tr('Privacy, explained simply', 'Zasebnost, preprosto razložena') + '</p><h3>' + tr('Where does your information go?', 'Kam gredo vaši podatki?') + '</h3></div><span class="demo-label">' + tr('Two possible setups', 'Dve možni postavitvi') + '</span></div>' +
      '<div class="data-modes" role="group" aria-label="' + tr('Compare AI configurations', 'Primerjajte nastavitve AI') + '">' + [['local', tr('AI on your computer', 'AI na vašem računalniku')], ['connected', tr('AI through a provider', 'AI prek ponudnika')]].map(([key, label]) => '<button type="button" data-mode="' + key + '" aria-pressed="' + (key === state.mode) + '">' + label + '</button>').join('') + '</div>' +
      '<p class="data-boundary">' + (local ? tr('In this example, the AI processes information on your computer.', 'V tem primeru AI obdela podatke na vašem računalniku.') : tr('In this example, the AI receives selected information over the internet.', 'V tem primeru AI prejme izbrane podatke prek interneta.')) + '</p>' +
      '<div class="data-map ' + (local ? 'is-local' : 'is-connected') + '" role="group" aria-label="' + tr('Select a step to inspect it', 'Izberite korak za podrobnosti') + '">' + Object.entries(nodes).map(([key, node]) => '<button type="button" class="data-node" data-node="' + key + '" aria-pressed="' + (key === state.node) + '" aria-controls="data-detail"><span>' + node.symbol + '</span><strong>' + node.label + '</strong><small>' + (key === 'model' && !local ? tr('Outside the device', 'Zunaj naprave') : tr('On the device', 'Na napravi')) + '</small></button>').join('<span class="data-arrow" aria-hidden="true">→</span>') + '</div>' +
      '<div id="data-detail" class="data-detail" aria-live="polite" aria-atomic="true"><div><p class="eyebrow">' + selected.label + '</p><h4>' + selected.title + '</h4><p>' + selected.body + '</p></div><div><p class="eyebrow">' + tr('What we agree with you', 'Kaj se dogovorimo z vami') + '</p><p>' + selected.check + '</p></div></div>' +
      '<p class="workbench-note">' + tr('These examples explain the choices. Your actual setup depends on the product, computer, and services you choose with us.', 'Primera pojasnjujeta možnosti. Dejanska postavitev je odvisna od izdelka, računalnika in storitev, ki jih izberete z nami.') + '</p>';
  }

  function render(focusSelector) {
    const tabs = [['lab', tr('Your working day', 'Vaš delovni dan')], ['calculator', tr('Time saved', 'Prihranek časa')], ['data', tr('Your data', 'Vaši podatki')]];
    root.innerHTML = '<div class="workbench-tabs" role="tablist" aria-label="' + tr('Explore Apollo', 'Raziščite Apollo') + '">' + tabs.map(([key, label]) => '<button type="button" role="tab" id="tool-' + key + '" data-tool="' + key + '" aria-selected="' + (state.tool === key) + '" aria-controls="panel-' + key + '" tabindex="' + (state.tool === key ? '0' : '-1') + '">' + label + '</button>').join('') + '</div>' +
      '<div class="workbench-panel" id="panel-lab" role="tabpanel" aria-labelledby="tool-lab"' + (state.tool !== 'lab' ? ' hidden' : '') + '>' + lab() + '</div>' +
      '<div class="workbench-panel" id="panel-calculator" role="tabpanel" aria-labelledby="tool-calculator"' + (state.tool !== 'calculator' ? ' hidden' : '') + '>' + calculator() + '</div>' +
      '<div class="workbench-panel" id="panel-data" role="tabpanel" aria-labelledby="tool-data"' + (state.tool !== 'data' ? ' hidden' : '') + '>' + dataGuide() + '</div>';
    updateCalculation();
    if (focusSelector) root.querySelector(focusSelector)?.focus({ preventScroll: true });
  }

  root.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || !root.contains(button)) return;
    const { tool, example, action, mode, node } = button.dataset;
    if (tool) { state.tool = tool; render('#tool-' + tool); }
    else if (example) { state.example = example; render('[data-example="' + example + '"]'); }
    else if (mode) { state.mode = mode; state.node = 'model'; render('[data-mode="' + mode + '"]'); }
    else if (node) { state.node = node; render('[data-node="' + node + '"]'); }
    else if (action === 'reset-calculator') {
      state.costs = { people: '5', repeats: '1', minutes: '15', days: '20', reduction: '40', rate: '20' };
      render('[data-action="reset-calculator"]');
    }
  });
  root.addEventListener('input', event => {
    const key = event.target.dataset.cost;
    if (key && Object.hasOwn(state.costs, key)) { state.costs[key] = event.target.value; updateCalculation(); }
  });
  root.addEventListener('keydown', event => {
    if (!event.target.matches('[role="tab"]')) return;
    const keys = ['lab', 'calculator', 'data'];
    const index = keys.indexOf(state.tool);
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % keys.length;
    if (event.key === 'ArrowLeft') next = (index + keys.length - 1) % keys.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = keys.length - 1;
    if (next !== undefined) { event.preventDefault(); state.tool = keys[next]; render('#tool-' + state.tool); }
  });
  document.addEventListener('apollo:language', event => {
    language = event.detail === 'sl' ? 'sl' : 'en';
    render();
  });
  render();
  root.hidden = false;
  document.getElementById('workbench-fallback').hidden = true;
})();
