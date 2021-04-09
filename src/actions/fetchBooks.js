import {
    FETCH_BOOK_ERROR,
    FETCH_BOOK_LOADING,
    FETCH_BOOK_SUCCESS,
} from './constants';
import axios from 'axios';

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
            errorPayload['message'] = err.response.data.msg;
            errorPayload['status'] = err.response.data.status;
            dispatch(fetchBookError(errorPayload));
            isLoading = false;
            dispatch(fetchLoading(isLoading));
        })
    }
}
