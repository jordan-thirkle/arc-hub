import { readFileSync } from 'fs';
const data = readFileSync('src/data/weapons.ts', 'utf-8');
const idRegex = /id: '([^']+)'/g;
const ids = [...data.matchAll(idRegex)].map(m => m[1]);

console.log(`Total weapons: ${ids.length}`);
console.log('\nAll weapon names and tiers:\n');

// Extract each weapon block
const weaponBlocks = data.split(/\n  w\({/).slice(1);
for (const block of weaponBlocks) {
  const idMatch = block.match(/id: '([^']+)'/);
  if (!idMatch) continue;
  const id = idMatch[1];
  const nameMatch = block.match(/name: '([^']+)'/);
  const clsMatch = block.match(/class: '([^']+)'/);
  const name = nameMatch ? nameMatch[1] : '?';
  const cls = clsMatch ? clsMatch[1] : '?';

  // Extract all damage values
  const damages = [...block.matchAll(/damage: ([0-9.]+)/g)].map(m => parseFloat(m[1]));
  const range = [...block.matchAll(/range: ([0-9.]+)/g)].map(m => parseFloat(m[1]));
  const agility = [...block.matchAll(/agility: ([0-9.]+)/g)].map(m => parseFloat(m[1]));
  const stealth = [...block.matchAll(/stealth: ([0-9.]+)/g)].map(m => parseFloat(m[1]));

  console.log(`${id} (${name}, ${cls})`);
  console.log(`  Damage:  ${damages.join(', ')}`);
  console.log(`  Range:   ${range.join(', ')}`);
  console.log(`  Agility: ${agility.join(', ')}`);
  console.log(`  Stealth: ${stealth.join(', ')}`);
  console.log();
}
