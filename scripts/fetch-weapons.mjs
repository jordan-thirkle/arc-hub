import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const DIR = dirname(fileURLToPath(import.meta.url));
const API = 'https://metaforge.app/api/arc-raiders/items';

const SUBCLASS_MAP = {
  'Pistol': 'Pistol', 'Hand Cannon': 'Hand Cannon',
  'SMG': 'SMG', 'Assault Rifle': 'Assault Rifle',
  'Battle Rifle': 'Battle Rifle', 'Sniper Rifle': 'Sniper Rifle',
  'Shotgun': 'Shotgun', 'LMG': 'LMG', 'Special': 'Special',
};

const AMMO_MAP = {
  'light': 'light', 'medium': 'medium', 'heavy': 'heavy',
  'shotgun': 'shotgun', 'energy': 'energy', 'launcher': 'launcher',
};

// Fallback data for weapons the API doesn't have stats for
const FALLBACK = {
  'aphelion-rifle': { name: 'Aphelion Rifle', cls: 'Battle Rifle', ammo: 'energy', mode: '2-Round Burst',
    desc: 'Energy BR. Low ammo consumption, high precision.', rarity: 'Legendary',
    dmg: 60, fr: 9, rng: 76, mag: 10, weight: 11, val: [3500, 6000, 9500, 14000],
    ver: 16, hor: 10, ads: 0.5, rel: 2.0, bv: 700, disp: 0.7, slots: ['underbarrel', 'stock'] },
  'canto': { name: 'Canto', cls: 'SMG', ammo: 'medium', mode: 'Full-Auto',
    desc: 'Fully automatic submachine gun with a larger caliber.', rarity: 'Rare',
    dmg: 6.5, fr: 56.7, rng: 51, mag: 18, weight: 4, val: [7000, 10000, 13000, 17000],
    ver: 20, hor: 18, ads: 0.38, rel: 1.9, bv: 420, disp: 2.3, slots: ['muzzle', 'underbarrel', 'medium-magazine', 'stock'] },
  'dolabra': { name: 'Dolabra', cls: 'Shotgun', ammo: 'energy', mode: 'Semi-Auto',
    desc: 'An experimental weapon that can either fire a wide short range blast, or be focused to fire a tight medium range beam of heat.', rarity: 'Legendary',
    dmg: 0, fr: 0, rng: 0, mag: 8, weight: 8, val: [0, 0, 0, 27500],
    ver: 0, hor: 0, ads: 1, rel: 0, bv: 0, disp: 0, slots: [] },
};

function tierIndex(id) {
  const m = id.match(/-(i{1,4}|iv)$/);
  if (!m) return 0;
  const s = m[1];
  if (s === 'i') return 0;
  if (s === 'ii') return 1;
  if (s === 'iii' || s === 'iiii') return 2;
  if (s === 'iv') return 3;
  return 0;
}

function baseName(id) { return id.replace(/-(i{1,4}|iv)$/, ''); }

function tierLabel(idx) { return ['I', 'II', 'III', 'IV'][idx]; }

function cleanName(name) {
  return name.replace(/ I+$/, '').replace(/ IV$/, '').replace(/ III$/, '').replace(/ II$/, '').replace(/ I$/, '');
}

