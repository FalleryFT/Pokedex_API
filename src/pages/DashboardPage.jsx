import { useState, useMemo } from 'react'
import PokemonCard from '../components/PokemonCard'
import TypeBadge from '../components/TypeBadge'

export default function DashboardPage({ allPokemon, types }) {
  const [search, setSearch]       = useState('')
  const [activeType, setActiveType] = useState('all') // filter tipe
  const [sortBy, setSortBy]       = useState('id')    // id | name | hp | atk

  // ── Filter + Search + Sort ───────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = [...allPokemon]

    // Filter tipe
    if (activeType !== 'all') {
      result = result.filter((p) => p.types.includes(activeType))
    }

    // Search berdasarkan nama atau id
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        (p) =>
          p.name.includes(q) ||
          String(p.id).includes(q)
      )
    }

    // Sort
    if (sortBy === 'name')    result.sort((a, b) => a.name.localeCompare(b.name))
    if (sortBy === 'id')      result.sort((a, b) => a.id - b.id)
    if (sortBy === 'hp')      result.sort((a, b) => b.stats.hp - a.stats.hp)
    if (sortBy === 'attack')  result.sort((a, b) => b.stats.attack - a.stats.attack)

    return result
  }, [allPokemon, search, activeType, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

      {/* ── Hero banner ─────────────────────────────────────────────── */}
      <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-red-500/10
                      via-gray-900 to-blue-500/10 border border-gray-800">
        <h1 className="text-2xl font-black mb-1">
          PokéDex Mini Dashboard
        </h1>
        <p className="text-gray-400 text-sm">
          Menampilkan <span className="text-white font-semibold">151 Pokémon</span> Generasi I
          dari <span className="font-mono text-red-400 text-xs">pokeapi.co/api/v2/pokemon</span>.
          Tipe diambil dari <span className="font-mono text-blue-400 text-xs">pokeapi.co/api/v2/type</span>.
          Klik kartu untuk melihat stats.
        </p>
      </div>

      {/* ── Controls: search + sort ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
            ⌕
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau nomor (cth: pikachu, 25)..."
            className="w-full bg-gray-900 border border-gray-700 rounded-xl
                       pl-9 pr-4 py-2.5 text-sm text-gray-100 placeholder-gray-500
                       focus:outline-none focus:border-red-500/60 focus:ring-1
                       focus:ring-red-500/20 transition"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500
                         hover:text-gray-300 text-sm"
            >✕</button>
          )}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5
                     text-sm text-gray-300 focus:outline-none focus:border-red-500/60
                     cursor-pointer"
        >
          <option value="id">Urut: ID</option>
          <option value="name">Urut: Nama</option>
          <option value="hp">Urut: HP tertinggi</option>
          <option value="attack">Urut: Attack tertinggi</option>
        </select>
      </div>

      {/* ── Type Filter ─────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setActiveType('all')}
          className={`px-3 py-1 rounded-full text-xs font-semibold border
                      transition-all ${
                        activeType === 'all'
                          ? 'bg-white text-gray-900 border-white'
                          : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'
                      }`}
        >
          Semua
        </button>
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(activeType === t ? 'all' : t)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize
                        transition-all ${
                          activeType === t
                            ? `type-${t} scale-105`
                            : 'bg-transparent text-gray-500 border-gray-800 hover:border-gray-600'
                        }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Results count ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          Menampilkan{' '}
          <span className="text-white font-semibold">{filtered.length}</span>
          {' '}dari <span className="text-white font-semibold">{allPokemon.length}</span>{' '}
          Pokémon
          {activeType !== 'all' && (
            <span> — tipe <span className="capitalize text-red-400">{activeType}</span></span>
          )}
        </p>
        {(search || activeType !== 'all') && (
          <button
            onClick={() => { setSearch(''); setActiveType('all') }}
            className="text-xs text-gray-500 hover:text-gray-300 underline"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* ── Grid ───────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-gray-600">
          <span className="text-4xl">🔍</span>
          <p>Tidak ada Pokémon yang cocok.</p>
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
