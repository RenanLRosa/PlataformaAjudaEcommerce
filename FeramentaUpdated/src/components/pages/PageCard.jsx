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
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 1800); }
  };

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden bg-white transition-all"
      style={{
        border: '1px solid #E8EEF4',
        boxShadow: '0 1px 4px rgba(0,43,77,0.05)',
      }}
      onMouseOver={e => { e.currentTarget.style.boxShadow = `0 6px 24px rgba(0,43,77,0.10)`; e.currentTarget.style.borderColor = page.color + '66'; }}
      onMouseOut={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,43,77,0.05)'; e.currentTarget.style.borderColor = '#E8EEF4'; }}
    >
      {/* Color bar */}
      <div style={{ height: 3, background: page.color }} />

      <div className="flex flex-col flex-1 px-4 pt-4 pb-3 gap-2">
        {/* Icon + title */}
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: page.color + '18' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={page.color} strokeWidth="2.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[13.5px] font-bold text-[#002B4D] leading-tight">{page.title}</h4>
            <p className="text-[12px] text-[#7FA8C7] mt-0.5 leading-relaxed">{page.desc}</p>
          </div>
        </div>

        {/* Badge */}
        <div>
          <span
            className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.1em] px-2 py-0.5 rounded-full"
            style={isDynamic
              ? { background: '#F4FBE0', color: '#5A8A00', border: '1px solid #C8E69A' }
              : { background: '#F0F4F8', color: '#6B8FAA', border: '1px solid #D6E4EF' }
            }
          >
            {isDynamic ? (
              <><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>Personalizável</>
            ) : (
              <><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>HTML fixo</>
            )}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 flex flex-col gap-2" style={{ borderTop: '1px solid #F0F4F8', paddingTop: 12 }}>
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-[12.5px] font-bold transition-all"
          style={{
            background: copied ? '#5A8A00' : '#002B4D',
            color: copied ? '#fff' : '#A0E800',
            boxShadow: copied ? '0 2px 8px rgba(90,138,0,0.25)' : '0 2px 8px rgba(0,43,77,0.15)',
          }}
        >
          {copied ? (
            <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Copiado!</>
          ) : (
            <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copiar HTML</>
          )}
        </button>
        {adminMode && (
          <div className="flex gap-1.5 flex-wrap">
            <MiniButton onClick={() => onEdit(page.id)}>Editar</MiniButton>
            <ReorderButtons index={index} total={total} onMove={onMove} />
            <MiniButton danger onClick={() => onDelete(page)}>Excluir</MiniButton>
          </div>
        )}
      </div>
    </div>
  );
}
