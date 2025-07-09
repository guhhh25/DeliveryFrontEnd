# Funcionalidade de Empresas - ContaCerta

## Visão Geral

A funcionalidade de empresas permite que usuários cadastrem e gerenciem suas empresas no sistema ContaCerta. Esta funcionalidade inclui um menu lateral hambúrguer e uma página dedicada para gerenciamento de empresas.

## Funcionalidades Implementadas

### 🍔 Menu Lateral Hambúrguer
- **Localização**: Canto superior esquerdo da tela
- **Animações**: Transições suaves com Framer Motion
- **Itens do Menu**:
  - 📊 Dashboard
  - 🏢 Empresa
  - 📦 Pedidos
  - 🍕 Produtos
  - 📈 Relatórios
  - 🚪 Sair

### 🏢 Página de Empresas
- **Visualização**: Mostra informações da empresa cadastrada
- **Cadastro**: Formulário completo para nova empresa
- **Upload de Logo**: Conversão automática para base64
- **Validação**: Campos obrigatórios e formatação

## Estrutura de Arquivos

```
src/
├── types/
│   └── empresa.ts              # Tipos TypeScript para Empresa
├── services/
│   └── empresaService.ts       # Serviços de API para Empresa
├── components/
│   ├── HamburgerMenu.tsx       # Menu lateral hambúrguer
│   ├── EmpresaPage.tsx         # Página de gerenciamento de empresas
│   └── Dashboard.tsx           # Dashboard atualizado com navegação
```

## Como Usar

### 1. Acessar o Menu
- Clique no ícone hambúrguer no canto superior esquerdo
- O menu desliza da esquerda com animação suave

### 2. Navegar para Empresas
- No menu, clique em "🏢 Empresa"
- Você será direcionado para a página de empresas

### 3. Cadastrar Empresa
Se você não possui empresa:
- Clique em "Cadastrar Empresa"
- Preencha todos os campos obrigatórios
- Faça upload da logo (opcional)
- Clique em "Cadastrar Empresa"

### 4. Visualizar Empresa
Se você já possui empresa:
- Visualize todas as informações
- Clique em "Editar Empresa" para modificar

## Campos do Formulário

### Obrigatórios:
- **Nome da Empresa**: Nome completo da empresa
- **Número de Registro**: Número de registro oficial
- **Email**: Email de contato da empresa
- **Telefone**: Telefone de contato
- **CEP**: Código postal
- **Endereço**: Endereço completo

### Opcional:
- **Logo**: Imagem da empresa (convertida para base64)

## Endpoints da API

### GET `/api/Empresa/MyEmpresa`
- **Descrição**: Busca a empresa do usuário logado
- **Resposta**: Dados da empresa ou 404 se não existir

### POST `/api/Empresa/Create`
- **Descrição**: Cria uma nova empresa
- **Body**: `CreateEmpresaRequest`
- **Resposta**: Dados da empresa criada

## Tipos TypeScript

```typescript
interface CreateEmpresaRequest {
  nome: string;
  numeroRegistro: number;
  email: string;
  telefone: number;
  cep: string;
  endereco: string;
  logo?: string; // base64
}

interface Empresa {
  id: string;
  nome: string;
  numeroRegistro: number;
  email: string;
  telefone: number;
  cep: string;
  endereco: string;
  logo?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
```

## Funcionalidades do Menu

### Navegação
- Cada item do menu navega para uma seção específica
- Estado ativo é destacado visualmente
- Animações de hover e clique

### Logout
- Botão de logout no final do menu
- Limpa dados de autenticação
- Redireciona para página inicial

## Tratamento de Erros

### Sem Empresa
- Mostra mensagem amigável
- Botão para cadastrar empresa
- Design atrativo com ícone

### Erro de API
- Alert com mensagem de erro
- Log detalhado no console
- Interface não quebra

### Validação
- Campos obrigatórios marcados
- Validação de email
- Formatação de números

## Animações e UX

### Menu Hambúrguer
- Linhas animadas ao abrir/fechar
- Overlay com fade
- Deslizamento suave do menu

### Página de Empresa
- Loading spinner durante carregamento
- Animações de entrada
- Transições suaves

### Formulário
- Preview da logo selecionada
- Validação em tempo real
- Feedback visual

## Próximas Funcionalidades

1. **Edição de Empresa**: Modificar dados existentes
2. **Upload de Logo**: Drag & drop para imagens
3. **Validação de CEP**: Busca automática de endereço
4. **Múltiplas Empresas**: Suporte a várias empresas por usuário
5. **Histórico**: Log de alterações

## Configuração

### Backend
- Endpoint: `http://localhost:5162/api/Empresa/Create`
- Autenticação: JWT Bearer Token
- Content-Type: application/json

### Frontend
- Detecção automática de porta
- Interceptors para token
- Tratamento de erros 401/404

## Testes

Para testar a funcionalidade:

1. **Login** no sistema
2. **Abrir menu** hambúrguer
3. **Clicar em Empresa**
4. **Cadastrar empresa** ou visualizar existente
5. **Testar navegação** entre seções

## Conclusão

A funcionalidade de empresas oferece uma experiência completa e intuitiva para gerenciamento de dados empresariais, com interface moderna e responsiva, integração perfeita com o backend e tratamento robusto de erros. 