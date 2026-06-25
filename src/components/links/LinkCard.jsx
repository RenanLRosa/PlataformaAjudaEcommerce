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
    <div
      className="bg-white rounded-xl flex flex-col gap-3 overflow-hidden transition-all"
      style={{
        border: '1px solid #E8EEF4',
        boxShadow: '0 1px 3px rgba(0,43,77,0.05)',
      }}
      onMouseOver={e => { e.currentTarget.style.boxShadow = `0 4px 20px ${color}22, 0 1px 3px rgba(0,43,77,0.05)`; e.currentTarget.style.borderColor = `${color}55`; }}
      onMouseOut={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,43,77,0.05)'; e.currentTarget.style.borderColor = '#E8EEF4'; }}
    >
      <div style={{ height: '3px', background: color }} />
      <div className="px-4 pb-0 flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: `${color}15` }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: color }} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-[13px] font-bold text-[#002B4D]">{link.name}</h4>
          <span className="text-[11px] text-neutral-400 break-all font-mono">{link.url}</span>
          <div className="mt-1 flex items-center gap-1">
            {link.desc ? (
              <span className="text-[12px] text-neutral-500 line-clamp-2">{link.desc}</span>
            ) : (
              <span className="text-[12px] text-neutral-300">Sem descrição</span>
            )}
            <button onClick={onSeeMore} className="text-[11px] font-bold ml-1 flex-shrink-0" style={{ color }}>
              Ver mais →
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-3.5 flex gap-2 flex-wrap">
        <button
          onClick={() => handleCopy('url', link.url)}
          className="flex-1 px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all"
          style={{
            border: `1px solid ${copiedField === 'url' ? color : '#D6E4EF'}`,
            color: copiedField === 'url' ? color : '#4A6A85',
            background: copiedField === 'url' ? `${color}0D` : '#F7FAFC',
          }}
        >
          {copiedField === 'url' ? '✓ Copiado!' : 'Copiar link'}
        </button>
        <button
          onClick={() => handleCopy('share', buildLinkShareMessage(link))}
          className="flex-1 px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all"
          style={{
            border: `1px solid ${copiedField === 'share' ? color : '#D6E4EF'}`,
            color: copiedField === 'share' ? color : '#4A6A85',
            background: copiedField === 'share' ? `${color}0D` : '#F7FAFC',
          }}
        >
          {copiedField === 'share' ? '✓ Copiado!' : 'Copiar p/ compartilhar'}
        </button>
      </div>

      {adminMode && (
        <div className="px-4 pb-3 flex gap-1.5 flex-wrap border-t border-[#F0F4F8] pt-2.5">
          <MiniButton onClick={onEdit}>Editar</MiniButton>
          <ReorderButtons index={index} total={total} onMove={onMove} />
          <MiniButton danger onClick={onDelete}>Excluir</MiniButton>
        </div>
      )}
    </div>
  );
}

