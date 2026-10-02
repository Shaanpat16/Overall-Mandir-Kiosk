import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { appleEase } from '../motion/easing';
import BackHome from './BackHome';
import { DAYS, SESSIONS, TRACKS, type NamSession, type TrackId } from './data';
import { useAgenda } from './useAgenda';

interface Props {
  onBack: () => void;
}

const KIND: Record<NamSession['kind'], { label: string; color: string }> = {
  plenary: { label: 'Keynote', color: '#E8C9A0' },
  worship: { label: 'Mandir', color: '#F0D060' },
  meal: { label: 'Meal', color: '#7DCEA0' },
  breakout: { label: 'Work', color: '#9BB8E8' },
  travel: { label: 'Move', color: '#8A93A6' },
  arrive: { label: 'Hall', color: '#E8A0B4' },
};

const DAY_HERO: Record<string, string> = {
  thu: 'Arrival',
  fri: 'Keynotes 1 · 2',
  sat: 'Keynotes 3 · 4',
  sun: 'Akshardham',
};

export default function NamSchedule({ onBack }: Props) {
  const [dayId, setDayId] = useState<(typeof DAYS)[number]['id']>('thu');
  const [track, setTrack] = useState<TrackId>('all');
  const [starredOnly, setStarredOnly] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const agenda = useAgenda();

  const day = DAYS.find((d) => d.id === dayId)!;

  const list = useMemo(() => {
    return SESSIONS.filter((s) => {
      if (s.dayId !== dayId) return false;
      if (track !== 'all' && s.track !== 'all' && s.track !== track) return false;
      if (starredOnly && !agenda.has(s.id)) return false;
      return true;
    });
  }, [dayId, track, starredOnly, agenda.ids, agenda]);

  const groups = useMemo(() => {
    const rows: NamSession[][] = [];
    for (const s of list) {
      const last = rows[rows.length - 1];
      if (last && last[0].start === s.start) last.push(s);
      else rows.push([s]);
    }
    return rows;
  }, [list]);

  return (
    <div className="view-container" style={{ background: '#10151F' }}>
      <div className="content-well" style={{ display: 'flex', flexDirection: 'column' }}>
        <BackHome onBack={onBack} color="rgba(247,240,230,0.55)" />
        <motion.h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 48,
            fontWeight: 600,
            color: '#F7F0E6',
            lineHeight: 1.08,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: appleEase }}
        >
          Day <em style={{ fontStyle: 'italic', fontWeight: 400 }}>board</em>
        </motion.h1>

        <div style={{ display: 'flex', gap: 8, marginTop: 20, marginBottom: 16 }}>
          {DAYS.map((d) => {
            const on = d.id === dayId;
            return (
              <motion.button
                key={d.id}
                onClick={() => setDayId(d.id)}
                whileTap={{ scale: 0.96 }}
                style={{
                  flex: 1,
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 18,
                  padding: '16px 6px 18px',
                  background: on ? '#F7F0E6' : 'rgba(247,240,230,0.08)',
                  color: on ? '#10151F' : '#F7F0E6',
                }}
              >
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 16, fontWeight: 700 }}>{d.short}</p>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, opacity: 0.7, marginTop: 4 }}>
                  {d.date.replace('Oct ', '')}
                </p>
              </motion.button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 30,
              fontWeight: 600,
              color: '#F7F0E6',
            }}
          >
            {day.label}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              fontStyle: 'italic',
              color: 'rgba(247,240,230,0.55)',
            }}
          >
            {DAY_HERO[day.id] ?? day.theme}
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
          <Chip on={track === 'all'} onClick={() => setTrack('all')} label="All" />
          {TRACKS.map((t) => (
            <Chip key={t.id} on={track === t.id} onClick={() => setTrack(t.id)} label={t.label} />
          ))}
          <Chip
            on={starredOnly}
            onClick={() => setStarredOnly((v) => !v)}
            label={agenda.count ? `★ ${agenda.count}` : '★'}
          />
        </div>

        {SESSIONS.some((s) => s.dayId === dayId && s.track !== 'all') && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
            marginBottom: 14,
            fontFamily: 'var(--font-ui)',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(247,240,230,0.4)',
            padding: '0 8px',
          }}
        >
          <span>Bhaio</span>
          <span style={{ textAlign: 'right' }}>Behno</span>
        </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 24 }}>
          {groups.length === 0 && (
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 18, color: 'rgba(247,240,230,0.55)', padding: '20px 0' }}>
              Nothing in this filter.
            </p>
          )}
          {groups.map((group) => (
            <BoardRow
              key={group.map((s) => s.id).join('-')}
              group={group}
              openId={openId}
              setOpenId={setOpenId}
              agenda={agenda}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function BoardRow({
  group,
  openId,
  setOpenId,
  agenda,
}: {
  group: NamSession[];
  openId: string | null;
  setOpenId: (id: string | null) => void;
  agenda: ReturnType<typeof useAgenda>;
}) {
  const combined = group.length === 1 && group[0].track === 'all';
  const bhaio = group.find((s) => s.track === 'bhaio' || s.track === 'all');
  const behno = group.find((s) => s.track === 'behno' || s.track === 'all');
  const split = !combined && group.some((s) => s.track !== 'all');

  if (split && (bhaio || behno)) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
        }}
      >
        {bhaio ? <LaneCard s={bhaio} openId={openId} setOpenId={setOpenId} agenda={agenda} /> : <div />}
        {behno && behno.id !== bhaio?.id ? (
          <LaneCard s={behno} openId={openId} setOpenId={setOpenId} agenda={agenda} />
        ) : (
          <div />
        )}
      </div>
    );
  }

  return <LaneCard s={group[0]} openId={openId} setOpenId={setOpenId} agenda={agenda} wide />;
}

