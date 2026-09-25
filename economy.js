(() => {
  'use strict';
  const root = document.getElementById('dostopnost');
  if (!root) return;
  // Published USD API rates checked 25 Sep 2026. Uncached input; DeepSeek peak,
  // Claude standard. This compares equal token counts, not equal task quality.
  const rates = { premium: { input: 4, output: 20 }, efficient: { input: .3, output: 1.2 } };
  const maxX = 3;
  let view = 'combined';

  function mix() {
    return { input: view === 'output' ? 0 : 1, output: view === 'input' ? 0 : 1 };
  }

  function perUnit(name) {
    const used = mix();
    return rates[name].input * used.input + rates[name].output * used.output;
  }

  function money(value, sl, digits) {
    const places = digits == null ? (Math.abs(value) >= 100 ? 0 : 2) : digits;
    return new Intl.NumberFormat(sl ? 'sl-SI' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: places,
      maximumFractionDigits: places
    }).format(value);
  }

  function round(value) {
    return Math.round(value * 10) / 10;
  }

  function pill(left, top, label, color) {
    const width = Math.max(62, label.length * 7.1 + 18);
    const height = 22;
    return `<g>
      <rect x="${round(left)}" y="${round(top)}" width="${round(width)}" height="${height}" rx="5" fill="#16111c" stroke="${color}" stroke-opacity="0.55"/>
      <text x="${round(left + width / 2)}" y="${round(top + 15)}" text-anchor="middle" fill="${color}" font-size="11">${label}</text>
    </g>`;
  }

  function renderChart(sl, premium, efficient) {
    const chart = root.querySelector('#cost-chart');
    const width = 640;
    const height = 292;
    const pad = { left: 52, right: 18, top: 28, bottom: 44 };
    const innerWidth = width - pad.left - pad.right;
    const innerHeight = height - pad.top - pad.bottom;
    const maxY = perUnit('premium') * maxX || 1;
    const x = value => round(pad.left + (value / maxX) * innerWidth);
    const y = value => round(pad.top + (1 - value / maxY) * innerHeight);
    const premiumEnd = perUnit('premium') * maxX;
    const efficientEnd = perUnit('efficient') * maxX;
    const exampleX = x(1);
    const premiumY = y(premium);
    const efficientY = y(efficient);
    const axisTitle = sl ? 'Uporaba glede na ta primer →' : 'Usage relative to this example →';
    const exampleLabel = sl ? 'ta primer' : 'this example';
    const reduction = new Intl.NumberFormat(sl ? 'sl-SI' : 'en-US', { maximumFractionDigits: 1 }).format((1 - efficient / premium) * 100);
    let grid = '';
    for (let index = 0; index <= 3; index += 1) {
      const value = maxY * index / 3;
      const top = y(value);
      const base = index === 0;
      grid += `<line x1="${pad.left}" x2="${width - pad.right}" y1="${top}" y2="${top}" stroke="#c7b3f5" stroke-opacity="${base ? 0.34 : 0.1}"${base ? '' : ' stroke-dasharray="2 5"'}/>`;
      const whole = Math.abs(value - Math.round(value)) < 0.05;
      grid += `<text x="${pad.left - 8}" y="${top + 3.5}" text-anchor="end" fill="#9b89ab" font-size="10">${money(value, sl, whole || value >= 100 ? 0 : 1)}</text>`;
    }
    let xTicks = '';
    for (let value = 0; value <= maxX; value += 1) {
      const left = x(value);
      const isExample = value === 1;
      const label = isExample ? exampleLabel : value + '×';
      xTicks += `<text x="${left}" y="${height - 14}" text-anchor="middle" fill="${isExample ? '#f0d2c0' : '#9b89ab'}" font-size="${isExample ? 10 : 10}" font-weight="${isExample ? 600 : 400}">${label}</text>`;
    }
    const gapY = round(premiumY + (efficientY - premiumY) * 0.4);
    const efficientPillTop = Math.min(efficientY - 24, pad.top + innerHeight - 26);
    const summary = sl
      ? `Claude Opus 5.5 ${money(premium, true)} proti DeepSeek V4.1 Flash ${money(efficient, true)} v tem primeru.`
      : `Claude Opus 5.5 costs ${money(premium, false)} versus DeepSeek V4.1 Flash at ${money(efficient, false)} for this example.`;
    chart.setAttribute('aria-label', summary);
    chart.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="presentation" width="100%" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="eco-gap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#c7b3f5" stop-opacity="0.28"/>
          <stop offset="1" stop-color="#c7b3f5" stop-opacity="0.05"/>
        </linearGradient>
        <clipPath id="eco-plot">
          <rect x="${pad.left}" y="${pad.top}" width="${innerWidth}" height="${innerHeight}"/>
        </clipPath>
      </defs>
      <rect x="${pad.left}" y="${pad.top}" width="${innerWidth}" height="${innerHeight}" fill="#140f19"/>
      ${grid}
      <g clip-path="url(#eco-plot)">
        <rect x="${round(exampleX - 18)}" y="${pad.top}" width="36" height="${innerHeight}" fill="#ffa982" fill-opacity="0.07"/>
        <path d="M${x(0)},${y(0)} L${x(maxX)},${y(premiumEnd)} L${x(maxX)},${y(efficientEnd)} Z" fill="url(#eco-gap)"/>
        <path d="M${x(0)},${y(0)} L${x(maxX)},${y(premiumEnd)}" fill="none" stroke="#c7b3f5" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M${x(0)},${y(0)} L${x(maxX)},${y(efficientEnd)}" fill="none" stroke="#ffa982" stroke-width="3" stroke-linecap="round"/>
      </g>
      <line x1="${exampleX}" x2="${exampleX}" y1="${pad.top}" y2="${pad.top + innerHeight}" stroke="#ffd7c0" stroke-opacity="0.35"/>
      <line x1="${exampleX}" x2="${exampleX}" y1="${premiumY}" y2="${efficientY}" stroke="#ffa982" stroke-width="1.5" stroke-dasharray="3 3"/>
      <circle cx="${x(maxX)}" cy="${y(premiumEnd)}" r="3.4" fill="#c7b3f5"/>
      <circle cx="${x(maxX)}" cy="${y(efficientEnd)}" r="3.4" fill="#ffa982"/>
      <circle cx="${exampleX}" cy="${premiumY}" r="5.2" fill="#16111c" stroke="#c7b3f5" stroke-width="2.2"/>
      <circle cx="${exampleX}" cy="${efficientY}" r="5.2" fill="#16111c" stroke="#ffa982" stroke-width="2.2"/>
      ${pill(exampleX + 14, premiumY - 34, money(premium, sl), '#d7c6ee')}
      ${pill(exampleX + 14, efficientPillTop, money(efficient, sl), '#ffc5a8')}
      <g>
        <rect x="${round(exampleX - 48)}" y="${round(gapY - 11)}" width="42" height="20" rx="4" fill="#24182a" stroke="#ffa982" stroke-opacity="0.45"/>
        <text x="${round(exampleX - 27)}" y="${round(gapY + 4)}" text-anchor="middle" fill="#ffc5a8" font-size="10">−${reduction}%</text>
      </g>
      <text x="${x(maxX) - 10}" y="${y(premiumEnd) + 18}" text-anchor="end" fill="#d7c6ee" stroke="#140f19" stroke-width="4" paint-order="stroke" font-size="10">Claude</text>
      <text x="${x(maxX) - 10}" y="${y(efficientEnd) - 12}" text-anchor="end" fill="#ffc5a8" stroke="#140f19" stroke-width="4" paint-order="stroke" font-size="10">DeepSeek</text>
      ${xTicks}
    </svg>`;
    root.querySelector('#cost-axis-title').textContent = axisTitle;
  }

  function render() {
    const sl = document.documentElement.lang === 'sl';
    const premium = perUnit('premium');
    const efficient = perUnit('efficient');
    root.querySelector('#premium-cost').textContent = money(premium, sl);
    root.querySelector('#efficient-cost').textContent = money(efficient, sl);
    const reduction = new Intl.NumberFormat(sl ? 'sl-SI' : 'en-US', { maximumFractionDigits: 1 }).format((1 - efficient / premium) * 100);
    root.querySelector('#cost-reduction').innerHTML = reduction + '<span>%</span>';
    const captions = {
      combined: ['Example: 1 million input + 1 million output tokens', 'Primer: 1 milijon vhodnih + 1 milijon izhodnih žetonov'],
      input: ['Example: 1 million input tokens', 'Primer: 1 milijon vhodnih žetonov'],
      output: ['Example: 1 million output tokens', 'Primer: 1 milijon izhodnih žetonov']
    };
    root.querySelector('#cost-caption').textContent = captions[view][sl ? 1 : 0];
    root.querySelector('.cost-controls').setAttribute('aria-label', sl ? 'Primerjava uporabe' : 'Usage comparison');
    root.querySelectorAll('[data-cost-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.costView === view)));
    renderChart(sl, premium, efficient);
  }

  root.addEventListener('click', event => {
    const button = event.target.closest('[data-cost-view]');
    if (!button || !root.contains(button)) return;
    view = button.dataset.costView;
    render();
  });
  root.querySelector('.cost-controls').addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const buttons = [...root.querySelectorAll('[data-cost-view]')];
    const index = buttons.findIndex(button => button.dataset.costView === view);
    const offset = event.key === 'ArrowRight' ? 1 : -1;
    const next = buttons[(index + offset + buttons.length) % buttons.length];
    view = next.dataset.costView;
    next.focus();
    render();
    event.preventDefault();
  });
  document.addEventListener('apollo:language', render);
  render();
  root.querySelector('.cost-controls').hidden = false;
})();
