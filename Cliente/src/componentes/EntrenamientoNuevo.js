import React from 'react'

class EntrenamientoNuevo extends React.Component {
    render() {
        var divContainer = null
        if (this.props.type === 'nuevo') {
            divContainer = <form>
                                <h1>Formulario para crear un entrenamiento</h1>
                                <div className="form-group">
                                    <label className="control-label">Nombre del entrenamiento</label>
                                    <input ref={campo => this.nombre = campo} type="text" name="nombre" placeholder="Introduzca el nombre del entrenamiento" className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Descripción</label>
                                    <textarea ref={campo => this.descripcion = campo} type="text" name="descripcion" placeholder="Introduzca una descripción" className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">dificultad</label>
                                    <input ref={campo => this.dificultad = campo} type="number" name="dificultad" placeholder="Indique la dificultad del 1 al 10" className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <div className="w3-half">
                                        <a className="btn btn-primary btn-lg" onClick={() => { this.props.handleNuevoEntrenamiento(this.nombre.value, this.descripcion.value, this.dificultad.value) }}>
                                            Añadir Entrenamiento
                                        </a>
                                    </div>
                                    <div className="w3-half">
                                        <a className="btn btn-danger btn-lg" onClick={this.props.handleVolver}>
                                            <span>Volver</span>
                                        </a>
                                    </div>
                                </div>
                            </form>
        }
        else {
            divContainer = <form>
                                <h1>Modificar entrenamiento</h1>
                                <div className="form-group">
                                    <label className="control-label">Nombre del entrenamiento</label>
                                    <input ref={campo => this.nombre = campo} type="text" name="nombre" defaultValue={this.props.entrenamiento.nombre} placeholder="Introduzca el nombre del entrenamiento" className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Descripción</label>
                                    <textarea ref={campo => this.descripcion = campo} type="text" name="descripcion" defaultValue={this.props.entrenamiento.descripcion} placeholder="Introduzca una descripción" className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">dificultad</label>
                                    <input ref={campo => this.dificultad = campo} type="number" name="dificultad" defaultValue={this.props.entrenamiento.dificultad} placeholder="Indique la dificultad del 1 al 10" className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <div className="w3-half">
                                        <a className="btn btn-primary btn-lg" onClick={() => { this.props.handleUpdateEntrenamiento(this.nombre.value, this.descripcion.value, this.dificultad.value) }}>
                                            Modificar Entrenamiento
                                        </a>
                                    </div>
                                    <div className="w3-half">
                                        <a className="btn btn-danger btn-lg" onClick={this.props.handleVolver}>
                                            <span>Volver</span>
                                        </a>
                                    </div>
                                </div>
                            </form>
        }
        return (
            <div className="col-md-4 col-md-offset-4">
                {divContainer}
            </div>
        )
    }
}

export default EntrenamientoNuevo
