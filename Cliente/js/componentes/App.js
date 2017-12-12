import React from 'react';
import NavigationBar from './NavigationBar';

class App extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                {this.props.children}
            </div>
        ) 
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default App