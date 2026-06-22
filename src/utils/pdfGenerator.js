import { AJUDA, SUPORTE_PLATAFORMA } from '../data/constants';
import { LOGO_B64 } from '../data/logoBase64';
import { resolveSelectOrOther } from './helpers';

const COLORS = {
  navy: [15, 40, 80],
  accent: [160, 232, 0],
  gold: [217, 165, 50],
  primary: [37, 99, 235],
  dark: [30, 41, 59],
  muted: [100, 116, 139],
  border: [226, 232, 240],
  white: [255, 255, 255],
  cardBdr: [220, 225, 232],
  sections: {
    ecommerce: [37, 99, 235],
    email: [124, 58, 237],
    envio: [8, 145, 178],
    dominio: [5, 150, 105],
    facebook: [24, 119, 242],
    google: [234, 67, 53],
    erp: [217, 119, 6],
    marketplace: [124, 58, 237],
  },
};

const ROW_H = 17,
  FIELD_H = 15,
  ARROW_H = 21,
  CARD_TITLE_H = 18,
  CARD_PAD = 8,
  CARD_GAP = 5,
  TOPIC_H = 14,
  TOPIC_GAP = 5,
  GROUP_GAP = 8,
  SUB_H = 10,
  SUB_PAD = 4;

/**
 * Gera o PDF "Documento de Entrega" a partir dos valores do formulário.
 * @param {object} form - valores planos do formulário (ver pdfFormFields.js)
 * @param {Function} JsPDFCtor - construtor jsPDF (window.jspdf.jsPDF)
 * @returns {{ save: () => void }}
 */
