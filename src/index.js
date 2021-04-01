import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { fetchBooks } from './actions/book.actions'

import { BrowserRouter as Router} from 'react-router-dom'
import { createBrowserHistory } from 'history'

const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(fetchBooks());

export const history = createBrowserHistory({forceRefresh:true});

ReactDOM.render( 
   <Provider store={store}>
      <Router>
         <App/ >  
      </Router>
   </Provider>, 
    document.getElementById('root'));