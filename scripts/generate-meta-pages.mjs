import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const DIR = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(DIR, '..', 'public', 'guides', 'meta');
mkdirSync(OUT, { recursive: true });

const APP_URL = 'https://arc-hub.vercel.app';

function h(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function page(title, desc, canonical, body, faq = []) {
  const faqJson = faq.length ? `,"mainEntity":[${faq.map(f => `{"@type":"Question","name":${JSON.stringify(h(f.q))},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(h(f.a))}}}`).join(',')}]` : '';
  return '<!DOCTYPE html>' +
'<html lang="en"><head>' +
'<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>' +
'<title>' + h(title) + '</title>' +
'<meta name="description" content="' + h(desc) + '"/>' +
'<meta property="og:title" content="' + h(title) + '"/>' +
'<meta property="og:description" content="' + h(desc) + '"/>' +
'<meta property="og:type" content="article"/>' +
'<meta property="og:url" content="' + APP_URL + canonical + '"/>' +
'<meta name="twitter:card" content="summary_large_image"/>' +
'<meta property="og:image" content="' + APP_URL + '/og-image.svg"/>' +
'<meta name="twitter:image" content="' + APP_URL + '/og-image.svg"/>' +
'<link rel="canonical" href="' + APP_URL + canonical + '"/>' +
'<script type="application/ld+json">' +
'{"@context":"https://schema.org","@type":"Article","headline":' + JSON.stringify(h(title)) + ',"description":' + JSON.stringify(h(desc)) + ',"author":{"@type":"Person","name":"ARC Raiders Loadout Planner"}' + faqJson +
'}</script>' +
'<style>' +
'*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}' +
':root{--bg:#0A0E14;--surface:#12171F;--border:#1E2630;--text:#C8D0D8;--text-dim:#6B7A8C;--accent:#E8A832;--font:Inter,system-ui,sans-serif;--font-heading:"Barlow Condensed","Arial Narrow",sans-serif;--font-mono:"JetBrains Mono",Consolas,monospace}' +
'body{background:var(--bg);color:var(--text);font-family:var(--font);line-height:1.6;-webkit-font-smoothing:antialiased}' +
'.container{max-width:800px;margin:0 auto;padding:2rem 1rem}' +
'h1,h2,h3{font-family:var(--font-heading);font-weight:700;letter-spacing:-0.01em;color:#fff}' +
'h1{font-size:2.5rem;margin-bottom:.5rem}' +
'h2{font-size:1.5rem;margin-top:2rem;margin-bottom:.75rem;padding-bottom:.25rem;border-bottom:1px solid var(--border)}' +
'h3{font-size:1.1rem;margin-top:1.25rem;margin-bottom:.5rem;color:var(--accent)}' +
'h4{color:var(--text);font-family:var(--font-heading);margin-top:1rem;margin-bottom:.25rem}' +
'p{margin-bottom:.75rem;color:var(--text)}' +
'a{color:var(--accent);text-underline-offset:2px}' +
'a:hover{color:#F0C04A}' +
'.meta{display:flex;gap:.75rem;flex-wrap:wrap;margin-bottom:1.5rem;font-size:.875rem}' +
'.meta span{padding:.2rem .6rem;border:1px solid var(--border);font-family:var(--font-mono);font-size:.75rem;text-transform:uppercase;letter-spacing:.05em}' +
'.planner-btn{display:inline-block;background:var(--accent);color:var(--bg);padding:.75rem 1.5rem;font-family:var(--font-heading);font-weight:700;font-size:1.1rem;text-transform:uppercase;letter-spacing:.05em;text-decoration:none;cursor:pointer;transition:opacity .2s;margin-top:.5rem}' +
'.planner-btn:hover{opacity:.9;color:var(--bg)}' +
'.stats{width:100%;border-collapse:collapse;margin:1rem 0;font-family:var(--font-mono);font-size:.8125rem}' +
'.stats th,.stats td{padding:.4rem .6rem;text-align:left;border-bottom:1px solid var(--border)}' +
'.stats th{color:var(--text-dim);font-size:.7rem;text-transform:uppercase;letter-spacing:.1em;font-weight:600}' +
'ul,ol{margin:.5rem 0 1rem 1.5rem}' +
'li{margin-bottom:.3rem}' +
'.card{border:1px solid var(--border);background:var(--surface);padding:1.25rem;margin:1rem 0}' +
'.card h3{margin-top:0}' +
'.rating{color:var(--accent);font-family:var(--font-heading);font-size:1.25rem}' +
'.weapon-row{display:flex;align-items:flex-start;gap:1rem;padding:.75rem 0;border-bottom:1px solid var(--border)}' +
'.weapon-row:last-child{border-bottom:none}' +
'.weapon-row img{width:48px;height:48px;object-fit:contain;flex-shrink:0}' +
'.weapon-row .info{flex:1}' +
'.weapon-row .info .name{font-family:var(--font-heading);font-size:1.1rem;color:#fff}' +
'.weapon-row .info .why{font-size:.875rem;color:var(--text);margin-top:.25rem}' +
'.back-link{display:inline-block;margin-bottom:1rem;font-size:.875rem;text-transform:uppercase;letter-spacing:.05em}' +
'.guide-links{margin-top:2rem;padding-top:1rem;border-top:1px solid var(--border)}' +
'.guide-links h3{color:#fff}' +
'.guide-links ul{display:flex;flex-wrap:wrap;gap:.5rem;list-style:none;margin:.5rem 0 0 0}' +
'.guide-links li{margin:0}' +
'.guide-links a{display:block;padding:.3rem .8rem;border:1px solid var(--border);font-family:var(--font-mono);font-size:.8125rem;text-decoration:none}' +
'.guide-links a:hover{border-color:var(--accent)}' +
'.tier-list{list-style:none;margin:.5rem 0;padding:0}' +
'.tier-list li{padding:.4rem .6rem;margin-bottom:.25rem;border-left:3px solid var(--accent);background:var(--surface)}' +
'.faq-item{margin:1rem 0;padding:1rem;border:1px solid var(--border);background:var(--surface)}' +
'.faq-item h3{cursor:pointer;margin:0}' +
'.faq-item p{margin-top:.5rem}' +
'@media(max-width:600px){h1{font-size:1.75rem}.container{padding:1rem .75rem}}' +
'</style></head><body><div class="container">' + body + '</div></body></html>';
}

