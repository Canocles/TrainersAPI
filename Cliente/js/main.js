import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory, Switch } from 'react-router-dom';

import App from './componentes/App'
import Bienvenida from './componentes/Bienvenida'
import Registro from './componentes/Registro'
import Login from './componentes/Login'

render((
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Bienvenida}/>
                <Route path="/registro" component={Registro}/>
                <Route path="/login" component={Login}/>
            </Switch>
        </App>
    </Router>
), document.getElementById('componente'));  


