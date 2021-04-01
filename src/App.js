import React, { Component } from 'react';
import Books from './components/Books';
import CreateBook from './containers/CreateBook';

class app extends Component {
    render() {
        return (
            <div className='App'>
                <Books/>
                <CreateBook/>
            </div>
        )
    }
}

export default app;