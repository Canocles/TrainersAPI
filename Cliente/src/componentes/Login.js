import React from 'react'

class Login extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <form>
                        <h1>Entra en nuestra plataforma</h1>
                        <div className="form-group">
                            <label className="control-label">Email</label>
                            <input ref={campo => this.email = campo} type="email" name="email" placeholder="Introduzca su email" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Password</label>
                            <input ref={campo => this.password = campo} type="password" name="password" placeholder="Introduzca su contraseña" className="form-control" required/>
                        </div>
                        <a className="btn btn-primary btn-lg" onClick={() => { this.props.handleLogin(this.email.value, this.password.value)}}>
                            Entrar
                        </a>
                    </form>
                </div>
            </div>
        )    
    }
}

export default Login