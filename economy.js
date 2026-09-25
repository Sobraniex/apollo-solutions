(() => {
  'use strict';
  const root = document.getElementById('dostopnost');
  if (!root) return;

  // Uncached published USD API prices checked 25 Sep 2026.
  const api = { claude: 24, deepseek: 1.62 };
  const hardwareDefault = 4699;
  const runningDefault = 25;
  const months = 36;

  function format(value, sl = document.documentElement.lang === 'sl') {
    return new Intl.NumberFormat(sl ? 'sl-SI' : 'en-US', {
      style: 'currency', currency: 'USD', maximumFractionDigits: 0
    }).format(value);
  }

  function renderApi() {
    const sl = document.documentElement.lang === 'sl';
    root.querySelector('#premium-cost').textContent = format(api.claude, sl);
    root.querySelector('#efficient-cost').textContent = new Intl.NumberFormat(sl ? 'sl-SI' : 'en-US', {
      style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2
    }).format(api.deepseek);
    const percent = ((1 - api.deepseek / api.claude) * 100).toFixed(1);
    root.querySelector('#cost-reduction').innerHTML = `${new Intl.NumberFormat(sl ? 'sl-SI' : 'en-US').format(Number(percent))}<span>%</span>`;
  }

  const longrun = root.querySelector('#longrun-cost');
  function renderLongrun() {
    const sl = document.documentElement.lang === 'sl';
    const monthlyBill = Math.max(200, Math.min(2000, Number(longrun.querySelector('#longrun-usage').value) || 200));
    const hardware = Math.max(0, Number(longrun.querySelector('#longrun-capex').value) || 0);
    const running = Math.max(0, Number(longrun.querySelector('#longrun-opex').value) || 0);
    const hostedTotal = monthlyBill * months;
    const localTotal = hardware + running * months;
    const delta = hostedTotal - localTotal;
    const denominator = Math.max(hostedTotal, localTotal, 1);
    const hostedBar = longrun.querySelector('#hosted-cost-bar');
    const localBar = longrun.querySelector('#local-cost-bar');

    longrun.querySelector('#longrun-usage-out').textContent = format(monthlyBill, sl);
    longrun.querySelector('#longrun-api-total').textContent = format(hostedTotal, sl);
    longrun.querySelector('#longrun-local-total').textContent = format(localTotal, sl);
    longrun.querySelector('#local-hardware-display').textContent = format(hardware, sl);
    longrun.querySelector('#local-running-display').textContent = `${format(running, sl)} / ${sl ? 'mesec' : 'month'}`;
    longrun.querySelector('#longrun-saving').textContent = `${delta >= 0 ? (sl ? 'Prihranek ' : 'Potentially save ') : (sl ? 'Več za ' : 'Costs more by ')}${format(Math.abs(delta), sl)}`;

    const monthlyGap = monthlyBill - running;
    const breakeven = monthlyGap > 0 ? hardware / monthlyGap : Infinity;
    longrun.querySelector('#longrun-break-even').textContent = Number.isFinite(breakeven)
      ? (sl ? `Ocenjena povrnitev opreme: ${new Intl.NumberFormat('sl-SI', { maximumFractionDigits: 1 }).format(breakeven)} mes.` : `Estimated hardware payback: ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(breakeven)} months`)
      : (sl ? 'Ob teh stroških ni povrnitve' : 'No payback at this monthly bill');
    hostedBar.style.width = `${Math.max(2, hostedTotal / denominator * 100)}%`;
    localBar.style.width = `${Math.max(2, localTotal / denominator * 100)}%`;
  }

  renderApi();
  renderLongrun();
  longrun.querySelectorAll('input').forEach(input => input.addEventListener('input', renderLongrun));
  document.addEventListener('apollo:language', () => { renderApi(); renderLongrun(); });
})();
