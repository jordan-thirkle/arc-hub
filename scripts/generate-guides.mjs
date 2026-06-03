import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import LZString from 'lz-string';

const DIR = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(DIR, '..', 'public', 'guides');
mkdirSync(OUT, { recursive: true });

const APP_URL = 'https://arc-hub.vercel.app';

function encode(str) { return LZString.compressToEncodedURIComponent(str); }
function buildUrl(w, wt, wa, a, sh, q) {
  const data = { v: 3, w, wt, wa: wa.map(x => [x.slot, x.id]), q };
  if (a) data.a = a;
  if (sh) data.sh = sh;
  return APP_URL + '/?b=' + encode(JSON.stringify(data));
}

function h(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function page(title, desc, canonical, body) {
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
'{"@context":"https://schema.org","@type":"Article","headline":"' + h(title.replace(/"/g,'\\"')) + '","description":"' + h(desc.replace(/"/g,'\\"')) + '","author":{"@type":"Person","name":"ARC Raiders Loadout Planner"}}' +
'</script>' +
'<style>' +
'*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}' +
':root{--bg:#0A0E14;--surface:#12171F;--border:#1E2630;--text:#C8D0D8;--text-dim:#6B7A8C;--accent:#E8A832;--font:Inter,system-ui,sans-serif;--font-heading:"Barlow Condensed","Arial Narrow",sans-serif;--font-mono:"JetBrains Mono",Consolas,monospace}' +
'body{background:var(--bg);color:var(--text);font-family:var(--font);line-height:1.6;-webkit-font-smoothing:antialiased}' +
'.container{max-width:800px;margin:0 auto;padding:2rem 1rem}' +
'h1,h2,h3{font-family:var(--font-heading);font-weight:700;letter-spacing:-0.01em;color:#fff}' +
'h1{font-size:2.5rem;margin-bottom:.5rem}' +
'h2{font-size:1.5rem;margin-top:2rem;margin-bottom:.75rem;padding-bottom:.25rem;border-bottom:1px solid var(--border)}' +
'h3{font-size:1.1rem;margin-top:1.25rem;margin-bottom:.5rem;color:var(--accent)}' +
'p{margin-bottom:.75rem;color:var(--text)}' +
'a{color:var(--accent);text-underline-offset:2px}' +
'a:hover{color:#F0C04A}' +
'.meta{display:flex;gap:.75rem;flex-wrap:wrap;margin-bottom:1.5rem;font-size:.875rem}' +
'.meta span{padding:.2rem .6rem;border:1px solid var(--border);font-family:var(--font-mono);font-size:.75rem;text-transform:uppercase;letter-spacing:.05em}' +
'.hero-img{width:100%;max-width:200px;margin:1rem auto;display:block;border:1px solid var(--border)}' +
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
'.back-link{display:inline-block;margin-bottom:1rem;font-size:.875rem;text-transform:uppercase;letter-spacing:.05em}' +
'.guide-links{margin-top:2rem;padding-top:1rem;border-top:1px solid var(--border)}' +
'.guide-links h3{color:#fff}' +
'.guide-links ul{display:flex;flex-wrap:wrap;gap:.5rem;list-style:none;margin:.5rem 0 0 0}' +
'.guide-links li{margin:0}' +
'.guide-links a{display:block;padding:.3rem .8rem;border:1px solid var(--border);font-family:var(--font-mono);font-size:.8125rem;text-decoration:none}' +
'.guide-links a:hover{border-color:var(--accent)}' +
'@media(max-width:600px){h1{font-size:1.75rem}.container{padding:1rem .75rem}}' +
'</style></head><body><div class="container">' + body + '</div></body></html>';
}

function renderGuide(g) {
  const plannerUrl = buildUrl(g.slug, g.bestTier, g.bestAttachments, g.bestAugment, g.bestShield, g.bestQuickUse);
  const ammoColor = g.ammo === 'Light' ? '#8BC34A' : g.ammo === 'Medium' ? '#FFC107' : '#F44336';
  const title = g.metaBuildName + ' \u2014 Best ' + g.name + ' Loadout in ARC Raiders [Patch v1.29]';
  const desc = g.metaDesc + ' ' + g.name + ' ' + g.class + ' guide with attachments, augments, shields, skills, and crafting.';
  const tierLabel = ['I','II','III','IV'][g.bestTier];

  const attHtml = g.bestAttachments.map(a => a.id.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())).join(', ') || 'None';
  const augHtml = g.bestAugment ? g.bestAugment.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase()) : 'None';
  const shieldHtml = g.bestShield ? g.bestShield.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase()) : 'None';
  const quHtml = g.bestQuickUse.filter(Boolean).join(', ') || 'None';
  const guideSlugs = ['kettle','rattler','tempest','osprey','venator','rascal','anvil'];
  const guList = guideSlugs
    .filter(s => s !== g.slug)
    .map(s => '<li><a href="/guides/' + s + '/">' + s.charAt(0).toUpperCase() + s.slice(1) + '</a></li>')
    .join('');

  const body =
    '<a href="/guides/" class="back-link">&larr; All Guides</a>' +
    '<h1>Best ' + h(g.name) + ' Loadout in ARC Raiders</h1>' +
    '<p class="meta"><span>' + h(g.class) + '</span><span style="color:' + ammoColor + ';border-color:' + ammoColor + '44">' + h(g.ammo) + ' Ammo</span><span>Patch v1.26</span></p>' +
    '<p>' + h(g.desc) + '</p>' +
    '<img src="' + g.img + '" alt="' + h(g.name) + '" class="hero-img" loading="eager"/>' +
    '<a href="' + plannerUrl + '" class="planner-btn" target="_blank">Open in Planner</a>' +

    '<h2>Recommended Loadout</h2>' +
    '<div class="card">' +
    '<h3>' + h(g.metaBuildName) + '</h3>' +
    '<p><span class="rating">' + h(g.metaRating) + '</span> &middot; ' + h(g.metaRole) + ' &middot; ' + h(g.name) + ' T' + tierLabel + '</p>' +
    '<p>' + h(g.metaDesc) + '</p>' +
    '<p><strong>Attachments:</strong> ' + attHtml + '</p>' +
    '<p><strong>Augment:</strong> ' + augHtml + '</p>' +
    '<p><strong>Shield:</strong> ' + shieldHtml + '</p>' +
    '<p><strong>Quick Use:</strong> ' + quHtml + '</p>' +
    '</div>' +
    '<a href="' + plannerUrl + '" class="planner-btn" target="_blank">Open This Build in Planner</a>' +

    '<h2>Why This Build Works</h2>' +
    '<ul>' + g.why.map(w => '<li>' + h(w) + '</li>').join('') + '</ul>' +

    '<h2>Pro Tips</h2>' +
    '<ul>' + g.tips.map(t => '<li>' + h(t) + '</li>').join('') + '</ul>' +

    '<h2>Skill Priority</h2>' +
    '<p>Allocate points in this order for maximum effectiveness with this build:</p>' +
    '<ol>' + g.skillPriority.map(s => '<li>' + h(s) + '</li>').join('') + '</ol>' +

    '<div class="guide-links">' +
    '<h3>More Loadout Guides</h3>' +
    '<ul>' + guList + '</ul></div>';

  return page(title, desc, '/guides/' + g.slug + '/', body);
}

