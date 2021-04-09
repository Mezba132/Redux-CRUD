import {
    DELETE_BOOK_ERROR,
    DELETE_BOOK_LOADING,
    DELETE_BOOK_SUCCESS,
} from './constants';
import axios from 'axios';
import { history } from '../index'; 

// Delete Book ----------------------------------------------------------------
export const deleteBookLoading = (isLoading) => {
    return {
        type : DELETE_BOOK_LOADING,
        payload : isLoading
    }
}

export const deleteBookError = (error) => {
    return {
        type: DELETE_BOOK_ERROR,
        payload: error
    }
}

export const deleteBookSuccess = (id) => {
    return {
        type: DELETE_BOOK_SUCCESS,
        payload: {
            id: id
        }
    }
}

export const deleteBook = (id) => {
    let isLoading = true;
    return dispatch => {
        dispatch(deleteBookLoading(isLoading));
        return axios.delete(`http://localhost:5000/api/delete/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
                dispatch(deleteBookSuccess(id))
                history.push('/');
                let isLoading = false;
                dispatch(deleteBookLoading(isLoading));                
        })
        .catch(err => {
            let errorPayload = [];
            errorPayload['message'] = err.response.data.msg;
            errorPayload['status'] = err.response.data.status;
            dispatch(deleteBookError(errorPayload));
            isLoading = false;
            dispatch(deleteBookLoading(isLoading));
        })
    }    
}