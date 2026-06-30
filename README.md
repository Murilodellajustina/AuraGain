# 💪 AuraGain

> Plataforma web para gerenciamento de treinos de musculação e acompanhamento da evolução física de alunos e Personal Trainers.

![Java](https://img.shields.io/badge/Java-17-red?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green?logo=springboot)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-purple?logo=vite)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![License](https://img.shields.io/badge/License-Academic-lightgrey)

---

# 📖 Sobre o Projeto

O **AuraGain** é uma plataforma web desenvolvida para auxiliar **Personal Trainers** e **alunos** no gerenciamento de treinos e acompanhamento da evolução física.

A aplicação permite a criação de fichas de treino personalizadas, registro da execução dos exercícios, acompanhamento da progressão das cargas e monitoramento das medidas corporais, proporcionando um ambiente completo para avaliação do desempenho físico.

O sistema foi desenvolvido seguindo uma arquitetura **cliente-servidor**, separando Back-end e Front-end para facilitar manutenção, escalabilidade e organização do código.

---

# ✨ Funcionalidades

- 👤 Cadastro e gerenciamento de usuários
- 🏋️ Cadastro de Personal Trainers e alunos
- 🤝 Vínculo entre aluno e personal
- 📋 Criação e edição de fichas de treino
- 💪 Registro das cargas utilizadas durante os treinos
- 📈 Histórico de evolução das cargas
- 📏 Cadastro de medidas corporais
- ⚖️ Cálculo automático do IMC
- 📊 Gráficos de evolução física
- 📄 Exportação da ficha de treino em PDF
- 🌎 Internacionalização (Português, Inglês e Espanhol)

---

# 🏗 Arquitetura

```text
AuraGain
│
├── backend
│   ├── config
│   ├── controller
│   ├── dto
│   ├── model
│   ├── repository
│   ├── service
│   └── resources
│
└── frontend
    ├── components
    ├── hooks
    ├── imagens
    ├── pages
    ├── Services
    └── App.jsx
```

---

# 🛠 Tecnologias

## Back-end

- Java 17
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- PostgreSQL
- Swagger/OpenAPI
- Javadoc

## Front-end

- React 19
- Vite
- React Router DOM
- Axios
- Bootstrap 5
- Recharts
- jsPDF
- React Select
- i18next
- react-i18next

---

# 🗄 Modelo de Dados

O banco de dados foi modelado para atender o gerenciamento completo dos usuários e seus treinos.

### Principais entidades

- Usuário
- Treino
- Exercício
- TreinoExercício
- ProgressoCarga
- MedidaFísica
- Vínculo Personal

### Relacionamentos

- Um usuário pode possuir vários treinos;
- Cada treino possui diversos exercícios;
- Cada exercício registra sua evolução de carga;
- Cada usuário possui diversas avaliações físicas;
- Um Personal Trainer pode acompanhar vários alunos.

---

# 🚀 Executando o Projeto

## Pré-requisitos

- Java 17+
- Maven
- Node.js 18+
- npm
- PostgreSQL

---

## Clonando o projeto

```bash
git clone https://github.com/Murilodellajustina/AuraGain.git

cd AuraGain
```

---

## Back-end

Entre na pasta:

```bash
cd backend
```

Configure o arquivo:

```
src/main/resources/application.properties
```

Exemplo:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/auragain
spring.datasource.username=postgres
spring.datasource.password=senha

spring.jpa.hibernate.ddl-auto=update
```

Execute:

```bash
mvn spring-boot:run
```

Servidor:

```
http://localhost:8080
```

---

## Front-end

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

Servidor:

```
http://localhost:5173
```

---

# 📂 Estrutura do Projeto

```text
backend
├── config
├── controller
├── dto
├── model
├── repository
├── service
└── resources

frontend
├── components
├── hooks
├── imagens
├── pages
├── Services
├── App.jsx
└── main.jsx
```

---

# 🌎 Internacionalização

O sistema possui suporte para três idiomas utilizando **i18next**:

- 🇧🇷 Português
- 🇺🇸 English
- 🇪🇸 Español

O idioma é detectado automaticamente conforme o navegador do usuário.

---

# 📊 Funcionalidades do Sistema

## 👨‍🎓 Aluno

- Visualizar treinos
- Cadastrar treinos
- Executar treino
- Registrar cargas
- Registrar medidas corporais
- Acompanhar evolução
- Gerar PDF da ficha

## 🏋️ Personal Trainer

- Cadastro de alunos
- Gerenciamento de vínculos
- Criação de treinos
- Edição de treinos
- Acompanhamento da evolução dos alunos

---

# 📈 Evolução Física

O sistema permite acompanhar:

- Peso
- Altura
- IMC
- Circunferências corporais
- Evolução das cargas
- Histórico completo das avaliações

Os gráficos são gerados utilizando a biblioteca **Recharts**.

---

# 📚 Documentação

A API REST é documentada utilizando **Swagger/OpenAPI**.

Após iniciar o Back-end, acesse:

```
http://localhost:8080/swagger-ui/index.html
```

A documentação do código Java foi gerada utilizando **Javadoc**.

---

# 📦 Dependências Front-end

- React
- Vite
- Axios
- Bootstrap
- React Router DOM
- Recharts
- jsPDF
- React Select
- i18next
- react-i18next

---

# 📸 Telas do Sistema

## Login e Página Inicial

<p align="center">
  <img src="Assets/TelaLoginAuraGain.png" alt="Tela de Login" width="45%">
  <img src="Assets/TelaInicialAuraGain.png" alt="Tela Inicial" width="45%">
</p>

---

## Evolução e Cadastro

<p align="center">
  <img src="Assets/TelaEvolucaoAuraGain.png" alt="Tela de Evolução" width="45%">
  <img src="Assets/TelaCadastrarAuraGain.png" alt="Tela de Cadastro" width="45%">
</p>

---

## Área do Personal e Iniciar Treino

<p align="center">
  <img src="Assets/TelaAreaDoPersonal.png" alt="Área do Personal" width="45%">
  <img src="Assets/TelaIniciarTreino.png" alt="Iniciar Treino" width="45%">
</p>

---

## Medidas Corporais e Perfil

<p align="center">
  <img src="Assets/TelaMedidasAuraGain.png" alt="Medidas Corporais" width="45%">
  <img src="Assets/TelaPerfil.png" alt="Tela de Perfil" width="45%">
</p>

---

# 👥 Autores

Desenvolvido por:

- **Murilo Della Justina**
- **Lucas Presotto Costa**

---

# 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos e educacionais.

---

## ⭐ AuraGain

Uma plataforma moderna para conectar **Personal Trainers** e **alunos**, oferecendo uma experiência completa no gerenciamento de treinos, acompanhamento de desempenho e evolução física.