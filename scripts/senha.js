let visible = false;
function validateName() {
    let text = "";
    const nameInput = document.getElementById("name");
    const name = nameInput.value;
    if (name.length < 3) {
        text = "O login deve ter pelo menos 3 caracteres.";
    }
    if (name.length > 32) {
        text = "O login não deve exceder 32 caracteres.";
    }
    if (text.length > 0) {
        document.getElementById("name-error").innerText = text;
        document.getElementById("name-error").classList.remove("hidden");
        nameInput.focus();
        return false;
    } else {
        document.getElementById("name-error").innerText = "";
        document.getElementById("name-error").classList.add("hidden");
        return true;
    }
}

function validatePassword() {
    let text = "";
    const passwordInput = document.getElementById("password");
    const password = passwordInput.value;
    if (password.length < 8) {
        text = "A senha deve ter pelo menos 8 caracteres.";
    }
    if (password.length > 18) {
        text = "A senha não deve exceder 18 caracteres.";
    }
    if (!/[A-Z]/.test(password)) {
        text = "A senha deve conter pelo menos uma letra maiúscula.";
    }
    if (!/[a-z]/.test(password)) {
        text = "A senha deve conter pelo menos uma letra minúscula.";
    }
    if (!/[0-9]/.test(password)) {
        text = "A senha deve conter pelo menos um número.";
    }
    if (text.length > 0) {
        document.getElementById("password-error").innerText = text;
        document.getElementById("password-error").classList.remove("hidden");
        passwordInput.focus();
        return false;
    } else {
        document.getElementById("password-error").innerText = "";
        document.getElementById("password-error").classList.add("hidden");
        return true;
    }
}

function togglePasswordVisibility() {
    visible = !visible;
    document.getElementById("password").type = visible ? "text" : "password";
    const icon = document.querySelector("#toggle-password-visibility");
    icon.classList.toggle("bx-eye");
    icon.classList.toggle("bx-eye-closed");
}

async function onLogin() {
    if (validateName() && validatePassword()) {
        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;
        const res = await checkAuth(name, password);
        if (res) {
            localStorage.setItem("nome", name);
            localStorage.setItem("senha", password);
            window.location.href = "index.html";
        } else {
            document.getElementById("validation-error").innerText =
                "Credenciais inválidas.";
            document
                .getElementById("validation-error")
                .classList.remove("hidden");
        }
    }
}

async function onRegister() {
    if (validateName() && validatePassword()) {
        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;
        const perms = Number(document.getElementById("perms").value);
        const [res, err] = await registerAdmin(
            createAdmin(name, password, perms),
        );
        if (res) {
            document.getElementById("account-created-dialog").showModal();
        } else {
            if (err === "Duplicate Admin") {
                document.getElementById("name-error").innerText =
                    "Este nome já existe";
                document
                    .getElementById("name-error")
                    .classList.remove("hidden");
                document.getElementById("name").focus();
            } else {
                document.getElementById("validation-error").innerText =
                    "Credenciais inválidas.";
                document
                    .getElementById("validation-error")
                    .classList.remove("hidden");
            }
        }
    }
}
