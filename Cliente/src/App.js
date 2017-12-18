import React from 'react'

import API_servicios from './servicios/API_servicios'

import NavigationBar from './componentes/NavigationBar'
import Login from './componentes/Login'
import Registro from './componentes/Registro'
import Bienvenida from './componentes/Bienvenida'
import LogeadoBienvenida from './componentes/LogeadoBienvenida'
import ListaEntrenamientos from './componentes/ListaEntrenamientos'

class App extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            login: false, 
            registro: false,
            registrado: false, 
            logeado: false,
            inicial: false,
            mensajeError: '',
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
            if (this.state.mensajeError.includes('Campos')) {
                divContainer =  <div>
                                    <Registro handleregistro={this.registro.bind(this)}/>
                                    {this.showAlerta('Debes rellenar los campos.')}
                                </div>
            } 
            else if (this.state.mensajeError.includes('Email')) {
                if (this.state.mensajeError === 'Email incorrecto') {
                    divContainer =  <div>
                                        <Registro handleregistro={this.registro.bind(this)}/>
                                        {this.showAlerta('El email no tiene un formato correcto.')}
                                    </div>
                }
                else {
                    divContainer =  <div>
                                        <Registro handleregistro={this.registro.bind(this)}/>
                                        {this.showAlerta('Debes rellenar el campo email.')}
                                    </div>
                }
            }
            else if (this.state.mensajeError.includes('Login')) {
                divContainer =  <div>
                                    <Registro handleregistro={this.registro.bind(this)}/>
                                    {this.showAlerta('Debes rellenar el campo login.')}
                                </div>
            }
            else if (this.state.mensajeError.includes('Password')) {
                divContainer =  <div>
                                    <Registro handleregistro={this.registro.bind(this)}/>
                                    {this.showAlerta('Debes rellenar el campo password.')}
                                </div>
            }
            else if (this.state.mensajeError.includes('Usuario')) {
                divContainer =  <div>
                                    <Registro handleregistro={this.registro.bind(this)}/>
                                    {this.showAlerta('El usuario ya existe.')}
                                </div>
            }
            else {
                divContainer = <Registro handleregistro={this.registro.bind(this)}/>
            }  
        }
        else if (this.state.login || this.state.registrado) {
            if (this.state.mensajeError.includes('Campos')) {
                divContainer =  <div>
                                    <Login handleLogin={this.login.bind(this)}/>
                                    {this.showAlerta('Debes rellenar los campos.')}
                                </div>
            }
            else if (this.state.mensajeError.includes('Email')) {
                if (this.state.mensajeError === 'Email incorrecto') {
                    divContainer =  <div>
                                        <Login handleLogin={this.login.bind(this)}/>
                                        {this.showAlerta('El email no tiene un formato correcto.')}
                                    </div>
                }
                else {
                    divContainer =  <div>
                                        <Login handleLogin={this.login.bind(this)}/>
                                        {this.showAlerta('Debes rellenar el campo email.')}
                                    </div>
                }
            }
            else if (this.state.mensajeError.includes('Password')) {
                divContainer =  <div>
                                    <Login handleLogin={this.login.bind(this)}/>
                                    {this.showAlerta('Debes rellenar el campo password.')}
                                </div>
            }
            else if (this.state.mensajeError.includes('Contraseña')) {
                divContainer =  <div>
                                    <Login handleLogin={this.login.bind(this)}/>
                                    {this.showAlerta('La contraseña o el usuario no coinciden.')}
                                </div>
            }
            else {
                divContainer = <Login handleLogin={this.login.bind(this)}/>
            }
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
        if ((email === '' && login === '' && password === '') || 
            (email === '' && login === '') || (email === '' && password === '') || (login === '' && password === '')) {
            this.cambiarMensajeError('Campos incompletos')
        }
        else if (email === '') {
            this.cambiarMensajeError('Email incompleto')
        }
        else if (!email.includes('@') || !email.includes('.')) {
            this.cambiarMensajeError('Email incorrecto')
        }
        else if (login === '') {
            this.cambiarMensajeError('Login incompleto')
        }
        else if (password === '') {
            this.cambiarMensajeError('Password incompleta')
        }
        else {
            new API_servicios().registro({email, login, password}).then(res => {
                if (res.token) {
                    localStorage.token = res.token
                    this.setState({registrado: true, registro: false})
                }
                else if (res.message.includes('crear')) {
                    this.cambiarMensajeError("Usuario existente")
                }
            })
        }
    }

    login (email, password) {
        if (email === '' && password === '') {
            this.cambiarMensajeError('Campos incompletos')
        }
        else if (email === '') {
            this.cambiarMensajeError('Email incompleto')
        }
        else if (!email.includes('@') || !email.includes('.')) {
            this.cambiarMensajeError('Email incorrecto')
        }
        else if (password === '') {
            this.cambiarMensajeError('Password incompleta')
        }
        else {
            new API_servicios().login({email, password}).then(res => {
                if (res.token) {
                    localStorage.token = res.token
                    localStorage.login = res.usuarioLogin
                    localStorage.usuario = res.usuarioId
                    localStorage.logeado = true;
                    this.setState({login: false, registrado: false})
                }
                if (res.message) {
                    this.cambiarMensajeError('Contraseña incorrecta')
                }
            })
        }
    }

    showAlerta(alerta) {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="alert alert-danger fade-in">
                        <button onClick={() => {this.cambiarMensajeError('')}} href="#" className="close" data-dismiss="alert" aria-label="close">&times;</button>
                        <strong>{this.state.mensajeError}: </strong> {alerta}
                    </div>
                </div>
            </div>
        )
    }

    cambiarMensajeError(mensaje) {
        this.setState({mensajeError: mensaje})
    }

    showEntrenamientos() {
        this.setState({entrenamientos: true, mensajeError: ''})
    }

    showInicialLogeado() {
        this.setState({entrenamientos: false, mensajeError: ''})
    }

    showLogin() {
        this.setState({login: true, registro: false, inicial: false, mensajeError: ''});
    }

    showSignUp() {
        this.setState({registro: true, login: false, inicial: false, mensajeError: ''});
    }

    showInicial() {
        this.setState({inicial: true, registro: false, login: false, entrenamientos: false, mensajeError: ''});
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('logeado')
        localStorage.removeItem('usuario')
        localStorage.removeItem('login')
        this.setState({inicial: true})
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default App
