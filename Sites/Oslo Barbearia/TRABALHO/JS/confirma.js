let servico = localStorage.getItem("servico");
let preco = localStorage.getItem("preco");
let horario = localStorage.getItem("horario");
const dataSalva = localStorage.getItem('dataDoAgendamento');

// Insere os dados nos respectivos elementos HTML
document.getElementById("servico").textContent = servico;
document.getElementById("preco").textContent = "Valor: " + preco;
document.getElementById("data").textContent = "Marcado para dia: " + dataSalva;
document.getElementById("horario").textContent = "Às " + horario;

const btnEditar = document.getElementById("btnEditar");
const btnExcluir = document.getElementById("btnExcluir");

// Função auxiliar para remover o agendamento atual da lista
function removerAgendamentoAtual() {
    const ultimoId = localStorage.getItem("ultimoAgendamentoId");
    if (ultimoId) {
        const agendamentosExistentes = localStorage.getItem("agendamentos");
        if (agendamentosExistentes) {
            try {
                let lista = JSON.parse(agendamentosExistentes);
                lista = lista.filter(a => a.id !== ultimoId);
                localStorage.setItem("agendamentos", JSON.stringify(lista));
            } catch (e) {
                console.error("Erro ao remover agendamento", e);
            }
        }
    }
}

if (btnEditar) {
    btnEditar.addEventListener("click", () => {
        // Remove da lista para não duplicar quando reconfirmar
        removerAgendamentoAtual();
        // Redireciona de volta para a escolha de serviço
        window.location.href = "pagina2.html";
    });
}

if (btnExcluir) {
    btnExcluir.addEventListener("click", () => {
        if (confirm("Tem certeza que deseja cancelar este agendamento?")) {
            removerAgendamentoAtual();
            // Limpa as variáveis temporárias
            localStorage.removeItem("servico");
            localStorage.removeItem("preco");
            localStorage.removeItem("dataDoAgendamento");
            localStorage.removeItem("horario");
            localStorage.removeItem("ultimoAgendamentoId");
            
            alert("Agendamento cancelado com sucesso!");
            window.location.href = "index.html";
        }
    });
}