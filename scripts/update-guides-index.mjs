import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const DIR = dirname(fileURLToPath(import.meta.url));
const guidesIndex = resolve(DIR, '..', 'public', 'guides', 'index.html');
let html = readFileSync(guidesIndex, 'utf-8');

const roleSection = '<div class="guide-links" style="margin-top:2rem;padding-top:1rem;border-top:2px solid var(--accent)">' +
  '<h2 style="color:var(--accent);font-size:1.25rem">Browse by Playstyle</h2>' +
  '<p>Not sure what to play? Find the perfect loadout for your preferred playstyle.</p>' +
  '<ul>' +
  '<li><a href="/guides/meta/pvp-aggressor/"><strong>PvP Aggressor</strong> <span style="color:var(--text-dim)">\u2014 Dominate player fights</span></a></li>' +
  '<li><a href="/guides/meta/pve-farmer/"><strong>PvE Farmer</strong> <span style="color:var(--text-dim)">\u2014 Max loot per extract</span></a></li>' +
  '<li><a href="/guides/meta/stealth/"><strong>Stealth</strong> <span style="color:var(--text-dim)">\u2014 Stay undetected</span></a></li>' +
  '<li><a href="/guides/meta/budget/"><strong>Budget / Starter</strong> <span style="color:var(--text-dim)">\u2014 Minimal investment</span></a></li>' +
  '<li><a href="/guides/meta/boss-killer/"><strong>Boss Killer</strong> <span style="color:var(--text-dim)">\u2014 Take down high-value targets</span></a></li>' +
  '<li><a href="/guides/meta/cqb/"><strong>Close Quarters</strong> <span style="color:var(--text-dim)">\u2014 Dominate indoor fights</span></a></li>' +
  '<li><a href="/guides/meta/solo/"><strong>Solo</strong> <span style="color:var(--text-dim)">\u2014 Self-sufficient loadouts</span></a></li>' +
  '<li><a href="/guides/meta/endgame/"><strong>Endgame Meta</strong> <span style="color:var(--text-dim)">\u2014 Zero-compromise gear</span></a></li>' +
  '<li><a href="/guides/meta/new-player/"><strong>New Player</strong> <span style="color:var(--text-dim)">\u2014 Start here</span></a></li>' +
  '<li><a href="/guides/meta/support/"><strong>Support / Breacher</strong> <span style="color:var(--text-dim)">\u2014 Team utility builds</span></a></li>' +
  '</ul></div></div>';

html = html.replace('</div></body></html>', roleSection + '</body></html>');
writeFileSync(guidesIndex, html, 'utf-8');
console.log('Updated guides/index.html with role links');
