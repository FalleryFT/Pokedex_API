export default function LoadingScreen({ progress }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      {/* Pokeball spinner */}
      <div className="relative w-20 h-20">
        <div className="w-20 h-20 rounded-full border-4 border-gray-700
                        border-t-red-500 border-b-white animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-gray-900 border-2 border-gray-600" />
        </div>
      </div>

      <div className="text-center">
        <p className="text-white font-bold text-lg mb-1">Memuat PokéDex...</p>
        <p className="text-gray-400 text-sm font-mono">
          Mengambil data dari PokeAPI
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-64">
        <div className="flex justify-between text-xs font-mono text-gray-500 mb-1">
          <span>Progress</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-red-400
                        rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      <p className="text-xs text-gray-600 font-mono">
        Endpoint: pokeapi.co/api/v2/pokemon • /type
      </p>
    </div>
  )
}
