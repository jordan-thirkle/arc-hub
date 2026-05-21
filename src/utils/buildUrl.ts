import LZString from 'lz-string';
import type { Build, WeaponTier, AttachmentSlot } from '../types';

interface URLData {
  v: 3;
  w: string;
  wt: number;
  wa: [string, string | null][];
  s?: string;
  st?: number;
  sa?: [string, string | null][];
  a?: string;
  sh?: string;
  q: (string | null)[];
}

function encode(str: string): string {
  return LZString.compressToEncodedURIComponent(str);
}

function decode(str: string): string | null {
  const result = LZString.decompressFromEncodedURIComponent(str);
  if (result === null || result === undefined || result === '') return null;
  return result;
}

export function encodeBuild(build: Omit<Build, 'id' | 'createdAt'>): string {
  const data: URLData = {
    v: 3,
    w: build.primaryWeaponId,
    wt: build.primaryTier,
    wa: build.primaryAttachments.map(a => [a.slot, a.attachmentId]),
    q: build.quickUseItems,
  };
  if (build.secondaryWeaponId) {
    data.s = build.secondaryWeaponId;
    data.st = build.secondaryTier;
  }
  if (build.secondaryAttachments?.length) {
    data.sa = build.secondaryAttachments.map(a => [a.slot, a.attachmentId]);
  }
  if (build.augmentId) data.a = build.augmentId;
  if (build.shieldId) data.sh = build.shieldId;
  return encode(JSON.stringify(data));
}

export function decodeBuild(hash: string): Omit<Build, 'id' | 'createdAt'> | null {
  try {
    const json = decode(hash);
    if (!json) return null;
    const data: URLData = JSON.parse(json);
    if (!data.w || data.v !== 3) return null;
    return {
      name: '',
      primaryWeaponId: data.w,
      primaryTier: (data.wt ?? 0) as WeaponTier,
      primaryAttachments: (data.wa ?? []).map(([slot, id]) => ({ slot: slot as AttachmentSlot, attachmentId: id })),
      secondaryWeaponId: data.s,
      secondaryTier: data.st as WeaponTier | undefined,
      secondaryAttachments: (data.sa ?? []).map(([slot, id]) => ({ slot: slot as AttachmentSlot, attachmentId: id })),
      augmentId: data.a,
      shieldId: data.sh,
      quickUseItems: data.q ?? [],
      notes: '',
    };
  } catch {
    return null;
  }
}

export function getBuildFromUrl(): Omit<Build, 'id' | 'createdAt'> | null {
  const params = new URLSearchParams(window.location.search);
  const hash = params.get('b');
  if (!hash) return null;
  return decodeBuild(hash);
}

export function getShareUrl(build: Omit<Build, 'id' | 'createdAt'>): string {
  const encoded = encodeBuild(build);
  const url = new URL(window.location.href);
  url.searchParams.set('b', encoded);
  return url.toString();
}
