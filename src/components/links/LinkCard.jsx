import { useState } from 'react';
import MiniButton from '../common/MiniButton';
import ReorderButtons from '../common/ReorderButtons';
import { copyToClipboard } from '../../utils/helpers';
import { buildLinkShareMessage } from '../../utils/linkShare';

export default function LinkCard({ link, index, total, adminMode, onEdit, onMove, onDelete, onSeeMore }) {
  const [copiedField, setCopiedField] = useState(null);
  const color = link.color || '#1e40af';

  const handleCopy = async (field, text) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1600);
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-[3px] p-4 flex flex-col gap-3">
      <div className="flex items-start gap-2.5">
        <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: color }} />
        <div className="flex-1 min-w-0">
          <h4 className="text-[13px] font-semibold text-neutral-900">{link.name}</h4>
          <span className="text-xs text-neutral-400 break-all">{link.url}</span>
          <div className="mt-1">
            {link.desc ? (
              <span className="text-xs text-neutral-500 line-clamp-2">{link.desc}</span>
            ) : (
              <span className="text-xs text-neutral-300">Sem descrição</span>
            )}
            <button onClick={onSeeMore} className="text-[11px] font-semibold text-blue-600 ml-1.5 hover:underline">
              Ver mais
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        <button
          onClick={() => handleCopy('url', link.url)}
          className="flex-1 px-2.5 py-1.5 border border-neutral-300 rounded text-xs font-semibold text-neutral-600 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
        >
          {copiedField === 'url' ? 'Copiado!' : 'Copiar link'}
        </button>
        <button
          onClick={() => handleCopy('share', buildLinkShareMessage(link))}
          className="flex-1 px-2.5 py-1.5 border border-neutral-300 rounded text-xs font-semibold text-neutral-600 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
        >
          {copiedField === 'share' ? 'Copiado!' : 'Copiar para compartilhar'}
        </button>
      </div>

      {adminMode && (
        <div className="flex gap-1.5 flex-wrap">
          <MiniButton onClick={onEdit}>Editar</MiniButton>
          <ReorderButtons index={index} total={total} onMove={onMove} />
          <MiniButton danger onClick={onDelete}>
            Excluir
          </MiniButton>
        </div>
      )}
    </div>
  );
}
