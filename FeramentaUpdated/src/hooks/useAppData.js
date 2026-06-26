import { useState, useEffect, useCallback } from 'react';
import { STORE_KEY } from '../data/constants';
import {
  DEFAULT_MSG_CATS,
  DEFAULT_MSGS,
  DEFAULT_DOC_CATS,
  DEFAULT_DOCS,
  DEFAULT_PAGES,
  DEFAULT_IMAGES,
  DEFAULT_LINKS,
} from '../data/defaultData';
import { uid, moveWithinCategory, moveInList } from '../utils/helpers';

function buildDefaultData() {
  return {
    msgCats: structuredClone(DEFAULT_MSG_CATS),
    msgs: structuredClone(DEFAULT_MSGS),
    docCats: structuredClone(DEFAULT_DOC_CATS),
    docs: structuredClone(DEFAULT_DOCS),
    pages: structuredClone(DEFAULT_PAGES),
    images: structuredClone(DEFAULT_IMAGES),
    links: structuredClone(DEFAULT_LINKS),
    tutorials: [],
  };
}

function loadInitialData() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed.pages)     parsed.pages     = structuredClone(DEFAULT_PAGES);
      if (!parsed.links)     parsed.links     = structuredClone(DEFAULT_LINKS);
      if (!parsed.images)    parsed.images    = structuredClone(DEFAULT_IMAGES);
      if (!parsed.tutorials) parsed.tutorials = [];
      return parsed;
    }
  } catch {
    // localStorage indisponível ou JSON corrompido: cai para o padrão
  }
  return buildDefaultData();
}

/**
 * Hook que centraliza todo o estado de dados da aplicação (mensagens, documentos,
 * páginas institucionais, imagens e links), com persistência automática em
 * localStorage — substitui o objeto global `DATA` da versão original em HTML puro.
 */
