# 🥕 Colheita Solidária – Frontend

O **Colheita Solidária** é uma plataforma web criada para facilitar a doação de alimentos excedentes por agricultores a pessoas em situação de vulnerabilidade social.

O frontend foi desenvolvido em **React.js**, com integração à **API em .NET Core** e serviços do **Firebase** e **Supabase**.

---

## 📚 Sobre o Projeto

Projeto acadêmico desenvolvido no 4º semestre do curso de DSM – Fatec Matão, com o propósito de promover solidariedade e sustentabilidade através da redistribuição de alimentos.

---

## 🎯 Objetivos (modelo SMART)

- **S**: Conectar agricultores e recebedores para doação de alimentos.  
- **M**: Meta alcançada com login, cadastro, registro e listagem de doações.  
- **A**: A equipe domina as tecnologias usadas.  
- **R**: Reduz desperdício e fome com tecnologia acessível.  
- **T**: Conclusão prevista para o 1º semestre de 2025.

---

## 🚀 Funcionalidades Principais

- ✅ Login e autenticação (Firebase AppCheck e JWT da API)  
- ✅ Cadastro de Agricultores, Recebedores e Administradores  
- ✅ Registro de doações com imagem, validade e quantidade  
- ✅ Visualização e solicitação de doações (componente `CardDoacao`)  
- ✅ Painel administrativo para controle de doações  
- ✅ Integração com API em .NET Core (backend)  
- ✅ Upload de imagens no Supabase  
- ✅ Layout responsivo e intuitivo

---

## 🧠 Integração com o Backend

O frontend consome a **API Colheita Solidária**, que fornece os dados e controla autenticação, usuários e doações.  
Toda comunicação é feita via HTTP (REST) com `fetch` e hooks personalizados (`useRegistrarDoacao`, `useListarDoacoes`, etc.).

---

## 🛠 Tecnologias Utilizadas

- **Linguagem:** JavaScript (React.js)  
- **Banco de Dados:** Firebase Firestore + Supabase  
- **Autenticação:** Firebase Auth + JWT (via API)  
- **Armazenamento:** Firebase Storage / Supabase Storage  
- **Design:** Figma  
- **Hospedagem:** Firebase Hosting  
- **Controle de Versão:** Git + GitHub  
- **Organização:** Notion e Google Drive

---

## 🧩 Estrutura do Projeto

- **pages/** – Páginas principais (Login, Cadastro, InicialRecebedor, etc.)  
- **components/** – Componentes reutilizáveis (`CardDoacao`, `Navbar`, etc.)  
- **hooks/** – Hooks personalizados para operações com API  
- **services/** – Conexão com backend e Firebase

---

## 👥 Equipe

- Miriam Silva Corrêa – Código React, Firebase, integração com API e Figma  
- Isadora Georgete – Código Backend(c#) e documentação  
- Caroline Oliveira Silva – Código Backend(c#) e documentação

---

## 💵 Orçamento Estimado

| Item                             | Custo estimado |
|---------------------------------|----------------|
| Desenvolvimento e manutenção     | R$ 10.000,00   |
| Hospedagem e infraestrutura      | R$ 1.000,00    |
| Divulgação e marketing           | R$ 2.000,00    |
| Capacitação e formação da equipe | R$ 5.000,00    |
| Logística e armazenamento físico | R$ 6.000,00    |
| **Total estimado:**              | **R$ 24.000,00** |

---

## 📈 Critérios de Sucesso

- Integração total com o backend  
- Interface intuitiva e responsiva  
- Usuários cadastrando e solicitando doações com sucesso  
- Sistema estável e acessível

---

## 🌐 Links

- 💻 **Frontend (Firebase Hosting):** [Acessar Plataforma](https://github.com/miriam-silva/ColheitaSolidaria)  
- ⚙️ **Backend (API .NET Core):** [GitHub](https://github.com/isageorgete/Back_ColheitaSolidaria/)
