// Dados padrão da aplicação: mensagens, documentos, páginas institucionais, imagens e links.
// Estrutura extraída e preservada fielmente do projeto original (HTML único).
import {
  HTML_TROCAS,
  HTML_ENTREGA,
  HTML_QUEM_SOMOS,
  HTML_FRETE_GRATIS,
  HTML_PRIVACIDADE,
} from './institutionalContent';
import { SAMPLE_LOGO_B64 } from './sampleLogoBase64';

export const DEFAULT_MSG_CATS = [
  {
    "id": "encerramento",
    "label": "Encerramento",
    "section": "Encerramento do Projeto"
  },
  {
    "id": "boas-vindas",
    "label": "Boas-vindas",
    "section": "Boas-vindas e Início de Projeto"
  },
  {
    "id": "pagamento",
    "label": "Pagamento",
    "section": "Meios de Pagamento"
  },
  {
    "id": "frete",
    "label": "Frete",
    "section": "Meios de Frete"
  },
  {
    "id": "banners",
    "label": "Banners",
    "section": "Produção de Banners"
  },
  {
    "id": "reuniao",
    "label": "Reuniões",
    "section": "Reuniões e Agendamentos"
  },
  {
    "id": "followup",
    "label": "Follow-up",
    "section": "Follow-up e Andamento"
  },
  {
    "id": "suporte",
    "label": "Suporte",
    "section": "Suporte Pós-entrega"
  },
  {
    "id": "cobranca",
    "label": "Cobrança",
    "section": "Cobrança e Financeiro"
  }
];

