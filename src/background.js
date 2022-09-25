let language;

browser.contextMenus.create({
  id: "stopots",
  title: "GGStopotS",
});

browser.contextMenus.create({
  id: "pt",
  title: "Portugês",
  parentId: "stopots",
});

browser.contextMenus.create({
  id: "bha",
  title: "Bahasa",
  parentId: "stopots",
});

browser.contextMenus.create({
  id: "cat",
  title: "Català",
  parentId: "stopots",
});

browser.contextMenus.create({
  id: "deu",
  title: "Deutsch",
  parentId: "stopots",
});

browser.contextMenus.create({
  id: "en",
  title: "English",
  parentId: "stopots",
});

browser.contextMenus.create({
  id: "es",
  title: "Español",
  parentId: "stopots",
});

browser.contextMenus.create({
  id: "fr",
  title: "Français",
  parentId: "stopots",
});

browser.contextMenus.create({
  id: "it",
  title: "Italiano",
  parentId: "stopots",
});

function messageTab(tabs) {
  browser.tabs.sendMessage(tabs[0].id, {
    language: language,
  });
}

function onExecuted() {
  browser.tabs
    .query({
      active: true,
      currentWindow: true,
    })
    .then(messageTab);
}

browser.contextMenus.onClicked.addListener((info) => {
  language = info.menuItemId;

  browser.tabs
    .executeScript({
      file: "engine.js",
    })
    .then(onExecuted);
});
