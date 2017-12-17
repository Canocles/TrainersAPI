import React from 'react'

class NavigationBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          {localStorage.logeado == null ?
            <div className="navbar-header">
              <a onClick={this.props.handleInicial} href="javascript:void(null)" className="navbar-brand">Trainners App</a>
            </div>
          :
            <div className="navbar-header">
              <a onClick={this.props.handleInicialLogeado} href="javascript:void(null)" className="navbar-brand">Trainners App</a>
              <a onClick={this.props.handleEntrenamientos} href="javascript:void(null)" className="navbar-brand">Entrenamientos</a>
            </div>
          }
          
          {localStorage.token == null || localStorage.email == null ?
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a onClick={this.props.handleSignUp} href="javascript:void(null)" className="nav-link"><span className="glyphicon glyphicon-user"></span> Registro</a>
              </li>
              <li>
                <a onClick={this.props.handleLogin}  href="javascript:void(null)" className="nav-link"><span className="glyphicon glyphicon-log-in"></span> Login</a>
              </li> 
            </ul>
          :
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a onClick={this.props.handleLogout}  href="javascript:void(null)" className="nav-link"><span className="glyphicon glyphicon-log-out"></span> Cerrar Sesion</a>
              </li> 
            </ul>
          }
        </div>
      </nav> 
    )
  }
}

export default NavigationBar