export function generateDeliveryPdf(form, JsPDFCtor) {
  const doc = new JsPDFCtor({ unit: 'mm', format: 'a4' });
  const C = COLORS;

  const val = (id) => (form[id] || '').toString().trim();
  const valSelect = (selectId, otherId) => resolveSelectOrOther(form[selectId], form[otherId]);

  const clientName = val('clientName') || 'Cliente';
  const lojaUrl = val('lojaUrl');
  const pageW = 210,
    pageH = 297,
    margin = 18,
    contentW = pageW - margin * 2;
  let y = 0;

  const addPage = () => {
    doc.addPage();
    y = 20;
  };
  const checkY = (n = 20) => {
    if (y + n > pageH - 20) addPage();
  };
  const drawLink = (text, x, yPos, url, fs) => {
    doc.setFontSize(fs || 10.5);
    doc.setTextColor(37, 99, 235);
    doc.textWithLink(text, x, yPos, { url });
  };

  const drawTopBand = () => {
    doc.setFillColor(...C.navy);
    doc.rect(0, 0, pageW, 18, 'F');
    doc.setFillColor(...C.accent);
    doc.rect(0, 16, pageW, 2, 'F');
    doc.addImage(LOGO_B64, 'PNG', margin, -1, 22, 22);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(180, 200, 230);
    doc.text(clientName, pageW - margin, 11, { align: 'right' });
  };

  const drawCover = () => {
    doc.setFillColor(...C.navy);
    doc.rect(0, 0, pageW, pageH, 'F');
    doc.setFillColor(...C.accent);
    doc.rect(0, 76, pageW, 2, 'F');
    doc.addImage(LOGO_B64, 'PNG', margin, 22, 70, 70);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...C.accent);
    doc.text('DOCUMENTO DE ENTREGA', margin, 130);
    const elw = doc.getTextWidth('DOCUMENTO DE ENTREGA');
    doc.setDrawColor(...C.accent);
    doc.setLineWidth(0.5);
    doc.line(margin, 132, margin + elw, 132);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(34);
    doc.setTextColor(...C.white);
    const lines = doc.splitTextToSize(clientName, pageW - margin * 2);
    let ny = 152;
    lines.slice(0, 2).forEach((ln) => {
      doc.text(ln, margin, ny);
      ny += 14;
    });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(180, 200, 230);
    doc.text('Kit de finalização e acessos da loja', margin, ny + 6);
    if (lojaUrl) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...C.accent);
      doc.text(lojaUrl, margin, ny + 16);
    }
    doc.setDrawColor(...C.accent);
    doc.setLineWidth(0.3);
    doc.line(margin, pageH - 55, margin + 40, pageH - 55);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...C.accent);
    doc.text('PROJETO CONCLUÍDO EM', margin, pageH - 48);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    doc.setTextColor(...C.white);
    doc.text(new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }), margin, pageH - 40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...C.accent);
    doc.text('ENTREGUE POR', pageW - margin, pageH - 48, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    doc.setTextColor(...C.white);
    doc.text(AJUDA.nome, pageW - margin, pageH - 40, { align: 'right' });
  };

  const drawMensagem = () => {
    addPage();
    drawTopBand();
    y = 40;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...C.muted);
    doc.text('01  ·  ENCERRAMENTO', margin, y);
    y += 14;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.setTextColor(...C.dark);
    doc.text('Seu projeto está', margin, y);
    doc.text('concluído.', margin, y + 12);
    y += 32;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11.5);
    doc.setTextColor(...C.dark);
    const intro = 'Obrigado pela confiança em nosso trabalho. Sua loja foi configurada e está pronta para operação.';
    doc.splitTextToSize(intro, contentW).forEach((ln) => {
      doc.text(ln, margin, y);
      y += 6.5;
    });
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(...C.muted);
    doc.text('Neste documento você encontrará:', margin, y);
    y += 10;
    [
      'Resumo do projeto e dados da loja',
      'Canais de suporte (Ajuda Ecommerce e plataforma)',
      'Orientações de segurança',
      'Credenciais e acessos de cada serviço',
    ].forEach((it) => {
      doc.setFillColor(...C.accent);
      doc.circle(margin + 2, y - 1.5, 1.5, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      doc.setTextColor(...C.dark);
      doc.text(it, margin + 8, y);
      y += 8;
    });
    y += 10;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10.5);
    doc.setTextColor(...C.muted);
    doc.text('Estamos à disposição para qualquer necessidade.', margin, y);
  };

  const drawInfoBlock = (title, rows, accentColor) => {
    const labelH = 10,
      rowH = 14,
      blockH = labelH + rows.length * rowH + 6;
    const yStart = y;
    const col = accentColor || C.accent;
    doc.setFillColor(...col);
    doc.roundedRect(margin, y, contentW, blockH, 3, 3, 'F');
    doc.setFillColor(...C.white);
    doc.rect(margin, y + 3, contentW, blockH - 3, 'F');
    doc.roundedRect(margin, y + blockH - 6, contentW, 6, 3, 3, 'F');
    doc.setDrawColor(...C.cardBdr);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, contentW, blockH, 3, 3, 'S');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...C.muted);
    doc.text(title.toUpperCase(), margin + 7, y + 7);
    const tw = doc.getTextWidth(title.toUpperCase());
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.2);
    doc.line(margin + 7 + tw + 4, y + 6, margin + contentW - 7, y + 6);
    let ry = y + labelH + 5;
    rows.forEach(([k, v, isUrl]) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(...C.muted);
      doc.text(k.toUpperCase(), margin + 7, ry);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      if (isUrl && v && v !== '—') {
        doc.setTextColor(37, 99, 235);
        doc.textWithLink(v, margin + 7, ry + 5, { url: v.startsWith('http') ? v : 'https://' + v });
      } else {
        doc.setTextColor(...C.dark);
        doc.text(v || '—', margin + 7, ry + 5);
      }
      ry += rowH;
    });
    y = yStart + blockH;
  };

  const drawResumoContatos = () => {
    addPage();
    drawTopBand();
    y = 32;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...C.muted);
    doc.text('02  ·  RESUMO E SUPORTE', margin, y);
    y += 12;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(...C.dark);
    doc.text('Resumo do projeto', margin, y);
    y += 10;

    const ecPlatform = valSelect('ec_platform', 'ec_platform_nome') || '—';
    const erpChoice = valSelect('erp_choice', 'erp_outro_nome') || '—';
    const dateNow = new Date().toLocaleDateString('pt-BR');

    const resumoRows = [
      ['Plataforma', ecPlatform, false],
      ['URL da Loja', lojaUrl || '—', !!lojaUrl],
    ];
    const domDom = val('dom_dominio');
    if (domDom) resumoRows.push(['Domínio', domDom, true]);
    resumoRows.push(
      ['ERP', erpChoice, false],
      ['Data da entrega', dateNow, false],
      ['Responsável pelo projeto', val('responsavel') || AJUDA.nome, false]
    );

    checkY(10 + resumoRows.length * 14 + 6);
    drawInfoBlock('Resumo do projeto', resumoRows);
    y += 10;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(...C.dark);
    doc.text('Contatos de suporte', margin, y);
    y += 10;

    const platSup = SUPORTE_PLATAFORMA[ecPlatform];
    checkY(10 + 3 * 14 + 6);
    if (platSup) {
      drawInfoBlock(
        'Suporte ' + ecPlatform + ' (plataforma)',
        [
          ['Canal de atendimento', platSup.canal, false],
          ['Central de ajuda', platSup.site, true],
          ['Horário', platSup.horario, false],
        ],
        [37, 99, 235]
      );
    } else {
      drawInfoBlock(
        'Suporte da plataforma',
        [
          ['Canal de atendimento', '—', false],
          ['Central de ajuda', '—', false],
          ['Horário', '—', false],
        ],
        [37, 99, 235]
      );
    }
    y += 6;

    checkY(10 + 4 * 14 + 6 + 10);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...C.muted);
    doc.text('AJUDA ECOMMERCE', margin, y + 6);
    const ajLw = doc.getTextWidth('AJUDA ECOMMERCE');
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.3);
    doc.line(margin + ajLw + 5, y + 5, margin + contentW, y + 5);
    y += 10;

    drawInfoBlock(
      'Para novos orçamentos',
      [
        ['WhatsApp', AJUDA.whatsappComercial, false],
        ['E-mail', AJUDA.emailComercial, false],
        ['Horário', AJUDA.horario, false],
        ['Site', AJUDA.site, true],
      ],
      C.accent
    );
    y += 10;

    checkY(60);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...C.dark);
    doc.text('Orientações importantes', margin, y);
    y += 8;
    [
      'Não compartilhe senhas por canais não seguros.',
      'Altere as senhas após a entrega caso deseje.',
      'Ative autenticação em dois fatores onde possível.',
      'Mantenha este documento em local seguro.',
    ].forEach((it) => {
      doc.setFillColor(...C.accent);
      doc.circle(margin + 2, y - 1.2, 1.3, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...C.dark);
      doc.text(it, margin + 7, y);
      y += 7;
    });
  };

  const calcFieldH = (r) => {
    if (Array.isArray(r)) return r.some((f) => f.value) ? ROW_H : 0;
    if (!r.value) return 0;
    return r.value.indexOf('  ->  ') !== -1 ? ARROW_H : FIELD_H;
  };
  const calcCardH = (rows) => {
    let h = CARD_TITLE_H;
    rows.forEach((r) => {
      h += calcFieldH(r);
    });
    return h + CARD_PAD + CARD_GAP;
  };
  const calcCompositeH = (sections) => {
    let h = CARD_TITLE_H;
    sections.forEach(({ rows }) => {
      if (!rows.some((r) => (Array.isArray(r) ? r.some((f) => f.value) : r.value))) return;
      h += SUB_H;
      rows.forEach((r) => {
        h += calcFieldH(r);
      });
      h += SUB_PAD;
    });
    return h + CARD_GAP;
  };

  const sectionTitle = (label) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...C.dark);
    doc.text(label.toUpperCase(), margin, y + 7);
    const lw = doc.getTextWidth(label.toUpperCase());
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.4);
    doc.line(margin + lw + 5, y + 6, margin + contentW, y + 6);
    y += TOPIC_H;
  };

  const sectionCard = (title, color, rows) => {
    if (!rows.some((r) => (Array.isArray(r) ? r.some((f) => f.value) : r.value))) return;
    const h = calcCardH(rows);
    const yStart = y;
    doc.setFillColor(...color);
    doc.roundedRect(margin, y, contentW, h, 3, 3, 'F');
    doc.setFillColor(...C.white);
    doc.rect(margin + 4, y, contentW - 4, h, 'F');
    doc.roundedRect(margin + contentW - 6, y, 6, h, 3, 3, 'F');
    doc.setDrawColor(...C.cardBdr);
    doc.setLineWidth(0.25);
    doc.roundedRect(margin, y, contentW, h, 3, 3, 'S');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...C.dark);
    doc.text(title, margin + 9, y + 10);
    let ry = y + CARD_TITLE_H + 2;
    rows.forEach((row) => {
      if (Array.isArray(row)) {
        row.forEach((field, i) => {
          if (!field.value) return;
          const x = margin + 9 + i * (contentW / 2 - 4);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.setTextColor(...C.muted);
          doc.text(field.label.toUpperCase(), x, ry);
          if (field.value.startsWith('http')) {
            drawLink(field.value.length > 38 ? field.value.substring(0, 35) + '...' : field.value, x, ry + 6, field.value, 10.5);
          } else {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10.5);
            doc.setTextColor(...C.dark);
            doc.text(field.value, x, ry + 6);
          }
        });
        if (row.some((f) => f.value)) ry += ROW_H;
      } else {
        if (!row.value) return;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...C.muted);
        doc.text(row.label.toUpperCase(), margin + 9, ry);
        const arrowIdx = row.value.indexOf('  ->  ');
        if (arrowIdx !== -1) {
          const lbl2 = row.value.substring(0, arrowIdx),
            link = row.value.substring(arrowIdx + 6);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10.5);
          doc.setTextColor(...C.dark);
          doc.text(lbl2, margin + 9, ry + 6);
          drawLink(link.length > 58 ? link.substring(0, 55) + '...' : link, margin + 9, ry + 13, link, 8.5);
          ry += ARROW_H;
        } else if (row.value.startsWith('http')) {
          drawLink(row.value.length > 68 ? row.value.substring(0, 65) + '...' : row.value, margin + 9, ry + 6, row.value, 10.5);
          ry += FIELD_H;
        } else {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10.5);
          doc.setTextColor(...C.dark);
          doc.text(row.value, margin + 9, ry + 6);
          ry += FIELD_H;
        }
      }
    });
    y = yStart + h;
  };

  const subSection = (title, color, rows) => {
    if (!rows.some((r) => (Array.isArray(r) ? r.some((f) => f.value) : r.value))) return;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...color);
    doc.text(('-- ' + title).toUpperCase(), margin + 9, y + 5);
    doc.setDrawColor(...color);
    doc.setLineWidth(0.2);
    doc.line(margin + 9, y + 6.5, margin + contentW - 4, y + 6.5);
    y += SUB_H;
    rows.forEach((row) => {
      if (Array.isArray(row)) {
        row.forEach((field, i) => {
          if (!field.value) return;
          const x = margin + 9 + i * (contentW / 2 - 4);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.setTextColor(...C.muted);
          doc.text(field.label.toUpperCase(), x, y);
          if (field.value.startsWith('http')) {
            drawLink(field.value.length > 38 ? field.value.substring(0, 35) + '...' : field.value, x, y + 6, field.value, 10.5);
          } else {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10.5);
            doc.setTextColor(...C.dark);
            doc.text(field.value, x, y + 6);
          }
        });
        if (row.some((f) => f.value)) y += ROW_H;
      } else {
        if (!row.value) return;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...C.muted);
        doc.text(row.label.toUpperCase(), margin + 9, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10.5);
        doc.setTextColor(...C.dark);
        doc.text(row.value, margin + 9, y + 6);
        y += FIELD_H;
      }
    });
    y += SUB_PAD;
  };

  const compositeCard = (title, color, sections) => {
    if (!sections.some((s) => s.rows.some((r) => (Array.isArray(r) ? r.some((f) => f.value) : r.value)))) return;
    const h = calcCompositeH(sections);
    const yStart = y;
    doc.setFillColor(...color);
    doc.roundedRect(margin, y, contentW, h, 3, 3, 'F');
    doc.setFillColor(...C.white);
    doc.rect(margin + 4, y, contentW - 4, h, 'F');
    doc.roundedRect(margin + contentW - 6, y, 6, h, 3, 3, 'F');
    doc.setDrawColor(...C.cardBdr);
    doc.setLineWidth(0.25);
    doc.roundedRect(margin, y, contentW, h, 3, 3, 'S');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...C.dark);
    doc.text(title, margin + 9, y + 10);
    y += CARD_TITLE_H;
    sections.forEach((s) => subSection(s.title, color, s.rows));
    y = yStart + h;
  };

  const drawCredenciais = () => {
    const blocks = [];
    const ecRows = [
      { label: 'Plataforma', value: valSelect('ec_platform', 'ec_platform_nome') },
      { label: 'URL / Painel Admin', value: val('ec_url') },
      [{ label: 'E-mail / Login', value: val('ec_email') }, { label: 'Senha', value: val('ec_senha') }],
    ];
    if (ecRows.some((r) => (Array.isArray(r) ? r.some((f) => f.value) : r.value)))
      blocks.push({ group: 'E-commerce', type: 'card', title: 'Plataforma de E-commerce', color: C.sections.ecommerce, rows: ecRows });

    const emRows = [
      { label: 'Provedor', value: valSelect('em_provider', 'em_provider_nome') },
      [{ label: 'E-mail / Login', value: val('em_email') }, { label: 'Senha', value: val('em_senha') }],
    ];
    if (emRows.some((r) => (Array.isArray(r) ? r.some((f) => f.value) : r.value)))
      blocks.push({ group: 'E-mail e Domínio', type: 'card', title: 'E-mail Profissional', color: C.sections.email, rows: emRows });

    const domEmailLogin = val('dom_login') || val('dom_dominio');
    const domRows = [
      { label: 'Registradora', value: valSelect('dom_provider', 'dom_provider_nome') },
      { label: 'Domínio', value: val('dom_dominio') },
      [{ label: 'E-mail / Login', value: domEmailLogin }, { label: 'Senha', value: val('dom_senha') }],
    ];
    if (domRows.some((r) => (Array.isArray(r) ? r.some((f) => f.value) : r.value)))
      blocks.push({ group: 'E-mail e Domínio', type: 'card', title: 'Domínio', color: C.sections.dominio, rows: domRows });

    const envioSecs = [
      { title: 'Melhor Envio', rows: [[{ label: 'E-mail / Login', value: val('me_email') }, { label: 'Senha', value: val('me_senha') }]] },
      { title: 'Correios', rows: [[{ label: 'Login / CNPJ', value: val('cor_login') }, { label: 'Senha', value: val('cor_senha') }]] },
      {
        title: val('out_nome') || 'Outro Transportador',
        rows: [[{ label: 'E-mail / Login', value: val('out_login') }], [{ label: 'Senha', value: val('out_senha') }]],
      },
    ];
    if (envioSecs.some((s) => s.rows.some((r) => (Array.isArray(r) ? r.some((f) => f.value) : r.value))))
      blocks.push({ group: 'Envio', type: 'composite', title: 'Meios de Envio', color: C.sections.envio, sections: envioSecs });

    const ggSecs = [];
    if (val('gg_email') || val('gg_senha')) {
      ggSecs.push({ title: 'Acesso', rows: [[{ label: 'E-mail / Login', value: val('gg_email') }, { label: 'Senha', value: val('gg_senha') }]] });
      ggSecs.push({
        title: 'Ferramentas',
        rows: [
          [{ label: 'Google Ads', value: 'https://ads.google.com' }, { label: 'Google Analytics', value: 'https://analytics.google.com' }],
          [{ label: 'Search Console', value: 'https://search.google.com/search-console' }, { label: 'Tag Manager', value: 'https://tagmanager.google.com' }],
        ],
      });
    }
    if (ggSecs.some((s) => s.rows.some((r) => (Array.isArray(r) ? r.some((f) => f.value) : r.value))))
      blocks.push({ group: 'Google', type: 'composite', title: 'Conta Google', color: C.sections.google, sections: ggSecs });

    const erpSecs = [];
    if (val('erp_choice')) {
      const erpTitle = valSelect('erp_choice', 'erp_outro_nome');
      erpSecs.push({ title: erpTitle, rows: [[{ label: 'E-mail / Login', value: val('erp_login') }, { label: 'Senha', value: val('erp_senha') }]] });
    }
    if (erpSecs.some((s) => s.rows.some((r) => (Array.isArray(r) ? r.some((f) => f.value) : r.value))))
      blocks.push({ group: 'ERP', type: 'composite', title: 'ERP', color: C.sections.erp, sections: erpSecs });

    const mktpSecs = [
      { title: 'Amazon', rows: [[{ label: 'E-mail / Login', value: val('amz_login') }, { label: 'Senha', value: val('amz_senha') }]] },
      { title: 'Shopee', rows: [[{ label: 'E-mail / Login', value: val('shp_login') }, { label: 'Senha', value: val('shp_senha') }]] },
      { title: 'Mercado Livre', rows: [[{ label: 'E-mail / Login', value: val('ml_login') }, { label: 'Senha', value: val('ml_senha') }]] },
      { title: 'TikTok Shop', rows: [[{ label: 'E-mail / Login', value: val('tkt_login') }, { label: 'Senha', value: val('tkt_senha') }]] },
    ];
    if (val('mkp_outro_login') || val('mkp_outro_senha'))
      mktpSecs.push({
        title: val('mkp_outro_nome') || 'Outro Marketplace',
        rows: [[{ label: 'E-mail / Login', value: val('mkp_outro_login') }, { label: 'Senha', value: val('mkp_outro_senha') }]],
      });
    if (mktpSecs.some((s) => s.rows.some((r) => (Array.isArray(r) ? r.some((f) => f.value) : r.value))))
      blocks.push({ group: 'Marketplace', type: 'composite', title: 'Marketplace', color: C.sections.marketplace, sections: mktpSecs });

    if (blocks.length === 0) return;

    addPage();
    drawTopBand();
    y = 32;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...C.muted);
    doc.text('03  ·  CREDENCIAIS E ACESSOS', margin, y);
    y += 12;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(...C.dark);
    doc.text('Credenciais', margin, y);
    y += 12;

    const PAGE_BOTTOM = pageH - 30;
    const needsNewPage = (h) => y + h > PAGE_BOTTOM;
    const credContinuation = () => {
      addPage();
      drawTopBand();
      y = 32;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...C.muted);
      doc.text('03  ·  CREDENCIAIS E ACESSOS  (continuação)', margin, y);
      y += 12;
    };

    let prevGroup = null;
    blocks.forEach((b) => {
      const cardH = b.type === 'card' ? calcCardH(b.rows) : calcCompositeH(b.sections);
      const groupH = b.group !== prevGroup ? (prevGroup !== null ? GROUP_GAP : 0) + TOPIC_H + TOPIC_GAP : 0;
      const totalH = groupH + cardH;

      if (needsNewPage(totalH)) {
        credContinuation();
        prevGroup = null;
      }

      if (b.group !== prevGroup) {
        if (prevGroup !== null) y += GROUP_GAP;
        sectionTitle(b.group);
        y += TOPIC_GAP;
        prevGroup = b.group;
      }

      if (b.type === 'card') sectionCard(b.title, b.color, b.rows);
      else compositeCard(b.title, b.color, b.sections);
    });
  };

  drawCover();
  drawMensagem();
  drawResumoContatos();
  drawCredenciais();

  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 2; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.2);
    doc.line(margin, pageH - 15, pageW - margin, pageH - 15);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...C.muted);
    doc.text(AJUDA.nome + '  ·  Documento Confidencial  ·  ' + clientName, margin, pageH - 9);
    doc.text('Página ' + p + ' de ' + totalPages, pageW - margin, pageH - 9, { align: 'right' });
  }

  const safeName = clientName.replace(/\s+/g, '-').toLowerCase();
  return {
    save: () => doc.save('documento-entrega-' + safeName + '.pdf'),
  };
}
