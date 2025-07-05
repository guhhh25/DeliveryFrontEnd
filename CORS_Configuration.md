# Configuração de CORS para o Backend

Para que o frontend React possa se comunicar com o backend .NET Core, você precisa configurar o CORS no seu projeto backend.

## Configuração no Program.cs

Adicione a seguinte configuração no seu `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Adicione esta linha para configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // URL do React
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

// ... outras configurações

var app = builder.Build();

// Adicione esta linha antes de app.UseAuthorization()
app.UseCors("AllowReactApp");

// ... resto da configuração
```

## Configuração Alternativa (mais permissiva para desenvolvimento)

Se você quiser uma configuração mais permissiva para desenvolvimento:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
```

## Verificação

Após configurar o CORS, reinicie sua API e teste a comunicação entre o frontend e backend.

## Problemas Comuns

1. **Erro de CORS**: Certifique-se de que a URL do frontend está correta na configuração
2. **Porta incorreta**: Verifique se a porta da API está correta no frontend (padrão: 7001)
3. **HTTPS vs HTTP**: Se sua API usa HTTPS, certifique-se de que o frontend também está configurado corretamente 