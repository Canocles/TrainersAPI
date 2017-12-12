import React from 'react'
import NavigationBar from './NavigationBar'
import Login from './Login'

class App extends React.Component {

    constructor (props) {
        super(props)
        this.state = {login: false}
    }

    render() {
        if (this.state.login) {
            return (
                <div>
                    <NavigationBar handleLogin={this.showLogin.bind(this)}/>
                    <Login />
                </div>
            )
        }
        else {
            return (
                <div>
                    <NavigationBar handleLogin={this.showLogin.bind(this)}/>
                </div>
            )
        } 
    }

    showLogin() {
        this.setState({login: true});
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default App