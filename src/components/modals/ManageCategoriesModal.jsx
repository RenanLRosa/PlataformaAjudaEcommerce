import Modal from '../common/Modal';
import MiniButton from '../common/MiniButton';

export default function ManageCategoriesModal({
  open,
  onClose,
  categories,
  items,
  onMove,
  onEdit,
  onDelete,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Gerenciar filtros"
      subtitle="Renomeie, reordene ou exclua filtros"
      footer={
        <button onClick={onClose} className="px-4 py-2 rounded-[3px] text-[13px] font-semibold bg-blue-600 text-white hover:bg-blue-700">
          Concluído
        </button>
      }
    >
      {categories.length === 0 ? (
        <div className="text-center py-7 text-neutral-500 text-sm">Nenhum filtro.</div>
      ) : (
        categories.map((c, i) => {
          const count = items.filter((x) => x.cat === c.id).length;
          return (
            <div
              key={c.id}
              className="flex items-center gap-2 p-2.5 border border-neutral-200 rounded-[3px] mb-1.5"
            >
              <div className="flex-1">
                <div className="font-semibold text-[13px]">{c.label}</div>
                <div className="text-[11px] text-neutral-500">
                  {c.section} · {count}
                </div>
              </div>
              <MiniButton disabled={i === 0} onClick={() => onMove(c.id, -1)}>
                ↑
              </MiniButton>
              <MiniButton disabled={i === categories.length - 1} onClick={() => onMove(c.id, 1)}>
                ↓
              </MiniButton>
              <MiniButton onClick={() => onEdit(c.id)}>Editar</MiniButton>
              <MiniButton danger onClick={() => onDelete(c.id)}>
                Excluir
              </MiniButton>
            </div>
          );
        })
      )}
    </Modal>
  );
}
