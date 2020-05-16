
const electron=require('electron');
const Client = require('ssh2').Client;
const url=require('url');
const path=require('path');
const {app, BrowserWindow, ipcMain}= electron;
const Datastore=require('nedb');
import proj_settings from "./env";
const db= new Datastore({filename: proj_settings.db_file ,autoload: true});

let mainWindow;
let authWindow;

app.on('ready', function () {
   BrowserWindow.addDevToolsExtension(proj_settings.dev_tools_url);
   mainWindow=new BrowserWindow({});
   db.find({useractive:true}, function (err, docs) {
       if (docs.length>0) {
           let user_data=docs[0];
           console.log(user_data);
           mainWindow.loadURL(url.format({
               pathname:path.join(__dirname,'/templates/menuWindow.html'),
               protocol:'file:',
               slashes:true
           }));
           mainWindow.webContents.on('did-finish-load', () => {
               mainWindow.webContents.send("get:user_data", user_data);
           })
       }
       else {
           mainWindow.loadURL(url.format({
               pathname: path.join(__dirname, '/templates/mainWindow.html'),
               protocol: 'file:',
               slashes: true
           }));
       }
    });
});


ipcMain.on('mainWindow:change', function () {
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'/templates/authWindow.html'),
        protocol:'file:',
        slashes:true
    }));
});


ipcMain.on('user:exit', function () {
    db.remove({useractive:true}, function (err, numRemoved) {});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/templates/mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
});

ipcMain.on('page:logs', function () {
    db.find({useractive:true}, function (err, docs) {
        user_data=docs[0];
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, '/templates/logsWindow.html'),
            protocol: 'file:',
            slashes: true
        }));
        mainWindow.webContents.on('did-finish-load', () => {
            mainWindow.webContents.send("logs:get-user_data", user_data);
        })
    });
});

ipcMain.on('authWindow:user_data', function (event, user_data) {
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'/templates/menuWindow.html'),
        protocol:'file:',
        slashes:true
    }));
    let doc={useractive:true,
             host:user_data.host,
             port:user_data.port,
             username:user_data.username,
             password:user_data.password
    };
    db.insert(doc, function (err, newDoc) {
        if(err) {
            console.log(err);
        }
        console.log(newDoc);
    });
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send("get:user_data",user_data);
    })
});

