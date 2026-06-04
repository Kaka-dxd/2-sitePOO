let cards = document.querySelectorAll(".card");
let botao = document.getElementById("btnConfirmar");

let servicoSelecionado = null;
let precoSelecionado = null;

cards.forEach(function(card) {
    card.addEventListener("click", function() {
        // Remove a seleção de todos os outros cards
        cards.forEach(function(c) {
            c.classList.remove("selecionado");
        });

        // Adiciona a seleção ao card clicado
        card.classList.add("selecionado");

        // Pega o texto do primeiro span (Nome do serviço) e do segundo span (Preço)
        let spans = card.querySelectorAll("span");
        servicoSelecionado = spans[0].innerText;
        precoSelecionado = spans[1].innerText;
    });
});

botao.addEventListener("click", function() {
    if (!servicoSelecionado) {
        alert("Selecione um serviço primeiro!");
        return;
    }

    // Salva os dados separadamente para usar na outra página
    localStorage.setItem("servico", servicoSelecionado);
    localStorage.setItem("preco", precoSelecionado);

    // Redireciona para a página de horários
    window.location.href = "data.html";
});

// Traz o nome do usuário para as boas-vindas
let nome = localStorage.getItem("nome");
document.getElementById("mensagem").textContent = "Bem-vindo, " + nome + " !";