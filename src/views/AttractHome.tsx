import { motion, AnimatePresence } from 'motion/react';
import { transitions, durations, appleEase } from '../motion/easing';
import { HOME_TILES, type ViewName } from '../data/content';
import PhotoCard from '../components/PhotoCard';

interface AttractHomeProps {
  isAttract: boolean;
  onWake: () => void;
  onNavigate: (view: ViewName) => void;
}

export default function AttractHome({ isAttract, onWake, onNavigate }: AttractHomeProps) {
  return (
    <div className="view-container" style={{ background: 'var(--canvas)' }}>
      {/* Ken Burns hero */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: isAttract ? '100%' : 880,
          overflow: 'hidden',
          borderRadius: isAttract ? 0 : '0 0 var(--card-radius) var(--card-radius)',
          transition: `height ${durations.slow}s cubic-bezier(0.22,1,0.36,1), border-radius ${durations.slow}s cubic-bezier(0.22,1,0.36,1)`,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/images/hero-mandir.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            animation: isAttract ? `kenBurns ${durations.attract}s ease-in-out infinite alternate` : 'none',
            transform: isAttract ? undefined : 'scale(1)',
            transition: `transform ${durations.slow}s cubic-bezier(0.22,1,0.36,1)`,
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: isAttract ? '60%' : '50%',
            background: isAttract
              ? 'linear-gradient(transparent, rgba(28,25,22,0.5))'
              : 'linear-gradient(transparent, rgba(28,25,22,0.35))',
            transition: `opacity ${durations.slow}s`,
          }}
        />
      </div>

      {/* Attract headline + breathing pill */}
      <AnimatePresence>
        {isAttract && (
          <motion.div
            key="attract-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.slow}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0 var(--s-64)',
              zIndex: 10,
            }}
            onClick={onWake}
          >
            <motion.h1
              className="text-hero"
              style={{
                color: 'var(--surface)',
                textAlign: 'center',
                marginBottom: 'var(--s-16)',
                textShadow: '0 2px 40px rgba(0,0,0,0.3)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: appleEase, delay: 0.3 }}
            >
              Welcome <em>home</em>.
            </motion.h1>
            <motion.p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 20,
                color: 'rgba(255,251,245,0.7)',
                textAlign: 'center',
                letterSpacing: '0.04em',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              BAPS Shri Swaminarayan Mandir &middot; Edison, NJ
            </motion.p>

            {/* Breathing touch pill */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: 420,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 40px',
                borderRadius: 999,
                background: 'rgba(255,251,245,0.15)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                animation: 'breathe 2.4s ease-in-out infinite',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'var(--surface)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                Touch to begin
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Home content: status bar is in App, so this is just tiles */}
      <AnimatePresence>
        {!isAttract && (
          <motion.div
            key="home-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.normal}
            style={{
              position: 'absolute',
              top: 880,
              left: 0,
              right: 0,
              bottom: 140,
              padding: `var(--s-32) var(--s-48)`,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--s-24)',
            }}
          >
            {/* Section heading */}
            <h2
              className="text-heading"
              style={{ marginBottom: 'var(--s-8)' }}
            >
              Explore the <em>Mandir</em>
            </h2>

            {/* Destination tiles */}
            <div style={{ display: 'flex', gap: 'var(--s-24)', flex: 1, minHeight: 0 }}>
              {HOME_TILES.map((tile, i) => (
                <motion.div
                  key={tile.id}
                  style={{ flex: 1, minHeight: 0 }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: appleEase,
                    delay: 0.1 + i * 0.08,
                  }}
                >
                  <PhotoCard
                    image={tile.image}
                    title={tile.label}
                    onClick={() => onNavigate(tile.view)}
                    layoutId={`tile-${tile.id}`}
                    style={{ width: '100%', height: '100%' }}
                  />
                </motion.div>
              ))}
            </div>

            {/* About link */}
            <motion.button
              onClick={() => onNavigate('about')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-ui)',
                fontSize: 16,
                color: 'var(--muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: 'var(--s-16) 0',
                textAlign: 'center',
                WebkitTapHighlightColor: 'transparent',
              }}
              whileTap={{ scale: 0.97 }}
            >
              About Edison Mandir →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
