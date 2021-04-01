import React, { Component } from 'react';
import Books from './components/Books';
import CreateBook from './containers/CreateBook';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class app extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div className='App'>
                    <Switch>
                        <Route 
                            path='/' exact>
                                <Books/>
                        </Route>
                        <Route 
                            path='/create' exact>
                                <CreateBook/>
                        </Route>
                        <Route 
                            path='/edit/:id' exact>
                                <CreateBook/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default app;