export const DEFAULT_MSGS = [
  {
    "id": "m1",
    "cat": "encerramento",
    "icon": "🎉",
    "color": "#1e40af",
    "full": false,
    "title": "Encerramento — Grupo WhatsApp",
    "sub": "Para enviar no grupo do cliente ao finalizar",
    "text": "Olá, [NOME DO CLIENTE]! 🎉\n\nÉ com muito orgulho que comunicamos a conclusão do seu projeto de e-commerce!\n\n✅ Sua loja está configurada e pronta para operar\n✅ Os acessos foram organizados no documento em anexo\n✅ Todas as integrações foram validadas\n\n📎 Enviamos o *Documento de Entrega* com todos os dados importantes — guarde em local seguro!\n\nPara suporte, estamos disponíveis:\n📞 WhatsApp: (48) 99999-9999\n📧 E-mail: contato@ajudaecom.com.br\n🕐 Seg–Sex, 9h–18h\n\nFoi um prazer trabalhar com você. Conte sempre com a Ajuda Ecommerce! 🚀"
  },
  {
    "id": "m2",
    "cat": "encerramento",
    "icon": "📬",
    "color": "#1e40af",
    "full": false,
    "title": "Encerramento — E-mail formal",
    "sub": "Versão mais formal para envio por e-mail",
    "text": "Prezado(a) [NOME DO CLIENTE],\n\nInformamos com satisfação a conclusão do seu projeto de e-commerce.\n\nSegue em anexo o Documento de Entrega com o resumo do projeto, dados de suporte e todas as credenciais de acesso organizadas por serviço.\n\nRecomendamos:\n• Guardar o documento em local seguro\n• Alterar as senhas após o recebimento\n• Ativar autenticação em dois fatores\n\nEm caso de dúvidas, nossa equipe está disponível de segunda a sexta, das 9h às 18h, pelo WhatsApp (48) 99999-9999 ou pelo e-mail suporte@ajudaecom.com.br.\n\nAtenciosamente,\nEquipe Ajuda Ecommerce"
  },
  {
    "id": "m3",
    "cat": "encerramento",
    "icon": "🔒",
    "color": "#1e40af",
    "full": false,
    "title": "Orientações de Segurança",
    "sub": "Mensagem complementar sobre senhas e acessos",
    "text": "⚠️ *Orientações de segurança importantes*\n\nAgora que seu projeto foi entregue, recomendamos:\n\n🔑 Altere as senhas dos acessos recebidos\n🔐 Ative a verificação em dois fatores onde possível\n📵 Não compartilhe senhas por WhatsApp ou e-mail\n💾 Salve o documento de entrega em local seguro (Google Drive, nuvem)\n\nQualquer dúvida, fale conosco! 😊"
  },
  {
    "id": "m4",
    "cat": "boas-vindas",
    "icon": "📲",
    "color": "#166534",
    "full": false,
    "title": "Convite para o Grupo — WhatsApp",
    "sub": "Mensagem privada para adicionar o cliente ao grupo",
    "text": "Olá, tudo bem? 😊\n\nMeu nome é [NOME DO RESPONSÁVEL] e faço parte da equipe da Ajuda Ecommerce.\n\nO [NOME DO VENDEDOR] me passou o seu contato para que eu pudesse te adicionar ao grupo de acompanhamento do seu projeto — é por lá que vamos dar início a todo o processo de criação da sua loja virtual.\n\nVou te enviar o convite em seguida!"
  },
  {
    "id": "m5",
    "cat": "boas-vindas",
    "icon": "👋",
    "color": "#166534",
    "full": false,
    "title": "Boas-vindas no Grupo",
    "sub": "Primeira mensagem quando o cliente entra no grupo",
    "text": "Olá, [NOME DO CLIENTE]! Seja muito bem-vindo(a)! 🎉\n\nMeu nome é [NOME] e estou aqui junto com toda a nossa equipe para acompanhar cada etapa da criação da sua loja virtual e garantir que tudo seja desenvolvido com excelência.\n\nPara começarmos com o pé direito, vou precisar de algumas informações iniciais. Assim que você confirmar por aqui, já te passo tudo certinho! ✅"
  },
  {
    "id": "m6",
    "cat": "boas-vindas",
    "icon": "📝",
    "color": "#166534",
    "full": false,
    "title": "Solicitação de Dados Iniciais",
    "sub": "Pedir informações necessárias para início",
    "text": "Olá! Para darmos início ao seu projeto, precisamos das seguintes informações:\n\n📌 *Dados necessários:*\n• Nome completo / razão social\n• CNPJ ou CPF\n• Endereço completo\n• Logo da empresa (PNG com fundo transparente)\n• Fotos dos produtos (mínimo 5 por produto)\n• Descrições dos produtos e preços\n• Forma de pagamento desejada (cartão, PIX, boleto)\n\nAssim que recebermos, iniciamos imediatamente! ✅"
  },
  {
    "id": "m7",
    "cat": "pagamento",
    "icon": "💳",
    "color": "#0e7490",
    "full": true,
    "title": "Apresentação dos Meios de Pagamento",
    "sub": "Enviar junto com o PDF comparativo de pagamentos",
    "text": "Sobre as opções de meio de pagamento disponíveis para a sua loja, separei um comparativo completo para te ajudar na decisão. 📎\n\n*Principais opções disponíveis na Nuvemshop:*\n\n✅ *Nuvem Pago* — meio de pagamento nativo da plataforma. Aceita Pix, boleto e cartão de crédito parcelado, com checkout transparente (o cliente finaliza a compra diretamente na loja, sem redirecionamentos). É a opção que mais recomendamos, pois proporciona uma experiência de compra mais fluida e profissional.\n\nAlém do Nuvem Pago, também estão disponíveis: *Mercado Pago, PagSeguro, Pagar.me, AppMax, iPag, Cielo e PayPal* — cada um com suas próprias condições, taxas e formas de pagamento suportadas.\n\n*Sobre as taxas:*\nAs taxas variam conforme o meio de pagamento escolhido, a forma de pagamento utilizada pelo cliente, o número de parcelas e o prazo de recebimento selecionado.\n\nUma informação importante: ao utilizar um meio de pagamento externo ao Nuvem Pago, pode ser cobrada uma *tarifa adicional pela plataforma Nuvemshop*, que varia conforme o plano contratado — quanto maior o plano, menor essa tarifa. O Nuvem Pago é isento dessa tarifa por ser o meio nativo.\n\nNo cartão de crédito parcelado, quanto maior o número de parcelas, maior tende a ser a taxa. O mesmo vale para antecipar recebimentos.\n\n*Recomendação:*\nPara uma experiência de pagamento mais simples e confiável — especialmente no Pix — recomendamos o *Nuvem Pago*. Ele centraliza todos os meios de pagamento dentro da própria loja, elimina redirecionamentos e transmite mais segurança ao comprador.\n\nAssim que você decidir qual meio de pagamento prefere utilizar, te passo o passo a passo completo para configuração. Qualquer dúvida, é só chamar! 😊"
  },
  {
    "id": "m8",
    "cat": "frete",
    "icon": "🚚",
    "color": "#1d4ed8",
    "full": true,
    "title": "Apresentação dos Meios de Frete Nuvemshop",
    "sub": "Explicar as opções de envio disponíveis na plataforma",
    "text": "Agora vamos conversar sobre as opções de frete para a sua loja! 📦\n\nA Nuvemshop possui integração nativa com os principais meios de envio do mercado. Veja as principais opções:\n\n📮 *Correios*\nOpção mais tradicional, com ampla cobertura nacional. Oferece modalidades como PAC (econômico) e SEDEX (expresso).\n\n🚀 *Melhor Envio*\nPlataforma que agrega diversos transportadores (Correios, Jadlog, Azul Cargo, Latam Cargo e outros) em um só lugar. Permite comparar fretes e escolher o mais vantajoso por pedido. A integração é direta com a Nuvemshop e a utilização é gratuita — você paga apenas o frete no momento do envio.\n\n☁️ *Nuvem Envio*\nÉ a solução mais integrada para quem usa Nuvemshop, porque permite cotar, pagar e gerar etiquetas diretamente pelo painel da loja.\n\n🏭 *Transportadoras próprias*\nCaso você já trabalhe com alguma transportadora específica, também é possível configurar frete manual ou personalizado na plataforma.\n\n📍 *Frete grátis e frete fixo*\nVocê pode configurar condições especiais, como frete grátis a partir de um valor mínimo de compra ou frete fixo por região.\n\n*Nossa recomendação:*\nSe a prioridade for ter mais opções de transportadoras e comparar preços, o Melhor Envio atende bem. Se a prioridade for praticidade dentro da própria Nuvemshop, o Nuvem Envio pode ser o mais interessante.\n\nAssim que você decidir, te passo o passo a passo de configuração. Qualquer dúvida, estou à disposição! 😊"
  },
  {
    "id": "m9",
    "cat": "banners",
    "icon": "🎨",
    "color": "#6d28d9",
    "full": true,
    "title": "Início da Etapa de Banners",
    "sub": "Solicitar materiais e formulário para criação dos banners",
    "text": "Bom dia, [NOME DO CLIENTE]! 😊\n\nChegamos a uma das etapas mais visuais do projeto: a produção dos banners da sua loja! 🎨✨\n\nPara que nossa equipe de design possa criar as artes com a identidade ideal para o seu negócio, precisamos de duas coisas:\n\n*1. Formulário preenchido*\nPor favor, acesse o link abaixo e preencha as informações solicitadas — quanto mais detalhes, melhor o resultado!\n📋 *Formulário:* https://docs.google.com/forms/d/e/1FAIpQLSf9mOg-9WFFxRfQpE30Mj3bSWTs_J9u7gOcmNsMjNoHUVp_XA/viewform\n\n*2. Envio dos materiais visuais*\n📸 *Full Banners:* envie de 2 a 4 fotos de alta qualidade\n📸 *Mini Banners:* envie no mínimo 1 foto para cada mini banner\n\nCaso tenha logos, referências visuais ou outros arquivos, envie pelo e-mail: 📧 ajudaecomm@gmail.com\n\n*Serão produzidos para a sua loja:*\n✅ 2 Full Banners\n✅ 3 Mini Banners\n\nQualquer dúvida, estou à disposição. Mal podemos esperar para ver o resultado! 🚀"
  },
  {
    "id": "m10",
    "cat": "reuniao",
    "icon": "📅",
    "color": "#0f766e",
    "full": false,
    "title": "Confirmação de Reunião",
    "sub": "Confirmar agendamento de call ou reunião",
    "text": "Olá, [NOME]! 😊\n\nPassando para confirmar nosso agendamento:\n\n📅 *Data:* [DATA]\n🕐 *Horário:* [HORA]\n🔗 *Link:* [LINK MEET/ZOOM]\n\nEstaremos disponíveis no horário combinado. Caso precise reagendar, é só nos avisar com antecedência — sem problema algum!\n\nAté lá! 👍"
  },
  {
    "id": "m11",
    "cat": "reuniao",
    "icon": "⏰",
    "color": "#0f766e",
    "full": false,
    "title": "Ausência em Reunião",
    "sub": "Cliente não compareceu após 15 minutos de espera",
    "text": "Olá, [NOME]! Tudo bem?\n\nEstávamos te aguardando na reunião agendada para as [HORA] de hoje, mas não conseguimos fazer o contato.\n\nNossa política é aguardar até 15 minutos — após esse período, precisamos considerar a reunião cancelada para não comprometer a agenda das demais equipes.\n\nFique tranquilo(a)! Estamos disponíveis para reagendar em um horário mais conveniente. É só nos dizer quando funciona melhor. 😊"
  },
  {
    "id": "m12",
    "cat": "reuniao",
    "icon": "🔁",
    "color": "#0f766e",
    "full": false,
    "title": "Reagendamento de Reunião",
    "sub": "Propor novo horário para reunião",
    "text": "Olá, [NOME]! 😊\n\nGostaríamos de reagendar nossa reunião. Seguem alguns horários disponíveis:\n\n📅 Opção 1: [DATA] às [HORA]\n📅 Opção 2: [DATA] às [HORA]\n📅 Opção 3: [DATA] às [HORA]\n\nQual desses funciona melhor para você? Caso prefira outro horário, é só nos informar!\n\nAguardamos seu retorno. 😊"
  },
  {
    "id": "m13",
    "cat": "followup",
    "icon": "📊",
    "color": "#b45309",
    "full": false,
    "title": "Atualização de Status",
    "sub": "Informar andamento do projeto",
    "text": "Olá, [NOME]! 👋\n\nAtualização do seu projeto — [DATA]:\n\n✅ Concluído:\n• [ITEM 1]\n• [ITEM 2]\n\n🔄 Em andamento:\n• [ITEM 3]\n\n⏳ Próximos passos:\n• [ITEM 4]\n\nPrazo estimado de conclusão: [PRAZO] 🎯"
  },
  {
    "id": "m14",
    "cat": "followup",
    "icon": "⏰",
    "color": "#b45309",
    "full": false,
    "title": "Aguardando Retorno do Cliente",
    "sub": "Cobrar informação ou aprovação pendente",
    "text": "Oi, [NOME]! Como vai?\n\nPassando para lembrar que estamos aguardando:\n\n📋 [DESCREVA O QUE ESTÁ AGUARDANDO]\n\nAssim que recebermos, seguimos imediatamente com o projeto!\n\nQualquer dúvida ou dificuldade, pode chamar. 😊"
  },
  {
    "id": "m15",
    "cat": "followup",
    "icon": "✅",
    "color": "#b45309",
    "full": false,
    "title": "Aprovação de Etapa",
    "sub": "Solicitar aprovação de layout ou etapa",
    "text": "Olá, [NOME]! 🎨\n\nA etapa de [NOME DA ETAPA] está pronta para aprovação!\n\n🔗 Link para visualização: [LINK]\n\nPor favor, revise e nos diga:\n👍 Aprovado — seguimos para a próxima etapa\n✏️ Solicitar ajustes — nos informe o que alterar\n\nAguardamos seu retorno em até [PRAZO] para manter o cronograma. 📅"
  },
  {
    "id": "m16",
    "cat": "suporte",
    "icon": "🛠️",
    "color": "#1e3a5f",
    "full": false,
    "title": "Abertura de Chamado de Suporte",
    "sub": "Confirmação ao receber solicitação de suporte",
    "text": "Olá, [NOME]! 👋\n\nRecebemos sua solicitação de suporte. ✅\n\n📋 *Protocolo:* #[NÚMERO]\n🔎 *Assunto:* [ASSUNTO]\n⏱️ *Prazo de retorno:* até [PRAZO]\n\nNossa equipe técnica já está analisando. Assim que tivermos novidades, te aviso aqui!\n\nAjuda Ecommerce — Suporte Técnico"
  },
  {
    "id": "m17",
    "cat": "suporte",
    "icon": "✔️",
    "color": "#1e3a5f",
    "full": false,
    "title": "Resolução de Chamado",
    "sub": "Informar que o problema foi resolvido",
    "text": "Olá, [NOME]! 😊\n\nO problema reportado foi resolvido com sucesso! ✅\n\n🔧 *O que foi feito:* [DESCRIÇÃO DA SOLUÇÃO]\n\nPor favor, verifique se está tudo funcionando corretamente e nos informe.\n\nQualquer outra dúvida, estamos à disposição!\nEquipe Ajuda Ecommerce 🚀"
  },
  {
    "id": "m18",
    "cat": "cobranca",
    "icon": "💰",
    "color": "#9f1239",
    "full": false,
    "title": "Envio de Proposta",
    "sub": "Encaminhar proposta comercial",
    "text": "Olá, [NOME]! 😊\n\nConforme conversamos, segue nossa proposta para o seu projeto:\n\n📎 [LINK OU ANEXO DA PROPOSTA]\n\n📋 *Resumo:*\n• Serviço: [DESCRIÇÃO]\n• Investimento: R$ [VALOR]\n• Prazo de entrega: [PRAZO]\n• Forma de pagamento: [FORMA]\n\nFicamos à disposição para esclarecer qualquer dúvida!\n\nAjuda Ecommerce"
  },
  {
    "id": "m19",
    "cat": "cobranca",
    "icon": "🔔",
    "color": "#9f1239",
    "full": false,
    "title": "Lembrete de Pagamento",
    "sub": "Cobrar pagamento de forma gentil",
    "text": "Olá, [NOME]! Como vai?\n\nPassando para lembrar que temos um pagamento pendente:\n\n💳 *Referente a:* [SERVIÇO]\n💰 *Valor:* R$ [VALOR]\n📅 *Vencimento:* [DATA]\n\nChave PIX: [CHAVE PIX]\nOu acesse: [LINK DO BOLETO]\n\nEm caso de dúvidas, estamos à disposição! 😊"
  }
];

