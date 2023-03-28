const { ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");

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

    const template = {
      saveFolder: `${gameSavePath}\\${saveFolder}`,
      activeSlot: {
        id: 1,
        name: "Slot 1",
        characters: {
          one: "Character 1",
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
          name: "Slot 1",
          characters: {
            one: "Character 1",
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
          name: "Slot 2",
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
          name: "Slot 3",
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
          name: "Slot 4",
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
          name: "Slot 5",
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
          name: "Slot 6",
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
          name: "Slot 7",
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
          name: "Slot 8",
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
    };

    writeJsonFileSync(JSON.stringify(template));
    backupSaveFiles(saveFolder);
    makeSlotFolders();
    removeInitScreen();
    initializeUI();
  }
}

function makeSlotFolders() {
  // create a new folder in gameSavePath
  const saveFolder = gameSavePath + "\\Slot ";
  for (let i = 1; i < 9; i++) {
    iPath = saveFolder + i;
    fs.mkdirSync(iPath);
  }

  const slotOne = saveFolder + "1";
  const activeSlotFolder = `${gameSavePath}\\${findFolderWithOnlyNumbers(
    gameSavePath
  )}`;

  copyFolderContentsSync(activeSlotFolder, slotOne);
}

function backupSaveFiles(saveFolder) {
  // create a new folder in gameSavePath
  const backupFolder = gameSavePath + "\\backup";

  // if the folder already exists, don't overwrite it
  if (fs.existsSync(backupFolder)) {
    return;
  }

  fs.mkdirSync(backupFolder);
  // copy saveFolder to backupFolder
  const source = gameSavePath + "\\" + saveFolder;
  const destination = backupFolder + "\\" + saveFolder;
  copyFolderSync(source, destination);
}

function copyFolderSync(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  fs.readdirSync(source).forEach(function (file) {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);

    if (fs.statSync(sourcePath).isDirectory()) {
      copyFolderSync(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  });
}

function copyFolderContentsSync(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  fs.readdirSync(source).forEach(function (file) {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);

    if (fs.statSync(sourcePath).isDirectory()) {
      copyFolderContentsSync(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  });
}

function updateUI() {
  const data = JSON.parse(readJsonFileSync());

  const slotButton = document.querySelector("#slotMenuButton");
  slotButton.innerHTML = `Slot ${data.activeSlot.id}`;

  const slotNameMenuButton = document.getElementById("slotNameMenuButton");
  slotNameMenuButton.innerHTML = `${data.activeSlot.name}`;

  const slotNameList = document.querySelectorAll("#slotList > ul > li > p");
  slotNameList.forEach((item) => {
    data.slots.forEach((slot) => {
      if (slot.id.toString() === item.dataset.slot.toString()) {
        item.innerHTML = `${item.dataset.slot}: ${slot.name}`;
      }
    });
  });

  const characterNameListSubmit = document.getElementById(
    "characterNameListSubmit"
  );
  characterNameListSubmit.addEventListener("click", function (e) {
    updateCharacterList();
  });
  const character1 = document.getElementById("character1");
  const char1 = document.getElementById("char1");
  character1.innerHTML = data.activeSlot.characters.one;
  char1.innerHTML = data.activeSlot.characters.one;
  const character2 = document.getElementById("character2");
  const char2 = document.getElementById("char2");
  character2.innerHTML = data.activeSlot.characters.two;
  char2.innerHTML = data.activeSlot.characters.two;
  const character3 = document.getElementById("character3");
  const char3 = document.getElementById("char3");
  character3.innerHTML = data.activeSlot.characters.three;
  char3.innerHTML = data.activeSlot.characters.three;
  const character4 = document.getElementById("character4");
  const char4 = document.getElementById("char4");
  character4.innerHTML = data.activeSlot.characters.four;
  char4.innerHTML = data.activeSlot.characters.four;
  const character5 = document.getElementById("character5");
  const char5 = document.getElementById("char5");
  character5.innerHTML = data.activeSlot.characters.five;
  char5.innerHTML = data.activeSlot.characters.five;
  const character6 = document.getElementById("character6");
  const char6 = document.getElementById("char6");
  character6.innerHTML = data.activeSlot.characters.six;
  char6.innerHTML = data.activeSlot.characters.six;
  const character7 = document.getElementById("character7");
  const char7 = document.getElementById("char7");
  character7.innerHTML = data.activeSlot.characters.seven;
  char7.innerHTML = data.activeSlot.characters.seven;
  const character8 = document.getElementById("character8");
  const char8 = document.getElementById("char8");
  character8.innerHTML = data.activeSlot.characters.eight;
  char8.innerHTML = data.activeSlot.characters.eight;
  const character9 = document.getElementById("character9");
  const char9 = document.getElementById("char9");
  character9.innerHTML = data.activeSlot.characters.nine;
  char9.innerHTML = data.activeSlot.characters.nine;
  const character10 = document.getElementById("character10");
  const char10 = document.getElementById("char10");
  character10.innerHTML = data.activeSlot.characters.ten;
  char10.innerHTML = data.activeSlot.characters.ten;

  const charLabel1 = document.getElementById("charLabel1");
  charLabel1.value = data.activeSlot.characters.one;
  const charLabel2 = document.getElementById("charLabel2");
  charLabel2.value = data.activeSlot.characters.two;
  const charLabel3 = document.getElementById("charLabel3");
  charLabel3.value = data.activeSlot.characters.three;
  const charLabel4 = document.getElementById("charLabel4");
  charLabel4.value = data.activeSlot.characters.four;
  const charLabel5 = document.getElementById("charLabel5");
  charLabel5.value = data.activeSlot.characters.five;
  const charLabel6 = document.getElementById("charLabel6");
  charLabel6.value = data.activeSlot.characters.six;
  const charLabel7 = document.getElementById("charLabel7");
  charLabel7.value = data.activeSlot.characters.seven;
  const charLabel8 = document.getElementById("charLabel8");
  charLabel8.value = data.activeSlot.characters.eight;
  const charLabel9 = document.getElementById("charLabel9");
  charLabel9.value = data.activeSlot.characters.nine;
  const charLabel10 = document.getElementById("charLabel10");
  charLabel10.value = data.activeSlot.characters.ten;
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

  activeSlotNameInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      updateActiveSlotName(activeSlotNameInput.value.toString());
    }
  });

  // - Duplicate Slot Button
  // - Edit Characters Button
  //   - Character Name Input 1-10
  // - Play Button

  updateUI();
}

function removeInitScreen() {
  const initModal = document.querySelector(".init");
  // initModal.classList.remove("init");
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
      data.activeSlot = slot;
      writeJsonFileSync(JSON.stringify(data));
    }
  });

  swapSlotFolders(slotNumber);

  updateUI();
}

