# AuraGain 💪

## Sobre o Projeto
O AuraGain é um sistema web inovador focado no gerenciamento de treinos de musculação e acompanhamento de evolução física. O objetivo principal é fornecer aos alunos e *Personal Trainers* uma plataforma onde seja possível criar fichas de treino personalizadas, registrar as cargas levantadas no dia a dia e acompanhar a progressão de medidas corporais através de gráficos dinâmicos e relatórios.

## 🚀 Como Instalar e Executar

### Pré-requisitos
* Java 17+ e Maven
* Node.js (v18+) e NPM
* Banco de Dados Relacional (PostgreSQL ou MySQL)

### Passos para o Back-end (Spring Boot)
1. Navegue até a pasta `/backend`.
2. Configure as credenciais do seu banco de dados no arquivo `src/main/resources/application.properties`.
3. Execute o comando para baixar as dependências e iniciar o servidor:
   ```bash
   mvn spring-boot:run