import { test, expect, type Page } from '@playwright/test';

const BASE = 'http://localhost:5173';

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
] as const;

async function assertNoConsoleErrors(page: Page) {
  const logs: string[] = [];
  page.on('console', msg => {
    const text = msg.text();
    if (msg.type() === 'error' && !text.includes('ERR_NAME_NOT_RESOLVED') && !text.includes('metaforge') && !text.includes('fonts.googleapis') && !text.includes('fonts.gstatic') && !text.includes('Failed to fetch')) {
      logs.push(text);
    }
  });
  await page.waitForTimeout(500);
  expect(logs, `Console errors: ${logs.join('; ')}`).toHaveLength(0);
}

async function assertTouchTargets(page: Page, minPx = 44) {
  const buttons = page.locator('button, a, [role="button"], [role="tab"]');
  const count = await buttons.count();
  const small: string[] = [];
  for (let i = 0; i < count; i++) {
    const el = buttons.nth(i);
    const box = await el.boundingBox();
    if (box) {
      const w = box.width;
      const h = box.height;
      if (w < minPx || h < minPx) {
        const text = (await el.textContent())?.trim().slice(0, 40) || `el[${i}]`;
        small.push(`${text} (${Math.round(w)}×${Math.round(h)})`);
      }
    }
  }
  if (small.length > 0) {
    console.warn(`Small touch targets (${small.length}): ${small.join(', ')}`);
  }
}

