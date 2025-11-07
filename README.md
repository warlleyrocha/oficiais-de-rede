# 📦 Oficiais de Rede

Um sistema web moderno para gerenciamento e controle de materiais utilizado por oficiais de rede em serviços de campo, permitindo o registro de baixas, requisições de materiais e visualização do histórico de consumo.

## 🚀 Funcionalidades

### Funcionalidades Principais

- **Registro de Baixa de Materiais**: Interface intuitiva para registrar materiais consumidos em serviços, incluindo dados dos técnicos, localização e atividades realizadas
- **Requisição de Materiais**: Sistema para solicitar novos materiais com informações detalhadas e formatação automática
- **Visualização de Histórico**: Consulta completa dos materiais utilizados com interface expansível, ordenação automática por data e visualização em tabela
- **Integração WhatsApp Avançada**: Sistema inteligente de compartilhamento que utiliza Web Share API quando disponível, com fallback automático para WhatsApp Web e cópia para área de transferência
- **Armazenamento Local Persistente**: Dados salvos diretamente no navegador (localStorage) com serviço dedicado e persistência entre sessões
- **Validação Robusta**: Formulários com validação completa usando Zod 4.1 com mensagens de erro personalizadas
- **Interface Responsiva e Moderna**: Design adaptável para diferentes dispositivos com gradientes, animações e efeitos de hover
- **Experiência do Usuário Otimizada**: Formulários otimizados com React Hook Form, feedback visual imediato e componentes reutilizáveis

### Funcionalidades de Interface

- **Splash Screen Animado**: Tela de carregamento inicial com animação SVG personalizada
- **Header Dinâmico Contextual**: Cabeçalho que se adapta automaticamente à rota atual, exibindo títulos e subtítulos específicos, com logo clicável para retorno à home
- **Navegação Intuitiva**: Página inicial com cards interativos e gradientes visuais para cada funcionalidade
- **Histórico Interativo**: Cards expansíveis com animações suaves, exibição de data/hora formatada e tabela organizada de materiais
- **Feedback Visual**: Componentes de feedback para ações do usuário (sucesso, erros, validações)
- **Footer Informativo**: Rodapé com informações do desenvolvedor e link para LinkedIn

## 🛠️ Tecnologias Utilizadas

### Core
- **Frontend**: React 19.1.1 com TypeScript 5.8.3
- **Roteamento**: React Router DOM 7.9.3
- **Build Tool**: Vite 7.1.7 com SWC Plugin (@vitejs/plugin-react-swc 4.1.0)

### Formulários e Validação
- **Formulários**: React Hook Form 7.63.0 + @hookform/resolvers 5.2.2
- **Validação**: Zod 4.1.11 com schemas tipados

### Estilização e UI
- **CSS Framework**: Tailwind CSS 4.1.13 com @tailwindcss/vite 4.1.13
- **Animações**: tailwindcss-animate 1.0.7 + tw-animate-css 1.4.0
- **Utilitários CSS**: Tailwind Merge 3.3.1, clsx 2.1.1, Class Variance Authority 0.7.1
- **UI Components**: Radix UI Collapsible 1.1.12 + shadcn/ui
- **Ícones**: React Icons 5.5.0 + Lucide React 0.544.0

### Ferramentas de Desenvolvimento
- **Linting**: ESLint 9.36.0 + TypeScript ESLint 8.44.1
- **Formatação**: Prettier 3.6.2 com configuração personalizada
- **Type Definitions**: @types/react 19.1.13, @types/react-dom 19.1.9, @types/node 24.6.2

### PWA e Produção
- **PWA**: Service Worker + Web Manifest para funcionalidade offline
- **TypeScript**: Configuração estrita com múltiplos tsconfig (app, node)

## 📁 Estrutura do Projeto

