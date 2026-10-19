# 🍽️ Saborê — Plataforma de Pedidos com Microfrontends

O **Saborê** é uma aplicação web de pedidos de comida desenvolvida com React, Next.js e Webpack Module Federation. O projeto utiliza uma arquitetura de **microfrontends** para dividir a interface em aplicações independentes, cada uma responsável por uma parte específica da experiência do usuário.

O projeto foi desenvolvido como exercício prático de arquitetura frontend, com foco em modularização, integração entre aplicações, comunicação entre componentes e testes automatizados.

## ✨ Funcionalidades

- **Cardápio digital:** exibição de pratos com imagens, descrições e preços.
- **Carrinho de pedidos:** adição de pratos, agrupamento de itens iguais e controle de quantidades.
- **Cálculo automático:** atualização dos valores e do total do pedido.
- **Remoção de itens:** possibilidade de remover unidades do carrinho.
- **Finalização do pedido:** formulário com dados do cliente e opção de retirada ou entrega.
- **Confirmação local:** exibição de uma confirmação com identificação do pedido.
- **Testes automatizados:** testes dos principais comportamentos do carrinho e do checkout.
- **Interface responsiva:** organização visual adaptável a diferentes tamanhos de tela.

> **Limitação do projeto:** a confirmação do pedido é realizada localmente. Não há integração com banco de dados, envio real para um restaurante ou processamento de pagamentos.

## 🏗️ Arquitetura

O projeto é composto por três aplicações Next.js, executadas separadamente durante o desenvolvimento.

| Aplicação | Porta | Responsabilidade |
|---|---:|---|
| `container-app` | 3000 | Reúne os microfrontends e apresenta a interface principal. |
| `micro-cardapio` | 3001 | Exibe o cardápio e permite selecionar pratos. |
| `micro-pedido` | 3002 | Gerencia o carrinho, as quantidades, o total e a finalização do pedido. |

### Como funciona o Module Federation?

O **Webpack Module Federation** permite que uma aplicação carregue módulos disponibilizados por outra aplicação em tempo de execução, sem precisar manter todos os componentes dentro de um único projeto.

No Saborê, cada microfrontend possui sua própria configuração do `NextFederationPlugin`.

- O `micro-cardapio` utiliza o nome remoto `cardapio` e expõe o componente `./Cardapio`, localizado em `components/Cardapio.js`.
- O `micro-pedido` utiliza o nome remoto `pedido` e expõe o componente `./Pedido`, localizado em `components/Pedido.js`.
- O `container-app` configura os dois remotes e importa os componentes por meio dos caminhos `cardapio/Cardapio` e `pedido/Pedido`.

As aplicações remotas disponibilizam seus módulos por meio do arquivo `remoteEntry.js`. O container utiliza essa configuração para localizar e carregar os componentes expostos.

No container, `React.lazy` realiza o carregamento dinâmico dos componentes remotos, enquanto `Suspense` exibe uma mensagem de carregamento enquanto os módulos estão sendo carregados.

Essa separação permite organizar o sistema por responsabilidades, mantendo o cardápio e o gerenciamento de pedidos em aplicações distintas.

### Como funciona a comunicação entre os microfrontends?

Além do compartilhamento de componentes pelo Module Federation, o cardápio e o carrinho precisam trocar informações quando o usuário seleciona um prato.

Essa comunicação é feita por meio de um **evento personalizado do navegador**, chamado `sabore:adicionar-item`.

O fluxo funciona da seguinte maneira:

1. O usuário seleciona um prato no microfrontend de cardápio.
2. O cardápio dispara o evento `sabore:adicionar-item`, enviando os dados do prato em `detail`.
3. O microfrontend de pedidos escuta esse evento e recebe os dados.
4. O carrinho adiciona o prato ou incrementa a quantidade caso ele já exista.
5. O total é recalculado e a interface é atualizada.
6. O usuário pode remover itens, preencher os dados solicitados e visualizar a confirmação local do pedido.

O evento segue o padrão do navegador `CustomEvent`, usando `window.dispatchEvent` para emitir e `window.addEventListener` para escutar.

### Fluxo simplificado da arquitetura

```text
                    Saborê
                       |
               Container App
                localhost:3000
                       |
              Module Federation
                 /          \
                /            \
      Micro Cardápio       Micro Pedido
       localhost:3001      localhost:3002
                |                |
        Seleção de pratos        Carrinho
                |                |
                +-- CustomEvent -+
                sabore:adicionar-item
                                 |
                         Total e checkout
                                 |
                       Confirmação local
```

## 🛠️ Tecnologias utilizadas

- JavaScript
- React
- Next.js 14
- Webpack
- Webpack Module Federation (`@module-federation/nextjs-mf`)
- CSS Modules
- Jest
- React Testing Library
- Testing Library Jest DOM
- Node.js e npm

## 📂 Estrutura do projeto

