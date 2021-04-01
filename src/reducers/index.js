import { combineReducers } from 'redux';
import books from './bookReducers';

export default combineReducers({
    booksData: books
})