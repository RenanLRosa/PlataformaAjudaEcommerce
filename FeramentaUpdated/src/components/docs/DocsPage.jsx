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
    if (data.docCats.length === 0) { alert('Crie um filtro primeiro.'); return; }
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

  const tabBtnStyle = (active) => ({
    padding: '6px 14px',
    fontSize: 12,
    fontWeight: 700,
    border: 'none',
    borderBottom: `2px solid ${active ? '#A0E800' : 'transparent'}`,
    color: active ? '#A0E800' : '#6B8FAA',
    background: 'transparent',
    cursor: 'pointer',
    marginBottom: -1,
    transition: 'color 0.15s',
    whiteSpace: 'nowrap',
  });

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px 80px' }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 900, color: '#002B4D', margin: 0, letterSpacing: '-0.02em' }}>
          {adminMode ? 'Documentos — Admin' : 'PDFs e Documentos'}
        </h1>
        <p style={{ fontSize: 13, color: '#6B8FAA', margin: '4px 0 0' }}>
          Materiais padrão da agência prontos para envio
        </p>
      </div>

      {/* Admin actions */}
      {adminMode && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {[
            { label: '+ Novo filtro', onClick: () => { setEditingCatId(null); setCatModalOpen(true); }, primary: true },
            { label: '+ Novo documento', onClick: () => openNewDoc(null) },
            { label: 'Gerenciar filtros', onClick: () => setManageOpen(true) },
          ].map(({ label, onClick, primary }) => (
            <button key={label} onClick={onClick} style={{
              padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer',
              background: primary ? '#002B4D' : '#fff',
              color: primary ? '#A0E800' : '#4A6A85',
              border: primary ? 'none' : '1px solid #D6E4EF',
            }}>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '1px solid #E8EEF4', marginBottom: 24, gap: 0 }}>
        <button style={tabBtnStyle(activeTab === 'todas')} onClick={() => setActiveTab('todas')}>Todas</button>
        {data.docCats.map((cat) => (
          <button key={cat.id} style={tabBtnStyle(activeTab === cat.id)} onClick={() => setActiveTab(cat.id)}>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {data.docCats.length === 0 ? (
        <EmptyState>Nenhum filtro criado.</EmptyState>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {sections.filter((s) => s.show).map(({ cat, items }) => (
            <div key={cat.id}>
              {/* Section label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{
                  fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em',
                  padding: '4px 10px', borderRadius: 6, background: '#002B4D', color: '#A0E800', flexShrink: 0,
                }}>
                  {cat.section || cat.label}
                </div>
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, #D6E4EF, transparent)' }} />
                {adminMode && (
                  <button onClick={() => openNewDoc(cat.id)} style={{
                    fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 8,
                    border: '1px solid #D6E4EF', color: '#4A6A85', background: '#fff', cursor: 'pointer',
                  }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = '#A0E800'; e.currentTarget.style.color = '#002B4D'; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = '#D6E4EF'; e.currentTarget.style.color = '#4A6A85'; }}
                  >
                    + Documento
                  </button>
                )}
              </div>

              {/* Cards */}
              {items.length === 0 ? (
                <EmptyState wide>Nenhum documento.</EmptyState>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                  {items.map((doc, idx) => (
                    <DocCard
                      key={doc.id}
                      doc={doc}
                      index={idx}
                      total={items.length}
                      adminMode={adminMode}
                      onEdit={(id) => { setEditingDocId(id); setDocModalOpen(true); }}
                      onMove={(dir) => actions.moveDoc(doc.id, dir)}
                      onDelete={handleDeleteDoc}
                      onAction={handleDocAction}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <DocModal open={docModalOpen} onClose={() => setDocModalOpen(false)} onSave={handleSaveDoc} categories={data.docCats} editingDoc={editingDoc} presetCat={presetCat} />
      <CategoryModal open={catModalOpen} onClose={() => setCatModalOpen(false)} onSave={handleSaveCat} editingCat={editingCat} />
      <ManageCategoriesModal open={manageOpen} onClose={() => setManageOpen(false)} categories={data.docCats} items={data.docs} onMove={(id, dir) => actions.moveCat('doc', id, dir)} onEdit={(id) => { setEditingCatId(id); setCatModalOpen(true); }} onDelete={handleDeleteCat} />
      <PaymentComparisonModal open={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} messageText={paymentMessage?.text || ''} />
    </div>
  );
}
