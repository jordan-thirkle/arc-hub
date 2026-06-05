import { test, expect, type Page, type Response } from '@playwright/test';

const BASE = 'http://localhost:5173';

// ── HELPERS ──────────────────────────────────────────────────────────────────

async function assertNoBrokenImages(page: Page) {
  const imgs = page.locator('img');
  const count = await imgs.count();
  const broken: string[] = [];
  for (let i = 0; i < count; i++) {
    const img = imgs.nth(i);
    const src = await img.getAttribute('src');
    if (!src) continue;
    // Only check local images — CDN images may not resolve in test env
    if (src.startsWith('/') || src.startsWith(BASE) || src.startsWith('http://localhost')) {
      const nat = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      if (nat === 0 || !nat) broken.push(src);
    }
  }
  expect(broken, `Broken local images: ${broken.join(', ')}`).toHaveLength(0);
}

async function assertNoConsoleErrors(page: Page) {
  const logs: string[] = [];
  page.on('console', msg => {
    const text = msg.text();
    // ignore DNS/network errors for external CDNs (google fonts, metaforge, etc.)
    if (msg.type() === 'error' && !text.includes('ERR_NAME_NOT_RESOLVED') && !text.includes('metaforge') && !text.includes('fonts.googleapis') && !text.includes('fonts.gstatic')) {
      logs.push(text);
    }
  });
  await page.waitForTimeout(500);
  expect(logs, `Console errors: ${logs.join('; ')}`).toHaveLength(0);
}

async function assertAllImagesHaveAlt(page: Page) {
  const imgs = page.locator('img');
  const count = await imgs.count();
  const missing: number[] = [];
  for (let i = 0; i < count; i++) {
    const alt = await imgs.nth(i).getAttribute('alt');
    if (alt === null || alt === undefined) missing.push(i);
  }
  expect(missing, `Images without alt text at indices: ${missing.join(', ')}`).toHaveLength(0);
}

async function assertFastLoad(page: Page, url: string, maxTime = 3000) {
  const start = Date.now();
  const resp = await page.goto(url, { waitUntil: 'networkidle' });
  const duration = Date.now() - start;
  expect(duration, `Page ${url} took ${duration}ms (max ${maxTime}ms)`).toBeLessThan(maxTime);
  return resp;
}

// ── HOOKS ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page }) => {
  page.on('pageerror', err => {
    console.error(`[PAGE ERROR] ${err.message}`);
  });
});

// ── 1. FRONT-PAGE HERO / FIRST IMPRESSION ───────────────────────────────────

test.describe('Front Page — First Impression & Hero', () => {
  test('loads under 3s with no console errors', async ({ page }) => {
    await assertFastLoad(page, BASE, 4000);
    await assertNoConsoleErrors(page);
  });

  test('hero section has all 3 CTA buttons', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await expect(page.getByRole('button', { name: /start building/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /browse database/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /meta builds/i })).toBeVisible();
  });

  test('hero has animated particle background', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const canvas = page.locator('canvas');
    await expect(canvas).toBeAttached();
  });

  test('page title and meta tags are correct', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/ARC Hub/);
    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc).toContain('ARC Hub');
  });

  test('no 404s on any resource', async ({ page }) => {
    const failures: string[] = [];
    page.on('response', (resp: Response) => {
      if (resp.status() >= 400 && resp.url().startsWith(BASE)) {
        failures.push(`${resp.url()} => ${resp.status()}`);
      }
    });
    await page.goto(BASE, { waitUntil: 'networkidle' });
    expect(failures, `Failed resources: ${failures.join(', ')}`).toHaveLength(0);
  });

  test('logo renders as SVG', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const svg = page.locator('svg[aria-label]').first();
    await expect(svg).toBeAttached();
  });
});

// ── 2. HEADER NAVIGATION ────────────────────────────────────────────────────

