function textToJSON(text) {
    const lines = text.split('\n');
    let json = {};
    let currentStruct = null;
    let attribute = null;
    let atribbdisplay = null;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        console.log(line);
        if (line.startsWith("TYPE")) {
            const parts = line.split(' ');
            console.log(parts);
            currentStruct = parts[1];
            json[currentStruct] = {};
//            console.log(currentStruct);
        } else if (line.startsWith("{") && line.endsWith("}")) {
            attribute = line.substring(0, line.length);
            atribbdisplay = attribute;
        } else if (line.includes(";")) {
            const parts = line.split(':');    // Only splits on the first ':'
            console.log(parts);
            let key = onlyText(parts[0]).trim();
            let value = parts[1].trim();
            value = value.replace(';','');
//            console.log('Value 1st => '+value);
            let tempType = value.split("\t");
            value = tempType[0];
//            console.log('Value 3nd => '+value);
            if (atribbdisplay) {
                json[currentStruct][key] = {};
                json[currentStruct][key]['atribdisplay'] = atribbdisplay;
                json[currentStruct][key]['type'] = value;
//                console.log('Value 4rd => '+value);
                atribbdisplay = null;
            } else {
                json[currentStruct][key] = {};
                json[currentStruct][key]['type'] = value;
//                console.log('Value 5th => '+value);
            }
            if (lines[i+1] && parts[1].includes("//")){
                const commentparts = parts[1].split("//");
                json[currentStruct][key]['comment'] = commentparts[1].trim();
            }
        } else if (line.startsWith("//")) {
            console.log(line);
            json[currentStruct][key]['comment'] = line;//.substring(2).trim();
        }
    }
    return json;
}

// Takes away all special chars
function onlyText(text) {
    if (text === undefined) {
        return "";
    }
    let onlyText = text.replace(/[^a-zA-Z0-9\s]/g, "");
    return onlyText;
}