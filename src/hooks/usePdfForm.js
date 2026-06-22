import { useState, useCallback } from 'react';

const emptyForm = {
  clientName: '',
  lojaUrl: '',
  responsavel: '',
  ec_platform: '',
  ec_platform_nome: '',
  ec_url: '',
  ec_email: '',
  ec_senha: '',
  em_provider: '',
  em_provider_nome: '',
  em_email: '',
  em_senha: '',
  me_email: '',
  me_senha: '',
  cor_login: '',
  cor_senha: '',
  out_nome: '',
  out_login: '',
  out_senha: '',
  dom_provider: '',
  dom_provider_nome: '',
  dom_dominio: '',
  dom_login: '',
  dom_senha: '',
  gg_email: '',
  gg_senha: '',
  erp_choice: '',
  erp_outro_nome: '',
  erp_login: '',
  erp_senha: '',
  amz_login: '',
  amz_senha: '',
  shp_login: '',
  shp_senha: '',
  ml_login: '',
  ml_senha: '',
  tkt_login: '',
  tkt_senha: '',
  mkp_outro_nome: '',
  mkp_outro_login: '',
  mkp_outro_senha: '',
};

export function usePdfForm() {
  const [form, setForm] = useState(emptyForm);

  const setField = useCallback((id, value) => {
    setForm((f) => ({ ...f, [id]: value }));
  }, []);

  const clearAll = useCallback(() => {
    setForm(emptyForm);
  }, []);

  return { form, setField, clearAll };
}
