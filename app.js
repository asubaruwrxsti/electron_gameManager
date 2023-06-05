const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')

const express = require('express');
const express_app = express();

var configIni = require('config.ini');
var config = configIni.load('./config.ini');

const { MongoClient, ServerApiVersion } = require("mongodb");
let db_username = config.MONGODB.username;
let db_password = config.MONGODB.password;
const uri = `mongodb+srv://${db_username}:${db_password}@cluster.gdgmcws.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useUnifiedTopology: true });
let window = null

// Wait until the app is ready
app.once('ready', () => {

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

    async function run() {
      try {
        await client.connect();
        const database = client.db("clutchy");
        const collection = database.collection("users");
        const query = { username: username, password: password };
        collection.find(query).toArray().then((result) => {
          result.length > 0 ? event.reply('login_response', `User ${username} logged in!`) : event.reply('login_response', `User ${username} not found!`)
        });
      } finally {
        setTimeout(() => {
          client.close();
        }, 1500);
      }
    }
    run().catch(console.dir);
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
