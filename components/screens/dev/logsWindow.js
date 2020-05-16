const electron=require('electron');
const {ipcRenderer}=electron;
import React from 'react';
import ReactDOM from 'react-dom';
import store from '../../store/dev/store'

class Logs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            host:'',
            user:''
        };
    }
    componentDidMount() {
        console.log(store.getState().user_data);
        let data=store.getState().user_data;
        this.setState({
            host:data.host,
            user:data.username
        })
    }
    render() {
        return(
            <div className="logs-page-wrapper">
                <div className="menu-topbar">
                    <div onClick={() => ipcRenderer.send('logs:back')} className="back-icon">
                        <img src="../assets/images/back.png"/>
                    </div>
                    <div className="menu-server">
                        {this.state.host}
                    </div>
                    <div className="menu-user">
                        {this.state.user}
                    </div>
                    <div className="menu-connection">
                        <img src="../assets/images/connection-menu.png"/>
                    </div>
                    <div className="exit-button">
                        <button onClick={() => ipcRenderer.send('user:exit')} className="mainButton">Выйти</button>
                    </div>
                </div>

            </div>
        )
    }
}

ReactDOM.render(<Logs/>, document.getElementById('logsWindowContainer'));