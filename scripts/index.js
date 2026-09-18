let auth = null;
let populatedFilters = false;
let page = 1;
let itemsPerPage = 10;

function hidePagination() {
    const pag = document.getElementById("pagination");
    for (const child of pag.children) {
        child.classList.add("hidden")
    }
}

function showPagination() {
    const pag = document.getElementById("pagination");
    for (const child of pag.children) {
        child.classList.remove("hidden")
    }
}

async function rerender(page, force, filters) {
    let projects;
    console.log(page)
    console.log(page || 1)
    if (filters) {
        if (filters.search) {
            projects = await searchProjects(page || 1, filters.search, force);
        } else {
            projects = await getFilteredProjects(page || 1, filters);
        }
    } else {
        projects = await getProjectsRequest(page || 1, force);
    }
    if (projects) {
        const projectDiv = document.getElementById("projects");
        projectDiv.innerHTML = "";
        const allProfs = [];
        const allTags = [];
        const allYears = [];
        for (const project of projects) {
            if (!populatedFilters) {
                if (!allProfs.includes(project.professor)) {
                    allProfs.push(project.professor);
                }
                if (!allTags.includes(project.tags)) {
                    allTags.push(...project.tags);
                }
                if (!allYears.includes(project.ano)) {
                    allYears.push(project.ano);
                }
            }
            const projectCard = renderProjectCard(project, auth);
            projectDiv.appendChild(projectCard);
        }
        if (projects.length < itemsPerPage) {
            if (page === 1) {
                hidePagination();
            } else {
                showPagination();
            }
        } else {
            showPagination();
        }
        document.getElementById("page-number").innerText = page || 1;
        if (!populatedFilters) {
            populatedFilters = true;
            const tagsSelect = document.getElementById("tags");
            const profsSelect = document.getElementById("profs");
            const anosSelect = document.getElementById("anos");
            tagsSelect.innerHTML = `<option value="">TAG</option>`;
            profsSelect.innerHTML = `<option value="">Professor(a)</option>`;
            anosSelect.innerHTML = `<option value="">Ano</option>`;
            allProfs.sort();
            allTags.sort();
            allYears.sort();
            allYears.reverse();
            for (const tag of allTags) {
                const option = document.createElement("option");
                option.value = tag;
                option.innerText = tag;
                tagsSelect.appendChild(option);
            }
            for (const prof of allProfs) {
                const option = document.createElement("option");
                option.value = prof;
                option.innerText = prof;
                profsSelect.appendChild(option);
            }
            for (const ano of allYears) {
                const option = document.createElement("option");
                option.value = ano;
                option.innerText = ano;
                anosSelect.appendChild(option);
            }
        }
    } else {
        hidePagination()
    }
}

let showingFilters = false;
document.addEventListener("DOMContentLoaded", async () => {
    auth = await checkAuth();
    rerender();
    document.getElementById("filter-show").addEventListener("click", () => {
        showingFilters = !showingFilters;
        if (showingFilters) {
            document.getElementById("filters").classList.remove("hidden2");
        } else {
            document.getElementById("filters").classList.add("hidden2");
        }
    });

    document.getElementById("search-btn").addEventListener("click", () => {
        let search = document.getElementById("search").value;
        page = 1;
        if (search === "") {
            rerender(1, false);
            return;
        }
        rerender(1, false, {
            search: search,
        });
    });

    document.getElementById("filter-btn").addEventListener("click", () => {
        let tags = document.getElementById("tags").value;
        let profs = document.getElementById("profs").value;
        let anos = document.getElementById("anos").value;
        let tipo = document.getElementById("tipo").value;
        if (profs === "") profs = "null";
        if (tags === "") tags = "null";
        if (anos === "") anos = "null";
        if (tipo === "") tipo = "null";
        page = 1;
        rerender(1, false, {
            tags: tags,
            professor: profs,
            year: anos,
            type: tipo,
        });
    });

    document.getElementById("prev-page").addEventListener("click", () => {
        if (page > 1) {
            page--;
            rerender(page, false);
        }
    });

    document.getElementById("next-page").addEventListener("click", () => {
        page++;
        rerender(page, false);
    });
});
