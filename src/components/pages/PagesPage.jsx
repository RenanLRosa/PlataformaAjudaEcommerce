import { useState } from 'react';
import PageCard from './PageCard';
import EmptyState from '../common/EmptyState';
import PageEditorModal from '../modals/PageEditorModal';
import { FieldGroup, TextInput, TextArea } from '../common/FormFields';

export default function PagesPage({ data, adminMode, actions, showToast }) {
  const [customFields, setCustomFields] = useState({ nomeLoja: '', quemSomos: '' });
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingPageId, setEditingPageId] = useState(null);

  const editingPage = editingPageId ? data.pages.find((p) => p.id === editingPageId) : null;

  const handleSavePage = (pageData) => {
    actions.savePage(pageData, editingPageId);
    setEditorOpen(false);
    showToast('Página salva');
  };

  const handleDeletePage = (page) => {
    if (!confirm(`Excluir "${page.title}"?`)) return;
    actions.deletePage(page.id);
    showToast('Excluído');
  };

  return (
    <div className="page-wrap-wide max-w-[940px] mx-auto px-6 pt-7 pb-16 flex flex-col gap-4.5">
      <div>
        <h1 className="text-[19px] font-bold text-neutral-900 tracking-tight">
          {adminMode ? 'Páginas Institucionais — Configuração' : 'Páginas Institucionais'}
        </h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          {adminMode ? 'Edite o template HTML de cada página' : 'HTML pronto para copiar e colar na sua plataforma'}
        </p>
      </div>

      {!adminMode && (
        <div className="bg-white border border-neutral-200 rounded-[3px] p-4 flex flex-col gap-3.5 border-l-[3px] border-l-blue-600">
          <div>
            <h4 className="text-[13px] font-bold text-neutral-900">Personalização</h4>
            <p className="text-xs text-neutral-500 -mt-1">
              Opcional — preencha para substituir os campos variáveis. Sem preencher, o HTML sai com os textos padrão.
            </p>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2 items-end">
            <FieldGroup label="Nome da loja">
              <TextInput
                value={customFields.nomeLoja}
                onChange={(e) => setCustomFields((f) => ({ ...f, nomeLoja: e.target.value }))}
                placeholder="Ex: Minha Loja"
              />
            </FieldGroup>
            <button
              onClick={() => setCustomFields((f) => ({ ...f, nomeLoja: '' }))}
              className="px-2.5 h-[33px] border border-neutral-300 rounded-[3px] text-xs font-semibold text-neutral-500 hover:border-red-500 hover:text-red-500 hover:bg-red-50"
            >
              Limpar
            </button>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <FieldGroup label='Texto do "Quem Somos" — substitui o bloco de demonstração'>
              <TextArea
                rows={4}
                value={customFields.quemSomos}
                onChange={(e) => setCustomFields((f) => ({ ...f, quemSomos: e.target.value }))}
                placeholder="Descreva sua empresa aqui…"
              />
            </FieldGroup>
            <button
              onClick={() => setCustomFields((f) => ({ ...f, quemSomos: '' }))}
              className="px-2.5 h-[33px] mt-[23px] border border-neutral-300 rounded-[3px] text-xs font-semibold text-neutral-500 hover:border-red-500 hover:text-red-500 hover:bg-red-50"
            >
              Limpar
            </button>
          </div>
        </div>
      )}

      {adminMode && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => {
              setEditingPageId(null);
              setEditorOpen(true);
            }}
            className="px-3 py-1.5 rounded-md text-[13px] font-semibold bg-blue-600 text-white hover:bg-blue-700"
          >
            + Nova página
          </button>
        </div>
      )}

      {data.pages.length === 0 ? (
        <EmptyState>Nenhuma página criada ainda.</EmptyState>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {data.pages.map((page, idx) => (
            <PageCard
              key={page.id}
              page={page}
              index={idx}
              total={data.pages.length}
              adminMode={adminMode}
              customFields={customFields}
              onEdit={(id) => {
                setEditingPageId(id);
                setEditorOpen(true);
              }}
              onMove={(dir) => actions.movePage(page.id, dir)}
              onDelete={handleDeletePage}
            />
          ))}
        </div>
      )}

      <PageEditorModal
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        onSave={handleSavePage}
        editingPage={editingPage}
      />
    </div>
  );
}
