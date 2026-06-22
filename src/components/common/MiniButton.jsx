export default function MiniButton({ children, onClick, danger = false, disabled = false, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-2 py-0.5 border rounded text-xs font-semibold bg-white transition-colors
        disabled:opacity-30 disabled:cursor-not-allowed
        ${
          danger
            ? 'border-neutral-300 text-neutral-500 hover:border-red-500 hover:text-red-500 hover:bg-red-50'
            : 'border-neutral-300 text-neutral-500 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50'
        }`}
    >
      {children}
    </button>
  );
}