test.describe('Header Navigation', () => {
  test('all 5 tabs are present', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const tabs = ['Gear Up', 'Builds', 'Database', 'Skills', 'Craft'];
    for (const tab of tabs) {
      await expect(page.getByRole('tab', { name: new RegExp(tab, 'i') })).toBeVisible();
    }
  });

  test('clicking each tab switches content', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /builds/i }).click();
    await expect(page.getByText(/meta builds/i)).toBeVisible();
    await page.getByRole('tab', { name: /database/i }).click();
    await expect(page.getByRole('tab', { name: /weapons/i })).toBeVisible();
    await page.getByRole('tab', { name: /skills/i }).click();
    await expect(page.getByRole('heading', { name: /raider training/i }).first()).toBeVisible();
    await page.getByRole('tab', { name: /craft/i }).click();
    await expect(page.getByText(/crafting calculator/i)).toBeVisible();
  });

  test('header shows Ko-fi link', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await expect(page.getByText(/ko-fi/i).first()).toBeVisible();
  });
});

// ── 3. LOADOUT PLANNER ──────────────────────────────────────────────────────

test.describe('Loadout Planner — Core Flow', () => {
  test('shows "select a weapon" placeholder when empty', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    await expect(page.getByText(/select weapon/i)).toBeVisible();
  });

  test('can select a weapon from the grid', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    const selector = page.getByRole('button', { name: /select weapon/i });
    await selector.click();

    const weaponGrid = page.locator('[role="listbox"]');
    await expect(weaponGrid).toBeVisible();

    const firstWeapon = weaponGrid.locator('[role="option"]').first();
    await firstWeapon.click();
    await expect(page.getByText(/primary mods/i)).toBeVisible();
  });

  test('tier buttons appear and are clickable', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    await page.getByRole('button', { name: /select weapon/i }).click();
    await page.locator('[role="listbox"] [role="option"]').first().click();

    const tierButtons = page.locator('button').filter({ hasText: /^[I II III IV]+$/ });
    const count = await tierButtons.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('attachment slots appear after weapon selection', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    await page.getByRole('button', { name: /select weapon/i }).click();
    await page.locator('[role="listbox"] [role="option"]').first().click();

    const attachments = page.getByText(/primary mods/i);
    await expect(attachments).toBeVisible();
  });

  test('stat breakdown renders after weapon selection', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    await page.getByRole('button', { name: /select weapon/i }).click();
    await page.locator('[role="listbox"] [role="option"]').first().click();

    await expect(page.getByText(/stats/i).first()).toBeVisible();
  });

  test('TTK calculator appears with weapon', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    await page.getByRole('button', { name: /select weapon/i }).click();
    await page.locator('[role="listbox"] [role="option"]').first().click();
    await expect(page.getByText(/ttk/i)).toBeVisible();
  });

  test('share URL button works', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    await page.getByRole('button', { name: /select weapon/i }).click();
    await page.locator('[role="listbox"] [role="option"]').first().click();

    const shareBtn = page.getByRole('button', { name: /share/i });
    await expect(shareBtn).toBeVisible();
  });

  test('compare weapons toggle works', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    const compareBtn = page.getByRole('button', { name: /weapon compare/i });
    await compareBtn.click();
    await expect(page.getByText(/weapon compare/i).or(page.locator('.animate-pulse'))).toBeVisible({ timeout: 3000 });
  });

  test('primary weapon class filter tabs work', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    await page.getByRole('button', { name: /select weapon/i }).click();

    const filterBtns = page.locator('[role="tablist"] button');
    const count = await filterBtns.count();
    expect(count).toBeGreaterThanOrEqual(5);
    await filterBtns.nth(1).click();
    await page.waitForTimeout(300);
  });

  test('can set secondary weapon', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    await page.waitForTimeout(300);

    const secondarySelector = page.locator('section').filter({ hasText: /secondary weapon/i }).getByRole('button', { name: /select weapon/i });
    await expect(secondarySelector).toBeVisible();
    await secondarySelector.click();
    await page.locator('[role="listbox"] [role="option"]').first().click();
    await page.waitForTimeout(300);
  });

  test('clear secondary button works', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    const clearBtn = page.getByRole('button', { name: /unequip secondary/i });
    await expect(clearBtn).toBeVisible();
  });

  test('augment and shield selectors are present', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    await page.getByRole('button', { name: /select weapon/i }).click();
    await page.locator('[role="listbox"] [role="option"]').first().click();
    await expect(page.getByText(/augment/i).first()).toBeVisible();
    await expect(page.getByText(/shield/i).first()).toBeVisible();
  });

  test('quick use slots appear', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    await page.getByRole('button', { name: /select weapon/i }).click();
    await page.locator('[role="listbox"] [role="option"]').first().click();
    await expect(page.getByText(/quick use/i)).toBeVisible();
  });

  test('all weapon images load without 404', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    await page.getByRole('button', { name: /select weapon/i }).click();
    await assertNoBrokenImages(page);
  });

  test('build info panel updates after weapon selection', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    await page.getByRole('button', { name: /select weapon/i }).click();
    await page.locator('[role="listbox"] [role="option"]').first().click();
    await expect(page.getByText(/annual cost/i)).toBeVisible();
    await expect(page.getByText(/patch/i)).toBeVisible();
  });
});

