import { chromium } from 'playwright';

const OUT = '/c/Learn/Claude-project';

async function shot(page, name) {
  await page.screenshot({ path: `${OUT}/modal-${name}.png`, fullPage: false });
  console.log(`Screenshot: modal-${name}.png`);
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

// Dump page HTML structure for analysis
const structure = await page.$$eval('[class]', els =>
  els.slice(0, 60).map(el => ({ tag: el.tagName, cls: el.className?.slice(0, 100), text: el.innerText?.trim().slice(0, 40) }))
);
console.log('Page structure:', JSON.stringify(structure, null, 2));

// --- Small modal ---
await page.locator('button:has-text("Small (400px)")').click();
await page.waitForTimeout(500);
await shot(page, '02-small-modal');

// Check modal HTML
const modalHtml = await page.$eval('[role="dialog"], [class*="modal"], [class*="Modal"]',
  el => ({ outerHTML: el.outerHTML.slice(0, 2000), classes: el.className })).catch(() => null);
console.log('Modal HTML:', JSON.stringify(modalHtml));

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

// --- Focus state ---
await page.setViewportSize({ width: 1280, height: 800 });
await page.locator('button:has-text("With footer actions")').click();
await page.waitForTimeout(500);
// Tab to focus the close button
await page.keyboard.press('Tab');
await page.waitForTimeout(200);
await shot(page, '09-focus-state');
await page.keyboard.press('Escape');
await page.waitForTimeout(300);

console.log('All screenshots complete.');
await browser.close();