function swapSlotFolders(slotNumber) {
  const slotFolderName = "Slot " + slotNumber;
  const saveFolder = findFolderWithOnlyNumbers(gameSavePath);
  swapFolderNamesSync(gameSavePath, slotFolderName, saveFolder);
}

function swapFolderNamesSync(dirPath, firstFolderName, secondFolderName) {
  const firstFolderPath = path.join(dirPath, firstFolderName);
  const secondFolderPath = path.join(dirPath, secondFolderName);
  const tmpFolderPath = path.join(dirPath, "tmp");

  if (fs.existsSync(firstFolderPath) && fs.existsSync(secondFolderPath)) {
    fs.renameSync(firstFolderPath, tmpFolderPath);
    fs.renameSync(secondFolderPath, firstFolderPath);
    fs.renameSync(tmpFolderPath, secondFolderPath);
    console.log(`Swapped ${firstFolderName} and ${secondFolderName}`);
  } else {
    console.log(`Failed to swap ${firstFolderName} and ${secondFolderName}`);
  }
}

function updateActiveSlotName(name) {
  const data = JSON.parse(readJsonFileSync());

  // Find the active slot in the data
  data.slots.forEach((slot) => {
    if (slot.id === data.activeSlot.id) {
      slot.name = name;

      if (slot.name === "") {
        slot.name = " ";
      }

      writeJsonFileSync(JSON.stringify(data));
      setActiveSlot(slot.id.toString());
    }
  });
}

function updateCharacterList() {
  const data = JSON.parse(readJsonFileSync());
  const characterNameInputs = document.querySelectorAll(
    "#characterNameList > ul > li > input"
  );

  data.slots.forEach((slot) => {
    if (slot.id.toString() === data.activeSlot.id.toString()) {
      slot.characters.one = characterNameInputs[0].value;
      slot.characters.two = characterNameInputs[1].value;
      slot.characters.three = characterNameInputs[2].value;
      slot.characters.four = characterNameInputs[3].value;
      slot.characters.five = characterNameInputs[4].value;
      slot.characters.six = characterNameInputs[5].value;
      slot.characters.seven = characterNameInputs[6].value;
      slot.characters.eight = characterNameInputs[7].value;
      slot.characters.nine = characterNameInputs[8].value;
      slot.characters.ten = characterNameInputs[9].value;
      data.activeSlot.characters = slot.characters;
      writeJsonFileSync(JSON.stringify(data));
      updateUI();
    }
  });
}
