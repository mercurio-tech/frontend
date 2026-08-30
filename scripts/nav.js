function hideLogin() {
    document.getElementById("login").classList.add("hidden");
}

function hideLogOut() {
    document.getElementById("logout").classList.add("hidden");
    document.getElementById("cadastro-projeto").classList.add("hidden");
    document.getElementById("register").classList.add("hidden");
}

function showLogin() {
    document.getElementById("login").classList.remove("hidden");
}
function showLogOut() {
    document.getElementById("logout").classList.remove("hidden");
    document.getElementById("cadastro-projeto").classList.remove("hidden");
    document.getElementById("register").classList.remove("hidden");
}
document.addEventListener("DOMContentLoaded", async () => {
    hideLogOut();
    if (await checkAuth()) {
        hideLogin();
        showLogOut();
    } else {
        showLogin();
        if (!(await isAdminPresent())) {
            document.getElementById("register").classList.remove("hidden");
        }
    }

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("nome");
        localStorage.removeItem("senha");
        hideLogOut();
        showLogin();
    });
});
