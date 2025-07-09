# 🔧 Configuração do Backend

## Problema Atual
O frontend não consegue conectar ao backend na porta 7001.

## Soluções

### 1. Verificar se o Backend está Rodando

**No terminal do backend (.NET):**
```bash
# Verifique se o projeto está rodando
dotnet run

# Ou se estiver usando Visual Studio
# Pressione F5 ou clique em "Start"
```

### 2. Verificar a Porta Correta

**No console do backend, procure por algo como:**
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7001
      Now listening on: http://localhost:5000
```

### 3. Portas Comuns do .NET

O frontend vai testar automaticamente estas portas:
- **7001** (HTTPS - padrão .NET 6+)
- **5000** (HTTP - padrão .NET 6+)
- **5001** (HTTPS - alternativa)
- **5162** (HTTP - alternativa)
- **3000** (HTTP - alternativa)
- **8080** (HTTP - alternativa)

### 4. Configurar CORS no Backend

**No seu `Program.cs` ou `Startup.cs`:**
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // Frontend React
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

// ... outras configurações

var app = builder.Build();

// Adicione antes de app.UseAuthorization()
app.UseCors("AllowReactApp");
```

### 5. Endpoint de Health Check (Opcional)

**Adicione no seu controller:**
```csharp
[HttpGet("health")]
public IActionResult Health()
{
    return Ok(new { status = "healthy", timestamp = DateTime.UtcNow });
}
```

### 6. Teste Manual

**No navegador, teste:**
```
http://localhost:7001/api
http://localhost:5000/api
http://localhost:5001/api
```

### 7. Logs do Frontend

**Abra o console do navegador (F12) e veja:**
- Qual porta está sendo testada
- Se há conexão
- Qual erro específico aparece

### 8. Solução Rápida

Se souber a porta correta, crie um arquivo `.env` na pasta `frontend`:
```
REACT_APP_API_URL=http://localhost:SUA_PORTA/api
```

## Status da Conexão

O frontend agora mostra um indicador no canto superior direito:
- 🟡 **Verificando** - Testando conexão
- 🟢 **Conectado** - Backend encontrado
- 🔴 **Erro** - Backend não encontrado

## Próximos Passos

1. **Inicie o backend** (.NET)
2. **Verifique a porta** no console
3. **Atualize o frontend** (F5)
4. **Veja o status** no canto superior direito
5. **Teste o registro** novamente 