const GUIDES = [
  { slug: 'kettle', name: 'Kettle', class: 'Assault Rifle', ammo: 'Light',
    img: 'https://cdn.metaforge.app/arc-raiders/icons/kettle-i.webp',
    desc: 'Semi-automatic assault rifle. Quick and accurate, but has low bullet velocity and takes a long time reload.',
    bestTier: 0, bestAttachments: [{ slot: 'underbarrel', id: 'vertical-grip-i' }],
    bestAugment: null, bestShield: null,
    bestQuickUse: ['bandage', 'energy-drink', null, null, null],
    metaBuildName: 'Kettle Budget Build', metaRole: 'Budget / Starter', metaRating: '4.2',
    metaDesc: 'The cheapest viable loadout in ARC Raiders. Kettle I with a vertical grip is all you need to start extracting.',
    why: ['Extremely cheap at 840c for Tier I \u2014 affordable after one successful extract',
      'Light ammo is the most abundant and cheapest ammunition type',
      'Low financial risk \u2014 easy to insure and replace',
      'Vertical grip eliminates most vertical recoil for accurate follow-up shots',
      'Great starter weapon for learning map layouts and extraction points'],
    tips: ['Pair with an energy drink for infinite sprint stamina while looting',
      'Aim for headshots \u2014 semi-auto rewards precision over spray',
      'Avoid long-range engagements (low bullet velocity makes leading shots harder)',
      'Upgrade to Rattler or Tempest as you accumulate wealth',
      'Insure Tier I \u2014 the 840c buy-in is worth protecting your run'],
    skillPriority: ['Sprint Efficiency (S) \u2014 less stamina drain for more uptime',
      'Weight Training (S) \u2014 carry more loot per extract',
      'Agile (S) \u2014 movement speed helps every engagement',
      'Vitality (S) \u2014 extra HP keeps you alive in budget gear'] },

  { slug: 'rattler', name: 'Rattler', class: 'Assault Rifle', ammo: 'Medium',
    img: 'https://cdn.metaforge.app/arc-raiders/icons/rattler-i.webp',
    desc: 'Fully automatic assault rifle. A cheap offensive option, but has to be reloaded 2 bullets at a time.',
    bestTier: 2, bestAttachments: [{slot:'muzzle',id:'compensator'},{slot:'underbarrel',id:'vertical-grip-i'},{slot:'stock',id:'stable-stock'}],
    bestAugment: 'pressure-regulator', bestShield: 'medium-shield',
    bestQuickUse: ['stim-shot', 'shield-cell', 'shield-cell', 'frag-grenade', 'bandage'],
    metaBuildName: 'Rattler PvP Meta', metaRole: 'PvP Aggressor', metaRating: '4.8',
    metaDesc: 'The definitive PvP build. Rattler III with compensator, vertical grip, and stable stock for maximum recoil control.',
    why: ['Rattler III is the sweet spot \u2014 affordable upgrade with significant mag size increase',
      'Compensator + Vertical Grip virtually eliminates spray pattern',
      'Stable Stock improves both recoil and ADS speed for snap aiming',
      'Pressure Regulator augment boosts combat performance under fire',
      'Medium Shield provides 70 charge with only 5% movement penalty'],
    tips: ['Use stim-shot before pushing a fight for the HP buffer',
      'The reload animation loads 2 bullets at a time \u2014 plan cover accordingly',
      'Pre-fire corners with the Rattler\'s full-auto to catch enemies off guard',
      'Carry 2 shield cells \u2014 you will need them in extended firefights'],
    skillPriority: ['Recoil Compensation (S) \u2014 tighter spray for the Rattler',
      'Snap Aim (S) \u2014 faster ADS wins PvP fights',
      'Sprint Efficiency (S) \u2014 rotate faster between engagements',
      'Fast Heal (S) \u2014 quicker med usage in combat'] },

  { slug: 'tempest', name: 'Tempest', class: 'Assault Rifle', ammo: 'Medium',
    img: 'https://cdn.metaforge.app/arc-raiders/icons/tempest-i.webp',
    desc: 'Fully automatic assault rifle with moderate fire rate and accuracy.',
    bestTier: 1, bestAttachments: [{slot:'muzzle',id:'compensator'},{slot:'underbarrel',id:'angled-grip'},{slot:'medium-magazine',id:'extended-medium-mag'}],
    bestAugment: 'scanner', bestShield: 'light-shield',
    bestQuickUse: ['med-kit-advanced', 'shield-cell', 'lockpick', 'lockpick', 'energy-drink'],
    metaBuildName: 'Tempest PvE Farmer', metaRole: 'PvE Farmer', metaRating: '4.6',
    metaDesc: 'Max efficiency loot farmer. Tempest II with extended medium mag for PvE clear speed.',
    why: ['Highest DPS among Assault Rifles at 367 base \u2014 melts ARC enemies',
      'Extended Medium Mag gives 31 rounds for sustained PvE fights',
      'Angled Grip improves ADS speed and dispersion for snap acquisition',
      'Scanner augment reveals loot containers and enemy positions through walls',
      'Light Shield keeps you mobile with zero movement penalty'],
    tips: ['Use the Scanner before entering loot rooms to check for threats',
      'Lockpicks open high-value containers \u2014 prioritize safes and weapon cases',
      'Tempest II is the value pick; Tier III+ has diminishing returns for PvE',
      'Focus on headshots against ARC enemies to conserve ammo'],
    skillPriority: ['Sprint Efficiency (S) \u2014 cover more ground while looting',
      'Weight Training (S) \u2014 maximize loot per extract',
      'Agile (S) \u2014 faster movement between POIs',
      'Vitality (S) \u2014 survive unexpected PvP encounters'] },

  { slug: 'osprey', name: 'Osprey', class: 'Sniper Rifle', ammo: 'Medium',
    img: 'https://cdn.metaforge.app/arc-raiders/icons/osprey-i.webp',
    desc: 'A scoped bolt-action sniper rifle with reliable damage output and accuracy.',
    bestTier: 3, bestAttachments: [{slot:'muzzle',id:'silencer'},{slot:'underbarrel',id:'angled-grip'},{slot:'medium-magazine',id:'extended-medium-mag'},{slot:'stock',id:'stable-stock'}],
    bestAugment: 'signal-jammer', bestShield: 'light-shield',
    bestQuickUse: ['stim-shot', 'painkiller', 'flashbang', 'smoke-grenade', 'bandage'],
    metaBuildName: 'Osprey Stealth Sniper', metaRole: 'Stealth', metaRating: '4.5',
    metaDesc: 'Stay hidden, take precise shots. Osprey IV with silencer, angled grip, stable stock. Signal Jammer augment to avoid detection.',
    why: ['Osprey IV one-shots unarmored enemies to the head (45 damage)',
      'Silencer keeps you off the minimap and audio range of other players',
      'Signal Jammer prevents enemy radar/proximity detection in a radius',
      'Stable Stock + Angled Grip make follow-up shots consistent',
      'Extended Medium Mag gives 14 rounds instead of 8 for the bolt-action'],
    tips: ['Relocate after every 2-3 shots \u2014 attentive players triangulate your position',
      'Flashbang + smoke grenade creates your own cover for rotation',
      'Pair with a Burletta II as secondary for close-range defense',
      'The silencer reduces bullet velocity; lead your shots more at distance'],
    skillPriority: ['Recoil Compensation (S) \u2014 steady aim for second shots',
      'Steady Hands (A) \u2014 reduce weapon sway while scoped',
      'Snap Aim (S) \u2014 faster scope-in for quick follow-up shots',
      'Light Step (B) \u2014 quieter movement between positions'] },

  { slug: 'venator', name: 'Venator', class: 'Pistol', ammo: 'Medium',
    img: 'https://cdn.metaforge.app/arc-raiders/icons/venator-i.webp',
    desc: 'Semi-automatic pistol that fires two shots at a time.',
    bestTier: 2, bestAttachments: [{slot:'underbarrel',id:'vertical-grip-i'},{slot:'medium-magazine',id:'extended-medium-mag'}],
    bestAugment: 'focus', bestShield: 'light-shield',
    bestQuickUse: ['stim-shot', 'shield-cell', 'bandage', 'lockpick', 'energy-drink'],
    metaBuildName: 'Venator Duo-Tap Pistol', metaRole: 'Budget / Flexible', metaRating: '4.0',
    metaDesc: 'High value-for-money secondary build. Venator II with vertical grip and extended medium mag.',
    why: ['Impressive 660 DPS for a pistol \u2014 competitive with ARs at close range',
      'Two-shot burst mode catches enemies off guard with burst damage',
      'Extremely light at 5kg \u2014 pairs well with any primary loadout',
      'Extended Medium Mag gives 16 rounds for sustained fighting',
      'Focus augment tightens shot grouping for the dual-burst pattern'],
    tips: ['Use as a secondary weapon for close-range backup',
      'The two-shot burst is devastating at close range \u2014 push aggressively',
      'Pairs well with Osprey or Ferro as a CQB sidearm',
      'Vertical grip is essential \u2014 the burst creates vertical climb'],
    skillPriority: ['Agile (S) \u2014 movement speed compensates for pistol range',
      'Nimble Fingers (S) \u2014 faster reload in extended fights',
      'Snap Aim (S) \u2014 quick swap-to-pistol speed matters',
      'Sprint Efficiency (S) \u2014 reposition while swapping weapons'] },

  { slug: 'rascal', name: 'Rascal', class: 'Grenade Launcher', ammo: 'Launcher',
    img: 'https://cdn.metaforge.app/arc-raiders/icons/rascal.webp',
    desc: 'Single-shot grenade launcher introduced with the Nomadic Envoy. Devastating explosive damage with significant splash radius.',
    bestTier: 0, bestAttachments: [],
    bestAugment: 'pressure-regulator', bestShield: 'heavy-shield',
    bestQuickUse: ['stim-shot', 'shield-cell', 'shield-cell', 'frag-grenade', 'bandage'],
    metaBuildName: 'Rascal Envoy Breacher', metaRole: 'PvP Aggressor', metaRating: '4.7',
    metaDesc: 'Heavy-hitting grenade launcher build. Rascal I with heavy shield. Unmatched area denial and burst damage.',
    why: ['Highest single-shot damage in the game at 120 base \u2014 one-shots unshielded targets',
      'Splash damage clears groups of ARC enemies instantly',
      'Heavy Shield provides 80 charge with 52.5% damage mitigation for aggressive play',
      'Pressure Regulator augment boosts survivability when brawling at close range',
      'Introduced in Patch 1.29.0 alongside Ermal \u2014 new meta defining weapon'],
    tips: ['Reload after every shot \u2014 the 1-round magazine means no second chance',
      'Use splash damage around corners to flush out campers',
      'Pair with a Rattler or Tempest secondary for follow-up clean-up',
      'The heavy shield is essential \u2014 you will be pushing into close combat',
      'Ammo is scarce \u2014 carry spare launcher ammo in your quick-use slots'],
    skillPriority: ['Toughness (S) \u2014 extra HP for close-range trades',
      'Iron Hide (S) \u2014 damage resistance stack with heavy shield',
      'Agile (S) \u2014 movement speed for closing distance',
      'Quick Recovery (A) \u2014 stamina regen for repositioning'] },

  { slug: 'anvil', name: 'Anvil', class: 'Hand Cannon', ammo: 'Heavy',
    img: 'https://cdn.metaforge.app/arc-raiders/icons/anvil-i.webp',
    desc: 'Single-action hand cannon with high damage output and headshot damage, but slow handling.',
    bestTier: 2, bestAttachments: [{slot:'muzzle',id:'compensator'},{slot:'underbarrel',id:'vertical-grip-i'},{slot:'stock',id:'stable-stock'}],
    bestAugment: 'kinetic-converter', bestShield: 'medium-shield',
    bestQuickUse: ['stim-shot', 'shield-cell', 'bandage', 'smoke-grenade', 'energy-drink'],
    metaBuildName: 'Anvil Stopping Power', metaRole: 'PvP Aggressor', metaRating: '4.9',
    metaDesc: 'Max damage powerhouse. Anvil III with compensator, vertical grip, and stable stock. Kinetic Converter tech mod for fire rate.',
    why: ['Highest single-shot damage per round at 40 base, boosted by heavy ammo penetration',
      'Patch 1.29.0 reduced Anvil horizontal recoil by 15% \u2014 significantly more accurate',
      'Kinetic Converter tech mod adds +5 damage and adjusts fire rate',
      'Heavy ammo penetrates shields more effectively than light/medium',
      'Compensator + Stable Stock makes the Anvil a laser at mid range'],
    tips: ['The Anvil rewards precision \u2014 aim for headshots to one-tap',
      'Pair with a close-range secondary for CQB situations',
      'The Kinetic Converter is expensive but transforms the Anvil into a powerhouse',
      'Use smoke grenades to close distance to mid-range where the Anvil excels'],
    skillPriority: ['Snap Aim (S) \u2014 faster ADS for quick hand cannon shots',
      'Recoil Compensation (S) \u2014 keep follow-up shots on target',
      'Steady Hands (A) \u2014 reduce weapon sway while acquiring targets',
      'Deadshot (A) \u2014 headshot damage multiplier for one-tap potential'] },
];

