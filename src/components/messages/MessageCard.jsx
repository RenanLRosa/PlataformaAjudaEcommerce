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
      className={`flex flex-col rounded-[10px] overflow-hidden bg-white ${msg.full ? 'sm:col-span-2' : ''}`}
      style={{ border: `1px solid ${color}44`, boxShadow: `0 2px 8px ${color}14` }}
    >
      <div
        className="px-4 pt-3.5 pb-3 flex flex-col gap-1"
        style={{ background: `${color}18`, borderBottom: `2px solid ${color}44` }}
      >
        <div className="text-[15px] font-extrabold text-neutral-900 leading-tight">{msg.title}</div>
        {msg.sub && <div className="text-[13px] font-semibold text-neutral-600">{msg.sub}</div>}
      </div>

      <div className="bg-white px-4 py-3.5 text-[14px] leading-[1.75] text-neutral-700 whitespace-pre-wrap break-words flex-1">
        {msg.text}
      </div>

      <div className="px-4 py-3 flex gap-1.5 flex-wrap bg-white">
        <button
          onClick={handleCopy}
          style={{ background: copied ? '#16a34a' : color }}
          className="text-black rounded-md px-4.5 py-1.5 text-[13px] font-bold transition-opacity hover:opacity-80"
        >
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>

      {adminMode && (
        <div className="px-4 pb-3 flex gap-1.5 flex-wrap bg-white">
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
