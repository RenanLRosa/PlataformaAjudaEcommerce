import Modal from '../common/Modal';
import { downloadDataUrl } from '../../utils/helpers';

export default function ImagePreviewModal({ open, onClose, image }) {
  if (!image) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={image.name}
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2 rounded-[3px] text-[13px] font-semibold border border-neutral-300 text-neutral-600 bg-white hover:bg-neutral-50">
            Fechar
          </button>
          <button
            onClick={() => downloadDataUrl(image.src, image.name)}
            className="px-4 py-2 rounded-[3px] text-[13px] font-semibold bg-blue-600 text-white hover:bg-blue-700"
          >
            Baixar imagem
          </button>
        </>
      }
    >
      <div className="rounded-md overflow-hidden border border-neutral-200 bg-neutral-50 flex items-center justify-center max-h-[60vh]">
        <img src={image.src} alt={image.name} className="max-w-full max-h-[60vh] object-contain" />
      </div>
    </Modal>
  );
}
