import MiniButton from '../common/MiniButton';

export default function ImageCard({ card, adminMode, onOpen, onEdit, onDelete }) {
  const color = card.color || '#1e40af';
  const isFolder = card.type === 'folder';
  const cover = isFolder ? card.items?.[0]?.src : card.src;
  const count = isFolder ? (card.items || []).length : null;

  return (
    <div
      onClick={() => onOpen(card)}
      className="bg-white border border-neutral-200 rounded-[10px] overflow-hidden cursor-pointer group flex flex-col"
    >
      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        {cover ? (
          <img
            src={cover}
            alt={card.name}
            className={`w-full h-full object-cover ${isFolder ? 'opacity-70' : ''}`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5" style={{ background: `${color}22` }}>
            <div className="text-3xl">🗂</div>
            <div className="text-xs text-neutral-500">0 imagens</div>
          </div>
        )}

        {isFolder && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
            {count} {count === 1 ? 'imagem' : 'imagens'}
          </div>
        )}

        {adminMode && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <button
              onClick={() => onEdit(card)}
              className="bg-white px-2 py-0.5 rounded text-[11px] font-semibold text-neutral-600 border border-neutral-300 hover:border-blue-600 hover:text-blue-600"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(card)}
              className="bg-white px-2 py-0.5 rounded text-[11px] font-semibold text-neutral-600 border border-neutral-300 hover:border-red-500 hover:text-red-500"
            >
              Excluir
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 px-3 py-2.5">
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
        <span className="text-[13px] font-medium text-neutral-800 truncate flex-1">{card.name}</span>
        <span className="text-[10px] uppercase font-bold text-neutral-400">{isFolder ? 'pasta' : 'img'}</span>
      </div>
    </div>
  );
}