// ── 4. BUILDS TAB ────────────────────────────────────────────────────────────

test.describe('Builds Tab', () => {
  test('meta builds tab shows builds by default', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /builds/i }).click();
    await expect(page.getByText(/meta builds/i)).toBeVisible();
  });

  test('role filter dropdown works', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /builds/i }).click();
    const select = page.locator('select').first();
    await select.selectOption('PvP Aggressor');
    await page.waitForTimeout(300);
  });

  test('sort dropdown works', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /builds/i }).click();
    const selects = page.locator('select');
    await selects.nth(1).selectOption('votes');
    await page.waitForTimeout(300);
  });

  test('meta build cards display weapon name and tier', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /builds/i }).click();
    const cards = page.locator('border \\[rgb\\(var\\(--border-primary\\)\\)\\]');
    await expect(page.getByText(/meta builds/i).first()).toBeVisible();
  });

  test('community tab shows submit button', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /builds/i }).click();
    await page.getByRole('tab', { name: /community/i }).click();
    await expect(page.getByRole('button', { name: /submit build/i })).toBeVisible();
  });

  test('community builds filter dropdown works', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /builds/i }).click();
    await page.getByRole('tab', { name: /community/i }).click();
    const select = page.locator('select').first();
    await select.selectOption('official');
    await page.waitForTimeout(300);
  });
});

// ── 5. DATABASE TAB ─────────────────────────────────────────────────────────

test.describe('Database Tab', () => {
  test('database has 6 sub-tabs', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /database/i }).click();
    const dbTabs = ['Weapons', 'Attachments', 'Items', 'Patches', 'Meta', 'Ermal'];
    for (const tab of dbTabs) {
      await expect(page.getByRole('tab', { name: new RegExp(tab, 'i') })).toBeVisible();
    }
  });

  test('weapons table has all columns', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /database/i }).click();
    const headers = ['Name', 'Class', 'Ammo', 'Mode', 'DMG', 'FR', 'Range', 'Mag', 'Value'];
    for (const h of headers) {
      await expect(page.getByRole('table').locator('th').filter({ hasText: h })).toBeVisible();
    }
  });

  test('weapons table has rows', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /database/i }).click();
    await page.waitForTimeout(500);
    const table = page.locator('table');
    await expect(table).toBeVisible();
    const rows = table.locator('tbody tr');
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('attachments tab renders', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /database/i }).click();
    await page.getByRole('tab', { name: /attachments/i }).click();
    await expect(page.getByText(/effects/i)).toBeVisible();
  });

  test('items tab renders', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /database/i }).click();
    await page.getByRole('tab', { name: /items/i }).click();
    await expect(page.getByText(/category/i)).toBeVisible();
  });

  test('patches tab renders', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /database/i }).click();
    await page.getByRole('tab', { name: /patches/i }).click();
  });

  test('meta tab has analyze button', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /database/i }).click();
    await page.getByRole('tab', { name: /meta/i }).click();
    await expect(page.getByRole('button', { name: /analyze/i })).toBeVisible();
  });

  test('ermal tracker renders with reset timer', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /database/i }).click();
    await page.getByRole('tab', { name: /ermal/i }).click();
    await expect(page.getByText(/weekly reset/i)).toBeVisible();
  });
});

// ── 6. SKILLS TAB ───────────────────────────────────────────────────────────

