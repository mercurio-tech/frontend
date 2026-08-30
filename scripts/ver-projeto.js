document.addEventListener("DOMContentLoaded", async () => {
    const id = new URLSearchParams(window.location.search).get("id");
    const project = await getDetailedProjectRequest(id);
    if (project) {
        document.querySelector(".banner-card img").src =
            `${apiURL}/files/imagens/${id}/imagem.${project.extensao}`;
        document.getElementById("project-title").innerText = project.titulo;
        document.getElementById("project-description").innerText =
            project.subtitulo;
        const nameContainer = document.getElementById("names");
        project.aluno.split(",").forEach((alunoRaw) => {
            const aluno = alunoRaw.trim();
            const personContainer = document.createElement("div");
            personContainer.classList.add("person-item");
            const icon = document.createElement("span");
            icon.innerText = aluno.substring(0, 1).toUpperCase();
            icon.classList.add("avatar-icon");
            const name = document.createElement("span");
            name.innerText = aluno;
            personContainer.appendChild(icon);
            personContainer.appendChild(name);
            nameContainer.appendChild(personContainer);
        });
        const profContainer = document.querySelector("#prof .person-item");
        const profIcon = document.createElement("span");
        profIcon.classList.add(["avatar-icon", "green"]);
        profIcon.innerText = project.professor.substring(0, 1).toUpperCase();
        const profName = document.createElement("span");
        profName.innerText = project.professor;
        profContainer.appendChild(profIcon);
        profContainer.appendChild(profName);

        document.getElementById("download").href =
            `${apiURL}/files/pdfs/${id}/arquivo.pdf`;

        document.getElementById("project").classList.remove("hidden");
    } else {
        document.getElementById("no-project").classList.remove("hidden");
    }
});
