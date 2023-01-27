// Takes away all special chars
function onlyText(text) {
    let onlyText = text.replace(/[^a-zA-Z0-9\s]/g, "");
    return onlyText;
}
