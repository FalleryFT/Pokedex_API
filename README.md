# 🎮 PokéDex Mini Dashboard — Tugas Mandiri PjBL

Mini Dashboard berbasis React yang terintegrasi dengan **PokeAPI** sebagai tugas mandiri (PjBL) Modul Integrasi API.

## API yang Digunakan

| No | Endpoint | Keterangan |
|----|----------|-----------|
| 1  | `GET https://pokeapi.co/api/v2/pokemon?limit=151` | Daftar 151 Pokémon Gen I + detail (sprite, tipe, stats) |
| 2  | `GET https://pokeapi.co/api/v2/type` | Semua tipe Pokémon (untuk fitur filter) |

## Fitur yang Diimplementasikan

| No | Ketentuan | Status |
|----|-----------|--------|
| 1  | Minimal 2 endpoint berbeda | ✅ `/pokemon` + `/type` |
| 2  | Tampil dalam bentuk card/grid | ✅ Grid responsif, klik card untuk stats |
| 3  | Fitur pencarian (search) | ✅ Search nama atau nomor ID |
| 4  | Fitur filter berdasarkan kategori | ✅ Filter berdasarkan 18 tipe |
| 5  | Loading state dan error handling | ✅ Progress bar + retry button |
| 6  | Responsif (mobile friendly) | ✅ Grid 2→3→4→5→6 kolom |
| 7  | Tailwind CSS | ✅ Tailwind CSS v3 |