```
src/
├── assets/              # Recursos estáticos (imagens, logos, ícones)
├── components/           # Componentes reutilizáveis
│   ├── BaseForm/        # Componente base para formulários com React Hook Form
│   ├── FormMaterial/    # Componentes do formulário de materiais
│   │   ├── DataLocation.tsx    # Formulário de localização (cidade, estado, endereço)
│   │   ├── DataMaterials.tsx   # Formulário de materiais (lista dinâmica)
│   │   ├── DataOfficer.tsx   # Formulário de dados dos técnicos (nome, matrícula)
│   │   ├── DataService.tsx    # Formulário de serviço/atividade realizada
│   │   ├── FormField.tsx      # Campo de formulário reutilizável
│   │   └── SelectField.tsx    # Campo de seleção reutilizável
│   ├── Header/          # Componente de cabeçalho dinâmico com navegação
│   ├── SplashScreen/    # Tela de carregamento inicial animada
│   ├── SuccessFeedback/ # Componente de feedback de sucesso (toast)
│   └── ui/              # Componentes UI (shadcn/ui)
│       └── collapsible.tsx     # Componente expansível para histórico
├── constants/           # Constantes e configurações
│   └── teams.ts         # Definição de equipes predefinidas
├── lib/                 # Bibliotecas e utilitários
│   └── utils.ts         # Utilitários gerais (cn, classNames)
├── pages/               # Páginas da aplicação
│   ├── Home/           # Página inicial com navegação e cards interativos
│   ├── MaterialRegister/      # Página de registro de baixa de materiais
│   ├── MaterialRequisition/   # Página de requisição de materiais
│   └── MaterialHistory/       # Página de histórico com cards expansíveis
├── services/            # Serviços e lógica de negócio
│   └── storage/        # Serviço de armazenamento (localStorage)
│       └── launchStorage.ts   # Gerenciamento de lançamentos (CRUD)
├── types/              # Definições de tipos TypeScript
│   ├── formMaterial.ts         # Tipos para formulário de baixa
│   └── requestMaterial.ts      # Tipos para formulário de requisição
├── utils/              # Utilitários e helpers
│   ├── formatDate.ts           # Formatação de datas (pt-BR)
│   ├── statesUtils.ts          # Utilitários de estados brasileiros
│   ├── textUtils.ts            # Utilitários de texto e formatação
│   ├── validationFormMaterial.ts # Schemas de validação Zod
│   └── whatsapp/               # Geração e compartilhamento WhatsApp
│       ├── generateWhatsAppText.ts # Geração de mensagens formatadas
│       └── shareWhatsApp.ts        # Sistema de compartilhamento inteligente
├── App.tsx             # Componente principal com rotas e lógica de estado
├── index.css           # Estilos globais e variáveis CSS
└── main.tsx            # Ponto de entrada da aplicação
```

## 🚦 Pré-requisitos

- Node.js 18+ (recomendado para React 19)
- npm ou yarn ou pnpm
- Navegador moderno com suporte a localStorage e ES2022

## ⚙️ Instalação e Configuração

1. **Clone o repositório**

   ```bash
   git clone https://github.com/warlleyrocha/oficiais-de-rede.git
   cd oficiais-de-rede
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

## 🏃‍♂️ Como Executar

### Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

Acesse: `http://localhost:5173`

### Build de Produção

```bash
npm run build
# ou
yarn build
```

### Preview da Build

```bash
npm run preview
# ou
yarn preview
```

## ✨ Novidades e Melhorias Recentes

### Interface e UX
- ✅ **Splash Screen**: Tela de carregamento inicial com animação SVG personalizada
- ✅ **Header Contextual**: Header dinâmico que se adapta automaticamente à rota atual
- ✅ **Navegação Melhorada**: Cards interativos na home com gradientes e hover effects
- ✅ **Histórico Aprimorado**: Interface expansível com tabela organizada e ordenação automática

### Funcionalidades
- ✅ **WhatsApp Inteligente**: Sistema de compartilhamento que usa Web Share API nativa quando disponível
- ✅ **Fallback Automático**: Fallback inteligente para WhatsApp Web com cópia automática
- ✅ **Ordenação Automática**: Histórico ordenado por data (mais recentes primeiro)
- ✅ **Formatação de Datas**: Exibição de data e hora formatadas em português brasileiro

### Arquitetura
- ✅ **Serviço de Storage**: Sistema dedicado para gerenciamento de localStorage
- ✅ **Componentes Reutilizáveis**: BaseForm e componentes de formulário modulares
- ✅ **Constantes Organizadas**: Sistema de equipes e configurações centralizadas

## 📋 Como Usar

### 1. Página Inicial
   - Acesse a aplicação e visualize as três opções principais:
     - **Baixa de Material**: Registrar materiais utilizados
     - **Requisição de Material**: Solicitar novos materiais
     - **Histórico de Baixas**: Consultar registros anteriores

### 2. Registrar Baixa de Material
   - Selecione "Baixa de Material" na página inicial
   - Preencha os dados dos técnicos (nome, matrícula, cidade, estado, endereço)
   - Informe a atividade realizada
   - Adicione os materiais utilizados (nome, código, quantidade, unidade)
   - Clique em "Compartilhar no WhatsApp"
   - O sistema tentará usar a Web Share API do dispositivo (se disponível)
   - Caso contrário, abrirá o WhatsApp Web com a mensagem formatada
   - A mensagem também será copiada automaticamente para a área de transferência
   - Os dados são automaticamente salvos no histórico local

