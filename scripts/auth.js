const apiURL = "http://localhost:3000";
async function post(url, data) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

async function checkAuth() {
    const name = localStorage.getItem("nome")
    const password = localStorage.getItem("senha")
    return await checkAuth(name, password);
}

async function checkAuth(name, password) {
    if (!name || !password) {
        return false;
    }
    const result = await post(`${apiURL}/isAdmin/`, { auth: {username: name, password: password} });
    return !result.error && result.result;
}