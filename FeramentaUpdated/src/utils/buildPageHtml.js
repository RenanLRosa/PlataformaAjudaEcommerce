export function buildPageHtml(page, customFields = {}) {
  const nome = (customFields.nomeLoja || '').trim();
  const quemSomos = (customFields.quemSomos || '').trim();

  // Política de Privacidade — substitui [[NOME_LOJA]] onde aparecer
  if (page.dynamic === 'nome_loja') {
    return (page.html || '').replaceAll('[[NOME_LOJA]]', nome || '[INSERIR NOME DA LOJA]');
  }

  // Quem Somos — o HTML inteiro É o texto do cliente, formatado como código-fonte
  // Independente do que estiver salvo em page.html, o resultado é sempre construído
  // a partir do campo quemSomos digitado pelo usuário.
  if (page.dynamic === 'quem_somos') {
    if (!quemSomos) {
      return '<p><span style="font-size:16px;">[INSERIR TEXTO DA EMPRESA]</span></p>';
    }
    return quemSomos
      .split(/\n{2,}/)
      .map((paragraph) =>
        `<p><span style="font-size:16px;">${paragraph.trim().replaceAll('\n', '<br />')}</span></p>`
      )
      .join('\n\n');
  }

  return page.html || '';
}
