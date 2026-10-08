import { motion } from 'motion/react';
import type { SantoView } from './data';

interface Props {
  active: SantoView;
  onNavigate: (view: SantoView) => void;
  visible: boolean;
}

const ITEMS: { id: SantoView; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'names', label: 'Names' },
  { id: 'general', label: 'General' },
  { id: 'menu', label: 'Menu' },
];

export function santoDockActive(view: SantoView): SantoView {
  if (view === 'mine') return 'names';
  return view;
}

const springDock = { type: 'spring' as const, stiffness: 300, damping: 28 };
const springIndicator = { type: 'spring' as const, stiffness: 400, damping: 30 };

export default function SantoDock({ active, onNavigate, visible }: Props) {
  return (
    <motion.nav
      className="dock"
      initial={{ y: 120, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
      transition={springDock}
    >
      {ITEMS.map((item) => {
        const isActive = santoDockActive(active) === item.id;
        return (
          <button key={item.id} className="dock__item" onClick={() => onNavigate(item.id)} style={{ position: 'relative' }}>
            {isActive && (
              <motion.div
                layoutId="santo-dock-indicator"
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
