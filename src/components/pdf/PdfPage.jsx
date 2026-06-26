import { useState } from 'react';
import CollapsibleCard from './CollapsibleCard';
import { FieldGroup, TextInput, SelectInput, FieldRow } from '../common/FormFields';
import { usePdfForm } from '../../hooks/usePdfForm';
import { useJsPdf } from '../../hooks/useJsPdf';
import { generateDeliveryPdf } from '../../utils/pdfGenerator';

const PLATFORM_SUPPORT = {
  Nuvemshop: {
    canal: 'Chat, e-mail e WhatsApp',
    link: 'https://atendimento.nuvemshop.com.br/pt_BR/contato/como-entrar-em-contato-com-a-nuvemshop',
    horario: '24/7',
  },
  Shopify: {
    canal: 'Chat, e-mail e telefone',
    link: 'https://help.shopify.com/pt-BR/manual/your-account/contact-shopify-support',
    horario: '24/7',
  },
  VTEX: {
    canal: 'Portal de suporte VTEX',
    link: 'https://help.vtex.com',
    horario: 'Seg-Sex, 9h-18h',
  },
  WooCommerce: {
    canal: 'Fórum e central de ajuda',
    link: 'https://woocommerce.com/contact-us/',
    horario: 'Documentação 24/7',
  },
  'Loja Integrada': {
    canal: 'Chat, WhatsApp e central de ajuda',
    link: 'https://ajuda.lojaintegrada.com.br/pt-BR/articles/5767723-canais-de-atendimento-da-loja-integrada',
    horario: 'Seg-Sex, 9h-18h',
  },
  Tray: {
    canal: 'Chat e central de ajuda',
    link: 'https://basedeconhecimento.tray.com.br/hc/pt-br/articles/6743727654171-Como-entrar-em-contato-com-o-atendimento-da-Tray',
    horario: 'Seg-Sex, 9h-18h',
  },
};

const EMAIL_PLATFORM_LINKS = {
  'Google Workspace': { label: 'Google Workspace (Gmail)', url: 'https://mail.google.com' },
  'Microsoft 365':    { label: 'Microsoft 365 (Outlook)',  url: 'https://outlook.office.com' },
  'Zoho Mail':        { label: 'Zoho Mail',                url: 'https://mail.zoho.com' },
  'Titan Mail':       { label: 'Titan Mail',               url: 'https://app.titan.email' },
};

const DOMAIN_PROVIDER_LINKS = {
  'Registro.br': { label: 'Painel Registro.br', url: 'https://registro.br' },
  GoDaddy:       { label: 'Painel GoDaddy',     url: 'https://dcc.godaddy.com' },
  Cloudflare:    { label: 'Painel Cloudflare',  url: 'https://dash.cloudflare.com' },
  Hostinger:     { label: 'Painel Hostinger',   url: 'https://hpanel.hostinger.com' },
  Locaweb:       { label: 'Painel Locaweb',     url: 'https://painel.locaweb.com.br' },
  HostGator:     { label: 'Painel HostGator',   url: 'https://cpanel.hostgator.com.br' },
};

/* ── primitivos de layout ─────────────────────────────────── */

function Row({ children }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>;
}

// Espaço padrão entre blocos dentro de um card
function Sp() { return <div style={{ height: 12 }} />; }
// Espaço menor (dentro de seções contíguas)
function SpSm() { return <div style={{ height: 8 }} />; }

function Divider({ label }) {
  return (
    <div className="flex items-center gap-2" style={{ margin: '14px 0 10px' }}>
      <div style={{ width: 3, height: 12, borderRadius: 99, background: '#A0E800', flexShrink: 0 }} />
      <span style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4A6A85' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: '#E8EEF4' }} />
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3" style={{ margin: '6px 0 2px' }}>
      <div style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', padding: '4px 10px', borderRadius: 6, background: '#002B4D', color: '#A0E800', flexShrink: 0 }}>
        {children}
      </div>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, #D6E4EF, transparent)' }} />
    </div>
  );
}

