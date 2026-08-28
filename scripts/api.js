const apiURL = "http://localhost:3000";
function createAdmin(username, password, perms) {
    return {username: username, password: password, permission: perms}
}

function parseAdminAPIObject(admin) {
    return {id: admin.id, name: admin.nome, password: admin.senha, permission: admin.permissao}
}

async function get(url) {
    const response = await fetch(`${apiURL}/${url}`);
    return await response.json();
}

async function post(url, data) {
    const response = await fetch(`${apiURL}/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

async function postForm(url, data) {
    // to-do
}

function checkError(res) {
    return res.error;
}

async function getAuthRequest(name, password) {
    const result = await post(`isAdmin/`, { auth: {username: name, password: password} });
    return result.result.message;
}

async function getProjectsRequest() {
    return await getProjectsRequest(1);
}

async function getProjectsRequest(page) {
    const result = await (await get(`getProjects/${page}`)).json()
    if (checkError) {
        return null;
    }
    return result.result;
}

async function getDetailedProjectRequest(id) {
    const result = await get(`getProjectDetails/${id}`)
    if (checkError) {
        return null;
    }
    return result.result;
}

async function registerAdmin(admin) {
    const login = localStorage.getItem("login");
    const password = localStorage.getItem("password");
    let result;
    console.log({
            auth: {
                username: login,
                password: password,
            },
            ...admin
        })
    if (login && password) {
        result = await post("registerAdmin/", {
            auth: {
                username: login,
                password: password,
            },
            ...admin
        })
    } else {
        result = await post("registerAdmin/", {
            ...admin
        })
    }
    return !result.error;
}

async function registerProject(project) {
    // to-do
}