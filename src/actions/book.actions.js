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
import axios from 'axios';

//create book -----------------------------------------------------------------------------------------
export const createBook = (book) => {

    const data = {
        title: book.title,
        author: book.author,
        year: book.year
    }

    return dispatch => {
        axios.post('http://localhost:5000/api/create', data)
        .then(response => {
            const id = response.data._id;
            debugger;
            axios.get(`http://localhost:5000/api/read/${id}`)
                 .then(response => {
                     debugger;
                 })
                 .catch( err => console.log(err))
        })
        .catch( err => console.log(err))
    }
}

// fetch books ----------------------------------------------------------------------------------------
export const fetchLoading = (isLoading) => {
    return {
        type : FETCH_BOOK_LOADING,
        payload : isLoading
    }
}

export const fetchBooksSuccess = (books) => {
    return {
        type: FETCH_BOOK_SUCCESS,
        payload: books
    }
}

export const fetchBookError = (error) => {
    return {
        type : FETCH_BOOK_ERROR,
        payload : error
    }
}

export const fetchBooks = () => {
    let isLoading = true;
    return (dispatch) => {
        dispatch(fetchLoading(isLoading));
        return axios.get('http://localhost:5000/api/read')
        .then(response => {
            dispatch(fetchBooksSuccess(response.data));
            isLoading = false;
            dispatch(fetchLoading(isLoading));
        })
        .catch( err => {
            let errorPayload = [];
            errorPayload['message'] = err.response.message;
            errorPayload['status'] = err.response.status;
            dispatch(fetchBookError(err));
            isLoading = false;
            dispatch(fetchLoading(isLoading));
        })
    }
}