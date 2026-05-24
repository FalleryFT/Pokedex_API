import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Navbar({ total }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 backdrop-blur border-b
                    bg-gray-950/80 border-gray-800
                    dark:bg-gray-950/80 dark:border-gray-800
                    [html:not(.dark)_&]:bg-white/80 [html:not(.dark)_&]:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl">⬤</span>
          <span className="font-black text-lg tracking-tight">
            Poké<span className="text-red-400">Dex</span>
          </span>
          <span className="hidden sm:inline text-xs font-mono px-2 py-0.5 rounded-full border
                           bg-gray-800 border-gray-700 text-gray-500
                           dark:bg-gray-800 dark:border-gray-700 dark:text-gray-500
                           [html:not(.dark)_&]:bg-slate-100 [html:not(.dark)_&]:border-slate-200 [html:not(.dark)_&]:text-slate-500">
            Gen I — {total} Pokémon
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <NavLink to="/" end
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800 dark:hover:bg-gray-800 [html:not(.dark)_&]:text-slate-500 [html:not(.dark)_&]:hover:bg-slate-100 [html:not(.dark)_&]:hover:text-slate-800'
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink to="/types"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800 dark:hover:bg-gray-800 [html:not(.dark)_&]:text-slate-500 [html:not(.dark)_&]:hover:bg-slate-100 [html:not(.dark)_&]:hover:text-slate-800'
              }`
            }
          >
            Tipe
          </NavLink>

          {/* Tombol toggle dark/light */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Switch ke Light Mode' : 'Switch ke Dark Mode'}
            className="ml-2 w-9 h-9 rounded-xl flex items-center justify-center text-lg
                       transition-all border
                       bg-gray-800 border-gray-700 hover:border-gray-500
                       dark:bg-gray-800 dark:border-gray-700
                       [html:not(.dark)_&]:bg-slate-100 [html:not(.dark)_&]:border-slate-200
                       [html:not(.dark)_&]:hover:border-slate-400"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

      </div>
    </nav>
  )
}