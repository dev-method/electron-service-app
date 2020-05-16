const electron=require('electron');
const {ipcRenderer}=electron;
import React from 'react';
import ReactDOM from 'react-dom';

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return(
                <div className="mainButtonWrapper">
                    <button onClick={() => ipcRenderer.send('mainWindow:change')} className="mainButton">Начать работу</button>
                </div>
        )
    }
}

ReactDOM.render(<Start/>, document.getElementById('mainWindowContainer'));