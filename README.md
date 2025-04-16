
# 🛒 Waving Test – Projeto Técnico Fullstack

Aplicação fullstack de e-commerce desenvolvida como parte do processo seletivo da **Waving Test**.  
O projeto contempla tanto a experiência do usuário final quanto um painel administrativo para gestão de produtos e pedidos, com foco em boas práticas, UX moderna e código organizado.

---

## ✨ Funcionalidades

### 🛍️ Área do usuário
- Visualização de produtos
- Página de detalhes do produto
- Adição de itens ao carrinho com feedback visual (toast)
- Finalização de pedido com redirecionamento automático

### 🛠️ Área administrativa
- Login com autenticação de administrador
- CRUD completo de produtos
- Visualização de pedidos realizados

---

## 🧠 Tecnologias utilizadas

### Frontend
- Next.js
- React Query
- TailwindCSS
- shadcn/ui
- TypeScript
- React Context API (carrinho)

### Backend
- NestJS
- Prisma ORM
- SQLite
- TypeScript

---

## 🔧 Arquitetura e principais decisões

### 📱 Frontend

Construído com **Next.js**, focando em performance e experiência do usuário.  
Utiliza React Query para estado assíncrono e TailwindCSS + shadcn/ui para estilização ágil e responsiva.

- Estrutura baseada em `pages/`:
  - `/` – lista de produtos
  - `/product/[id]` – detalhes do produto
  - `/cart` – carrinho
  - `/checkout` – finalização de pedido
  - `/admin` – login de administrador
  - `/admin/orders` – pedidos realizados

- Gerenciamento de carrinho com Context API (persistido no localStorage)
- Navegação com redirecionamento automático após ações (ex: login, compra)
- Componentes reutilizáveis e modularizados

### 🔧 Backend

Desenvolvido com NestJS e Prisma ORM, organizado por módulos com responsabilidades claras.

- `products/`: CRUD de produtos (público e admin)
- `cart/`: estrutura e persistência dos itens do carrinho
- `order/`: criação e listagem de pedidos
- `auth/`: autenticação de administrador e usuário cliente
- `prisma/`: conexão e acesso ao banco SQLite

**Destaques:**
- Migrations com `Prisma Migrate`
- Tipagem automática gerada via Prisma
- DTOs, services e controllers organizados
- `ValidationPipe` global para segurança e validação
- API sem Swagger (por conflito com versão do NestJS 10), mas com estrutura pronta para futura implementação

---

## 🔐 Autenticação

- Área administrativa com login protegido
- Validação de formulário (e-mail e senha)
- Opção “Lembrar acesso” (persistência no localStorage)
- Após login, redirecionamento automático para o painel admin

---

## 👥 Credenciais para teste

### 👤 Usuário comum

```
E-mail: cliente@teste.com  
Senha: 123456
```

> Pode ser usado para navegar, visualizar produtos e realizar pedidos.

### 👩‍💼 Administrador

```
E-mail: admin@teste.com  
Senha: admin123
```

> Permite acesso à área administrativa para gerenciar produtos e visualizar pedidos.

> 💡 Os e-mails são distintos para evitar conflitos de autenticação e facilitar a separação dos fluxos de acesso.

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos
- Node.js instalado
- Yarn ou npm

### 1. Clone o repositório

```bash
git clone https://github.com/larissarochaf/waving-case.git
cd waving-case
```

### 2. Rodando o backend

```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npm run start:dev
```

> O projeto usa SQLite — não é necessário configurar banco de dados externo.

### 3. Rodando o frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📦 Estrutura de pastas

```
waving-case/
├── backend/    # API NestJS com Prisma e SQLite
└── frontend/   # Interface Next.js com TailwindCSS e React Query
```

---

## 🐱 Homenagem especial

Este projeto é dedicado à **Luna**.  
Com sua companhia silenciosa e julgadora, ela supervisionou cada linha de código como uma verdadeira tech lead felina. 👑🐾

---

## 👩‍💻 Sobre o projeto

Desenvolvido por [@larissarochaf](https://github.com/larissarochaf) como parte do processo seletivo da **Waving Test**.  
Feito com carinho, TypeScript e muito café. ☕💙

---
