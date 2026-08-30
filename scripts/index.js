async function rerender() {
    const projects = await getProjectsRequest();
    if (projects) {
        const projectDiv = document.getElementById("projects");
        for (const project of projects) {
            console.log(project);
            const projectCard = renderProjectCard(project, true);
            projectDiv.appendChild(projectCard);
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    rerender();
});
