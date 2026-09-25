(() => {
  const languageButton = document.getElementById('langBtn');
  const menuButton = document.getElementById('menuBtn');
  const navigation = document.getElementById('main-nav');
  const image = document.getElementById('productImage');
  const caption = document.getElementById('productCaption');
  const screenButtons = [...document.querySelectorAll('[data-screen]')];
  let screen = 'schedule';
  const requestedLanguage = new URLSearchParams(location.search).get('lang');
  let language = document.documentElement.lang === 'sl' ? 'sl' : 'en';
  if (['en', 'sl'].includes(requestedLanguage) && requestedLanguage !== language) {
    location.replace(new URL((language === 'sl' ? '../' : 'sl/') + location.hash, location.href));
    return;
  }
  const descriptions = {
    en: 'Apollo Solutions builds focused workflow software for independent dental practices. Explore Hermes Dental for appointments, patient records, treatment plans, and billing on macOS.',
    sl: 'Apollo Solutions razvija program za vodenje zobozdravstvene ordinacije. Hermes Dental združuje termine, kartoteke, načrte zdravljenja in račune na Macu.'
  };
  const screens = {
    schedule: { src: 'images/shots/urnik.png', en: 'Inside Hermes Dental: the appointment schedule.', sl: 'Pogled v Hermes Dental: urnik terminov.' },
    overview: { src: 'images/shots/domov.png', en: 'Inside Hermes Dental: the daily overview.', sl: 'Pogled v Hermes Dental: dnevni pregled.' }
  };
  function updateScreen() {
    const selected = screens[screen];
    image.src = (language === 'sl' ? '../' : '') + selected.src;
    image.alt = selected[language];
    caption.textContent = selected[language];
    screenButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.screen === screen)));
  }
  function setLanguage(next) {
    language = next;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-en][data-sl]').forEach(element => { element.textContent = element.dataset[language]; });
    document.title = language === 'sl' ? 'Program za zobozdravstveno ordinacijo | Apollo Solutions' : 'Dental Practice Software & Workflow Tools | Apollo Solutions';
    document.querySelector('meta[name="description"]').content = descriptions[language];
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = descriptions[language];
    languageButton.textContent = language === 'sl' ? 'EN' : 'SL';
    languageButton.setAttribute('aria-label', language === 'sl' ? 'Switch to English' : 'Switch to Slovenian');
    navigation.setAttribute('aria-label', language === 'sl' ? 'Glavna navigacija' : 'Main navigation');
    document.querySelector('.view-switch').setAttribute('aria-label', language === 'sl' ? 'Zasloni programa' : 'Product screenshots');
    document.querySelectorAll('[data-product-link]').forEach(link => {
      const url = new URL(link.getAttribute('href'), location.href);
      url.searchParams.set('lang', language);
      link.href = url.href;
    });
    updateScreen();
    document.dispatchEvent(new CustomEvent("apollo:language", { detail: language }));
  }
  function closeMenu(returnFocus = false) {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const open = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  window.matchMedia('(min-width: 761px)').addEventListener('change', () => closeMenu());
  screenButtons.forEach(button => button.addEventListener('click', () => { screen = button.dataset.screen; updateScreen(); }));
  setLanguage(language);
})();
