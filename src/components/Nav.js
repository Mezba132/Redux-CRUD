import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.notifyPathName(window.location.pathname);
    }

    render() {
        return(
            <div >
                {
                    window.location.pathname === '/' ? <Link className='nav' to='/create'>Add New</Link> : ''
                }
            </div>
        )
    }
} 

export default Nav;