async function fetchAllItems() {
  const all = [];
  let page = 1;
  while (true) {
    const url = `${API}?type=Weapon&limit=100&page=${page}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    all.push(...json.data.filter(x => x.item_type === 'Weapon'));
    if (!json.pagination.hasNextPage) break;
    page++;
  }
  return all;
}

async function main() {
  console.log('Fetching weapons from MetaForge API...');
  const items = await fetchAllItems();
  console.log(`Fetched ${items.length} weapon items.`);

  const groups = new Map();
  for (const item of items) {
    const base = baseName(item.id);
    if (!groups.has(base)) groups.set(base, []);
    groups.get(base).push(item);
  }
  console.log(`Grouped into ${groups.size} base weapons.\n`);

  const records = [];

  for (const [base, tierItems] of groups) {
    const resolved = [];
    for (let i = 0; i < 4; i++) {
      const item = tierItems.find(t => tierIndex(t.id) === i);
      resolved[i] = item || tierItems[tierItems.length - 1];
    }

    const t0 = resolved[0] || tierItems[0];
    if (!t0) continue;

    // Check if API has stats or we need fallback
    const fb = FALLBACK[base];

    const subcategory = (t0.subcategory || '').trim();
    const weaponClass = SUBCLASS_MAP[subcategory] || fb?.cls || 'Special';
    const ammoType = AMMO_MAP[(t0.ammo_type || '').toLowerCase()] || (fb ? AMMO_MAP[fb.ammo] || 'energy' : 'medium');

    const tData = [];
    for (let i = 0; i < 4; i++) {
      const item = resolved[i];
      const sb = item.stat_block || {};
      const hasApiStats = sb.damage > 0 || sb.fireRate > 0;

      let dmg, fr, rng, mag, wgt, val, agi, stab, stea, ver, hor, ads, rel, bv, disp;

      if (hasApiStats) {
        dmg = sb.damage || 0;
        fr = sb.fireRate || 0;
        rng = sb.range || 0;
        mag = sb.magazineSize || 0;
        wgt = sb.weight || 0;
        val = item.value || 0;
        agi = sb.agility || 0;
        stab = sb.stability || 0;
        stea = sb.stealth || 0;
        ver = 0; hor = 0; ads = 0; rel = 0; bv = 0; disp = 0;
      } else if (fb) {
        const t = i;
        const tMult = 1 + t * 0.07;
        const rMult = 1 - t * 0.07;
        dmg = Math.round(fb.dmg * tMult * 10) / 10;
        fr = fb.fr;
        rng = fb.rng;
        mag = fb.mag + t * 4;
        wgt = fb.weight;
        val = fb.val[t];
        agi = 0; stab = 0; stea = 0;
        ver = Math.round(fb.ver * rMult * 10) / 10;
        hor = Math.round(fb.hor * rMult * 10) / 10;
        ads = Math.round(fb.ads * (1 + t * 0.05) * 10) / 10;
        rel = Math.round(fb.rel * (1 - t * 0.05) * 10) / 10;
        bv = fb.bv;
        disp = Math.round(fb.disp * rMult * 10) / 10;
      } else {
        continue;
      }

      tData.push({
        tier: i,
        label: tierLabel(i),
        stats: { damage: dmg, fireRate: fr, range: rng, dps: Math.round(dmg * fr * 10) / 10, magSize: mag, verticalRecoil: ver, horizontalRecoil: hor, adsSpeed: ads, reloadSpeed: rel, bulletVelocity: bv, dispersion: disp, agility: agi, stability: stab, stealth: stea },
        value: val,
        weight: wgt,
      });
    }

    const fname = t0.name;
    records.push({
      id: base,
      name: fb ? fb.name : cleanName(fname),
      class: weaponClass,
      ammoType,
      firingMode: fb?.mode || '',
      image: t0.icon,
      description: t0.description || fb?.desc || '',
      rarity: t0.rarity || fb?.rarity || 'Common',
      tiers: tData,
      slots: fb?.slots || ['muzzle', 'underbarrel', 'stock'],
    });
  }

  // Generate TypeScript
  const lines = [];
  lines.push('import type { Weapon, WeaponTier, WeaponStat, WeaponClass, AmmoType, AttachmentSlot } from \'../types\';');
  lines.push('');
  lines.push('const w = (d: {');
  lines.push('  id: string; name: string; class: WeaponClass; ammoType: AmmoType;');
  lines.push('  firingMode: string; description: string; rarity: Weapon[\'rarity\'];');
  lines.push('  image: string;');
  lines.push('  tiers: { tier: WeaponTier; label: string; stats: WeaponStat; value: number; weight: number }[];');
  lines.push('  attachmentSlots: AttachmentSlot[]; compatibleAttachments: string[];');
  lines.push('}): Weapon => ({ ...d });');
  lines.push('');

  lines.push('export const weapons: Weapon[] = [');

  for (const r of records) {
    lines.push('  w({');
    lines.push(`    id: '${r.id}',`);
    lines.push(`    name: '${r.name}',`);
    lines.push(`    class: '${r.class}',`);
    lines.push(`    ammoType: '${r.ammoType}',`);
    lines.push(`    firingMode: '${r.firingMode}',`);
    lines.push(`    image: '${r.image}',`);
    lines.push(`    description: ${JSON.stringify(r.description)},`);
    lines.push(`    rarity: '${r.rarity}',`);
    lines.push('    tiers: [');
    for (const t of r.tiers) {
      lines.push('      { tier: ' + t.tier + ', label: \'' + t.label + '\', stats: {');
      const s = t.stats;
      lines.push('        damage: ' + s.damage + ', fireRate: ' + s.fireRate + ', range: ' + s.range + ', dps: ' + s.dps + ',');
      lines.push('        magSize: ' + s.magSize + ', verticalRecoil: ' + s.verticalRecoil + ', horizontalRecoil: ' + s.horizontalRecoil + ',');
      lines.push('        adsSpeed: ' + s.adsSpeed + ', reloadSpeed: ' + s.reloadSpeed + ', bulletVelocity: ' + s.bulletVelocity + ', dispersion: ' + s.dispersion + ',');
      lines.push('        agility: ' + s.agility + ', stability: ' + s.stability + ', stealth: ' + s.stealth + ',');
      lines.push('      }, value: ' + t.value + ', weight: ' + t.weight + ' },');
    }
    lines.push('    ],');
    lines.push(`    attachmentSlots: [${r.slots.map(s => `'${s}'`).join(', ')}],`);
    lines.push('    compatibleAttachments: [],');
    lines.push('  }),');
  }

  lines.push('];');
  lines.push('');
  lines.push('export function getWeaponById(id: string): Weapon | undefined { return weapons.find(w => w.id === id); }');
  lines.push('export function getWeaponsByClass(className: WeaponClass): Weapon[] { return weapons.filter(w => w.class === className); }');

  const outPath = resolve(DIR, '..', 'src', 'data', 'weapons.ts');
  writeFileSync(outPath, lines.join('\n'), 'utf-8');
  console.log(`\nWritten: ${outPath}`);
  console.log(`  ${records.length} weapons`);
  console.log(`  ${records.filter(r => r.tiers.some(t => t.stats.damage > 0)).length} with API stats`);
  console.log(`  ${records.filter(r => r.tiers.every(t => t.stats.damage === 0)).length} fallback weapons`);
}

main().catch(err => { console.error(err); process.exit(1); });
