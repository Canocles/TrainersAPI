import React from 'react'

import API_servicios from '../servicios/API_servicios'
import EntrenamientoNuevo from './EntrenamientoNuevo'

class Entrenamiento extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            entrenamiento: {
                _id: undefined,
                creador: undefined,
                dificultad: undefined,
                descripcion: undefined,
                nombre: undefined
            },
            entrenamientoUpdate: false,
            mensajeError: ''
        }
    }

    componentDidMount() {
		this.getEntrenamiento(this.props.entrenamientoId)
    }

    getEntrenamiento(entrenamiento) {
        new API_servicios().getEntrenamiento({entrenamiento, usuario: localStorage.usuario}).then((res) => this.setState({entrenamiento: res.entrenamiento}))
    }

    updateEntrenamiento(nombre, descripcion, dificultad) {
        if ((nombre === '' && descripcion === '' && dificultad === '') || 
            (nombre === '' && descripcion === '') ||
            (nombre === '' && dificultad === '') ||
            (descripcion === '' && dificultad === '')) {
            this.cambiarMensajeError('Campos incompletos')
        }
        else if (nombre === '') {
            this.cambiarMensajeError('Nombre incompleto')
        }
        else if (dificultad === '') {
            this.cambiarMensajeError('Dificultad incompleta')
        }
        else if (dificultad < 0 || dificultad > 10) {
            this.cambiarMensajeError('Dificultad incorrecta')
        }
        else {
            new API_servicios().updateEntrenamiento(nombre, descripcion, dificultad, localStorage.usuario, this.state.entrenamiento._id).then((res) => {
                if (res.entrenamientoUpdate) {
                    this.setState({entrenamientoUpdate: false})
                    this.getEntrenamiento(this.props.entrenamientoId)
                }
            })
        }
    }

    showAlerta(alerta) {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="alert alert-danger fade-in">
                        <a onClick={() => {this.cambiarMensajeError('')}} className="close" data-dismiss="alert" aria-label="close">&times;</a>
                        <strong>{this.state.mensajeError}: </strong> {alerta}
                    </div>
                </div>
            </div>
        )
    }

    cambiarMensajeError(mensaje) {
        this.setState({mensajeError: mensaje})
    }

    showEntrenamientoUpdate() {
        this.setState({entrenamientoUpdate: true})
    }

    render() {
        var divContainer = null
        if (this.state.entrenamientoUpdate) {
            if (this.state.mensajeError.includes('Campos')) {
                divContainer =  <div>
                                    {this.showAlerta('Debes rellenar los campos.')}
                                    <EntrenamientoNuevo type='modificar' entrenamiento={this.state.entrenamiento}
                                        handleVolver={this.props.handleVolver} handleUpdateEntrenamiento={this.updateEntrenamiento.bind(this)}/>                                     <EntrenamientoNuevo type='modificar' handleVolver={this.showListaEntrenamientos.bind(this)} handleNuevoEntrenamiento={this.addEntrenamiento.bind(this)}/>
                                </div>
            }
            else if (this.state.mensajeError.includes('Nombre')) {
                divContainer =  <div>
                                    {this.showAlerta('Debes rellenar el campo nombre.')}
                                    <EntrenamientoNuevo type='modificar' entrenamiento={this.state.entrenamiento}
                                        handleVolver={this.props.handleVolver} handleUpdateEntrenamiento={this.updateEntrenamiento.bind(this)}/>                                 </div>
            }
            else if (this.state.mensajeError.includes('Dificultad')) {
                if (this.state.mensajeError.includes('incompleta')) {
                    divContainer =  <div>
                                        {this.showAlerta('Debes rellenar el campo dificultad.')}
                                        <EntrenamientoNuevo type='modificar' entrenamiento={this.state.entrenamiento}
                                            handleVolver={this.props.handleVolver} handleUpdateEntrenamiento={this.updateEntrenamiento.bind(this)}/>                                     </div>
                }
                else {
                    divContainer =  <div>
                                        {this.showAlerta('El campo dificultad debe estar entre 1 y 10, ambos incluidos')}
                                        <EntrenamientoNuevo type='modificar' entrenamiento={this.state.entrenamiento}
                                            handleVolver={this.props.handleVolver} handleUpdateEntrenamiento={this.updateEntrenamiento.bind(this)}/>                                     </div>
                }
            }
            else {
                divContainer = <EntrenamientoNuevo type='modificar' entrenamiento={this.state.entrenamiento}
                    handleVolver={this.props.handleVolver} handleUpdateEntrenamiento={this.updateEntrenamiento.bind(this)}/> 
            }         
        }
        else {
            divContainer = <div className="container">
                                <div className="w3-card-2">
                                    <div className="w3-row w3-dark-grey" style={{paddingLeft: 10}}>
                                        <div className="w3-half">
                                            <h2><strong>{this.state.entrenamiento.nombre}</strong></h2>
                                        </div>
                                        <div className="w3-half" style={{textAlign: "right"}}>
                                            <a onClick={this.showEntrenamientoUpdate.bind(this)} className="btn btn-add" style={{paddingTop: 0, paddingBottom: 0}}>
                                                <h2><span className="glyphicon glyphicon-pencil"></span></h2>
                                            </a>
                                            <a onClick={() => {this.props.handleDeleteEntrenamiento(this.state.entrenamiento._id)}} className="btn btn-add" style={{paddingTop: 0, paddingBottom: 0}}>
                                                <h2><span className="glyphicon glyphicon-trash"></span></h2>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="w3-row w3-light-grey" style={{paddingLeft: 10}}>
                                        <h3><strong>Descripción del entrenamiento</strong></h3>
                                        <p>{this.state.entrenamiento.descripcion}</p>
                                    </div>
                                    <div className="w3-row w3-light-grey" style={{paddingLeft: 10}}>
                                        <h3><strong>Dificultad: </strong>{this.state.entrenamiento.dificultad}</h3>
                                    </div>
                                    <div className="w3-row w3-dark-grey" style={{paddingLeft: 10}}>
                                        <h3><strong>Creador: </strong>{localStorage.login}</h3>
                                    </div>
                                </div>
                                <div className="w3-row" style={{paddingTop: 15}}>
                                    <a className="btn btn-danger btn-lg" onClick={this.props.handleVolver}>
                                        <span>Volver</span>
                                    </a>
                                </div>
                            </div>
        }
        return (
            <div>
                {divContainer}
            </div>
        )
    }
}

export default Entrenamiento