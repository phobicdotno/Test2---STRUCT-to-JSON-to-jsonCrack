function sendToEmbed() {
    const jsonCrackEmbed = document.getElementById("jsoncrackEmbed");
    const json = JSON.stringify(jsonData);
    const options = {
        theme: "dark", // "light" or "dark"
        direction: "RIGHT", // "UP", "DOWN", "LEFT", "RIGHT"
    };
    jsonCrackEmbed.contentWindow.postMessage({json, options}, "*");
}