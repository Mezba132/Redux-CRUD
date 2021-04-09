import {
    EDIT_BOOK_ERROR,
    EDIT_BOOK_LOADING,
    EDIT_BOOK_SUCCESS,
} from './constants';
import axios from 'axios';
import { history } from '../index'; 



// edit book ---------------------------------------------------------------------------------------
export const editBookLoading = (isLoading) => {
    return {
        type : EDIT_BOOK_LOADING,
        payload : isLoading
    }
}

export const editBookSuccess = (data) => {
    return {
        type: EDIT_BOOK_SUCCESS,
        payload: data
    }
}

export const editBookError = (error) => {
    return {
        type: EDIT_BOOK_ERROR,
        payload: error
    }
}

export const editBook = (book) => {
    const data = {
        title: book.title,
        author: book.author,
        year: book.year
    }
    let isLoading = true;
    return dispatch => {
        return axios.put('http://localhost:5000/api/edit/'+book.id, data)
        .then(() => {
            return axios.get('http://localhost:5000/api/read/'+book.id)
            .then(response => {
                dispatch(editBookSuccess(response.data));
                history.push('/');
                let isLoading = false;
                dispatch(editBookLoading(isLoading));                
            })
            .catch( err => {
                let errorPayload = [];
                errorPayload['message'] = err.response.data.msg;
                errorPayload['status'] = err.response.data.status;
                dispatch(editBookError(errorPayload));
                isLoading = false;
                dispatch(editBookLoading(isLoading));
            })
        })
        .catch(err => {
            let errorPayload = [];
            errorPayload['message'] = err.response.data.msg;
            errorPayload['status'] = err.response.data.status;
            dispatch(editBookError(errorPayload));
            isLoading = false;
            dispatch(editBookLoading(isLoading));
        })
    }
}