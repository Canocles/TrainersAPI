import React from 'react'

class Bienvenida extends React.Component {
    render() {
        return (
            <div className="container" style={{ padding: 10 }}>
                <div className="jumbotron">
                    <h1>Bienvenido a la Página Principal de Trainners API</h1>
                </div> 
            </div>
        )    
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default Bienvenida