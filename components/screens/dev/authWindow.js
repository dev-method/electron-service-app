const electron=require('electron');
const Client = require('ssh2').Client;
const isOnline = require('is-online');
const {ipcRenderer}=electron;
import React from 'react';
import ReactDOM from 'react-dom';
import {setUserData} from "../../actions/dev/actions";
import store from '../../store/dev/store'

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            err:false,
            servervalue:'',
            portvalue:'',
            loginvalue:'',
            passvalue:'',
            connectmess:''
        };
    }
    componentDidMount(){
        isOnline().then(online => {
            console.log(online);
            if(online){
                this.setState({
                    connectmess:'Интернет-соединение присутствует'})
            }
            else {
                this.setState({
                    connectmess:"Отсутствует интернет соединения",
                    err:true}
            )
            }
            //=> true
        });
    }
    handleServerChange(event) {
        this.setState({servervalue: event.target.value});
    }
    handlePortChange(event) {
        this.setState({portvalue: event.target.value});
    }
    handleLoginChange(event) {
        this.setState({loginvalue: event.target.value});
    }
    handlePassChange(event) {
        this.setState({passvalue: event.target.value});
    }

    onClick() {

        let user_data={
            host: this.state.servervalue,
            port: Number(this.state.portvalue),
            username: this.state.loginvalue,
            password: this.state.passvalue
        };
        store.dispatch(setUserData(user_data));
        var conn = new Client();
        conn.on('ready', function() {
            console.log('Client :: ready');
            conn.exec('uptime', function(err, stream) {
                if (err) {
                    this.setState({err:true});
                }
                stream.on('close', function(code, signal) {
                    console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                    conn.end();
                }).on('data', function(data) {
                    ipcRenderer.send('authWindow:user_data', user_data);
                    console.log('STDOUT: ' + data);
                }).stderr.on('data', function(data) {
                    console.log('STDERR: ' + data);
                });
            });
        }).connect(user_data);
    }
    render() {
        return(
        <div className="auth-page-wrapper">
            <div className="serverWrapper">
            <div className="formipwrapper">
            <div className="label-ip-wrapper"><label className="label-ip">Адрес сервера:</label></div>
        <div className="input-server-wrapper"><input value={this.state.servervalue} onChange={this.handleServerChange.bind(this)} className="input-server" type="text"/></div>
            </div>
            <div className="formportwrapper">
            <div className="label-port-wrapper"><label className="label-port">Порт:</label></div>
        <div className="input-port-wrapper"><input value={this.state.portvalue} onChange={this.handlePortChange.bind(this)} className="input-port" type="text"/></div>
            </div>
            </div>
            <div className="auth-bootom-wrapper">
            <div className="login-pass-wrapper">
            <div className="loginwrapper">
            <div className="label-login-wrapper"><label className="label-login">Имя пользователя:</label></div>
        <div className="input-login-wrapper"><input value={this.state.loginvalue} onChange={this.handleLoginChange.bind(this)} className="input-login" type="text"/></div>
            </div>
            <div className="passwrapper">
            <div className="label-pass-wrapper"><label className="label-pass">Пароль:</label></div>
        <div className="input-pass-wrapper"><input value={this.state.passvalue} onChange={this.handlePassChange.bind(this)} className="input-pass" type="password"/></div>
            </div>
            <button onClick={() => this.onClick()} className="mainButton">Установить соединение</button>
            </div>
            <div className="internet-connection-wrap">
                {this.state.err?<div className="conn-err-wrapper"><img src="../../../assets/images/connection-err-150.png"/><div>{this.state.connectmess}</div></div>:<img src="../../../assets/images/connection150.png"/>}
            </div>
            </div>
        </div>
        )
    }
}

ReactDOM.render(<Auth/>, document.getElementById('authWindowContainer'));