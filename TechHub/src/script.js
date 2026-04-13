// Gerenciar Menu Flutuante
const menuToggle = document.querySelector('.menu-toggle');
const floatingMenu = document.querySelector('.floating-menu');
const menuOverlay = document.querySelector('.menu-overlay');
const menuClose = document.querySelector('.menu-close');
const userAvatar = document.querySelector('.user-avatar');

// Seletor atualizado para links do menu
const menuLinks = document.querySelectorAll('.floating-menu nav a, .menu-auth-link, .menu-user-profile');

// Função para fechar menu
function closeMenu() {
    floatingMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
}

// Abrir menu
menuToggle?.addEventListener('click', () => {
    floatingMenu.classList.add('active');
    menuOverlay.classList.add('active');
});

// Fechar menu ao clicar no botão X
menuClose?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
});

// Fechar menu ao clicar no overlay
menuOverlay?.addEventListener('click', closeMenu);

// Fechar menu ao clicar em um link
menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Fechar menu ao pressionar ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && floatingMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Marcar link ativo baseado na página atual
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.floating-menu nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Gerenciar exibição de usuário/avatar
function updateUserDisplay() {
    const usuarioRegistrado = localStorage.getItem('usuarioTechHub');
    const usuario = usuarioRegistrado ? JSON.parse(usuarioRegistrado) : null;
    const headerAuth = document.querySelector('.header-auth');
    const menuUserSection = document.getElementById('menu-user-section');
    const menuAuthSection = document.getElementById('menu-auth-section');
    
    if (usuario && userAvatar) {
        // Mostrar avatar no header e ocultar botões de auth
        userAvatar.classList.add('active');
        const loginBtn = headerAuth.querySelector('.btn-login');
        const registroBtn = headerAuth.querySelector('.btn-registro');
        if (loginBtn) loginBtn.style.display = 'none';
        if (registroBtn) registroBtn.style.display = 'none';
        
        // Atualizar menu com informações do usuário
        if (menuUserSection) {
            const menuUserName = document.getElementById('menu-user-name');
            const menuUserAvatar = document.getElementById('menu-user-avatar');
            
            if (menuUserName) {
                menuUserName.textContent = usuario.nick || usuario.nome || 'Usuário';
            }
            
            if (menuUserAvatar) {
                // Criar inicial do usuário
                const inicial = (usuario.nick || usuario.nome || 'U').charAt(0).toUpperCase();
                menuUserAvatar.textContent = inicial;
            }
            
            menuUserSection.style.display = 'flex';
        }
        
        // Ocultar seção de autenticação
        if (menuAuthSection) {
            menuAuthSection.style.display = 'none';
        }
        
        // Adicionar evento ao avatar do header para ir à página de perfil
        userAvatar.addEventListener('click', () => {
            window.location.href = 'perfil.html';
        });
        
        // Adicionar evento ao nome/avatar do menu para ir à página de perfil
        const menuUserProfile = document.querySelector('.menu-user-profile');
        if (menuUserProfile) {
            menuUserProfile.addEventListener('click', () => {
                closeMenu();
                window.location.href = 'perfil.html';
            });
        }
        
        // Adicionar evento específico ao avatar no menu para ir ao perfil
        const menuUserAvatar = document.getElementById('menu-user-avatar');
        if (menuUserAvatar) {
            menuUserAvatar.addEventListener('click', (e) => {
                e.stopPropagation();
                closeMenu();
                window.location.href = 'perfil.html';
            });
        }
    } else {
        // Mostrar botões de login/registro
        const loginBtn = headerAuth?.querySelector('.btn-login');
        const registroBtn = headerAuth?.querySelector('.btn-registro');
        if (loginBtn) loginBtn.style.display = '';
        if (registroBtn) registroBtn.style.display = '';
        
        // Ocultar seção de perfil do menu
        if (menuUserSection) {
            menuUserSection.style.display = 'none';
        }
        
        // Mostrar seção de autenticação
        if (menuAuthSection) {
            menuAuthSection.style.display = '';
        }
        
        userAvatar.classList.remove('active');
    }
}

// Adicionar evento ao botão logout
function setupLogoutButton() {
    const logoutBtn = document.getElementById('menu-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Deseja realmente sair?')) {
                localStorage.removeItem('tokenTechHub');
                localStorage.removeItem('usuarioTechHub');
                window.location.href = 'login.html';
            }
        });
    }
}

// Chamar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    setActiveLink();
    updateUserDisplay();
    setupLogoutButton();
    verificarAcessoUsuario();
});

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
});
