function listarHistorico() {
    const tabela = document.getElementById("tabelaHistorico");
    const consultas = JSON.parse(localStorage.getItem("consultas") || "[]");
    const animais = JSON.parse(localStorage.getItem("animais") || "[]");

    tabela.innerHTML = `
    <tr><th>Animal</th><th>Data</th><th>Motivo</th><th>Status</th></tr>
    `;

    consultas
        .filter(c => c.status !== "Agendada")
        .forEach(c => {
            const animal = animais.find(a => a.id === c.animalId);

            tabela.innerHTML += `
            <tr>
              <td>${animal ? animal.nome : "—"}</td>
              <td>${new Date(c.data).toLocaleString()}</td>
              <td>${c.motivo}</td>
              <td>${c.status}</td>
            </tr>`;
        });
}