const ALL_WEAPON_SLUGS = ['kettle', 'rattler', 'tempest', 'osprey', 'venator', 'rascal', 'anvil', 'bobcat', 'burletta', 'ferro', 'hairpin', 'stitcher', 'il-toro', 'vulcano', 'canto', 'renegade', 'jupiter', 'torrente', 'equalizer', 'hullcracker', 'aphelion-rifle', 'arpeggio', 'bettina', 'dolabra'];

const WEAPON_INFO = {
  kettle: { name: 'Kettle', img: 'https://cdn.metaforge.app/arc-raiders/icons/kettle-i.webp', class: 'Assault Rifle', ammo: 'Light', dps: 280, cost: 840 },
  rattler: { name: 'Rattler', img: 'https://cdn.metaforge.app/arc-raiders/icons/rattler-i.webp', class: 'Assault Rifle', ammo: 'Medium', dps: 299.7, cost: 1750 },
  tempest: { name: 'Tempest', img: 'https://cdn.metaforge.app/arc-raiders/icons/tempest-i.webp', class: 'Assault Rifle', ammo: 'Medium', dps: 367, cost: 13000 },
  osprey: { name: 'Osprey', img: 'https://cdn.metaforge.app/arc-raiders/icons/osprey-i.webp', class: 'Sniper Rifle', ammo: 'Medium', dps: 796.5, cost: 7000 },
  venator: { name: 'Venator', img: 'https://cdn.metaforge.app/arc-raiders/icons/venator-i.webp', class: 'Pistol', ammo: 'Medium', dps: 660.6, cost: 7000 },
  rascal: { name: 'Rascal', img: 'https://cdn.metaforge.app/arc-raiders/icons/rascal.webp', class: 'Grenade Launcher', ammo: 'Launcher', dps: 960, cost: 8000 },
  anvil: { name: 'Anvil', img: 'https://cdn.metaforge.app/arc-raiders/icons/anvil-i.webp', class: 'Hand Cannon', ammo: 'Heavy', dps: 652, cost: 5000 },
  bobcat: { name: 'Bobcat', img: 'https://cdn.metaforge.app/arc-raiders/icons/bobcat-ii.webp', class: 'SMG', ammo: 'Light', dps: 400.2, cost: 13000 },
  burletta: { name: 'Burletta', img: 'https://cdn.metaforge.app/arc-raiders/icons/burletta-i.webp', class: 'Pistol', ammo: 'Light', dps: 280, cost: 2900 },
  ferro: { name: 'Ferro', img: 'https://cdn.metaforge.app/arc-raiders/icons/ferro-i.webp', class: 'Battle Rifle', ammo: 'Heavy', dps: 264, cost: 475 },
  hairpin: { name: 'Hairpin', img: 'https://cdn.metaforge.app/arc-raiders/icons/hairpin-i.webp', class: 'Pistol', ammo: 'Light', dps: 180, cost: 450 },
  stitcher: { name: 'Stitcher', img: 'https://cdn.metaforge.app/arc-raiders/icons/stitcher-ii.webp', class: 'SMG', ammo: 'Light', dps: 317.1, cost: 800 },
  'il-toro': { name: 'Il Toro', img: 'https://cdn.metaforge.app/arc-raiders/icons/il%20Toro-i.webp', class: 'Shotgun', ammo: 'Shotgun', dps: 965.3, cost: 5000 },
  vulcano: { name: 'Vulcano', img: 'https://cdn.metaforge.app/arc-raiders/icons/vulcano-i.webp', class: 'Shotgun', ammo: 'Shotgun', dps: 1301.9, cost: 10000 },
  canto: { name: 'Canto', img: 'https://cdn.metaforge.app/arc-raiders/icons/canto.webp', class: 'SMG', ammo: 'Medium', dps: 368.6, cost: 7000 },
  renegade: { name: 'Renegade', img: 'https://cdn.metaforge.app/arc-raiders/icons/renegade-i.webp', class: 'Battle Rifle', ammo: 'Medium', dps: 735, cost: 7000 },
  jupiter: { name: 'Jupiter', img: 'https://cdn.metaforge.app/arc-raiders/icons/jupiter-i.webp', class: 'Sniper Rifle', ammo: 'Heavy', dps: 460.2, cost: 27500 },
  torrente: { name: 'Torrente', img: 'https://cdn.metaforge.app/arc-raiders/icons/torrente-i.webp', class: 'LMG', ammo: 'Medium', dps: 466.4, cost: 7000 },
  equalizer: { name: 'Equalizer', img: 'https://cdn.metaforge.app/arc-raiders/icons/equalizer-i.webp', class: 'Special', ammo: 'Energy', dps: 266.6, cost: 27500 },
  hullcracker: { name: 'Hullcracker', img: 'https://cdn.metaforge.app/arc-raiders/icons/hullcracker.webp', class: 'Special', ammo: 'Launcher', dps: 2030, cost: 10000 },
  'aphelion-rifle': { name: 'Aphelion Rifle', img: 'https://cdn.metaforge.app/arc-raiders/icons/aphelion-rifle.webp', class: 'Battle Rifle', ammo: 'Energy', dps: 540, cost: 3500 },
  arpeggio: { name: 'Arpeggio', img: 'https://cdn.metaforge.app/arc-raiders/icons/arpeggio-i.webp', class: 'Assault Rifle', ammo: 'Medium', dps: 82.6, cost: 5500 },
  bettina: { name: 'Bettina', img: 'https://cdn.metaforge.app/arc-raiders/icons/bettina-i.webp', class: 'Assault Rifle', ammo: 'Heavy', dps: 448, cost: 8000 },
  dolabra: { name: 'Dolabra', img: 'https://cdn.metaforge.app/arc-raiders/icons/dolabra.webp', class: 'Shotgun', ammo: 'Energy', dps: 0, cost: 0 },
};

