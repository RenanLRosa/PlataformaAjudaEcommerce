function StatCard({ value, label, color, onClick, linkLabel }) {
  return (
    <div
      className="bg-white border border-[#D6E4EF] rounded-[10px] px-5 py-4.5"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <div className="text-[28px] font-extrabold text-[#004070] leading-none font-mono">{value}</div>
      <div className="text-xs text-neutral-500 mt-1">{label}</div>
      <button
        onClick={onClick}
        className="text-[11px] font-bold mt-1.5 font-mono"
        style={{ color }}
      >
        {linkLabel} →
      </button>
    </div>
  );
}

function QuickAccessCard({ icon, iconBg, iconColor, title, desc, onClick, hoverColor }) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-[#D6E4EF] rounded-[10px] px-[18px] pt-[18px] pb-4 text-left flex flex-col gap-1.5 transition-all"
      style={{ '--hover-color': hoverColor }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = hoverColor;
        e.currentTarget.style.boxShadow = `0 4px 16px ${hoverColor}22`;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = '#D6E4EF';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div
        className="w-[34px] h-[34px] rounded-lg flex items-center justify-center"
        style={{ background: iconBg }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
          {icon}
        </svg>
      </div>
      <div className="text-sm font-bold text-neutral-900">{title}</div>
      <div className="text-xs text-neutral-500 leading-relaxed">{desc}</div>
    </button>
  );
}

export default function HomePage({ data, onNavigate }) {
  return (
    <div className="w-full">
      <div className="bg-[#004070] px-7 pt-8 pb-7 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-[220px] h-[220px] bg-[#A0E800]/[0.07] rounded-full pointer-events-none" />
        <div className="absolute -bottom-15 right-20 w-[140px] h-[140px] bg-[#004070]/15 rounded-full pointer-events-none" />
        <div className="text-[11px] font-bold tracking-wide uppercase text-[#7FA8C7] mb-2.5 font-mono">
          Ajuda Ecommerce
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight leading-tight font-mono">
          Central de <span className="text-[#A0E800]">Ferramentas</span>
        </h1>
        <p className="text-[#7FA8C7] text-sm mt-1.5">
          Gerencie entregas, mensagens e documentos da agência em um só lugar.
        </p>
        <div className="mt-3.5 h-0.5 bg-[#A0E800] rounded w-12" />
      </div>

      <div className="px-7 pt-6 pb-8 flex flex-col gap-7 w-full">
        <div>
          <div className="text-[11px] font-bold tracking-wide uppercase text-neutral-400 mb-3 font-mono">
            Visão geral
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
            <StatCard
              value={data.msgs.length}
              label="Mensagens padrão"
              color="#004070"
              linkLabel="Ver todas"
              onClick={() => onNavigate('msgs')}
            />
            <StatCard
              value={data.pages.length}
              label="Páginas institucionais"
              color="#84C000"
              linkLabel="Ver todas"
              onClick={() => onNavigate('pages')}
            />
            <StatCard
              value={data.docs.length}
              label="PDFs e documentos"
              color="#1A6AA8"
              linkLabel="Ver todos"
              onClick={() => onNavigate('docs')}
            />
            <StatCard
              value={8}
              label="Seções no doc. entrega"
              color="#A0E800"
              linkLabel="Gerar PDF"
              onClick={() => onNavigate('pdf')}
            />
          </div>
        </div>

        <div>
          <div className="text-[11px] font-bold tracking-wide uppercase text-neutral-400 mb-3 font-mono">
            Acesso rápido
          </div>
          <div className="grid gap-2.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
            <QuickAccessCard
              icon={
                <>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </>
              }
              iconBg="#eff6ff"
              iconColor="#2563eb"
              hoverColor="#2563eb"
              title="Novo doc. de entrega"
              desc="Gerar PDF de finalização de projeto"
              onClick={() => onNavigate('pdf')}
            />
            <QuickAccessCard
              icon={<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />}
              iconBg="#f5f3ff"
              iconColor="#7c3aed"
              hoverColor="#7c3aed"
              title="Mensagens padrão"
              desc="Copiar mensagens de WhatsApp e e-mail"
              onClick={() => onNavigate('msgs')}
            />
            <QuickAccessCard
              icon={
                <>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </>
              }
              iconBg="#f3fae0"
              iconColor="#65a30d"
              hoverColor="#65a30d"
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
