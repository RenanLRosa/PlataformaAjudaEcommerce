import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import ColorPicker from '../common/ColorPicker';
import { FieldGroup, TextInput, TextArea } from '../common/FormFields';
import { CAT_COLORS } from '../../data/constants';

const emptyForm = { name: '', url: '', desc: '', msg: '', color: CAT_COLORS[0] };

export default function LinkModal({ open, onClose, onSave, editingLink }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!open) return;
    if (editingLink) {
      setForm({
        name: editingLink.name,
        url: editingLink.url,
        desc: editingLink.desc || '',
        msg: editingLink.msg || '',
        color: editingLink.color || CAT_COLORS[0],
      });
    } else {
      setForm(emptyForm);
    }
  }, [open, editingLink]);

  const handleSave = () => {
    if (!form.name.trim()) return alert('Informe o nome.');
    if (!form.url.trim()) return alert('Informe a URL.');
    onSave({
      name: form.name.trim(),
      url: form.url.trim(),
      desc: form.desc.trim(),
      msg: form.msg.trim(),
      color: form.color,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editingLink ? 'Editar link' : 'Novo link'}
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
      <FieldGroup label="Nome do link">
        <TextInput value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Ex: Zoho Mail" />
      </FieldGroup>
      <FieldGroup label="URL">
        <TextInput
          type="url"
          value={form.url}
          onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
          placeholder="https://..."
        />
      </FieldGroup>
      <FieldGroup label="Descrição" optional>
        <TextInput
          value={form.desc}
          onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
          placeholder="Ex: Acesso ao e-mail profissional da conta"
        />
      </FieldGroup>
      <FieldGroup label="Mensagem de compartilhamento" optional>
        <TextArea
          rows={3}
          value={form.msg}
          onChange={(e) => setForm((f) => ({ ...f, msg: e.target.value }))}
          placeholder={'Deixe vazio para usar o padrão: \n\nEsse é o link para [Nome]: [URL]'}
        />
        <span className="text-[11px] text-neutral-400">Variáveis disponíveis: [[NOME]] e [[URL]]</span>
      </FieldGroup>
      <FieldGroup label="Cor do marcador">
        <ColorPicker value={form.color} onChange={(color) => setForm((f) => ({ ...f, color }))} />
      </FieldGroup>
    </Modal>
  );
}
