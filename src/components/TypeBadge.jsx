export default function TypeBadge({ type }) {
  return (
    <span
      className={`type-${type} inline-flex items-center px-2 py-0.5 rounded-full
                  text-xs font-semibold border capitalize tracking-wide`}
    >
      {type}
    </span>
  )
}
