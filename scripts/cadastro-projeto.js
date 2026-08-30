document.addEventListener("DOMContentLoaded", () => {
    const dropZoneImage = document.getElementById("dropZoneImage");
    const fileInputImage = document.getElementById("fileInputImage");
    const fileListImage = document.getElementById("fileListImage");
    const dropZonePDF = document.getElementById("dropZonePDF");
    const fileInputPDF = document.getElementById("fileInputPDF");
    const fileListPDF = document.getElementById("fileListPDF");
    dropZoneImage.addEventListener("click", () => fileInputImage.click());
    dropZonePDF.addEventListener("click", () => fileInputPDF.click());

    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        dropZoneImage.addEventListener(eventName, preventDefaults, false);
        dropZonePDF.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ["dragenter", "dragover"].forEach((eventName) => {
        dropZoneImage.addEventListener(
            eventName,
            () => {
                dropZoneImage.classList.add("drag-over");
            },
            false,
        );
        dropZonePDF.addEventListener(
            eventName,
            () => {
                dropZonePDF.classList.add("drag-over");
            },
            false,
        );
    });

    ["dragleave", "drop"].forEach((eventName) => {
        dropZoneImage.addEventListener(
            eventName,
            () => {
                dropZoneImage.classList.remove("drag-over");
            },
            false,
        );
        dropZonePDF.addEventListener(
            eventName,
            () => {
                dropZonePDF.classList.remove("drag-over");
            },
            false,
        );
    });

    dropZoneImage.addEventListener("drop", (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length) {
            handleFiles(files, true);
        }
    });

    dropZonePDF.addEventListener("drop", (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length) {
            handleFiles(false);
        }
    });

    fileInputImage.addEventListener("change", function () {
        if (this.files.length) {
            handleFiles(this.files, true);
        }
    });

    fileInputPDF.addEventListener("change", function () {
        if (this.files.length) {
            handleFiles(this.files, false);
        }
    });

    const allowedExtensionsImage = [".png", ".jpg", ".jpeg"];
    const allowedExtensionsPDF = [".pdf"];

    function handleFiles(files, isImage) {
        let fileList;
        let validExtensions;
        let maxSize;
        if (isImage) {
            fileList = fileListImage;
            validExtensions = "PNG, JPG ou JPEG";
            maxSize = 1024 * 10;
        } else {
            validExtensions = "PDF";
            fileList = fileListPDF;
            maxSize = 1024 * 50;
        }
        fileList.innerHTML = "";
        const file = files[0];
        const fileName = file.name.toLowerCase();
        let hasValidExtension;
        if (isImage) {
            hasValidExtension = allowedExtensionsImage.some((ext) =>
                fileName.endsWith(ext),
            );
        } else {
            hasValidExtension = allowedExtensionsPDF.some((ext) =>
                fileName.endsWith(ext),
            );
        }

        if (!hasValidExtension) {
            alert(
                `Formato de arquivo inválido. Por favor, envie um arquivo ${validExtensions}.`,
            );
            return;
        }
        const size = (file.size / 1024).toFixed(1);
        if (size > maxSize) {
            alert(
                `O arquivo é muito grande. Por favor, envie um arquivo menor que ${maxSize / 1024} MB.`,
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

    document.getElementById("submit").addEventListener("click", async () => {
        const title = document.getElementById("title").value;
        const subtitle = document.getElementById("subtitle").value;
        const tagsRaw = document.getElementById("tags").value;
        const type = document.getElementById("type").value;
        const desc = document.getElementById("description").value;
        const prof = document.getElementById("professor").value;
        const year = document.getElementById("year").value;
        const authors = document.getElementById("authors").value;
        const image = document.getElementById("fileInputImage").files[0];
        const pdf = document.getElementById("fileInputPDF").files[0];
        const formData = new FormData();
        formData.append("image", image);
        formData.append("pdf", pdf);
        formData.append("auth", JSON.stringify(createAuth()));

        const tags = tagsRaw.split(",").map((tag) => tag.trim());
        formData.append(
            "project",
            JSON.stringify(
                createProject(
                    null,
                    title,
                    subtitle,
                    desc,
                    authors,
                    prof,
                    type,
                    year,
                    tags,
                ),
            ),
        );

        registerProject(formData);
    });
});
