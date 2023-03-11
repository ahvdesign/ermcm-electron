const { ipcRenderer } = require("electron");
const fs = require("fs");

const gameSavePath = process.env.APPDATA + "\\EldenRing";
const slotsFilePath = gameSavePath + "\\saveSlotData.json";

initializeApp();

function initializeApp() {
  // Allow the user to quit in case shit hits the fan
  const closeButtons = document.querySelectorAll(".close-app");
  closeButtons.forEach((button) => {
    button.addEventListener("click", closeApp);
  });

  // Set up the config file if one doesn't exist
  if (fs.existsSync(slotsFilePath)) {
    removeInitScreen();
    initializeUI();
    return;
  } else {
    const saveFolder = findFolderWithOnlyNumbers(gameSavePath);

    const template = JSON.stringify({
      saveFolder: `${gameSavePath}\\${saveFolder}`,
      activeSlot: {
        id: 1,
        name: "Slot",
        characters: {
          one: "",
          two: "",
          three: "",
          four: "",
          five: "",
          six: "",
          seven: "",
          eight: "",
          nine: "",
          ten: "",
        },
      },
      slots: [
        {
          id: 1,
          name: "Slot",
          characters: {
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
            six: "",
            seven: "",
            eight: "",
            nine: "",
            ten: "",
          },
        },
        {
          id: 2,
          name: "Slot",
          characters: {
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
            six: "",
            seven: "",
            eight: "",
            nine: "",
            ten: "",
          },
        },
        {
          id: 3,
          name: "Slot",
          characters: {
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
            six: "",
            seven: "",
            eight: "",
            nine: "",
            ten: "",
          },
        },
        {
          id: 4,
          name: "Slot",
          characters: {
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
            six: "",
            seven: "",
            eight: "",
            nine: "",
            ten: "",
          },
        },
        {
          id: 5,
          name: "Slot",
          characters: {
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
            six: "",
            seven: "",
            eight: "",
            nine: "",
            ten: "",
          },
        },
        {
          id: 6,
          name: "Slot",
          characters: {
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
            six: "",
            seven: "",
            eight: "",
            nine: "",
            ten: "",
          },
        },
        {
          id: 7,
          name: "Slot",
          characters: {
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
            six: "",
            seven: "",
            eight: "",
            nine: "",
            ten: "",
          },
        },
        {
          id: 8,
          name: "Slot",
          characters: {
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
            six: "",
            seven: "",
            eight: "",
            nine: "",
            ten: "",
          },
        },
      ],
    });

    writeJsonFileSync(template);
    removeInitScreen();
    initializeUI();
  }
}

function updateUI() {
  const data = JSON.parse(readJsonFileSync());

  const slotButton = document.querySelector("#slotMenuButton");
  slotButton.innerHTML = `Slot ${data.activeSlot.id}`;

  const slotNameMenuButton = document.getElementById("slotNameMenuButton");
  slotNameMenuButton.innerHTML = `${data.activeSlot.name}`;
}

function initializeUI() {
  // const data = JSON.parse(readJsonFileSync());

  //   - Slot List 1-8
  const slotButtons = document.querySelectorAll(".slotButton");
  slotButtons.forEach((slotButton) => {
    slotButton.addEventListener("click", function (e) {
      e.preventDefault();
      setActiveSlot(slotButton.dataset.slot);
    });
  });

  //   - Slot Name Input
  const activeSlotNameSubmit = document.querySelector("#activeSlotNameSubmit");
  const activeSlotNameInput = document.getElementById("activeSlotNameInput");
  activeSlotNameSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    updateActiveSlotName(activeSlotNameInput.value.toString());
  });

  // - Duplicate Slot Button
  // - Edit Characters Button
  //   - Character Name Input 1-10
  // - Play Button

  updateUI();
}

function removeInitScreen() {
  const initModal = document.querySelector(".init");
  initModal.classList.remove("init");
}

function closeApp(e) {
  e.preventDefault();
  ipcRenderer.send("close-app");
}

function findFolderWithOnlyNumbers(path) {
  const folderNames = fs.readdirSync(path);

  for (const folderName of folderNames) {
    if (/^\d+$/.test(folderName)) {
      return folderName;
    }
  }

  return null;
}

function readJsonFileSync() {
  // Check if file exists
  if (!fs.existsSync(slotsFilePath)) {
    console.error(`Error: file not found at ${slotsFilePath}`);
    return null;
  }

  // Read file synchronously and parse as JSON
  const fileData = fs.readFileSync(slotsFilePath, "utf-8");
  const jsonData = JSON.parse(fileData);

  return jsonData;
}

function writeJsonFileSync(data) {
  const jsonString = JSON.stringify(data, null, 2);

  fs.writeFileSync(slotsFilePath, jsonString, { encoding: "utf8" });
}

function setActiveSlot(slotNumber) {
  // Read data and stop if it isn't found
  const data = JSON.parse(readJsonFileSync());
  if (!data) {
    console.error(`Could not read JSON data from "${slotsFilePath}"`);
    return;
  }

  // Logic
  data.slots.forEach((slot) => {
    if (slot.id.toString() === slotNumber) {
      const newData = data;
      newData.activeSlot = slot;
      writeJsonFileSync(JSON.stringify(newData));
    }
  });

  updateUI();
}

function updateActiveSlotName(name) {
  const data = JSON.parse(readJsonFileSync());

  // Find the active slot in the data
  data.slots.forEach((slot) => {
    if (slot.id === data.activeSlot.id) {
      slot.name = name;

      writeJsonFileSync(JSON.stringify(data));
      setActiveSlot(slot.id.toString());
    }
  });
}