mkdirSync(OUT, { recursive: true });
for (const g of GUIDES) {
  const dir = resolve(OUT, g.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'index.html'), page(
    g.metaBuildName + ' \u2014 Best ' + g.name + ' Loadout in ARC Raiders [Patch v1.26]',
    g.metaDesc + ' ' + g.name + ' ' + g.class + ' guide with attachments, augments, shields, skills, and crafting.',
    '/guides/' + g.slug + '/',
    renderGuide(g)
  ), 'utf-8');
  console.log('  guides/' + g.slug + '/index.html');
}

// Index page
const indexBody = '<h1>ARC Raiders Loadout Guides</h1>' +
  '<p>Learn the best loadouts for every weapon in ARC Raiders. Each guide includes recommended attachments, augments, shields, quick-use items, and skill priorities.</p>' +
  '<p>Open any build directly in the <a href="' + APP_URL + '">ARC Raiders Loadout Planner</a> to customize further.</p>' +
  '<div class="guide-links"><h3>Weapon Guides</h3><ul>' +
  GUIDES.map(g => '<li><a href="/guides/' + g.slug + '/"><strong>' + h(g.name) + '</strong> <span style="color:var(--text-dim)">(' + h(g.metaRole) + ')</span></a></li>').join('') +
  '</ul></div>' +
  '<p style="margin-top:2rem;font-size:0.875rem;color:var(--text-dim)">Data sourced from MetaForge API. Stats may change with game updates. Updated for Patch v1.29.</p>';

writeFileSync(resolve(OUT, 'index.html'), page(
  'ARC Raiders Loadout Guides \u2014 Best Builds for Every Weapon',
  'Learn the best loadouts for every weapon in ARC Raiders. Weapon-specific guides with attachments, augments, shields, and skill recommendations.',
  '/guides/',
  indexBody
), 'utf-8');
console.log('  guides/index.html');

console.log('\nDone. ' + (GUIDES.length + 1) + ' pages written.');
