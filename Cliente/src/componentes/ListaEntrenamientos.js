import React from 'react'

import API_servicios from '../servicios/API_servicios'
import EntrenamientoNuevo from './EntrenamientoNuevo'
import Entrenamiento from './Entrenamiento'

class ListaEntrenamientos extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            entrenamientoForm: false,
            entrenamientoDetalle: false,
            entrenamientoId: undefined,
            entrenamientos: [],
            mensajeError: ''
        }
    }

    componentDidMount() {
        this.getEntrenamientos(localStorage.usuario)
    }

    getEntrenamientos(usuario) {
        new API_servicios().getEntrenamientos(usuario).then((res) => {
            if (res.entrenamientos.length !== 0) {
                this.setState({ entrenamientos: res.entrenamientos })
            }
            else {
                this.setState({ mensajeError: 'Aún no tienes entrenamientos asignados ni creados.' })
            }
		})
    }

    addEntrenamiento(nombre, descripcion, dificultad) {
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
            new API_servicios().addEntrenamiento(nombre, descripcion, dificultad, localStorage.usuario).then((res) => {
                if (!res.message){
                    this.setState({ entrenamientoForm: false })
                    this.getEntrenamientos(localStorage.usuario)
                }
                else {
                    this.cambiarMensajeError(res.message)
                }
            })
        }
    }

    deleteEtrenamiento(entrenamiento) {
        new API_servicios().deleteEntrenamiento({entrenamiento, usuario: localStorage.usuario}).then((res) => {
            if(res.entrenamientoDeleted) {
                this.setState({entrenamientoDetalle: false})
                this.getEntrenamientos(localStorage.usuario)
            }
        })
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

    showEntrenamientoDetalle(entrenamiento) {
        this.setState({entrenamientoDetalle: true, entrenamientoId: entrenamiento})
    }

    showListaEntrenamientos() {
        this.setState({entrenamientoForm: false, entrenamientoDetalle: false})
    }
    
    showEntrenamientoForm() {
        this.setState({entrenamientoForm: true, entrenamientoUpdate: false})
    }

    render() {
        var divContainer = null
        if (this.state.entrenamientoForm) {
            if (this.state.mensajeError.includes('Campos')) {
                divContainer =  <div>
                                    {this.showAlerta('Debes rellenar los campos.')}
                                    <EntrenamientoNuevo type='nuevo' handleVolver={this.showListaEntrenamientos.bind(this)} handleNuevoEntrenamiento={this.addEntrenamiento.bind(this)}/>
                                </div>
            }
            else if (this.state.mensajeError.includes('Nombre')) {
                divContainer =  <div>
                                    {this.showAlerta('Debes rellenar el campo nombre.')}
                                    <EntrenamientoNuevo type='nuevo' handleVolver={this.showListaEntrenamientos.bind(this)} handleNuevoEntrenamiento={this.addEntrenamiento.bind(this)}/>
                                </div>
            }
            else if (this.state.mensajeError.includes('Dificultad')) {
                if (this.state.mensajeError.includes('incompleta')) {
                    divContainer =  <div>
                                        {this.showAlerta('Debes rellenar el campo dificultad.')}
                                        <EntrenamientoNuevo type='nuevo' handleVolver={this.showListaEntrenamientos.bind(this)} handleNuevoEntrenamiento={this.addEntrenamiento.bind(this)}/>
                                    </div>
                }
                else {
                    divContainer =  <div>
                                        {this.showAlerta('El campo dificultad debe estar entre 1 y 10, ambos incluidos')}
                                        <EntrenamientoNuevo type='nuevo' handleVolver={this.showListaEntrenamientos.bind(this)} handleNuevoEntrenamiento={this.addEntrenamiento.bind(this)}/>
                                    </div>
                }
            }
            else {
                divContainer = <EntrenamientoNuevo type='nuevo' handleVolver={this.showListaEntrenamientos.bind(this)} handleNuevoEntrenamiento={this.addEntrenamiento.bind(this)}/>
            }
        }
        else if (this.state.entrenamientoDetalle) {
            divContainer = <Entrenamiento handleDeleteEntrenamiento={this.deleteEtrenamiento.bind(this)}
                handleVolver={this.showListaEntrenamientos.bind(this)} entrenamientoId={this.state.entrenamientoId}/>
        }
        else if (this.state.entrenamientos.length !== 0) {  
            divContainer = <div className="w3-container">
                                <div className="w3-row-padding">
                                    <div className="w3-quarter" style={{paddingTop: 10}}>
                                        <a onClick={this.showEntrenamientoForm.bind(this)} href="javascript:void(null)">
                                            <div className="w3-card-2 w3-padding-32 w3-hover-shadow w3-center" style={{borderRadius: 7, backgroundColor: "LightGray", display: "block"}}>
                                                    <span>Agregar un entrenamiento</span>
                                            </div>
                                        </a>
                                    </div>
                                    {this.state.entrenamientos.map((entrenamiento) => {
                                        return(
                                            <div className="w3-quarter" style={{paddingTop: 10}} key={entrenamiento._id}>
                                                <a onClick={() => {this.showEntrenamientoDetalle(entrenamiento._id)}} href="javascript:void(null)">
                                                    <div className="w3-card-2 w3-padding-32 w3-hover-shadow w3-center" style={{borderRadius: 7, backgroundColor: "4D9E64", display: "block"}}>
                                                        <span>{entrenamiento.nombre}</span>
                                                    </div>
                                                </a>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
        }
        else {
            if (this.state.mensajeError !== null) {
                divContainer = <div className="alert alert-danger fade-in">
                                    <a className="close" data-dismiss="alert" aria-label="close">&times;</a>
                                    <strong>Atención:</strong> No tienes entrenamientos asignados ni creados.
                                </div>
            }
        }
        return (
            <div className="w3-container">
                {divContainer}
                {this.state.entrenamientos.length === 0 && !this.state.entrenamientoForm ?
                    <div className="w3-quarter" style={{paddingTop: 10}}>
                        <a onClick={this.showEntrenamientoForm.bind(this)} href="javascript:void(null)">
                            <div className="w3-card-2 w3-padding-32 w3-hover-shadow w3-center" style={{borderRadius: 7, backgroundColor: "LightGray", display: "block"}}>
                                    Agregar un entrenamiento
                            </div>
                        </a>
                    </div>
                :
                null
                }
            </div>
        )
    }
}

export default ListaEntrenamientos;