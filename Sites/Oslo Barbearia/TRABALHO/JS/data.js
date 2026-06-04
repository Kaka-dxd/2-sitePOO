// Seleciona os elementos do HTML
const campoData = document.getElementById('dataAgendamento');
const btnConfirmar = document.getElementById('btnConfirmar');

// Bloqueia datas passadas no calendário nativo (só permite de hoje em diante)
const hoje = new Date().toISOString().split('T')[0];
campoData.setAttribute('min', hoje);

// Toda a validação agora acontece quando o usuário clica em "Confirmar"
btnConfirmar.addEventListener('click', function() {
    const dataSelecionada = campoData.value;

    // 1ª Validação: Verifica se o usuário NÃO selecionou nenhuma data
    if (!dataSelecionada) {
        alert('Por favor, selecione uma data no calendário antes de confirmar.');
        return; // Para o código aqui e não avança de página
    }

    // Cria o objeto de data para verificar o dia da semana
    const dataObjeto = new Date(dataSelecionada + 'T00:00:00');
    const diaDaSemana = dataObjeto.getDay(); // 0 = Domingo, 1 = Segunda...

    // 2ª Validação: Verifica se a data escolhida é um Domingo
    if (diaDaSemana === 0) {
        alert('Desculpe, não funcionamos aos domingos. Por favor, escolha de segunda a sábado.');
        campoData.value = ''; // Limpa o campo inválido
        return; // Para o código aqui e não avança de página
    }

    // SE PASSOU POR TODAS AS VALIDAÇÕES:
    // Formata a data para o padrão brasileiro (DD/MM/AAAA)
    const partes = dataSelecionada.split('-');
    const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;

    // Salva a data na memória do navegador
    localStorage.setItem('dataDoAgendamento', dataFormatada);

    // Redireciona para a próxima página
    window.location.href = 'horarios.html';
});