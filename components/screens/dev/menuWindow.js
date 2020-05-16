const electron=require('electron');
const {ipcRenderer}=electron;
import React from 'react';
import ReactDOM from 'react-dom';
import {setUserData} from "../../actions/dev/actions";
import store from '../../store/dev/store'

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.handleGetData = this.handleGetData.bind(this);
        this.state = {
            host:'',
            user:''
        };
    }
    componentDidMount() {
        ipcRenderer.on('get:user_data', this.handleGetData);
    }
    handleGetData(event, data){
        if(!store.getState().user_data){
            store.dispatch(setUserData(data));
        }
        this.setState({
            host:data.host,
            user:data.username
        });
    }
    render() {
        console.log(store.getState().user_data);
        return(
            <div className="menu-page-wrapper">
                <div className="menu-topbar">
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
                <div className="menu-blocks">
                    <div onClick={() => ipcRenderer.send('page:logs')} className="menu-block-item">
                        <div className="block-title">Логи</div>
                    </div>
                    <div className="menu-block-item">

                    </div>
                    <div className="menu-block-item">

                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Menu/>, document.getElementById('menuWindowContainer'));