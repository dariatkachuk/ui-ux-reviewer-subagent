import { chromium } from 'playwright';

const OUT = '/c/Learn/Claude-project';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 800 });

// --- navigate ---
console.log('Navigating...');
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
console.log('URL:', page.url());

// Look for Modal nav link
const navLinks = await page.$$eval('a, button, [role="link"]', els =>
  els.map(el => ({ tag: el.tagName, text: el.innerText?.trim(), href: el.href }))
);
console.log('Nav links:', JSON.stringify(navLinks));

await browser.close();
