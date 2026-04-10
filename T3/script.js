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
