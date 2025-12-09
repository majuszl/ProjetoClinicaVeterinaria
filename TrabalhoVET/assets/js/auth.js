function login() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if (user === "admin" && pass === "123") {
        localStorage.setItem("logado", "true");
        window.location = "dashboard.html";
    } else {
        alert("Usuário ou senha incorretos.");
    }
}

function proteger() {
    if (localStorage.getItem("logado") !== "true") {
        window.location = "index.html";
    }
}

function sair() {
    localStorage.removeItem("logado");
    window.location = "index.html";
}