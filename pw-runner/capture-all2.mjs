import { chromium } from 'playwright';
import path from 'path';

const OUT = 'C:\Learn\Claude-project\screenshots';
import { mkdirSync } from 'fs';
mkdirSync(OUT, { recursive: true });

async function shot(page, name) {
  const p = path.join(OUT, `modal-${name}.png`);
  await page.screenshot({ path: p, fullPage: false });
  console.log(`Saved: ${p}`);
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();
await page.setViewportSize({ width: 1280, height: 800 });

await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

// Click Modal nav button
await page.click('button:has-text("Modal")');
await page.waitForTimeout(600);
await shot(page, '01-default-page');

// --- Small modal ---
await page.locator('button:has-text("Small (400px)")').click();
await page.waitForTimeout(500);
await shot(page, '02-small-modal');
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

// --- Large modal ---
await page.locator('button:has-text("Large (720px)")').click();
await page.waitForTimeout(500);
await shot(page, '03-large-modal');
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

// --- Danger modal ---
await page.locator('button:has-text("Danger")').first().click();
await page.waitForTimeout(500);
await shot(page, '04-danger-modal');
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

// --- With footer actions ---
await page.locator('button:has-text("With footer actions")').click();
await page.waitForTimeout(500);
await shot(page, '05-footer-actions-modal');
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

// --- No title ---
await page.locator('button:has-text("No title")').click();
await page.waitForTimeout(500);
await shot(page, '06-no-title-modal');
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

// --- Mobile viewport ---
await page.setViewportSize({ width: 375, height: 812 });
await page.waitForTimeout(400);
await shot(page, '07-mobile-page');

await page.locator('button:has-text("Small (400px)")').click();
await page.waitForTimeout(500);
await shot(page, '08-mobile-small-modal');
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

// --- Focus state on close button ---
await page.setViewportSize({ width: 1280, height: 800 });
await page.locator('button:has-text("With footer actions")').click();
await page.waitForTimeout(500);
await page.keyboard.press('Tab');
await page.waitForTimeout(200);
await shot(page, '09-focus-close-button');
await page.keyboard.press('Escape');
await page.waitForTimeout(300);

console.log('Done.');
await browser.close();
