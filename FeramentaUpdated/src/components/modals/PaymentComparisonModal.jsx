import { useState } from 'react';
import Modal from '../common/Modal';
import { copyToClipboard, downloadDataUrl } from '../../utils/helpers';

const PDF_URL = '/COMPARATIVO_MEIOS_DE_PAGAMENTO.pdf';
const PDF_FILENAME = 'COMPARATIVO_MEIOS_DE_PAGAMENTO.pdf';

export default function PaymentComparisonModal({ open, onClose, messageText }) {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(messageText || '');
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  const handleDownload = () => {
    downloadDataUrl(PDF_URL, PDF_FILENAME);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 1800);
  };

  return (
    <Modal open={open} onClose={onClose} title="Comparativo de Meios de Pagamento" subtitle="Copie a mensagem e envie o PDF no grupo do cliente">
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

      <div className="h-px bg-neutral-100 my-1" />

      <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wide">Enviar o PDF</label>
      <p className="text-xs text-neutral-500 -mt-1">
        Baixe o PDF e depois <strong>arraste o arquivo</strong> para a janela do WhatsApp Web (ou use o 📎 → Documento) para enviar no grupo.
      </p>
      <button
        onClick={handleDownload}
        className="self-start px-4 py-2 rounded-[3px] text-[13px] font-semibold bg-[#25D366] text-white hover:bg-[#1eb858] inline-flex items-center gap-1.5"
      >
        {downloaded ? '✓ PDF baixado!' : '⬇️ Baixar PDF'}
      </button>
    </Modal>
  );
}
