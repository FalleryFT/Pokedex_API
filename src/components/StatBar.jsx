const STAT_CONFIG = [
  { key: 'hp',      label: 'HP',      cls: 'stat-hp',      max: 255 },
  { key: 'attack',  label: 'ATK',     cls: 'stat-attack',  max: 190 },
  { key: 'defense', label: 'DEF',     cls: 'stat-defense', max: 250 },
  { key: 'spAtk',   label: 'Sp.ATK',  cls: 'stat-sp-atk',  max: 194 },
  { key: 'spDef',   label: 'Sp.DEF',  cls: 'stat-sp-def',  max: 250 },
  { key: 'speed',   label: 'SPD',     cls: 'stat-speed',   max: 200 },
]

export default function StatBar({ stats }) {
  return (
    <div className="space-y-1.5">
      {STAT_CONFIG.map(({ key, label, cls, max }) => (
        <div key={key} className="flex items-center gap-2">
          <span className="w-14 text-right text-xs font-mono text-gray-400 shrink-0">
            {label}
          </span>
          <span className="w-8 text-xs font-semibold text-gray-200 text-right shrink-0">
            {stats[key]}
          </span>
          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${cls}`}
              style={{ width: `${Math.min((stats[key] / max) * 100, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
