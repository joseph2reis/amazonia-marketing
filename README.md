# 🌿 Amazonia - Plataforma E-commerce da Amazônia

Uma plataforma completa de e-commerce focada em conectar produtores e fornecedores de produtos amazônicos com compradores interessados, promovendo o desenvolvimento sustentável da região amazônica.

![Next.js](https://img.shields.io/badge/Next.js-15.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-5.0-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-blue)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-5.0-orange)

## 📋 Sobre o Projeto

A **Amazonia** é uma plataforma digital que visa:

- 🌱 **Promover produtos amazônicos** de forma sustentável
- 🤝 **Conectar produtores locais** com consumidores conscientes
- 📊 **Oferecer ferramentas administrativas** para gestão de empresas e produtos
- 🔒 **Garantir segurança e transparência** em todas as transações
- 📱 **Fornecer experiência excepcional** em dispositivos móveis e desktop

## 🚀 Funcionalidades

### 👤 Para Usuários
- ✅ **Cadastro e autenticação** completa
- ✅ **Perfil de empresa** com informações detalhadas
- ✅ **Cadastro de produtos** com imagens e descrições
- ✅ **Dashboard pessoal** para gerenciamento
- ✅ **Sistema de aprovação** de produtos

### 👨‍💼 Para Administradores
- ✅ **Painel administrativo** completo
- ✅ **Aprovação de empresas** e produtos
- ✅ **Gestão de usuários** e conteúdos
- ✅ **Relatórios e estatísticas** em tempo real
- ✅ **Controle de qualidade** dos produtos

### 🌐 Interface e UX
- ✅ **Design responsivo** para todos os dispositivos
- ✅ **Modais interativos** para termos e privacidade
- ✅ **Navegação inteligente** com breadcrumbs
- ✅ **Feedback visual** em tempo real
- ✅ **Acessibilidade** WCAG 2.1 compatível

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Animações fluidas
- **React Hook Form** - Gerenciamento de formulários
- **React Icons** - Biblioteca de ícones

### Backend
- **Next.js API Routes** - API RESTful
- **Prisma ORM** - Mapeamento objeto-relacional
- **SQLite** - Banco de dados para desenvolvimento
- **NextAuth.js** - Autenticação e autorização
- **bcryptjs** - Hashing de senhas

### DevOps & Qualidade
- **ESLint** - Linting de código
- **Prettier** - Formatação automática
- **Husky** - Git hooks
- **Commitlint** - Padronização de commits

## 📦 Instalação e Configuração

### Pré-requisitos
- **Node.js** 18.0 ou superior
- **pnpm** (recomendado) ou npm/yarn
- **Git**

### 1. Clone o repositório
```bash
git clone https://github.com/joseph2reis/amazonia.git
cd amazonia
```

### 2. Instale as dependências
```bash
# Com pnpm (recomendado)
pnpm install

# Ou com npm
npm install

# Ou com yarn
yarn install
```

### 3. Configure o banco de dados
```bash
# Execute as migrações do Prisma
npx prisma migrate dev

# (Opcional) Abra o Prisma Studio para visualizar o banco
npx prisma studio
```

### 4. Configure as variáveis de ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o .env com suas configurações
nano .env
```

**Variáveis obrigatórias:**
```env
# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua-chave-secreta-super-segura

# Banco de dados (SQLite para desenvolvimento)
DATABASE_URL="file:./dev.db"

# (Opcional) Upload de imagens
CLOUDINARY_CLOUD_NAME=sua-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=sua-api-secret
```

### 5. Execute o projeto
```bash
# Modo desenvolvimento
pnpm dev

# Build para produção
pnpm build
pnpm start

# Ou com npm
npm run dev
npm run build
npm start
```

### 6. Acesse a aplicação
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
amazonia/
├── app/                          # Next.js App Router
│   ├── (site)/                   # Páginas públicas
│   │   ├── auth/                 # Autenticação
│   │   ├── complete-company/     # Cadastro de empresa
│   │   ├── privacy/             # Política de privacidade
│   │   ├── terms/               # Termos de uso
│   │   └── produto/             # Página de produto
│   ├── api/                     # API Routes
│   │   ├── admin/               # Rotas administrativas
│   │   ├── auth/                # Autenticação
│   │   └── products/            # Produtos
│   ├── components/              # Componentes React
│   │   ├── auth/                # Componentes de auth
│   │   ├── ecommerce/           # Componentes de e-commerce
│   │   ├── forms/               # Formulários
│   │   ├── layout/              # Layout e navegação
│   │   ├── marketing/           # Landing page
│   │   └── ui/                  # Componentes UI reutilizáveis
│   ├── dashboard/               # Área logada
│   ├── services/                # Lógica de negócio
│   └── types/                   # Tipos TypeScript
├── prisma/                      # Schema do banco
├── public/                      # Assets estáticos
└── scripts/                     # Scripts utilitários
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev          # Inicia servidor de desenvolvimento
pnpm build        # Build para produção
pnpm start        # Inicia servidor de produção
pnpm lint         # Executa ESLint

# Banco de dados
pnpm prisma:studio    # Abre Prisma Studio
pnpm prisma:migrate   # Executa migrações
pnpm prisma:generate  # Gera cliente Prisma

# Utilitários
pnpm type-check       # Verifica tipos TypeScript
pnpm clean            # Limpa cache e node_modules
```

## 🔐 Autenticação e Autorização

### Sistema de Roles
- **USER**: Usuário comum (produtores/vendedores)
- **ADMIN**: Administrador com acesso total

### Fluxo de Cadastro
1. **Registro** → Cria conta de usuário
2. **Complete Company** → Preenche dados da empresa
3. **Pending Approval** → Aguarda aprovação do admin
4. **Dashboard** → Acesso liberado após aprovação

## 📊 Dashboard Administrativo

### Funcionalidades do Admin
- 👥 **Gerenciar Empresas**: Aprovar/rejeitar cadastros
- 📦 **Gerenciar Produtos**: Moderar conteúdo
- 📈 **Visualizar Estatísticas**: Métricas em tempo real
- 👤 **Gerenciar Usuários**: Controle de acessos

### Relatórios Disponíveis
- 📊 Número total de usuários
- 🏢 Empresas ativas vs pendentes
- 📦 Produtos por status
- 📈 Crescimento mensal

## 🎨 Design System

### Cores Principais
- **Primary**: Verde amazônico (#22c55e)
- **Secondary**: Verde escuro (#16a34a)
- **Background**: Tons neutros e naturais
- **Text**: Contraste otimizado

### Componentes UI
- **Modal**: Sistema de modais reutilizável
- **Form**: Componentes de formulário padronizados
- **Card**: Cards para produtos e informações
- **Button**: Botões com variantes (primary, secondary, outline)

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente
3. Execute `prisma migrate deploy` para produção
4. Deploy automático a cada push

### Outras Opções
- **Railway**: Deploy full-stack com banco incluído
- **Render**: Serviço de hosting com PostgreSQL
- **Docker**: Containerização para qualquer provedor

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- **TypeScript** obrigatório em todos os arquivos
- **ESLint** e **Prettier** configurados
- **Conventional Commits** para mensagens
- **Testes** incentivados (futuramente)

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Josenildo Reis** 
- **Pâmela Costa**
- **Ariane**
- **Jhulielson**

## 📞 Suporte

- 📧 **Email**: contato@amazonia.com.br
- 🐛 **Issues**: [GitHub Issues](https://github.com/joseph2reis/amazonia/issues)
- 💬 **Discussões**: [GitHub Discussions](https://github.com/joseph2reis/amazonia/discussions)

## 🙏 Agradecimentos

- 🌿 **Comunidades amazônicas** por preservarem a biodiversidade
- 👨‍💻 **Comunidade Next.js** pela documentação excepcional
- 🛠️ **Contribuições open source** que tornam tudo possível

---

<div align="center">
  <p>Feito com ❤️ para preservar e valorizar a Amazônia</p>
  <img src="https://img.shields.io/github/stars/joseph2reis/amazonia?style=social" alt="Stars">
  <img src="https://img.shields.io/github/forks/joseph2reis/amazonia?style=social" alt="Forks">
</div>
