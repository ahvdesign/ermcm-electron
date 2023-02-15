const { ipcRenderer } = require("electron");
const {
  writeFile,
  existsSync,
  readFileSync,
  readdirSync,
  lstatSync,
} = require("fs");
const process = require("process");

function closeApp(e) {
  e.preventDefault();
  ipcRenderer.send("close-app");
}

document.querySelector(".close-app").addEventListener("click", closeApp);

const saveLocation = process.env.APPDATA + "\\EldenRing\\memoryCards.json";
const dir = process.env.APPDATA + "\\EldenRing";

function getDefaultSave(directory) {
  let files = readdirSync(directory);
  for (const file of files) {
    const filePath = `${directory}\\${file}`;

    if (lstatSync(filePath).isDirectory() && /^\d+$/.test(file)) {
      return filePath;
    }
  }
}

let isInitialized = existsSync(saveLocation);

const initializeButton = document.querySelector("#initialize");

if (isInitialized == false) {
  initializeButton.addEventListener("click", function (e) {
    e.preventDefault();

    let defaultSlot = getDefaultSave(dir);

    const initialTemplate = `
    {
        "saveLocation": "${saveLocation.replace(/\\/g, "\\\\")}",
        "defaultSlot": ${JSON.stringify(defaultSlot)},
        "activeSlot": "1",
        "slots": [
            {
                "name": "1",
                "characters": {
                    "one": "",
                    "two": "",
                    "three": "",
                    "four": "",
                    "five": "",
                    "six": "",
                    "seven": "",
                    "eight": "",
                    "nine": "",
                    "ten": ""
                }
            }
        ]
    }
    `;

    updateMemoryCards(initialTemplate);

    writeFile(saveLocation, initialTemplate, (err) => {
      if (err) {
        console.log(err);
      }
    });

    const initModal = document.querySelector(".init");
    initModal.classList.remove("init");
  });
} else {
  let data = readFileSync(saveLocation, "utf-8");
  updateMemoryCards(data);
  const initModal = document.querySelector(".init");
  initModal.classList.remove("init");

  updateData(memoryCards, saveLocation);
}

function updateMemoryCards(data) {
  memoryCards = JSON.parse(data);
  return memoryCards;
}

function updateData(data, filename) {
  const jsonData = JSON.stringify(data);

  writeFile(filename, jsonData, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function duplicateMemoryCard() {
  // TODO: make this work first then add to the initialization function, just need to duplicate the active card
}

// TODO: hook up all interface buttons with functions that update memoryCards

// Swap save routine

// Check to make sure save files directory exists + Make save files directory if it doesnt
// make sure no file in directory named "copy" exists + delete "copy" it if it does exist
// Make copy of main save named "copy"
// Delete "active main save"
// Move "chosen save" to "active main save" probably via renaming
// rename "copy" to "chosen save slot"
