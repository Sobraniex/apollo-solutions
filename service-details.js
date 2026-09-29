(() => {
  const panels = new Set(['models', 'services']);
  function openHashPanel() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (panels.has(id)) document.getElementById(id).open = true;
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const url = new URL(link.href);
    if (url.pathname === location.pathname && panels.has(url.hash.slice(1))) {
      document.getElementById(url.hash.slice(1)).open = true;
    }
  }, true);
  window.addEventListener('hashchange', openHashPanel);
  openHashPanel();
})();
