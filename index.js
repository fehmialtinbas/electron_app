const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
    console.log(process.platform);

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file",
            slashes: true
        })
    );

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);

    ipcMain.on("key", (err, data) => {
        console.log(data);
    })

});

const mainMenuTemplate = [
    {
        label: "Dosya",
        submenu: [
            { label: "Tümünü Ekle" },
            { label: "Tümünü Çıkar" },
            {
                label: "Çıkış",
                accelerator: process.platform == "darwin" ? "Ctrl+Q" : "Ctrl+Q",
                role: "quit"
            }
        ]
    }
];

if (process.platform == "darwin") {
    mainMenuTemplate.unshift({
        label: app.getName(),
        role: "TODO"
    })
};

if (process.env.NODE_ENV !== "production") {
    mainMenuTemplate.push(
        {
            label: "Dev Tools",
            submenu: [
                {
                    label: "Geliştirici Penceresini Aç",
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools();

                    }
                },
                {
                    label: "Yenile",
                    role: "reload"
                }
            ]
        }
    )
}