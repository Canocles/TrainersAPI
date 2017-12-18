import React from 'react'

import API_servicios from '../servicios/API_servicios'

import NavigationBar from './NavigationBar'
import Login from './Login'
import Registro from './Registro'
import Bienvenida from './Bienvenida'
import LogeadoBienvenida from './LogeadoBienvenida'
import ListaEntrenamientos from './ListaEntrenamientos'

class App extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            login: false, 
            registro: false,
            registrado: false, 
            logeado: false,
            inicial: false,
            mensajeError: undefined,
            enntrenamientoForm: false,
            entrenamientos: false,
            usuario: null
        }
    }

    render() {
        var divContainer = undefined
        if (this.state.inicial) {
            divContainer = <Bienvenida/>
        }
        else if (this.state.registro) {
            divContainer = <Registro handleregistro={this.registro.bind(this)}/>
        }
        else if (this.state.login || this.state.registrado) {
            divContainer = <Login handleLogin={this.login.bind(this)}/>
        }
        else if (localStorage.logeado && this.state.entrenamientos) {
            divContainer = <ListaEntrenamientos />
        }
        else if (localStorage.logeado) {
            divContainer = <LogeadoBienvenida />
        }
        else {
            divContainer = <Bienvenida/>
        }

        return (
            <div>
                {this.state.inicial || this.state.registro || this.state.login || this.state.registrado ?
                    <NavigationBar handleLogout={this.logout.bind(this)} handleLogin={this.showLogin.bind(this)} 
                        handleSignUp={this.showSignUp.bind(this)} handleInicial={this.showInicial.bind(this)}/> 
                :
                    <NavigationBar handleLogout={this.logout.bind(this)} handleLogin={this.showLogin.bind(this)} 
                        handleSignUp={this.showSignUp.bind(this)} handleInicial={this.showInicial.bind(this)}
                        handleEntrenamientos={this.showEntrenamientos.bind(this)} handleInicialLogeado={this.showInicialLogeado.bind(this)}/>
                }   
                {divContainer}
            </div>
        )
    }

    registro (email, login, password) {
        new API_servicios().registro({email, login, password}).then(res => {
            if (res.token) {
                localStorage.token = res.token
                this.setState({registrado: true, registro: false})
            }
        })
    }

    login (email, password) {
        new API_servicios().login({email, password}).then(res => {
            if (res.token) {
                localStorage.token = res.token
                localStorage.login = res.usuario.login
                localStorage.usuario = res.usuario._id
                localStorage.password = password
                localStorage.logeado = true;
                this.setState({login: false, registrado: false})
            }
        })
    }

    showEntrenamientos() {
        this.setState({entrenamientos: true})
    }

    showInicialLogeado() {
        this.setState({entrenamientos: false})
    }

    showLogin() {
        this.setState({login: true, registro: false, inicial: false});
    }

    showSignUp() {
        this.setState({registro: true, login: false, inicial: false});
    }

    showInicial() {
        this.setState({inicial: true, registro: false, login: false, entrenamientos: false});
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('password')
        localStorage.removeItem('logeado')
        localStorage.removeItem('usuario')
        this.setState({inicial: true})
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default App