```text
microfrontends-sabore/
├── container-app/
│   ├── components/
│   │   ├── AplicacaoSabore.js
│   │   └── AplicacaoSabore.module.css
│   ├── pages/
│   ├── styles/
│   ├── next.config.js
│   └── package.json
│
├── micro-cardapio/
│   ├── components/
│   │   ├── Cardapio.js
│   │   └── Cardapio.module.css
│   ├── pages/
│   ├── styles/
│   ├── next.config.js
│   └── package.json
│
├── micro-pedido/
│   ├── components/
│   │   ├── Pedido.js
│   │   └── Pedido.module.css
│   ├── pages/
│   ├── __tests__/
│   │   └── Pedido.test.js
│   ├── jest.config.js
│   ├── jest.setup.js
│   ├── next.config.js
│   └── package.json
│
└── README.md
```

A estrutura apresenta os principais arquivos e diretórios. Outros arquivos de configuração e componentes podem existir em cada aplicação.

## ⚙️ Pré-requisitos

Antes de executar o projeto, instale:

- [Node.js](https://nodejs.org/) — inclui o npm.
- [Git](https://git-scm.com/) — necessário para clonar o repositório.

Para conferir se as ferramentas estão instaladas, execute:

```bash
node -v
npm -v
git --version
```

## 🚀 Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Andersonaloy/Sabore.git
cd Sabore
```

Os comandos seguintes partem da pasta raiz do repositório, que contém as três aplicações.

### 2. Instalar as dependências

Execute os comandos abaixo na raiz do projeto, na ordem indicada:

```bash
cd container-app
npm install
cd ..
```

```bash
cd micro-cardapio
npm install
cd ..
```

```bash
cd micro-pedido
npm install
cd ..
```

Cada aplicação possui seu próprio `package.json` e suas dependências.

### 3. Iniciar as aplicações

Abra **três terminais** no VS Code, todos inicialmente posicionados na pasta raiz do projeto.

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

Aguarde os três servidores iniciarem e mantenha os terminais abertos durante o uso.

Acesse a aplicação principal:

**http://localhost:3000**

O container depende dos módulos remotos disponibilizados nas portas `3001` e `3002`. Por isso, iniciar apenas o container não é suficiente para testar a integração completa.

## 🧪 Testes automatizados

O microfrontend de pedidos utiliza Jest e React Testing Library para verificar os principais comportamentos do carrinho e da finalização.

Para executar os testes, abra um terminal na raiz do projeto e execute:

```bash
cd micro-pedido
npm test
```

Os seis testes implementados verificam:

1. Exibição do carrinho vazio.
2. Recebimento de pratos por eventos personalizados.
3. Agrupamento de pratos iguais e cálculo dos valores.
4. Remoção de uma unidade de um item.
5. Abertura do formulário de finalização.
6. Confirmação do pedido e apresentação do total.

**Resultado registrado durante o desenvolvimento:** 6 testes aprovados.

Para verificar o resultado na sua máquina, execute o comando de testes novamente.

> Os testes documentados nesta seção são os do microfrontend de pedidos; não representam uma cobertura automatizada completa das três aplicações.

## 🏗️ Build de produção

Cada aplicação possui seu próprio processo de compilação.

Execute os comandos a seguir separadamente, partindo da raiz do projeto.

**Container App**

```bash
cd container-app
npm run build
cd ..
```

**Micro Cardápio**

```bash
cd micro-cardapio
npm run build
cd ..
```

**Micro Pedido**

```bash
cd micro-pedido
npm run build
cd ..
```

O comando `npm run build` compila a respectiva aplicação para produção.

> Um build bem-sucedido não garante, por si só, que todos os módulos remotos funcionarão no ambiente de produção. A integração precisa ser validada com os endereços remotos, os arquivos `remoteEntry.js` e a configuração de implantação corretos para o ambiente de destino.

## 🔧 Solução de problemas

### O container abre, mas o cardápio ou o pedido não aparece

- Confira se as três aplicações estão em execução.
- Verifique se o cardápio está disponível na porta `3001` e o pedido na porta `3002`.
- Confira os erros no Console e na aba Network das ferramentas de desenvolvedor do navegador.
- Verifique se os arquivos remotos `remoteEntry.js` estão sendo carregados nos caminhos esperados pela configuração do Module Federation.

### O comando `npm install` apresenta erros

- Confirme se o Node.js e o npm estão instalados.
- Execute o comando dentro da pasta da aplicação correspondente.
- Leia a mensagem completa do terminal antes de tentar atualizar ou remover dependências.

### Os testes não são encontrados ou falham

- Confirme que o terminal está na pasta `micro-pedido`.
- Confira se as dependências de teste foram instaladas.
- Execute `npm test` novamente e analise a mensagem do Jest.

## 🎯 Objetivos de aprendizagem

O projeto permite praticar conceitos importantes do desenvolvimento frontend moderno:

- Arquitetura de microfrontends.
- Separação de responsabilidades.
- Integração entre aplicações React.
- Exposição e consumo de componentes com Module Federation.
- Carregamento dinâmico com `React.lazy` e `Suspense`.
- Comunicação por eventos personalizados do navegador.
- Gerenciamento de estado em interfaces.
- Testes automatizados de componentes.
- Organização e documentação de projetos.

## 👨‍💻 Autor

**Anderson Altenhofen Aloy Ferreira**

Projeto desenvolvido para fins educacionais, com foco em desenvolvimento frontend, React, Next.js e arquitetura de microfrontends.

[GitHub — Andersonaloy]\([https://github.com/Andersonaloy](https://github.com/Andersonaloy))