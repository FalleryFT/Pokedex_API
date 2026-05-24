import { useState, useEffect, useCallback } from 'react'
import pokeApi from '../api/pokeApi'

/**
 * Custom Hook: usePokemon
 *
 * Mengambil data dari DUA endpoint berbeda (sesuai ketentuan PjBL):
 *   Endpoint 1 → GET /pokemon?limit=151   (daftar 151 Pokemon generasi pertama)
 *   Endpoint 2 → GET /type               (semua tipe Pokemon untuk filter)
 *
 * Setiap Pokemon di-fetch detail-nya (sprite + tipe) secara batch.
 */
export default function usePokemon() {
  const [allPokemon, setAllPokemon] = useState([])  // data lengkap
  const [types, setTypes]           = useState([])  // data tipe (endpoint 2)
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [progress, setProgress]     = useState(0)   // progress fetch detail

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    setProgress(0)

    try {
      // ── ENDPOINT 1: Daftar 151 Pokemon ──────────────────────────────
      const listRes = await pokeApi.get('/pokemon', {
        params: { limit: 151, offset: 0 },
      })
      const pokemonList = listRes.data.results // [{name, url}, ...]

      // ── ENDPOINT 2: Semua tipe Pokemon (untuk filter) ────────────────
      const typeRes = await pokeApi.get('/type')
      const typeList = typeRes.data.results
        .filter((t) => !['unknown', 'shadow'].includes(t.name))
        .map((t) => t.name)
      setTypes(typeList)

      // ── Fetch detail tiap Pokemon (sprite + tipe) ────────────────────
      // Batch per 20 agar tidak spam terlalu banyak sekaligus
      const detailed = []
      const batchSize = 20

      for (let i = 0; i < pokemonList.length; i += batchSize) {
        const batch = pokemonList.slice(i, i + batchSize)
        const results = await Promise.all(
          batch.map((p) => pokeApi.get(p.url.replace('https://pokeapi.co/api/v2', '')))
        )
        results.forEach((res) => {
          const d = res.data
          detailed.push({
            id:      d.id,
            name:    d.name,
            sprite:  d.sprites.other['official-artwork'].front_default ||
                     d.sprites.front_default,
            types:   d.types.map((t) => t.type.name),
            stats: {
              hp:      d.stats[0].base_stat,
              attack:  d.stats[1].base_stat,
              defense: d.stats[2].base_stat,
              spAtk:   d.stats[3].base_stat,
              spDef:   d.stats[4].base_stat,
              speed:   d.stats[5].base_stat,
            },
            height: d.height,
            weight: d.weight,
          })
        })
        // update progress bar
        setProgress(Math.round(((i + batchSize) / pokemonList.length) * 100))
      }

      setAllPokemon(detailed)
    } catch (err) {
      setError(err.message || 'Gagal mengambil data dari PokeAPI.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { allPokemon, types, loading, error, progress, refetch: fetchData }
}
