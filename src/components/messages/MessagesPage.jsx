import { useState, useMemo } from 'react';
import MessageCard from './MessageCard';
import EmptyState from '../common/EmptyState';
import MessageModal from '../modals/MessageModal';
import CategoryModal from '../modals/CategoryModal';
import ManageCategoriesModal from '../modals/ManageCategoriesModal';

export default function MessagesPage({ data, adminMode, actions, showToast }) {
  const [activeTab, setActiveTab] = useState('todas');
  const [search, setSearch] = useState('');

  const [msgModalOpen, setMsgModalOpen] = useState(false);
  const [editingMsgId, setEditingMsgId] = useState(null);
  const [presetCat, setPresetCat] = useState(null);

  const [catModalOpen, setCatModalOpen] = useState(false);
  const [editingCatId, setEditingCatId] = useState(null);

  const [manageOpen, setManageOpen] = useState(false);

  const searchLower = search.toLowerCase();

  const sections = useMemo(() => {
    return data.msgCats.map((cat) => {
      const items = data.msgs.filter((m) => m.cat === cat.id);
      const tabOk = activeTab === 'todas' || activeTab === cat.id;
      const visibleItems = items.filter((m) => {
        const searchOk =
          searchLower === '' ||
          `${m.title} ${m.sub} ${m.text}`.toLowerCase().includes(searchLower);
        return searchOk;
      });
      const hasVisible = visibleItems.length > 0;
      const show = adminMode ? tabOk : tabOk && hasVisible;
      return { cat, items, visibleItems, show };
    });
  }, [data.msgCats, data.msgs, activeTab, searchLower, adminMode]);

  const openNewMsg = (catId) => {
    setEditingMsgId(null);
    setPresetCat(catId || null);
    if (data.msgCats.length === 0) {
      alert('Crie um filtro primeiro.');
      return;
    }
    setMsgModalOpen(true);
  };

  const openEditMsg = (id) => {
    setEditingMsgId(id);
    setMsgModalOpen(true);
  };

  const editingMsg = editingMsgId ? data.msgs.find((m) => m.id === editingMsgId) : null;

  const handleSaveMsg = (msgData) => {
    actions.saveMsg(msgData, editingMsgId);
    setMsgModalOpen(false);
    showToast(editingMsgId ? 'Mensagem atualizada' : 'Mensagem salva');
  };

  const handleDeleteMsg = (msg) => {
    if (!confirm(`Excluir "${msg.title}"?`)) return;
    actions.deleteMsg(msg.id);
    showToast('Excluído');
  };

  const editingCat = editingCatId ? data.msgCats.find((c) => c.id === editingCatId) : null;

  const handleSaveCat = (catData) => {
    actions.saveCat('msg', catData, editingCatId);
    setCatModalOpen(false);
    showToast('Filtro salvo');
  };

  const handleDeleteCat = (id) => {
    const cat = data.msgCats.find((c) => c.id === id);
    const count = data.msgs.filter((m) => m.cat === id).length;
    const msg = count > 0
      ? `"${cat.label}" tem ${count} item(s). Excluir também excluirá esses itens?`
      : `Excluir "${cat.label}"?`;
    if (!confirm(msg)) return;
    actions.deleteCat('msg', id);
    showToast('Filtro excluído');
  };

  return (
    <div className="page-wrap-wide max-w-[940px] mx-auto px-6 pt-7 pb-16 flex flex-col gap-4.5">
      <div>
        <h1 className="text-[19px] font-bold text-neutral-900 tracking-tight">
          {adminMode ? 'Mensagens — Configuração' : 'Mensagens Padrão'}
        </h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          {adminMode
            ? 'Adicione, edite e reorganize mensagens e filtros'
            : 'Copie e adapte as mensagens para WhatsApp, grupos e e-mails'}
        </p>
      </div>

      {!adminMode && (
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar mensagem…"
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl outline-none transition-all"
            style={{
              border: '1px solid #D6E4EF',
              background: '#fff',
              color: '#002B4D',
            }}
            onFocus={e => { e.target.style.borderColor = '#A0E800'; e.target.style.boxShadow = '0 0 0 3px rgba(160,232,0,0.12)'; }}
            onBlur={e => { e.target.style.borderColor = '#D6E4EF'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
      )}

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
            onClick={() => openNewMsg(null)}
            className="px-3 py-1.5 rounded-md text-[13px] font-semibold border border-neutral-300 bg-white hover:bg-neutral-50"
          >
            + Nova mensagem
          </button>
          <button
            onClick={() => setManageOpen(true)}
            className="px-3 py-1.5 rounded-md text-[13px] font-semibold border border-neutral-300 bg-white hover:bg-neutral-50"
          >
            Gerenciar filtros
          </button>
        </div>
      )}

      <div className="flex gap-0 flex-wrap border-b border-[#E8EEF4]">
        <button
          onClick={() => setActiveTab('todas')}
          className={`px-3 py-2 text-[12px] font-bold border-b-2 -mb-px transition-colors ${
            activeTab === 'todas'
              ? 'text-[#A0E800] border-[#A0E800]'
              : 'text-neutral-400 border-transparent hover:text-neutral-600'
          }`}
        >
          Todas
        </button>
        {data.msgCats.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-3 py-2 text-[12px] font-bold border-b-2 -mb-px transition-colors ${
              activeTab === cat.id
                ? 'text-[#A0E800] border-[#A0E800]'
                : 'text-neutral-400 border-transparent hover:text-neutral-600'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {data.msgCats.length === 0 ? (
        <EmptyState>Nenhum filtro criado.</EmptyState>
      ) : (
        sections
          .filter((s) => s.show)
          .map(({ cat, items, visibleItems }) => (
            <div key={cat.id} className="flex flex-col gap-3">
              <div className="flex items-center gap-3 mt-4">
                <div
                  className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md"
                  style={{ background: '#002B4D', color: '#A0E800', letterSpacing: '0.12em' }}
                >
                  {cat.section}
                </div>
                <span className="flex-1 h-px" style={{ background: 'linear-gradient(to right, #E8EEF4, transparent)' }} />
                {adminMode && (
                  <button
                    onClick={() => openNewMsg(cat.id)}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-md border transition-colors"
                    style={{ borderColor: '#D6E4EF', color: '#1A6AA8' }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = '#A0E800'; e.currentTarget.style.color = '#002B4D'; e.currentTarget.style.background = '#A0E80011'; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = '#D6E4EF'; e.currentTarget.style.color = '#1A6AA8'; e.currentTarget.style.background = ''; }}
                  >
                    + Mensagem
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
                {visibleItems.length === 0 ? (
                  <EmptyState wide>Nenhuma mensagem neste filtro.</EmptyState>
                ) : (
                  visibleItems.map((msg) => {
                    const idx = items.indexOf(msg);
                    return (
                      <MessageCard
                        key={msg.id}
                        msg={msg}
                        index={idx}
                        total={items.length}
                        adminMode={adminMode}
                        onEdit={() => openEditMsg(msg.id)}
                        onMove={(dir) => actions.moveMsg(msg.id, dir)}
                        onDelete={() => handleDeleteMsg(msg)}
                      />
                    );
                  })
                )}
              </div>
            </div>
          ))
      )}

      <MessageModal
        open={msgModalOpen}
        onClose={() => setMsgModalOpen(false)}
        onSave={handleSaveMsg}
        categories={data.msgCats}
        editingMsg={editingMsg}
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
        categories={data.msgCats}
        items={data.msgs}
        onMove={(id, dir) => actions.moveCat('msg', id, dir)}
        onEdit={(id) => {
          setEditingCatId(id);
          setCatModalOpen(true);
        }}
        onDelete={handleDeleteCat}
      />
    </div>
  );
}
