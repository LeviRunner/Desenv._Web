# 📱 Testando em Dispositivo Móvel

## 🚀 Passo 1: Iniciar o Servidor

Abra um terminal na pasta do projeto e execute:

```bash
cd /workspaces/Desenv._Web/TechHub
npm install
npm start
```

Você verá algo assim:
```
🚀 Servidor TechHub rodando em http://localhost:3000
```

## 🔍 Passo 2: Obter o IP da Sua Máquina

O servidor está rodando em `localhost:3000`, mas para acessar via mobile, você precisa do IP real da máquina.

### No Linux/Mac (Dev Container):

```bash
hostname -I
```

Você verá algo como:
```
192.168.1.100 172.17.0.2
```

**Use o primeiro IP** (geralmente começa com 192.168.x.x)

### Alternativa - Obter o IP automático:

```bash
ip route get 1 | head -1 | cut -d' ' -f7
```

## 📲 Passo 3: Acessar pelo Mobile

Com o IP da máquina (exemplo: `192.168.1.100`), acesse no navegador do seu celular/tablet:

### ✅ Com Auto-Login (Teste)
```
http://192.168.1.100:3000/index.html?teste=ativo
```

### ✅ Sem Auto-Login (Registro Normal)
```
http://192.168.1.100:3000/index.html
```

### ✅ Acessar Outras Páginas com Teste
```
http://192.168.1.100:3000/tags.html?teste=ativo
http://192.168.1.100:3000/formularios.html?teste=ativo
http://192.168.1.100:3000/tabelas.html?teste=ativo
http://192.168.1.100:3000/listas.html?teste=ativo
http://192.168.1.100:3000/graficos.html?teste=ativo
```

---

## 🎯 Guia Prático Completo

### 1️⃣ **Terminal 1 - Inicie o servidor:**

```bash
cd /workspaces/Desenv._Web/TechHub
npm start
```

Anote a mensagem que aparece confirmando que está rodando.

### 2️⃣ **Terminal 2 - Obtenha o IP:**

```bash
hostname -I
```

Copie o primeiro IP (ex: 192.168.1.100)

### 3️⃣ **No Celular/Tablet:**

Abra o navegador e acesse:
```
http://[SEU_IP]:3000/index.html?teste=ativo
```

**Exemplo real:**
```
http://192.168.1.100:3000/index.html?teste=ativo
```

---

## ✅ O que Verificar no Mobile

Quando acessar com `?teste=ativo`:

✅ **Menu responsivo** funciona (clique no ☰)
✅ **Links de navegação** funcionam
✅ **Link de registro desapareceu** (logado)
✅ **Acesso às seções protegidas** (Tags, Formulários, Tabelas, Listas, Gráficos)
✅ **Gráficos carregam** se foi até a página de gráficos
✅ **Responsividade** - Layout adapta ao tamanho da tela

---

## 🔧 Troubleshooting

### ❌ Erro: "Conexão recusada"

**Solução:** Verifique se:
1. O servidor está rodando (`npm start`)
2. O IP está correto
3. Celular e PC estão na mesma rede WiFi
4. Pelo menos porta 3000 está acessível

### ❌ Erro: "Página não encontrada"

**Solução:** Verifique a URL:
- Correto: `http://192.168.1.100:3000/index.html?teste=ativo`
- Errado: `http://192.168.1.100:3000/?teste=ativo` (falta index.html)

### ❌ Não consegue acessar outras redes?

Se estiver em um container/máquina virtual diferente, use:

```bash
# Para obter o IP do host
cat /etc/hostname
```

---

## 💻 Alternativa: Usando Python (Sem Node)

Se preferir um servidor mais simples, pode usar Python:

### Python 3:
```bash
cd /workspaces/Desenv._Web/TechHub/src/T3
python3 -m http.server 3000
```

Então acesse:
```
http://192.168.1.100:3000/index.html?teste=ativo
```

---

## 🧪 Script de Teste Rápido

Se quiser testar um fluxo completo, crie um script:

```bash
#!/bin/bash

echo "📱 Iniciando Teste Mobile TechHub..."
echo ""

# Obter IP
IP=$(hostname -I | awk '{print $1}')
echo "✅ IP da máquina: $IP"
echo ""

# Iniciar servidor
echo "🚀 Iniciando servidor..."
cd /workspaces/Desenv._Web/TechHub
npm start > /dev/null 2>&1 &
SERVER_PID=$!

sleep 3

echo "✅ Servidor rodando (PID: $SERVER_PID)"
echo ""
echo "📲 Acesse no seu mobile:"
echo ""
echo "   🔗 Com Auto-Login:"
echo "      http://$IP:3000/index.html?teste=ativo"
echo ""
echo "   🔗 Sem Auto-Login:"
echo "      http://$IP:3000/index.html"
echo ""
echo "✋ Pressione CTRL+C para parar o servidor"

wait $SERVER_PID
```

Salve como `teste-mobile.sh` e execute:

```bash
chmod +x teste-mobile.sh
./teste-mobile.sh
```

---

## 📋 Checklist de Teste

- [ ] Servidor está rodando
- [ ] IP obtido corretamente
- [ ] Celular conectado na mesma rede
- [ ] URL digita corretamente na barra de endereços
- [ ] Página carrega sem erro 404
- [ ] Auto-login funciona (sem ir para registro)
- [ ] Menu hamburgo (☰) abre/fecha
- [ ] Navegação entre seções funciona
- [ ] Responsividade está OK
- [ ] Gráficos carregam corretamente

---

## 🎓 Dicas Finais

1. **Anotar o IP**: Sempre que ligar, pode mudar. Use `hostname -I` novamente
2. **Compartilhar**: Pode enviar o link para outras pessoas testarem (mesma rede)
3. **Limpar Cache**: Se tiver problemas, força recarregar: `Ctrl+Shift+R` ou `Cmd+Shift+R`
4. **DevTools Mobile**: Abra com F12 e ative o modo mobile para testar responsividade

---

**Pronto para testar! 🚀📱**
