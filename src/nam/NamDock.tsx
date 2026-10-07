import { motion } from 'motion/react';
import type { NamView } from './data';

interface NamDockProps {
  active: NamView;
  onNavigate: (view: NamView) => void;
  visible: boolean;
}

const ITEMS: { id: NamView; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'now', label: 'Now' },
  { id: 'info', label: 'Info' },
  { id: 'menu', label: 'Menu' },
];

export function namDockActive(view: NamView): NamView {
  if (view === 'schedule' || view === 'campus' || view === 'guide' || view === 'tracks') {
    return 'info';
  }
  return view;
}

const springDock = { type: 'spring' as const, stiffness: 300, damping: 28 };
const springIndicator = { type: 'spring' as const, stiffness: 400, damping: 30 };

export default function NamDock({ active, onNavigate, visible }: NamDockProps) {
  return (
    <motion.nav
      className="dock"
      initial={{ y: 120, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
      transition={springDock}
    >
      {ITEMS.map((item) => {
        const isActive = namDockActive(active) === item.id;
        return (
          <button
            key={item.id}
            className="dock__item"
            onClick={() => onNavigate(item.id)}
            style={{ position: 'relative' }}
          >
            {isActive && (
              <motion.div
                layoutId="nam-dock-indicator"
                style={{
                  position: 'absolute',
                  inset: 4,
                  borderRadius: 'var(--pill-radius)',
                  background: 'var(--surface)',
                  zIndex: 0,
                }}
                transition={springIndicator}
              />
            )}
            <span
              style={{
                position: 'relative',
                zIndex: 1,
                color: isActive ? 'var(--ink)' : undefined,
                fontWeight: isActive ? 600 : undefined,
                transition: 'color 0.2s, font-weight 0.2s',
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </motion.nav>
  );
}
