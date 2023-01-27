function textToJSON(text) {
    const lines = text.split('\n');
    let json = {};
    let currentStruct = null;
    let attribute = null;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line.startsWith("TYPE")) {
            const parts = line.split(' ');
            currentStruct = parts[1];
            json[currentStruct] = {};
        } else if (line.startsWith("{") && line.endsWith("}")) {
            attribute = line.substring(1, line.length - 1);
            attribute = attribute.replace(/[^a-zA-Z0-9\s]/g, "");
            json[currentStruct]["atribdisplay"] = attribute;
        } else if (line.endsWith(";")) {
            const parts = line.split(':');
            let key = parts[0].trim();
            let value = parts[1].trim();
            value = value.substring(0, value.length - 1);
            if (json[currentStruct]["atribdisplay"]) {
                json[currentStruct][key] = {};
                json[currentStruct][key]['atribdisplay'] = json[currentStruct]["atribdisplay"];
                json[currentStruct][key]['type'] = value;
                delete json[currentStruct]["atribdisplay"];
            } else {
                json[currentStruct][key] = {};
                json[currentStruct][key]['type'] = value;
            }
        } else if (line.startsWith("//")) {
            json[currentStruct][key]['comment'] = line.substring(2).trim();
        }
    }
    return json;
}
