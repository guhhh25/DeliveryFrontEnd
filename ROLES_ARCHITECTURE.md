# Arquitetura de Roles - ContaCerta

## Visão Geral

O ContaCerta utiliza uma arquitetura de **roles (papéis)** para gerenciar diferentes tipos de usuários em uma única aplicação. Esta abordagem oferece flexibilidade, facilidade de manutenção e uma experiência de usuário consistente.

## Tipos de Usuário

### 1. **Customer (Cliente)**
- Usuários finais que fazem pedidos
- Acessam o catálogo de produtos
- Fazem pedidos e acompanham entregas
- Dashboard com histórico de pedidos

### 2. **Admin (Administrador)**
- Acesso completo ao sistema
- Gerencia restaurantes, usuários e pedidos
- Visualiza analytics e relatórios
- Painel administrativo completo

### 3. **Restaurant Owner (Proprietário de Restaurante)**
- Gerencia seu próprio restaurante
- Adiciona/edita produtos
- Acompanha pedidos do seu estabelecimento
- Dashboard específico para restaurantes

## Estrutura de Arquivos

```
src/
├── types/
│   └── auth.ts                 # Definições de roles e interfaces
├── contexts/
│   └── AuthContext.tsx         # Contexto com verificação de roles
├── components/
│   ├── RoleBasedRoute.tsx      # Componente de roteamento por roles
│   ├── AdminOnlyComponent.tsx  # Wrapper para componentes admin
│   ├── AdminDashboard.tsx      # Dashboard administrativo
│   ├── Dashboard.tsx           # Dashboard de cliente
│   └── DeliveryHome.tsx        # Página principal (pública)
└── App.tsx                     # Roteamento principal
```

## Como Usar

### 1. Verificação de Roles no Contexto

```typescript
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/auth';

const MyComponent = () => {
  const { isAdmin, isCustomer, hasRole } = useAuth();

  if (isAdmin) {
    return <AdminContent />;
  }

  if (hasRole(UserRole.RESTAURANT_OWNER)) {
    return <RestaurantContent />;
  }

  return <CustomerContent />;
};
```

### 2. Roteamento Baseado em Roles

```typescript
import RoleBasedRoute from './RoleBasedRoute';
import { UserRole } from '../types/auth';

const ProtectedComponent = () => {
  return (
    <RoleBasedRoute 
      allowedRoles={[UserRole.ADMIN, UserRole.RESTAURANT_OWNER]}
      fallback={<AccessDenied />}
    >
      <AdminOrRestaurantContent />
    </RoleBasedRoute>
  );
};
```

### 3. Componente Admin-Only

```typescript
import AdminOnlyComponent from './AdminOnlyComponent';

const App = () => {
  return (
    <AdminOnlyComponent>
      <SuperSecretAdminFeature />
    </AdminOnlyComponent>
  );
};
```

## Vantagens desta Arquitetura

### ✅ **Manutenção Simplificada**
- Um único código base
- Componentes reutilizáveis
- Lógica centralizada

### ✅ **Experiência Consistente**
- Interface unificada
- Navegação fluida
- Transições suaves

### ✅ **Desenvolvimento Rápido**
- Menos duplicação
- Configuração única
- Deploy simplificado

### ✅ **Escalabilidade**
- Fácil adição de novos roles
- Permissões granulares
- Flexibilidade total

## Implementação no Backend

Para completar a implementação, o backend deve:

1. **Incluir role no JWT:**
```json
{
  "sub": "user_id",
  "email": "user@email.com",
  "role": "admin",
  "exp": 1234567890
}
```

2. **Endpoints protegidos por role:**
```csharp
[Authorize(Roles = "Admin")]
[HttpGet("admin/users")]
public async Task<IActionResult> GetUsers() { ... }
```

3. **Validação de permissões:**
```csharp
if (!User.IsInRole("Admin"))
{
    return Forbid();
}
```

## Fluxo de Autenticação

1. **Login** → Backend retorna JWT com role
2. **Frontend** → Decodifica JWT e armazena role
3. **Context** → Disponibiliza informações de role
4. **Componentes** → Verificam permissões e renderizam conteúdo apropriado

## Exemplo de Uso Completo

```typescript
// App.tsx
function AppContent() {
  const { isAuthenticated, isAdmin, isCustomer } = useAuth();

  if (isAuthenticated) {
    if (isAdmin) {
      return <AdminDashboard />;
    } else if (isCustomer) {
      return <CustomerDashboard />;
    } else {
      return <RestaurantDashboard />;
    }
  }

  return <PublicHome />;
}
```

## Próximos Passos

1. **Implementar backend** com suporte a roles
2. **Criar dashboards específicos** para cada tipo de usuário
3. **Adicionar permissões granulares** (CRUD por recurso)
4. **Implementar auditoria** de ações administrativas
5. **Criar testes** para verificação de permissões

## Conclusão

Esta arquitetura oferece a melhor combinação de:
- **Simplicidade** de manutenção
- **Flexibilidade** para crescimento
- **Segurança** através de roles
- **Experiência** de usuário consistente

A escolha por uma única aplicação com sistema de roles é a abordagem mais adequada para um app de delivery moderno. 