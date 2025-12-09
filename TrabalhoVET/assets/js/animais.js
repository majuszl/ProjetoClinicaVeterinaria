function getAnimais() {
    return JSON.parse(localStorage.getItem("animais") || "[]");
}

function saveAnimais(lista) {
    localStorage.setItem("animais", JSON.stringify(lista));
}

function carregarTutores() {
    const tutores = JSON.parse(localStorage.getItem("tutores") || "[]");
    const select = document.getElementById("tutorAnimal");

    select.innerHTML = "<option value=''>Selecione um tutor</option>";

    tutores.forEach(t => {
        select.innerHTML += `<option value="${t.id}">${t.nome}</option>`;
    });
}

function addAnimal() {
    const nome = document.getElementById("nomeAnimal").value;
    const especie = document.getElementById("especieAnimal").value;
    const tutor = document.getElementById("tutorAnimal").value;

    if (!nome || !especie || !tutor) return alert("Preencha todos os campos");

    const lista = getAnimais();
    lista.push({
        id: Date.now(),
        nome,
        especie,
        tutorId: Number(tutor)
    });

    saveAnimais(lista);
    listarAnimais();
}

function removerAnimal(id) {
    const lista = getAnimais().filter(a => a.id !== id);
    saveAnimais(lista);
    listarAnimais();
}

function listarAnimais() {
    const tabela = document.getElementById("tabelaAnimais");
    const lista = getAnimais();
    const tutores = JSON.parse(localStorage.getItem("tutores") || "[]");

    tabela.innerHTML = `
    <tr><th>Nome</th><th>Espécie</th><th>Tutor</th><th>Ações</th></tr>
    `;

    lista.forEach(a => {
        const tutor = tutores.find(t => t.id === a.tutorId);

        tabela.innerHTML += `
        <tr>
          <td>${a.nome}</td>
          <td>${a.especie}</td>
          <td>${tutor ? tutor.nome : "—"}</td>
          <td><button onclick="removerAnimal(${a.id})">Excluir</button></td>
        </tr>`;
    });
}