function weaponLink(slug) {
  const w = WEAPON_INFO[slug];
  const name = w ? w.name : slug.charAt(0).toUpperCase() + slug.slice(1);
  return '<a href="/guides/' + slug + '/">' + h(name) + '</a>';
}

function weaponRow(slug, rank, why) {
  const w = WEAPON_INFO[slug];
  if (!w) return '';
  return '<div class="weapon-row">' +
    '<img src="' + w.img + '" alt="' + h(w.name) + '" loading="lazy"/>' +
    '<div class="info">' +
    '<div class="name">#' + rank + ' — <a href="/guides/' + slug + '/">' + h(w.name) + '</a> <span style="color:var(--text-dim);font-size:.8125rem;font-family:var(--font-mono)">(' + h(w.class) + ' · ' + h(w.ammo) + ' · ' + w.dps + ' DPS)</span></div>' +
    '<div class="why">' + h(why) + '</div>' +
    '</div></div>';
}

const ROLES = [
  {
    slug: 'pvp-aggressor',
    title: 'Best PvP Aggressor Builds in ARC Raiders [Patch v1.29]',
    desc: 'Dominate player encounters with the highest-damage PvP loadouts in ARC Raiders. Our top-rated PvP Aggressor builds for Rattler, Anvil, Rascal, and more — optimized for player elimination.',
    h1: 'Best PvP Aggressor Builds in ARC Raiders',
    intro: 'PvP Aggressor builds prioritize high burst damage, quick time-to-kill (TTK), and aggressive playstyles. These loadouts are designed to eliminate other players fast and secure their loot. For Patch v1.29, the meta favors heavy-hitting weapons with shield penetration and high DPS.',
    weapons: [
      { slug: 'rattler', rank: 1, why: 'Rattler III with compensator + vertical grip + stable stock delivers the best DPS-to-cost ratio for PvP. The full-auto spray with near-zero recoil makes it the definitive PvP weapon for aggressive players.' },
      { slug: 'anvil', rank: 2, why: 'Anvil III with compensator + vertical grip + stable stock is the highest-rated PvP build (4.9/5). Patch 1.29.0 reduced Anvil horizontal recoil by 15%, making it more accurate than ever. One-tap potential with headshots.' },
      { slug: 'rascal', rank: 3, why: 'Rascal I with heavy shield delivers devastating 120 base splash damage. The single-shot grenade launcher one-shots unshielded targets and clears groups. Introduced in v1.29.0 Nomadic Envoy patch.' },
      { slug: 'bobcat', rank: 4, why: 'Bobcat IV with 66.7 fire rate shreds at close range. The high agility (73.1) lets you strafe faster than opponents can track. Best SMG for aggressive CQB PvP.' },
      { slug: 'canto', rank: 5, why: 'Canto IV with medium ammo and 447.9 DPS provides consistent full-auto damage at SMG range. The medium caliber penetrates light shields more effectively than light ammo SMGs.' },
    ],
    faq: [
      { q: 'What is the best PvP weapon in ARC Raiders?', a: 'The Rattler III with compensator, vertical grip, and stable stock is widely considered the best PvP weapon. It offers 299.7 DPS with near-zero recoil at a reasonable 5000c cost.' },
      { q: 'What attachments are best for PvP in ARC Raiders?', a: 'For PvP, prioritize recoil control attachments: Compensator (muzzle), Vertical Grip (underbarrel), and Stable Stock (stock). These minimize spray pattern for consistent headshot accuracy.' },
      { q: 'Is the Rascal good for PvP?', a: 'Yes — the Rascal grenade launcher (introduced in v1.29.0) is devastating in PvP. Its 120 base damage one-shots unshielded targets, and splash damage flushes out campers. Pair with a Heavy Shield for aggressive pushes.' },
    ],
    guideLinks: ['kettle', 'rattler', 'tempest', 'osprey', 'venator', 'rascal', 'anvil'],
  },
  {
    slug: 'pve-farmer',
    title: 'Best PvE Farming Builds in ARC Raiders [Patch v1.29]',
    desc: 'Maximize your loot per extract with the best PvE farming loadouts. Our Tempest PvE Farmer, Hullcracker, and Torrente builds optimized for ARC enemy clearing and efficient looting.',
    h1: 'Best PvE Farming Builds in ARC Raiders',
    intro: 'PvE Farming builds focus on sustained DPS against ARC enemies, high magazine capacity for extended fights, and utility items for maximum loot extraction. Speed and efficiency are the priorities.',
    weapons: [
      { slug: 'tempest', rank: 1, why: 'Tempest II with extended medium mag (31 rounds), angled grip, and scanner augment is the ultimate PvE farming build. Highest AR DPS at 367 with the Scanner revealing loot and enemies through walls.' },
      { slug: 'hullcracker', rank: 2, why: 'Hullcracker I deals 100 damage with 2030 DPS against ARC enemies. Its explosives only detonate against ARC, making it a PvE-specific powerhouse. 5-round mag with fast 20.3 fire rate.' },
      { slug: 'torrente', rank: 3, why: 'Torrente III with 80-round magazine provides the largest sustained fire capacity for PvE. Crouch for pinpoint accuracy. Excellent for clearing rooms of ARC enemies without reloading.' },
      { slug: 'stitcher', rank: 4, why: 'Stitcher I at only 800c is the budget PvE option. Decent 317.1 DPS and light weight (5kg) leaves plenty of carry capacity for loot.' },
    ],
    faq: [
      { q: 'What is the best PvE weapon in ARC Raiders?', a: 'The Tempest II with extended medium mag is the best PvE weapon. Its 367 DPS combined with 31-round magazine and Scanner augment for detecting loot makes it ideal for farming.' },
      { q: 'What augments are best for PvE farming?', a: 'The Scanner augment is the best for PvE farming — it reveals loot containers and enemy positions through walls. Pressure Regulator is a good alternative for combat-focused farming.' },
      { q: 'What quick-use items should I bring for PvE?', a: 'Bring lockpicks for high-value containers, energy drink for sprint stamina, and an advanced medkit for emergency healing. Shield cells help against unexpected PvP encounters.' },
    ],
    guideLinks: ['kettle', 'rattler', 'tempest', 'osprey', 'venator', 'rascal', 'anvil'],
  },
  {
    slug: 'stealth',
    title: 'Best Stealth Builds in ARC Raiders [Patch v1.29]',
    desc: 'Stay hidden and strike first with the best stealth loadouts. Osprey Stealth Sniper, Hairpin silent pistol, and Renegade builds for undetected gameplay.',
    h1: 'Best Stealth Builds in ARC Raiders',
    intro: 'Stealth builds prioritize silence, high single-shot damage, and positioning over raw DPS. These loadouts let you eliminate targets before they know you\'re there, using silencers, high stealth stats, and tactical positioning.',
    weapons: [
      { slug: 'osprey', rank: 1, why: 'Osprey IV with silencer + signal jammer augment is the definitive stealth build. The silencer keeps you off minimaps, and Signal Jammer prevents enemy proximity detection. 45 damage one-shots unarmored heads.' },
      { slug: 'hairpin', rank: 2, why: 'Hairpin I comes with a built-in silencer and the highest stealth stat in the game at 70. At only 450c, it\'s the cheapest stealth option. 20 damage per shot at 180 DPS — ideal for stealth finishers.' },
      { slug: 'renegade', rank: 3, why: 'Renegade III with 735 DPS and excellent 85.7 stability provides high-damage stealth kills. The lever-action is quiet and accurate. Pairs well with a silencer attachment.' },
      { slug: 'venator', rank: 4, why: 'Venator III with vertical grip + extended mag and Focus augment tightens the burst grouping for stealthy two-tap eliminations. Light weight (5kg) keeps you mobile.' },
    ],
    faq: [
      { q: 'What is the best stealth weapon in ARC Raiders?', a: 'The Osprey IV with silencer provides the best stealth experience. Its 45 base damage one-shots unarmored enemies to the head, and the Signal Jammer augment prevents detection.' },
      { q: 'Does the Hairpin have a built-in silencer?', a: 'Yes — the Hairpin is the only weapon in ARC Raiders with a built-in silencer. Combined with its 70 stealth stat (highest in the game), it\'s the best budget stealth option at 450c.' },
      { q: 'What augments are best for stealth gameplay?', a: 'Signal Jammer prevents enemy radar/proximity detection in a radius. Focus tightens shot grouping for follow-up shots. Both are excellent for stealth-oriented builds.' },
    ],
    guideLinks: ['kettle', 'rattler', 'tempest', 'osprey', 'venator', 'rascal', 'anvil'],
  },
  {
    slug: 'budget',
    title: 'Best Budget / Starter Builds in ARC Raiders [Patch v1.29]',
    desc: 'Start extracting with minimal investment. Our budget loadouts for Kettle, Stitcher, Ferro, and Burletta — all under 3000c with viable PvP and PvE performance.',
    h1: 'Best Budget / Starter Builds in ARC Raiders',
    intro: 'Budget builds let you start extracting with minimal financial risk. These weapons cost under 3000c and can be insured cheaply. Perfect for new players learning maps and extraction points.',
    weapons: [
      { slug: 'kettle', rank: 1, why: 'Kettle I at 840c is the cheapest viable weapon in ARC Raiders. Semi-auto with 280 DPS and a vertical grip eliminates most recoil. The ultimate starter weapon.' },
      { slug: 'stitcher', rank: 2, why: 'Stitcher I at 800c is actually cheaper than the Kettle. Full-auto SMG with 317.1 DPS and light weight (5kg). Better close-range performance than the Kettle for the same price.' },
      { slug: 'ferro', rank: 3, why: 'Ferro I at only 475c is the cheapest weapon in the game. Single-shot battle rifle with 264 DPS and 40 damage per shot. Packs a punch for its price, but requires reloading every shot.' },
      { slug: 'burletta', rank: 4, why: 'Burletta I at 2900c offers 280 DPS with fast fire rate and light weight (4kg). Semi-auto pistol with decent accuracy. Reliable secondary or primary for extreme budget runs.' },
    ],
    faq: [
      { q: 'What is the cheapest weapon in ARC Raiders?', a: 'The Ferro I at 475c is the cheapest weapon. It\'s a break-action battle rifle with 40 damage per shot. Requires reloading after every shot but delivers heavy damage for its cost.' },
      { q: 'What is the best budget weapon in ARC Raiders?', a: 'The Kettle I (840c) is the best budget weapon. Semi-automatic with 280 DPS, a vertical grip eliminates recoil. Affordable, reliable, and effective against both PvE and PvP targets.' },
      { q: 'Should I insure budget weapons?', a: 'Yes — always insure budget weapons. Even a 840c Kettle is worth protecting if you\'ve looted valuable items. Insurance guarantees a return on your minimal investment.' },
    ],
    guideLinks: ['kettle', 'rattler', 'tempest', 'osprey', 'venator', 'rascal', 'anvil'],
  },
  {
    slug: 'boss-killer',
    title: 'Best Boss Killer Builds in ARC Raiders [Patch v1.29]',
    desc: 'Take down bosses and high-value targets with specialized loadouts. Jupiter sniper, Anvil hand cannon, Rascal grenade launcher, and Osprey builds optimized for boss DPS.',
    h1: 'Best Boss Killer Builds in ARC Raiders',
    intro: 'Boss Killer builds maximize single-target damage output. These weapons excel at sustained damage against high-HP targets, with high DPS, penetration, and range to engage boss enemies safely.',
    weapons: [
      { slug: 'jupiter', rank: 1, why: 'Jupiter IV with 60 base damage and 820 bullet velocity is the premier boss sniper. Heavy ammo penetrates armor effectively. 460.2 DPS at long range keeps you safe from boss mechanics.' },
      { slug: 'anvil', rank: 2, why: 'Anvil IV with kinetic converter deals +5 bonus damage per shot. Heavy ammo with best-in-class shield penetration. The compensator + stable stock makes follow-up shots consistent.' },
      { slug: 'rascal', rank: 3, why: 'Rascal IV deals 155 damage per shot — the highest in the game. Splash damage can hit weak points even without direct aim. 1240 DPS makes short work of any boss.' },
      { slug: 'osprey', rank: 4, why: 'Osprey IV with 796.5 DPS and extended medium mag (14 rounds) provides sustained boss DPS at range. Use painkillers to steady aim during extended boss fights.' },
    ],
    faq: [
      { q: 'What is the best weapon for killing bosses in ARC Raiders?', a: 'The Jupiter IV sniper rifle deals 60 base damage with 820 bullet velocity and heavy ammo penetration — ideal for sustained boss DPS at safe distances.' },
      { q: 'Is the Rascal good for boss fights?', a: 'Yes — the Rascal IV deals 155 damage per shot with splash damage that can hit boss weak points. However, the single-round magazine means precise timing is critical.' },
    ],
    guideLinks: ['kettle', 'rattler', 'tempest', 'osprey', 'venator', 'rascal', 'anvil'],
  },
  {
    slug: 'cqb',
    title: 'Best Close Quarters Builds in ARC Raiders [Patch v1.29]',
    desc: 'Dominate indoor fights and tight spaces with close quarters loadouts. Il Toro shotgun, Vulcano, Bobcat SMG, and Venator pistol builds for CQB supremacy.',
    h1: 'Best Close Quarters Builds in ARC Raiders',
    intro: 'Close Quarters Battle (CQB) builds excel in tight spaces, buildings, and indoor engagements. These weapons prioritize high burst damage at short range with fast handling and high agility.',
    weapons: [
      { slug: 'il-toro', rank: 1, why: 'Il Toro III with 965.3 DPS and 67.5 damage per shot dominates CQB. Pump-action shotgun with wide spread ensures hits in tight spaces. 7-round mag for multi-kill potential.' },
      { slug: 'vulcano', rank: 2, why: 'Vulcano III has the highest DPS in the game at 1301.9. Semi-auto shotgun with 6-round mag and fast 26.3 fire rate. Melts enemies at close range before they can react.' },
      { slug: 'bobcat', rank: 3, why: 'Bobcat IV with 66.7 fire rate and 73.1 agility provides the fastest strafe speed. The high fire rate with light ammo shreds unarmored targets in milliseconds.' },
      { slug: 'venator', rank: 4, why: 'Venator III with 660.6 DPS and 5kg weight is the best pistol for CQB. Two-shot burst catches enemies off guard. Pairs with any primary as a deadly secondary.' },
      { slug: 'rascal', rank: 5, why: 'Rascal I with 120 base splash damage flushes out campers and clears rooms in one shot. The area denial makes it invaluable for pushing buildings.' },
    ],
    faq: [
      { q: 'What is the best shotgun in ARC Raiders?', a: 'Vulcano III has the highest DPS at 1301.9 with semi-auto fire. Il Toro III offers more consistent damage with 965.3 DPS and better handling. Both excel at close range.' },
      { q: 'What is the best CQB SMG?', a: 'Bobcat IV with 66.7 fire rate and 73.1 agility is the best SMG for CQB. Its high strafe speed lets you dodge while firing — essential in tight quarter fights.' },
    ],
    guideLinks: ['kettle', 'rattler', 'tempest', 'osprey', 'venator', 'rascal', 'anvil'],
  },
  {
    slug: 'new-player',
    title: 'ARC Raiders Starter Guide — Best Builds for New Players [Patch v1.29]',
    desc: 'New to ARC Raiders? Start with the best beginner loadouts. Our starter guide covers Kettle, Stitcher, Ferro, and Burletta builds — all under 3000c with step-by-step recommendations.',
    h1: 'ARC Raiders Starter Guide — Best Builds for New Players',
    intro: 'New to ARC Raiders? These starter builds minimize financial risk while teaching you map layouts, extraction mechanics, and combat fundamentals. All recommended weapons cost under 3000c.',
    weapons: [
      { slug: 'kettle', rank: 1, why: 'Kettle I (840c) is the perfect starter weapon. Semi-auto teaches aim discipline. Vertical grip eliminates recoil. Affordable insurance means you never go broke learning.' },
      { slug: 'stitcher', rank: 2, why: 'Stitcher I (800c) is even cheaper than Kettle. Full-auto SMG is forgiving for new players learning spray control. Light weight leaves room for loot.' },
      { slug: 'ferro', rank: 3, why: 'Ferro I (475c) teaches positioning and shot discipline. Single-shot forces you to make each shot count. Devastating 40 damage when you land hits.' },
      { slug: 'burletta', rank: 4, why: 'Burletta I (2900c) transitions well into mid-game. Fast fire rate semi-auto with 4kg weight. Teaches trigger control for more advanced semi-auto weapons.' },
    ],
    faq: [
      { q: 'What should I buy first in ARC Raiders?', a: 'Start with a Kettle I (840c) and a vertical grip. Add a bandage and energy drink to quick-use. Extract once, then reinvest in a Rattler I (1750c) for full-auto capability.' },
      { q: 'What is the best starter weapon?', a: 'Kettle I is the best starter weapon. At 840c it\'s affordable, the semi-auto fire teaches accuracy, and vertical grip eliminates recoil. Upgrade to Rattler as you accumulate wealth.' },
      { q: 'What skills should new players prioritize?', a: 'Sprint Efficiency (S-Tier) for stamina uptime, Weight Training (S-Tier) for more loot capacity, and Vitality (S-Tier) for extra survivability. These three skills help new players extract more consistently.' },
    ],
    guideLinks: ['kettle', 'rattler', 'tempest', 'osprey', 'venator', 'rascal', 'anvil'],
  },
  {
    slug: 'endgame',
    title: 'Best Endgame Meta Builds in ARC Raiders [Patch v1.29]',
    desc: 'The definitive endgame meta for Patch v1.29 Nomadic Envoy. Top-tier Anvil, Tempest, Jupiter, Rascal, and Canto builds for max-gear players. Zero-compromise loadouts.',
    h1: 'Best Endgame Meta Builds in ARC Raiders [Patch v1.29]',
    intro: 'Endgame meta builds represent the absolute best gear money can buy. These zero-compromise loadouts use the highest tier weapons, rarest attachments, and most expensive augments. For Patch v1.29 Nomadic Envoy, five weapons define the endgame.',
    weapons: [
      { slug: 'anvil', rank: 1, why: 'Anvil IV (13000c) with kinetic converter, compensator + vertical grip + stable stock is the highest-rated build at 4.9/5. 40 base damage with heavy ammo penetration. Patch 1.29.0 recoil buff makes it a laser.' },
      { slug: 'tempest', rank: 2, why: 'Tempest IV (27000c) with extended mag, angled grip, compensator provides 367 DPS with 25-round mag. The highest AR DPS with excellent handling. Scanner augment for endgame efficiency.' },
      { slug: 'jupiter', rank: 3, why: 'Jupiter IV (27500c) is the endgame sniper. 60 damage with 820 bullet velocity and 0.5 dispersion for pinpoint accuracy. Legendary rarity with best-in-class range.' },
      { slug: 'rascal', rank: 4, why: 'Rascal IV (22000c) deals 155 damage per shot with splash radius. The v1.29.0 meta-defining grenade launcher. Available from Ermal for 1,000,000c or find in raid.' },
      { slug: 'canto', rank: 5, why: 'Canto IV (17000c) with 447.9 DPS and 30-round mag is the endgame SMG. Medium ammo penetration with excellent handling. The perfect CQB secondary.' },
    ],
    faq: [
      { q: 'What is the best endgame weapon in ARC Raiders?', a: 'Anvil IV with Kinetic Converter tech mod is the best endgame weapon. 40 base damage with heavy ammo penetration, 4.9/5 rating, and the v1.29.0 recoil buff makes it exceptionally accurate.' },
      { q: 'What is the most expensive weapon in ARC Raiders?', a: 'The Jupiter IV and Equalizer IV both cost 27,500c. The Rascal IV blueprint from Ermal costs 1,000,000c. These represent the endgame gear ceiling.' },
      { q: 'Is the Rascal worth the 1,000,000c from Ermal?', a: 'The Rascal IV deals 155 damage with 1240 DPS — the highest single-shot damage in the game. If you play aggressively and use heavy shields, the Rascal is worth every credit.' },
    ],
    guideLinks: ['kettle', 'rattler', 'tempest', 'osprey', 'venator', 'rascal', 'anvil'],
  },
  {
    slug: 'solo',
    title: 'Best Solo Builds in ARC Raiders [Patch v1.29]',
    desc: 'Survive and thrive solo with self-sufficient loadouts. Best solo builds for ARC Raiders featuring versatile weapons, shields, and utility items for lone wolf gameplay.',
    h1: 'Best Solo Builds in ARC Raiders',
    intro: 'Solo builds require self-sufficiency — you have no teammates to revive you, cover your flanks, or share loot. These loadouts prioritize versatility, survivability, and the ability to handle any situation.',
    weapons: [
      { slug: 'tempest', rank: 1, why: 'Tempest II with scanner augment is the best solo weapon. Scanner reveals threats through walls — critical when you have no teammates watching your back. 367 DPS handles both PvE and PvP.' },
      { slug: 'rattler', rank: 2, why: 'Rattler III with medium shield provides excellent solo survivability. The full-auto spray is forgiving in stressful 1vX situations. Medium shield gives 70 charge with only 5% move penalty.' },
      { slug: 'osprey', rank: 3, why: 'Osprey IV with silencer + signal jammer lets solo players engage on their terms. Pick targets from distance, relocate, and avoid detection. The ultimate solo stealth loadout.' },
      { slug: 'anvil', rank: 4, why: 'Anvil III with medium shield rewards precision play. One-tap headshots eliminate threats quickly in solo engagements. Heavy ammo penetrates multiple targets.' },
    ],
    faq: [
      { q: 'What is the best solo weapon in ARC Raiders?', a: 'Tempest II with Scanner augment is the best solo weapon. The Scanner reveals threats through walls — giving you critical intel that solo players usually lack without teammates.' },
      { q: 'What shield is best for solo play?', a: 'Medium Shield is the best solo choice. 70 charge with only 5% movement penalty provides good protection without compromising your ability to reposition.' },
      { q: 'What skills are essential for solo players?', a: 'Sprint Efficiency for repositioning, Vitality for extra HP, Fast Heal for quicker med usage, and Agile for movement speed. These four skills maximize solo survivability.' },
    ],
    guideLinks: ['kettle', 'rattler', 'tempest', 'osprey', 'venator', 'rascal', 'anvil'],
  },
  {
    slug: 'support',
    title: 'Best Support / Breacher Builds in ARC Raiders [Patch v1.29]',
    desc: 'Control the battlefield with support and breacher loadouts. Tempest scanner, Rascal area denial, Equalizer suppression, and hullcracker builds for team-oriented play.',
    h1: 'Best Support / Breacher Builds in ARC Raiders',
    intro: 'Support and breacher builds provide utility for the team — area denial, enemy detection, suppressive fire, and breaching capabilities. These loadouts control engagements and create opportunities for teammates.',
    weapons: [
      { slug: 'tempest', rank: 1, why: 'Tempest II with scanner augment provides wall-hack intel for your entire squad. Reveal enemy positions and loot through walls. 367 DPS keeps you combat-effective while supporting.' },
      { slug: 'rascal', rank: 2, why: 'Rascal I with heavy shield is the ultimate breacher. Clear rooms with one shot, suppress enemies behind cover, and create entry points. The splash damage zone-denial is invaluable for team pushes.' },
      { slug: 'equalizer', rank: 3, why: 'Equalizer IV with 266.6 DPS and 50-round magazine provides sustained suppressive fire. Energy ammo with tracer rounds helps teammates track targets. Best for locking down sightlines.' },
      { slug: 'hullcracker', rank: 4, why: 'Hullcracker I with 2030 DPS against ARC and 5-round mag clears PvE threats for your team. The explosive rounds only hit ARC, making it safe for close-team support.' },
    ],
    faq: [
      { q: 'What is the best support weapon in ARC Raiders?', a: 'Tempest with Scanner augment is the best support weapon. It provides wall-hack intel for the whole team, revealing enemy positions and loot containers through obstacles.' },
      { q: 'Is the Equalizer good for support?', a: 'Yes — the Equalizer\'s 50-round magazine and energy tracer rounds provide excellent suppressive fire. Teammates can track targets through walls by following the tracers.' },
    ],
    guideLinks: ['kettle', 'rattler', 'tempest', 'osprey', 'venator', 'rascal', 'anvil'],
  },
];

