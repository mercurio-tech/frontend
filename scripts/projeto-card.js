function renderProjectCard(project, showEditButton) {
    const div = document.createElement("div");
    div.classList.add("project-container");
    const id = project.id;
    const title = project.titulo;
    const subtitle = project.subtitulo;
    const members = project.aluno;
    const extension = project.extensao;
    const tags = project.tags;

    const main = document.createElement("a");
    main.href = `projeto.html?id=${id}`;
    const img = document.createElement("img");
    img.src = `${apiURL}/files/imagens/${id}/imagem.${extension}`;
    const tagContainer = document.createElement("div");
    tagContainer.classList.add("badge-container");
    for (const element of tags) {
        const tag = document.createElement("h3");
        tag.classList.add("badge");
        tag.innerText = element.trim();
        tagContainer.appendChild(tag);
    }
    const subtitleContainer = document.createElement("div");
    subtitleContainer.classList.add("text-container");
    const titleElement = document.createElement("h1");
    titleElement.innerText = title;
    subtitleContainer.appendChild(titleElement);
    const subtitleElement = document.createElement("h2");
    subtitleElement.innerText = subtitle;
    subtitleContainer.appendChild(subtitleElement);
    const membersContainer = document.createElement("div");
    membersContainer.classList.add("members-container");
    const membersElement = document.createElement("p");
    membersElement.innerText = `INTEGRANTES: ${members}`;
    membersContainer.appendChild(membersElement);
    main.appendChild(img);
    main.appendChild(tagContainer);
    main.appendChild(subtitleContainer);
    main.appendChild(membersContainer);
    if (showEditButton) {
        const button = document.createElement("a");
        button.classList.add("edit-btn");
        button.href = `editar-projeto.html?id=${id}`;
        const icon = document.createElement("i");
        icon.classList.add(["bx", "bx-edit"]);
        button.appendChild(icon);
        button.innerText = " EDITAR";
        main.appendChild(button);
    }

    div.appendChild(main);
    return div;
}
