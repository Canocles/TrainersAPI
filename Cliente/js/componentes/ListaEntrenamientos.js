import React from 'react'

import API_servicios from '../servicios/API_servicios'

class ListaEntrenamientos extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            entrenamientos: [],
            mensajeError: undefined
        }
    }

    componentDidMount() {
		this.getEntrenamientos(localStorage.usuario)
    }

    getEntrenamientos(usuario) {
        new API_servicios().getEntrenamientos(usuario).then((res) => {
            if (res.entrenamientos.length != 0) {
                this.setState({ entrenamientos: res.entrenamientos })
            }
            else {
                this.setState({ mensajeError: 'Aún no tienes entrenamientos asignados ni creados.' })
            }
		})
    }

    render() {
        var divContainer = null
        if (this.state.entrenamientos.length != 0) {  
            divContainer = <div className="w3-container">
                                <div className="w3-row-padding">
                                {this.state.entrenamientos.map((entrenamiento) => {
                                        return(
                                            <div className="w3-quarter" key={entrenamiento._id}>
                                                <div className="w3-card-2 w3-padding-32 w3-panel">
                                                    {entrenamiento.nombre}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
        }
        else {
            if (this.state.mensajeError != undefined) {
                <div className="alert alert-danger fade-in">
                    <a href="javascript:void(null)" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Atención:</strong> No tienes entrenamientos asignados ni creados.
                </div>
            }
        }
        return (
            <div>
                {divContainer}
            </div>
        )
    }
}

export default ListaEntrenamientos;