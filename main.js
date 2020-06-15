const { app, BrowserWindow } = require("electron");
const path = require('path')
// Mantém a referência global do objeto da janela.
// se você não fizer isso,
// a janela será fechada automaticamente
// quando o objeto JavaScript for coletado como lixo.
let win;
function createWindow() {
  win = new BrowserWindow({
    backgroundColor: "#f5f2f3",
    width: 400,
    height: 400,
    maxWidth: 550,
    maxHeight: 550,
    webPreferences: {
      nodeIntegration: true,

    }
  })

  /*

  let child = new BrowserWindow({ parent: win })
  child.show();
  win.show(); Possibilidade de abri outra página

  */
  /** Janelas Modais */
  let child = new BrowserWindow({
    parent: win,
    modal: true,
    show: false
  })
  child.loadURL("https://www.youtube.com/");
  child.once("ready-to-show", () => {
    child.show();
  })
  /** Ao utilizar a opção parent, é possível criar janelas secundarias: */

  win.loadFile("index.html");
  // win.webContents.openDevTools(); // Abri o DevTools
  win.on('closed', () => {
    // Elimina a referência do objeto da janela, geralmente você iria armazenar as janelas
    // em um array, se seu app suporta várias janelas, este é o momento
    // quando você deve excluir o elemento correspondente.
    win = null
  })
}
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
// Neste arquivo, você pode incluir o resto do seu aplicativo especifico do processo
// principal. Você também pode colocar eles em arquivos separados e requeridos-as aqui.