import { useState } from 'react';

export default function CollapsibleCard({ title, subtitle, badge = 'Opcional', defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="overflow-hidden transition-shadow"
      style={{
        background: '#fff',
        border: '1px solid #D6E4EF',
        borderRadius: '14px',
        boxShadow: open ? '0 4px 24px rgba(0,43,77,0.08)' : '0 1px 3px rgba(0,43,77,0.04)',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors"
        style={{ background: open ? '#F7FAFC' : 'transparent' }}
        onMouseOver={e => { if (!open) e.currentTarget.style.background = '#F7FAFC'; }}
        onMouseOut={e => { if (!open) e.currentTarget.style.background = 'transparent'; }}
      >
        <div className="w-2 h-2 rounded-full flex-shrink-0 transition-all" style={{ background: open ? '#A0E800' : '#C8D8E4' }} />
        <div className="flex-1 min-w-0 flex items-center gap-2.5">
          <h3 className="text-[13.5px] font-bold text-[#002B4D] whitespace-nowrap">{title}</h3>
          <span className="text-[12px] text-[#7FA8C7] truncate">{subtitle}</span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0" style={{ background: '#EFF4F9', color: '#6B8FAA', border: '1px solid #D6E4EF' }}>
          {badge}
        </span>
        <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all" style={{ background: open ? '#A0E80020' : '#EFF4F9' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={open ? '#5A8A00' : '#8BA8BF'} strokeWidth="2.5" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="px-5 pt-4 pb-4" style={{ borderTop: '1px solid #E8EEF4' }}>
          {children}
        </div>
      )}
    </div>
  );
}
