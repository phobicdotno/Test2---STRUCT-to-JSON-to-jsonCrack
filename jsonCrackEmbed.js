//  const jsonCrackEmbed = document.querySelector("iframe");
  const jsonCrackEmbed = document.querySelector("#json-text");
  const json = JSON.stringify({"ready": "for some phobic data!"});
    jsonCrackEmbed?.addEventListener("load", () => {
    setTimeout(() => jsonCrackEmbed.contentWindow.postMessage({
      jsonData
    }, "*"), 500);
  });
