import React from 'react'

class Registro extends React.Component {
    render() {
        return (
            <div className="row" onSubmit={this.registro}>
                <div className="col-md-4 col-md-offset-4">
                    <form>
                        <h1>Únete a nuestra comunidad!</h1>
                        <div className="form-group">
                            <label className="control-label">Email</label>
                            <input ref={campo => this.email = campo} type="email" name="email" placeholder="Introduzca su email" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Usuario</label>
                            <input ref={campo => this.login = campo} type="text" name="login" placeholder="Introduzca su nombre de usuario" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Password</label>
                            <input ref={campo => this.password = campo} type="password" name="password" placeholder="Introduzca su contraseña" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <a className="btn btn-primary btn-lg" onClick={() => { this.props.handleregistro(this.email.value, this.login.value, this.password.value) }}>
                                Regístrate
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        )    
    }
}

export default Registro