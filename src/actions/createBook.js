import {
    ADD_BOOK_ERROR,
    ADD_BOOK_LOADING,
    ADD_BOOK_SUCCESS
} from './constants';
import axios from 'axios';
import { history } from '../index'; 

//create book -----------------------------------------------------------------------------------------
export const createBookSuccess = (data) => {
    return {
        type: ADD_BOOK_SUCCESS,
        payload: data
    }
}

export const createBookError = (error) => {
    return {
        type: ADD_BOOK_ERROR,
        payload: error
    }
}

export const createBookLoading = (isLoading) => {
    return {
        type : ADD_BOOK_LOADING,
        payload : isLoading
    }
}

export const createBook = (book) => {
    let isLoading = true;
    const data = {
        title: book.title,
        author: book.author,
        year: book.year
    }
    
        return dispatch => {
            axios.post('http://localhost:5000/api/create', data)
            .then(response => {
                dispatch(createBookLoading(isLoading));
                const id = response.data._id;
                axios.get(`http://localhost:5000/api/read/${id}`)
                     .then(response => {
                         const data = response.data;
                         const normalizedData = {
                             title : data.title,
                             author : data.author,
                             year : data.year
                         }
                        dispatch(createBookSuccess(normalizedData));
                        history.push('/');
                        isLoading = false;
                        dispatch(createBookLoading(isLoading));
                     })
                     .catch(err => {
                            const errorPayload = [];
                            errorPayload['message'] = err.response.data.msg;
                            errorPayload['status'] = err.response.data.status;
                            dispatch(createBookError(errorPayload));
                            isLoading = false;
                            dispatch(createBookLoading(isLoading));
                        }
                     )
            })
            .catch( err => {
                const errorPayload = [];
                errorPayload['message'] = err.response.data.msg;
                errorPayload['status'] = err.response.data.status;
                dispatch(createBookError(errorPayload));
                isLoading=false;
                dispatch(createBookLoading(isLoading));
            })
        }
}