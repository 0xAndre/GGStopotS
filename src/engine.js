/**
 * Show game solutions. :>
 */
function letsPlayAGame(game) {
  // verify game context
  if (document.getElementById("letter") === null) {
    alert("Game not running :(");
    return;
  }

  // get current game letter
  let letter = document.getElementById("letter").innerText.toLowerCase();

  // validates whether letter is valid
  if (!letter || letter === "?") {
    alert("Game not running :(");
    return;
  }

  // get url from extension words file
  let url = browser.extension.getURL(`./words/words_${game.language}.json`);

  Request(url).then((wds) => {
    // parse words object response
    wds = JSON.parse(wds);

    // get all game categories
    let labels = document.getElementsByTagName("label");

    for (let item of labels) {
      // remove solution if exists
      if (item.childNodes.length === 3) {
        item.removeChild(item.childNodes[2]);
      }

      // append solution to item object
      let solutionElement = document.createElement("h6");

      solutionElement.setAttribute("style", "margin-bottom: 20px; color: #FF2400");
      solutionElement.setAttribute("result", "true");

      let solution = wds[letter][item.innerText.toLowerCase()];

      if (typeof solution !== "undefined") {
        solutionElement.innerText = wds[letter][item.innerText.toLowerCase()];
      }

      item.appendChild(solutionElement);
    }
  });
}

/**
 * HTTP GET Request.
 * @param {string} path - The path to words list.
 */
function Request(path) {
  return fetch(path, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
  }).then((resp) => {
    if (resp.status != 200) throw new Error(resp.statusText);
    return resp.text();
  });
}

// action listeners
browser.runtime.onMessage.addListener(letsPlayAGame);