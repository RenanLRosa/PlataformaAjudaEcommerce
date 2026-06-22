/** Monta a mensagem de compartilhamento de um link, substituindo [[NOME]] e [[URL]] */
export function buildLinkShareMessage(link) {
  const hasCustomMsg = link.msg && link.msg.trim();
  if (hasCustomMsg) {
    return link.msg.replaceAll('[[NOME]]', link.name).replaceAll('[[URL]]', link.url);
  }
  return `Esse é o link para ${link.name}:\n\n${link.url}`;
}
