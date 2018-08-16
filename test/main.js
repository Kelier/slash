/**
 * @file 创建窗口逻辑
 */

var { app, BrowserWindow, globalShortcut, ipcMain, Tray } = require('electron');

var screenShot = require('./../screen/mainProcess');
var _ = require('lodash');
var path = require('path'),
    url = require('url');
var win = win || null;

// 窗口关闭
app.on('window-all-closed', () => {
    app.quit();
});

// 初始化
app.on('ready', () => {
    var url = '/index.html';
    win = createWindow(url);
    win.webContents.openDevTools();
    screenShot(win.webContents);
});


/**
* 创建窗口函数
* @param: _url,opts
*/
function createWindow(_url, opts) {
    var config = {
        width: 800,
        height: 500,
        backgroundColor: '#002b36'
    };
    config = _.assign(config, opts);

    var _win = new BrowserWindow(config);
    _win.loadURL(url.format({
            pathname: path.join(__dirname + _url),
            protocol: 'file',
            slashes: true
        }));
    
    _win.on('closed', () => {
        _win = null;
    });

    _win.on('close', () => {
        win[_win.id] = null;
    });

    return _win;
}