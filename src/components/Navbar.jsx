import { Link, NavLink } from 'react-router-dom'

export default function Navbar({ total }) {
  return (
    <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl">⬤</span>
          <span className="font-black text-lg tracking-tight">
            Poké<span className="text-red-400">Dex</span>
          </span>
          <span className="hidden sm:inline text-xs font-mono text-gray-500
                           bg-gray-800 px-2 py-0.5 rounded-full border border-gray-700">
            Gen I — {total} Pokémon
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/types"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              }`
            }
          >
            Tipe
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
