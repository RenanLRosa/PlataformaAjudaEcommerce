import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import ColorPicker from '../common/ColorPicker';
import { FieldGroup, TextInput, SelectInput, TextArea } from '../common/FormFields';
import { CAT_COLORS } from '../../data/constants';

const emptyForm = { title: '', desc: '', dynamic: 'none', html: '', color: CAT_COLORS[0] };

export default function PageEditorModal({ open, onClose, onSave, editingPage }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!open) return;
    if (editingPage) {
      setForm({
        title: editingPage.title,
        desc: editingPage.desc,
        dynamic: editingPage.dynamic,
        html: editingPage.html,
        color: editingPage.color || CAT_COLORS[0],
      });
    } else {
      setForm(emptyForm);
    }
  }, [open, editingPage]);

  const handleSave = () => {
    if (!form.title.trim()) return alert('Informe um título.');
    onSave({
      color: form.color,
      title: form.title.trim(),
      desc: form.desc.trim(),
      dynamic: form.dynamic,
      html: form.html,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      wide
      title={editingPage ? 'Editar página' : 'Nova página institucional'}
      subtitle="Use [[NOME_LOJA]] ou [[QUEM_SOMOS_BLOCK]] como campos dinâmicos"
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
      <FieldGroup label="Título">
        <TextInput
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="Ex: Política de Privacidade"
        />
      </FieldGroup>
      <FieldGroup label="Cor do card">
        <ColorPicker value={form.color} onChange={(color) => setForm((f) => ({ ...f, color }))} />
      </FieldGroup>
      <FieldGroup label="Descrição">
        <TextInput
          value={form.desc}
          onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
          placeholder="Uma linha descrevendo o conteúdo"
        />
      </FieldGroup>
      <FieldGroup label="Campo dinâmico">
        <SelectInput value={form.dynamic} onChange={(e) => setForm((f) => ({ ...f, dynamic: e.target.value }))}>
          <option value="none">Nenhum</option>
          <option value="nome_loja">Nome da loja ([[NOME_LOJA]])</option>
          <option value="quem_somos">Quem Somos ([[QUEM_SOMOS_BLOCK]])</option>
        </SelectInput>
      </FieldGroup>
      <FieldGroup label="HTML do template">
        <TextArea
          rows={14}
          value={form.html}
          onChange={(e) => setForm((f) => ({ ...f, html: e.target.value }))}
          className="font-mono text-xs"
        />
      </FieldGroup>
    </Modal>
  );
}
