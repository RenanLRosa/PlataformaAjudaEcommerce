import { useState, useMemo } from 'react';
import LinkCard from './LinkCard';
import EmptyState from '../common/EmptyState';
import LinkModal from '../modals/LinkModal';
import LinkDetailModal from '../modals/LinkDetailModal';

export default function LinksPage({ data, adminMode, actions, showToast }) {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [detailLinkId, setDetailLinkId] = useState(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return data.links;
    return data.links.filter(
      (lk) =>
        lk.name.toLowerCase().includes(q) ||
        lk.url.toLowerCase().includes(q) ||
        (lk.desc || '').toLowerCase().includes(q)
    );
  }, [data.links, search]);

  const editingLink = editingLinkId ? data.links.find((l) => l.id === editingLinkId) : null;
  const detailLink = detailLinkId ? data.links.find((l) => l.id === detailLinkId) : null;

  const handleSave = (linkData) => {
    actions.saveLink(linkData, editingLinkId);
    setModalOpen(false);
    showToast('Link salvo');
  };

  const handleDelete = (link) => {
    if (!confirm(`Excluir "${link.name}"?`)) return;
    actions.deleteLink(link.id);
    showToast('Link excluído');
  };

  return (
    <div className="page-wrap-wide max-w-[940px] mx-auto px-6 pt-7 pb-16 flex flex-col gap-4.5">
      <div>
        <h1 className="text-[19px] font-bold text-neutral-900 tracking-tight">
          {adminMode ? 'Links Úteis — Configuração' : 'Links Úteis'}
        </h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          {adminMode ? 'Adicione, edite e reorganize os links' : 'Acesse e compartilhe os links mais usados pela equipe'}
        </p>
      </div>

      {!adminMode && (
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar link…"
          className="px-3 py-2 border border-neutral-300 rounded-md text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />
      )}

      {adminMode && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => {
              setEditingLinkId(null);
              setModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-md text-[13px] font-semibold bg-blue-600 text-white hover:bg-blue-700"
          >
            + Novo link
          </button>
        </div>
      )}

      {data.links.length === 0 ? (
        <EmptyState>Nenhum link cadastrado ainda.</EmptyState>
      ) : filtered.length === 0 ? (
        <EmptyState>Nenhum link encontrado.</EmptyState>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((link) => {
            const realIdx = data.links.indexOf(link);
            return (
              <LinkCard
                key={link.id}
                link={link}
                index={realIdx}
                total={data.links.length}
                adminMode={adminMode}
                onEdit={() => {
                  setEditingLinkId(link.id);
                  setModalOpen(true);
                }}
                onMove={(dir) => actions.moveLink(link.id, dir)}
                onDelete={() => handleDelete(link)}
                onSeeMore={() => setDetailLinkId(link.id)}
              />
            );
          })}
        </div>
      )}

      <LinkModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} editingLink={editingLink} />
      <LinkDetailModal open={!!detailLink} onClose={() => setDetailLinkId(null)} link={detailLink} />
    </div>
  );
}