function LaneCard({
  s,
  openId,
  setOpenId,
  agenda,
  wide,
}: {
  s: NamSession;
  openId: string | null;
  setOpenId: (id: string | null) => void;
  agenda: ReturnType<typeof useAgenda>;
  wide?: boolean;
}) {
  const open = openId === s.id;
  const starred = agenda.has(s.id);
  const kind = KIND[s.kind];
  const compact = s.kind === 'travel';

  return (
    <div
      style={{
        background: compact ? 'rgba(247,240,230,0.04)' : 'rgba(247,240,230,0.08)',
        borderRadius: 20,
        overflow: 'hidden',
        gridColumn: wide ? '1 / -1' : undefined,
        borderLeft: `4px solid ${kind.color}`,
      }}
    >
      <div style={{ display: 'flex', gap: 10, padding: compact ? '14px 16px' : '18px 16px 18px 18px' }}>
        <button
          onClick={() => agenda.toggle(s.id)}
          style={{
            width: 40,
            height: 40,
            flexShrink: 0,
            border: 'none',
            borderRadius: 12,
            cursor: 'pointer',
            background: starred ? 'rgba(232,201,160,0.22)' : 'rgba(247,240,230,0.06)',
            color: starred ? '#E8C9A0' : 'rgba(247,240,230,0.35)',
            fontSize: 18,
          }}
          aria-label={starred ? 'Remove from agenda' : 'Add to agenda'}
        >
          {starred ? '★' : '☆'}
        </button>
        <button
          onClick={() => setOpenId(open ? null : s.id)}
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            padding: 0,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 15,
                fontWeight: 700,
                fontVariantNumeric: 'tabular-nums',
                color: '#E8C9A0',
              }}
            >
              {s.start}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: kind.color,
              }}
            >
              {kind.label}
            </p>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: compact ? 20 : 24,
              fontWeight: 600,
              color: '#F7F0E6',
              marginTop: 4,
              lineHeight: 1.15,
            }}
          >
            {s.title}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 14,
              color: 'rgba(247,240,230,0.5)',
              marginTop: 4,
            }}
          >
            {s.end} · {s.location}
            {s.track === 'all' ? ' · Combined' : s.track === 'bhaio' ? ' · Bhaio' : ' · Behno'}
          </p>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 16,
                color: 'rgba(247,240,230,0.62)',
                lineHeight: 1.5,
                padding: '0 20px 20px 68px',
              }}
            >
              {s.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Chip({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: 'none',
        cursor: 'pointer',
        borderRadius: 999,
        padding: '11px 16px',
        fontFamily: 'var(--font-ui)',
        fontSize: 15,
        fontWeight: 600,
        background: on ? '#F7F0E6' : 'rgba(247,240,230,0.08)',
        color: on ? '#10151F' : 'rgba(247,240,230,0.7)',
      }}
    >
      {label}
    </button>
  );
}
