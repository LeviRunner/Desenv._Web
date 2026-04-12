// Gerenciar Menu Flutuante
const menuToggle = document.querySelector('.menu-toggle');
const floatingMenu = document.querySelector('.floating-menu');
const menuOverlay = document.querySelector('.menu-overlay');
const menuClose = document.querySelector('.menu-close');
const menuLinks = document.querySelectorAll('.floating-menu nav a');

// Abrir menu
menuToggle?.addEventListener('click', () => {
    floatingMenu.classList.add('active');
    menuOverlay.classList.add('active');
});

// Fechar menu
menuClose?.addEventListener('click', () => {
    floatingMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
});

// Fechar menu ao clicar no overlay
menuOverlay?.addEventListener('click', () => {
    floatingMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
});

// Fechar menu ao clicar em um link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        floatingMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
    });
});

// Marcar link ativo baseado na página atual
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Chamar ao carregar a página
document.addEventListener('DOMContentLoaded', setActiveLink);

// ===== FUNCIONALIDADE DE PESQUISA =====
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

function performSearch(query) {
    if (!query.trim()) {
        alert('Por favor, digite um termo de pesquisa');
        return;
    }

    // Converter para minúsculas para busca case-insensitive
    const searchTerm = query.toLowerCase();

    // Buscar no conteúdo da página
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    const textContent = mainContent.innerText.toLowerCase();
    const highlightableElements = mainContent.querySelectorAll('p, h2, h3, h4, li, td');

    let found = 0;
    highlightableElements.forEach(element => {
        if (element.innerText.toLowerCase().includes(searchTerm)) {
            element.style.backgroundColor = '#ffeb3b';
            element.style.transition = 'background-color 0.3s';
            found++;
        } else {
            element.style.backgroundColor = '';
        }
    });

    if (found === 0) {
        alert(`Nenhum resultado encontrado para: "${query}"`);
    } else {
        alert(`${found} resultado(s) encontrado(s) para: "${query}"\nOs elementos foram destacados em amarelo.`);
        // Scroll até o primeiro resultado
        const firstHighlight = mainContent.querySelector('[style*="background-color"]');
        if (firstHighlight) {
            firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Buscar ao clicar no botão
searchButton?.addEventListener('click', () => {
    const query = searchInput.value;
    performSearch(query);
});

// Buscar ao pressionar Enter
searchInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value;
        performSearch(query);
    }
});

// Limpar destaques ao focar no input
searchInput?.addEventListener('focus', () => {
    const highlighted = document.querySelectorAll('[style*="background-color: rgb(255, 235, 59)"]');
    highlighted.forEach(element => {
        element.style.backgroundColor = '';
    });
    searchInput.value = '';
});

// ===== SCROLL SUAVE PARA LINKS INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== DETECTAR CLIQUE FORA DO MENU PARA FECHAR =====
document.addEventListener('click', (e) => {
    const isMenuClick = e.target.closest('.floating-menu');
    const isToggleClick = e.target.closest('.menu-toggle');

    if (!isMenuClick && !isToggleClick && floatingMenu?.classList.contains('active')) {
        floatingMenu.classList.remove('active');
        menuOverlay?.classList.remove('active');
    }
});

// ===== FUNÇÃO PARA LIMPAR RESULTADOS DE BUSCA =====
function clearSearchHighlights() {
    const allElements = document.querySelectorAll('[style*="background-color: rgb(255, 235, 59)"]');
    allElements.forEach(element => {
        element.style.backgroundColor = '';
    });
}

// Exportar funções para uso em outros scripts
window.searchFunctions = {
    performSearch,
    clearSearchHighlights
};

// ===== CONTROLE DE ACESSO - VERIFICAÇÃO DE AUTENTICAÇÃO =====
function verificarAcessoUsuario() {
    const paginasProtegidas = ['tags.html', 'formularios.html', 'tabelas.html', 'listas.html'];
    const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';
    const token = localStorage.getItem('tokenTechHub');

    // Se a página atual é protegida e não há token
    if (paginasProtegidas.includes(paginaAtual) && !token) {
        window.location.href = 'login.html';
        return false;
    }

    return true;
}

// Verificar acesso ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    verificarAcessoUsuario();
    atualizarMenuComRegistro();
});

// ===== FUNÇÃO PARA ATUALIZAR MENU COM INFORMAÇÕES DE AUTENTICAÇÃO =====
function atualizarMenuComRegistro() {
    const token = localStorage.getItem('tokenTechHub');
    const usuarioJSON = localStorage.getItem('usuarioTechHub');
    
    if (!token || !usuarioJSON) return;

    try {
        const usuario = JSON.parse(usuarioJSON);
        const menuNav = document.querySelector('.floating-menu nav');

        if (!menuNav) return;

        // Adicionar informações do usuário no topo do menu
        const usuarioInfo = document.createElement('div');
        usuarioInfo.className = 'usuario-info-menu';
        usuarioInfo.innerHTML = `
            <div class="usuario-info-content">
                <strong>👤 ${usuario.nick || usuario.nome}</strong>
                <small>${usuario.email}</small>
            </div>
            <button class="btn-logout-menu" type="button">Sair</button>
        `;

        // Inserir antes dos links
        menuNav.parentElement.insertBefore(usuarioInfo, menuNav);

        // Adicionar evento ao botão logout
        document.querySelector('.btn-logout-menu')?.addEventListener('click', fazerLogout);

        // Ocultar link de registro se estiver logado
        const linkRegistro = document.getElementById('link-registro');
        if (linkRegistro) {
            linkRegistro.style.display = 'none';
        }
    } catch (e) {
        console.error('Erro ao processar dados do usuário:', e);
    }
}

// ===== FUNÇÃO DE LOGOUT =====
function fazerLogout() {
    if (confirm('Deseja realmente sair?\n\nVocê será desconectado e redirecionado para o login.')) {
        localStorage.removeItem('tokenTechHub');
        localStorage.removeItem('usuarioTechHub');
        window.location.href = 'login.html';
    }
}

// ===== CSS DINÂMICO PARA INFORMAÇÕES DO USUÁRIO NO MENU =====
const styleUsuarioMenu = document.createElement('style');
styleUsuarioMenu.textContent = `
    .usuario-info-menu {
        padding: 20px 25px;
        background-color: #1a5490;
        border-bottom: 2px solid #34495e;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }

    .usuario-info-content {
        display: flex;
        flex-direction: column;
        color: white;
        flex: 1;
    }

    .usuario-info-content strong {
        font-size: 14px;
        word-break: break-word;
    }

    .usuario-info-content small {
        font-size: 11px;
        opacity: 0.8;
        word-break: break-word;
    }

    .btn-logout-menu {
        padding: 6px 12px;
        background-color: #f44336;
        color: white;
        border: none;
        border-radius: 3px;
        font-size: 12px;
        cursor: pointer;
        transition: background-color 0.3s;
        white-space: nowrap;
        flex-shrink: 0;
    }

    .btn-logout-menu:hover {
        background-color: #d32f2f;
    }

    @media (max-width: 768px) {
        .usuario-info-menu {
            flex-direction: column;
            padding: 15px 20px;
        }

        .usuario-info-content {
            width: 100%;
        }

        .btn-logout-menu {
            width: 100%;
        }
    }
`;

document.head.appendChild(styleUsuarioMenu);