// Build each role page
for (const role of ROLES) {
  const weaponsHtml = role.weapons.map(w => weaponRow(w.slug, w.rank, w.why)).join('');
  const faqHtml = role.faq.map(f =>
    '<div class="faq-item"><h3>' + h(f.q) + '</h3><p>' + h(f.a) + '</p></div>'
  ).join('');
  const guideLinks = role.guideLinks.map(s => '<li><a href="/guides/' + s + '/">' + h(WEAPON_INFO[s]?.name || s) + '</a></li>').join('');

  const body =
    '<a href="/guides/meta/" class="back-link">&larr; All Build Guides by Role</a>' +
    '<h1>' + role.h1 + '</h1>' +
    '<p class="meta"><span>Role Guide</span><span>Patch v1.29</span></p>' +
    '<p>' + role.intro + '</p>' +
    '<h2>Top Weapons for This Role</h2>' +
    weaponsHtml +
    '<a href="/" class="planner-btn" target="_blank">Open Loadout Planner</a>' +
    '<h2>Frequently Asked Questions</h2>' +
    faqHtml +
    '<div class="guide-links">' +
    '<h3>Weapon Guides</h3>' +
    '<ul>' + guideLinks + '</ul>' +
    '<h3 style="margin-top:1rem">More Role Guides</h3>' +
    '<ul>' + ROLES.filter(r => r.slug !== role.slug).map(r => '<li><a href="/guides/meta/' + r.slug + '/">' + h(r.title.split(' [')[0]) + '</a></li>').join('') + '</ul></div>';

  const dir = resolve(OUT, role.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'index.html'), page(role.title, role.desc, '/guides/meta/' + role.slug + '/', body, role.faq), 'utf-8');
  console.log('  guides/meta/' + role.slug + '/index.html');
}

