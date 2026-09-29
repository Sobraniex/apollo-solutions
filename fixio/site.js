(() => {
  const screenshots = {
    dashboard: {
      src: 'images/dashboard.png',
      alt: { en: 'FixIO dashboard with sample repairs, stock alerts, and orders', sl: 'Pregled FixIO s primeri popravil, zaloge in naročil' },
      caption: { en: "Dashboard · the day's repairs, stock alerts, and orders at a glance.", sl: 'Pregled · današnja popravila, opozorila o zalogi in naročila na enem mestu.' },
    },
    repairs: {
      src: 'images/repairs.png',
      alt: { en: 'FixIO repair list with sample service tickets and status labels', sl: 'Seznam popravil FixIO s primeri servisnih nalogov in statusov' },
      caption: { en: 'Repairs · service numbers, devices, customers, and status in one queue.', sl: 'Popravila · servisne številke, naprave, stranke in statusi v enem seznamu.' },
    },
    inventory: {
      src: 'images/inventory.png',
      alt: { en: 'FixIO inventory with sample parts and low-stock highlights', sl: 'Zaloga FixIO s primeri delov in opozorili o nizki zalogi' },
      caption: { en: 'Inventory · parts, stock levels, pricing, and barcodes.', sl: 'Zaloga · deli, količine, cene in črtne kode.' },
    },
    orders: {
      src: 'images/orders.png',
      alt: { en: 'FixIO order board with example ordered, in-transit, and received parts', sl: 'Pregled naročil FixIO s primeri naročenih, poslanih in prejetih delov' },
      caption: { en: 'Orders · follow each part from order to arrival.', sl: 'Naročila · spremljajte vsak del od naročila do prejema.' },
    },
  };
  const image = document.getElementById('galleryImage');
  const caption = document.getElementById('galleryCaption');
  const view = document.getElementById('galleryView');
  const dialog = document.getElementById('screenshotDialog');
  const dialogImage = document.getElementById('dialogImage');
  const languageButton = document.getElementById('langBtn');
  let language = new URLSearchParams(location.search).get('lang') === 'sl' ? 'sl' : 'en';
  let selected = 'dashboard';

  function showScreen(key) {
    const screen = screenshots[key];
    if (!screen) return;
    selected = key;
    image.src = screen.src;
    image.alt = screen.alt[language];
    dialogImage.src = screen.src;
    dialogImage.alt = screen.alt[language];
    caption.textContent = screen.caption[language];
    document.querySelectorAll('[data-screen]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.screen === key));
    });
  }

  function setLanguage(next) {
    language = next;
    document.documentElement.lang = next;
    document.querySelectorAll('[data-en][data-sl]').forEach(element => {
      element.textContent = element.dataset[next];
    });
    document.querySelectorAll('img[src^="images/"]').forEach(element => {
      const key = element.getAttribute('src').split('/').pop().replace('.png', '');
      if (screens[key]) element.alt = screens[key].alt[next];
    });
    languageButton.textContent = next === 'en' ? 'SL' : 'EN';
    languageButton.setAttribute('aria-label', next === 'en' ? 'Switch to Slovenian' : 'Switch to English');
    document.title = next === 'sl' ? 'FixIO — programska oprema za servisne delavnice | Apollo Solutions' : 'FixIO — repair shop software by Apollo Solutions';
    document.querySelector('meta[name="description"]').content = next === 'sl'
      ? 'FixIO je namizno delovno okolje za servisne ekipe: popravila, stranke, zaloga, naročila delov in predračuni na enem mestu.'
      : 'FixIO is a Windows desktop workspace for repair teams: service tickets, customers, inventory, parts orders, and estimates in one place.';
    document.querySelectorAll('[data-apollo-link]').forEach(link => {
      const url = new URL(link.getAttribute('href'), location.href);
      url.searchParams.set('lang', next);
      link.href = url.href;
    });
    document.querySelector('[data-private-apps-link]').href = next === 'sl'
      ? '../sl/services/private-apps.html#scope'
      : '../services/private-apps.html#scope';
    view.setAttribute('aria-label', next === 'sl' ? 'Odpri zaslon v polni velikosti' : 'Open screenshot at full size');
    document.querySelector('.site-header nav').setAttribute('aria-label', next === 'sl' ? 'Navigacija po strani' : 'Page navigation');
    document.querySelector('.gallery-controls').setAttribute('aria-label', next === 'sl' ? 'Izbira zaslona' : 'Screenshot selection');
    document.getElementById('dialogClose').setAttribute('aria-label', next === 'sl' ? 'Zapri zaslon' : 'Close screenshot');
    showScreen(selected);
  }

  document.querySelectorAll('[data-screen]').forEach(button => button.addEventListener('click', () => showScreen(button.dataset.screen)));
  languageButton.addEventListener('click', () => {
    const next = language === 'en' ? 'sl' : 'en';
    const url = new URL(location.href);
    url.searchParams.set('lang', next);
    history.replaceState(null, '', url);
    setLanguage(next);
  });
  view.addEventListener('click', () => dialog.showModal());
  document.getElementById('dialogClose').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  setLanguage(language);
})();
