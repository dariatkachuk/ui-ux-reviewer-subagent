import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 800 });

console.log('Navigating to app...');
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
console.log('Page title:', await page.title());

await page.screenshot({ path: '/c/Learn/Claude-project/modal-00-initial.png', fullPage: true });
console.log('Initial screenshot taken');

const buttons = await page.$$eval('button, a, nav', els =>
  els.map(el => ({ tag: el.tagName, text: el.innerText?.trim().slice(0,60), id: el.id, cls: el.className?.slice(0,80) }))
);
console.log('Interactive elements:', JSON.stringify(buttons, null, 2));

await browser.close();
