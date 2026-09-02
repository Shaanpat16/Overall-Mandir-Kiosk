import { motion } from 'motion/react';
import type { ViewName } from '../data/content';

interface DockProps {
  active: ViewName;
  onNavigate: (view: ViewName) => void;
  visible: boolean;
}

const DOCK_ITEMS: { id: ViewName; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'activities', label: 'Activities' },
  { id: 'rituals', label: 'Rituals' },
  { id: 'charities', label: 'Charities' },
  { id: 'about', label: 'About' },
];

const springDock = { type: 'spring' as const, stiffness: 300, damping: 28 };
const springIndicator = { type: 'spring' as const, stiffness: 400, damping: 30 };

export default function Dock({ active, onNavigate, visible }: DockProps) {
  return (
    <motion.nav
      className="dock"
      initial={{ y: 120, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
      transition={springDock}
    >
      {DOCK_ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            className="dock__item"
            onClick={() => onNavigate(item.id)}
            style={{ position: 'relative' }}
          >
            {isActive && (
              <motion.div
                layoutId="dock-indicator"
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
