import { useState } from 'react';
import MiniButton from '../common/MiniButton';
import ReorderButtons from '../common/ReorderButtons';
import { copyToClipboard } from '../../utils/helpers';

export default function MessageCard({ msg, index, total, adminMode, onEdit, onMove, onDelete }) {
  const [copied, setCopied] = useState(false);
  const color = msg.color || '#2563eb';

  const handleCopy = async () => {
    const ok = await copyToClipboard(msg.text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <div
      className={`flex flex-col rounded-xl overflow-hidden bg-white ${msg.full ? 'sm:col-span-2' : ''}`}
      style={{
        border: '1px solid #E8EEF4',
        boxShadow: '0 1px 3px rgba(0,43,77,0.06), 0 4px 16px rgba(0,43,77,0.04)',
      }}
    >
      {/* Color stripe top */}
      <div style={{ height: '3px', background: color }} />

      <div className="px-4 pt-3.5 pb-3 flex flex-col gap-0.5">
        <div className="text-[14px] font-bold text-[#002B4D] leading-tight">{msg.title}</div>
        {msg.sub && <div className="text-[12px] text-neutral-400 font-medium">{msg.sub}</div>}
      </div>

      <div
        className="mx-4 mb-3 rounded-lg px-3.5 py-3 text-[13px] leading-[1.8] text-[#334155] whitespace-pre-wrap break-words flex-1 font-mono"
        style={{ background: '#F7FAFC', border: '1px solid #E8EEF4' }}
      >
        {msg.text}
      </div>

      <div className="px-4 py-3 flex gap-2 flex-wrap border-t border-[#F0F4F8]">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[12px] font-bold transition-all"
          style={{
            background: copied ? '#16a34a' : color,
            color: '#fff',
            boxShadow: copied ? '0 2px 8px rgba(22,163,74,0.3)' : `0 2px 8px ${color}33`,
          }}
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copiado!
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copiar
            </>
          )}
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

