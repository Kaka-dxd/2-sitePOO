document.addEventListener("DOMContentLoaded", () => {
    let editId = null;

    function normalizarHorario(h) {
        return h.replace(/h/g, "").trim();
    }

    function obterAgendamentos() {
        const agendamentosExistentes = localStorage.getItem("agendamentos");
        if (agendamentosExistentes) {
            try {
                return JSON.parse(agendamentosExistentes);
            } catch (e) {
                return [];
            }
        }
        return [];
    }

    function salvarAgendamentos(agendamentos) {
        localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
    }

    function renderizar() {
        const agendamentos = obterAgendamentos();
        const tbody = document.getElementById("tabela-agendamentos");
        const totalCount = document.getElementById("total-count");

        totalCount.textContent = String(agendamentos.length).padStart(2, '0');
        tbody.innerHTML = "";

        if (agendamentos.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; color: #888; padding: 20px;">
                        Nenhum agendamento encontrado.
                    </td>
                </tr>
            `;
            return;
        }

        agendamentos.forEach((agendamento) => {
            const tr = document.createElement("tr");

            if (editId === agendamento.id) {
                // Modo de Edição Inline
                tr.innerHTML = `
                    <td><input type="text" class="edit-input" id="edit-data-${agendamento.id}" value="${agendamento.data}" style="width: 100px; padding: 4px; border: 1px solid #ccc; border-radius: 4px;"></td>
                    <td><input type="text" class="edit-input" id="edit-horario-${agendamento.id}" value="${agendamento.horario}" style="width: 70px; padding: 4px; border: 1px solid #ccc; border-radius: 4px;"></td>
                    <td><input type="text" class="edit-input" id="edit-nome-${agendamento.id}" value="${agendamento.nome}" style="width: 100%; padding: 4px; border: 1px solid #ccc; border-radius: 4px;"></td>
                    <td>
                        <select class="edit-input" id="edit-servico-${agendamento.id}" style="padding: 4px; border: 1px solid #ccc; border-radius: 4px;">
                            <option value="Cabelo" ${agendamento.servico === "Cabelo" ? "selected" : ""}>Cabelo</option>
                            <option value="Barba" ${agendamento.servico === "Barba" ? "selected" : ""}>Barba</option>
                            <option value="Cabelo & Barba" ${agendamento.servico === "Cabelo & Barba" ? "selected" : ""}>Cabelo & Barba</option>
                            <option value="Cabelo, Barba e Sombrancelha" ${agendamento.servico === "Cabelo, Barba e Sombrancelha" ? "selected" : ""}>Cabelo, Barba e Sombrancelha</option>
                            <option value="Cabelo e Sombrancelha" ${agendamento.servico === "Cabelo e Sombrancelha" ? "selected" : ""}>Cabelo e Sombrancelha</option>
                            <option value="Sombrancelha" ${agendamento.servico === "Sombrancelha" ? "selected" : ""}>Sombrancelha</option>
                        </select>
                    </td>
                    <td><input type="text" class="edit-input" id="edit-telefone-${agendamento.id}" value="${agendamento.telefone}" style="width: 100%; padding: 4px; border: 1px solid #ccc; border-radius: 4px;"></td>
                    <td class="actions-cell">
                        <button class="btn btn-save" data-id="${agendamento.id}">💾 Salvar</button>
                        <button class="btn btn-cancel">❌ Cancelar</button>
                    </td>
                `;

                // Event listener para Salvar
                tr.querySelector(".btn-save").addEventListener("click", () => {
                    const novaData = document.getElementById(`edit-data-${agendamento.id}`).value.trim();
                    const novoHorario = document.getElementById(`edit-horario-${agendamento.id}`).value.trim();
                    const novoNome = document.getElementById(`edit-nome-${agendamento.id}`).value.trim();
                    const novoServico = document.getElementById(`edit-servico-${agendamento.id}`).value;
                    const novoTelefone = document.getElementById(`edit-telefone-${agendamento.id}`).value.trim();

                    if (!novaData || !novoHorario || !novoNome || !novoTelefone) {
                        alert("Preencha todos os campos!");
                        return;
                    }

                    // Validação de duplicidade de horário no mesmo dia
                    const horarioNormalizado = normalizarHorario(novoHorario);
                    const jaExiste = agendamentos.some(a => 
                        a.id !== agendamento.id && 
                        a.data === novaData && 
                        normalizarHorario(a.horario) === horarioNormalizado
                    );

                    if (jaExiste) {
                        alert("Desculpe, já existe um agendamento marcado para este dia e horário!");
                        return;
                    }

                    // Mapeia serviço para preço
                    const precos = {
                        "Cabelo": "R$ 30,00",
                        "Barba": "R$ 30,00",
                        "Cabelo & Barba": "R$ 60,00",
                        "Cabelo, Barba e Sombrancelha": "R$ 65,00",
                        "Cabelo e Sombrancelha": "R$ 40,00",
                        "Sombrancelha": "R$ 10,00"
                    };

                    agendamento.data = novaData;
                    agendamento.horario = novoHorario;
                    agendamento.nome = novoNome;
                    agendamento.servico = novoServico;
                    agendamento.preco = precos[novoServico] || "R$ 0,00";
                    agendamento.telefone = novoTelefone;

                    const listaAtualizada = agendamentos.map(a => a.id === agendamento.id ? agendamento : a);
                    salvarAgendamentos(listaAtualizada);
                    editId = null;
                    renderizar();
                });

                // Event listener para Cancelar
                tr.querySelector(".btn-cancel").addEventListener("click", () => {
                    editId = null;
                    renderizar();
                });

            } else {
                // Modo de Exibição de Leitura
                tr.innerHTML = `
                    <td>${agendamento.data}</td>
                    <td>${agendamento.horario}</td>
                    <td>${agendamento.nome}</td>
                    <td>${agendamento.servico}</td>
                    <td>${agendamento.telefone}</td>
                    <td class="actions-cell">
                        <button class="btn btn-edit" data-id="${agendamento.id}">📝 Editar</button>
                        <button class="btn btn-delete" data-id="${agendamento.id}">🗑️ Excluir</button>
                    </td>
                `;

                // Event listener para Editar
                tr.querySelector(".btn-edit").addEventListener("click", () => {
                    editId = agendamento.id;
                    renderizar();
                });

                // Event listener para Excluir
                tr.querySelector(".btn-delete").addEventListener("click", () => {
                    if (confirm(`Deseja realmente excluir o agendamento de ${agendamento.nome}?`)) {
                        const listaFiltrada = agendamentos.filter(a => a.id !== agendamento.id);
                        salvarAgendamentos(listaFiltrada);
                        renderizar();
                    }
                });
            }

            tbody.appendChild(tr);
        });
    }

    renderizar();
});
