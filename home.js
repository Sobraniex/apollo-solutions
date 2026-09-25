(() => {
  const languageButton = document.getElementById('langBtn');
  const menuButton = document.getElementById('menuBtn');
  const navigation = document.getElementById('main-nav');
  const requestedLanguage = new URLSearchParams(location.search).get('lang');
  let language = document.documentElement.lang === 'sl' ? 'sl' : 'en';
  if (['en', 'sl'].includes(requestedLanguage) && requestedLanguage !== language) {
    location.replace(new URL((language === 'sl' ? '../' : 'sl/') + location.hash, location.href));
    return;
  }
  const descriptions = {
    en: 'Explore six open-model configurations for NVIDIA DGX Sparks and Apollo’s 1, 2, and 4 Spark installation packages. Hermes Dental remains a separate Apollo product.',
    sl: 'Raziščite šest konfiguracij odprtih modelov za NVIDIA DGX Spark ter Apollove pakete namestitve za eno, dve ali štiri naprave. Hermes Dental ostaja ločen izdelek.'
  };
  function setLanguage(next) {
    language = next;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-en][data-sl]').forEach(element => { element.textContent = element.dataset[language]; });
    document.title = language === 'sl' ? 'Modeli AI in namestitev DGX Spark | Apollo Solutions' : 'DGX Spark AI Models & Installation | Apollo Solutions';
    document.querySelector('meta[name="description"]').content = descriptions[language];
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = descriptions[language];
    languageButton.textContent = language === 'sl' ? 'EN' : 'SL';
    languageButton.setAttribute('aria-label', language === 'sl' ? 'Switch to English' : 'Switch to Slovenian');
    navigation.setAttribute('aria-label', language === 'sl' ? 'Glavna navigacija' : 'Main navigation');
    document.querySelectorAll('[data-product-link]').forEach(link => {
      const url = new URL(link.getAttribute('href'), location.href);
      url.searchParams.set('lang', language);
      link.href = url.href;
    });
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
  setLanguage(language);
})();
