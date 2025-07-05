# ContaCerta - Frontend React

Este é o frontend da aplicação ContaCerta, desenvolvido em React com TypeScript e Tailwind CSS.

## Funcionalidades

- **Tela de Login**: Interface moderna para autenticação de usuários
- **Tela de Registro**: Formulário para criação de novas contas
- **Design Responsivo**: Interface adaptável para diferentes tamanhos de tela
- **Validação de Formulários**: Validação client-side com feedback visual
- **Integração com API**: Comunicação com o backend .NET Core

## Tecnologias Utilizadas

- React 18
- TypeScript
- Tailwind CSS
- Axios (para requisições HTTP)

## Configuração da API

O projeto está configurado para se conectar com a API na porta `7001`. Para alterar a URL da API, edite o arquivo `src/services/api.ts`:

```typescript
const API_BASE_URL = 'https://localhost:7001/api'; // Altere conforme necessário
```

## Instalação e Execução

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em modo de desenvolvimento:**
   ```bash
   npm start
   ```

3. **Build para produção:**
   ```bash
   npm run build
   ```

## Estrutura do Projeto

```
src/
├── components/
│   ├── Login.tsx          # Componente de login
│   ├── Register.tsx       # Componente de registro
│   └── SuccessMessage.tsx # Mensagem de sucesso
├── services/
│   └── api.ts            # Serviços de API
├── types/
│   └── auth.ts           # Tipos TypeScript
├── App.tsx               # Componente principal
└── index.css             # Estilos globais (Tailwind)
```

## Endpoints da API

O frontend se conecta aos seguintes endpoints:

- `POST /api/auth/login` - Autenticação de usuário
- `POST /api/auth/register` - Registro de novo usuário

## Funcionalidades dos Componentes

### Login
- Formulário com email e senha
- Validação de campos obrigatórios
- Tratamento de erros da API
- Loading state durante requisições
- Link para tela de registro

### Register
- Formulário com email, senha e confirmação de senha
- Validação de senhas coincidentes
- Validação de tamanho mínimo de senha
- Tratamento de erros da API
- Loading state durante requisições
- Link para tela de login

### SuccessMessage
- Exibição de mensagem de sucesso após registro
- Botão para navegar para tela de login

## Estilização

O projeto utiliza Tailwind CSS para estilização, oferecendo:
- Design moderno e responsivo
- Gradientes e cores atrativas
- Animações e transições suaves
- Estados de hover e focus
- Loading spinners animados

## Próximos Passos

- Implementar persistência do token JWT
- Adicionar rotas protegidas
- Criar dashboard principal
- Implementar logout
- Adicionar testes unitários
