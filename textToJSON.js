function textToJSON(text) {
    const lines = text.split('\n');
    let json = {};
    let currentStruct = null;
    let attribute = null;
    let atribbdisplay = null;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line.startsWith("TYPE")) {
            const parts = line.split(' ');
            currentStruct = parts[1];
            json[currentStruct] = {};
            console.log(currentStruct);
        } else if (line.startsWith("{") && line.endsWith("}")) {
            attribute = line.substring(0, line.length);
            atribbdisplay = attribute;
        } else if (line.indexOf(";") !== -1) {
            const parts = line.split(':');
            console.log(parts);
            let key = onlyText(parts[0]).trim();
            let value = onlyText(parts[1]).trim();
            console.log(key);
            console.log(value);
            if (atribbdisplay) {
                json[currentStruct][key] = {};
                json[currentStruct][key]['atribdisplay'] = atribbdisplay;
                json[currentStruct][key]['type'] = value;
                atribbdisplay = null;
            } else {
                json[currentStruct][key] = {};
                json[currentStruct][key]['type'] = value;
            }
            if (lines[i+1] && lines[i+1].startsWith("//")) {
                const comment = lines[i+1].split('//');
                json[currentStruct][key]['comment'] = comment[1].trim();
            }
        } else if (line.startsWith("//")) {
            json[currentStruct][key]['comment'] = line.substring(2).trim();
        }
    }
    return json;
}

// Takes away all special chars
function onlyText(text) {
    let onlyText = text.replace(/[^a-zA-Z0-9\s]/g, "");
    return onlyText;
}
