import type { VercelRequest, VercelResponse } from '@vercel/node';
import { weapons } from '../src/data/weapons.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.json({ weapons });
}
