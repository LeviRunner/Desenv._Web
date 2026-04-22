document.getElementById('formLogin').addEventListener('submit', function(event) {
    // Impede o recarregamento padrão da página ao enviar o formulário
    event.preventDefault();

    const formulario = document.getElementById('formLogin');
    const dados = new FormData(formulario);
    const divMensagem = document.getElementById('mensagem');

    divMensagem.style.color = 'blue';
    divMensagem.textContent = 'Verificando credenciais...';

    // Envia os dados para o back-end (login.php) via Fetch API
    fetch('login.php', {
        method: 'POST',
        body: dados
    })
    .then(resposta => {
        if (!resposta.ok) throw new Error('Erro na rede ou servidor.');
        return resposta.json();
    })
    .then(resultado => {
        if (resultado.sucesso) {
            divMensagem.style.color = 'green';
            divMensagem.textContent = resultado.mensagem;
            // Redireciona para o painel após 1.5 segundos para o usuário ler a mensagem
            setTimeout(() => {
                window.location.href = 'dashboard.php';
            }, 1500);
        } else {
            divMensagem.style.color = 'red';
            divMensagem.textContent = resultado.mensagem;
        }
    })
    .catch(erro => {
        console.error('Erro:', erro);
        divMensagem.style.color = 'red';
        divMensagem.textContent = 'Erro ao conectar ao servidor.';
    });
});
