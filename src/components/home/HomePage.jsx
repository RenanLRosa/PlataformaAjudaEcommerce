function StatCard({ value, label, color, onClick, linkLabel }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl px-5 py-4 text-left group transition-all"
      style={{
        border: '1px solid #E8EEF4',
        boxShadow: '0 1px 3px rgba(0,43,77,0.05)',
      }}
      onMouseOver={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = `0 4px 20px ${color}22`; }}
      onMouseOut={e => { e.currentTarget.style.borderColor = '#E8EEF4'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,43,77,0.05)'; }}
    >
      <div className="text-[30px] font-black text-[#002B4D] leading-none font-mono">{value}</div>
      <div className="text-[11px] text-neutral-500 mt-1 font-medium uppercase tracking-wide">{label}</div>
      <div className="text-[11px] font-bold mt-2 flex items-center gap-1" style={{ color }}>
        {linkLabel}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </button>
  );
}

function QuickAccessCard({ icon, iconBg, iconColor, title, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl px-4 pt-4 pb-3.5 text-left flex flex-col gap-2 transition-all"
      style={{
        border: '1px solid #E8EEF4',
        boxShadow: '0 1px 3px rgba(0,43,77,0.04)',
      }}
      onMouseOver={e => { e.currentTarget.style.borderColor = iconColor; e.currentTarget.style.boxShadow = `0 6px 24px ${iconColor}18`; }}
      onMouseOut={e => { e.currentTarget.style.borderColor = '#E8EEF4'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,43,77,0.04)'; }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: iconBg }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
          {icon}
        </svg>
      </div>
      <div className="text-[13px] font-bold text-[#002B4D]">{title}</div>
      <div className="text-[12px] text-neutral-500 leading-relaxed">{desc}</div>
    </button>
  );
}

export default function HomePage({ data, onNavigate }) {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-[#002B4D] px-7 pt-9 pb-8 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(160,232,0,0.08) 0%, transparent 70%)', transform: 'translate(80px, -80px)' }}
        />
        <div className="absolute bottom-0 left-1/2 w-full h-px pointer-events-none" style={{ background: 'linear-gradient(to right, transparent, #A0E80030, transparent)' }} />

        <div className="text-[10px] font-black tracking-[0.2em] uppercase text-[#4A7A9B] mb-3 font-mono">
          Ajuda Ecommerce
        </div>
        <h1 className="text-[26px] font-black text-white tracking-tight leading-tight font-mono">
          Central de <span style={{ color: '#A0E800' }}>Ferramentas</span>
        </h1>
        <p className="text-[#5A9AC8] text-[13px] mt-2 max-w-md leading-relaxed">
          Gerencie entregas, mensagens e documentos da agência em um só lugar.
        </p>

        <div className="mt-5 flex items-center gap-2">
          <div className="h-0.5 w-8 rounded" style={{ background: '#A0E800' }} />
          <div className="h-0.5 w-2 rounded" style={{ background: '#1A6AA8' }} />
          <div className="h-0.5 w-1 rounded" style={{ background: '#0D3A5A' }} />
        </div>
      </div>

      <div className="px-7 pt-7 pb-10 flex flex-col gap-8 w-full">
        {/* Stats */}
        <div>
          <div className="text-[10px] font-black tracking-[0.15em] uppercase text-neutral-400 mb-3.5 font-mono flex items-center gap-2">
            <span>Visão geral</span>
            <span className="flex-1 h-px bg-neutral-100" />
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
            <StatCard value={data.msgs.length} label="Mensagens padrão" color="#004070" linkLabel="Ver todas" onClick={() => onNavigate('msgs')} />
            <StatCard value={data.pages.length} label="Páginas institucionais" color="#A0E800" linkLabel="Ver todas" onClick={() => onNavigate('pages')} />
            <StatCard value={data.docs.length} label="PDFs e documentos" color="#1A6AA8" linkLabel="Ver todos" onClick={() => onNavigate('docs')} />
            <StatCard value={8} label="Seções doc. entrega" color="#65A30D" linkLabel="Gerar PDF" onClick={() => onNavigate('pdf')} />
          </div>
        </div>

        {/* Quick Access */}
        <div>
          <div className="text-[10px] font-black tracking-[0.15em] uppercase text-neutral-400 mb-3.5 font-mono flex items-center gap-2">
            <span>Acesso rápido</span>
            <span className="flex-1 h-px bg-neutral-100" />
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))' }}>
            <QuickAccessCard
              icon={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>}
              iconBg="#EFF6FF" iconColor="#2563EB"
              title="Novo doc. de entrega"
              desc="Gerar PDF de finalização de projeto"
              onClick={() => onNavigate('pdf')}
            />
            <QuickAccessCard
              icon={<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />}
              iconBg="#F5F3FF" iconColor="#7C3AED"
              title="Mensagens padrão"
              desc="Copiar mensagens de WhatsApp e e-mail"
              onClick={() => onNavigate('msgs')}
            />
            <QuickAccessCard
              icon={<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>}
              iconBg="#F3FAE0" iconColor="#65A30D"
              title="Páginas institucionais"
              desc="HTML pronto para colar na plataforma"
              onClick={() => onNavigate('pages')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

