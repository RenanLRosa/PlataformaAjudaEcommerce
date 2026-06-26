import MiniButton from '../common/MiniButton';
import ReorderButtons from '../common/ReorderButtons';

export default function DocCard({ doc, index, total, adminMode, onEdit, onMove, onDelete, onAction }) {
  const isPlaceholder = doc.state === 'placeholder';
  const color = doc.color || '#1A6AA8';

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden bg-white transition-all"
      style={{
        border: '1px solid #E8EEF4',
        boxShadow: '0 1px 4px rgba(0,43,77,0.05)',
      }}
      onMouseOver={e => {
        if (!isPlaceholder) {
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,43,77,0.10)';
          e.currentTarget.style.borderColor = color + '55';
        }
      }}
      onMouseOut={e => {
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,43,77,0.05)';
        e.currentTarget.style.borderColor = '#E8EEF4';
      }}
    >
      {/* Color bar */}
      <div style={{ height: 3, background: isPlaceholder ? '#E8EEF4' : color }} />

      <div className="flex flex-col flex-1 px-4 pt-4 pb-3 gap-2">
        {/* Icon + title */}
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: isPlaceholder ? '#F0F4F8' : color + '18' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isPlaceholder ? '#B0C4D4' : color} strokeWidth="2.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className={`text-[13.5px] font-bold leading-tight ${isPlaceholder ? 'text-[#8BA8BF]' : 'text-[#002B4D]'}`}>
              {doc.title}
            </h4>
            <p className="text-[12px] text-[#7FA8C7] mt-0.5 leading-relaxed">{doc.desc}</p>
          </div>
        </div>

        {/* Tag badge */}
        {doc.tag && (
          <span
            className="inline-block text-[10px] font-black uppercase tracking-[0.1em] px-2 py-0.5 rounded-full self-start"
            style={isPlaceholder
              ? { background: '#F0F4F8', color: '#8BA8BF', border: '1px solid #D6E4EF' }
              : { background: color + '15', color, border: `1px solid ${color}44` }
            }
          >
            {doc.tag}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 flex flex-col gap-2" style={{ borderTop: '1px solid #F0F4F8', paddingTop: 12 }}>
        <button
          disabled={isPlaceholder}
          onClick={() => onAction(doc)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-[12.5px] font-bold transition-all"
          style={isPlaceholder
            ? { background: '#F0F4F8', color: '#B0C4D4', cursor: 'not-allowed' }
            : { background: '#002B4D', color: '#A0E800', boxShadow: '0 2px 8px rgba(0,43,77,0.15)', cursor: 'pointer' }
          }
          onMouseOver={e => { if (!isPlaceholder) e.currentTarget.style.background = '#004070'; }}
          onMouseOut={e => { if (!isPlaceholder) e.currentTarget.style.background = '#002B4D'; }}
        >
          {!isPlaceholder && (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          )}
          {doc.btn}
        </button>

        {adminMode && (
          <div className="flex gap-1.5 flex-wrap">
            <MiniButton onClick={() => onEdit(doc.id)}>Editar</MiniButton>
            <ReorderButtons index={index} total={total} onMove={onMove} />
            <MiniButton danger onClick={() => onDelete(doc)}>Excluir</MiniButton>
          </div>
        )}
      </div>
    </div>
  );
}
