import { useState } from 'react';
import Modal from '../common/Modal';
import { copyToClipboard } from '../../utils/helpers';
import { buildLinkShareMessage } from '../../utils/linkShare';

export default function LinkDetailModal({ open, onClose, link }) {
  const [copiedField, setCopiedField] = useState(null);

  if (!link) return null;
  const shareMsg = buildLinkShareMessage(link);

  const handleCopy = async (field, text) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1600);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={link.name}>
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">URL</span>
        <span className="text-sm text-neutral-800 break-all">{link.url}</span>
      </div>
      {link.desc && (
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Descrição</span>
          <span className="text-sm text-neutral-800">{link.desc}</span>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Mensagem de compartilhamento</span>
        <div className="bg-neutral-50 border border-neutral-200 rounded-[3px] px-3 py-2.5 text-sm text-neutral-700 whitespace-pre-wrap">
          {shareMsg}
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => handleCopy('url', link.url)}
          className="flex-1 px-3 py-2 border border-neutral-300 rounded-[3px] text-[13px] font-semibold text-neutral-600 bg-white hover:bg-neutral-50"
        >
          {copiedField === 'url' ? 'Copiado!' : 'Copiar link'}
        </button>
        <button
          onClick={() => handleCopy('msg', shareMsg)}
          className="flex-1 px-3 py-2 rounded-[3px] text-[13px] font-semibold bg-blue-600 text-white hover:bg-blue-700"
        >
          {copiedField === 'msg' ? 'Copiado!' : 'Copiar mensagem'}
        </button>
      </div>
    </Modal>
  );
}