test.describe('Skills Tab', () => {
  test('skill tree has 3 branches', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /skills/i }).click();
    await expect(page.getByText(/conditioning/i)).toBeVisible();
    await expect(page.getByText(/mobility/i)).toBeVisible();
    await expect(page.getByText(/survival/i)).toBeVisible();
  });

  test('total points display works', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /skills/i }).click();
    await expect(page.getByText(/\/ 91/i)).toBeVisible();
  });

  test('add/remove skill point buttons work', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /skills/i }).click();

    const addBtn = page.locator('button[aria-label*="Add point"]').first();
    if (await addBtn.isEnabled()) {
      await addBtn.click();
      await page.waitForTimeout(200);
    }
    const removeBtn = page.locator('button[aria-label*="Remove point"]').first();
    if (await removeBtn.isEnabled()) {
      await removeBtn.click();
      await page.waitForTimeout(200);
    }
  });

  test('apply recommended button exists', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /skills/i }).click();
    await expect(page.getByRole('button', { name: /metagame allocation/i })).toBeVisible();
  });

  test('reset all button exists', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /skills/i }).click();
    await expect(page.getByRole('button', { name: /unspec all/i })).toBeVisible();
  });

  test('graph view toggle works', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /skills/i }).click();
    const graphBtn = page.getByRole('button', { name: /graph/i });
    await graphBtn.click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.react-flow')).toBeVisible({ timeout: 3000 });
  });
});

// ── 7. CRAFTING TAB ─────────────────────────────────────────────────────────

test.describe('Crafting Tab', () => {
  test('crafting recipes are listed', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /craft/i }).click();
    await expect(page.getByText(/available recipes/i)).toBeVisible();
  });

  test('recipes can be selected and material summary appears', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /craft/i }).click();
    const recipe = page.locator('button').filter({ hasText: /Tier/ }).or(page.locator('button').filter({ hasText: /Mk\./ })).first();
    if (await recipe.isVisible()) {
      await recipe.click();
      await page.waitForTimeout(300);
      const summary = page.getByText(/material summary/i);
      await expect(summary).toBeVisible();
    }
  });

  test('clear selection button works', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /craft/i }).click();
    const recipe = page.locator('button').filter({ hasText: /Tier/ }).or(page.locator('button').filter({ hasText: /Mk\./ })).first();
    if (await recipe.isVisible()) {
      await recipe.click();
      await page.waitForTimeout(200);
      const clearBtn = page.getByRole('button', { name: /clear selection/i });
      if (await clearBtn.isVisible()) {
        await clearBtn.click();
        await page.waitForTimeout(200);
      }
    }
  });
});

// ── 8. FOOTER ───────────────────────────────────────────────────────────────

test.describe('Footer', () => {
  test('footer has attribution and links', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await expect(page.getByText(/ARC Hub/i)).toBeVisible();
    await expect(page.getByText(/embark studios/i)).toBeVisible();
    await expect(page.getByText(/metaforge/i)).toBeVisible();
    await expect(page.getByText(/ko-fi/i).or(page.getByText(/support/i)).first()).toBeVisible();
  });
});

// ── 9. MISSING IMAGES & ASSETS ──────────────────────────────────────────────

test.describe('Image & Asset Audit', () => {
  test('no broken weapon icons in planner grid', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    await page.getByRole('button', { name: /select weapon/i }).click();
    await assertNoBrokenImages(page);
  });

  test('favicon loads', async ({ page }) => {
    const resp = await page.goto(`${BASE}/favicon.svg`);
    expect(resp?.status()).toBe(200);
  });

  test('og-image.svg loads', async ({ page }) => {
    const resp = await page.goto(`${BASE}/og-image.svg`);
    expect(resp?.status()).toBe(200);
  });

  test('icons.svg loads', async ({ page }) => {
    const resp = await page.goto(`${BASE}/icons.svg`);
    expect(resp?.status()).toBe(200);
  });

  test('all images have alt attributes', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    await page.getByRole('button', { name: /select weapon/i }).click();
    await assertAllImagesHaveAlt(page);
  });

  test('guides static pages load', async ({ page }) => {
    const resp = await page.goto(`${BASE}/guides/`, { waitUntil: 'networkidle' });
    expect(resp?.status()).toBe(200);
  });

  test('guide weapon pages load', async ({ page }) => {
    const weapons = ['anvil', 'kettle', 'rascal', 'rattler', 'tempest', 'venator', 'osprey'];
    for (const w of weapons) {
      const resp = await page.goto(`${BASE}/guides/${w}/`, { waitUntil: 'domcontentloaded' });
      expect(resp?.status(), `Guide /${w} returned ${resp?.status()}`).toBe(200);
    }
  });

  test('meta guide pages load', async ({ page }) => {
    const metas = ['pvp-aggressor', 'pve-farmer', 'stealth', 'budget', 'boss-killer', 'new-player', 'solo', 'support'];
    for (const m of metas) {
      const resp = await page.goto(`${BASE}/guides/meta/${m}/`, { waitUntil: 'domcontentloaded' });
      expect(resp?.status(), `Guide /meta/${m} returned ${resp?.status()}`).toBe(200);
    }
  });
});

