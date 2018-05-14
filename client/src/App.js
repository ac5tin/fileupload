import React from 'react';
import {Switch,BrowserRouter as Router,Route} from 'react-router-dom';

import Home from './Home';
import GetFile from './components/getFile';

const App = ()=>(
    <div className="App">
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/:id" component={GetFile} />
            </Switch>
        </Router>
    </div>
)

export default App;
