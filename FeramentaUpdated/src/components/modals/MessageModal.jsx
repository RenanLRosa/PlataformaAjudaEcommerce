import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import ColorPicker from '../common/ColorPicker';
import { FieldGroup, TextInput, SelectInput, TextArea } from '../common/FormFields';
import { CAT_COLORS } from '../../data/constants';

const emptyForm = { cat: '', title: '', sub: '', full: false, text: '', color: CAT_COLORS[0] };

export default function MessageModal({ open, onClose, onSave, categories, editingMsg, presetCat }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!open) return;
    if (editingMsg) {
      setForm({
        cat: editingMsg.cat,
        title: editingMsg.title,
        sub: editingMsg.sub || '',
        full: !!editingMsg.full,
        text: editingMsg.text,
        color: editingMsg.color || CAT_COLORS[0],
      });
    } else {
      setForm({ ...emptyForm, cat: presetCat || categories[0]?.id || '' });
    }
  }, [open, editingMsg, presetCat, categories]);

  const handleSave = () => {
    if (!form.title.trim()) return alert('Informe um título.');
    if (!form.text.trim()) return alert('Informe o texto.');
    onSave({
      cat: form.cat,
      color: form.color,
      full: form.full,
      title: form.title.trim(),
      sub: form.sub.trim(),
      text: form.text.trim(),
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editingMsg ? 'Editar mensagem' : 'Nova mensagem'}
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
      <FieldGroup label="Categoria">
        <SelectInput value={form.cat} onChange={(e) => setForm((f) => ({ ...f, cat: e.target.value }))}>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </SelectInput>
      </FieldGroup>
      <FieldGroup label="Título">
        <TextInput
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="Ex: Boas-vindas no Grupo"
        />
      </FieldGroup>
      <FieldGroup label="Subtítulo">
        <TextInput value={form.sub} onChange={(e) => setForm((f) => ({ ...f, sub: e.target.value }))} />
      </FieldGroup>
      <FieldGroup label="Cor do marcador lateral">
        <ColorPicker value={form.color} onChange={(color) => setForm((f) => ({ ...f, color }))} />
      </FieldGroup>
      <FieldGroup label="Largura total">
        <SelectInput
          value={String(form.full)}
          onChange={(e) => setForm((f) => ({ ...f, full: e.target.value === 'true' }))}
        >
          <option value="false">Não</option>
          <option value="true">Sim</option>
        </SelectInput>
      </FieldGroup>
      <FieldGroup label="Texto">
        <TextArea rows={9} value={form.text} onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))} />
      </FieldGroup>
    </Modal>
  );
}
