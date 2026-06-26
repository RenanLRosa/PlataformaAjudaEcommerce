// Funções utilitárias usadas em toda a aplicação

/** Gera um id único prefixado, ex: uid('m') -> 'm_l3x9a_4f2k' */
export function uid(prefix) {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

/** Lê o valor de um <select>/<input> sob a regra "Outro/Outra" -> usa o campo livre */
export function resolveSelectOrOther(selectValue, otherValue) {
  const v = (selectValue || '').trim();
  if (v === 'Outro' || v === 'Outra') return (otherValue || '').trim();
  return v;
}

/** Copia texto para a área de transferência; retorna uma Promise<boolean> */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback para navegadores/contextos sem suporte à Clipboard API
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}

/** Move um item dentro de uma lista filtrada pela mesma categoria (mantendo ordem das outras) */
export function moveWithinCategory(list, id, dir, catKey = 'cat') {
  const item = list.find((x) => x.id === id);
  if (!item) return list;
  const sameCat = list.filter((x) => x[catKey] === item[catKey]);
  const pos = sameCat.indexOf(item);
  const targetPos = pos + dir;
  if (targetPos < 0 || targetPos >= sameCat.length) return list;
  const other = sameCat[targetPos];
  const idxItem = list.indexOf(item);
  const idxOther = list.indexOf(other);
  const newList = [...list];
  newList[idxItem] = other;
  newList[idxOther] = item;
  return newList;
}

/** Move um item dentro de uma lista simples (sem agrupamento por categoria) */
export function moveInList(list, index, dir) {
  const target = index + dir;
  if (target < 0 || target >= list.length) return list;
  const newList = [...list];
  [newList[index], newList[target]] = [newList[target], newList[index]];
  return newList;
}

/** Baixa um arquivo (ex: imagem base64) via link temporário */
export function downloadDataUrl(dataUrl, filename) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/** Lê arquivos (FileList) e retorna um array de { name, src } via FileReader */
export function readFilesAsDataUrls(files) {
  const fileArray = Array.from(files || []);
  return Promise.all(
    fileArray.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const name = file.name.replace(/\.[^/.]+$/, '');
            resolve({ name, src: ev.target.result });
          };
          reader.readAsDataURL(file);
        })
    )
  );
}