export const DEFAULT_DOC_CATS = [
  {
    "id": "geradores",
    "label": "Geradores",
    "section": "Geradores e Ferramentas"
  },
  {
    "id": "modelos",
    "label": "Modelos",
    "section": "Modelos e Materiais"
  }
];

export const DEFAULT_DOCS = [
  {
    "id": "d1",
    "cat": "geradores",
    "icon": "📄",
    "color": "#1e3a5f",
    "title": "Documento de Entrega",
    "desc": "Kit completo de finalização com credenciais, resumo do projeto e contatos de suporte.",
    "tag": "Gerador dinâmico",
    "btn": "Gerar PDF ↗",
    "state": "gen-pdf"
  },
  {
    "id": "d2",
    "cat": "geradores",
    "icon": "💳",
    "color": "#0e7490",
    "title": "Comparativo de Meios de Pagamento",
    "desc": "Tabela comparando Mercado Pago, PagSeguro, Pagar.me, Nuvem Pago, AppMax, iPag, Cielo e PayPal.",
    "tag": "PDF Pronto para envio",
    "btn": "📤 Ver e Copiar mensagem",
    "state": "comparativo"
  },
  {
    "id": "d3",
    "cat": "modelos",
    "icon": "📋",
    "color": "#6d28d9",
    "title": "Proposta Comercial",
    "desc": "Modelo de proposta padronizado com serviços, valores, cronograma e condições de pagamento.",
    "tag": "Em breve",
    "btn": "Disponível em breve",
    "state": "placeholder"
  },
  {
    "id": "d4",
    "cat": "modelos",
    "icon": "✅",
    "color": "#166534",
    "title": "Checklist de Lançamento",
    "desc": "Lista de verificação antes do go-live: domínio, pagamentos, frete, SEO e mais.",
    "tag": "Em breve",
    "btn": "Disponível em breve",
    "state": "placeholder"
  },
  {
    "id": "d5",
    "cat": "modelos",
    "icon": "📖",
    "color": "#b45309",
    "title": "Manual do Cliente",
    "desc": "Guia passo a passo para o cliente gerenciar a loja: produtos, pedidos e configurações.",
    "tag": "Em breve",
    "btn": "Disponível em breve",
    "state": "placeholder"
  },
  {
    "id": "d6",
    "cat": "modelos",
    "icon": "📜",
    "color": "#1e40af",
    "title": "Contrato de Prestação de Serviços",
    "desc": "Modelo de contrato com escopo, prazo, valores e cláusulas de suporte e manutenção.",
    "tag": "Em breve",
    "btn": "Disponível em breve",
    "state": "placeholder"
  },
  {
    "id": "d7",
    "cat": "modelos",
    "icon": "📊",
    "color": "#0f766e",
    "title": "Relatório Mensal de Resultados",
    "desc": "Template de relatório para apresentar métricas de tráfego, conversão e campanhas ao cliente.",
    "tag": "Em breve",
    "btn": "Disponível em breve",
    "state": "placeholder"
  }
];

