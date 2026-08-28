function hideLogin() {
    document.getElementById("login").classList.add("hidden");
}

function hideLogOut() {
    document.getElementById("logout").classList.add("hidden");
    document.getElementById("cadastro-projeto").classList.add("hidden");
}

function showLogin() {
    document.getElementById("login").classList.remove("hidden");
}
function showLogOut() {
    document.getElementById("logout").classList.remove("hidden");
    document.getElementById("cadastro-projeto").classList.remove("hidden");
}
document.addEventListener("DOMContentLoaded", async () => {
    hideLogOut()
    const val = await checkAuth();
    console.log(val)
    if (val) {
        hideLogin()
        showLogOut()
    } else {
        showLogin()
    }

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("nome");
        localStorage.removeItem("senha");
        hideLogOut()
        showLogin()
    })
})