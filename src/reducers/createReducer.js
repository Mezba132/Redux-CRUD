import {
    ADD_BOOK_ERROR,
    ADD_BOOK_LOADING,
    ADD_BOOK_SUCCESS
} from '../actions/constants';

const initialState = {
    books: [],
    error: null,
    isLoading: false
}

const bookReducer = ( state = initialState, action) => {
    switch(action.type) {
        case ADD_BOOK_LOADING : 
            return {
                ...state,
                isLoading: action.payload
            }
        case ADD_BOOK_SUCCESS : 
           return {
               ...state,
               books: [...state.books, action.payload]
           }
        case ADD_BOOK_ERROR : 
            return {
                ...state,
                error : action.payload
            }        
        default:
            return state;
    }
}

export default bookReducer;