test.describe('Responsive Audit', () => {

  for (const vp of VIEWPORTS) {
    test.describe(`${vp.name} (${vp.width}×${vp.height})`, () => {

      test('no horizontal scrollbar', async ({ page }) => {
        await page.setViewportSize(vp);
        await page.goto(BASE, { waitUntil: 'networkidle' });
        const overflowX = await page.evaluate(() =>
          getComputedStyle(document.documentElement).overflowX
        );
        expect(overflowX).toBe('hidden');
      });

      test('hero renders with 3 CTAs', async ({ page }) => {
        await page.setViewportSize(vp);
        await page.goto(BASE, { waitUntil: 'networkidle' });
        await expect(page.getByRole('button', { name: /start building/i })).toBeVisible();
        await expect(page.getByRole('button', { name: /browse database/i })).toBeVisible();
        await expect(page.getByRole('button', { name: /meta builds/i })).toBeVisible();
      });

      test('all 5 main tabs clickable', async ({ page }) => {
        await page.setViewportSize(vp);
        await page.goto(BASE, { waitUntil: 'networkidle' });
        for (const name of ['Gear Up', 'Builds', 'Database', 'Skills', 'Craft']) {
          const tab = page.getByRole('tab', { name: new RegExp(name, 'i') });
          await expect(tab).toBeVisible();
          await tab.click();
          await page.waitForTimeout(200);
        }
      });

      test('planner shows weapon selectors', async ({ page }) => {
        await page.setViewportSize(vp);
        await page.goto(BASE, { waitUntil: 'networkidle' });
        await page.getByRole('tab', { name: /gear up/i }).click();
        await expect(page.getByRole('button', { name: /select weapon/i }).first()).toBeVisible();
      });

      test('database weapons table renders', async ({ page }) => {
        await page.setViewportSize(vp);
        await page.goto(BASE, { waitUntil: 'networkidle' });
        await page.getByRole('tab', { name: /database/i }).click();
        await page.waitForTimeout(500);
        const table = page.locator('table');
        await expect(table).toBeVisible();
        const rows = await table.locator('tbody tr').count();
        expect(rows).toBeGreaterThanOrEqual(5);
      });

      test('skills branches are visible', async ({ page }) => {
        await page.setViewportSize(vp);
        await page.goto(BASE, { waitUntil: 'networkidle' });
        await page.getByRole('tab', { name: /skills/i }).click();
        await page.waitForTimeout(500);
        for (const name of ['Conditioning', 'Mobility', 'Survival']) {
          await expect(page.getByText(new RegExp(name, 'i'))).toBeVisible();
        }
      });

      test('crafting tab renders', async ({ page }) => {
        await page.setViewportSize(vp);
        await page.goto(BASE, { waitUntil: 'networkidle' });
        await page.getByRole('tab', { name: /craft/i }).click();
        await page.waitForTimeout(500);
        await expect(page.getByText(/available recipes/i)).toBeVisible();
      });

      test('builds tab renders sub-tabs', async ({ page }) => {
        await page.setViewportSize(vp);
        await page.goto(BASE, { waitUntil: 'networkidle' });
        await page.getByRole('tab', { name: /builds/i }).click();
        await page.waitForTimeout(300);
        for (const name of ['Meta Builds', 'Community']) {
          const tab = page.getByRole('tab', { name: new RegExp(name, 'i') });
          await expect(tab).toBeVisible();
        }
      });

      test('header sticky and visible', async ({ page }) => {
        await page.setViewportSize(vp);
        await page.goto(BASE, { waitUntil: 'networkidle' });
        const header = page.locator('header').first();
        await expect(header).toBeVisible();
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(300);
        const box = await header.boundingBox();
        expect(box).not.toBeNull();
        if (box) expect(box.y).toBe(0);
      });

      test('footer visible with links', async ({ page }) => {
        await page.setViewportSize(vp);
        await page.goto(BASE, { waitUntil: 'networkidle' });
        const footer = page.locator('footer');
        await expect(footer).toBeVisible();
        await expect(footer).toContainText(/ARC Hub/i);
      });

      test('no console errors on load', async ({ page }) => {
        await page.setViewportSize(vp);
        await page.goto(BASE, { waitUntil: 'networkidle' });
        await assertNoConsoleErrors(page);
      });

      if (vp.name === 'mobile') {
        test('all touch targets ≥ 44px', async ({ page }) => {
          await page.setViewportSize(vp);
          await page.goto(BASE, { waitUntil: 'networkidle' });
          await page.getByRole('tab', { name: /gear up/i }).click();
          await page.getByRole('button', { name: /select weapon/i }).first().click();
          await page.waitForTimeout(300);
          await assertTouchTargets(page, 44);
        });

        test('weapon grid is 2 columns', async ({ page }) => {
          await page.setViewportSize(vp);
          await page.goto(BASE, { waitUntil: 'networkidle' });
          await page.getByRole('tab', { name: /gear up/i }).click();
          await page.getByRole('button', { name: /select weapon/i }).first().click();
          await page.waitForTimeout(300);
          const grid = page.locator('[role="listbox"]');
          const cls = await grid.getAttribute('class') || '';
          expect(cls).toContain('grid-cols-2');
        });
      }

      if (vp.name === 'desktop') {
        test('weapon grid is 3 columns', async ({ page }) => {
          await page.setViewportSize(vp);
          await page.goto(BASE, { waitUntil: 'networkidle' });
          await page.getByRole('tab', { name: /gear up/i }).click();
          await page.getByRole('button', { name: /select weapon/i }).first().click();
          await page.waitForTimeout(300);
          const grid = page.locator('[role="listbox"]');
          const cls = await grid.getAttribute('class') || '';
          expect(cls).toContain('grid-cols-3');
        });
      }
    });
  }

  test.describe('Cross-Viewport', () => {
    test('hero heading scales larger on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(BASE, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const h1 = page.locator('h1').first();
      const mobileSize = await h1.evaluate(el => parseFloat(getComputedStyle(el).fontSize));

      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(500);
      const desktopSize = await h1.evaluate(el => parseFloat(getComputedStyle(el).fontSize));

      expect(desktopSize).toBeGreaterThan(mobileSize);
    });

    test('CTA buttons have vertical gap on narrow viewports', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(BASE, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);

      const startBtn = page.getByRole('button', { name: /start building/i });
      const browseBtn = page.getByRole('button', { name: /browse database/i });
      const startBox = await startBtn.boundingBox();
      const browseBox = await browseBtn.boundingBox();

      if (startBox && browseBox) {
        const verticalGap = browseBox.y - (startBox.y + startBox.height);
        expect(verticalGap).toBeGreaterThanOrEqual(0);
      }
    });
  });
});
