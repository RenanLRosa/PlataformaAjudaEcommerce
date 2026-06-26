export default function AdminBanner({ onExport, onReset }) {
  return (
    <div className="bg-[#0d0d0d] border-b border-[#2a3d18] px-5 py-1.5 flex items-center justify-between gap-3 flex-wrap text-[11px] text-neutral-500">
      <div className="flex items-center gap-2 text-[#84C000] font-bold uppercase tracking-wide">
        Modo admin ativo — alterações salvas automaticamente
      </div>
      <div className="flex gap-1.5 flex-wrap">
        <button
          onClick={onExport}
          className="border border-neutral-800 bg-neutral-900 text-neutral-500 text-[11px] font-semibold px-2.5 py-1 rounded transition-colors hover:border-[#84C000] hover:text-[#A0E800] hover:bg-[#172010]"
        >
          Exportar dados (JSON)
        </button>
        <button
          onClick={onReset}
          className="border border-neutral-800 bg-neutral-900 text-neutral-500 text-[11px] font-semibold px-2.5 py-1 rounded transition-colors hover:border-red-500 hover:text-red-500 hover:bg-red-950"
        >
          Restaurar padrão
        </button>
      </div>
    </div>
  );
}
