// Monta o HTML final de uma página institucional, substituindo os placeholders
// dinâmicos (nome da loja, texto "quem somos") pelo conteúdo informado pelo usuário.

/**
 * @param {object} page - item de DATA.pages
 * @param {{ nomeLoja?: string, quemSomos?: string }} customFields
 */
export function buildPageHtml(page, customFields = {}) {
  let html = page.html || '';
  const nome = (customFields.nomeLoja || '').trim();
  const quemSomos = (customFields.quemSomos || '').trim();

  if (page.dynamic === 'nome_loja') {
    html = html.replaceAll('[[NOME_LOJA]]', nome || '[INSERIR NOME DA LOJA]');
  }

  if (page.dynamic === 'quem_somos') {
    const block = quemSomos
      ? quemSomos
          .split(/\n{2,}/)
          .map((s) => `<p>${s.trim().replaceAll('\n', '<br>')}</p>`)
          .join('\n')
      : '<p>Somos uma loja dedicada a oferecer produtos de qualidade com o melhor atendimento.</p>';
    html = html.replace('[[QUEM_SOMOS_BLOCK]]', block);
  }

  return html;
}
