import React from 'react'

class NavigationBar extends React.Component {
  
  constructor (props) {
        super(props)
  }

  render() {
    return (
        <nav className="navbar navbar-dark bg-dark">
             <a className="navbar-brand" href="/">Trainners App</a>
             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
             </button>
             <div className="collapse navbar-collapse" id="navbarNavDropdown">
               <ul className="navbar-nav">
                 <li className="nav-item active">
                   <a className="nav-link">Inicio <span className="sr-only">(current)</span></a>
                 </li>
                 <li className="nav-item">
                   <a className="nav-link">Registro</a>
                 </li>
                 <li className="nav-item">
                   <a onClick={this.props.handleLogin} className="nav-link">Login</a>
                 </li>
               </ul>
             </div>
        </nav>
    )
  }
}

export default NavigationBar