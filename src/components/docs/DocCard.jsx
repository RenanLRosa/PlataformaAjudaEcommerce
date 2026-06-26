import MiniButton from '../common/MiniButton';
import ReorderButtons from '../common/ReorderButtons';

export default function DocCard({ doc, index, total, adminMode, onEdit, onMove, onDelete, onAction }) {
  const isPlaceholder = doc.state === 'placeholder';

  return (
    <div
      className="bg-white border border-neutral-200 rounded-[3px] p-4 flex flex-col gap-1.5"
      style={{ borderTop: `2px solid ${doc.color}` }}
    >
      <h4 className="text-[13px] font-semibold text-neutral-900">{doc.title}</h4>
      <p className="text-xs text-neutral-500 leading-relaxed flex-1">{doc.desc}</p>
      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">{doc.tag}</span>
      <button
        disabled={isPlaceholder}
        onClick={() => onAction(doc)}
        className={`px-2.5 py-1.5 border rounded-[3px] text-xs font-semibold w-full text-center transition-colors ${
          isPlaceholder
            ? 'opacity-45 cursor-not-allowed border-neutral-200 text-neutral-400'
            : 'border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white'
        }`}
      >
        {doc.btn}
      </button>

      {adminMode && (
        <div className="flex gap-1.5 flex-wrap mt-0.5">
          <MiniButton onClick={() => onEdit(doc.id)}>Editar</MiniButton>
          <ReorderButtons index={index} total={total} onMove={onMove} />
          <MiniButton danger onClick={() => onDelete(doc)}>
            Excluir
          </MiniButton>
        </div>
      )}
    </div>
  );
}
