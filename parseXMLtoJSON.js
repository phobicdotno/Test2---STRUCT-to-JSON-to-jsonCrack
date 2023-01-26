let jsonData;
function parseXMLtoJSON(file) {
    const reader = new FileReader();
    reader.onload = function() {
        let data = reader.result;
        data = data.substring(data.indexOf("TYPE"));
        data = data.substring(0, data.lastIndexOf("END_TYPE"));
        jsonData = textToJSON(data);
        document.getElementById("json-text").innerHTML = "";
        document.getElementById("json-text").innerHTML = JSON.stringify(jsonData, null, 4);
        document.getElementById("file-text").innerHTML = data;
    if(jsonData !== null){
        sendToEmbed();
    }
    }
    reader.readAsText(file);
}