// Index page for /guides/meta/
const indexBody =
  '<a href="/guides/" class="back-link">&larr; All Guides</a>' +
  '<h1>ARC Raiders Build Guides by Role</h1>' +
  '<p>Find the best loadouts for every playstyle in ARC Raiders. Each role guide ranks weapons by their suitability and provides detailed recommendations for attachments, augments, shields, and skills.</p>' +
  '<p>Open any build directly in the <a href="' + APP_URL + '">ARC Raiders Loadout Planner</a> to customize further.</p>' +
  '<div class="guide-links"><h3>Browse by Role</h3><ul>' +
  ROLES.map(r => '<li><a href="/guides/meta/' + r.slug + '/"><strong>' + h(r.title.split(' [')[0]) + '</strong> <span style="color:var(--text-dim)">— ' + h(r.weapons[0]?.slug ? WEAPON_INFO[r.weapons[0].slug]?.name : '') + ', ' + h(r.weapons[1]?.slug ? WEAPON_INFO[r.weapons[1].slug]?.name : '') + ', and more</span></a></li>').join('') +
  '</ul></div>' +
  '<p style="margin-top:2rem;font-size:0.875rem;color:var(--text-dim)">Data sourced from MetaForge API. Stats may change with game updates. Updated for Patch v1.29 Nomadic Envoy.</p>';

writeFileSync(resolve(OUT, 'index.html'), page(
  'ARC Raiders Build Guides by Role — Best Loadouts for Every Playstyle',
  'Find the best ARC Raiders loadouts for every playstyle. PvP Aggressor, PvE Farmer, Stealth, Budget, Boss Killer, CQB, and Endgame builds — ranked and optimized.',
  '/guides/meta/',
  indexBody
), 'utf-8');
console.log('  guides/meta/index.html');

console.log('\nDone. ' + (ROLES.length + 1) + ' meta pages written.');