function QuickLink({ href, label }) {
  return (
    <a href={href} target="_blank" rel="noreferrer"
      className="inline-flex items-center gap-1.5 transition-colors"
      style={{ fontSize: 12, fontWeight: 600, color: '#1A6AA8', textDecoration: 'none' }}
      onMouseOver={e => e.currentTarget.style.color = '#004070'}
      onMouseOut={e => e.currentTarget.style.color = '#1A6AA8'}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
      {label}
    </a>
  );
}

function OutroField({ visible, label, value, onChange, placeholder }) {
  if (!visible) return null;
  return (
    <>
      <SpSm />
      <FieldGroup label={label}>
        <TextInput value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      </FieldGroup>
    </>
  );
}

function SupportBadge({ platform }) {
  const s = PLATFORM_SUPPORT[platform];
  if (!s) return null;
  return (
    <div style={{ background: '#F0F8FF', border: '1px solid #C0D8F0', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
      <svg style={{ flexShrink: 0 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A6AA8" strokeWidth="2.5">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
      </svg>
      <span style={{ fontSize: 12, color: '#002B4D', flex: 1 }}>
        <strong>{platform}</strong> — link de suporte detectado automaticamente
      </span>
      <QuickLink href={s.link} label="Ver →" />
    </div>
  );
}

/* ── componente principal ─────────────────────────────────── */

export default function PdfPage({ showToast }) {
  const { form, setField, clearAll } = usePdfForm();
  const { getJsPDF } = useJsPdf();
  const [generating, setGenerating] = useState(false);

  const ps = PLATFORM_SUPPORT[form.ec_platform];

  const handleClear = () => {
    if (!confirm('Limpar todos os campos preenchidos?')) return;
    clearAll();
    showToast('Formulário limpo');
  };

  const handleGenerate = async () => {
    if (!form.clientName.trim()) { alert('Informe o nome do cliente/loja antes de gerar o documento.'); return; }
    setGenerating(true);
    try {
      const JsPDF = await getJsPDF();
      // injeta suporte da plataforma automaticamente se campos estiverem vazios
      const enriched = { ...form };
      if (ps && !enriched.ec_suporte_link) enriched.ec_suporte_link = ps.link;
      const pdf = generateDeliveryPdf(enriched, JsPDF);
      pdf.save();
      showToast('Documento de entrega gerado!');
    } catch (err) {
      console.error(err);
      alert('Não foi possível gerar o PDF. Verifique sua conexão e tente novamente.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 24px 96px', display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Cabeçalho */}
      <div style={{ marginBottom: 4 }}>
        <h1 style={{ fontSize: 20, fontWeight: 900, color: '#002B4D', margin: 0, letterSpacing: '-0.02em' }}>Documento de Entrega</h1>
        <p style={{ fontSize: 13, color: '#6B8FAA', margin: '4px 0 0' }}>Preencha os dados do projeto para gerar o PDF de finalização e acessos da loja</p>
      </div>

      {/* Dados do projeto */}
      <div style={{ background: '#fff', border: '1px solid #D6E4EF', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,43,77,0.04)' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
          <div style={{ width: 24, height: 24, borderRadius: 8, background: '#EBF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A6AA8" strokeWidth="2.5">
              <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              <path d="M16 3h-8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"/>
            </svg>
          </div>
          <span style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1A6AA8' }}>Dados do Projeto</span>
        </div>
        <FieldGroup label="Nome do cliente / loja">
          <TextInput value={form.clientName} onChange={(e) => setField('clientName', e.target.value)} placeholder="Ex: Loja Bella Moda" />
        </FieldGroup>
        <div style={{ height: 10 }} />
        <Row>
          <FieldGroup label="URL da loja">
            <TextInput type="url" value={form.lojaUrl} onChange={(e) => setField('lojaUrl', e.target.value)} placeholder="https://minhaloja.com.br" />
          </FieldGroup>
          <FieldGroup label="Responsável" optional>
            <TextInput value={form.responsavel} onChange={(e) => setField('responsavel', e.target.value)} placeholder="Ex: João Silva" />
          </FieldGroup>
        </Row>
      </div>

      <SectionLabel>Credenciais Gerais</SectionLabel>

      {/* Plataforma */}
      <CollapsibleCard title="Plataforma de E-commerce" subtitle="Nuvemshop, Shopify, VTEX, WooCommerce…" defaultOpen>
        <FieldGroup label="Plataforma">
          <SelectInput value={form.ec_platform} onChange={(e) => setField('ec_platform', e.target.value)}>
            <option value="">Selecione…</option>
            <option>Nuvemshop</option>
            <option>Shopify</option>
            <option>VTEX</option>
            <option>WooCommerce</option>
            <option>Loja Integrada</option>
            <option>Tray</option>
            <option value="Outra">Outra</option>
          </SelectInput>
        </FieldGroup>
        {form.ec_platform === 'Outra' && (
          <><SpSm /><FieldGroup label="Nome da plataforma"><TextInput value={form.ec_platform_nome} onChange={(e) => setField('ec_platform_nome', e.target.value)} placeholder="Ex: Yampi, Nuvei…" /></FieldGroup></>
        )}
        <Sp />
        <FieldGroup label="URL do painel admin">
          <TextInput type="url" value={form.ec_url} onChange={(e) => setField('ec_url', e.target.value)} placeholder="https://minhaloja.com.br/admin" />
        </FieldGroup>
        <SpSm />

        {/* Tipo de acesso da plataforma */}
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { val: 'direto', label: 'Login direto' },
            { val: 'parceiros', label: 'Painel de Parceiros' },
          ].map(opt => (
            <button
              key={opt.val}
              type="button"
              onClick={() => setField('ec_login_tipo', opt.val)}
              style={{
                padding: '5px 12px',
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 700,
                border: '1.5px solid',
                cursor: 'pointer',
                transition: 'all 0.15s',
                borderColor: form.ec_login_tipo === opt.val ? '#002B4D' : '#D6E4EF',
                background: form.ec_login_tipo === opt.val ? '#002B4D' : '#F7FAFC',
                color: form.ec_login_tipo === opt.val ? '#A0E800' : '#6B8FAA',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {form.ec_login_tipo === 'direto' ? (
          <>
            <SpSm />
            <Row>
              <FieldGroup label="E-mail / Login">
                <TextInput type="email" value={form.ec_email} onChange={(e) => setField('ec_email', e.target.value)} placeholder="email@loja.com.br" />
              </FieldGroup>
              <FieldGroup label="Senha" optional>
                <TextInput value={form.ec_senha} onChange={(e) => setField('ec_senha', e.target.value)} />
              </FieldGroup>
            </Row>
          </>
        ) : (
          <>
            <SpSm />
            <div style={{ background: '#FFF8E6', border: '1px solid #F0D080', borderRadius: 10, padding: '10px 14px', display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12.5, color: '#7A5800', lineHeight: 1.5 }}>
              <svg style={{ flexShrink: 0, marginTop: 1 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C89000" strokeWidth="2.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Loja criada via Painel de Parceiros — acesso direto sob responsabilidade do cliente. O documento registrará essa informação.
            </div>
          </>
        )}

        <Divider label="Suporte da plataforma" />
        {ps && <><SupportBadge platform={form.ec_platform} /><SpSm /></>}
        <FieldGroup label="Link da central de ajuda" optional>
          <TextInput type="url" value={form.ec_suporte_link} onChange={(e) => setField('ec_suporte_link', e.target.value)} placeholder={ps ? ps.link : 'https://ajuda.plataforma.com.br'} />
        </FieldGroup>
        {ps && !form.ec_suporte_link && (
          <p style={{ fontSize: 11, color: '#8BA8BF', margin: '4px 0 0' }}>
            Link preenchido automaticamente no PDF caso o campo fique em branco.
          </p>
        )}
      </CollapsibleCard>

      {/* E-mail */}
      <CollapsibleCard title="E-mail Profissional" subtitle="Gmail Workspace, Outlook, Zoho…">
        <FieldGroup label="Provedor">
          <SelectInput value={form.em_provider} onChange={(e) => setField('em_provider', e.target.value)}>
            <option value="">Selecione…</option>
            <option>Google Workspace</option>
            <option>Microsoft 365</option>
            <option>Zoho Mail</option>
            <option>Titan Mail</option>
            <option>Cpanel</option>
            <option value="Outro">Outro</option>
          </SelectInput>
        </FieldGroup>
        {form.em_provider === 'Outro' && (
          <><SpSm /><FieldGroup label="Nome do provedor"><TextInput value={form.em_provider_nome} onChange={(e) => setField('em_provider_nome', e.target.value)} placeholder="Ex: Hostinger Mail…" /></FieldGroup></>
        )}
        <Sp />

        {/* Tipo de acesso do e-mail */}
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { val: 'direto', label: 'Temos o acesso' },
            { val: 'cliente', label: 'Cliente já possuía' },
          ].map(opt => (
            <button
              key={opt.val}
              type="button"
              onClick={() => setField('em_login_tipo', opt.val)}
              style={{
                padding: '5px 12px',
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 700,
                border: '1.5px solid',
                cursor: 'pointer',
                transition: 'all 0.15s',
                borderColor: form.em_login_tipo === opt.val ? '#002B4D' : '#D6E4EF',
                background: form.em_login_tipo === opt.val ? '#002B4D' : '#F7FAFC',
                color: form.em_login_tipo === opt.val ? '#A0E800' : '#6B8FAA',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {form.em_login_tipo === 'direto' ? (
          <>
            <SpSm />
            <Row>
              <FieldGroup label="E-mail / Login">
                <TextInput type="email" value={form.em_email} onChange={(e) => setField('em_email', e.target.value)} placeholder="contato@empresa.com.br" />
              </FieldGroup>
              <FieldGroup label="Senha" optional>
                <TextInput value={form.em_senha} onChange={(e) => setField('em_senha', e.target.value)} />
              </FieldGroup>
            </Row>
          </>
        ) : (
          <>
            <SpSm />
            <div style={{ background: '#F0F8FF', border: '1px solid #C0D8F0', borderRadius: 10, padding: '10px 14px', display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12.5, color: '#1A4A70', lineHeight: 1.5 }}>
              <svg style={{ flexShrink: 0, marginTop: 1 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A6AA8" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
              </svg>
              E-mail pré-existente do cliente — credenciais não foram configuradas pela agência e não constam neste documento.
            </div>
            <SpSm />
            <FieldGroup label="E-mail (para referência)" optional>
              <TextInput type="email" value={form.em_email} onChange={(e) => setField('em_email', e.target.value)} placeholder="contato@empresa.com.br" />
            </FieldGroup>
          </>
        )}

        {EMAIL_PLATFORM_LINKS[form.em_provider] && (
          <>
            <Divider label="Acesso rápido" />
            <QuickLink href={EMAIL_PLATFORM_LINKS[form.em_provider].url} label={EMAIL_PLATFORM_LINKS[form.em_provider].label} />
          </>
        )}
      </CollapsibleCard>

      {/* Envio */}
      <CollapsibleCard title="Meios de Envio" subtitle="Melhor Envio, Correios, Jadlog…">
        <Divider label="Melhor Envio" />
        <Row>
          <FieldGroup label="E-mail" optional><TextInput type="email" value={form.me_email} onChange={(e) => setField('me_email', e.target.value)} /></FieldGroup>
          <FieldGroup label="Senha" optional><TextInput value={form.me_senha} onChange={(e) => setField('me_senha', e.target.value)} /></FieldGroup>
        </Row>
        <Divider label="Correios" />
        <Row>
          <FieldGroup label="Login / CNPJ" optional><TextInput value={form.cor_login} onChange={(e) => setField('cor_login', e.target.value)} /></FieldGroup>
          <FieldGroup label="Senha" optional><TextInput value={form.cor_senha} onChange={(e) => setField('cor_senha', e.target.value)} /></FieldGroup>
        </Row>
        <Divider label="Outro Transportador" />
        <FieldGroup label="Nome" optional><TextInput value={form.out_nome} onChange={(e) => setField('out_nome', e.target.value)} /></FieldGroup>
        <SpSm />
        <Row>
          <FieldGroup label="Login" optional><TextInput value={form.out_login} onChange={(e) => setField('out_login', e.target.value)} /></FieldGroup>
          <FieldGroup label="Senha" optional><TextInput value={form.out_senha} onChange={(e) => setField('out_senha', e.target.value)} /></FieldGroup>
        </Row>
      </CollapsibleCard>

      {/* Domínio */}
      <CollapsibleCard title="Domínio" subtitle="Registro.br, GoDaddy, Cloudflare…">
        <FieldGroup label="Registradora">
          <SelectInput value={form.dom_provider} onChange={(e) => setField('dom_provider', e.target.value)}>
            <option value="">Selecione…</option>
            <option>Registro.br</option>
            <option>GoDaddy</option>
            <option>Cloudflare</option>
            <option>Hostinger</option>
            <option>Locaweb</option>
            <option>HostGator</option>
            <option value="Outro">Outro</option>
          </SelectInput>
        </FieldGroup>
        {form.dom_provider === 'Outro' && (
          <><SpSm /><FieldGroup label="Nome da registradora"><TextInput value={form.dom_provider_nome} onChange={(e) => setField('dom_provider_nome', e.target.value)} placeholder="Ex: Namecheap…" /></FieldGroup></>
        )}
        <Sp />
        <Row>
          <FieldGroup label="Domínio"><TextInput value={form.dom_dominio} onChange={(e) => setField('dom_dominio', e.target.value)} placeholder="meusite.com.br" /></FieldGroup>
          <FieldGroup label="Login" optional><TextInput value={form.dom_login} onChange={(e) => setField('dom_login', e.target.value)} /></FieldGroup>
        </Row>
        <SpSm />
        <FieldGroup label="Senha" optional><TextInput value={form.dom_senha} onChange={(e) => setField('dom_senha', e.target.value)} /></FieldGroup>
        {DOMAIN_PROVIDER_LINKS[form.dom_provider] && (
          <>
            <Divider label="Acesso rápido" />
            <QuickLink href={DOMAIN_PROVIDER_LINKS[form.dom_provider].url} label={DOMAIN_PROVIDER_LINKS[form.dom_provider].label} />
          </>
        )}
      </CollapsibleCard>

      <SectionLabel>Redes Sociais</SectionLabel>

      <CollapsibleCard title="Redes Sociais" subtitle="Facebook (opcional) e Instagram">
        <Divider label="Facebook" />
        <Row>
          <FieldGroup label="E-mail / Login" optional><TextInput type="email" value={form.fb_email} onChange={(e) => setField('fb_email', e.target.value)} placeholder="email@facebook.com" /></FieldGroup>
          <FieldGroup label="Senha" optional><TextInput value={form.fb_senha} onChange={(e) => setField('fb_senha', e.target.value)} /></FieldGroup>
        </Row>
        <Divider label="Instagram" />
        <FieldGroup label="Usuário" optional>
          <TextInput value={form.ig_usuario} onChange={(e) => setField('ig_usuario', e.target.value)} placeholder="@minhaloja" />
        </FieldGroup>
      </CollapsibleCard>

      <SectionLabel>Apps de Marketing</SectionLabel>

      <CollapsibleCard title="Conta Google" subtitle="Merchant Center, Analytics, Search Console, Ads…">
        <div style={{ background: '#F4FBE0', border: '1px solid #C8E69A', borderRadius: 10, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 12.5, lineHeight: 1.6, color: '#3D5A00', marginBottom: 4 }}>
          <svg style={{ flexShrink: 0, marginTop: 2 }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6EA800" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
          </svg>
          Deixamos o ambiente todo pronto para que você precise somente criar as campanhas no Google Ads! Basta você acessar sua conta Google e clicar nos links abaixo que você já conseguirá acessar a todos esses apps!
        </div>
        <Sp />
        <Row>
          <FieldGroup label="E-mail" optional><TextInput type="email" value={form.gg_email} onChange={(e) => setField('gg_email', e.target.value)} /></FieldGroup>
          <FieldGroup label="Senha" optional><TextInput value={form.gg_senha} onChange={(e) => setField('gg_senha', e.target.value)} /></FieldGroup>
        </Row>
        <Divider label="Acesso rápido" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px' }}>
          {[
            ['https://merchants.google.com', 'Google Merchant Center'],
            ['https://analytics.google.com', 'Google Analytics'],
            ['https://search.google.com/search-console', 'Search Console'],
            ['https://ads.google.com', 'Google Ads'],
          ].map(([href, label]) => <QuickLink key={href} href={href} label={label} />)}
        </div>
      </CollapsibleCard>

      <SectionLabel>ERP</SectionLabel>

      <CollapsibleCard title="ERP" subtitle="Bling, Olist, outros sistemas…">
        <FieldGroup label="ERP utilizado" optional>
          <SelectInput value={form.erp_choice} onChange={(e) => setField('erp_choice', e.target.value)}>
            <option value="">Selecione…</option>
            <option>Bling</option>
            <option>Olist</option>
            <option>Tiny</option>
            <option>Omie</option>
            <option value="Outro">Outro</option>
          </SelectInput>
        </FieldGroup>
        {form.erp_choice === 'Outro' && (
          <><SpSm /><FieldGroup label="Nome do ERP"><TextInput value={form.erp_outro_nome} onChange={(e) => setField('erp_outro_nome', e.target.value)} placeholder="Ex: Omie, SAP…" /></FieldGroup></>
        )}
        <Sp />
        <Row>
          <FieldGroup label="Login" optional><TextInput value={form.erp_login} onChange={(e) => setField('erp_login', e.target.value)} /></FieldGroup>
          <FieldGroup label="Senha" optional><TextInput value={form.erp_senha} onChange={(e) => setField('erp_senha', e.target.value)} /></FieldGroup>
        </Row>
      </CollapsibleCard>

      <SectionLabel>Marketplace</SectionLabel>

      <CollapsibleCard title="Marketplace" subtitle="Amazon, Shopee, Mercado Livre, TikTok…">
        {[
          ['Amazon',        'amz_login', 'amz_senha'],
          ['Shopee',        'shp_login', 'shp_senha'],
          ['Mercado Livre', 'ml_login',  'ml_senha'],
          ['TikTok Shop',   'tkt_login', 'tkt_senha'],
        ].map(([name, lk, sk]) => (
          <div key={name}>
            <Divider label={name} />
            <Row>
              <FieldGroup label="Login" optional><TextInput value={form[lk]} onChange={(e) => setField(lk, e.target.value)} /></FieldGroup>
              <FieldGroup label="Senha" optional><TextInput value={form[sk]} onChange={(e) => setField(sk, e.target.value)} /></FieldGroup>
            </Row>
          </div>
        ))}
        <Divider label="Outro Marketplace" />
        <FieldGroup label="Nome" optional><TextInput value={form.mkp_outro_nome} onChange={(e) => setField('mkp_outro_nome', e.target.value)} placeholder="Ex: Magalu, Americanas…" /></FieldGroup>
        <SpSm />
        <Row>
          <FieldGroup label="Login" optional><TextInput value={form.mkp_outro_login} onChange={(e) => setField('mkp_outro_login', e.target.value)} /></FieldGroup>
          <FieldGroup label="Senha" optional><TextInput value={form.mkp_outro_senha} onChange={(e) => setField('mkp_outro_senha', e.target.value)} /></FieldGroup>
        </Row>
      </CollapsibleCard>

      {/* Sticky footer */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, padding: '12px 24px', background: 'linear-gradient(to top, #EFF4F9 70%, transparent)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', gap: 10 }}>
          <button onClick={handleClear}
            style={{ padding: '10px 18px', borderRadius: 12, fontSize: 13, fontWeight: 700, border: '1px solid #D6E4EF', color: '#4A6A85', background: '#fff', cursor: 'pointer' }}
            onMouseOver={e => { e.currentTarget.style.background = '#F7FAFC'; e.currentTarget.style.borderColor = '#B0C8DA'; }}
            onMouseOut={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#D6E4EF'; }}
          >
            Limpar
          </button>
          <button onClick={handleGenerate} disabled={generating}
            style={{ flex: 1, padding: '10px 18px', borderRadius: 12, fontSize: 13, fontWeight: 900, background: 'linear-gradient(135deg,#003A60,#002B4D)', color: '#fff', border: 'none', cursor: generating ? 'wait' : 'pointer', boxShadow: '0 4px 16px rgba(0,43,77,0.25)', opacity: generating ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            {generating ? (
              <><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Gerando…</>
            ) : (
              <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A0E800" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>Gerar Documento de Entrega</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
