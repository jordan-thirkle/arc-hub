import { useState, useCallback, useEffect, lazy, Suspense, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { weapons, getWeaponById } from './data/weapons';
import { attachments } from './data/attachments';
import { augments } from './data/augments';
import { shields } from './data/shields';
import { quickUseItems } from './data/quickuse';
import { metaBuilds } from './data/metaBuilds';
import { craftingRecipes } from './data/crafting';
import {
  Header,
  WeaponSelector,
  AttachmentSlots,
  StatBreakdown,
  TTKCalculator,
  AugmentSelect,
  ShieldSelect,
  QuickUseSlots,
  BuildActions,
  SkillTreeViewer,
  PatchNotes,
  AdUnit,
  GearAffiliate,
  Hero,
  ErmalTracker,
  PatchAnalyzer,
} from './components';

const WeaponComparison = lazy(() =>
  import('./components/WeaponComparison').then(m => ({ default: m.WeaponComparison })),
);
const BuildSubmissionForm = lazy(() =>
  import('./components/BuildSubmissionForm').then(m => ({ default: m.BuildSubmissionForm })),
);
const SkillGraphView = lazy(() => import('./components/SkillGraphView').then(m => ({ default: m.SkillGraphView })));
import { useBuild } from './hooks/useBuild';
import { useSkills } from './hooks/useSkills';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useCommunityBuilds } from './hooks/useCommunityBuilds';
import { useVotes } from './hooks/useVotes';
import { getBuildFromUrl, encodeBuild } from './utils/buildUrl';
import { filterBuilds, getUniqueRoles, filterCommunityBuilds } from './utils/filters';

import { calculateMaterialsForItems } from './utils/crafting';
import { getRecommendedAllocation } from './utils/skills';
import { patches, latestPatch } from './data/patches';
import type { Build, WeaponTier, BuildRole } from './types';
import { Toast, showToast } from './components/Toast';
import { AMMO_COLORS, SLOT_LABELS } from './types';

const tabVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export default function App() {
  const [activeTab, setActiveTab] = useState('planner');
  const {
    build,
    setPrimaryWeapon,
    setPrimaryAttachment,
    setSecondaryWeapon,
    setSecondaryAttachment,
    setAugment,
    setShield,
    setQuickUseItem,
    setName,
    setNotes,
    reset,
  } = useBuild();
  const { allocation, totalPoints, remainingPoints, addPoint, removePoint, resetSkills } = useSkills();
  const [savedBuilds, setSavedBuilds] = useLocalStorage<Build[]>('ar-saved-builds', []);

  const [dbTab, setDbTab] = useState('weapons');
  const [weaponSearch, setWeaponSearch] = useState('');
  const [buildRole, setBuildRole] = useState<BuildRole | 'all'>('all');
  const [buildSort, setBuildSort] = useState<'rating' | 'votes' | 'newest'>('rating');
  const [craftQueue, setCraftQueue] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [buildsTab, setBuildsTab] = useState<'meta' | 'community'>('meta');
  const [communityFilter, setCommunityFilter] = useState<'all' | 'official' | 'community'>('all');
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [skillView, setSkillView] = useState<'list' | 'graph'>('list');

  const { builds: communityBuilds, submitBuild } = useCommunityBuilds();
  const { userVotes, setVote } = useVotes();

  const navigateToPatches = useCallback(() => {
    setActiveTab('database');
    setDbTab('patches');
  }, []);

  useEffect(() => {
    const fromUrl = getBuildFromUrl();
    if (fromUrl) {
      setPrimaryWeapon(fromUrl.primaryWeaponId, fromUrl.primaryTier);
      for (const att of fromUrl.primaryAttachments) setPrimaryAttachment(att.slot, att.attachmentId);
      if (fromUrl.secondaryWeaponId) {
        setSecondaryWeapon(fromUrl.secondaryWeaponId, fromUrl.secondaryTier);
        for (const att of fromUrl.secondaryAttachments ?? []) setSecondaryAttachment(att.slot, att.attachmentId);
      }
      if (fromUrl.augmentId) setAugment(fromUrl.augmentId);
      if (fromUrl.shieldId) setShield(fromUrl.shieldId);
      fromUrl.quickUseItems.forEach((id, i) => setQuickUseItem(i, id));
    }
  }, [
    setPrimaryWeapon,
    setPrimaryAttachment,
    setSecondaryWeapon,
    setSecondaryAttachment,
    setAugment,
    setShield,
    setQuickUseItem,
  ]);

  const primaryWeapon = getWeaponById(build.primaryWeaponId);
  const secondaryWeapon = build.secondaryWeaponId ? getWeaponById(build.secondaryWeaponId) : undefined;
  const selectedAugment = build.augmentId ? augments.find(a => a.id === build.augmentId) : undefined;
  const selectedShield = build.shieldId ? shields.find(s => s.id === build.shieldId) : undefined;

  const primaryWeight = primaryWeapon ? primaryWeapon.tiers[build.primaryTier]?.weight ?? 0 : 0;
  const secondaryWeight = secondaryWeapon && build.secondaryTier !== undefined ? secondaryWeapon.tiers[build.secondaryTier]?.weight ?? 0 : 0;
  const shieldWeight = selectedShield ? selectedShield.weight : 0;
  const quickUseWeight = build.quickUseItems.reduce((sum, id) => {
    if (!id) return sum;
    const item = quickUseItems.find(q => q.id === id);
    return sum + (item?.weight ?? 0);
  }, 0);
  const totalWeight = primaryWeight + secondaryWeight + shieldWeight + quickUseWeight;

  const primaryCost = primaryWeapon ? primaryWeapon.tiers[build.primaryTier]?.value ?? 0 : 0;
  const secondaryCost = secondaryWeapon && build.secondaryTier !== undefined ? secondaryWeapon.tiers[build.secondaryTier]?.value ?? 0 : 0;
  const totalCost = primaryCost + secondaryCost;

  const handleSave = useCallback(
    (name: string) => {
      const newBuild: Build = { ...build, id: generateId(), createdAt: new Date().toISOString(), name };
      setSavedBuilds(prev => [newBuild, ...prev]);
    },
    [build, setSavedBuilds],
  );

  const handleLoad = useCallback(
    (saved: Build) => {
      setPrimaryWeapon(saved.primaryWeaponId, saved.primaryTier);
      for (const att of saved.primaryAttachments) setPrimaryAttachment(att.slot, att.attachmentId);
      if (saved.secondaryWeaponId) {
        setSecondaryWeapon(saved.secondaryWeaponId, saved.secondaryTier);
        for (const att of saved.secondaryAttachments ?? []) setSecondaryAttachment(att.slot, att.attachmentId);
      }
      if (saved.augmentId) setAugment(saved.augmentId);
      if (saved.shieldId) setShield(saved.shieldId);
      saved.quickUseItems.forEach((id, i) => setQuickUseItem(i, id));
      setActiveTab('planner');
    },
    [
      setPrimaryWeapon,
      setPrimaryAttachment,
      setSecondaryWeapon,
      setSecondaryAttachment,
      setAugment,
      setShield,
      setQuickUseItem,
    ],
  );

  const handleLoadMetaBuild = useCallback(
    (buildData: Omit<Build, 'id' | 'createdAt'>) => {
      setPrimaryWeapon(buildData.primaryWeaponId, buildData.primaryTier);
      for (const att of buildData.primaryAttachments) setPrimaryAttachment(att.slot, att.attachmentId);
      if (buildData.secondaryWeaponId) {
        setSecondaryWeapon(buildData.secondaryWeaponId, buildData.secondaryTier);
        for (const att of buildData.secondaryAttachments ?? []) setSecondaryAttachment(att.slot, att.attachmentId);
      }
      if (buildData.augmentId) setAugment(buildData.augmentId);
      if (buildData.shieldId) setShield(buildData.shieldId);
      buildData.quickUseItems.forEach((id, i) => setQuickUseItem(i, id));
      setActiveTab('planner');
    },
    [
      setPrimaryWeapon,
      setPrimaryAttachment,
      setSecondaryWeapon,
      setSecondaryAttachment,
      setAugment,
      setShield,
      setQuickUseItem,
    ],
  );

  const handleDelete = useCallback(
    (id: string) => {
      setSavedBuilds(prev => prev.filter(b => b.id !== id));
    },
    [setSavedBuilds],
  );

  const handleDualSelect = useCallback(
    (weaponId: string, tier: WeaponTier, isPrimary: boolean) => {
      if (isPrimary) setPrimaryWeapon(weaponId, tier);
      else setSecondaryWeapon(weaponId, tier);
    },
    [setPrimaryWeapon, setSecondaryWeapon],
  );

  const filteredBuilds = filterBuilds(metaBuilds, {
    role: buildRole,
    weaponClass: 'all',
    ammoType: 'all',
    patch: 'all',
    search: '',
    minRating: 0,
    sortBy: buildSort,
    sortDir: 'desc',
  });

  const buildShareUrl = useMemo(() => {
    try {
      return encodeBuild(build);
    } catch {
      return '';
    }
  }, [build]);
  const ogImageUrl = buildShareUrl
    ? `${window.location.origin}/api/og?build=${encodeURIComponent(buildShareUrl)}`
    : `${window.location.origin}/og-image.svg`;

  const craftSummary = calculateMaterialsForItems(craftQueue);
  const weaponCount = weapons.length;
  const appRef = useRef<HTMLDivElement>(null);
  const scrollToApp = () => appRef.current?.scrollIntoView({ behavior: 'smooth' });
  const handleStartBuilding = () => {
    setActiveTab('planner');
    scrollToApp();
  };
  const handleBrowseDatabase = () => {
    setActiveTab('database');
    scrollToApp();
  };
  const handleMetaBuilds = () => {
    setActiveTab('builds');
    scrollToApp();
  };

  return (
    <>
      <Helmet>
        <title>ARC Hub — Community Hub for ARC Raiders</title>
        <meta property="og:title" content="ARC Hub — Community Hub for ARC Raiders" />
        <meta
          property="og:description"
          content="Interactive weapon loadout planner for Arc Raiders. Browse weapons, attachments, augments, shields, skill tree, and crafting."
        />
        <meta
          name="description"
          content="ARC Hub — your community hub for everything ARC Raiders: loadout planner, weapon database, build guides, patch analysis, daily meta briefings, crafting calculator, and community builds."
        />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>

      <Hero
        onStartBuilding={handleStartBuilding}
        onBrowseDatabase={handleBrowseDatabase}
        onMetaBuilds={handleMetaBuilds}
      />

      <div ref={appRef} className="min-h-screen bg-page text-primary">
        <Header activeTab={activeTab} onTabChange={setActiveTab} savedCount={savedBuilds.length} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            {activeTab === 'planner' && (
              <motion.div
                key="planner"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[rgb(var(--border-primary))]">
                  <div>
                    <h2 className="text-sm font-display font-bold text-accent tracking-tight">GEAR UP</h2>
                    <p className="text-[10px] text-tertiary font-mono">Prepare for deployment</p>
                    <p className="text-[9px] font-mono text-tertiary uppercase tracking-[0.15em] mt-1">
                      Raider // Callsign: <span className="text-accent">THIRKLE-7</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setShowComparison(p => !p)}
                    className="px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.1em] border rounded-sm transition-all ${
                    showComparison ? 'bg-accent text-page border-accent' : 'border-[rgb(var(--border-primary))] text-tertiary hover:text-primary'
                  }"
                  >
                    {showComparison ? 'Close Compare' : 'Weapon Compare'}
                  </button>
                </div>

                {showComparison && (
                  <Suspense fallback={<div className="h-48 animate-pulse bg-[rgb(var(--bg-elevated))]" />}>
                    <WeaponComparison />
                  </Suspense>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1 space-y-4">
                    <WeaponSelector
                      selectedId={build.primaryWeaponId}
                      selectedTier={build.primaryTier}
                      onSelect={(w, t) => handleDualSelect(w.id, t, true)}
                      label="Primary"
                    />
                    <WeaponSelector
                      selectedId={build.secondaryWeaponId || ''}
                      selectedTier={build.secondaryTier ?? 0}
                      onSelect={(w, t) => handleDualSelect(w.id, t, false)}
                      label="Secondary"
                    />
                    <button
                      onClick={() => setSecondaryWeapon(undefined)}
                      className="w-full py-2 text-[9px] font-mono uppercase tracking-[0.1em] border border-[rgb(var(--border-primary))] text-tertiary hover:text-primary transition-all"
                    >
                      Unequip Secondary
                    </button>
                  </div>

                  <div className="lg:col-span-2 space-y-4">
                    {primaryWeapon ? (
                      <>
                        <AttachmentSlots
                          weaponId={primaryWeapon.id}
                          slots={primaryWeapon.attachmentSlots}
                          attachments={build.primaryAttachments}
                          onEquip={setPrimaryAttachment}
                          label="Primary Mods"
                        />

                        {secondaryWeapon && (
                          <AttachmentSlots
                            weaponId={secondaryWeapon.id}
                            slots={secondaryWeapon.attachmentSlots}
                            attachments={build.secondaryAttachments ?? []}
                            onEquip={setSecondaryAttachment}
                            label="Secondary Mods"
                          />
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <AugmentSelect selectedId={build.augmentId} shieldId={build.shieldId} onSelect={setAugment} />
                          <ShieldSelect selectedId={build.shieldId} onSelect={setShield} />
                          <div className="space-y-1">
                            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-secondary font-semibold">
                              Loadout Summary
                            </p>
                            <div className="p-2 border border-[rgb(var(--border-primary))] bg-surface space-y-1.5">
                              <input
                                type="text"
                                value={build.name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Name your loadout..."
                                className="w-full px-2 py-1 text-[10px] bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-primary))] text-primary placeholder:text-tertiary focus:outline-none focus:border-accent"
                              />
                              <textarea
                                value={build.notes ?? ''}
                                onChange={e => setNotes(e.target.value)}
                                rows={2}
                                placeholder="Mission notes..."
                                className="w-full px-2 py-1 text-[9px] bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-primary))] text-primary placeholder:text-tertiary focus:outline-none focus:border-accent resize-none"
                              />
                              <p className="text-[9px] text-tertiary">
                                Primary:{' '}
                                <span className="text-primary">
                                  {primaryWeapon.name} T{primaryWeapon.tiers[build.primaryTier]?.label || 'I'}
                                </span>
                              </p>
                              {secondaryWeapon && (
                                <p className="text-[9px] text-tertiary">
                                  Secondary:{' '}
                                  <span className="text-primary">
                                    {secondaryWeapon.name} T
                                    {secondaryWeapon.tiers[build.secondaryTier ?? 0]?.label || 'I'}
                                  </span>
                                </p>
                              )}
                              {selectedAugment && (
                                <p className="text-[9px] text-tertiary">
                                  Augment: <span className="text-primary">{selectedAugment.name}</span>
                                </p>
                              )}
                              {selectedShield && (
                                <p className="text-[9px] text-tertiary">
                                  Shield: <span className="text-primary">{selectedShield.name}</span>
                                </p>
                              )}
                              <p className="text-[9px] text-tertiary">
                                Annual Cost:{' '}
                                <span className="text-accent font-mono">
                                  {primaryWeapon.tiers[build.primaryTier]?.value.toLocaleString() || '?'}c
                                </span>
                              </p>
                              <p className="text-[9px] text-tertiary">
                                Patch:{' '}
                                <button
                                  onClick={navigateToPatches}
                                  className="text-accent underline hover:no-underline font-mono"
                                >
                                  {latestPatch.version}
                                </button>
                              </p>
                              <div className="pt-1.5 mt-1.5 border-t border-[rgb(var(--border-primary))]">
                                <p className="text-[9px] text-tertiary">
                                  Total Weight:{' '}
                                  <span className="text-accent font-mono">{totalWeight.toFixed(1)}kg</span>
                                </p>
                                <p className="text-[9px] text-tertiary">
                                  Total Cost:{' '}
                                  <span className="text-accent font-mono">{totalCost.toLocaleString()}c</span>
                                </p>
                                {(() => {
                                  const weightClass = totalWeight <= 8 ? 'Light' : totalWeight <= 14 ? 'Medium' : totalWeight > 14 ? 'Heavy' : 'Overencumbered';
                                  const weightColor = totalWeight <= 8 ? 'text-accent-green' : totalWeight <= 14 ? 'text-accent-warning' : 'text-danger';
                                  return (
                                    <p className="text-[9px] font-mono text-tertiary">
                                      Class: <span className={`${weightColor} font-semibold`}>{weightClass}</span>
                                      {totalWeight > 20 && <span className="text-danger ml-1">SLOW</span>}
                                    </p>
                                  );
                                })()}
                              </div>
                            </div>
                          </div>
                        </div>

                        <StatBreakdown
                          weapon={primaryWeapon}
                          tier={build.primaryTier}
                          attachments={build.primaryAttachments}
                        />

                        <TTKCalculator
                          weapon={primaryWeapon}
                          tier={build.primaryTier}
                          attachments={build.primaryAttachments}
                        />

                        <QuickUseSlots items={build.quickUseItems} onSetItem={setQuickUseItem} />
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-48 border border-dashed border-[rgb(var(--border-primary))] bg-surface">
                        <div className="text-center">
                          <p className="text-xs text-tertiary font-mono uppercase tracking-[0.1em]">
                            Equip a weapon to plan your deployment
                          </p>
                          <p className="text-[10px] text-tertiary mt-1">{weaponCount} weapons across 9 classes</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-[rgb(var(--border-primary))]">
                  <BuildActions
                    build={build}
                    onSave={handleSave}
                    savedBuilds={savedBuilds}
                    onLoadBuild={handleLoad}
                    onDeleteBuild={handleDelete}
                    onReset={reset}
                  />
                </div>
              </motion.div>
            )}

            {/* ── BUILDS TAB ── */}
            {activeTab === 'builds' && (
              <motion.div
                key="builds"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="flex gap-0 border-b border-[rgb(var(--border-primary))]" role="tablist">
                  {[
                    { id: 'meta', label: 'Meta Builds' },
                    { id: 'community', label: 'Community' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setBuildsTab(tab.id as 'meta' | 'community')}
                      className={`px-4 py-2 text-[10px] font-mono uppercase tracking-[0.1em] border-b-2 transition-all ${
                        buildsTab === tab.id
                          ? 'text-accent border-accent'
                          : 'text-tertiary border-transparent hover:text-primary'
                      }`}
                      role="tab"
                      aria-selected={buildsTab === tab.id}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {buildsTab === 'meta' && (
                  <>
                    <div className="flex flex-wrap gap-2 items-center">
                      <select
                        value={buildRole}
                        onChange={e => setBuildRole(e.target.value as BuildRole | 'all')}
                        className="px-2 py-1.5 text-[10px] bg-surface border border-[rgb(var(--border-primary))] text-primary focus:outline-none focus:border-accent"
                      >
                        <option value="all">All Roles</option>
                        {getUniqueRoles(metaBuilds).map(r => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                      <select
                        value={buildSort}
                        onChange={e => setBuildSort(e.target.value as 'rating' | 'votes')}
                        className="px-2 py-1.5 text-[10px] bg-surface border border-[rgb(var(--border-primary))] text-primary focus:outline-none focus:border-accent"
                      >
                        <option value="rating">Sort: Rating</option>
                        <option value="votes">Sort: Popular</option>
                        <option value="newest">Sort: Newest</option>
                      </select>
                      <span className="text-[9px] text-tertiary font-mono">{filteredBuilds.length} builds</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {filteredBuilds.map(mb => {
                        const w = getWeaponById(mb.build.primaryWeaponId);
                        const tierLabel = ['I', 'II', 'III', 'IV'][mb.build.primaryTier] ?? 'I';
                        return (
                          <div
                            key={mb.id}
                            className="border border-[rgb(var(--border-primary))] bg-surface p-3 hover:border-tertiary transition-all"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-xs font-semibold text-primary truncate">{mb.name}</h3>
                                <p className="text-[8px] font-mono text-tertiary uppercase">
                                  {mb.role} &middot; {mb.patch}
                                </p>
                              </div>
                              <div className="text-right ml-2">
                                <p className="text-xs font-mono text-accent">{mb.rating.toFixed(1)}</p>
                                <p className="text-[8px] text-tertiary">{mb.votes} votes</p>
                              </div>
                            </div>
                            <p className="text-[9px] text-secondary mb-2 line-clamp-2">{mb.description}</p>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {w && (
                                <span
                                  className="text-[8px] px-1.5 py-0.5 font-mono"
                                  style={{
                                    backgroundColor: AMMO_COLORS[w.ammoType] + '22',
                                    color: AMMO_COLORS[w.ammoType],
                                    border: `1px solid ${AMMO_COLORS[w.ammoType]}44`,
                                  }}
                                >
                                  {w.name} T{tierLabel}
                                </span>
                              )}
                              {mb.tags.slice(0, 3).map(t => (
                                <span
                                  key={t}
                                  className="text-[7px] px-1 py-0.5 border border-[rgb(var(--border-primary))] text-tertiary font-mono uppercase"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                            <button
                              onClick={() => handleLoadMetaBuild(mb.build)}
                              className="mt-2 w-full py-1 text-[8px] font-mono uppercase tracking-[0.1em] border border-accent/50 text-accent hover:bg-accent/10 transition-all rounded-sm"
                            >
                              Load in Planner
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {buildsTab === 'community' && (
                  <>
                    <div className="flex flex-wrap gap-2 items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <select
                          value={communityFilter}
                          onChange={e => setCommunityFilter(e.target.value as 'all' | 'official' | 'community')}
                          className="px-2 py-1.5 text-[10px] bg-surface border border-[rgb(var(--border-primary))] text-primary focus:outline-none focus:border-accent"
                        >
                          <option value="all">All Builds</option>
                          <option value="official">Official Only</option>
                          <option value="community">Community Only</option>
                        </select>
                        <select
                          value={buildSort}
                          onChange={e => setBuildSort(e.target.value as 'rating' | 'votes')}
                          className="px-2 py-1.5 text-[10px] bg-surface border border-[rgb(var(--border-primary))] text-primary focus:outline-none focus:border-accent"
                        >
                          <option value="votes">Sort: Popular</option>
                          <option value="rating">Sort: Rating</option>
                        </select>
                        <span className="text-[9px] text-tertiary font-mono">
                          {
                            filterCommunityBuilds(communityBuilds, {
                              role: buildRole,
                              weaponClass: 'all',
                              ammoType: 'all',
                              patch: 'all',
                              search: '',
                              minRating: 0,
                              sortBy: buildSort,
                              sortDir: 'desc',
                              source: communityFilter,
                            }).length
                          }{' '}
                          builds
                        </span>
                      </div>
                      <button
                        onClick={() => setShowSubmissionForm(true)}
                        className="px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.1em] border border-[rgb(var(--border-primary))] text-accent hover:bg-accent/10 transition-all"
                      >
                        + Submit Build
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {filterCommunityBuilds(communityBuilds, {
                        role: buildRole,
                        weaponClass: 'all',
                        ammoType: 'all',
                        patch: 'all',
                        search: '',
                        minRating: 0,
                        sortBy: buildSort,
                        sortDir: 'desc',
                        source: communityFilter,
                      }).map(cb => {
                        const buildData = cb.build_json as { primaryWeaponId?: string; primaryTier?: number };
                        const w = buildData.primaryWeaponId ? getWeaponById(buildData.primaryWeaponId) : null;
                        const tierLabel = ['I', 'II', 'III', 'IV'][buildData.primaryTier ?? 0] ?? 'I';
                        const userVote = userVotes[cb.id] ?? null;
                        return (
                          <div
                            key={cb.id}
                            className="border border-[rgb(var(--border-primary))] bg-surface p-3 hover:border-tertiary transition-all"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <h3 className="text-xs font-semibold text-primary truncate">{cb.name}</h3>
                                  {cb.official && (
                                    <span className="text-[7px] px-1 py-0.5 bg-accent/20 text-accent font-mono uppercase">
                                      Official
                                    </span>
                                  )}
                                </div>
                                <p className="text-[8px] font-mono text-tertiary uppercase">
                                  {cb.role} &middot; by {cb.author_username}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 ml-2">
                                <button
                                  onClick={() => setVote(cb.id, userVote === 1 ? null : 1)}
                                  className={`px-1.5 py-1 text-[9px] font-mono border transition-all ${
                                    userVote === 1
                                      ? 'bg-accent text-page border-accent'
                                      : 'border-[rgb(var(--border-primary))] text-tertiary hover:text-primary'
                                  }`}
                                  title="Upvote"
                                >
                                  &uarr;
                                </button>
                                <span className="text-[10px] font-mono text-accent min-w-[2ch] text-center">
                                  {cb.net_votes}
                                </span>
                                <button
                                  onClick={() => setVote(cb.id, userVote === -1 ? null : -1)}
                                  className={`px-1.5 py-1 text-[9px] font-mono border transition-all ${
                                    userVote === -1
                                      ? 'bg-danger text-page border-danger'
                                      : 'border-[rgb(var(--border-primary))] text-tertiary hover:text-primary'
                                  }`}
                                  title="Downvote"
                                >
                                  &darr;
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {w && (
                                <span
                                  className="text-[8px] px-1.5 py-0.5 font-mono"
                                  style={{
                                    backgroundColor: AMMO_COLORS[w.ammoType] + '22',
                                    color: AMMO_COLORS[w.ammoType],
                                    border: `1px solid ${AMMO_COLORS[w.ammoType]}44`,
                                  }}
                                >
                                  {w.name} T{tierLabel}
                                </span>
                              )}
                              {cb.tags.slice(0, 3).map(t => (
                                <span
                                  key={t}
                                  className="text-[7px] px-1 py-0.5 border border-[rgb(var(--border-primary))] text-tertiary font-mono uppercase"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                            {buildData.primaryWeaponId && (
                              <button
                                onClick={() => {
                                  setPrimaryWeapon(buildData.primaryWeaponId!, (buildData.primaryTier ?? 0) as WeaponTier);
                                  setActiveTab('planner');
                                  showToast(`Loaded "${cb.name}" in planner`, 'success');
                                }}
                                className="mt-2 w-full py-1 text-[8px] font-mono uppercase tracking-[0.1em] border border-accent/50 text-accent hover:bg-accent/10 transition-all rounded-sm"
                              >
                                Load in Planner
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {filterCommunityBuilds(communityBuilds, {
                      role: buildRole,
                      weaponClass: 'all',
                      ammoType: 'all',
                      patch: 'all',
                      search: '',
                      minRating: 0,
                      sortBy: buildSort,
                      sortDir: 'desc',
                      source: communityFilter,
                    }).length === 0 && (
                      <div className="text-center py-8 border border-dashed border-[rgb(var(--border-primary))] bg-surface">
                        <p className="text-xs text-tertiary font-mono uppercase tracking-[0.1em]">No builds found</p>
                        <p className="text-[9px] text-tertiary mt-1">Be the first to submit a build!</p>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}

            {/* ── DATABASE TAB ── */}
            {activeTab === 'database' && (
              <motion.div
                key="database"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div>
                  <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-secondary font-semibold">Requisition Database</h2>
                  <p className="text-[10px] text-tertiary font-mono">Review available requisitions and field data</p>
                </div>
                <div className="flex gap-0 border-b border-[rgb(var(--border-primary))]" role="tablist">
                  {[
                    { id: 'weapons', label: 'Weapons', badge: weapons.length },
                    { id: 'attachments', label: 'Attachments', badge: attachments.length },
                    { id: 'items', label: 'Items', badge: quickUseItems.length },
                    { id: 'patches', label: 'Patches', badge: patches.length },
                    { id: 'meta', label: 'Meta', badge: undefined },
                    { id: 'ermal', label: 'Ermal', badge: undefined },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setDbTab(tab.id)}
                      className={`px-4 py-2 text-[10px] font-mono uppercase tracking-[0.1em] border-b-2 transition-all ${
                        dbTab === tab.id
                          ? 'text-accent border-accent'
                          : 'text-tertiary border-transparent hover:text-primary'
                      }`}
                      role="tab"
                      aria-selected={dbTab === tab.id}
                    >
                      {tab.label}
                      {tab.badge !== undefined && <span className="ml-1 text-[9px] text-tertiary">({tab.badge})</span>}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-4">
                  <div className="space-y-4">
                    {dbTab === 'weapons' && (
                      <div className="overflow-x-auto">
                        <div className="mb-2">
                          <input
                            type="text"
                            value={weaponSearch}
                            onChange={e => setWeaponSearch(e.target.value)}
                            placeholder="Search weapons..."
                            className="w-full px-3 py-1.5 text-[10px] bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-primary))] text-primary placeholder:text-tertiary focus:outline-none focus:border-accent font-mono"
                          />
                        </div>
                        <table className="w-full text-[10px] font-mono">
                          <thead>
                            <tr className="text-tertiary uppercase tracking-[0.1em] border-b border-[rgb(var(--border-primary))]">
                              <th className="text-left py-2 pr-2">Name</th>
                              <th className="text-left py-2 pr-2">Class</th>
                              <th className="text-left py-2 pr-2">Ammo</th>
                              <th className="text-left py-2 pr-2">Mode</th>
                              <th className="text-right py-2 pr-2">DMG</th>
                              <th className="text-right py-2 pr-2">FR</th>
                              <th className="text-right py-2 pr-2">Range</th>
                              <th className="text-right py-2 pr-2">Mag</th>
                              <th className="text-right py-2">Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(weaponSearch
                              ? weapons.filter(w =>
                                  w.name.toLowerCase().includes(weaponSearch.toLowerCase()) ||
                                  w.class.toLowerCase().includes(weaponSearch.toLowerCase()) ||
                                  w.ammoType.toLowerCase().includes(weaponSearch.toLowerCase())
                                )
                              : weapons
                            ).map(w => {
                              const base = w.tiers[0]?.stats;
                              return (
                                <tr
                                  key={w.id}
                                  className="border-b border-[rgb(var(--border-primary))] hover:bg-[rgb(var(--bg-elevated))]"
                                >
                                  <td className="py-1.5 pr-2 text-primary font-semibold">{w.name}</td>
                                  <td className="py-1.5 pr-2 text-tertiary">{w.class}</td>
                                  <td className="py-1.5 pr-2">
                                    <span style={{ color: AMMO_COLORS[w.ammoType] }}>{w.ammoType}</span>
                                  </td>
                                  <td className="py-1.5 pr-2 text-tertiary">{w.firingMode}</td>
                                  <td className="py-1.5 pr-2 text-right">{base?.damage ?? '-'}</td>
                                  <td className="py-1.5 pr-2 text-right">{base?.fireRate ?? '-'}</td>
                                  <td className="py-1.5 pr-2 text-right">{base?.range ?? '-'}</td>
                                  <td className="py-1.5 pr-2 text-right">{base?.magSize ?? '-'}</td>
                                  <td className="py-1.5 text-right text-accent">
                                    {w.tiers[0]?.value.toLocaleString() || '-'}c
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {dbTab === 'attachments' && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-[10px] font-mono">
                          <thead>
                            <tr className="text-tertiary uppercase tracking-[0.1em] border-b border-[rgb(var(--border-primary))]">
                              <th className="text-left py-2 pr-2">Slot</th>
                              <th className="text-left py-2 pr-2">Name</th>
                              <th className="text-center py-2 pr-2">Tier</th>
                              <th className="text-left py-2 pr-2">Effects</th>
                              <th className="text-left py-2">Penalties</th>
                            </tr>
                          </thead>
                          <tbody>
                            {attachments.map(a => (
                              <tr
                                key={a.id}
                                className="border-b border-[rgb(var(--border-primary))] hover:bg-[rgb(var(--bg-elevated))]"
                              >
                                <td className="py-1.5 pr-2 text-tertiary">{SLOT_LABELS[a.slot]}</td>
                                <td className="py-1.5 pr-2 text-primary font-semibold">{a.name}</td>
                                <td className="py-1.5 pr-2 text-center font-mono">T{a.tier}</td>
                                <td className="py-1.5 pr-2 text-accent text-[9px]">
                                  {Object.entries(a.effects)
                                    .map(([k, v]) => `${k.replace(/([A-Z])/g, ' $1').trim()}: ${v > 0 ? '+' : ''}${v}`)
                                    .join(', ')}
                                </td>
                                <td className="py-1.5 text-danger text-[9px]">
                                  {a.penalties
                                    ? Object.entries(a.penalties)
                                        .map(
                                          ([k, v]) => `${k.replace(/([A-Z])/g, ' $1').trim()}: ${v > 0 ? '+' : ''}${v}`,
                                        )
                                        .join(', ')
                                    : '—'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {dbTab === 'items' && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-[10px] font-mono">
                          <thead>
                            <tr className="text-tertiary uppercase tracking-[0.1em] border-b border-[rgb(var(--border-primary))]">
                              <th className="text-left py-2 pr-2">Category</th>
                              <th className="text-left py-2 pr-2">Name</th>
                              <th className="text-center py-2 pr-2">Rarity</th>
                              <th className="text-right py-2 pr-2">Weight</th>
                              <th className="text-left py-2">Effect</th>
                            </tr>
                          </thead>
                          <tbody>
                            {quickUseItems.map(item => (
                              <tr
                                key={item.id}
                                className="border-b border-[rgb(var(--border-primary))] hover:bg-[rgb(var(--bg-elevated))]"
                              >
                                <td className="py-1.5 pr-2 text-tertiary">{item.category}</td>
                                <td className="py-1.5 pr-2 text-primary font-semibold">{item.name}</td>
                                <td className="py-1.5 pr-2 text-center">
                                  <span
                                    className={`text-[8px] px-1 py-0.5 ${
                                      item.rarity === 'Legendary'
                                        ? 'text-orange-400'
                                        : item.rarity === 'Rare'
                                          ? 'text-blue-400'
                                          : item.rarity === 'Uncommon'
                                            ? 'text-green-400'
                                            : 'text-tertiary'
                                    }`}
                                  >
                                    {item.rarity}
                                  </span>
                                </td>
                                <td className="py-1.5 pr-2 text-right font-mono">{item.weight}kg</td>
                                <td className="py-1.5 text-secondary text-[9px]">{item.effect}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {dbTab === 'patches' && <PatchNotes />}

                    {dbTab === 'meta' && <PatchAnalyzer />}

                    {dbTab === 'ermal' && <ErmalTracker />}
                  </div>

                  <div className="hidden lg:block space-y-4">
                    <AdUnit slot="arc-database" type="carbon" />
                    <GearAffiliate />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── SKILLS TAB ── */}
            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-secondary font-semibold">
                    Raider Training
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0 border border-[rgb(var(--border-primary))]">
                      <button
                        onClick={() => setSkillView('list')}
                        className={`px-2 py-1 text-[8px] font-mono uppercase tracking-[0.1em] transition-all ${
                          skillView === 'list' ? 'bg-accent text-page' : 'text-tertiary hover:text-primary'
                        }`}
                      >
                        List
                      </button>
                      <button
                        onClick={() => setSkillView('graph')}
                        className={`px-2 py-1 text-[8px] font-mono uppercase tracking-[0.1em] transition-all ${
                          skillView === 'graph' ? 'bg-accent text-page' : 'text-tertiary hover:text-primary'
                        }`}
                      >
                        Graph
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        const rec = getRecommendedAllocation();
                        for (const [id, pts] of Object.entries(rec)) {
                          for (let i = 0; i < pts; i++) addPoint(id);
                        }
                      }}
                      className="px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.1em] border border-[rgb(var(--border-primary))] text-primary hover:bg-[rgb(var(--bg-elevated))] transition-all"
                    >
                      Metagame Allocation
                    </button>
                    <button
                      onClick={resetSkills}
                      className="px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.1em] border border-[rgb(var(--border-primary))] text-danger hover:bg-danger/10 transition-all"
                    >
                      Unspec All
                    </button>
                  </div>
                </div>
                {skillView === 'list' ? (
                  <SkillTreeViewer
                    allocation={allocation}
                    totalPoints={totalPoints}
                    remainingPoints={remainingPoints}
                    onAdd={addPoint}
                    onRemove={removePoint}
                  />
                ) : (
                  <Suspense fallback={
                    <div className="h-[600px] animate-pulse bg-[rgb(var(--bg-elevated))] flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                      <p className="text-[10px] font-mono text-tertiary tracking-[0.1em]">RENDERING TRAINING DATA...</p>
                    </div>
                  }>
                    <SkillGraphView
                      allocation={allocation}
                      totalPoints={totalPoints}
                      remainingPoints={remainingPoints}
                      onAdd={addPoint}
                      onRemove={removePoint}
                    />
                  </Suspense>
                )}
              </motion.div>
            )}

            {/* ── CRAFT TAB ── */}
            {activeTab === 'craft' && (
              <motion.div
                key="craft"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-secondary font-semibold">
                  Crafting Calculator
                </h2>
                <p className="text-xs text-tertiary">
                  Select items to craft. Materials are summed across all selected recipes.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-[10px] font-mono uppercase tracking-[0.1em] text-secondary font-semibold">
                      Available Recipes
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-96 overflow-y-auto">
                      {craftingRecipes.map(recipe => {
                        const inQueue = craftQueue.includes(recipe.produces);
                        return (
                          <button
                            key={recipe.id}
                            onClick={() => {
                              setCraftQueue(prev =>
                                inQueue ? prev.filter(p => p !== recipe.produces) : [...prev, recipe.produces],
                              );
                            }}
                            className={`text-left p-2 border transition-all text-[10px] ${
                              inQueue
                                ? 'border-accent bg-[rgb(var(--bg-elevated))]'
                                : 'border-[rgb(var(--border-primary))] bg-surface hover:border-tertiary'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-primary">{recipe.name}</span>
                              <span className="text-[8px] text-tertiary uppercase">{recipe.category}</span>
                            </div>
                            <p className="text-[8px] text-tertiary mt-0.5">
                              {recipe.station} Lv.{recipe.stationLevel}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-[10px] font-mono uppercase tracking-[0.1em] text-secondary font-semibold">
                      Material Summary
                      {craftQueue.length > 0 && <span className="ml-1 text-accent">({craftQueue.length} items)</span>}
                    </h3>

                    {craftQueue.length === 0 ? (
                      <div className="p-4 border border-dashed border-[rgb(var(--border-primary))] bg-surface text-center">
                        <p className="text-xs text-tertiary">Select recipes from the left panel</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <p className="text-[8px] font-mono uppercase text-tertiary tracking-[0.1em]">
                            Stations Required
                          </p>
                          {craftSummary.stationsRequired.map(s => (
                            <div
                              key={s.name}
                              className="flex items-center justify-between px-2 py-1 border border-[rgb(var(--border-primary))] bg-surface text-[10px]"
                            >
                              <span className="text-primary">{s.name}</span>
                              <span className="text-tertiary font-mono">Lv.{s.level}</span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-1">
                          <p className="text-[8px] font-mono uppercase text-tertiary tracking-[0.1em]">
                            Total Materials
                          </p>
                          {craftSummary.totalMaterials.map(mat => (
                            <div
                              key={mat.id}
                              className="flex items-center justify-between px-2 py-1 border border-[rgb(var(--border-primary))] bg-surface text-[10px]"
                            >
                              <span className="text-primary">{mat.name}</span>
                              <span className="font-mono text-accent">x{mat.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {craftQueue.length > 0 && (
                      <button
                        onClick={() => setCraftQueue([])}
                        className="w-full py-1.5 text-[9px] font-mono uppercase tracking-[0.1em] border border-[rgb(var(--border-primary))] text-tertiary hover:text-primary transition-all mt-2"
                      >
                        Clear Selection
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-8 border-t border-[rgb(var(--border-primary))] text-center">
          <div className="max-w-lg mx-auto mb-4">
            <AdUnit slot="arc-footer" type="carbon" />
          </div>
          <p className="text-[9px] text-tertiary font-mono uppercase tracking-[0.1em]">
            ARC Hub — Community tool. Not affiliated with Embark Studios.
          </p>
          <p className="text-[9px] text-tertiary font-mono uppercase tracking-[0.1em]">
            Built for Raiders, by Raiders.
          </p>
          <p className="text-[8px] text-tertiary mt-1">
            Weapon &amp; shield data from{' '}
            <a
              href="https://metaforge.app/arc-raiders/database"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-accent"
            >
              MetaForge
            </a>
            ,{' '}
            <a
              href="https://github.com/RaidTheory/arcraiders-data"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-accent"
            >
              RaidTheory/arcraiders-data
            </a>{' '}
            and{' '}
            <a
              href="https://arcdata.mahcks.com/v1"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-accent"
            >
              arcdata.mahcks.com
            </a>
            . Stats may change with updates.
          </p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <a
              href="https://ko-fi.com/thirkle"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-mono border border-[rgb(var(--border-primary))] text-tertiary hover:text-primary hover:border-tertiary transition-all"
            >
              <span>&#9749;</span> Support on Ko-fi
            </a>
          </div>
        </footer>
      </div>

      <Toast />
      {showSubmissionForm && (
        <Suspense fallback={null}>
          <BuildSubmissionForm
            open={showSubmissionForm}
            onOpenChange={setShowSubmissionForm}
            currentBuild={{
              primaryWeaponId: build.primaryWeaponId,
              primaryTier: build.primaryTier,
              name: build.name,
            }}
            onSubmit={async data => {
              await submitBuild(data);
              setShowSubmissionForm(false);
            }}
          />
        </Suspense>
      )}
    </>
  );
}
