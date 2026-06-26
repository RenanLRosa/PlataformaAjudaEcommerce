import { useState } from 'react';
import ImageCard from './ImageCard';
import EmptyState from '../common/EmptyState';
import ImageCardModal from '../modals/ImageCardModal';
import FolderModal from '../modals/FolderModal';
import ImagePreviewModal from '../modals/ImagePreviewModal';

export default function ImagesPage({ data, adminMode, actions, showToast }) {
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [editingCardId, setEditingCardId] = useState(null);
  const [cardType, setCardType] = useState('folder');

  const [openFolderId, setOpenFolderId] = useState(null);
  const [previewImageId, setPreviewImageId] = useState(null);

  const editingCard = editingCardId ? data.images.find((c) => c.id === editingCardId) : null;
  const openFolder = openFolderId ? data.images.find((c) => c.id === openFolderId) : null;
  const previewImage = previewImageId ? data.images.find((c) => c.id === previewImageId) : null;

  const handleOpenCard = (card) => {
    if (card.type === 'folder') setOpenFolderId(card.id);
    else setPreviewImageId(card.id);
  };

  const handleSaveCard = (cardData) => {
    actions.saveImageCard(cardData, editingCardId);
    setCardModalOpen(false);
    showToast('Salvo');
  };

  const handleDeleteCard = (card) => {
    if (!confirm(`Excluir "${card.name}"?`)) return;
    actions.deleteImageCard(card.id);
    showToast('Excluído');
  };

  return (
    <div className="page-wrap-wide max-w-[940px] mx-auto px-6 pt-7 pb-16 flex flex-col gap-4.5">
      <div>
        <h1 className="text-[19px] font-bold text-neutral-900 tracking-tight">
          {adminMode ? 'Imagens — Configuração' : 'Imagens'}
        </h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          {adminMode ? 'Adicione pastas, imagens avulsas e faça upload' : 'Prévia e download de imagens e materiais visuais'}
        </p>
      </div>

      {adminMode && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => {
              setEditingCardId(null);
              setCardType('folder');
              setCardModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-md text-[13px] font-semibold bg-blue-600 text-white hover:bg-blue-700"
          >
            + Nova pasta
          </button>
          <button
            onClick={() => {
              setEditingCardId(null);
              setCardType('single');
              setCardModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-md text-[13px] font-semibold border border-neutral-300 bg-white hover:bg-neutral-50"
          >
            + Imagem avulsa
          </button>
        </div>
      )}

      {data.images.length === 0 ? (
        <EmptyState>Nenhuma imagem ou pasta cadastrada.</EmptyState>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {data.images.map((card) => (
            <ImageCard
              key={card.id}
              card={card}
              adminMode={adminMode}
              onOpen={handleOpenCard}
              onEdit={(c) => {
                setEditingCardId(c.id);
                setCardType(c.type);
                setCardModalOpen(true);
              }}
              onDelete={handleDeleteCard}
            />
          ))}
        </div>
      )}

      <ImageCardModal
        open={cardModalOpen}
        onClose={() => setCardModalOpen(false)}
        onSave={handleSaveCard}
        editingCard={editingCard}
        cardType={cardType}
      />

      <FolderModal
        open={!!openFolder}
        onClose={() => setOpenFolderId(null)}
        folder={openFolder}
        adminMode={adminMode}
        onAddImages={actions.addImagesToFolder}
        onDeleteImage={actions.deleteImageFromFolder}
      />

      <ImagePreviewModal
        open={!!previewImage}
        onClose={() => setPreviewImageId(null)}
        image={previewImage}
      />
    </div>
  );
}
