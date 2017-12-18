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
            entrenamientoUpdate: false
        }
    }

    componentDidMount() {
		this.getEntrenamiento(this.props.entrenamientoId)
    }

    getEntrenamiento(entrenamiento) {
        new API_servicios().getEntrenamiento({entrenamiento, usuario: localStorage.usuario}).then((res) => this.setState({entrenamiento: res.entrenamiento}))
    }

    updateEntrenamiento(nombre, descripcion, dificultad) {
        new API_servicios().updateEntrenamiento(nombre, descripcion, dificultad, localStorage.usuario, this.state.entrenamiento._id).then((res) => {
            if (res.entrenamientoUpdate) {
                this.setState({entrenamientoUpdate: false})
                this.getEntrenamiento(this.props.entrenamientoId)
            }
        })
    }

    showEntrenamientoUpdate() {
        this.setState({entrenamientoUpdate: true})
    }

    render() {
        var divContainer = null
        if (this.state.entrenamientoUpdate) {
            divContainer = <EntrenamientoNuevo type='modificar' entrenamiento={this.state.entrenamiento}
                handleVolver={this.props.handleVolver} handleUpdateEntrenamiento={this.updateEntrenamiento.bind(this)}/>            
        }
        else {
            divContainer = <div className="container">
                                <div className="w3-card-2">
                                    <div className="w3-row w3-dark-grey" style={{paddingLeft: 10}}>
                                        <div className="w3-half">
                                            <h2><strong>{this.state.entrenamiento.nombre}</strong></h2>
                                        </div>
                                        <div className="w3-half" style={{textAlign: "right"}}>
                                            <a onClick={this.showEntrenamientoUpdate.bind(this)} href="javascript:void(null)" className="btn btn-add" style={{paddingTop: 0, paddingBottom: 0}}>
                                                <h2><span className="glyphicon glyphicon-pencil"></span></h2>
                                            </a>
                                            <a onClick={() => {this.props.handleDeleteEntrenamiento(this.state.entrenamiento._id)}} href="javascript:void(null)" className="btn btn-add" style={{paddingTop: 0, paddingBottom: 0}}>
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