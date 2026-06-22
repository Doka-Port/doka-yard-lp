# 🚢 Doka Yard Intelligence — Landing Page

<p align="center">
  <img src="public/LogoWhite.svg" alt="Doka Yard Intelligence Logo" width="120" style="background:#111;border-radius:12px;padding:16px;" />
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img alt="Vite" src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" />
  <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

<p align="center">
  <strong>Landing page institucional da Doka Yard Intelligence</strong><br/>
  Plataforma de inteligência operacional para gestão de pátios portuários, alimentada por <em>YMS (Yard Management System)</em> com tecnologia de ponta.
</p>

<p align="center">
  <a href="#-acesso-%C3%A0-aplica%C3%A7%C3%A3o">Deploy</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-equipe">Equipe</a> •
  <a href="#-pré-requisitos">Pré-requisitos</a> •
  <a href="#-instalação-e-configuração">Instalação</a> •
  <a href="#-uso">Uso</a> •
  <a href="#-estrutura-do-projeto">Estrutura</a> •
  <a href="#-licença">Licença</a>
</p>

---

## 🌐 Acesso à Aplicação

O projeto está disponível em produção através do link abaixo:
 
> **<a href="https://doka-yard-lp.onrender.com" target="_blank" rel="noopener noreferrer">Acessar a Plataforma 🚀</a>**


---

## 📖 Descrição

A **Doka Yard Intelligence** é uma solução de inteligência para operações portuárias que oferece visibilidade completa e controle em tempo real sobre a gestão de pátios. Esta landing page foi desenvolvida para apresentar a plataforma, seus diferenciais e funcionalidades de maneira moderna, interativa e visualmente impactante.

### Destaques da página

- **Hero Section** — Apresentação imersiva com animações de entrada
- **Statement** — Proposta de valor clara e direta
- **Steps** — Fluxo de funcionamento passo a passo
- **YMS Section** — Seção animada com partículas que destaca o Yard Management System
- **About** — Informações sobre a empresa e sua missão
- **Contact / CTA** — Chamada para ação com formulário de contato
- **Footer** — Navegação complementar e informações legais

---

## 🛠 Tecnologias

| Categoria        | Tecnologia                                              |
| ---------------- | ------------------------------------------------------- |
| **Framework**    | [React](https://react.dev/) 18                          |
| **Build Tool**   | [Vite](https://vitejs.dev/) 6                           |
| **Estilo**       | [Tailwind CSS](https://tailwindcss.com/) 4              |
| **Componentes**  | [Radix UI](https://www.radix-ui.com/), [MUI](https://mui.com/) |
| **Animações**    | [Motion](https://motion.dev/) (Framer Motion)           |
| **Ícones**       | [Lucide React](https://lucide.dev/)                     |
| **Linguagem**    | TypeScript / TSX                                        |

---

## 👥 Equipe

| Nome                        | Papel       |
| --------------------------- | ----------- |
| **Murilo Bauck**            | Membro      |
| **Victor de Toledo**        | Membro      |
| **Jonatás Gandra**          | Membro      |
| **Leonardo Arruma Ferreira**| Membro      |

---

## ✅ Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [**Node.js**](https://nodejs.org/) >= 18.x
- [**npm**](https://www.npmjs.com/) >= 9.x (ou [**pnpm**](https://pnpm.io/))
- [**Git**](https://git-scm.com/)

---

## 🚀 Instalação e Configuração

1. **Clone o repositório**

   ```bash
   git clone https://github.com/Doka-Port/doka-yard-lp.git
   cd doka-yard-lp
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

---

## 💻 Uso

### Servidor de desenvolvimento

Inicie o servidor de desenvolvimento com hot-reload:

```bash
npm run dev
```

A aplicação estará disponível em **http://localhost:5173** (porta padrão do Vite).

---

## 📁 Estrutura do Projeto

```
landing_page_doka/
├── public/                  # Arquivos estáticos (logo, imagens)
│   ├── LogoWhite.svg
│   └── reuniao.jpg
├── src/
│   ├── app/
│   │   ├── App.tsx          # Componente raiz da aplicação
│   │   └── components/      # Componentes da landing page
│   │       ├── port-navbar.tsx
│   │       ├── port-hero.tsx
│   │       ├── port-statement.tsx
│   │       ├── port-steps.tsx
│   │       ├── port-features.tsx
│   │       ├── port-process.tsx
│   │       ├── port-yms.tsx
│   │       ├── port-about.tsx
│   │       ├── port-contact.tsx
│   │       ├── port-cta.tsx
│   │       ├── port-footer.tsx
│   │       └── ui/          # Componentes de UI reutilizáveis
│   ├── imports/             # Importações e configurações
│   ├── styles/              # Estilos globais
│   └── main.tsx             # Ponto de entrada da aplicação
├── index.html               # HTML template
├── vite.config.ts           # Configuração do Vite
├── package.json             # Dependências e scripts
├── postcss.config.mjs       # Configuração do PostCSS
└── README.md                # Este arquivo
```

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.

```
MIT License

Copyright (c) 2025 Doka Yard Intelligence

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
