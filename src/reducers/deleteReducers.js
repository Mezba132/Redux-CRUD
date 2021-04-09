import {
    DELETE_BOOK_ERROR,
    DELETE_BOOK_LOADING,
    DELETE_BOOK_SUCCESS
} from '../actions/constants';

const initialState = {
    books: [],
    error: null,
    isLoading: false
}

const deleteReducer = ( state = initialState, action) => {
    switch(action.type) {  
        case DELETE_BOOK_LOADING : 
            return {
                ...state,
                isLoading: action.payload
            }
        case DELETE_BOOK_SUCCESS : 
            const filteredBooks = state.books.filter(book => book.id !== action.payload.id);
            return {
                ...state,
                books: filteredBooks,
            }
        case DELETE_BOOK_ERROR : 
            return {
                ...state,
                error : action.payload
            }     
        default:
            return state;
    }
}

export default deleteReducer;