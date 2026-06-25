import { AJUDA } from '../data/constants';
import { LOGO_B64 } from '../data/logoBase64';
import { resolveSelectOrOther } from './helpers';

// ───────────────────────── Paleta ─────────────────────────
const C = {
  navy: [13, 32, 64],
  navyLight: [22, 52, 96],
  ink: [17, 24, 39],
  slate: [71, 85, 105],
  muted: [148, 163, 184],
  faint: [241, 245, 249],
  line: [226, 232, 240],
  white: [255, 255, 255],
  lime: [163, 230, 53],
  limeDeep: [101, 163, 13],
};

// Uma cor de destaque por grupo temático — usada na lateral dos cards e nos badges
const GROUP_COLOR = {
  'E-commerce': [37, 99, 235],
  'E-mail e Domínio': [124, 58, 237],
  Envio: [8, 145, 178],
  'Redes Sociais': [219, 39, 119],
  Google: [234, 67, 53],
  ERP: [217, 119, 6],
  Marketplace: [13, 148, 136],
};

// Links diretos de acesso por provedor — exibidos apenas quando o provedor selecionado bate com o mapa
const EMAIL_PLATFORM_LINKS = {
  'Google Workspace': { label: 'Google Workspace (Gmail)', url: 'https://mail.google.com' },
  'Microsoft 365': { label: 'Microsoft 365 (Outlook)', url: 'https://outlook.office.com' },
  'Zoho Mail': { label: 'Zoho Mail', url: 'https://mail.zoho.com' },
  'Titan Mail': { label: 'Titan Mail', url: 'https://app.titan.email' },
};

const DOMAIN_PROVIDER_LINKS = {
  'Registro.br': { label: 'Painel Registro.br', url: 'https://registro.br' },
  GoDaddy: { label: 'Painel GoDaddy', url: 'https://dcc.godaddy.com' },
  Cloudflare: { label: 'Painel Cloudflare', url: 'https://dash.cloudflare.com' },
  Hostinger: { label: 'Painel Hostinger', url: 'https://hpanel.hostinger.com' },
  Locaweb: { label: 'Painel Locaweb', url: 'https://painel.locaweb.com.br' },
  HostGator: { label: 'Painel HostGator', url: 'https://cpanel.hostgator.com.br' },
};

const PAGE_W = 210,
  PAGE_H = 297,
  MARGIN = 18,
  CONTENT_W = PAGE_W - MARGIN * 2;

