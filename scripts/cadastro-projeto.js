document.addEventListener("DOMContentLoaded", () => {
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("fileInput");
    const fileList = document.getElementById("fileList");

    dropZone.addEventListener("click", () => fileInput.click());

    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ["dragenter", "dragover"].forEach((eventName) => {
        dropZone.addEventListener(
            eventName,
            () => {
                dropZone.classList.add("drag-over");
            },
            false,
        );
    });

    ["dragleave", "drop"].forEach((eventName) => {
        dropZone.addEventListener(
            eventName,
            () => {
                dropZone.classList.remove("drag-over");
            },
            false,
        );
    });

    dropZone.addEventListener("drop", (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length) {
            handleFiles(files);
        }
    });

    fileInput.addEventListener("change", function () {
        if (this.files.length) {
            handleFiles(this.files);
        }
    });
    const allowedExtensions = [".png", ".jpg", ".jpeg"];
    function handleFiles(files) {
        fileList.innerHTML = "";
        const file = files[0];
        const fileName = file.name.toLowerCase();
        const hasValidExtension = allowedExtensions.some((ext) =>
            fileName.endsWith(ext),
        );
        if (!hasValidExtension) {
            alert(
                "Formato de arquivo inválido. Por favor, envie um arquivo PNG, JPG ou JPEG.",
            );
            return;
        }
        const size = (file.size / 1024).toFixed(1);
        if (size > 1024 * 10) {
            alert(
                "O arquivo é muito grande. Por favor, envie um arquivo menor que 10 MB.",
            );
            return;
        }
        const fileItem = document.createElement("div");
        fileItem.classList.add("file-item");
        fileItem.innerHTML = `
            <span>📄 ${file.name}</span>
            <small>${size} KB</small>
        `;
        fileList.appendChild(fileItem);
    }
});
