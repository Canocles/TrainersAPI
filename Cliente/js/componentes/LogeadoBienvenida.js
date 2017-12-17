import React from 'react'

class LogeadoBienvenida extends React.Component {
    render() {
        return (
            <div className="container" style={{ padding: 10 }}>
                <div className="jumbotron">
                    <h1>Bienvenido a nuestra plataforma</h1>
                </div>
                <div className="alert alert-danger fade-in">
                    <a href="javascript:void(null)" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Atención:</strong> Esta aplicación está en construcción, por lo que únicamente podrá interactuar con sus entrenamientos.
                </div>
                <h3>
                    En nuestra plataforma, vas a poder crear, modificar o eliminar entrenamientos para de esta forma
                    seguir con un plan de entrenamiento.
                </h3>
            </div>
        )
    }
}

export default LogeadoBienvenida;