import { useState } from 'react';
import MiniButton from '../common/MiniButton';
import ReorderButtons from '../common/ReorderButtons';
import { copyToClipboard } from '../../utils/helpers';
import { buildPageHtml } from '../../utils/buildPageHtml';

export default function PageCard({ page, index, total, adminMode, customFields, onEdit, onMove, onDelete }) {
  const [copied, setCopied] = useState(false);
  const isDynamic = page.dynamic !== 'none';

  const handleCopy = async () => {
    const html = buildPageHtml(page, customFields);
    const ok = await copyToClipboard(html);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <div
      className="bg-white border border-neutral-200 rounded-[3px] p-4 flex flex-col gap-1.5"
      style={{ borderTop: `2px solid ${page.color}` }}
    >
      <h4 className="text-[13px] font-semibold text-neutral-900">{page.title}</h4>
      <p className="text-xs text-neutral-500 leading-relaxed flex-1">{page.desc}</p>
      <span
        className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-sm inline-block self-start ${
          isDynamic ? 'bg-lime-50 text-lime-800 border border-lime-300' : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
        }`}
      >
        {isDynamic ? 'Personalizável' : 'HTML fixo'}
      </span>
      <div className="flex gap-1.5 flex-wrap">
        <button
          onClick={handleCopy}
          className="px-2.5 py-1 border border-neutral-300 rounded text-xs font-semibold text-neutral-600 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
        >
          {copied ? 'Copiado!' : 'Copiar HTML'}
        </button>
      </div>

      {adminMode && (
        <div className="flex gap-1.5 flex-wrap mt-0.5">
          <MiniButton onClick={() => onEdit(page.id)}>Editar</MiniButton>
          <ReorderButtons index={index} total={total} onMove={onMove} />
          <MiniButton danger onClick={() => onDelete(page)}>
            Excluir
          </MiniButton>
        </div>
      )}
    </div>
  );
}
