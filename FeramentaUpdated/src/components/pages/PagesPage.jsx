import { useState } from 'react';
import PageCard from './PageCard';
import EmptyState from '../common/EmptyState';
import PageEditorModal from '../modals/PageEditorModal';

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

  const hasQuemSomos = customFields.quemSomos.trim().length > 0;
  const previewLines = hasQuemSomos
    ? customFields.quemSomos.trim().split(/\n{2,}/).map((p) => `<p><span style="font-size:16px;">${p.trim()}</span></p>`)
    : [];

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px 80px' }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 900, color: '#002B4D', margin: 0, letterSpacing: '-0.02em' }}>
          {adminMode ? 'Páginas Institucionais — Admin' : 'Páginas Institucionais'}
        </h1>
        <p style={{ fontSize: 13, color: '#6B8FAA', margin: '4px 0 0' }}>
          HTML pronto para copiar e colar no editor de código-fonte da sua plataforma
        </p>
      </div>

      {/* Personalização */}
      {!adminMode && (
        <div
          style={{
            background: '#fff',
            border: '1px solid #D6E4EF',
            borderRadius: 16,
            padding: '20px 24px',
            marginBottom: 24,
            boxShadow: '0 1px 4px rgba(0,43,77,0.04)',
          }}
        >
          {/* Header do bloco */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: '#EBF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A6AA8" strokeWidth="2.5">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#002B4D', margin: 0 }}>Personalização</p>
              <p style={{ fontSize: 11.5, color: '#7FA8C7', margin: 0 }}>
                Preencha para substituir os campos variáveis antes de copiar
              </p>
            </div>
          </div>

          {/* Nome da loja */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 10.5, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4A6A85', marginBottom: 6 }}>
              Nome da loja
              <span style={{ fontSize: 10, fontWeight: 600, color: '#8BA8BF', textTransform: 'none', letterSpacing: 0, marginLeft: 6 }}>
                — usado na Política de Privacidade
              </span>
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={customFields.nomeLoja}
                onChange={(e) => setCustomFields((f) => ({ ...f, nomeLoja: e.target.value }))}
                placeholder="Ex: Minha Loja"
                style={{ flex: 1, padding: '9px 14px', borderRadius: 10, border: '1px solid #D6E4EF', fontSize: 13, color: '#002B4D', outline: 'none' }}
                onFocus={e => e.target.style.borderColor = '#A0E800'}
                onBlur={e => e.target.style.borderColor = '#D6E4EF'}
              />
              {customFields.nomeLoja && (
                <button onClick={() => setCustomFields((f) => ({ ...f, nomeLoja: '' }))}
                  style={{ padding: '8px 14px', borderRadius: 10, border: '1px solid #E8EEF4', background: '#F7FAFC', fontSize: 12, fontWeight: 600, color: '#6B8FAA', cursor: 'pointer' }}>
                  Limpar
                </button>
              )}
            </div>
          </div>

          {/* Divisor */}
          <div style={{ height: 1, background: '#F0F4F8', margin: '18px 0' }} />

          {/* Quem somos */}
          <div>
            <label style={{ display: 'block', fontSize: 10.5, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4A6A85', marginBottom: 6 }}>
              Texto — Quem Somos
              <span style={{ fontSize: 10, fontWeight: 600, color: '#8BA8BF', textTransform: 'none', letterSpacing: 0, marginLeft: 6 }}>
                — cada parágrafo separado por linha em branco
              </span>
            </label>
            <textarea
              rows={5}
              value={customFields.quemSomos}
              onChange={(e) => setCustomFields((f) => ({ ...f, quemSomos: e.target.value }))}
              placeholder={"Cole ou escreva o texto da empresa aqui…\n\nSepare os parágrafos com uma linha em branco.\nCada parágrafo vira um <p> no código-fonte."}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #D6E4EF', fontSize: 13, color: '#002B4D', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6, boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#A0E800'}
              onBlur={e => e.target.style.borderColor = '#D6E4EF'}
            />

            {/* Preview do HTML gerado */}
            {hasQuemSomos && (
              <div style={{ marginTop: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <div style={{ width: 3, height: 12, borderRadius: 99, background: '#A0E800' }} />
                  <span style={{ fontSize: 10.5, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#5A8A00' }}>
                    Preview do código gerado
                  </span>
                </div>
                <div style={{ background: '#F4FBE0', border: '1px solid #C8E69A', borderRadius: 10, padding: '10px 14px', maxHeight: 130, overflowY: 'auto' }}>
                  {previewLines.map((line, i) => (
                    <div key={i} style={{ fontSize: 11, fontFamily: 'monospace', color: '#3D5A00', lineHeight: 1.8, wordBreak: 'break-all' }}>{line}</div>
                  ))}
                </div>
                <p style={{ fontSize: 11, color: '#8BA8BF', margin: '6px 0 0' }}>
                  Clique em "Copiar HTML" no card <strong>Quem Somos</strong> abaixo para copiar com esse texto.
                </p>
              </div>
            )}

            {customFields.quemSomos && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                <button onClick={() => setCustomFields((f) => ({ ...f, quemSomos: '' }))}
                  style={{ fontSize: 11.5, fontWeight: 600, padding: '5px 12px', borderRadius: 8, border: '1px solid #E8EEF4', background: '#F7FAFC', color: '#6B8FAA', cursor: 'pointer' }}>
                  Limpar texto
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Admin: nova página */}
      {adminMode && (
        <div style={{ marginBottom: 20 }}>
          <button
            onClick={() => { setEditingPageId(null); setEditorOpen(true); }}
            style={{ padding: '9px 18px', borderRadius: 10, background: '#002B4D', color: '#A0E800', fontSize: 13, fontWeight: 800, border: 'none', cursor: 'pointer' }}
          >
            + Nova página
          </button>
        </div>
      )}

      {/* Grid de cards */}
      {data.pages.length === 0 ? (
        <EmptyState>Nenhuma página criada ainda.</EmptyState>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {data.pages.map((page, idx) => (
            <PageCard
              key={page.id}
              page={page}
              index={idx}
              total={data.pages.length}
              adminMode={adminMode}
              customFields={customFields}
              onEdit={(id) => { setEditingPageId(id); setEditorOpen(true); }}
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
