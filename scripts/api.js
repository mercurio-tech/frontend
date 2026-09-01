const apiURL = "http://localhost:3000";

function getCachedVal(key, ttl = 1000 * 60 * 5) {
    const cache = JSON.parse(localStorage.getItem("cache"));
    if (cache && cache[key]) {
        const val = cache[key];
        // 5 mins
        if (val.lastChecked && val.lastChecked + ttl > Date.now()) {
            return val.value;
        }
    }
    return;
}

function setCachedVal(key, value) {
    const cache = JSON.parse(localStorage.getItem("cache")) || {};
    cache[key] = {
        value: value,
        lastChecked: Date.now(),
    };
    localStorage.setItem("cache", JSON.stringify(cache));
}

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
    if (id) {
        return {
            id: Number(id),
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
    const cached = getCachedVal(`projects_${page || 1}`, 1000 * 60);
    if (cached) return cached;
    const result = await post(`isAdmin/`, {
        auth: { username: name, password: password },
    });
    setCachedVal(`projects_${page || 1}`, result.result.message);
    return result.result.message;
}

async function getProjectsRequest(page) {
    const cached = getCachedVal(`projects_${page || 1}`, 1000 * 60);
    if (cached) return cached;
    const result = await get(`getProjects/${page || 1}`);
    if (checkError(result)) {
        setCachedVal(`projects_${page || 1}`, null);
        return null;
    }
    setCachedVal(`projects_${page || 1}`, result.result);
    return result.result;
}

async function getDetailedProjectRequest(id) {
    const cached = getCachedVal(`project_${id}`);
    if (cached) return cached;
    const result = await get(`getProjectDetails/${id}`);
    if (checkError(result)) {
        setCachedVal(`project_${id}`, null);
        return null;
    }
    setCachedVal(`project_${id}`, result.result);
    return result.result;
}

async function isAdminPresent() {
    const cached = getCachedVal("isAdminPresent");
    if (cached) return cached;
    const res = (await get("isAdminPresent/")).result;
    setCachedVal("isAdminPresent", res);
    return res;
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

async function editProject(form) {
    return postForm("updateProject/", form);
}

async function deleteProject(id) {
    return post("deleteProject/", {
        auth: createAuth(),
        id: id,
    });
}
