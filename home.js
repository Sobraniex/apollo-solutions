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
    en: 'Explore local AI for company workflows with clear data boundaries, plus DGX Spark model options and Apollo installation services.',
    sl: 'Raziščite lokalno AI za delovne procese podjetij z jasnimi mejami za podatke ter modele DGX Spark in Apollove storitve namestitve.'
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
  const providerCarousel = document.querySelector('[data-provider-carousel]');
  if (providerCarousel) {
    const track = providerCarousel.querySelector('[data-carousel-track]');
    const slides = [...providerCarousel.querySelectorAll('[data-carousel-slide]')];
    const previous = providerCarousel.querySelector('[data-carousel-prev]');
    const next = providerCarousel.querySelector('[data-carousel-next]');
    const status = providerCarousel.querySelector('[data-carousel-status]');
    const providerNames = slides.map(slide => slide.querySelector('h4').textContent);
    let activeIndex = 0;
    track.style.width = `${slides.length * 100}%`;
    slides.forEach(slide => {
      slide.style.flexBasis = `${100 / slides.length}%`;
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
    });
    function showProvider(index) {
      activeIndex = Math.max(0, Math.min(index, slides.length - 1));
      track.style.transform = `translateX(-${activeIndex * 100 / slides.length}%)`;
      slides.forEach((slide, i) => {
        const active = i === activeIndex;
        slide.setAttribute('aria-hidden', String(!active));
        slide.inert = !active;
        slide.setAttribute('aria-label', `${i + 1} / ${slides.length}: ${providerNames[i]}`);
      });
      previous.disabled = activeIndex === 0;
      next.disabled = activeIndex === slides.length - 1;
      status.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    }
    previous.addEventListener('click', () => showProvider(activeIndex - 1));
    next.addEventListener('click', () => showProvider(activeIndex + 1));
    providerCarousel.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' && activeIndex > 0) { event.preventDefault(); showProvider(activeIndex - 1); }
      if (event.key === 'ArrowRight' && activeIndex < slides.length - 1) { event.preventDefault(); showProvider(activeIndex + 1); }
    });
    providerCarousel.classList.add('is-ready');
    document.addEventListener('apollo:language', event => {
      providerCarousel.setAttribute('aria-label', event.detail === 'sl' ? 'Primeri pogojev ponudnikov' : 'Provider terms examples');
      showProvider(activeIndex);
    });
    showProvider(0);
  }
  setLanguage(language);
})();
