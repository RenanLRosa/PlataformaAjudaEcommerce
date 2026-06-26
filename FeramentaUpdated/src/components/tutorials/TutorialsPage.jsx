import { useRef, useState } from 'react';

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function TutorialCard({ tut, index, total, adminMode, onDelete, onMove }) {
  const handleOpen = () => {
    const blob = new Blob(
      [Uint8Array.from(atob(tut.data), (c) => c.charCodeAt(0))],
      { type: 'application/pdf' }
    );
    window.open(URL.createObjectURL(blob), '_blank');
  };

  const handleDownload = () => {
    const blob = new Blob(
      [Uint8Array.from(atob(tut.data), (c) => c.charCodeAt(0))],
      { type: 'application/pdf' }
    );
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = tut.filename;
    a.click();
  };

  return (
    <div
      className="bg-white rounded-xl flex flex-col overflow-hidden transition-shadow"
      style={{ border: '1px solid #E8EEF4', boxShadow: '0 1px 3px rgba(0,43,77,0.05)' }}
      onMouseOver={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,43,77,0.10)'; e.currentTarget.style.borderColor = '#C0D6E8'; }}
      onMouseOut={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,43,77,0.05)'; e.currentTarget.style.borderColor = '#E8EEF4'; }}
    >
      <div style={{ height: 3, background: 'linear-gradient(to right, #002B4D, #1A6AA8)' }} />
      <div className="flex items-start gap-3 px-4 pt-4 pb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FEF2F2' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-[13.5px] font-bold text-[#002B4D] leading-tight">{tut.title}</h4>
          {tut.desc && <p className="text-[12px] text-[#6B8FAA] mt-0.5 leading-relaxed">{tut.desc}</p>}
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[10.5px] text-[#8BA8BF] font-mono truncate max-w-[140px]">{tut.filename}</span>
            {tut.size && (
              <><span className="w-1 h-1 rounded-full bg-[#C8D8E4]" /><span className="text-[10.5px] text-[#8BA8BF]">{formatBytes(tut.size)}</span></>
            )}
          </div>
        </div>
      </div>
      <div className="px-4 pb-3.5 flex gap-2" style={{ borderTop: '1px solid #F0F4F8', paddingTop: 10 }}>
        <button onClick={handleOpen} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-bold transition-all" style={{ background: '#002B4D', color: '#fff' }} onMouseOver={e => e.currentTarget.style.background = '#004070'} onMouseOut={e => e.currentTarget.style.background = '#002B4D'}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          Abrir PDF
        </button>
        <button onClick={handleDownload} className="px-3 py-2 rounded-lg text-[12px] font-bold transition-all" style={{ border: '1px solid #D6E4EF', color: '#4A6A85', background: '#F7FAFC' }} onMouseOver={e => { e.currentTarget.style.borderColor = '#A0E800'; e.currentTarget.style.color = '#3D5A00'; }} onMouseOut={e => { e.currentTarget.style.borderColor = '#D6E4EF'; e.currentTarget.style.color = '#4A6A85'; }} title="Download">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        </button>
      </div>
      {adminMode && (
        <div className="px-4 pb-3 flex gap-1.5" style={{ borderTop: '1px solid #F0F4F8', paddingTop: 8 }}>
          {index > 0 && <button onClick={() => onMove('up')} className="text-[11px] font-bold px-2 py-1 rounded border border-[#D6E4EF] text-[#4A6A85] hover:border-[#002B4D]">↑</button>}
          {index < total - 1 && <button onClick={() => onMove('down')} className="text-[11px] font-bold px-2 py-1 rounded border border-[#D6E4EF] text-[#4A6A85] hover:border-[#002B4D]">↓</button>}
          <button onClick={onDelete} className="ml-auto text-[11px] font-bold px-2.5 py-1 rounded border border-[#FCA5A5] text-[#DC2626] hover:bg-[#FEF2F2]">Excluir</button>
        </div>
      )}
    </div>
  );
}

function UploadZone({ onUpload }) {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);
  const [meta, setMeta] = useState({ title: '', desc: '' });
  const [pendingFile, setPendingFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const readFile = (file) => {
    if (!file || file.type !== 'application/pdf') return;
    setPendingFile(file);
    setMeta((m) => ({ ...m, title: file.name.replace(/\.pdf$/i, '').replace(/[-_]/g, ' ') }));
  };

  const handleSave = () => {
    if (!pendingFile || !meta.title.trim()) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result.split(',')[1];
      onUpload({ title: meta.title.trim(), desc: meta.desc.trim(), filename: pendingFile.name, size: pendingFile.size, data: base64 });
      setPendingFile(null);
      setMeta({ title: '', desc: '' });
      setLoading(false);
    };
    reader.readAsDataURL(pendingFile);
  };

  const fieldStyle = { border: '1px solid #D6E4EF', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#002B4D', outline: 'none', width: '100%', boxSizing: 'border-box' };

  if (pendingFile) {
    return (
      <div className="bg-white rounded-xl p-5 flex flex-col gap-3" style={{ border: '1px solid #D6E4EF' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#FEF2F2' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <div><p className="text-[12.5px] font-bold text-[#002B4D] m-0">{pendingFile.name}</p><p className="text-[11px] text-[#8BA8BF] m-0">{formatBytes(pendingFile.size)}</p></div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10.5px] font-black uppercase tracking-[0.1em] text-[#4A6A85]">Título</label>
          <input value={meta.title} onChange={(e) => setMeta((m) => ({ ...m, title: e.target.value }))} style={fieldStyle} onFocus={e => e.target.style.borderColor = '#A0E800'} onBlur={e => e.target.style.borderColor = '#D6E4EF'} placeholder="Ex: Tutorial de Cadastro de Produtos" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10.5px] font-black uppercase tracking-[0.1em] text-[#4A6A85]">Descrição <span className="text-[#8BA8BF] normal-case font-medium tracking-normal">(opcional)</span></label>
          <input value={meta.desc} onChange={(e) => setMeta((m) => ({ ...m, desc: e.target.value }))} style={fieldStyle} onFocus={e => e.target.style.borderColor = '#A0E800'} onBlur={e => e.target.style.borderColor = '#D6E4EF'} placeholder="Breve descrição do tutorial" />
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setPendingFile(null); setMeta({ title: '', desc: '' }); }} className="px-4 py-2 rounded-lg text-[12px] font-bold" style={{ border: '1px solid #D6E4EF', color: '#4A6A85', background: '#F7FAFC' }}>Cancelar</button>
          <button onClick={handleSave} disabled={!meta.title.trim() || loading} className="flex-1 py-2 rounded-lg text-[12px] font-black disabled:opacity-50" style={{ background: '#002B4D', color: '#fff' }}>
            {loading ? 'Salvando…' : 'Adicionar Tutorial'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); readFile(e.dataTransfer.files[0]); }}
      className="rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer py-8 transition-all"
      style={{ border: `2px dashed ${dragging ? '#A0E800' : '#C8D8E4'}`, background: dragging ? '#F4FBE0' : '#F7FAFC' }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#EFF4F9' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A6A85" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
      </div>
      <p className="text-[13px] font-bold text-[#4A6A85] m-0">Clique ou arraste um PDF</p>
      <p className="text-[11.5px] text-[#8BA8BF] m-0">Apenas arquivos .pdf</p>
      <input ref={inputRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => readFile(e.target.files[0])} />
    </div>
  );
}

export default function TutorialsPage({ data, adminMode, actions, showToast }) {
  const tutorials = data.tutorials || [];

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px 80px' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 900, color: '#002B4D', margin: 0, letterSpacing: '-0.02em' }}>Tutoriais</h1>
        <p style={{ fontSize: 13, color: '#6B8FAA', margin: '4px 0 0' }}>PDFs de apoio para clientes — abra ou faça download diretamente aqui</p>
      </div>

      {adminMode && <div style={{ marginBottom: 16 }}><UploadZone onUpload={(tut) => { actions.addTutorial(tut); showToast('Tutorial adicionado!'); }} /></div>}

      {tutorials.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 rounded-2xl" style={{ border: '1px dashed #D6E4EF', background: '#F7FAFC' }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: '#EFF4F9' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4A6A85" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#4A6A85', margin: 0 }}>Nenhum tutorial ainda</p>
          <p style={{ fontSize: 12, color: '#8BA8BF', margin: 0 }}>{adminMode ? 'Faça upload de um PDF acima' : 'Ative o modo admin para adicionar tutoriais'}</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
          {tutorials.map((tut, i) => (
            <TutorialCard key={tut.id} tut={tut} index={i} total={tutorials.length} adminMode={adminMode}
              onDelete={() => { if (confirm('Excluir este tutorial?')) { actions.deleteTutorial(tut.id); showToast('Excluído'); } }}
              onMove={(dir) => actions.moveTutorial(tut.id, dir)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