export const DEFAULT_PAGES = [
  {
    "id": "pg1",
    "icon": "🔄",
    "color": "#1e40af",
    "title": "Trocas e Devoluções",
    "desc": "Políticas de devolução, troca, condições e formas de restituição de valores.",
    "dynamic": "none",
    "html": HTML_TROCAS
  },
  {
    "id": "pg2",
    "icon": "🚚",
    "color": "#0e7490",
    "title": "Política de Entrega",
    "desc": "Prazos, tentativas de entrega, responsabilidades e regras operacionais.",
    "dynamic": "none",
    "html": HTML_ENTREGA
  },
  {
    "id": "pg3",
    "icon": "🏛️",
    "color": "#166534",
    "title": "Quem Somos",
    "desc": "Apresentação da empresa — substitua o bloco padrão pelo texto da loja.",
    "dynamic": "quem_somos",
    "html": HTML_QUEM_SOMOS
  },
  {
    "id": "pg4",
    "icon": "📦",
    "color": "#0f766e",
    "title": "Regras de Frete Grátis",
    "desc": "Condições para frete grátis por região e valor mínimo de pedido.",
    "dynamic": "none",
    "html": HTML_FRETE_GRATIS
  },
  {
    "id": "pg5",
    "icon": "🔒",
    "color": "#6d28d9",
    "title": "Política de Privacidade",
    "desc": "LGPD, cookies, direitos do titular e certificados de segurança.",
    "dynamic": "nome_loja",
    "html": HTML_PRIVACIDADE
  }
];

