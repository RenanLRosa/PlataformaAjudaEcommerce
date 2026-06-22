import { useState } from 'react';
import CollapsibleCard from './CollapsibleCard';
import { FieldGroup, TextInput, SelectInput, FieldRow } from '../common/FormFields';
import { usePdfForm } from '../../hooks/usePdfForm';
import { useJsPdf } from '../../hooks/useJsPdf';
import { generateDeliveryPdf } from '../../utils/pdfGenerator';

function OutroField({ visible, label, value, onChange, placeholder }) {
  if (!visible) return null;
  return (
    <FieldGroup label={label}>
      <TextInput value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </FieldGroup>
  );
}

export default function PdfPage({ showToast }) {
  const { form, setField, clearAll } = usePdfForm();
  const { getJsPDF } = useJsPdf();
  const [generating, setGenerating] = useState(false);

  const handleClear = () => {
    if (!confirm('Limpar todos os campos preenchidos?')) return;
    clearAll();
    showToast('Formulário limpo');
  };

  const handleGenerate = async () => {
    if (!form.clientName.trim()) {
      alert('Informe o nome do cliente/loja antes de gerar o documento.');
      return;
    }
    setGenerating(true);
    try {
      const JsPDF = await getJsPDF();
      const pdf = generateDeliveryPdf(form, JsPDF);
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
    <div className="page-wrap max-w-[760px] mx-auto px-6 pt-7 pb-20 flex flex-col gap-5">
      <div>
        <h1 className="text-[19px] font-bold text-neutral-900 tracking-tight">Documento de Entrega</h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          Preencha os dados do projeto para gerar o PDF de finalização e acessos da loja
        </p>
      </div>

      {/* Dados do projeto */}
      <div className="flex flex-col gap-3">
        <FieldGroup label="Nome do cliente / loja">
          <TextInput
            value={form.clientName}
            onChange={(e) => setField('clientName', e.target.value)}
            placeholder="Ex: Loja Bella Moda"
          />
        </FieldGroup>
        <FieldGroup label="URL da Loja">
          <TextInput
            type="url"
            value={form.lojaUrl}
            onChange={(e) => setField('lojaUrl', e.target.value)}
            placeholder="https://minhaloja.com.br"
          />
        </FieldGroup>
        <FieldGroup label="Responsável pelo projeto" optional>
          <TextInput
            value={form.responsavel}
            onChange={(e) => setField('responsavel', e.target.value)}
            placeholder="Ex: João Silva"
          />
        </FieldGroup>
      </div>

      <div className="text-[11px] font-bold uppercase tracking-wide text-neutral-400 pt-1">Credenciais Gerais</div>

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
        <OutroField
          visible={form.ec_platform === 'Outra'}
          label="Nome da plataforma"
          value={form.ec_platform_nome}
          onChange={(v) => setField('ec_platform_nome', v)}
          placeholder="Ex: Yampi, Nuvei…"
        />
        <FieldGroup label="URL do painel admin">
          <TextInput type="url" value={form.ec_url} onChange={(e) => setField('ec_url', e.target.value)} placeholder="https://minhaloja.com.br/admin" />
        </FieldGroup>
        <FieldRow>
          <FieldGroup label="E-mail / Login">
            <TextInput type="email" value={form.ec_email} onChange={(e) => setField('ec_email', e.target.value)} placeholder="email@loja.com.br" />
          </FieldGroup>
          <FieldGroup label="Senha" optional>
            <TextInput value={form.ec_senha} onChange={(e) => setField('ec_senha', e.target.value)} />
          </FieldGroup>
        </FieldRow>
      </CollapsibleCard>

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
        <OutroField
          visible={form.em_provider === 'Outro'}
          label="Nome do provedor"
          value={form.em_provider_nome}
          onChange={(v) => setField('em_provider_nome', v)}
          placeholder="Ex: Hostinger Mail…"
        />
        <FieldGroup label="E-mail / Login">
          <TextInput type="email" value={form.em_email} onChange={(e) => setField('em_email', e.target.value)} placeholder="contato@empresa.com.br" />
        </FieldGroup>
        <FieldGroup label="Senha" optional>
          <TextInput value={form.em_senha} onChange={(e) => setField('em_senha', e.target.value)} />
        </FieldGroup>
      </CollapsibleCard>

      <CollapsibleCard title="Meios de Envio" subtitle="Melhor Envio, Correios, Jadlog…">
        <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-400">Melhor Envio</p>
        <FieldRow>
          <FieldGroup label="E-mail" optional>
            <TextInput type="email" value={form.me_email} onChange={(e) => setField('me_email', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Senha" optional>
            <TextInput value={form.me_senha} onChange={(e) => setField('me_senha', e.target.value)} />
          </FieldGroup>
        </FieldRow>
        <div className="h-px bg-neutral-100" />
        <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-400">Correios</p>
        <FieldRow>
          <FieldGroup label="Login / CNPJ" optional>
            <TextInput value={form.cor_login} onChange={(e) => setField('cor_login', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Senha" optional>
            <TextInput value={form.cor_senha} onChange={(e) => setField('cor_senha', e.target.value)} />
          </FieldGroup>
        </FieldRow>
        <div className="h-px bg-neutral-100" />
        <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-400">Outro Transportador</p>
        <FieldGroup label="Nome" optional>
          <TextInput value={form.out_nome} onChange={(e) => setField('out_nome', e.target.value)} />
        </FieldGroup>
        <FieldRow>
          <FieldGroup label="Login" optional>
            <TextInput value={form.out_login} onChange={(e) => setField('out_login', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Senha" optional>
            <TextInput value={form.out_senha} onChange={(e) => setField('out_senha', e.target.value)} />
          </FieldGroup>
        </FieldRow>
      </CollapsibleCard>

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
        <OutroField
          visible={form.dom_provider === 'Outro'}
          label="Nome da registradora"
          value={form.dom_provider_nome}
          onChange={(v) => setField('dom_provider_nome', v)}
          placeholder="Ex: Namecheap…"
        />
        <FieldGroup label="Domínio">
          <TextInput value={form.dom_dominio} onChange={(e) => setField('dom_dominio', e.target.value)} placeholder="meusite.com.br" />
        </FieldGroup>
        <FieldRow>
          <FieldGroup label="Login" optional>
            <TextInput value={form.dom_login} onChange={(e) => setField('dom_login', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Senha" optional>
            <TextInput value={form.dom_senha} onChange={(e) => setField('dom_senha', e.target.value)} />
          </FieldGroup>
        </FieldRow>
      </CollapsibleCard>

      <div className="text-[11px] font-bold uppercase tracking-wide text-neutral-400 pt-1">Apps de Marketing</div>

      <CollapsibleCard title="Conta Google" subtitle="Google Ads, Analytics, Search Console…">
        <FieldRow>
          <FieldGroup label="E-mail" optional>
            <TextInput type="email" value={form.gg_email} onChange={(e) => setField('gg_email', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Senha" optional>
            <TextInput value={form.gg_senha} onChange={(e) => setField('gg_senha', e.target.value)} />
          </FieldGroup>
        </FieldRow>
      </CollapsibleCard>

      <div className="text-[11px] font-bold uppercase tracking-wide text-neutral-400 pt-1">ERP</div>

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
        <OutroField
          visible={form.erp_choice === 'Outro'}
          label="Nome do ERP"
          value={form.erp_outro_nome}
          onChange={(v) => setField('erp_outro_nome', v)}
          placeholder="Ex: Omie, SAP…"
        />
        <FieldRow>
          <FieldGroup label="Login" optional>
            <TextInput value={form.erp_login} onChange={(e) => setField('erp_login', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Senha" optional>
            <TextInput value={form.erp_senha} onChange={(e) => setField('erp_senha', e.target.value)} />
          </FieldGroup>
        </FieldRow>
      </CollapsibleCard>

      <div className="text-[11px] font-bold uppercase tracking-wide text-neutral-400 pt-1">Marketplace</div>

      <CollapsibleCard title="Marketplace" subtitle="Amazon, Shopee, Mercado Livre, TikTok…">
        <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-400">Amazon</p>
        <FieldRow>
          <FieldGroup label="Login" optional>
            <TextInput value={form.amz_login} onChange={(e) => setField('amz_login', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Senha" optional>
            <TextInput value={form.amz_senha} onChange={(e) => setField('amz_senha', e.target.value)} />
          </FieldGroup>
        </FieldRow>
        <div className="h-px bg-neutral-100" />
        <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-400">Shopee</p>
        <FieldRow>
          <FieldGroup label="Login" optional>
            <TextInput value={form.shp_login} onChange={(e) => setField('shp_login', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Senha" optional>
            <TextInput value={form.shp_senha} onChange={(e) => setField('shp_senha', e.target.value)} />
          </FieldGroup>
        </FieldRow>
        <div className="h-px bg-neutral-100" />
        <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-400">Mercado Livre</p>
        <FieldRow>
          <FieldGroup label="Login" optional>
            <TextInput value={form.ml_login} onChange={(e) => setField('ml_login', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Senha" optional>
            <TextInput value={form.ml_senha} onChange={(e) => setField('ml_senha', e.target.value)} />
          </FieldGroup>
        </FieldRow>
        <div className="h-px bg-neutral-100" />
        <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-400">TikTok Shop</p>
        <FieldRow>
          <FieldGroup label="Login" optional>
            <TextInput value={form.tkt_login} onChange={(e) => setField('tkt_login', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Senha" optional>
            <TextInput value={form.tkt_senha} onChange={(e) => setField('tkt_senha', e.target.value)} />
          </FieldGroup>
        </FieldRow>
        <div className="h-px bg-neutral-100" />
        <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-400">Outro Marketplace</p>
        <FieldGroup label="Nome" optional>
          <TextInput value={form.mkp_outro_nome} onChange={(e) => setField('mkp_outro_nome', e.target.value)} placeholder="Ex: Magalu, Americanas…" />
        </FieldGroup>
        <FieldRow>
          <FieldGroup label="Login" optional>
            <TextInput value={form.mkp_outro_login} onChange={(e) => setField('mkp_outro_login', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Senha" optional>
            <TextInput value={form.mkp_outro_senha} onChange={(e) => setField('mkp_outro_senha', e.target.value)} />
          </FieldGroup>
        </FieldRow>
      </CollapsibleCard>

      <div className="flex gap-2.5 pt-2 sticky bottom-0 bg-gradient-to-t from-[#F4F7FA] via-[#F4F7FA] pb-1">
        <button
          onClick={handleClear}
          className="px-4 py-2.5 rounded-md text-[13px] font-semibold border border-neutral-300 text-neutral-600 bg-white hover:bg-neutral-50"
        >
          Limpar
        </button>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="flex-1 px-4 py-2.5 rounded-md text-[13px] font-bold bg-[#004070] text-white hover:bg-[#003660] disabled:opacity-60"
        >
          {generating ? 'Gerando…' : 'Gerar Documento de Entrega'}
        </button>
      </div>
    </div>
  );
}
