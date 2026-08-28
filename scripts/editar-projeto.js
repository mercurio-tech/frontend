function getProjectId() {
    return new URLSearchParams(window.location.search).get("id");
}

function setStatus(text, type) {
    const status = document.getElementById("statusMsg");
    status.innerText = text;
    status.className = `status-msg status-${type}`;
}

function hideStatus() {
    document.getElementById("statusMsg").className = "status-msg hidden";
}

function fillForm(project) {
    document.getElementById("title").value = project.titulo;
    document.getElementById("subtitle").value = project.subtitulo;
    document.getElementById("tags").value = project.tags.join(", ");
    document.getElementById("type").value = project.tipo;
    document.getElementById("professor").value = project.professor;
    document.getElementById("year").value = project.ano;
    document.getElementById("authors").value = project.aluno;
    if (project.imagem) {
        document.getElementById("currentImageThumb").src = project.imagem;
        document.getElementById("currentImageLabel").classList.remove("hidden");
    }
    if (project.pdf) {
        document.getElementById("currentPdfLink").href = project.pdf;
        document.getElementById("currentPdfLabel").classList.remove("hidden");
    }
}

function readForm(project) {
    return {
        titulo: document.getElementById("title").value,
        subtitulo: document.getElementById("subtitle").value,
        aluno: document.getElementById("authors").value,
        professor: document.getElementById("professor").value,
        tipo: document.getElementById("type").value,
        ano: parseInt(document.getElementById("year").value),
        tags: document
            .getElementById("tags")
            .value.split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0),
        imagem: project.imagem,
        pdf: project.pdf,
    };
}

document.addEventListener("DOMContentLoaded", async () => {
    const id = getProjectId();
    const btnSalvar = document.getElementById("btnSalvar");
    if (!id) {
        setStatus("Nenhum projeto foi selecionado para edição.", "erro");
        btnSalvar.disabled = true;
        return;
    }
    setStatus("Carregando projeto...", "info");
    let project;
    try {
        project = await getDetailedProjectRequest(id);
    } catch (error) {
        project = null;
    }
    if (!project) {
        setStatus("Não foi possível carregar o projeto.", "erro");
        btnSalvar.disabled = true;
        return;
    }
    fillForm(project);
    hideStatus();
    btnSalvar.addEventListener("click", async () => {
        btnSalvar.disabled = true;
        setStatus("Salvando alterações...", "info");
        let result;
        try {
            result = await updateProject(id, readForm(project));
        } catch (error) {
            result = { error: true, result: "Erro ao conectar com o servidor." };
        }
        if (result.error) {
            setStatus(result.result, "erro");
        } else {
            setStatus("Projeto atualizado com sucesso.", "sucesso");
        }
        btnSalvar.disabled = false;
    });
});
