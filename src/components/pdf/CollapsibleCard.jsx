import { useState } from 'react';

export default function CollapsibleCard({ title, subtitle, badge = 'Opcional', defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-neutral-200 rounded-md overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-neutral-50"
      >
        <h3 className="text-sm font-bold text-neutral-900">{title}</h3>
        <span className="text-xs text-neutral-400 flex-1 truncate">{subtitle}</span>
        <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded-sm whitespace-nowrap">
          {badge}
        </span>
        <span className={`text-[10px] text-neutral-400 transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && <div className="px-4 pb-4 pt-1 flex flex-col gap-3 border-t border-neutral-100">{children}</div>}
    </div>
  );
}