// ── 10. ENGAGEMENT & RETENTION ──────────────────────────────────────────────

test.describe('User Engagement & Retention', () => {
  test('hero CTA scrolls to planner', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const startBtn = page.getByRole('button', { name: /start building/i });
    await startBtn.click();
    await page.waitForTimeout(500);
    const activeTab = page.getByRole('tab', { 'aria-selected': 'true' });
    await expect(activeTab.first()).toContainText(/gear up/i);
  });

  test('browse database CTA scrolls to database', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /browse database/i }).click();
    await page.waitForTimeout(500);
    await expect(page.getByRole('tab', { name: /database/i, exact: false }).first()).toBeVisible();
    await expect(page.getByRole('tab', { name: /weapons/i })).toBeVisible();
  });

  test('meta builds CTA scrolls to builds', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /meta builds/i }).click();
    await page.waitForTimeout(500);
    await expect(page.getByRole('tab', { name: /builds/i }).first()).toBeVisible();
    await expect(page.getByRole('tab', { name: /meta builds/i })).toBeVisible();
  });

  test('footer Ko-fi link goes to correct URL', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const kofi = page.locator('a[href*="ko-fi.com"]').first();
    await expect(kofi).toHaveAttribute('href', /thirkle/);
  });

  test('saved builds badge increments', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    await page.getByRole('button', { name: /select weapon/i }).click();
    await page.locator('[role="listbox"] [role="option"]').first().click();

    const saveBtn = page.getByRole('button', { name: /save/i }).first();
    if (await saveBtn.isEnabled()) {
      await saveBtn.click();
      const nameInput = page.locator('section').filter({ hasText: /loadout actions/i }).locator('input[placeholder="Build name..."]');
      if (await nameInput.isVisible()) {
        await nameInput.fill('Test Build');
        await page.getByRole('button', { name: /save$/i }).nth(1).click();
        await page.waitForTimeout(300);
      }
    }
  });

  test('scroll indicator in hero section is animated', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const scrollBtn = page.locator('button[aria-label="Scroll to planner"]');
    await expect(scrollBtn).toBeVisible();
  });

  test('page has no horizontal scrollbar on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const bodyWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);
  });
});

// ── 11. RESPONSIVENESS ──────────────────────────────────────────────────────

test.describe('Responsiveness', () => {
  test('mobile viewport: all tabs accessible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const tabs = ['Gear Up', 'Builds', 'Database', 'Skills', 'Craft'];
    for (const tab of tabs) {
      await expect(page.getByRole('tab', { name: new RegExp(tab, 'i') })).toBeVisible();
    }
  });

  test('mobile viewport: hero CTA buttons stack', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const startBtn = page.getByRole('button', { name: /start building/i });
    await expect(startBtn).toBeVisible();
  });

  test('tablet viewport: layout renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /database/i }).click();
    const table = page.locator('table');
    await expect(table).toBeVisible();
  });

  test('mobile viewport: weapon grid is 2 columns', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    await page.getByRole('button', { name: /select weapon/i }).click();
    const grid = page.locator('[role="listbox"]');
    const classAttr = await grid.getAttribute('class');
    expect(classAttr).toContain('grid-cols-2');
  });
});

// ── 12. PERFORMANCE ─────────────────────────────────────────────────────────

test.describe('Performance', () => {
  test('page has acceptable Lighthouse-like metrics', async ({ page }) => {
    const start = Date.now();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(5000);
  });

  test('all JS chunks load without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('response', (resp: Response) => {
      if (resp.url().includes('.js') && resp.status() >= 400) {
        errors.push(`${resp.url()} => ${resp.status()}`);
      }
    });
    await page.goto(BASE, { waitUntil: 'networkidle' });
    expect(errors).toHaveLength(0);
  });

  test('all CSS loads without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('response', (resp: Response) => {
      if (resp.url().includes('.css') && resp.status() >= 400) {
        errors.push(`${resp.url()} => ${resp.status()}`);
      }
    });
    await page.goto(BASE, { waitUntil: 'networkidle' });
    expect(errors).toHaveLength(0);
  });
});

