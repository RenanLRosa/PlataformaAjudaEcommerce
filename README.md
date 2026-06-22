# Central Ajuda Ecommerce

Plataforma interna de ferramentas da agência Ajuda Ecommerce, migrada de HTML/CSS/JS puro para React + Vite + Tailwind CSS.

## Funcionalidades

- **Início** — Dashboard com stats e acesso rápido
- **Documento de Entrega** — Formulário para geração de PDF de finalização de projeto (com credenciais, resumo e suporte)
- **Mensagens Padrão** — Biblioteca de mensagens de WhatsApp/e-mail com filtros e busca
- **Páginas Institucionais** — Templates HTML prontos (Trocas, Entrega, Quem Somos, Frete Grátis, Privacidade)
- **Imagens** — Galeria de imagens e materiais visuais organizados em pastas
- **Links Úteis** — Links rápidos com mensagens de compartilhamento
- **PDFs e Documentos** — Central de materiais prontos da agência

## Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Build de produção
npm run build
```

## Estrutura de Pastas

```
src/
├── components/
│   ├── layout/         # Sidebar, Topbar, AdminBanner
│   ├── common/         # Toast, Modal, ColorPicker, FormFields, ReorderButtons, MiniButton, EmptyState
│   ├── home/           # HomePage
│   ├── pdf/            # PdfPage, CollapsibleCard
│   ├── messages/       # MessagesPage, MessageCard
│   ├── docs/           # DocsPage, DocCard
│   ├── pages/          # PagesPage, PageCard
│   ├── images/         # ImagesPage, ImageCard
│   ├── links/          # LinksPage, LinkCard
│   └── modals/         # Todos os modais CRUD
├── data/
│   ├── constants.js           # Paleta, STORE_KEY, dados da agência
│   ├── defaultData.js         # Mensagens, docs, páginas, links, imagens padrão
│   ├── institutionalContent.js # HTML institucional (Trocas, Entrega, Privacidade…)
│   ├── logoBase64.js          # Logo da agência para o PDF (base64)
│   └── sampleLogoBase64.js    # Logo de exemplo para cards de imagem
├── hooks/
│   ├── useAppData.js   # Estado central + localStorage
│   ├── useToast.js     # Notificações temporárias
│   ├── useJsPdf.js     # Carregamento dinâmico do jsPDF
│   └── usePdfForm.js   # Estado do formulário de PDF
├── utils/
│   ├── helpers.js      # uid, copyToClipboard, moveInList, readFilesAsDataUrls…
│   ├── buildPageHtml.js # Substituição de placeholders das páginas institucionais
│   ├── linkShare.js    # Monta mensagem de compartilhamento de link
│   └── pdfGenerator.js # Geração completa do PDF (jsPDF)
└── styles/
    └── index.css       # Tailwind + resets globais
```

## Dados Persistidos

Todos os dados são salvos em `localStorage` sob a chave `ajuda_central_v5`.

Para **exportar** os dados: ative o modo Admin (toggle na sidebar) → clique em "Exportar dados (JSON)".

Para **restaurar o padrão**: Admin → "Restaurar padrão".

## Tecnologias

- **React 18** — UI declarativa com hooks
- **Vite 5** — Bundler ultrarrápido
- **Tailwind CSS 3** — Estilização utilitária
- **jsPDF** (via CDN) — Geração de PDF no navegador
