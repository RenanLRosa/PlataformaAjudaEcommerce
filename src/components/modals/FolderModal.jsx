import { useState } from 'react';
import Modal from '../common/Modal';
import EmptyState from '../common/EmptyState';
import MiniButton from '../common/MiniButton';
import { readFilesAsDataUrls, downloadDataUrl } from '../../utils/helpers';

export default function FolderModal({ open, onClose, folder, adminMode, onAddImages, onDeleteImage }) {
  const [dragOver, setDragOver] = useState(false);

  if (!folder) return null;
  const items = folder.items || [];

  const handleFiles = async (files) => {
    const results = await readFilesAsDataUrls(files);
    if (results.length > 0) onAddImages(folder.id, results);
  };

  return (
    <Modal open={open} onClose={onClose} wide title={folder.name} subtitle={folder.desc}>
      {adminMode && (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`border-2 border-dashed rounded-md px-4 py-5 text-center text-sm cursor-pointer transition-colors mb-1 ${
            dragOver ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-neutral-300 text-neutral-400 hover:border-neutral-400'
          }`}
        >
          <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
          Clique ou arraste imagens aqui para adicionar à pasta
        </label>
      )}

      {items.length === 0 ? (
        <EmptyState>Nenhuma imagem nesta pasta ainda.</EmptyState>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {items.map((img) => (
            <div key={img.id} className="border border-neutral-200 rounded-md overflow-hidden flex flex-col">
              <div className="aspect-square bg-neutral-100">
                <img src={img.src} alt={img.name} className="w-full h-full object-cover" />
              </div>
              <div className="px-2 py-1.5 flex items-center justify-between gap-1.5">
                <span className="text-xs text-neutral-700 truncate flex-1">{img.name}</span>
                <button
                  onClick={() => downloadDataUrl(img.src, img.name)}
                  className="text-[11px] font-semibold text-blue-600 hover:underline whitespace-nowrap"
                >
                  ↓ Baixar
                </button>
              </div>
              {adminMode && (
                <div className="px-2 pb-2 flex justify-end">
                  <MiniButton danger onClick={() => onDeleteImage(folder.id, img.id)}>
                    Excluir
                  </MiniButton>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
