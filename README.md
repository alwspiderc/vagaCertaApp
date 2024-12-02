# VagaCerta

**Descrição:**  

VagaCerta é um aplicativo mobile desenvolvido com React Native que conecta candidatos a oportunidades de emprego, facilitando a busca, contato e gestão de informações de usuário. Este projeto inclui tanto o aplicativo quanto a API de suporte para gerenciar vagas e usuários. que integra com a API RESTful desenvolvida nas aulas anteriores


## 📝 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Contribuição](#contribuição)

## Sobre o Projeto

O VagaCerta foi desenvolvido como atividade prática no curso de Desenvolvimento de Software (Trilha Mobile) no Restic36, para ajudar usuários a encontrar vagas de emprego abertas, permitindo acesso aos detalhes da vaga, contato com os responsáveis e edição de informações de usuário. Apenas usuários autenticados podem acessar o conteúdo. A comunicação com a API RESTful de vagas (desenvolvida nas aulas anteriores) é realizada por meio de requisições HTTP utilizando a biblioteca Axios.

## Tecnologias Utilizadas

**Frontend (App):**
- [React Native](https://reactnative.dev/)
- Context API
- Async Storage para persistência de dados
- Axios para fazer requisições à API, como obter as vagas disponíveis e interagir com o servidor

**Backend (API):**
- [Node.js](https://nodejs.org/)
- Express
- Sequelize

## Funcionalidades

- Login e autenticação de usuário.
- Manutenção local dos dados do usuário autenticado.
- Exibição de vagas de emprego com botão de contato via WhatsApp (somente para vagas abertas).
- Edição de informações do usuário.
- Logout.
- Conexão com a API de vagas utilizando Axios.


## Estrutura do Projeto

### Aplicativo (`restic36-app-vagacerta`)

```
restic36-app-vagacerta/
├── assets/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── routes/
│   ├── screens/
│   ├── services/
│   ├── theme/
│   ├── utils/
├── App.json
├── App.tsx
├── package.json
├── tsconfig.json
├── db.json
```

### API (`vagas-api`)
```
vagas-api/
├── config/
│   ├── database.js
├── middlewares/
│   ├── authenticateToken.js
├── models/
│   ├── usuario.js
│   ├── vaga.js
├── repositories/
│   ├── usuarioRepository.js
│   ├── vagaRepository.js
├── routes/
│   ├── usuarios.js
│   ├── vagas.js
├── package.json
├── server.js
```


## Pré-requisitos

- **Node.js** instalado
- **npm** ou **yarn** para gerenciar pacotes
- Emulador ou dispositivo físico para executar o aplicativo

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/restic36-app-vagacerta.git
   cd restic36-app-vagacerta
   ```

2. Instale as dependências do aplicativo:
```
npm install
# ou
yarn install
```

3. Configure a API:
```
cd vagas-api
npm install
# ou
yarn install
```

4. Inicie a API:
```
npm start
```

5. Inicie o aplicativo:
```
npx react-native run-android
# ou
npx react-native run-ios
```

## Como Usar

1. Realize o login com um usuário existente.
2. Navegue pelas vagas de emprego disponíveis.
3. Clique no botão de contato para vagas abertas e seja redirecionado para o WhatsApp.
4. Edite suas informações de perfil quando necessário.
5. Faça logout para sair do aplicativo.

## Contribuição
Atividade desenvolvida pelas alunas Elane de Alencar Arrais Machado e Ester Costa de Souza.
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.
