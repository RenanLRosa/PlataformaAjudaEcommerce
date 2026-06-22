import { useState, useMemo } from 'react';
import DocCard from './DocCard';
import EmptyState from '../common/EmptyState';
import DocModal from '../modals/DocModal';
import CategoryModal from '../modals/CategoryModal';
import ManageCategoriesModal from '../modals/ManageCategoriesModal';
import PaymentComparisonModal from '../modals/PaymentComparisonModal';

export default function DocsPage({ data, adminMode, actions, showToast, onNavigate }) {
  const [activeTab, setActiveTab] = useState('todas');

  const [docModalOpen, setDocModalOpen] = useState(false);
  const [editingDocId, setEditingDocId] = useState(null);
  const [presetCat, setPresetCat] = useState(null);

  const [catModalOpen, setCatModalOpen] = useState(false);
  const [editingCatId, setEditingCatId] = useState(null);
  const [manageOpen, setManageOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const sections = useMemo(() => {
    return data.docCats.map((cat) => {
      const items = data.docs.filter((d) => d.cat === cat.id);
      const tabOk = activeTab === 'todas' || activeTab === cat.id;
      const show = adminMode ? tabOk : tabOk && items.length > 0;
      return { cat, items, show };
    });
  }, [data.docCats, data.docs, activeTab, adminMode]);

  const openNewDoc = (catId) => {
    setEditingDocId(null);
    setPresetCat(catId || null);
    if (data.docCats.length === 0) {
      alert('Crie um filtro primeiro.');
      return;
    }
    setDocModalOpen(true);
  };

  const editingDoc = editingDocId ? data.docs.find((d) => d.id === editingDocId) : null;

  const handleSaveDoc = (docData) => {
    actions.saveDoc(docData, editingDocId);
    setDocModalOpen(false);
    showToast(editingDocId ? 'Documento atualizado' : 'Documento salvo');
  };

  const handleDeleteDoc = (doc) => {
    if (!confirm(`Excluir "${doc.title}"?`)) return;
    actions.deleteDoc(doc.id);
    showToast('Excluído');
  };

  const editingCat = editingCatId ? data.docCats.find((c) => c.id === editingCatId) : null;

  const handleSaveCat = (catData) => {
    actions.saveCat('doc', catData, editingCatId);
    setCatModalOpen(false);
    showToast('Filtro salvo');
  };

  const handleDeleteCat = (id) => {
    const cat = data.docCats.find((c) => c.id === id);
    const count = data.docs.filter((d) => d.cat === id).length;
    const msg = count > 0
      ? `"${cat.label}" tem ${count} item(s). Excluir também excluirá esses itens?`
      : `Excluir "${cat.label}"?`;
    if (!confirm(msg)) return;
    actions.deleteCat('doc', id);
    showToast('Filtro excluído');
  };

  const handleDocAction = (doc) => {
    if (doc.state === 'gen-pdf') return onNavigate('pdf');
    if (doc.state === 'comparativo') return setPaymentModalOpen(true);
    if (doc.state === 'placeholder') return;
    showToast('Documento não disponível ainda.');
  };

  const paymentMessage = data.msgs.find((m) => m.id === 'm7') || data.msgs.find((m) => m.cat === 'pagamento');

  return (
    <div className="page-wrap-wide max-w-[940px] mx-auto px-6 pt-7 pb-16 flex flex-col gap-4.5">
      <div>
        <h1 className="text-[19px] font-bold text-neutral-900 tracking-tight">
          {adminMode ? 'Documentos — Configuração' : 'PDFs e Documentos'}
        </h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          {adminMode
            ? 'Adicione, edite e reorganize documentos e filtros'
            : 'Materiais padrão da agência prontos para envio'}
        </p>
      </div>

      {adminMode && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => {
              setEditingCatId(null);
              setCatModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-md text-[13px] font-semibold bg-blue-600 text-white hover:bg-blue-700"
          >
            + Novo filtro
          </button>
          <button
            onClick={() => openNewDoc(null)}
            className="px-3 py-1.5 rounded-md text-[13px] font-semibold border border-neutral-300 bg-white hover:bg-neutral-50"
          >
            + Novo documento
          </button>
          <button
            onClick={() => setManageOpen(true)}
            className="px-3 py-1.5 rounded-md text-[13px] font-semibold border border-neutral-300 bg-white hover:bg-neutral-50"
          >
            Gerenciar filtros
          </button>
        </div>
      )}

      <div className="flex gap-0 flex-wrap border-b border-neutral-200">
        <button
          onClick={() => setActiveTab('todas')}
          className={`px-3 py-1.5 text-xs font-semibold border-b-2 -mb-px transition-colors ${
            activeTab === 'todas' ? 'text-blue-600 border-blue-600' : 'text-neutral-500 border-transparent hover:text-neutral-700'
          }`}
        >
          Todas
        </button>
        {data.docCats.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-3 py-1.5 text-xs font-semibold border-b-2 -mb-px transition-colors ${
              activeTab === cat.id ? 'text-blue-600 border-blue-600' : 'text-neutral-500 border-transparent hover:text-neutral-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {data.docCats.length === 0 ? (
        <EmptyState>Nenhum filtro criado.</EmptyState>
      ) : (
        sections
          .filter((s) => s.show)
          .map(({ cat, items }) => (
            <div key={cat.id} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-wide text-neutral-500 mt-2">
                {cat.section}
                <span className="flex-1 h-px bg-neutral-200" />
                {adminMode && (
                  <button
                    onClick={() => openNewDoc(cat.id)}
                    className="text-[11px] font-semibold px-2 py-0.5 border border-neutral-300 rounded text-neutral-600 hover:border-blue-600 hover:text-blue-600"
                  >
                    + Documento
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {items.length === 0 ? (
                  <EmptyState wide>Nenhum documento.</EmptyState>
                ) : (
                  items.map((doc, idx) => (
                    <DocCard
                      key={doc.id}
                      doc={doc}
                      index={idx}
                      total={items.length}
                      adminMode={adminMode}
                      onEdit={(id) => {
                        setEditingDocId(id);
                        setDocModalOpen(true);
                      }}
                      onMove={(dir) => actions.moveDoc(doc.id, dir)}
                      onDelete={handleDeleteDoc}
                      onAction={handleDocAction}
                    />
                  ))
                )}
              </div>
            </div>
          ))
      )}

      <DocModal
        open={docModalOpen}
        onClose={() => setDocModalOpen(false)}
        onSave={handleSaveDoc}
        categories={data.docCats}
        editingDoc={editingDoc}
        presetCat={presetCat}
      />

      <CategoryModal
        open={catModalOpen}
        onClose={() => setCatModalOpen(false)}
        onSave={handleSaveCat}
        editingCat={editingCat}
      />

      <ManageCategoriesModal
        open={manageOpen}
        onClose={() => setManageOpen(false)}
        categories={data.docCats}
        items={data.docs}
        onMove={(id, dir) => actions.moveCat('doc', id, dir)}
        onEdit={(id) => {
          setEditingCatId(id);
          setCatModalOpen(true);
        }}
        onDelete={handleDeleteCat}
      />

      <PaymentComparisonModal
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        messageText={paymentMessage?.text || ''}
      />
    </div>
  );
}
