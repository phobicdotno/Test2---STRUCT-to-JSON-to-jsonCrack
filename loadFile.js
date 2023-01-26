function loadFile() {
    const fileInput = document.getElementById("file-input");
    if (fileInput) {
        const file = fileInput.files[0];
        parseXMLtoJSON(file);
    }
}
    