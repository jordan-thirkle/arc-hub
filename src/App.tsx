import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import type { AttachmentSlot, Weapon, Build } from './types';
import { weapons, getWeaponById } from './data/weapons';
import { Header } from './components/Header';
import { WeaponGrid } from './components/WeaponGrid';
import { AttachmentSlots } from './components/AttachmentSlots';
import { StatBreakdown } from './components/StatBreakdown';
import { GearSelect } from './components/GearSelect';
import { BuildActions } from './components/BuildActions';
import { useLocalStorage } from './hooks/useLocalStorage';
import { decodeBuild } from './utils/buildUrl';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

const emptyAttachments: Record<AttachmentSlot, string | null> = {
  muzzle: null,
  underbarrel: null,
  magazine: null,
  stock: null,
};

export default function App() {
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
  const [equipped, setEquipped] = useState<Record<AttachmentSlot, string | null>>({ ...emptyAttachments });
  const [gear, setGear] = useState<Record<string, string | null>>({ helmet: null, vest: null, backpack: null });
  const [savedBuilds, setSavedBuilds] = useLocalStorage<Build[]>('ar-builds', []);

  // Load build from URL on mount
  useEffect(() => {
    const buildData = decodeBuild(new URLSearchParams(window.location.search).get('build') || '');
    if (buildData) {
      const weapon = getWeaponById(buildData.weaponId);
      if (weapon) {
        setSelectedWeapon(weapon);
        setEquipped(buildData.attachments);
      }
    }
  }, []);

  const handleWeaponSelect = useCallback((weapon: Weapon) => {
    setSelectedWeapon(weapon);
    setEquipped({ ...emptyAttachments });
    window.location.hash = 'planner';
  }, []);

  const handleEquip = useCallback((slot: AttachmentSlot, attId: string | null) => {
    setEquipped((prev) => ({ ...prev, [slot]: attId }));
  }, []);

  const handleGearSelect = useCallback((type: string, id: string | null) => {
    setGear((prev) => ({ ...prev, [type]: id }));
  }, []);

  const handleSaveBuild = useCallback((name: string) => {
    if (!selectedWeapon) return;
    const build: Build = {
      id: generateId(),
      name,
      weaponId: selectedWeapon.id,
      attachments: { ...equipped },
      createdAt: new Date().toISOString(),
    };
    setSavedBuilds((prev) => [build, ...prev]);
  }, [selectedWeapon, equipped, setSavedBuilds]);

  const handleLoadBuild = useCallback((build: Build) => {
    const weapon = getWeaponById(build.weaponId);
    if (weapon) {
      setSelectedWeapon(weapon);
      setEquipped({ ...emptyAttachments, ...build.attachments });
    }
  }, []);

  const handleDeleteBuild = useCallback((id: string) => {
    setSavedBuilds((prev) => prev.filter((b) => b.id !== id));
  }, [setSavedBuilds]);

  return (
    <>
      <Helmet>
        <title>ARC Raiders Loadout Planner — Plan. Optimize. Extract.</title>
        <meta property="og:title" content="ARC Raiders Loadout Planner" />
        <meta property="og:description" content="Interactive weapon loadout planner for Arc Raiders. Browse weapons, tune attachments, calculate stats, and share builds." />
        <meta name="description" content="Interactive weapon loadout planner for Arc Raiders. Browse weapons, tune attachments, calculate stats, and share builds." />
      </Helmet>
      <div className="min-h-screen bg-page text-primary">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero */}
          <section className="text-center mb-12 pb-8 border-b border-[rgb(var(--border-primary))]">
            <h2 className="text-3xl md:text-5xl font-display font-light text-primary mb-4 tracking-tight">
              Plan. Optimize. <span className="text-accent">Extract.</span>
            </h2>
            <p className="text-sm text-secondary max-w-xl mx-auto leading-relaxed">
              Build the perfect loadout for the Topside. Select your weapon, tune attachments,
              and share your build with other Raiders.
            </p>
          </section>

          {/* Planner Layout */}
          <div id="planner" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Weapon Selection */}
            <div className="lg:col-span-1">
              <WeaponGrid
                selectedId={selectedWeapon?.id || null}
                onSelect={handleWeaponSelect}
              />
            </div>

            {/* Right Column: Build Details */}
            <div className="lg:col-span-2 space-y-6">
              {selectedWeapon ? (
                <>
                  {/* Weapon Info Header */}
                  <div className="p-4 bg-surface border border-[rgb(var(--border-primary))]">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-primary">{selectedWeapon.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-accent border border-accent/30 px-1.5 py-0.5">
                            {selectedWeapon.class}
                          </span>
                          <span className="text-[9px] font-mono text-tertiary uppercase">
                            {selectedWeapon.ammoType} ammo
                          </span>
                          <span className="text-[9px] font-mono text-tertiary">
                            {selectedWeapon.firingMode}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-secondary mt-3">{selectedWeapon.description}</p>
                  </div>

                  {/* Attachments */}
                  <AttachmentSlots
                    weapon={selectedWeapon}
                    equipped={equipped}
                    onEquip={handleEquip}
                  />

                  {/* Gear */}
                  <GearSelect selected={gear} onSelect={handleGearSelect} />

                  {/* Stats */}
                  <StatBreakdown
                    weapon={selectedWeapon}
                    equipped={equipped}
                  />
                </>
              ) : (
                <div className="flex items-center justify-center h-64 border border-dashed border-[rgb(var(--border-primary))] bg-surface">
                  <div className="text-center">
                    <p className="text-sm text-tertiary font-mono uppercase tracking-[0.1em]">
                      Select a weapon to begin
                    </p>
                    <p className="text-xs text-tertiary mt-2">
                      Choose from {weapons.length} weapons across 9 classes
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Actions */}
          <div id="saved" className="mt-8 pt-8 border-t border-[rgb(var(--border-primary))]">
            <BuildActions
              weaponId={selectedWeapon?.id || ''}
              attachments={equipped}
              onSave={handleSaveBuild}
              savedBuilds={savedBuilds}
              onLoadBuild={handleLoadBuild}
              onDeleteBuild={handleDeleteBuild}
            />
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-6 border-t border-[rgb(var(--border-primary))] text-center">
            <p className="text-[10px] text-tertiary font-mono uppercase tracking-[0.1em]">
              ARC Raiders Loadout Planner — Community tool. Not affiliated with Embark Studios.
            </p>
            <p className="text-[9px] text-tertiary mt-1">
              Data sourced from community wikis. Stats are approximate and may change with game updates.
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
