import { useState } from 'react';
import Modal from '../common/Modal';
import { copyToClipboard } from '../../utils/helpers';

export default function PaymentComparisonModal({ open, onClose, messageText }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(messageText || '');
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Comparativo de Meios de Pagamento" subtitle="Envie o PDF + a mensagem abaixo no grupo do cliente">
      <div className="bg-green-50 border border-green-300 rounded-[3px] px-3.5 py-2.5 text-xs text-green-800">
        Lembre-se de anexar o PDF <strong>COMPARATIVO_MEIOS_DE_PAGAMENTO.pdf</strong>
      </div>
      <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wide">Mensagem para enviar</label>
      <div className="bg-neutral-50 border border-neutral-200 rounded-[3px] px-3.5 py-3 text-xs leading-relaxed text-neutral-700 whitespace-pre-wrap">
        {messageText}
      </div>
      <button
        onClick={handleCopy}
        className="self-start px-4 py-2 rounded-[3px] text-[13px] font-semibold bg-blue-600 text-white hover:bg-blue-700"
      >
        {copied ? 'Copiado!' : 'Copiar mensagem'}
      </button>
    </Modal>
  );
}
