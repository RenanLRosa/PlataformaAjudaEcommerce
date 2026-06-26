import { useState } from 'react';
import { SAMPLE_LOGO_B64 } from '../../data/sampleLogoBase64';

const NAV_ITEMS = [
  { id: 'home', label: 'Início' },
  { id: 'pdf', label: 'Documento de Entrega' },
];

const GROUP_ITEMS = [
  { id: 'msgs', label: 'Mensagens Padrão' },
  { id: 'pages', label: 'Páginas Institucionais' },
];

const BOTTOM_ITEMS = [
  { id: 'tutorials', label: 'Tutoriais' },
  { id: 'images', label: 'Imagens' },
  { id: 'links', label: 'Links Úteis' },
  { id: 'docs', label: 'PDFs e Documentos' },
];

export default function Sidebar({ currentPage, onNavigate, adminMode, onToggleAdmin }) {
  const [groupOpen, setGroupOpen] = useState(true);
  const groupActive = currentPage === 'msgs' || currentPage === 'pages';

  return (
    <nav className="w-[224px] min-w-[224px] bg-[#002B4D] border-r border-[#003660] flex flex-col h-screen sticky top-0 flex-shrink-0 z-[200]">
      <div className="px-4 pt-4 pb-3.5 border-b border-[#003660]">
        <img src={SAMPLE_LOGO_B64} alt="Ajuda // ecommerce" className="h-8 w-auto opacity-90" draggable={false} />
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-1.5">
        <div className="px-3.5 pt-3.5 pb-0.5 text-[10px] font-bold tracking-wide uppercase text-neutral-500">
          Principal
        </div>

        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`relative w-full text-left flex items-center gap-2 px-3.5 py-2 text-[13px] font-medium transition-colors
              ${
                currentPage === item.id
                  ? 'bg-[#004070] text-[#A0E800] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[#A0E800]'
                  : 'text-neutral-300 hover:bg-[#003660] hover:text-neutral-100'
              }`}
          >
            {item.label}
          </button>
        ))}

        <div className="px-3.5 pt-3.5 pb-0.5 mt-1 text-[10px] font-bold tracking-wide uppercase text-neutral-500">
          Recursos
        </div>

        <div>
          <button
            onClick={() => setGroupOpen((o) => !o)}
            className={`relative w-full text-left flex items-center gap-2 px-3.5 py-2 text-[13px] font-medium transition-colors
              ${groupActive ? 'bg-[#004070] text-[#A0E800] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[#A0E800]' : 'text-neutral-300 hover:bg-[#003660] hover:text-neutral-100'}`}
          >
            <span className="flex-1">CopyPastes</span>
            <span
              className={`text-[9px] text-neutral-500 transition-transform ${groupOpen ? 'rotate-90' : ''}`}
            >
              ▶
            </span>
          </button>
          {groupOpen && (
            <div>
              {GROUP_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full text-left flex items-center gap-2 pl-7 pr-3.5 py-1.5 text-[12.5px] transition-colors
                    ${
                      currentPage === item.id
                        ? 'text-[#A0E800] bg-[rgba(26,46,15,.5)]'
                        : 'text-[#7FA8C7] hover:bg-[#003660] hover:text-neutral-200'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {BOTTOM_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`relative w-full text-left flex items-center gap-2 px-3.5 py-2 text-[13px] font-medium transition-colors
              ${
                currentPage === item.id
                  ? 'bg-[#004070] text-[#A0E800] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[#A0E800]'
                  : 'text-neutral-300 hover:bg-[#003660] hover:text-neutral-100'
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="border-t border-[#003660] py-2 px-0">
        <button
          onClick={onToggleAdmin}
          className="w-full flex items-center gap-2 px-3.5 py-2"
        >
          <span className={`text-[13px] font-semibold flex-1 text-left ${adminMode ? 'text-[#A0E800]' : 'text-neutral-400'}`}>
            Admin
          </span>
          <span
            className={`w-[30px] h-[17px] rounded-full relative transition-colors ${adminMode ? 'bg-[#2a4a10]' : 'bg-neutral-700'}`}
          >
            <span
              className={`absolute top-[2px] left-[2px] w-[13px] h-[13px] rounded-full transition-transform ${
                adminMode ? 'translate-x-[13px] bg-[#A0E800]' : 'bg-neutral-500'
              }`}
            />
          </span>
        </button>
      </div>
    </nav>
  );
}
