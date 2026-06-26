import { useState, useEffect, useRef } from 'react';
import Modal from '../common/Modal';
import ColorPicker from '../common/ColorPicker';
import { FieldGroup, TextInput } from '../common/FormFields';
import { CAT_COLORS } from '../../data/constants';
import { readFilesAsDataUrls } from '../../utils/helpers';

export default function ImageCardModal({ open, onClose, onSave, editingCard, cardType = 'folder' }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [color, setColor] = useState(CAT_COLORS[0]);
  const [pendingSrc, setPendingSrc] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const isFolder = cardType === 'folder';

  useEffect(() => {
    if (!open) return;
    if (editingCard) {
      setName(editingCard.name);
      setDesc(editingCard.desc || '');
      setColor(editingCard.color || CAT_COLORS[0]);
      setPendingSrc(editingCard.type === 'single' ? editingCard.src : null);
    } else {
      setName('');
      setDesc('');
      setColor(CAT_COLORS[0]);
      setPendingSrc(null);
    }
  }, [open, editingCard]);

  const handleFiles = async (files) => {
    const results = await readFilesAsDataUrls(files);
    if (results.length > 0) {
      setPendingSrc(results[0].src);
      if (!name) setName(results[0].name);
    }
  };

  const handleSave = () => {
    if (!name.trim()) return alert('Informe um nome.');
    if (!isFolder && !editingCard && !pendingSrc) return alert('Adicione uma imagem.');

    const cardData = { name: name.trim(), desc: desc.trim(), color, type: cardType };
    if (!isFolder) cardData.src = pendingSrc || '';
    onSave(cardData);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editingCard ? `Editar ${isFolder ? 'pasta' : 'imagem'}` : `Nova ${isFolder ? 'pasta' : 'imagem avulsa'}`}
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2 rounded-[3px] text-[13px] font-semibold border border-neutral-300 text-neutral-600 bg-white hover:bg-neutral-50">
            Cancelar
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded-[3px] text-[13px] font-semibold bg-blue-600 text-white hover:bg-blue-700">
            Salvar
          </button>
        </>
      }
    >
      <FieldGroup label="Nome">
        <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Identidade Visual" />
      </FieldGroup>
      <FieldGroup label="Descrição" optional>
        <TextInput value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Ex: Logos e materiais da agência" />
      </FieldGroup>
      <FieldGroup label="Cor do marcador">
        <ColorPicker value={color} onChange={setColor} />
      </FieldGroup>

      {!isFolder && (
        <div className="flex flex-col gap-2">
          <FieldGroup label="Imagem">
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
              className={`border-2 border-dashed rounded-md px-4 py-6 text-center text-sm cursor-pointer transition-colors ${
                dragOver ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-neutral-300 text-neutral-400 hover:border-neutral-400'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
              {pendingSrc ? 'Imagem carregada — clique para alterar' : 'Clique ou arraste uma imagem aqui'}
            </label>
          </FieldGroup>
          {pendingSrc && (
            <img
              src={pendingSrc}
              alt="preview"
              className="max-w-full max-h-[180px] rounded-md border border-neutral-200 block"
            />
          )}
        </div>
      )}
    </Modal>
  );
}
