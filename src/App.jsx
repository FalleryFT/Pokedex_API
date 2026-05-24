import { Routes, Route } from 'react-router-dom'
import usePokemon from './hooks/usePokemon'
import Navbar from './components/Navbar'
import LoadingScreen from './components/LoadingScreen'
import ErrorScreen from './components/ErrorScreen'
import DashboardPage from './pages/DashboardPage'
import TypesPage from './pages/TypesPage'

export default function App() {
  const { allPokemon, types, loading, error, progress, refetch } = usePokemon()

  // Loading state — tampil spinner + progress bar
  if (loading) return <LoadingScreen progress={progress} />

  // Error state — tampil pesan + tombol retry
  if (error) return <ErrorScreen message={error} onRetry={refetch} />

  // Data sudah siap
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar total={allPokemon.length} />

      <main className="flex-1">
        <Routes>
          {/* Halaman 1: Dashboard utama (search + filter tipe + grid) */}
          <Route
            path="/"
            element={<DashboardPage allPokemon={allPokemon} types={types} />}
          />

          {/* Halaman 2: Eksplorasi per tipe (endpoint 2) */}
          <Route
            path="/types"
            element={<TypesPage allPokemon={allPokemon} types={types} />}
          />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-4 px-6
                         flex flex-col sm:flex-row justify-between items-center
                         gap-1 text-xs text-gray-600 max-w-7xl mx-auto w-full">
        <span>Tugas Mandiri PjBL — Integrasi API — D3 TI Vokasi UB</span>
        <span className="font-mono">
          React + Axios + React Router DOM + Tailwind CSS
        </span>
      </footer>
    </div>
  )
}
