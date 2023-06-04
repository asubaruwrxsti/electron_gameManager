const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb://0.0.0.0:27017";

let window = null

// Wait until the app is ready
app.once('ready', () => {

  const client = new MongoClient(uri, { useUnifiedTopology: true });
  async function run() {
    try {
      await client.connect();
      const database = client.db("clutchy");
      const collection = database.collection("users");
      const query = { username: "admin", password: "admin" };
      const options = { upsert: true };
      const result = await collection.updateOne(query, options);
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      );
    } finally {
      await client.close();
    }
  }

  run().catch(console.dir);

  // Create a new window
  window = new BrowserWindow({
    // Set the initial width to 500px
    // width: 500,
    // Set the initial height to 400px
    // height: 400,

    // set the window to fullscreen
    // fullscreen: true,

    // set the title bar style
    titleBarStyle: 'hiddenInset',
    // set the background color to black
    backgroundColor: "#111",
    // Don't show the window until it's ready, this prevents any white flickering
    show: false,
    // hide the top menu bar
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.on('login', (event, username, password) => {
    if (username == "admin" && password == "admin") {
      event.reply('login_response', 'success')
    } else {
      event.reply('login_response', 'failure')
    }
  })

  // open the devtools
  window.webContents.openDevTools()

  window.loadURL(url.format({
    pathname: path.join(__dirname, '/pages/dashboard.html'),
    protocol: 'file:',
    slashes: true
  }))

  window.once('ready-to-show', () => {
    window.show()
  })
})
