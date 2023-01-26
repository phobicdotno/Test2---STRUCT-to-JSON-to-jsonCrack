function textToJSON(text) {
        const lines = text.split('\n');
        let json = {};
        let currentStruct = '';
        let attribute = '';
        for (let line of lines) {
            if (line.startsWith('TYPE')) {
                currentStruct = line.split(' ')[1];
                json[currentStruct] = {};
            } else if (line.startsWith('STRUCT')) {
                continue;
            } else if (line.startsWith('END_STRUCT')) {
                currentStruct = '';
                attribute = '';
            } else if (line.startsWith("{")) {
                attribute = line;
            } else {
                const parts = line.split(':');
                if (parts.length > 1) {
                    const key = parts[0].trim();
                    let value = parts[1].trim();
                    json[currentStruct][key] = {};
                    if (attribute !== '') {
                        json[currentStruct][key]['attribute'] = attribute.substring(1, attribute.length - 1);
                        attribute = '';
                    }
                    if (value.indexOf(";") !== -1) {
                        let temp = value.split(";");
                        value = temp[0].trim();
                        json[currentStruct][key]['type'] = value;
                        if (temp[1].indexOf("//") !== -1) {
                            let temp2 = temp[1].split("//");
                            json[currentStruct][key]['comment'] = temp2[1].trim();
                        }
                    } else {
                        json[currentStruct][key]['type'] = value;
                    }
                }
            }
        }
        return json;
    }