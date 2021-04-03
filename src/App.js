import React, { Component } from 'react';
import Books from './containers/Books';
import CreateBook from './containers/CreateBook';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';

class app extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        this.state = {
            pathname: ''
        }

        this.notifyPathName = this.notifyPathName.bind(this);
    }

    notifyPathName(pathname) {
        this.setState({
            pathname: pathname
        })
    }

    render() {
        return (
            <Router>
                <div className='App'>
                    <Nav 
                           notifyPathName={this.notifyPathName}
                           pathname={this.state.pathname}
                    />
                    <Switch>
                        <Route 
                            path='/' 
                            exact
                            component={() => <Books/>}
                        />    
                        <Route 
                            path='/create' 
                            exact
                            component={() => <CreateBook/>}
                            />
                        <Route 
                            path='/edit/:id' 
                            exact
                            component={(props) => <CreateBook {...props}/>}
                            />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default app;