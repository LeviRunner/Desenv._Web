# 🚀 TechHub - Portal de Desenvolvimento Web

Um portal educacional completo com apresentação profissional, navegação intuitiva e conteúdo estruturado sobre HTML.

## 📋 Estrutura do Projeto

```
T3/
├── index.html          # Página inicial
├── tags.html           # Tags HTML e Semântica
├── formularios.html    # Formulários e Validação
├── tabelas.html        # Tabelas e Dados
├── listas.html         # Listas e Estruturação
├── styles.css          # Estilos do site
├── script.js           # JavaScript interativo
└── README.md           # Este arquivo
```

## ✨ Características Principais

### 1. **Cabeçalho Fixo** 📍
- Posicionado no topo da página
- Permanece visível ao fazer scroll
- Contém:
  - Logo e título do site
  - **Barra de pesquisa** com botão de busca
  - Botão de menu (responsivo em mobile)

### 2. **Menu Flutuante** 🎯
- Sidebar animado na lateral esquerda
- 5 links de navegação principais:
  - 🏠 Início
  - 📝 Tags HTML
  - 📋 Formulários
  - 📊 Tabelas
  - 📑 Listas
- Destacamento automático da página atual
- Botão para fechar (✕)
- Ativa com clique no ☰ (hamburger menu)

### 3. **Barra de Pesquisa Funcional** 🔍
- Busca por texto em tempo real
- Destaca resultados em amarelo
- Contador de resultados encontrados
- Navegação automática para primeira correspondência
- Funciona com Enter ou clique no botão

### 4. **Design Responsivo** 📱
- Funciona em desktop, tablet e mobile
- Layout adaptativo
- Menu se adapta a telas pequenas
- Tabelas com scroll horizontal

### 5. **Páginas Separadas** 📄
Cada tópico em sua própria página:
- **index.html**: Boas-vindas e guia de uso
- **tags.html**: Tags semânticas (header, nav, main, article, aside, etc)
- **formularios.html**: Formulários com todos os tipos de input
- **tabelas.html**: Exemplos de tabelas estruturadas
- **listas.html**: Diferentes tipos de listas e personalizações

## 🎨 Funcionalidades CSS

```css
/* Header Fixo */
header {
    position: fixed;
    top: 0;
    z-index: 100;
    width: 100%;
}

/* Menu Flutuante */
.floating-menu {
    position: fixed;
    left: 0;
    transition: left 0.3s ease;
}

/* Responsividade */
@media (max-width: 768px) {
    /* Ajustes para mobile */
}
```

## 📜 Funcionalidades JavaScript

### Menu Flutuante
```javascript
// Abrir menu com ☰
// Fechar menu com ✕ ou clique fora
// Link ativo destacado
```

### Barra de Pesquisa
```javascript
// performSearch(query) - Busca na página
// clearSearchHighlights() - Remove destaques
// Suporta Enter ou clique do botão
```

### Outros
- Scroll suave para links com #
- Detecção de página atual para menu ativo
- Overlay semi-transparente ao abrir menu

## 🖥️ Como Usar

### 1. Abrir o Site
- Abra `index.html` no navegador
- Ou clique em qualquer página HTML

### 2. Navegar
- Use o **menu (☰)** no canto superior direito
- Clique em qualquer link do menu para ir para uma page diferente
- O link ativo fica destacado em azul

### 3. Pesquisar
- Digite na **barra de pesquisa** no header
- Pressione **Enter** ou clique no **🔍**
- Resultados são destacados em amarelo
- Mensagem informa quantos resultados foram encontrados

### 4. Mobile/Responsivo
- Em telas menores (< 768px):
  - Menu desaparece do header
  - Botão ☰ fica visível
  - Toque para abrir o menu flutuante
  - Barra de pesquisa adapta-se

## 🎯 Estrutura HTML Utilizada

Cada página usa tags semânticas:
```html
<header>...</header>      <!-- Cabeçalho fixo -->
<aside>...</aside>        <!-- Menu flutuante -->
<main>...</main>          <!-- Conteúdo principal -->
<section>...</section>    <!-- Seções temáticas -->
<article>...</article>    <!-- Artigos/Conteúdo -->
<footer>...</footer>      <!-- Rodapé -->
```

## 🎓 Conteúdo Educacional

### Página: Tags HTML
- Elementos em linha vs bloco
- Tags semânticas (header, nav, main, article, aside, footer)
- Diferenças entre tags semânticas e visuais
- Exemplo completo de estrutura

### Página: Formulários
- Todos os tipos de input
- Labels e acessibilidade
- Fieldset e legend
- Validação básica
- Atributos importantes

### Página: Tabelas
- Estrutura thead/tbody/tfoot
- colspan e rowspan
- Tabelas responsivas
- Acessibilidade (scope, caption)
- Exemplos práticos

### Página: Listas
- Lista não ordenada (ul/li)
- Lista ordenada (ol/li)
- Lista de descrição (dl/dt/dd)
- Listas aninhadas
- Personalização com CSS

## 🔧 Customizações Possíveis

### Cores
Editar em `styles.css`:
```css
header {
    background: linear-gradient(135deg, #1a5490 0%, #0d3d6f 100%);
}
```

### Menu
Adicionar/remover links em `index.html`:
```html
<nav>
    <a href="nova-pagina.html">Nova Página</a>
</nav>
```

### Conteúdo
Editar o conteúdo de cada página HTML conforme necessário

## 📱 Breakpoints Responsivos

```css
/* Desktop: > 768px */
/* Tablet: 481px - 768px */
/* Mobile: < 480px */
```

## ♿ Acessibilidade

- Labels associadas a inputs
- Atributos aria-label
- Cores com bom contraste
- Menu semântico com nav
- Tabelas com scope e caption
- Texto descritivo para imagens

## 🚀 Iniciando

1. Abra `index.html` em um navegador moderno
2. Navegue usando o menu (☰)
3. Use a barra de pesquisa para encontrar termos
4. Explore as 5 páginas do portal

## ✅ Checklist de Funcionalidades

- ✅ Header fixo que acompanha a rolagem
- ✅ Barra de pesquisa funcional no header
- ✅ Menu flutuante (sidebar) animado
- ✅ Páginas separadas para cada seção
- ✅ Navegação com links ativos
- ✅ Design responsivo (mobile-first)
- ✅ Conteúdo educacional estruturado
- ✅ Acessibilidade WCAG 2.1 básica
- ✅ Formulários interativos
- ✅ Tabelas organizadas
- ✅ Exemplos práticos

## 📝 Notas

- Todas as páginas compartilham o mesmo header, menu e estilos
- O JavaScript detecta automaticamente qual é a página atual
- A busca funciona apenas no conteúdo da página atual
- Use `Ctrl+F` do navegador para buscar em toda a página
- Compatível com navegadores modernos (Chrome, Firefox, Edge, Safari)

## 👨‍💻 Desenvolvido com

- HTML5 (Semântico)
- CSS3 (Grid, Flexbox, Responsividade)
- JavaScript Vanilla (Sem dependências)

---

**Criado para fins educacionais em 2026** 🎓

Aproveite o aprendizado!
