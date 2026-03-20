import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '..', 'screenshots');
mkdirSync(OUT, { recursive: true });
console.log('Saving to:', OUT);

async function shot(page, name) {
  const p = resolve(OUT, `modal-${name}.png`);
  await page.screenshot({ path: p, fullPage: false });
  console.log(`Saved: ${p}`);
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();
await page.setViewportSize({ width: 1280, height: 800 });

await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
await page.click('button:has-text("Modal")');
await page.waitForTimeout(600);
await shot(page, '01-default-page');

await page.locator('button:has-text("Small (400px)")').click();
await page.waitForTimeout(500);
await shot(page, '02-small-modal');
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

await page.locator('button:has-text("Large (720px)")').click();
await page.waitForTimeout(500);
await shot(page, '03-large-modal');
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

await page.locator('button:has-text("Danger")').first().click();
await page.waitForTimeout(500);
await shot(page, '04-danger-modal');
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

await page.locator('button:has-text("With footer actions")').click();
await page.waitForTimeout(500);
await shot(page, '05-footer-actions-modal');
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

await page.locator('button:has-text("No title")').click();
await page.waitForTimeout(500);
await shot(page, '06-no-title-modal');
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

// Mobile
await page.setViewportSize({ width: 375, height: 812 });
await page.waitForTimeout(300);
await shot(page, '07-mobile-page');
await page.locator('button:has-text("Small (400px)")').click();
await page.waitForTimeout(500);
await shot(page, '08-mobile-small-modal');
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

// Focus state
await page.setViewportSize({ width: 1280, height: 800 });
await page.locator('button:has-text("With footer actions")').click();
await page.waitForTimeout(500);
await page.keyboard.press('Tab');
await page.waitForTimeout(200);
await shot(page, '09-focus-close-button');
// Tab again to footer buttons
await page.keyboard.press('Tab');
await page.waitForTimeout(200);
await shot(page, '10-focus-footer-button');
await page.keyboard.press('Escape');

console.log('All done.');
await browser.close();
