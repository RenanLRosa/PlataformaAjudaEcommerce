import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import ColorPicker from '../common/ColorPicker';
import { FieldGroup, TextInput, SelectInput, TextArea } from '../common/FormFields';
import { CAT_COLORS } from '../../data/constants';

const emptyForm = { cat: '', title: '', desc: '', tag: '', btn: '', state: 'placeholder', color: CAT_COLORS[0] };

export default function DocModal({ open, onClose, onSave, categories, editingDoc, presetCat }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!open) return;
    if (editingDoc) {
      setForm({
        cat: editingDoc.cat,
        title: editingDoc.title,
        desc: editingDoc.desc,
        tag: editingDoc.tag,
        btn: editingDoc.btn,
        state: editingDoc.state === 'placeholder' ? 'placeholder' : 'active',
        color: editingDoc.color || CAT_COLORS[0],
      });
    } else {
      setForm({ ...emptyForm, cat: presetCat || categories[0]?.id || '' });
    }
  }, [open, editingDoc, presetCat, categories]);

  const handleSave = () => {
    if (!form.title.trim()) return alert('Informe um título.');
    onSave({
      cat: form.cat,
      color: form.color,
      title: form.title.trim(),
      desc: form.desc.trim(),
      tag: form.tag.trim(),
      btn: form.btn.trim() || 'Abrir',
      state: form.state,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editingDoc ? 'Editar documento' : 'Novo documento'}
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
      <FieldGroup label="Cor do topo">
        <ColorPicker value={form.color} onChange={(color) => setForm((f) => ({ ...f, color }))} />
      </FieldGroup>
      <FieldGroup label="Título">
        <TextInput value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
      </FieldGroup>
      <FieldGroup label="Descrição">
        <TextArea rows={3} value={form.desc} onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))} />
      </FieldGroup>
      <FieldGroup label="Tag">
        <TextInput value={form.tag} onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))} />
      </FieldGroup>
      <FieldGroup label="Texto do botão">
        <TextInput value={form.btn} onChange={(e) => setForm((f) => ({ ...f, btn: e.target.value }))} />
      </FieldGroup>
      <FieldGroup label="Estado">
        <SelectInput value={form.state} onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}>
          <option value="placeholder">Placeholder</option>
          <option value="active">Ativo</option>
        </SelectInput>
      </FieldGroup>
    </Modal>
  );
}
