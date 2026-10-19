# 🍽️ Saborê — Plataforma de Pedidos com Microfrontends

O **Saborê** é uma aplicação web de pedidos de comida desenvolvida com **Next.js, React e Module Federation**, utilizando uma arquitetura de microfrontends para separar as responsabilidades da aplicação em módulos independentes.

O projeto foi desenvolvido como parte de um exercício prático de arquitetura frontend, com foco em modularização, integração entre aplicações e organização de código.

## ✨ Funcionalidades

- **Cardápio digital:** exibição de pratos, imagens, descrições e preços.
- **Carrinho de pedidos:** adição de pratos, agrupamento de itens iguais e controle de quantidades.
- **Cálculo automático:** atualização dos valores dos itens e do total do pedido.
- **Remoção de itens:** possibilidade de remover unidades do carrinho.
- **Finalização do pedido:** formulário com dados do cliente e opção de retirada ou entrega.
- **Confirmação do pedido:** apresentação de uma confirmação local com identificação do pedido.
- **Testes automatizados:** testes dos principais comportamentos do carrinho e do checkout.

> **Observação:** a confirmação do pedido é realizada localmente. O projeto não possui integração com banco de dados, envio real para um restaurante ou processamento de pagamentos.

## 🏗️ Arquitetura

A aplicação é dividida em três projetos:

| Aplicação | Porta | Responsabilidade |
|---|---:|---|
| `container-app` | 3000 | Aplicação principal, responsável por reunir os microfrontends. |
| `micro-cardapio` | 3001 | Apresentação do cardápio e seleção dos pratos. |
| `micro-pedido` | 3002 | Gerenciamento do carrinho e finalização dos pedidos. |

A integração entre os módulos utiliza **Webpack Module Federation**, permitindo que o container consuma componentes expostos pelas aplicações remotas.

O cardápio e o carrinho também se comunicam por meio de eventos personalizados do navegador, utilizando o evento `sabore:adicionar-item` para transmitir os pratos selecionados.

### Fluxo simplificado

```text
                    Saborê
                       |
                 Container App
                  localhost:3000
                       |
             Module Federation
                /           \
               /             \
      Micro Cardápio      Micro Pedido
      localhost:3001      localhost:3002
               |                 |
       Seleção de pratos    Carrinho e checkout
               |                 |
               +-- Evento -------+
                 personalizado
```

## 🛠️ Tecnologias utilizadas

- **JavaScript**
- **React**
- **Next.js 14**
- **Webpack**
- **Webpack Module Federation**
- **CSS Modules**
- **Jest**
- **React Testing Library**
- **Testing Library Jest DOM**
- **Node.js e npm**

## 📂 Estrutura do projeto

```text
microfrontends-sabore/
├── container-app/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── next.config.js
│   └── package.json
│
├── micro-cardapio/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── next.config.js
│   └── package.json
│
├── micro-pedido/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── __tests__/
│   │   └── Pedido.test.js
│   ├── jest.config.js
│   ├── jest.setup.js
│   └── package.json
│
└── README.md
```

*Nota: a estrutura acima destaca os principais diretórios e arquivos; outros arquivos de configuração podem existir em cada aplicação.*

## ⚙️ Pré-requisitos

Antes de executar o projeto, instale:

- [Node.js](https://nodejs.org/)
- npm, incluído na instalação do Node.js
- Git, caso deseje clonar o repositório

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Andersonaloy/Sabore.git
```

Entre na pasta do projeto:

```bash
cd Sabore
```

### 2. Instale as dependências

Execute os comandos abaixo em cada aplicação:

```bash
cd ../container-app
npm install
```

```bash
cd ../micro-cardapio
npm install
```

```bash
cd ../micro-pedido
npm install
```

### 3. Inicie as aplicações

Abra **três terminais**, mantendo cada aplicação em execução separadamente.

**Terminal 1 — Container App**

```bash
cd container-app
npm run dev
```

**Terminal 2 — Micro Cardápio**

```bash
cd micro-cardapio
npm run dev
```

**Terminal 3 — Micro Pedido**

```bash
cd micro-pedido
npm run dev
```

Acesse a aplicação principal no navegador:

**http://localhost:3000**

Mantenha os três servidores ativos para que o container possa carregar os módulos remotos.

## 🧪 Testes automatizados

Os testes automatizados do microfrontend de pedidos utilizam Jest e React Testing Library.

Para executar os testes, acesse a pasta `micro-pedido` e execute:

```bash
npm test
```

Os testes cobrem:

- Exibição do carrinho vazio.
- Recebimento de pratos por eventos personalizados.
- Agrupamento de itens e cálculo dos valores.
- Remoção de itens.
- Abertura do formulário de finalização.
- Confirmação do pedido e apresentação do total.

### Resultado dos testes

**6 testes aprovados**, validando os comportamentos principais do carrinho e do checkout durante a execução dos testes.

## 🏗️ Build de produção

Cada aplicação possui seu próprio processo de build.

Execute os comandos em cada pasta:

```bash
npm run build
```

O comando verifica e compila a respectiva aplicação para produção.

> A compilação bem-sucedida não garante, por si só, que todos os módulos remotos serão carregados em produção. Essa integração precisa ser validada com os três serviços configurados e executados no ambiente de destino.

## 🎯 Objetivos de aprendizagem

Este projeto permite praticar conceitos importantes do desenvolvimento frontend moderno:

- Arquitetura de microfrontends.
- Separação de responsabilidades.
- Integração entre aplicações React.
- Compartilhamento de componentes com Module Federation.
- Comunicação por eventos personalizados.
- Gerenciamento de estado em interfaces.
- Testes automatizados de componentes.
- Organização e documentação de projetos.


## 👨‍💻 Autor

**Anderson Altenhofen Aloy Ferreira**

Projeto desenvolvido para fins educacionais, com foco em desenvolvimento frontend, React, Next.js e arquitetura de microfrontends.

[GitHub — Andersonaloy](https://github.com/Andersonaloy)