export function useAppData() {
  const [data, setData] = useState(loadInitialData);
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(data));
    } catch {
      // Armazenamento indisponível (modo privado, quota excedida etc.) — ignora
    }
  }, [data]);

  const resetData = useCallback(() => {
    setData(buildDefaultData());
  }, []);

  // ---------- Mensagens ----------
  const saveMsg = useCallback((msgData, editingId) => {
    setData((prev) => {
      if (editingId) {
        return {
          ...prev,
          msgs: prev.msgs.map((m) => (m.id === editingId ? { ...m, ...msgData } : m)),
        };
      }
      return { ...prev, msgs: [...prev.msgs, { id: uid('m'), ...msgData }] };
    });
  }, []);

  const deleteMsg = useCallback((id) => {
    setData((prev) => ({ ...prev, msgs: prev.msgs.filter((m) => m.id !== id) }));
  }, []);

  const moveMsg = useCallback((id, dir) => {
    setData((prev) => ({ ...prev, msgs: moveWithinCategory(prev.msgs, id, dir) }));
  }, []);

  // ---------- Documentos ----------
  const saveDoc = useCallback((docData, editingId) => {
    setData((prev) => {
      if (editingId) {
        return {
          ...prev,
          docs: prev.docs.map((d) => {
            if (d.id !== editingId) return d;
            // Preserva o "state" especial (gen-pdf / comparativo) se o usuário marcar "active"
            const merged = { ...d, ...docData };
            if ((d.state === 'gen-pdf' || d.state === 'comparativo') && docData.state === 'active') {
              merged.state = d.state;
            }
            return merged;
          }),
        };
      }
      return { ...prev, docs: [...prev.docs, { id: uid('d'), ...docData }] };
    });
  }, []);

  const deleteDoc = useCallback((id) => {
    setData((prev) => ({ ...prev, docs: prev.docs.filter((d) => d.id !== id) }));
  }, []);

  const moveDoc = useCallback((id, dir) => {
    setData((prev) => ({ ...prev, docs: moveWithinCategory(prev.docs, id, dir) }));
  }, []);

  // ---------- Categorias (compartilhado entre msgs e docs) ----------
  const saveCat = useCallback((scope, catData, editingId) => {
    setData((prev) => {
      const key = scope === 'msg' ? 'msgCats' : 'docCats';
      const cats = prev[key];
      if (editingId) {
        return {
          ...prev,
          [key]: cats.map((c) => (c.id === editingId ? { ...c, ...catData } : c)),
        };
      }
      return { ...prev, [key]: [...cats, { id: uid('cat'), ...catData }] };
    });
  }, []);

  const moveCat = useCallback((scope, id, dir) => {
    setData((prev) => {
      const key = scope === 'msg' ? 'msgCats' : 'docCats';
      const cats = prev[key];
      const idx = cats.findIndex((c) => c.id === id);
      return { ...prev, [key]: moveInList(cats, idx, dir) };
    });
  }, []);

  const deleteCat = useCallback((scope, id) => {
    setData((prev) => {
      const catKey = scope === 'msg' ? 'msgCats' : 'docCats';
      const itemKey = scope === 'msg' ? 'msgs' : 'docs';
      return {
        ...prev,
        [catKey]: prev[catKey].filter((c) => c.id !== id),
        [itemKey]: prev[itemKey].filter((i) => i.cat !== id),
      };
    });
  }, []);

  // ---------- Páginas institucionais ----------
  const savePage = useCallback((pageData, editingId) => {
    setData((prev) => {
      if (editingId) {
        return {
          ...prev,
          pages: prev.pages.map((p) => (p.id === editingId ? { ...p, ...pageData } : p)),
        };
      }
      return { ...prev, pages: [...prev.pages, { id: uid('pg'), ...pageData }] };
    });
  }, []);

  const deletePage = useCallback((id) => {
    setData((prev) => ({ ...prev, pages: prev.pages.filter((p) => p.id !== id) }));
  }, []);

  const movePage = useCallback((id, dir) => {
    setData((prev) => {
      const idx = prev.pages.findIndex((p) => p.id === id);
      return { ...prev, pages: moveInList(prev.pages, idx, dir) };
    });
  }, []);

  // ---------- Links ----------
  const saveLink = useCallback((linkData, editingId) => {
    setData((prev) => {
      if (editingId) {
        return {
          ...prev,
          links: prev.links.map((l) => (l.id === editingId ? { ...l, ...linkData } : l)),
        };
      }
      return { ...prev, links: [...prev.links, { id: uid('lk'), ...linkData }] };
    });
  }, []);

  const deleteLink = useCallback((id) => {
    setData((prev) => ({ ...prev, links: prev.links.filter((l) => l.id !== id) }));
  }, []);

  const moveLink = useCallback((id, dir) => {
    setData((prev) => {
      const idx = prev.links.findIndex((l) => l.id === id);
      return { ...prev, links: moveInList(prev.links, idx, dir) };
    });
  }, []);

  // ---------- Imagens (cards: pasta ou imagem avulsa) ----------
  const saveImageCard = useCallback((cardData, editingId) => {
    setData((prev) => {
      if (editingId) {
        return {
          ...prev,
          images: prev.images.map((c) => (c.id === editingId ? { ...c, ...cardData } : c)),
        };
      }
      const newCard = { id: uid('ic'), ...cardData };
      if (newCard.type === 'folder' && !newCard.items) newCard.items = [];
      return { ...prev, images: [...prev.images, newCard] };
    });
  }, []);

  const deleteImageCard = useCallback((id) => {
    setData((prev) => ({ ...prev, images: prev.images.filter((c) => c.id !== id) }));
  }, []);

  const addImagesToFolder = useCallback((folderId, newImages) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.map((card) =>
        card.id === folderId
          ? { ...card, items: [...(card.items || []), ...newImages.map((img) => ({ id: uid('fi'), ...img }))] }
          : card
      ),
    }));
  }, []);

  const deleteImageFromFolder = useCallback((folderId, imgId) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.map((card) =>
        card.id === folderId
          ? { ...card, items: (card.items || []).filter((i) => i.id !== imgId) }
          : card
      ),
    }));
  }, []);

  return {
    data,
    setData,
    adminMode,
    setAdminMode,
    resetData,
    saveMsg,
    deleteMsg,
    moveMsg,
    saveDoc,
    deleteDoc,
    moveDoc,
    saveCat,
    moveCat,
    deleteCat,
    savePage,
    deletePage,
    movePage,
    saveLink,
    deleteLink,
    moveLink,
    saveImageCard,
    deleteImageCard,
    addImagesToFolder,
    deleteImageFromFolder,
    addTutorial: useCallback((tut) => {
      setData((prev) => ({ ...prev, tutorials: [...(prev.tutorials || []), { id: uid('tut'), ...tut }] }));
    }, []),
    deleteTutorial: useCallback((id) => {
      setData((prev) => ({ ...prev, tutorials: (prev.tutorials || []).filter((t) => t.id !== id) }));
    }, []),
    moveTutorial: useCallback((id, dir) => {
      setData((prev) => {
        const list = prev.tutorials || [];
        const idx = list.findIndex((t) => t.id === id);
        return { ...prev, tutorials: moveInList(list, idx, dir) };
      });
    }, []),
  };
}
