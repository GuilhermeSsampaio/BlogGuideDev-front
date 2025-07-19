# BlogGuide Frontend 🚀

Uma plataforma moderna para desenvolvedores compartilharem conhecimento, projetos e ideias.

## 📋 Sobre o Projeto

O BlogGuide é um blog/rede social focada em desenvolvedores, onde é possível:

- 📝 Criar e compartilhar posts sobre tecnologia
- 💡 Compartilhar ideias de projetos
- 👥 Conectar-se com outros desenvolvedores
- 🔐 Sistema completo de autenticação
- 📱 Interface responsiva

## 🛠️ Tecnologias Utilizadas

### Core

- **React 19** - Biblioteca principal
- **Vite** - Build tool e dev server
- **React Router Dom** - Roteamento
- **Bootstrap 5** - Framework CSS

### Desenvolvimento

- **ESLint** - Linting
- **JavaScript** - Linguagem principal

### Estilização

- **Bootstrap Icons** - Ícones
- **Google Fonts (Jersey 25)** - Tipografia customizada
- **CSS customizado** - Estilos específicos

## 🏗️ Arquitetura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.jsx      # Cabeçalho da aplicação
│   ├── Footer.jsx      # Rodapé com navegação mobile
│   ├── PostCard.jsx    # Card de exibição de posts
│   ├── PostForm.jsx    # Formulário de criação/edição
│   └── ProtectedRoute.jsx # Proteção de rotas
├── contexts/           # Contextos React
│   ├── AuthContext.jsx # Contexto de autenticação
│   └── AuthProvider.jsx # Provider de autenticação
├── handlers/           # Lógica de negócio
│   ├── globalHandlers.jsx # Handlers globais
│   ├── loginHandler.jsx   # Lógica de login
│   ├── registerHandler.jsx # Lógica de registro
│   └── postHandler.jsx    # Lógica de posts
├── hooks/              # Custom hooks
│   ├── useAuth.js      # Hook de autenticação
│   └── usePosts.js     # Hook de posts
├── pages/              # Páginas da aplicação
│   ├── BlogPage.jsx    # Página inicial (pública)
│   ├── LoginPage.jsx   # Página de login
│   ├── RegisterPage.jsx # Página de registro
│   ├── CriarPostPage.jsx # Página de criação de posts
│   ├── IdeiasPage.jsx  # Página de ideias
│   ├── SobrePage.jsx   # Página sobre
│   └── UserPage.jsx    # Perfil do usuário
├── routes/             # Configuração de rotas
│   ├── index.js        # Barrel exports
│   ├── AppRoutes.jsx   # Componente de rotas
│   ├── routes.js       # Configuração das rotas
│   └── constants.js    # Constantes de rotas
└── services/           # Serviços de API
    ├── auth.js         # Serviço de autenticação
    └── api/
        └── bridge.js   # Serviço principal de API
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

1. **Clone o repositório**

```bash
git clone <repository-url>

```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
VITE_API_URL=http://localhost:8000
```

4. **Execute em modo de desenvolvimento**

```bash
npm run dev
```

5. **Acesse a aplicação**

```
http://localhost:5173
```

## 📝 Scripts Disponíveis

```bash
npm run dev      # Executa em modo desenvolvimento
npm run build    # Cria build de produção
npm run preview  # Preview do build de produção
npm run lint     # Executa linting
```

## 🔐 Sistema de Autenticação

### Rotas Públicas

- `/` - Página inicial (preview do blog)
- `/login` - Página de login
- `/register` - Página de registro

### Rotas Protegidas

- `/ideias` - Página de ideias
- `/sobre` - Página sobre
- `/usuario` - Perfil do usuário
- `/criar-post` - Criação de posts

## 🎨 Funcionalidades

### 📱 Interface Responsiva

- Design mobile-first
- Navegação adaptativa
- Componentes responsivos

### 🔒 Autenticação Completa

- Login/registro de usuários
- Proteção de rotas privadas
- Persistência de sessão
- Redirecionamento inteligente

### 📝 Sistema de Posts

- Criação de posts com rich text
- Upload de imagens via URL
- Sistema de tags
- Categorização
- Preview em tempo real

### 🎯 Experiência do Usuário

- Loading states
- Tratamento de erros
- Feedback visual
- Navegação intuitiva

## 🌐 Integração com Backend

A aplicação se conecta com uma API FastAPI:

- **Base URL**: Configurada via `VITE_API_URL`
- **Autenticação**: JWT Tokens
- **Endpoints**: Posts, Auth, Users

## 📦 Build e Deploy

### Build Local

```bash
npm run build
```

### Deploy (Vercel)

O projeto inclui configuração para Vercel (`vercel.json`):

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🎨 Customização de Estilo

### Cores Principais

```css
.azul {
  color: #333ceb; /* Azul principal */
}
```

### Tipografia

- **Jersey 25** - Fonte principal
- **Bootstrap** - Classes utilitárias

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Desenvolvedor

**Guilherme Sampaio**
Dev fundador

---

Feito com ❤️ para a comunidade de desenvolvedores
(este readme não está pronto ainda)
