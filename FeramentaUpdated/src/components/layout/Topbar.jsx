const PAGE_LABELS = {
  home: 'Início',
  pdf: 'Documento de Entrega',
  msgs: 'Mensagens Padrão',
  pages: 'Páginas Institucionais',
  images: 'Imagens',
  links: 'Links Úteis',
  docs: 'PDFs e Documentos',
};

export default function Topbar({ currentPage }) {
  return (
    <div className="bg-[#004070] h-11 min-h-11 flex items-center px-5 border-b-2 border-[#A0E800] sticky top-0 z-50">
      <div className="text-xs text-[#7FA8C7] flex items-center gap-1.5 font-mono">
        <span>ajuda ecommerce</span>
        <span className="text-[#1A6AA8]">/</span>
        <span className="text-[#D6E4EF] font-bold">{PAGE_LABELS[currentPage] || ''}</span>
      </div>
    </div>
  );
}
