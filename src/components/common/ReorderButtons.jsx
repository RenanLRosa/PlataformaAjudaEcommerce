export default function ReorderButtons({ index, total, onMove }) {
  return (
    <span className="flex gap-1">
      <button
        type="button"
        disabled={index === 0}
        onClick={() => onMove(-1)}
        className="px-2 py-0.5 border border-neutral-300 rounded text-xs font-semibold text-neutral-500 bg-white
          hover:border-blue-600 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ↑
      </button>
      <button
        type="button"
        disabled={index === total - 1}
        onClick={() => onMove(1)}
        className="px-2 py-0.5 border border-neutral-300 rounded text-xs font-semibold text-neutral-500 bg-white
          hover:border-blue-600 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ↓
      </button>
    </span>
  );
}
