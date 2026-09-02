#!/usr/bin/env node
// Responsive audit: overflow, touch targets, text size, CTA contrast
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const BASE = 'http://localhost:8080';
const PAGES = [
  { path: '/', name: 'index' },
  { path: '/about.html', name: 'about' },
  { path: '/client-stories.html', name: 'client-stories' },
];
const ALL_BP = [320, 375, 390, 768, 1024, 1440];
const MOBILE_BP = new Set([320, 375, 390]);

function lum(r, g, b) {
  return [r, g, b].reduce((a, c, i) => {
    c /= 255;
    c = c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return a + c * [0.2126, 0.7152, 0.0722][i];
  }, 0);
}
function cr(rgb1, rgb2) {
  const [l1, l2] = [lum(...rgb1), lum(...rgb2)];
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
function parseRgb(s) {
  const m = String(s).match(/(\d+(?:\.\d+)?)/g);
  return m && m.length >= 3 ? [+m[0], +m[1], +m[2]] : null;
}

const findings = [];
function add(sev, page, bp, check, selector, measured, fix = '') {
  findings.push({ sev, page, bp, check, selector, measured, fix });
}

async function checkPage(browser, page, bp) {
  const ctx = await browser.newContext({ viewport: { width: bp, height: 900 } });
  const pg = await ctx.newPage();
  await pg.goto(BASE + page.path, { waitUntil: 'networkidle', timeout: 15000 });

  // 1. Horizontal overflow — find offending elements (skip those inside scroll containers)
  const overflowers = await pg.evaluate(() => {
    const vw = window.innerWidth;
    const seen = new Set();
    const out = [];

    function hasScrollableAncestor(el) {
      let cur = el.parentElement;
      while (cur && cur !== document.documentElement) {
        const ox = getComputedStyle(cur).overflowX;
        if (ox === 'auto' || ox === 'scroll') return true;
        cur = cur.parentElement;
      }
      return false;
    }

    for (const el of document.querySelectorAll('*')) {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 2 && r.width > 0) {
        if (hasScrollableAncestor(el)) continue; // inside a scroll container — intentional
        const key = el.tagName + '|' + el.id + '|' + [...el.classList].slice(0,2).join('.');
        if (!seen.has(key)) {
          seen.add(key);
          out.push({
            tag: el.tagName.toLowerCase(),
            id: el.id || '',
            cls: [...el.classList].slice(0, 2).join('.'),
            right: Math.round(r.right),
            vw,
          });
        }
      }
    }
    return out.slice(0, 8);
  });
  for (const el of overflowers) {
    const sel = el.id ? `#${el.id}` : el.cls ? `.${el.cls}` : el.tag;
    add('FAIL', page.name, bp, 'H-overflow', sel, `right=${el.right}px vw=${el.vw}`, 'max-width:100% / overflow:hidden on parent');
  }

  // 2 & 3. Touch targets + text size (mobile only)
  if (MOBILE_BP.has(bp)) {
    const targets = await pg.evaluate(() => {
      const results = [];
      const seen = new Set();
      for (const el of document.querySelectorAll('a,button,input,select,[role="button"],[onclick]')) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        const key = el.tagName + el.id + [...el.classList].slice(0,2).join('');
        if (seen.has(key)) continue;
        seen.add(key);
        if (r.width < 44 || r.height < 44) {
          results.push({
            tag: el.tagName.toLowerCase(),
            id: el.id || '',
            cls: [...el.classList].slice(0, 2).join('.'),
            w: Math.round(r.width),
            h: Math.round(r.height),
            text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 40),
          });
        }
      }
      return results;
    });
    for (const t of targets) {
      const sel = t.id ? `#${t.id}` : t.cls ? `.${t.cls}` : t.tag;
      const sev = t.w < 24 || t.h < 24 ? 'FAIL' : 'WARN';
      add(sev, page.name, bp, 'Touch target', sel, `${t.w}×${t.h}px "${t.text}"`, 'Pad to min 44×44px');
    }

    const smallText = await pg.evaluate(() => {
      const seen = new Set();
      const out = [];
      for (const el of document.querySelectorAll('p,span,a,li,label,td,th,h1,h2,h3,h4,h5,h6,small')) {
        if (!el.textContent.trim()) continue;
        const sz = parseFloat(getComputedStyle(el).fontSize);
        if (sz > 0 && sz < 14) {
          const key = el.tagName + [...el.classList].slice(0,2).join('.');
          if (!seen.has(key)) {
            seen.add(key);
            out.push({ tag: el.tagName.toLowerCase(), cls: [...el.classList].slice(0,2).join('.'), sz: sz.toFixed(1) });
          }
        }
      }
      return out;
    });
    for (const t of smallText) {
      const sel = t.cls ? `${t.tag}.${t.cls}` : t.tag;
      add('WARN', page.name, bp, 'Text <14px', sel, `${t.sz}px`, 'Increase font-size to ≥14px');
    }
  }

  await ctx.close();
}

