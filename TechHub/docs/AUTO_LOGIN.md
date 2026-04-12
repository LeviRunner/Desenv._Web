# 🚀 Guia de Auto-Login via URL

## O que é?

O **Auto-Login via URL** é um recurso prático que permite ativar uma sessão de teste automaticamente adicionando um parâmetro especial à URL. Perfeito para demonstrações, testes e tutoriais!

## 📝 Como Usar

### Ativação Simples

Adicione o parâmetro `?teste=ativo` à URL de qualquer página:

```
http://localhost:3000/index.html?teste=ativo
http://localhost:3000/tags.html?teste=ativo
http://localhost:3000/formularios.html?teste=ativo
http://localhost:3000/tabelas.html?teste=ativo
http://localhost:3000/listas.html?teste=ativo
http://localhost:3000/graficos.html?teste=ativo
```

### Exemplo Prático

Se você estiver acessando pela primeira vez, simplesmente acesse:

```
index.html?teste=ativo
```

Imediatamente você terá:
- ✅ Acesso a TODAS as seções do TechHub
- ✅ Sem precisar passar pelo formulário de registro
- ✅ Sessão de teste válida por toda a navegação

## 🎯 O que acontece quando ativo?

Quando você usa `?teste=ativo`, o sistema:

1. **Verifica a URL** para o parâmetro `teste=ativo`
2. **Cria uma sessão de teste** no localStorage com:
   - Nome: "Usuário Teste"
   - Email: "teste@techhub.local"
   - Nick: "usuario_teste"
   - Data de Registro: data atual
   - Token: gerado automaticamente

3. **Log no console** para confirmação:
   ```
   ✅ Modo de teste ativado via URL!
   📝 Acesso irrestrito a todas as seções do TechHub
   ```

4. **Limpa a URL** (opcional) - A página pode recarregar sem o parâmetro

## 💻 Código Implementado

O script está presente em todos os arquivos HTML:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('teste') === 'ativo') {
        // Criar sessão de teste
        localStorage.setItem('usuarioTechHub', JSON.stringify({
            nome: 'Usuário Teste',
            email: 'teste@techhub.local',
            nick: 'usuario_teste',
            dataRegistro: new Date().toLocaleDateString('pt-BR')
        }));
        localStorage.setItem('tokenTechHub', 'token_teste_' + Date.now());
        
        console.log('✅ Modo de teste ativado via URL!');
        console.log('📝 Acesso irrestrito a todas as seções do TechHub');
    }
    
    // ... resto do código ...
});
```

## 📋 Onde está implementado?

O auto-login está em todos estes arquivos:

- ✅ `index.html`
- ✅ `tags.html`
- ✅ `formularios.html`
- ✅ `tabelas.html`
- ✅ `listas.html`
- ✅ `graficos.html`

## 🔧 Opções Avançadas

### Manter ou Remover o Parâmetro da URL

Por padrão, a página **não recarrega** para limpar o parâmetro. Se você quiser limpar automaticamente:

Descomente a linha em cada arquivo:

```javascript
// Recarregar a página sem o parâmetro para limpar a URL
window.location.href = 'index.html';
```

Quando comentada, a URL permanece como:
```
index.html?teste=ativo
```

Quando descomentada, após 1-2 segundos recarrega para:
```
index.html
```

## 🎓 Casos de Uso

### 1. **Demonstração ao Vivo**
- Professores podem demonstrar todo o portal sem parar para registro
- Alunos veem o conteúdo completo imediatamente

### 2. **Tutoriais em Vídeo**
- Compartilhe um link com `?teste=ativo` pronto para usar
- Usuários já têm acesso sem fricção

### 3. **Testes de Funcionalidade**
- Teste como o portal funciona quando "logado"
- Verifique mudanças no layout/menu quando autenticado

### 4. **Apresentações**
- Mostre todas as seções sem preocupação com login
- Fluxo contínuo e profissional

## ⚠️ Importante

Esse recurso é **apenas para teste e demonstração**:
- A sessão é criada apenas no localStorage do navegador
- Não persiste em recarregamento completo da página (Ctrl+F5)
- Não afeta o banco de dados do servidor
- É perfeitamente seguro para usar

## 🔐 Limpando a Sessão de Teste

Para remover a sessão de teste e voltar ao estado normal, execute no console:

```javascript
localStorage.removeItem('usuarioTechHub');
localStorage.removeItem('tokenTechHub');
location.reload();
```

Ou simplesmente limpe o localStorage:

```javascript
localStorage.clear();
location.reload();
```

## 📞 Suporte

Caso queira desativar esse recurso, basta remover/comentar o bloco de código `AUTO-LOGIN` nos arquivos HTML.

---

**Criado para facilitar demonstrações e testes do TechHub** 🎯
