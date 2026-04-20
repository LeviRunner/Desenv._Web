// Comentário
// Verica em schema.sql se usuario tem permissão para acessar a tabela "pessoas" e se a tabela existe
// Se a tabela existir, faça uma consulta para selecionar todas as pessoas e imprima os resultados

// script7.js vai vai a verificação e o arquivo schema.sql vai criar a tabela e inserir os dados

// o arquivo math.php vai servir para fazer buscas no banco de dados e retornar os resultados para o script7.js

// Conexão com o banco de dados

// Comentário
// Verica em schema.sql se usuario tem permissão para acessar a tabela "pessoas" e se a tabela existe
// Se a tabela existir, faça uma consulta para selecionar todas as pessoas e imprima os resultados

// script7.js vai vai a verificação e o arquivo schema.sql vai criar a tabela e inserir os dados

// o arquivo math.php vai servir para fazer buscas no banco de dados e retornar os resultados para o script7.js

// Conexão com o banco de dados

// ===== SCRIPT PARA GRÁFICOS COM CHART.JS =====

document.addEventListener('DOMContentLoaded', () => {
    // ===== GRÁFICO 1: VENDAS MENSAIS (BAR CHART) =====
    criarGraficoVendas();

    // ===== GRÁFICO 2: VISITAS POR PÁGINA (LINE CHART) =====
    criarGraficoVisitas();

    // ===== GRÁFICO 3: DISTRIBUIÇÃO DE ACESSO (PIE CHART) =====
    criarGraficoDistribuicao();
});

/**
 * Extrai dados de uma tabela HTML
 * @param {string} tabelaId - ID da tabela HTML
 * @returns {Object} Objeto com labels e valores
 */
function extrairDadosDaTabela(tabelaId) {
    const tabela = document.getElementById(tabelaId);
    if (!tabela) {
        console.error(`Tabela com ID "${tabelaId}" não encontrada`);
        return { labels: [], valores: [] };
    }

    const linhas = tabela.querySelectorAll('tbody tr');
    const labels = [];
    const valores = [];

    linhas.forEach(linha => {
        // Primeira célula = label, segunda célula = valor
        if (linha.cells.length >= 2) {
            labels.push(linha.cells[0].innerText.trim());
            valores.push(parseFloat(linha.cells[1].innerText.trim()));
        }
    });

    return { labels, valores };
}

/**
 * Cria gráfico de Vendas (Bar Chart)
 */
function criarGraficoVendas() {
    const { labels, valores } = extrairDadosDaTabela('dados-vendas');

    if (labels.length === 0) {
        console.error('Nenhum dado encontrado para o gráfico de vendas');
        return;
    }

    const ctx = document.getElementById('graficoVendas');
    if (!ctx) {
        console.error('Canvas com ID "graficoVendas" não encontrado');
        return;
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Vendas Mensais (R$)',
                data: valores,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',   // azul
                    'rgba(75, 192, 92, 0.6)',    // verde
                    'rgba(255, 159, 64, 0.6)',   // laranja
                    'rgba(153, 102, 255, 0.6)',  // roxo
                    'rgba(255, 99, 132, 0.6)',   // vermelho
                    'rgba(255, 206, 86, 0.6)'    // amarelo
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 92, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 2,
                borderRadius: 5,
                hoverBackgroundColor: 'rgba(0, 0, 0, 0.2)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            size: 12,
                            weight: 'bold'
                        },
                        color: '#333'
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 12,
                    cornerRadius: 6,
                    callbacks: {
                        label: function(context) {
                            return 'R$ ' + context.parsed.y.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            });
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Vendas (R$)',
                        font: {
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toLocaleString('pt-BR');
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Meses',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}

/**
 * Cria gráfico de Visitas (Line Chart)
 */
function criarGraficoVisitas() {
    const { labels, valores } = extrairDadosDaTabela('dados-visitas');

    if (labels.length === 0) {
        console.error('Nenhum dado encontrado para o gráfico de visitas');
        return;
    }

    const ctx = document.getElementById('graficoVisitas');
    if (!ctx) {
        console.error('Canvas com ID "graficoVisitas" não encontrado');
        return;
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Visitas',
                data: valores,
                borderColor: 'rgba(75, 192, 92, 1)',
                backgroundColor: 'rgba(75, 192, 92, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: 'rgba(75, 192, 92, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 8,
                hoverBackgroundColor: 'rgba(75, 192, 92, 0.8)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            size: 12,
                            weight: 'bold'
                        },
                        color: '#333'
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 12,
                    cornerRadius: 6
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Número de Visitas',
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Páginas',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}

/**
 * Cria gráfico de Distribuição (Pie Chart)
 */
function criarGraficoDistribuicao() {
    const { labels, valores } = extrairDadosDaTabela('dados-distribuicao');

    if (labels.length === 0) {
        console.error('Nenhum dado encontrado para o gráfico de distribuição');
        return;
    }

    const ctx = document.getElementById('graficoDistribuicao');
    if (!ctx) {
        console.error('Canvas com ID "graficoDistribuicao" não encontrado');
        return;
    }

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Distribuição de Acesso',
                data: valores,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(75, 192, 92, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 92, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 12,
                            weight: 'bold'
                        },
                        color: '#333',
                        padding: 15
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 12,
                    cornerRadius: 6,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}
