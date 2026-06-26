export default function Modal({ open, onClose, title, subtitle, children, footer, wide = false }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/65 z-[1000] flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className={`bg-white border border-neutral-300 rounded-md w-full ${wide ? 'max-w-2xl' : 'max-w-md'} max-h-[92vh] overflow-y-auto shadow-2xl`}
      >
        <div className="px-[18px] pt-[15px] pb-[11px] border-b border-neutral-200 flex justify-between items-start gap-3">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">{title}</h3>
            {subtitle && <p className="text-xs text-neutral-500 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 text-lg leading-none px-1"
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
        <div className="px-[18px] py-4 flex flex-col gap-3.5">{children}</div>
        {footer && (
          <div className="px-[18px] py-3 flex gap-2 justify-end border-t border-neutral-200">{footer}</div>
        )}
      </div>
    </div>
  );
}
