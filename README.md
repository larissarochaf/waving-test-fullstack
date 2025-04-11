
# 🛒 Waving Test – Projeto Técnico Fullstack

Aplicação fullstack de e-commerce desenvolvida como parte do processo seletivo da empresa **Waving Test**. O projeto contempla tanto a experiência do usuário final quanto um painel administrativo exclusivo para administradores, com foco em boas práticas, UX moderna e código organizado.

---

## ✨ Funcionalidades

### 🛍️ Área do usuário
- Visualização de lista de produtos
- Página de detalhes do produto
- Adição de itens ao carrinho com feedback visual (toast)
- Finalização de pedido
- Redirecionamento automático para confirmação

### 🛠️ Área administrativa
- Login com autenticação de administrador
- CRUD completo de produtos
- Visualização de pedidos realizados por usuários

---

## 🧠 Tecnologias utilizadas

### Frontend
- [Next.js](https://nextjs.org/)
- [React Query](https://tanstack.com/query/latest)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/)
- React Context API (gerenciamento de estado do carrinho)

### Backend
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 🔍 Detalhes técnicos

### 📱 Frontend – Next.js + TailwindCSS

A interface foi desenvolvida com foco em performance e experiência do usuário. Utilizando Next.js com rotas baseadas em arquivos (`pages/`), React Query para controle de estado assíncrono e TailwindCSS com shadcn/ui para estilização rápida e moderna.

**Principais pontos:**

- Estrutura baseada em `pages/` com rotas para:
  - `/`: lista de produtos
  - `/product/[id]`: página de detalhes
  - `/cart`: carrinho de compras
  - `/checkout`: finalização de pedido
  - `/admin`: login de administrador
  - `/admin/orders`: visualização de pedidos

- Gerenciamento do carrinho com **React Context**, persistindo no localStorage
- Toasts estilizados com `@/components/ui/use-toast`
- Redirecionamentos automáticos após ações (ex: finalizar pedido, login)
- Layout modular e reutilização de componentes (`ProductCard`, `CartItem`, etc.)

---

### 🔧 Backend – NestJS + Prisma

A API foi construída com NestJS utilizando estrutura modular, garantindo escalabilidade e organização. A persistência de dados é feita com Prisma e banco SQLite para facilitar a execução local.

**Principais módulos e responsabilidades:**

- `products/`: CRUD de produtos (usado na área pública e no painel admin)
- `cart/`: módulo de estruturação de itens do carrinho (auxiliar)
- `order/`: criação e listagem de pedidos
- `auth/`: autenticação de administrador com validação básica (token em memória)
- `prisma/`: camada de acesso ao banco e migrações

**Outros pontos:**

- Banco de dados: SQLite
- Migrations versionadas com `Prisma Migrate`
- Tipagem automática gerada a partir do schema Prisma
- Validações com `class-validator`
- Organização por DTOs, serviços e controladores
- `ValidationPipe` aplicado no `main.ts` para garantir que os dados enviados aos endpoints estejam em conformidade com os DTOs, aumentando a robustez e segurança da API
- A documentação da API via Swagger não foi incluída devido a um conflito de versão entre `@nestjs/swagger` e o NestJS v10. Como a prioridade foi a entrega funcional e integrada da aplicação, essa funcionalidade poderá ser implementada posteriormente, se houver interesse

- Banco de dados: SQLite
- Migrations versionadas com `Prisma Migrate`
- Tipagem automática gerada a partir do schema Prisma
- Validações com `class-validator`
- Organização por DTOs, serviços e controladores

---

## 🔐 Autenticação

- A área administrativa requer login com autenticação básica.
- O formulário de login possui validação de e-mail e senha, impedindo envio com campos inválidos.
- Existe um **checkbox “Lembrar acesso”** que persiste a autenticação no localStorage enquanto o usuário desejar.
- Após login bem-sucedido, o usuário é redirecionado automaticamente para o painel administrativo.

---

## 👥 Credenciais para teste

### 👤 Usuário comum

```
E-mail: admin@teste.com
Senha: 123456
```

> Pode ser utilizado para navegar pela área pública do site e realizar pedidos.

### 👩‍💼 Administrador

```
E-mail: admin@teste.com
Senha: admin123
```

> Com essas credenciais, é possível acessar a área administrativa para visualizar pedidos realizados.

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos
- Node.js instalado
- Yarn ou npm instalados

### 1. Clone o repositório

```bash
git clone https://github.com/larissarochaf/waving-case.git
cd waving-case
```

### 2. Rodando o backend

```bash
cd backend
cp .env.example .env   # Crie seu .env baseado no exemplo
npm install
npx prisma migrate dev
npm run start:dev
```

> O projeto utiliza SQLite, então não é necessário configurar um banco externo.

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
└── frontend/   # Interface em Next.js com TailwindCSS e React Query
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