### 3. Requisição de Material
   - Selecione "Requisição de Material" na página inicial
   - Preencha os dados dos técnicos (nome, matrícula)
   - Informe a data da requisição
   - Adicione os materiais solicitados (nome, código, quantidade, unidade)
   - Clique em "Compartilhar no WhatsApp"
   - A mensagem formatada será preparada para envio via WhatsApp
   - O sistema utiliza o mesmo mecanismo inteligente de compartilhamento

### 4. Visualizar Histórico
   - Selecione "Histórico de Baixas" na página inicial
   - Visualize todos os registros de baixa automaticamente ordenados por data (mais recentes primeiro)
   - Cada card exibe data formatada, horário, atividade e localização
   - Clique em cada card para expandir e ver detalhes completos:
     - Lista de técnicos com nome e matrícula
     - Tabela organizada de materiais utilizados (nome, código, quantidade, unidade)
   - Os cards possuem animações suaves de expansão/colapso
   - Retorne à home clicando no logo no cabeçalho

### 5. Gerenciar Dados
   - Todos os dados são automaticamente salvos no navegador (localStorage)
   - Os dados persistem entre sessões
   - Não há necessidade de configuração adicional

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Compila TypeScript e gera build de produção
npm run preview      # Preview da build de produção
npm run lint         # Executa o linter ESLint
```

## 📊 Validações de Formulário

O projeto utiliza **Zod 4.1** para validação de schemas, garantindo:

- Validação de tipos em tempo real
- Mensagens de erro personalizadas e internationalizáveis
- Validação tanto no frontend quanto na tipagem TypeScript
- Integração perfeita com React Hook Form via @hookform/resolvers
- Schema inference para máxima type safety

## 🎨 Padrões de Código

- **TypeScript**: Tipagem estrita habilitada
- **ESLint**: Configuração personalizada para React + TypeScript
- **Prettier**: Formatação consistente de código
- **Componentes**: Estrutura modular e reutilizável

## 🌟 Características Técnicas

### Performance e Build
- **Build Ultra-Rápido**: Otimizado com Vite 7.1 + SWC Plugin para compilação extremamente rápida
- **Code Splitting**: Carregamento otimizado de componentes e rotas
- **PWA Ready**: Funciona offline após primeiro carregamento com Service Worker e Web Manifest

### Arquitetura e Type Safety
- **TypeScript Estrito**: TypeScript 5.8 com tipagem estrita habilitada e inferência de tipos
- **Schema Validation**: Zod 4.1 com schemas tipados e inferência automática de tipos
- **Componentes Modulares**: Arquitetura baseada em componentes reutilizáveis e separação de responsabilidades
- **Arquitetura Limpa**: Separação clara entre páginas, componentes, serviços, tipos e utilitários

### Interface e UX
- **Design Moderno**: Tailwind CSS 4.1 com design system completo, gradientes e animações
- **Responsivo**: Design adaptável para mobile, tablet e desktop
- **Acessibilidade**: Componentes UI baseados em Radix UI com suporte a acessibilidade
- **Ícones Completos**: React Icons 5.5 + Lucide React para interface rica e consistente
- **Animações Suaves**: Transições e animações com Tailwind Animate e CSS personalizado

### Funcionalidades Avançadas
- **Roteamento Inteligente**: React Router DOM 7.9 com rotas dinâmicas e navegação contextual
- **Persistência Local**: LocalStorage com serviço dedicado para gerenciamento de dados
- **Web Share API**: Integração nativa com APIs do dispositivo quando disponível
- **Fallback Inteligente**: Sistema de fallback automático para WhatsApp Web e cópia de texto
- **Validação em Tempo Real**: Validação de formulários com feedback visual imediato usando React Hook Form
- **Ordenação Automática**: Histórico ordenado automaticamente por data (mais recentes primeiro)

### Qualidade de Código
- **Linting**: ESLint 9.3 com configuração personalizada para React + TypeScript
- **Formatação**: Prettier 3.6 para código consistente e limpo
- **Type Safety**: Tipagem estrita em todos os níveis (props, estados, funções, dados)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através de [warlleyrocha@icloud.com]

---

⚡ **Desenvolvido com React 19 + TypeScript 5.8 + Vite 7.1**

**Oficiais de Rede** - Sistema de gestão de materiais para equipes de campo
