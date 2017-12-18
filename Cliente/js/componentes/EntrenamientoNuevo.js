import React from 'react'
import EmisorEventos from '../servicios/EmisorEventos'

class EntrenamientoNuevo extends React.Component {
    render() {
        return (
            <div className="row" onSubmit={this.addEntrenamiento}>
                <div className="col-md-4 col-md-offset-4">
                    <form>
                        <h1>Únete a nuestra comunidad!</h1>
                        <div className="form-group">
                            <label className="control-label">Nombre del entrenamiento</label>
                            <input ref={campo => this.nombre = campo} type="text" name="nombre" placeholder="Introduzca su email" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Descripción</label>
                            <textarea ref={campo => this.descripcion = campo} type="text" name="descripcion" placeholder="Introduzca su nombre de usuario" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label className="control-label">dificultad</label>
                            <input ref={campo => this.dificultad = campo} type="number" name="dificultad" placeholder="Introduzca su contraseña" className="form-control" required/>
                        </div>
                        <div className="form-group">
                                <div className="w3-half">
                                    <a className="btn btn-primary btn-lg" onClick={() => { this.props.handleNuevoEntrenamiento(this.nombre.value, this.descripcion.value, this.dificultad.value) }}>
                                        Añadir Entrenamiento
                                    </a>
                                </div>
                                <div className="w3-half">
                                    <a className="btn btn-danger btn-lg" onClick={() => {this.props.handleVolver}}>
                                        <span>Volver</span>
                                    </a>
                                </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default EntrenamientoNuevo