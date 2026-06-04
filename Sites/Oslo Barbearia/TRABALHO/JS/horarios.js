let cards = document.querySelectorAll(".card");

// Normaliza strings de horário removendo o "h" e espaços (ex: "15:00h" -> "15:00")
function normalizarHorario(h) {
    return h.replace(/h/g, "").trim();
}

// Filtra e oculta horários que já foram agendados para este dia
const dataSelecionada = localStorage.getItem("dataDoAgendamento");
const agendamentosExistentes = localStorage.getItem("agendamentos");
let horariosOcupados = [];

if (agendamentosExistentes && dataSelecionada) {
    try {
        const lista = JSON.parse(agendamentosExistentes);
        horariosOcupados = lista
            .filter(a => a.data === dataSelecionada)
            .map(a => normalizarHorario(a.horario));
    } catch (e) {
        console.error("Erro ao ler agendamentos", e);
    }
}

cards.forEach(card => {
    const horarioCard = normalizarHorario(card.innerText);
    if (horariosOcupados.includes(horarioCard)) {
        card.style.display = "none";
    }
});

cards.forEach(function(card){

    card.addEventListener("click", function(){

        // remove seleção dos outros
        cards.forEach(function(c){
            c.classList.remove("selecionado");
        });

        // adiciona no card clicado
        card.classList.add("selecionado");

    });

});



//BOTÃO CONFIRMAR

let botao = document.getElementById("btnConfirmar");
let horarioSelecionado = null;

cards.forEach(function(card){

    card.addEventListener("click", function(){

        cards.forEach(function(c){
            c.classList.remove("selecionado");
        });

        card.classList.add("selecionado");

        // guarda o serviço selecionado
        horarioSelecionado = card.innerText;
    });

});

botao.addEventListener("click", function(){

    if(!horarioSelecionado){
        alert("Selecione um horário primeiro!");
        return;
    } else {
        localStorage.setItem("horario", horarioSelecionado);

        // Salvar na lista geral de agendamentos para o administrativo
        let agendamentosExistentes = localStorage.getItem("agendamentos");
        let listaAgendamentos = [];
        if (agendamentosExistentes) {
            try {
                listaAgendamentos = JSON.parse(agendamentosExistentes);
            } catch (e) {
                listaAgendamentos = [];
            }
        }

        const novoAgendamento = {
            id: Date.now().toString(),
            nome: localStorage.getItem("nome") || "",
            telefone: localStorage.getItem("telefone") || "",
            servico: localStorage.getItem("servico") || "",
            preco: localStorage.getItem("preco") || "",
            data: localStorage.getItem("dataDoAgendamento") || "",
            horario: horarioSelecionado
        };

        listaAgendamentos.push(novoAgendamento);
        localStorage.setItem("agendamentos", JSON.stringify(listaAgendamentos));
        localStorage.setItem("ultimoAgendamentoId", novoAgendamento.id);
    }

    // redireciona
    window.location.href = "confirma.html";
});