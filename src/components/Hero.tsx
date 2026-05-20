import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ParticleBackground } from './ParticleBackground';
import { Logo } from './Logo';

interface HeroProps {
  onStartBuilding: () => void;
  onBrowseDatabase: () => void;
  onMetaBuilds: () => void;
}

export function Hero({ onStartBuilding, onBrowseDatabase, onMetaBuilds }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-page">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-page">
      {/* Layer 1: Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Layer 2: Animated perspective grid */}
      <div className="hero-grid" />

      {/* Layer 3: Scan line */}
      <div className="hero-scan-line" />

      {/* Layer 4: Noise overlay */}
      <div className="noise-overlay absolute inset-0" style={{ zIndex: 2 }} />

      {/* Layer 5: Floating particles */}
      <ParticleBackground />

      {/* Layer 6: Bottom vignette silhouette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          zIndex: 0,
          background: 'linear-gradient(0deg, rgb(10,14,20) 0%, transparent 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          zIndex: 0,
          maskImage: 'linear-gradient(0deg, rgba(0,0,0,0.15) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(0deg, rgba(0,0,0,0.15) 0%, transparent 100%)',
        }}
      >
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,60 C240,20 360,80 480,40 C600,0 720,70 840,35 C960,0 1080,55 1200,30 C1320,10 1380,45 1440,30 L1440,120 L0,120 Z"
            fill="rgb(232,168,50)"
            opacity="0.03"
          />
          <path
            d="M0,80 C200,50 300,90 500,60 C700,30 800,85 1000,55 C1200,25 1300,70 1440,50 L1440,120 L0,120 Z"
            fill="rgb(232,168,50)"
            opacity="0.02"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Logo size="lg" className="justify-center mb-8" showText={false} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary leading-[0.85] tracking-tight mb-4"
        >
          LOADOUT
          <br />
          <span className="text-gradient-accent">PLANNER</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base md:text-lg text-secondary font-light tracking-[0.15em] uppercase mb-10"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="inline-block"
          >
            Plan
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.85 }}
            className="inline-block mx-3"
          >
            <span className="text-tertiary">·</span>
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.0 }}
            className="inline-block"
          >
            Optimize
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.15 }}
            className="inline-block mx-3"
          >
            <span className="text-tertiary">·</span>
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.3 }}
            className="inline-block text-accent font-semibold"
          >
            Extract.
          </motion.span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          <button
            onClick={onStartBuilding}
            className="px-6 py-3 sm:px-8 sm:py-3.5 bg-accent text-page text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.15em] rounded-sm hover:bg-accent-hover transition-all duration-200 hover:shadow-glow-accent active:scale-[0.97]"
          >
            Start Building
          </button>
          <button
            onClick={onBrowseDatabase}
            className="px-6 py-3 sm:px-8 sm:py-3.5 border border-[rgb(var(--border-accent))/0.3] text-accent text-[11px] sm:text-xs font-mono uppercase tracking-[0.15em] rounded-sm hover:border-accent hover:shadow-glow-accent transition-all duration-200 active:scale-[0.97]"
          >
            Browse Database
          </button>
          <button
            onClick={onMetaBuilds}
            className="px-6 py-3 sm:px-8 sm:py-3.5 border border-[rgb(var(--border-primary))] text-secondary text-[11px] sm:text-xs font-mono uppercase tracking-[0.15em] rounded-sm hover:border-tertiary hover:text-primary transition-all duration-200 active:scale-[0.97]"
          >
            Meta Builds
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5 cursor-pointer"
          onClick={onStartBuilding}
        >
          <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-tertiary">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-tertiary">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