export function generateDeliveryPdf(form, JsPDFCtor) {
  const doc = new JsPDFCtor({ unit: 'mm', format: 'a4' });

  const val = (id) => (form[id] || '').toString().trim();
  const valSelect = (selectId, otherId) => resolveSelectOrOther(form[selectId], form[otherId]);
  const clientName = val('clientName') || 'Cliente';
  const lojaUrl = val('lojaUrl');

  let y = 0;
  let sectionNum = 0;

  const addPage = () => {
    doc.addPage();
    y = 20;
  };

  // ---------- primitivas de desenho ----------
  const setFill = (rgb) => doc.setFillColor(...rgb);
  const setDraw = (rgb) => doc.setDrawColor(...rgb);
  const setText = (rgb) => doc.setTextColor(...rgb);
  const font = (style, size) => {
    doc.setFont('helvetica', style);
    doc.setFontSize(size);
  };

  const drawLink = (text, x, yPos, url, fs = 10) => {
    font('normal', fs);
    setText([29, 78, 216]);
    doc.textWithLink(text, x, yPos, { url });
  };

  const truncate = (text, max) => (text.length > max ? text.substring(0, max - 1) + '…' : text);

  // Cabeçalho compacto repetido nas páginas internas
  const drawHeader = (label) => {
    setFill(C.navy);
    doc.rect(0, 0, PAGE_W, 16, 'F');
    setFill(C.lime);
    doc.rect(0, 16, PAGE_W, 0.8, 'F');
    doc.addImage(LOGO_B64, 'PNG', MARGIN, 1.2, 18, 18 * (18 / 22));
    font('bold', 8.5);
    setText([200, 215, 235]);
    doc.text(clientName, PAGE_W - MARGIN, 9.5, { align: 'right' });
    if (label) {
      font('normal', 7);
      setText(C.muted);
      doc.text(label.toUpperCase(), PAGE_W - MARGIN, 13.6, { align: 'right' });
    }
  };

  // Badge numerado de seção + título grande
  const drawSectionHeading = (num, title, subtitle) => {
    sectionNum = num;
    const badgeY = y;
    setFill(C.lime);
    doc.circle(MARGIN + 4.2, badgeY + 4.2, 4.2, 'F');
    font('bold', 10);
    setText(C.navy);
    doc.text(String(num).padStart(2, '0'), MARGIN + 4.2, badgeY + 5.6, { align: 'center' });

    font('bold', 19);
    setText(C.ink);
    doc.text(title, MARGIN + 12, badgeY + 6.2);

    if (subtitle) {
      font('normal', 9.5);
      setText(C.slate);
      doc.text(subtitle, MARGIN + 12, badgeY + 11.6);
      y = badgeY + 19;
    } else {
      y = badgeY + 15;
    }
  };

  // ---------- CAPA ----------
  const drawCover = () => {
    // fundo navy com leve diagonal mais clara
    setFill(C.navy);
    doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
    doc.setGState(new doc.GState({ opacity: 0.5 }));
    setFill(C.navyLight);
    doc.triangle(PAGE_W, 0, PAGE_W, PAGE_H * 0.62, PAGE_W * 0.42, 0, 'F');
    doc.setGState(new doc.GState({ opacity: 1 }));

    // pontos decorativos
    doc.setGState(new doc.GState({ opacity: 0.5 }));
    setFill(C.lime);
    for (let i = 0; i < 4; i++) {
      doc.circle(PAGE_W - 26 + i * 4.5, 30 + i * 3, 0.7, 'F');
    }
    doc.setGState(new doc.GState({ opacity: 1 }));

    doc.addImage(LOGO_B64, 'PNG', MARGIN, 24, 30, 30);

    setFill(C.lime);
    doc.rect(MARGIN, 96, 26, 1.1, 'F');
    font('bold', 9.5);
    setText(C.lime);
    doc.text('DOCUMENTO DE ENTREGA', MARGIN, 92);

    font('bold', 32);
    setText(C.white);
    const lines = doc.splitTextToSize(clientName, PAGE_W - MARGIN * 2 - 4);
    let ny = 118;
    lines.slice(0, 2).forEach((ln) => {
      doc.text(ln, MARGIN, ny);
      ny += 13;
    });

    font('normal', 11.5);
    setText([190, 205, 225]);
    doc.text('Kit de finalização e acessos da loja', MARGIN, ny + 7);

    if (lojaUrl) {
      doc.setGState(new doc.GState({ opacity: 0.9 }));
      setFill([255, 255, 255]);
      doc.setGState(new doc.GState({ opacity: 0.08 }));
      doc.roundedRect(MARGIN, ny + 14, Math.min(CONTENT_W, doc.getTextWidth(lojaUrl) + 14), 9, 2, 2, 'F');
      doc.setGState(new doc.GState({ opacity: 1 }));
      font('normal', 9.5);
      setText(C.lime);
      doc.text(lojaUrl, MARGIN + 4, ny + 19.5);
    }

    // rodapé da capa: dois blocos
    const footY = PAGE_H - 42;
    setDraw([255, 255, 255]);
    doc.setGState(new doc.GState({ opacity: 0.15 }));
    doc.setLineWidth(0.3);
    doc.line(MARGIN, footY, PAGE_W - MARGIN, footY);
    doc.setGState(new doc.GState({ opacity: 1 }));

    font('bold', 7.5);
    setText(C.lime);
    doc.text('CONCLUÍDO EM', MARGIN, footY + 9);
    font('normal', 12);
    setText(C.white);
    doc.text(new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }), MARGIN, footY + 17);

    font('bold', 7.5);
    setText(C.lime);
    doc.text('ENTREGUE POR', PAGE_W - MARGIN, footY + 9, { align: 'right' });
    font('normal', 12);
    setText(C.white);
    doc.text(AJUDA.nome, PAGE_W - MARGIN, footY + 17, { align: 'right' });
  };

  // ---------- PÁGINA 1: mensagem de encerramento ----------
  const drawMensagem = () => {
    addPage();
    drawHeader('Encerramento');
    y = 38;
    drawSectionHeading(1, 'Projeto concluído', 'Seu novo canal de vendas está pronto para operar');

    y += 4;
    font('normal', 11);
    setText(C.ink);
    const intro =
      'Obrigado pela confiança em nosso trabalho. Configuramos sua loja com cuidado e ela já está pronta para receber os primeiros pedidos.';
    doc.splitTextToSize(intro, CONTENT_W).forEach((ln) => {
      doc.text(ln, MARGIN, y);
      y += 6.2;
    });

    y += 10;
    font('bold', 9);
    setText(C.slate);
    doc.text('NESTE DOCUMENTO VOCÊ ENCONTRA', MARGIN, y);
    y += 3;
    setDraw(C.line);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 9;

    const items = [
      ['Resumo do projeto', 'dados da loja e plataforma utilizada'],
      ['Novos orçamentos', 'como entrar em contato com a Ajuda Ecommerce'],
      ['Boas práticas de segurança', 'recomendações para proteger os acessos'],
      ['Credenciais organizadas', 'todos os logins e senhas por serviço'],
    ];
    items.forEach(([title, desc]) => {
      setFill(C.lime);
      doc.roundedRect(MARGIN, y - 4.2, 3, 3, 0.6, 0.6, 'F');
      font('bold', 10.5);
      setText(C.ink);
      doc.text(title, MARGIN + 7, y);
      const titleW = doc.getTextWidth(title);
      font('normal', 9.5);
      setText(C.slate);
      doc.text(' — ' + desc, MARGIN + 7 + titleW + 1.5, y);
      y += 9;
    });

    y += 12;
    font('bold', 12.5);
    setText(C.ink);
    doc.text('Boas práticas de segurança', MARGIN, y);
    y += 8;
    [
      'Não compartilhe senhas por canais não seguros (e-mail aberto, redes sociais).',
      'Altere as senhas após a entrega, se desejar manter mais controle.',
      'Ative a autenticação em dois fatores (2FA) onde estiver disponível.',
      'Guarde este documento em local seguro — ele contém dados sensíveis.',
    ].forEach((it) => {
      setFill(C.lime);
      doc.roundedRect(MARGIN, y - 3.6, 3, 3, 0.6, 0.6, 'F');
      font('normal', 9.7);
      setText(C.ink);
      doc.splitTextToSize(it, CONTENT_W - 9).forEach((ln, i) => {
        doc.text(ln, MARGIN + 7, y + i * 5.2);
      });
      y += 9;
    });
  };

  // ---------- bloco de informação simples (resumo / suporte) ----------
  const infoBlock = (title, rows, accentColor, headerLabel) => {
    const rowH = 13.5;
    const headH = 11;
    const visibleRows = rows.filter((r) => r[1] && r[1] !== '—');
    if (visibleRows.length === 0) return;
    const h = headH + visibleRows.length * rowH + 5;

    if (y + h > PAGE_H - 26) {
      addPage();
      drawHeader(headerLabel || 'Resumo · Suporte');
      y = 24;
    }

    const yStart = y;
    setFill(C.white);
    doc.roundedRect(MARGIN, y, CONTENT_W, h, 2.5, 2.5, 'F');
    setFill(accentColor);
    doc.roundedRect(MARGIN, y, 2.2, h, 1.1, 1.1, 'F');
    setDraw(C.line);
    doc.setLineWidth(0.25);
    doc.roundedRect(MARGIN, y, CONTENT_W, h, 2.5, 2.5, 'S');

    font('bold', 9.5);
    setText(C.ink);
    doc.text(title, MARGIN + 8, y + 8);
    setDraw(C.line);
    doc.line(MARGIN + 8, y + 10.5, MARGIN + CONTENT_W - 6, y + 10.5);

    let ry = y + headH + 7;
    visibleRows.forEach(([k, v, isUrl]) => {
      font('bold', 7.5);
      setText(C.muted);
      doc.text(k.toUpperCase(), MARGIN + 8, ry);
      if (isUrl) {
        drawLink(truncate(v, 62), MARGIN + 8, ry + 5.2, v.startsWith('http') ? v : 'https://' + v, 10);
      } else {
        font('normal', 10.5);
        setText(C.ink);
        doc.text(v, MARGIN + 8, ry + 5.2);
      }
      ry += rowH;
    });

    y = yStart + h + 7;
  };

  // garante espaço para um título de seção (h1 + algumas linhas seguintes); quebra página se não houver
  const ensureSpace = (h, headerLabel) => {
    if (y + h > PAGE_H - 26) {
      addPage();
      drawHeader(headerLabel || 'Resumo · Suporte');
      y = 24;
    }
  };

  // ---------- PÁGINA 2: resumo + suporte ----------
  const drawResumoContatos = () => {
    addPage();
    drawHeader('Resumo · Suporte');
    y = 32;
    drawSectionHeading(2, 'Resumo e suporte', 'Onde buscar ajuda quando precisar');
    y += 4;

    const ecPlatform = valSelect('ec_platform', 'ec_platform_nome') || '—';
    const erpChoice = valSelect('erp_choice', 'erp_outro_nome') || '—';

    font('bold', 12.5);
    setText(C.ink);
    doc.text('Resumo do projeto', MARGIN, y);
    y += 7;
    infoBlock(
      'DADOS GERAIS',
      [
        ['Plataforma', ecPlatform],
        ['URL da loja', lojaUrl || '—', !!lojaUrl],
        ['Domínio', val('dom_dominio') || '—', !!val('dom_dominio')],
        ['ERP', erpChoice],
        ['Responsável', val('responsavel') || AJUDA.nome],
        ['Data da entrega', new Date().toLocaleDateString('pt-BR')],
      ],
      GROUP_COLOR['E-commerce']
    );

    const hasSuporte = val('ec_suporte_link');
    if (hasSuporte) {
      ensureSpace(7 + 11 + 1 * 13.5 + 5);
      font('bold', 12.5);
      setText(C.ink);
      doc.text('Suporte da plataforma', MARGIN, y);
      y += 7;
      infoBlock(
        `SUPORTE ${ecPlatform.toUpperCase()}`,
        [
          ['Central de ajuda', val('ec_suporte_link'), true],
        ],
        [37, 99, 235]
      );
    }

    ensureSpace(7 + 11 + 3 * 13.5 + 5);
    font('bold', 12.5);
    setText(C.ink);
    doc.text('Ajuda Ecommerce', MARGIN, y);
    y += 7;
    infoBlock(
      'PARA NOVOS ORÇAMENTOS',
      [
        ['WhatsApp', AJUDA.whatsappComercial],
        ['Horário', AJUDA.horario],
        ['Fale com a gente', AJUDA.site, true],
      ],
      C.limeDeep
    );
  };

  // ---------- helpers de medida e desenho dos cards de credenciais ----------
  const ROW_H = 16.5,
    FIELD_H = 14.5,
    HEAD_H = 14,
    PAD_BOTTOM = 7,
    SUB_HEAD_H = 12,
    SUB_PAD = 4.5;

  const rowHasValue = (r) => (Array.isArray(r) ? r.some((f) => f.value) : !!r.value);

  const calcRowsH = (rows) => rows.reduce((acc, r) => acc + (rowHasValue(r) ? (Array.isArray(r) ? ROW_H : FIELD_H) : 0), 0);

  const calcCardH = (rows) => HEAD_H + calcRowsH(rows) + PAD_BOTTOM;

  const calcCompositeH = (sections) => {
    let h = HEAD_H;
    sections.forEach((s) => {
      if (!s.rows.some(rowHasValue)) return;
      h += SUB_HEAD_H + calcRowsH(s.rows) + SUB_PAD;
    });
    return h + 4;
  };

  const drawFieldRow = (row, x0, atY) => {
    if (Array.isArray(row)) {
      if (!row.some((f) => f.value)) return 0;
      row.forEach((field, i) => {
        if (!field.value) return;
        const x = x0 + i * (CONTENT_W / 2 - 5);
        font('bold', 7.3);
        setText(C.muted);
        doc.text(field.label.toUpperCase(), x, atY);
        if (field.value.startsWith('http')) {
          drawLink(truncate(field.value, 36), x, atY + 5.3, field.value, 10);
        } else {
          font('normal', 10.3);
          setText(C.ink);
          doc.text(field.value, x, atY + 5.3);
        }
      });
      return ROW_H;
    }
    if (!row.value) return 0;
    font('bold', 7.3);
    setText(C.muted);
    doc.text(row.label.toUpperCase(), x0, atY);
    font('normal', 10.3);
    setText(C.ink);
    if (row.value.startsWith('http')) {
      drawLink(truncate(row.value, 68), x0, atY + 5.3, row.value, 10);
    } else {
      doc.text(row.value, x0, atY + 5.3);
    }
    return FIELD_H;
  };

  const sectionCard = (title, color, rows) => {
    if (!rows.some(rowHasValue)) return;
    const h = calcCardH(rows);
    const yStart = y;

    setFill(C.white);
    doc.roundedRect(MARGIN, y, CONTENT_W, h, 2.5, 2.5, 'F');
    setFill(color);
    doc.roundedRect(MARGIN, y, 2.4, h, 1.2, 1.2, 'F');
    setDraw(C.line);
    doc.setLineWidth(0.25);
    doc.roundedRect(MARGIN, y, CONTENT_W, h, 2.5, 2.5, 'S');

    // chip de cor + título
    setFill(color);
    doc.circle(MARGIN + 9.5, y + 8.2, 1.5, 'F');
    font('bold', 10.5);
    setText(C.ink);
    doc.text(title, MARGIN + 14, y + 9.3);

    let ry = y + HEAD_H + 4.5;
    rows.forEach((row) => {
      const used = drawFieldRow(row, MARGIN + 8, ry);
      ry += used;
    });

    y = yStart + h + 6;
  };

  const compositeCard = (title, color, sections) => {
    if (!sections.some((s) => s.rows.some(rowHasValue))) return;
    const h = calcCompositeH(sections);
    const yStart = y;

    setFill(C.white);
    doc.roundedRect(MARGIN, y, CONTENT_W, h, 2.5, 2.5, 'F');
    setFill(color);
    doc.roundedRect(MARGIN, y, 2.4, h, 1.2, 1.2, 'F');
    setDraw(C.line);
    doc.setLineWidth(0.25);
    doc.roundedRect(MARGIN, y, CONTENT_W, h, 2.5, 2.5, 'S');

    setFill(color);
    doc.circle(MARGIN + 9.5, y + 8.2, 1.5, 'F');
    font('bold', 10.5);
    setText(C.ink);
    doc.text(title, MARGIN + 14, y + 9.3);

    let ry = y + HEAD_H;
    sections.forEach((s) => {
      if (!s.rows.some(rowHasValue)) return;
      font('bold', 7.5);
      setText(color);
      doc.text(s.title.toUpperCase(), MARGIN + 8, ry + 4);
      setDraw(color);
      doc.setGState(new doc.GState({ opacity: 0.35 }));
      doc.setLineWidth(0.25);
      doc.line(MARGIN + 8, ry + 6, MARGIN + CONTENT_W - 6, ry + 6);
      doc.setGState(new doc.GState({ opacity: 1 }));
      ry += SUB_HEAD_H;
      s.rows.forEach((row) => {
        const used = drawFieldRow(row, MARGIN + 8, ry);
        ry += used;
      });
      ry += SUB_PAD;
    });

    y = yStart + h + 6;
  };

  const drawGroupTitle = (label) => {
    font('bold', 8.3);
    setText(C.slate);
    doc.text(label.toUpperCase(), MARGIN, y + 5.5);
    setDraw(C.line);
    doc.setLineWidth(0.4);
    doc.line(MARGIN + doc.getTextWidth(label.toUpperCase()) + 5, y + 4.5, MARGIN + CONTENT_W, y + 4.5);
    y += 12;
  };

  // ---------- nota/aviso destacado (ex: instruções antes de um card) ----------
  const NOTE_LINE_H = 5;
  const calcNoteH = (text) => {
    font('normal', 9.3);
    const lines = doc.splitTextToSize(text, CONTENT_W - 16);
    return 9 + lines.length * NOTE_LINE_H + 6; // padding interno + linhas + margem inferior
  };
  const drawNoteBox = (text) => {
    font('normal', 9.3);
    const lines = doc.splitTextToSize(text, CONTENT_W - 16);
    const boxH = 9 + lines.length * NOTE_LINE_H;
    setFill([240, 248, 224]);
    doc.roundedRect(MARGIN, y, CONTENT_W, boxH, 2.5, 2.5, 'F');
    setDraw([200, 230, 154]);
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN, y, CONTENT_W, boxH, 2.5, 2.5, 'S');
    font('normal', 9.3);
    setText(C.slate);
    lines.forEach((ln, i) => doc.text(ln, MARGIN + 8, y + 7 + i * NOTE_LINE_H));
    y += boxH + 6;
  };

  // ---------- PÁGINA(S) 3+: credenciais ----------
  const drawCredenciais = () => {
    const blocks = [];

    // Plataforma de E-commerce
    const ecLoginTipo = val('ec_login_tipo') || 'direto';
    const ecRows = [
      { label: 'Plataforma', value: valSelect('ec_platform', 'ec_platform_nome') },
      { label: 'URL / Painel admin', value: val('ec_url') },
    ];
    if (ecLoginTipo === 'parceiros') {
      ecRows.push({ label: 'Acesso', value: 'Loja criada via Painel de Parceiros — login sob responsabilidade do cliente' });
    } else {
      ecRows.push([{ label: 'E-mail / login', value: val('ec_email') }, { label: 'Senha', value: val('ec_senha') }]);
    }
    if (ecRows.some(rowHasValue))
      blocks.push({ group: 'E-commerce', type: 'card', title: 'Plataforma de E-commerce', color: GROUP_COLOR['E-commerce'], rows: ecRows });

    // E-mail Profissional
    const emLoginTipo = val('em_login_tipo') || 'direto';
    const emRows = [
      { label: 'Provedor', value: valSelect('em_provider', 'em_provider_nome') },
    ];
    if (emLoginTipo === 'cliente') {
      if (val('em_email')) emRows.push({ label: 'E-mail', value: val('em_email') });
      emRows.push({ label: 'Observação', value: 'E-mail pré-existente do cliente — credenciais não configuradas pela agência' });
    } else {
      emRows.push([{ label: 'E-mail / login', value: val('em_email') }, { label: 'Senha', value: val('em_senha') }]);
    }
    const emSecs = [{ title: 'Acesso', rows: emRows }];
    const emLink = EMAIL_PLATFORM_LINKS[val('em_provider')];
    if (emRows.some(rowHasValue) && emLink) {
      emSecs.push({ title: 'Acesso rápido', rows: [{ label: emLink.label, value: emLink.url }] });
    }
    if (emRows.some(rowHasValue)) {
      blocks.push({ group: 'E-mail e Domínio', type: 'composite', title: 'E-mail Profissional', color: GROUP_COLOR['E-mail e Domínio'], sections: emSecs });
    }

    const domEmailLogin = val('dom_login') || val('dom_dominio');
    const domLink = DOMAIN_PROVIDER_LINKS[val('dom_provider')];
    const domRows = [
      { label: 'Registradora', value: valSelect('dom_provider', 'dom_provider_nome') },
      { label: 'Domínio', value: val('dom_dominio') },
      [{ label: 'E-mail / login', value: domEmailLogin }, { label: 'Senha', value: val('dom_senha') }],
    ];
    if (domRows.some(rowHasValue) && domLink) {
      domRows.push({ label: domLink.label, value: domLink.url });
    }
    if (domRows.some(rowHasValue))
      blocks.push({ group: 'E-mail e Domínio', type: 'card', title: 'Domínio', color: GROUP_COLOR['E-mail e Domínio'], rows: domRows });

    const envioSecs = [
      { title: 'Melhor Envio', rows: [[{ label: 'E-mail / login', value: val('me_email') }, { label: 'Senha', value: val('me_senha') }]] },
      { title: 'Correios', rows: [[{ label: 'Login / CNPJ', value: val('cor_login') }, { label: 'Senha', value: val('cor_senha') }]] },
      {
        title: val('out_nome') || 'Outro transportador',
        rows: [[{ label: 'E-mail / login', value: val('out_login') }, { label: 'Senha', value: val('out_senha') }]],
      },
    ];
    if (envioSecs.some((s) => s.rows.some(rowHasValue)))
      blocks.push({ group: 'Envio', type: 'composite', title: 'Meios de Envio', color: GROUP_COLOR.Envio, sections: envioSecs });

    // Redes Sociais — nova seção (Facebook opcional + Instagram)
    const socialSecs = [
      { title: 'Facebook', rows: [[{ label: 'E-mail / login', value: val('fb_email') }, { label: 'Senha', value: val('fb_senha') }]] },
      { title: 'Instagram', rows: [{ label: 'Usuário', value: val('ig_usuario') }] },
    ];
    if (socialSecs.some((s) => s.rows.some(rowHasValue)))
      blocks.push({ group: 'Redes Sociais', type: 'composite', title: 'Redes Sociais', color: GROUP_COLOR['Redes Sociais'], sections: socialSecs });

    const ggSecs = [];
    if (val('gg_email') || val('gg_senha')) {
      ggSecs.push({ title: 'Acesso', rows: [[{ label: 'E-mail / login', value: val('gg_email') }, { label: 'Senha', value: val('gg_senha') }]] });
      ggSecs.push({
        title: 'Ferramentas',
        rows: [
          [{ label: 'Google Merchant Center', value: 'https://merchants.google.com' }, { label: 'Google Analytics', value: 'https://analytics.google.com' }],
          [{ label: 'Search Console', value: 'https://search.google.com/search-console' }, { label: 'Google Ads', value: 'https://ads.google.com' }],
        ],
      });
    }
    if (ggSecs.some((s) => s.rows.some(rowHasValue))) {
      blocks.push({
        group: 'Google',
        type: 'note+composite',
        text: 'Deixamos o ambiente todo pronto para que você precise somente criar as campanhas no Google Ads! Basta você acessar sua conta Google e clicar nos links abaixo que você já conseguirá acessar a todos esses apps!',
        title: 'Conta Google',
        color: GROUP_COLOR.Google,
        sections: ggSecs,
      });
    }

    const erpSecs = [];
    if (val('erp_choice')) {
      erpSecs.push({
        title: valSelect('erp_choice', 'erp_outro_nome'),
        rows: [[{ label: 'E-mail / login', value: val('erp_login') }, { label: 'Senha', value: val('erp_senha') }]],
      });
    }
    if (erpSecs.some((s) => s.rows.some(rowHasValue)))
      blocks.push({ group: 'ERP', type: 'composite', title: 'ERP', color: GROUP_COLOR.ERP, sections: erpSecs });

    const mktpSecs = [
      { title: 'Amazon', rows: [[{ label: 'E-mail / login', value: val('amz_login') }, { label: 'Senha', value: val('amz_senha') }]] },
      { title: 'Shopee', rows: [[{ label: 'E-mail / login', value: val('shp_login') }, { label: 'Senha', value: val('shp_senha') }]] },
      { title: 'Mercado Livre', rows: [[{ label: 'E-mail / login', value: val('ml_login') }, { label: 'Senha', value: val('ml_senha') }]] },
      { title: 'TikTok Shop', rows: [[{ label: 'E-mail / login', value: val('tkt_login') }, { label: 'Senha', value: val('tkt_senha') }]] },
    ];
    if (val('mkp_outro_login') || val('mkp_outro_senha'))
      mktpSecs.push({
        title: val('mkp_outro_nome') || 'Outro marketplace',
        rows: [[{ label: 'E-mail / login', value: val('mkp_outro_login') }, { label: 'Senha', value: val('mkp_outro_senha') }]],
      });
    if (mktpSecs.some((s) => s.rows.some(rowHasValue)))
      blocks.push({ group: 'Marketplace', type: 'composite', title: 'Marketplace', color: GROUP_COLOR.Marketplace, sections: mktpSecs });

    if (blocks.length === 0) return;

    const PAGE_BOTTOM = PAGE_H - 28;

    // Seção 03 sempre começa em página nova
    addPage();
    drawHeader('Credenciais e Acessos');
    y = 32;
    drawSectionHeading(3, 'Credenciais', 'Acessos organizados por serviço — guarde com cuidado');
    y += 5;

    const needsNewPage = (h) => y + h > PAGE_BOTTOM;
    const continuation = () => {
      addPage();
      drawHeader('Credenciais e Acessos · continuação');
      y = 30;
    };

    let prevGroup = null;
    blocks.forEach((b) => {
      const blockH = b.type === 'card' ? calcCardH(b.rows)
        : b.type === 'note' ? calcNoteH(b.text)
        : b.type === 'note+composite' ? calcNoteH(b.text) + calcCompositeH(b.sections)
        : calcCompositeH(b.sections);
      const isNewGroup = b.group !== prevGroup;
      const groupTitleH = isNewGroup ? 12 : 0;
      const totalH = groupTitleH + blockH;

      if (needsNewPage(totalH)) {
        continuation();
        prevGroup = null;
      } else if (isNewGroup && prevGroup !== null) {
        y += 6; // pequeno espaço entre grupos quando cabe na mesma página
      }

      if (b.group !== prevGroup) {
        if (prevGroup !== null) y += 8;
        drawGroupTitle(b.group);
        prevGroup = b.group;
      }

      if (b.type === 'card') sectionCard(b.title, b.color, b.rows);
      else if (b.type === 'note') drawNoteBox(b.text);
      else if (b.type === 'note+composite') { drawNoteBox(b.text); compositeCard(b.title, b.color, b.sections); }
      else compositeCard(b.title, b.color, b.sections);
    });
  };

  // ---------- montagem final ----------
  drawCover();
  drawMensagem();
  drawResumoContatos();
  drawCredenciais();

  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 2; p <= totalPages; p++) {
    doc.setPage(p);
    setDraw(C.line);
    doc.setLineWidth(0.2);
    doc.line(MARGIN, PAGE_H - 14, PAGE_W - MARGIN, PAGE_H - 14);
    font('normal', 7.3);
    setText(C.muted);
    doc.text(`${AJUDA.nome}  ·  Documento Confidencial  ·  ${clientName}`, MARGIN, PAGE_H - 8.5);
    doc.text(`Página ${p} de ${totalPages}`, PAGE_W - MARGIN, PAGE_H - 8.5, { align: 'right' });
  }

  const safeName = clientName.replace(/\s+/g, '-').toLowerCase();
  return {
    save: () => doc.save(`documento-entrega-${safeName}.pdf`),
  };
}