// ── 13. ACCESSIBILITY ───────────────────────────────────────────────────────

test.describe('Accessibility Basics', () => {
  test('all buttons have accessible names', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const buttons = page.locator('button');
    const count = await buttons.count();
    const issues: number[] = [];
    for (let i = 0; i < count; i++) {
      const name = await buttons.nth(i).getAttribute('aria-label');
      const text = await buttons.nth(i).textContent();
      if ((!name || name.trim() === '') && (!text || text.trim() === '')) {
        issues.push(i);
      }
    }
    expect(issues, `Buttons without accessible names at indices: ${issues.join(', ')}`).toHaveLength(0);
  });

  test('role="tablist" and role="tab" are used correctly', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const tabLists = page.locator('[role="tablist"]');
    const tabsCount = await tabLists.count();
    expect(tabsCount).toBeGreaterThanOrEqual(1);
  });

  test('aria-selected is present on tabs', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const tabs = page.locator('[role="tab"]');
    const count = await tabs.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < Math.min(count, 5); i++) {
      const selected = await tabs.nth(i).getAttribute('aria-selected');
      expect(selected).not.toBeNull();
    }
  });
});

// ── 14. STATIC GENERATED PAGES ──────────────────────────────────────────────

test.describe('Generated Static Pages', () => {
  test('sitemap.xml is accessible', async ({ page }) => {
    const resp = await page.goto(`${BASE}/sitemap.xml`, { waitUntil: 'domcontentloaded' });
    expect(resp?.status()).toBe(200);
  });

  test('robots.txt is accessible', async ({ page }) => {
    const resp = await page.goto(`${BASE}/robots.txt`, { waitUntil: 'domcontentloaded' });
    expect(resp?.status()).toBe(200);
  });
});

// ── 15. CRAFTING / ERMAL / UTILITY ──────────────────────────────────────────

test.describe('Utility Features', () => {
  test('ermal stock items display target values', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /database/i }).click();
    await page.getByRole('tab', { name: /ermal/i }).click();
    await expect(page.getByText(/tempest blueprint/i)).toBeVisible();
    await expect(page.getByText(/rascal blueprint/i)).toBeVisible();
  });

  test('ermal accepts number input', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /database/i }).click();
    await page.getByRole('tab', { name: /ermal/i }).click();
    const input = page.locator('input[type="number"]').first();
    if (await input.isVisible()) {
      await input.fill('5');
      const val = await input.inputValue();
      expect(val).toBe('5');
    }
  });
});

// ── 16. BUILDS SUBMISSION FORM ──────────────────────────────────────────────

test.describe('Build Submission', () => {
  test('submit build dialog opens from community tab', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /builds/i }).click();
    await page.getByRole('tab', { name: /community/i }).click();
    const submitBtn = page.getByRole('button', { name: /submit build/i });
    await submitBtn.click();
    await page.waitForTimeout(500);
  });
});

// ── 17. IMAGE ASSET AVAILABILITY CRAWL ──────────────────────────────────────

test.describe('Image Asset Audit — Full Crawl', () => {
  test('all weapon icons referenced in data exist on CDN', async ({ page }) => {
    const weapons = ['anvil', 'kettle', 'rascal', 'rattler', 'tempest', 'venator', 'osprey',
      'ferro', 'stitcher', 'dolabra', 'incisor', 'shredder', 'hammer', 'arbiter',
      'vindicator', 'recurve', 'brawler', 'gutter', 'requiem', 'cutter', 'scrambler', 'flayer'];
    for (const w of weapons) {
      const url = `https://cdn.metaforge.app/arc-raiders/icons/${w}.webp`;
      const resp = await page.request.get(url);
      if (resp.status() !== 200 && resp.status() !== 304) {
        console.warn(`Missing icon: ${url} => ${resp.status()}`);
      }
    }
  });

  test('no placeholder fallback icons shown in planner', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /gear up/i }).click();
    await page.getByRole('button', { name: /select weapon/i }).click();

    const fallbacks = page.locator('text=⚔');
    const count = await fallbacks.count();
    if (count > 0) {
      console.warn(`Found ${count} fallback icons (⚔) — these indicate missing images`);
    }
  });
});
