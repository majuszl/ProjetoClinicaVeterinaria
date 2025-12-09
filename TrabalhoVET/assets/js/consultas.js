function getConsultas() {
    return JSON.parse(localStorage.getItem("consultas") || "[]");
}

function saveConsultas(lista) {
    localStorage.setItem("consultas", JSON.stringify(lista));
}

function carregarAnimais() {
    const animais = JSON.parse(localStorage.getItem("animais") || "[]");
    const select = document.getElementById("animalConsulta");

    select.innerHTML = "<option value=''>Selecione um animal</option>";

    animais.forEach(a => {
        select.innerHTML += `<option value="${a.id}">${a.nome}</option>`;
    });
}

function addConsulta() {
    const animalId = document.getElementById("animalConsulta").value;
    const data = document.getElementById("dataConsulta").value;
    const motivo = document.getElementById("motivoConsulta").value;

    if (!animalId || !data || !motivo) return alert("Preencha todos os campos");

    const lista = getConsultas();

    lista.push({
        id: Date.now(),
        animalId: Number(animalId),
        data,
        motivo,
        status: "Agendada"
    });

    saveConsultas(lista);
    listarConsultas();
}

function cancelarConsulta(id) {
    const lista = getConsultas();
    const consulta = lista.find(c => c.id === id);

    consulta.status = "Cancelada";
    saveConsultas(lista);

    listarConsultas();
}

function listarConsultas() {
    const tabela = document.getElementById("tabelaConsultas");
    const lista = getConsultas();
    const animais = JSON.parse(localStorage.getItem("animais") || "[]");

    tabela.innerHTML = `
    <tr><th>Animal</th><th>Data</th><th>Motivo</th><th>Status</th><th>Ações</th></tr>
    `;

    lista.forEach(c => {
        const animal = animais.find(a => a.id === c.animalId);

        tabela.innerHTML += `
        <tr>
          <td>${animal ? animal.nome : "—"}</td>
          <td>${new Date(c.data).toLocaleString()}</td>
          <td>${c.motivo}</td>
          <td>${c.status}</td>
          <td>
            ${c.status === "Agendada" ? `<button onclick="cancelarConsulta(${c.id})">Cancelar</button>` : ""}
          </td>
        </tr>`;
    });
}