export const DEFAULT_IMAGES = [
  {
    "id": "img_folder1",
    "type": "folder",
    "name": "Identidade Visual",
    "desc": "Logos e materiais da agência",
    "color": "#1e40af",
    "items": [
      {
        "id": "img1",
        "name": "Logo Ajuda Ecommerce",
        "src": SAMPLE_LOGO_B64
      }
    ]
  },
  {
    "id": "img_single1",
    "type": "single",
    "name": "Logo Ajuda Ecommerce",
    "desc": "",
    "color": "#166534",
    "src": SAMPLE_LOGO_B64
  }
];

export const DEFAULT_LINKS = [
  {
    "id": "lk1",
    "color": "#1e40af",
    "name": "Google Ads",
    "url": "https://ads.google.com",
    "desc": "Painel de campanhas pagas do Google",
    "msg": ""
  },
  {
    "id": "lk2",
    "color": "#0e7490",
    "name": "Google Analytics",
    "url": "https://analytics.google.com",
    "desc": "Relatórios de tráfego e conversão",
    "msg": ""
  },
  {
    "id": "lk3",
    "color": "#166534",
    "name": "Google Search Console",
    "url": "https://search.google.com/search-console",
    "desc": "Desempenho orgânico e indexação",
    "msg": ""
  },
  {
    "id": "lk4",
    "color": "#b45309",
    "name": "Google Tag Manager",
    "url": "https://tagmanager.google.com",
    "desc": "Gerenciamento de tags e pixels",
    "msg": ""
  },
  {
    "id": "lk5",
    "color": "#1e3a5f",
    "name": "Meta Business Suite",
    "url": "https://business.facebook.com",
    "desc": "Gerenciador de negócios do Facebook/Instagram",
    "msg": ""
  },
  {
    "id": "lk6",
    "color": "#9f1239",
    "name": "Nuvemshop Admin",
    "url": "https://www.nuvemshop.com.br/admin",
    "desc": "Painel administrativo da plataforma",
    "msg": ""
  }
];
