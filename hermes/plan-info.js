(() => {
  let saved;
  try { saved = localStorage.getItem('hds-lang'); } catch { /* Optional preference. */ }
  const requested = new URLSearchParams(location.search).get('lang');
  let language = [requested, saved].find(value => value === 'en' || value === 'sl') || 'sl';
  const button = document.getElementById('langBtn');
  const pricing = location.pathname.endsWith('pricing.html');
  function apply(next) {
    language = next;
    document.documentElement.lang = next;
    try { localStorage.setItem('hds-lang', next); } catch { /* Optional preference. */ }
    document.querySelectorAll('[data-en][data-sl]').forEach(element => { element.textContent = element.dataset[next]; });
    button.textContent = next === 'sl' ? 'EN' : 'SL';
    button.setAttribute('aria-label', next === 'sl' ? 'Switch to English' : 'Preklopi v slovenščino');
    document.title = 'Hermes Dental — ' + (pricing ? (next === 'sl' ? 'Mesečni paketi' : 'Monthly plans') : (next === 'sl' ? 'Preizkus in ponudba' : 'Getting started'));
    document.querySelector('meta[name="description"]').content = next === 'sl' ? 'Hermes Dental je na voljo z mesečno naročnino. Cena in obseg po povpraševanju.' : 'Hermes Dental uses paid monthly plans. Pricing and scope are available on request.';
    document.querySelectorAll('a[href]').forEach(link => {
      const url = new URL(link.getAttribute('href'), location.href);
      if (url.origin === location.origin) { url.searchParams.set('lang', next); link.href = url.href; }
    });
  }
  button.addEventListener('click', () => apply(language === 'sl' ? 'en' : 'sl'));
  apply(language);
})();
