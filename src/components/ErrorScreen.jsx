export default function ErrorScreen({ message, onRetry }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <div className="text-6xl">💥</div>
      <h2 className="text-xl font-bold text-red-400">Gagal Memuat Data</h2>
      <p className="text-gray-400 text-sm font-mono text-center max-w-sm">
        {message}
      </p>
      <button
        onClick={onRetry}
        className="px-6 py-2.5 bg-red-500 hover:bg-red-400 text-white font-semibold
                   rounded-xl transition-colors text-sm"
      >
        Coba Lagi
      </button>
    </div>
  )
}
