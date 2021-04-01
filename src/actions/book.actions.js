import {
    ADD_BOOK_ERROR,
    ADD_BOOK_LOADING,
    ADD_BOOK_SUCCESS,
    DELETE_BOOK_ERROR,
    DELETE_BOOK_LOADING,
    DELETE_BOOK_SUCCESS,
    EDIT_BOOK_ERROR,
    EDIT_BOOK_LOADING,
    EDIT_BOOK_SUCCESS,
    FETCH_BOOK_ERROR,
    FETCH_BOOK_LOADING,
    FETCH_BOOK_SUCCESS,
} from './types';
import {data} from '../data';

export const fetchBooksSuccess = (books) => {
    return {
        type: FETCH_BOOK_SUCCESS,
        payload: books
    }
}

export const fetchBooks = () => {
    return (dispatch) => {
        dispatch(fetchBooksSuccess(data));
    }
}