function getTutores() {
    return JSON.parse(localStorage.getItem("tutores") || "[]");
}

function saveTutores(lista) {
    localStorage.setItem("tutores", JSON.stringify(lista));
}

function addTutor() {
    const nome = document.getElementById("nomeTutor").value;
    const telefone = document.getElementById("telefoneTutor").value;

    if (!nome) return alert("Digite o nome");

    const lista = getTutores();
    lista.push({ id: Date.now(), nome, telefone });
    saveTutores(lista);

    listarTutores();
}

function removerTutor(id) {
    const lista = getTutores().filter(t => t.id !== id);
    saveTutores(lista);
    listarTutores();
}

function listarTutores() {
    const tabela = document.getElementById("tabelaTutores");
    const lista = getTutores();

    tabela.innerHTML = `
    <tr><th>Nome</th><th>Telefone</th><th>Ações</th></tr>
    `;

    lista.forEach(t => {
        tabela.innerHTML += `
        <tr>
          <td>${t.nome}</td>
          <td>${t.telefone}</td>
          <td><button onclick="removerTutor(${t.id})">Excluir</button></td>
        </tr>`;
    });
}
