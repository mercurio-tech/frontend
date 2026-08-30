const apiURL = "http://localhost:3000";

function createAuth() {
    return {
        username: localStorage.getItem("nome"),
        password: localStorage.getItem("senha"),
    };
}

function createAdmin(username, password, perms) {
    return { username: username, password: password, permission: perms };
}

function createProject(
    id,
    title,
    subtitle,
    desc,
    student,
    prof,
    type,
    year,
    tags,
) {
    if (id === null) {
        return {
            titulo: title,
            subtitulo: subtitle,
            descricao: desc,
            aluno: student,
            professor: prof,
            tipo: type,
            ano: Number(year),
            tags: tags,
        };
    }
    return {
        id: id,
        titulo: title,
        subtitulo: subtitle,
        descricao: desc,
        aluno: student,
        professor: prof,
        tipo: type,
        ano: Number(year),
        tags: tags,
    };
}

function parseAdminAPIObject(admin) {
    return {
        id: admin.id,
        name: admin.nome,
        password: admin.senha,
        permission: admin.permissao,
    };
}

async function get(url) {
    const response = await fetch(`${apiURL}/${url}`);
    return await response.json();
}

async function post(url, data) {
    const response = await fetch(`${apiURL}/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

async function postForm(url, data) {
    const response = await fetch(`${apiURL}/${url}`, {
        method: "POST",
        body: data,
    });
    return await response.json();
}

function checkError(res) {
    return res.error;
}

async function getAuthRequest(name, password) {
    const result = await post(`isAdmin/`, {
        auth: { username: name, password: password },
    });
    return result.result.message;
}

async function getProjectsRequest(page) {
    const result = await get(`getProjects/${page || 1}`);
    if (checkError(result)) {
        return null;
    }
    return result.result;
}

async function getDetailedProjectRequest(id) {
    const result = await get(`getProjectDetails/${id}`);
    if (checkError(result)) {
        return null;
    }
    return result.result;
}

async function isAdminPresent() {
    return (await get("isAdminPresent/")).result;
}

async function registerAdmin(admin) {
    const login = localStorage.getItem("nome");
    const password = localStorage.getItem("senha");
    let result;
    console.log({
        auth: {
            username: login,
            password: password,
        },
        ...admin,
    });
    if (login && password) {
        result = await post("registerAdmin/", {
            auth: {
                username: login,
                password: password,
            },
            ...admin,
        });
    } else {
        result = await post("registerAdmin/", {
            ...admin,
        });
    }
    return [!result.error, result.result];
}

async function registerProject(form) {
    return postForm("createProject/", form);
}

async function updateProject(id, project) {
    return await post(`updateProject/${id}`, {
        auth: {
            username: localStorage.getItem("nome"),
            password: localStorage.getItem("senha"),
        },
        project: project,
    });
}
