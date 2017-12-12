import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
             <Link to="/" className="navbar-brand" href="/">Trainners App</Link>
             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
             </button>
             <div className="collapse navbar-collapse" id="navbarNavDropdown">
               <ul className="navbar-nav">
                 <li className="nav-item active">
                   <Link to="/" className="nav-link">Inicio <span className="sr-only">(current)</span></Link>
                 </li>
                 <li className="nav-item">
                   <Link to="/registro" className="nav-link">Registro</Link>
                 </li>
                 <li className="nav-item">
                   <Link to="/login" className="nav-link">Login</Link>
                 </li>
               </ul>
             </div>
        </nav>
    )
}