async function checkCtaContrast(browser, page) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pg = await ctx.newPage();
  await pg.goto(BASE + page.path, { waitUntil: 'networkidle', timeout: 15000 });

  const docH = await pg.evaluate(() => document.documentElement.scrollHeight);
  const positions = [0, 0.25, 0.5, 0.75, 1.0].map(f => Math.round(f * Math.max(0, docH - 900)));

  for (const scrollY of positions) {
    await pg.evaluate(y => window.scrollTo(0, y), scrollY);
    await pg.waitForTimeout(150);

    const result = await pg.evaluate(() => {
      const btn = document.querySelector('.header-cta');
      if (!btn) return null;
      const r = btn.getBoundingClientRect();
      if (r.width === 0) return null;
      const cx = Math.round(r.left + r.width / 2);
      const cy = Math.round(r.top + r.height / 2);
      const st = getComputedStyle(btn);
      const textColor = st.color;
      const btnBg = st.backgroundColor;

      // Hide btn and find background element behind it
      btn.style.visibility = 'hidden';
      const el = document.elementFromPoint(cx, cy);
      btn.style.visibility = '';

      let bgColor = 'rgb(255,255,255)';
      let cur = el;
      while (cur && cur !== document.documentElement) {
        const s = getComputedStyle(cur);
        const bg = s.backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          bgColor = bg;
          break;
        }
        const bgImg = s.backgroundImage;
        if (bgImg && bgImg !== 'none' && !bgImg.includes('gradient')) {
          bgColor = 'bg-image';
          break;
        }
        cur = cur.parentElement;
      }

      return { cx, cy, textColor, btnBg, bgColor };
    });

    if (!result) continue;

    let effectiveBg = result.bgColor;
    // If btn has non-transparent background, blend it
    const btnBgRgb = parseRgb(result.btnBg);
    const isBtnTransparent = !btnBgRgb || result.btnBg.includes('0, 0, 0, 0') || result.btnBg === 'transparent';

    const textRgb = parseRgb(result.textColor);
    if (effectiveBg === 'bg-image') {
      add('WARN', page.name, 1440, `CTA contrast @${scrollY}px`, '.header-cta',
        `bg-image behind btn — cannot compute; text=${result.textColor}`,
        'Ensure btn has opaque background or image has sufficient contrast region');
      continue;
    }

    const bgRgb = parseRgb(effectiveBg);
    if (!textRgb || !bgRgb) {
      add('INFO', page.name, 1440, `CTA contrast @${scrollY}px`, '.header-cta',
        `could not parse colors: text=${result.textColor} bg=${effectiveBg}`, '');
      continue;
    }

    // If button has its own opaque background, use that instead
    const useRgb = (!isBtnTransparent && btnBgRgb) ? btnBgRgb : bgRgb;
    const ratio = cr(textRgb, useRgb);
    const sev = ratio < 3 ? 'FAIL' : ratio < 4.5 ? 'WARN' : 'INFO';
    const bgSrc = (!isBtnTransparent && btnBgRgb) ? 'btn-bg' : 'page-bg';
    const reportBg = (!isBtnTransparent && btnBgRgb) ? result.btnBg : effectiveBg;
    add(sev, page.name, 1440, `CTA contrast @${scrollY}px`, '.header-cta',
      `${ratio.toFixed(2)}:1 [${bgSrc}: ${reportBg}; text: ${result.textColor}]`,
      sev === 'FAIL' ? 'Add opaque background or change text/border color' :
      sev === 'WARN' ? 'Boost contrast to ≥4.5:1 for WCAG AA' : '');
  }

  await ctx.close();
}

async function main() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });

  // Parallel page × breakpoint checks
  const jobs = [];
  for (const page of PAGES) {
    for (const bp of ALL_BP) jobs.push(checkPage(browser, page, bp));
  }
  for (const page of PAGES) jobs.push(checkCtaContrast(browser, page));

  await Promise.all(jobs);
  await browser.close();

  // Sort: FAIL → WARN → INFO, then page, then bp
  const order = { FAIL: 0, WARN: 1, INFO: 2 };
  findings.sort((a, b) =>
    order[a.sev] - order[b.sev] || a.page.localeCompare(b.page) || a.bp - b.bp
  );

  const cols = ['SEV', 'PAGE', 'BP', 'CHECK', 'SELECTOR', 'MEASURED', 'FIX'];
  const rows = findings.map(f => [f.sev, f.page, String(f.bp), f.check, f.selector, f.measured, f.fix]);
  const widths = cols.map((c, i) => Math.max(c.length, ...rows.map(r => (r[i] || '').length)));
  const sep = widths.map(w => '-'.repeat(w)).join('-+-');
  const fmt = row => row.map((c, i) => (c || '').padEnd(widths[i])).join(' | ');

  console.log('\n=== RESPONSIVE AUDIT FINDINGS ===\n');
  console.log(fmt(cols));
  console.log(sep);
  let prev = '';
  for (const row of rows) {
    if (prev && row[0] !== prev) console.log(sep);
    prev = row[0];
    console.log(fmt(row));
  }
  const fail = findings.filter(f => f.sev === 'FAIL').length;
  const warn = findings.filter(f => f.sev === 'WARN').length;
  const info = findings.filter(f => f.sev === 'INFO').length;
  console.log(`\nSummary: ${fail} FAIL  ${warn} WARN  ${info} INFO`);
}

main().catch(e => { console.error(e); process.exit(1); });
