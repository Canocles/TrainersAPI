import React from 'react'

class Entrenamiento extends React.Component {
    render() {
        <div className="w3-quarter">
            <a onClick={this.props.handlerEntrenamientoForm} href="javascript:void(null)">
                <div className="w3-card-2 w3-padding-32 w3-panel" style={{borderRadius: 5, backgroundColor: "grey", display: "block"}}>
                        Agregar un entrenamiento
                </div>
            </a>
        </div>
    }
}

export default Entrenamiento