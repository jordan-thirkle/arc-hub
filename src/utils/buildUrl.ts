import type { AttachmentSlot, Build } from '../types';

export function encodeBuild(build: Omit<Build, 'id' | 'createdAt'>): string {
  const data = {
    w: build.weaponId,
    a: build.attachments,
  };
  const json = JSON.stringify(data);
  return btoa(encodeURIComponent(json));
}

export function decodeBuild(hash: string): { weaponId: string; attachments: Record<AttachmentSlot, string | null> } | null {
  try {
    const json = decodeURIComponent(atob(hash));
    const data = JSON.parse(json);
    return { weaponId: data.w, attachments: data.a };
  } catch {
    return null;
  }
}

export function getBuildFromUrl(): { weaponId: string; attachments: Record<AttachmentSlot, string | null> } | null {
  const params = new URLSearchParams(window.location.search);
  const build = params.get('build');
  if (!build) return null;
  return decodeBuild(build);
}

export function getShareUrl(build: Omit<Build, 'id' | 'createdAt'>): string {
  const encoded = encodeBuild(build);
  const url = new URL(window.location.href);
  url.searchParams.set('build', encoded);
  return url.toString();
}
