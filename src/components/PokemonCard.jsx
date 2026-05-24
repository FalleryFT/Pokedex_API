import { useState } from 'react'
import TypeBadge from './TypeBadge'
import StatBar from './StatBar'

export default function PokemonCard({ pokemon }) {
  const [flipped, setFlipped] = useState(false)

  const idStr = String(pokemon.id).padStart(3, '0')

  return (
    <div
      className="group relative bg-gray-900 border border-gray-800 rounded-2xl
                 overflow-hidden cursor-pointer hover:border-gray-600
                 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-1
                 transition-all duration-300 animate-fade-in"
      onClick={() => setFlipped((f) => !f)}
      title="Klik untuk lihat stats"
    >
      {/* ── FRONT: gambar + nama + tipe ── */}
      {!flipped && (
        <div className="flex flex-col">
          {/* sprite container */}
          <div className="relative bg-gray-800/50 flex items-center justify-center
                          h-36 overflow-hidden">
            {/* big id watermark */}
            <span className="absolute right-3 top-2 text-5xl font-black
                             text-gray-700/50 font-mono select-none">
              #{idStr}
            </span>
            {pokemon.sprite ? (
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                loading="lazy"
                className="h-28 w-28 object-contain drop-shadow-lg
                           group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="h-28 w-28 rounded-full bg-gray-700 flex items-center
                              justify-center text-4xl text-gray-500">
                ?
              </div>
            )}
          </div>

          {/* info */}
          <div className="p-3">
            <p className="text-xs font-mono text-gray-500 mb-0.5">#{idStr}</p>
            <h3 className="font-bold capitalize text-gray-100 text-sm mb-2 truncate">
              {pokemon.name}
            </h3>
            <div className="flex flex-wrap gap-1">
              {pokemon.types.map((t) => (
                <TypeBadge key={t} type={t} />
              ))}
            </div>
          </div>

          {/* hint */}
          <p className="text-center text-xs text-gray-600 pb-2 select-none">
            klik untuk stats ↓
          </p>
        </div>
      )}

      {/* ── BACK: stats ── */}
      {flipped && (
        <div className="flex flex-col p-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            {pokemon.sprite && (
              <img src={pokemon.sprite} alt={pokemon.name}
                   className="h-10 w-10 object-contain" />
            )}
            <div>
              <h3 className="font-bold capitalize text-gray-100 text-sm">
                {pokemon.name}
              </h3>
              <div className="flex gap-1 mt-0.5">
                {pokemon.types.map((t) => <TypeBadge key={t} type={t} />)}
              </div>
            </div>
          </div>

          <StatBar stats={pokemon.stats} />

          <div className="flex gap-3 mt-3 pt-3 border-t border-gray-800
                          text-xs text-gray-500">
            <span>⚖ {(pokemon.weight / 10).toFixed(1)} kg</span>
            <span>📏 {(pokemon.height / 10).toFixed(1)} m</span>
          </div>

          <p className="text-center text-xs text-gray-600 mt-2 select-none">
            klik untuk kembali ↑
          </p>
        </div>
      )}
    </div>
  )
}
