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
    if(book.id) {
        const data = {
            id: book.id,
            title: book.title,
            author: book.author,
            year: book.year
        }
        return dispatch => {
            dispatch(editBook(data));
        }
    }
    else {
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
                axios.get(`http://localhost:5000/api/read/`+id)
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
            errorPayload['message'] = err.response.data.msg;
            errorPayload['status'] = err.response.data.status;
            dispatch(fetchBookError(errorPayload));
            isLoading = false;
            dispatch(fetchLoading(isLoading));
        })
    }
}

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

export const editBook = (data) => {
    const id = data.id;
    let isLoading = true;
    return dispatch => {
        return axios.put('http://localhost:5000/api/edit/'+id, data)
        .then(() => {
            return axios.get('http://localhost:5000/api/read/'+id)
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