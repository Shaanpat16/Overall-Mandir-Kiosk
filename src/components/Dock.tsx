import { motion } from 'motion/react';
import { transitions } from '../motion/easing';
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

export default function Dock({ active, onNavigate, visible }: DockProps) {
  return (
    <motion.nav
      className="dock"
      initial={{ y: 120, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
      transition={transitions.slow}
    >
      {DOCK_ITEMS.map((item) => (
        <button
          key={item.id}
          className={`dock__item ${active === item.id ? 'dock__item--active' : ''}`}
          onClick={() => onNavigate(item.id)}
        >
          {item.label}
        </button>
      ))}
    </motion.nav>
  );
}
