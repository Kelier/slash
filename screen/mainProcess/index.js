const { ipcMain, dialog,globalShortcut } = require('electron');


module.exports = function(winContent,obj) {
    // 接收截图工具信号
    ipcMain.on('screenshot-page', function(sender, message) {
        switch (message.type) {
            case 'close':
                winContent.send('quit-cut');
                break;
            default:
                break;
        }
    });
     
    // 设置快捷键
    var quitScreen = (obj&& obj.quit) || 'ctrl+esc';
    var enterScreen = (obj&& obj.shotKey) || 'ctrl+alt+x';

    globalShortcut.register(quitScreen, function() {
        winContent.send('quit-cut', 1);
    });
    globalShortcut.register(enterScreen, function() {
        winContent.send('global-shortcut-capture', 1);
    });
    
   

    
};