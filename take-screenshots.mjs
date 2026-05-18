import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const BASE = 'http://localhost:5173';
const OUT = 'C:\\Users\\jorda\\OneDrive\\Desktop\\JordanThirkle.com\\JordanThirkle.com\\public\\projects';

async function screenshotPage(label, tabSelector, filename, opts = {}) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  if (tabSelector) {
    const tab = page.locator(tabSelector);
    await tab.click();
    await page.waitForTimeout(600);
  }

  await page.screenshot({ path: `${OUT}/${filename}`, fullPage: opts.fullPage ?? true });
  await browser.close();
  console.log(`✓ ${filename} — ${label}`);
}

async function main() {
  // 1. Build the planner: select Kettle, tier II, add attachments
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Click the primary weapon selector to expand it
  await page.locator('button[aria-expanded]').first().click();
  await page.waitForTimeout(300);

  // Find and click "Kettle" in the weapon grid
  await page.locator('button[role="option"]', { hasText: 'Kettle' }).click();
  await page.waitForTimeout(300);

  // Click tier II (second tier button)
  await page.locator('button:has-text("II")').first().click();
  await page.waitForTimeout(300);

  // Screenshot the planner with weapon selected
  await page.screenshot({ path: `${OUT}/arc-planner-hero.png`, fullPage: true });
  console.log('✓ arc-planner-hero.png');

  // Now click the primary weapon attachment slot to open it
  const attachButtons = page.locator('button[aria-expanded]');
  // The weapon selector is already closed — find attachment slot buttons
  // Click "Muzzle" slot button
  const muzzleBtn = page.locator('button', { hasText: /^Muzzle$/ });
  if (await muzzleBtn.count() > 0) {
    await muzzleBtn.first().click();
    await page.waitForTimeout(200);
    // Select Compensator
    const compOpt = page.locator('[role="listbox"] button', { hasText: 'Compensator' });
    if (await compOpt.count() > 0) await compOpt.click();
    await page.waitForTimeout(200);
  }

  // Pick Medium Shield
  const shieldButtons = page.locator('button:has-text("Medium")');
  if (await shieldButtons.count() > 0) {
    const medShield = page.locator('button:has-text("Medium"):not(:has-text("Mag"))').first();
    if (await medShield.count() > 0) await medShield.click();
    await page.waitForTimeout(200);
  }

  // Set quick-use items — stim shot slot
  const quickSlots = page.locator('[aria-label^="Quick use slot"]');
  if (await quickSlots.count() > 0) {
    await quickSlots.first().click();
    await page.waitForTimeout(200);
    const stimOpt = page.locator('[role="listbox"] button', { hasText: 'Stim Shot' });
    if (await stimOpt.count() > 0) await stimOpt.click();
    await page.waitForTimeout(200);
  }

  // Take the final hero screenshot with full build
  await page.screenshot({ path: `${OUT}/arc-planner-hero.png`, fullPage: true });
  console.log('✓ arc-planner-hero.png (final)');
  await browser.close();

  // 2. Database — Weapons table
  await screenshotPage('Database Weapons', 'button[role="tab"]:has-text("Database")', 'arc-database-weapons.png');

  // 3. Database — Attachments (click sub-tab)
  const browser3 = await chromium.launch({ headless: true });
  const page3 = await browser3.newPage({ viewport: { width: 1440, height: 900 } });
  await page3.goto(BASE, { waitUntil: 'networkidle' });
  await page3.waitForTimeout(300);
  await page3.locator('button[role="tab"]:has-text("Database")').click();
  await page3.waitForTimeout(200);
  await page3.locator('button[role="tab"]:has-text("Attachments")').click();
  await page3.waitForTimeout(400);
  await page3.screenshot({ path: `${OUT}/arc-database-attachments.png`, fullPage: true });
  await browser3.close();
  console.log('✓ arc-database-attachments.png');

  // 4. Skills tab
  await screenshotPage('Skills Tree', 'button[role="tab"]:has-text("Skills")', 'arc-skills-tree.png');

  // 5. Craft tab
  await screenshotPage('Crafting', 'button[role="tab"]:has-text("Craft")', 'arc-crafting.png');

  // 6. Builds tab
  await screenshotPage('Meta Builds', 'button[role="tab"]:has-text("Builds")', 'arc-meta-builds.png');
}

main().catch(e => { console.error(e); process.exit(1); });
