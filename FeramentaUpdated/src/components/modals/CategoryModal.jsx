import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { FieldGroup, TextInput } from '../common/FormFields';

export default function CategoryModal({ open, onClose, onSave, editingCat }) {
  const [label, setLabel] = useState('');
  const [section, setSection] = useState('');

  useEffect(() => {
    if (!open) return;
    setLabel(editingCat?.label || '');
    setSection(editingCat?.section || '');
  }, [open, editingCat]);

  const handleSave = () => {
    if (!label.trim()) return alert('Informe o nome.');
    onSave({ label: label.trim(), section: section.trim() || label.trim() });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editingCat ? 'Editar filtro' : 'Novo filtro'}
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
      <FieldGroup label="Nome do filtro (aba)">
        <TextInput value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Ex: Pós-venda" />
      </FieldGroup>
      <FieldGroup label="Título da seção">
        <TextInput value={section} onChange={(e) => setSection(e.target.value)} placeholder="Ex: Mensagens de Pós-venda" />
      </FieldGroup>
    </Modal>
  );
}
