const electron=require('electron');
const {ipcRenderer}=electron;
const button=document.querySelector('.mainButton');
button.addEventListener('click', clickFunction);
function clickFunction() {
    ipcRenderer.send('mainWindow:change')
}