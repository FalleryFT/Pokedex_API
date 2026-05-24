import { useState, useMemo } from 'react'
import TypeBadge from '../components/TypeBadge'
import PokemonCard from '../components/PokemonCard'

export default function TypesPage({ allPokemon, types }) {
  const [selectedType, setSelectedType] = useState(types[0] || 'fire')
  const [search, setSearch] = useState('')

  // Pokemon dengan tipe yang dipilih
  const filtered = useMemo(() => {
    let result = allPokemon.filter((p) => p.types.includes(selectedType))
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter((p) => p.name.includes(q) || String(p.id).includes(q))
    }
    return result
  }, [allPokemon, selectedType, search])

  // Statistik per tipe
  const stats = useMemo(() => {
    if (filtered.length === 0) return null
    const avgHp  = Math.round(filtered.reduce((s, p) => s + p.stats.hp, 0) / filtered.length)
    const avgAtk = Math.round(filtered.reduce((s, p) => s + p.stats.attack, 0) / filtered.length)
    const avgSpd = Math.round(filtered.reduce((s, p) => s + p.stats.speed, 0) / filtered.length)
    return { avgHp, avgAtk, avgSpd, count: filtered.length }
  }, [filtered])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black mb-1">Eksplorasi Tipe Pokémon</h1>
        <p className="text-gray-400 text-sm">
          Data tipe dari{' '}
          <span className="font-mono text-blue-400 text-xs">
            pokeapi.co/api/v2/type
          </span>
          {' '}— pilih tipe untuk melihat Pokémon & statistiknya.
        </p>
      </div>

      {/* Type selector */}
      <div className="flex flex-wrap gap-2 mb-6 p-4 bg-gray-900 rounded-2xl
                      border border-gray-800">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => { setSelectedType(t); setSearch('') }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border capitalize
                        transition-all ${
                          selectedType === t
                            ? `type-${t} scale-105 shadow-lg`
                            : 'bg-transparent text-gray-500 border-gray-800 hover:border-gray-600 hover:text-gray-300'
                        }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Stats cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total Pokémon', value: stats.count, icon: '⬤' },
            { label: 'Rata-rata HP',  value: stats.avgHp,  icon: '♥' },
            { label: 'Rata-rata ATK', value: stats.avgAtk, icon: '⚔' },
            { label: 'Rata-rata SPD', value: stats.avgSpd, icon: '⚡' },
          ].map((s) => (
            <div key={s.label}
                 className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1 flex items-center gap-1">
                <span>{s.icon}</span> {s.label}
              </p>
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-xs capitalize mt-0.5">
                <TypeBadge type={selectedType} />
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">⌕</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari di tipe ini..."
          className="w-full bg-gray-900 border border-gray-700 rounded-xl
                     pl-9 pr-4 py-2.5 text-sm text-gray-100 placeholder-gray-500
                     focus:outline-none focus:border-blue-500/60 transition"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-sm"
          >✕</button>
        )}
      </div>

      {/* Result count */}
      <p className="text-sm text-gray-500 mb-4">
        <span className="text-white font-semibold">{filtered.length}</span> Pokémon tipe{' '}
        <span className="capitalize text-white">{selectedType}</span>
        {search && <span> cocok dengan "{search}"</span>}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-gray-600">
          <span className="text-4xl">🔍</span>
          <p>Tidak ada hasil.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                        lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filtered.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}
    </div>
  )
}
