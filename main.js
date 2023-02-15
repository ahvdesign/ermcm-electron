const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    resizable: false,
    frame: false,
    movable: true,
    devTools: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("close-app", function (e) {
  e.preventDefault();
  app.quit();
});
