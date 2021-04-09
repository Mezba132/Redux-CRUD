import {
    EDIT_BOOK_ERROR,
    EDIT_BOOK_LOADING,
    EDIT_BOOK_SUCCESS
} from '../actions/constants';

const initialState = {
    books: [],
    error: null,
    isLoading: false
}

const bookReducer = ( state = initialState, action) => {
    switch(action.type) {  
        case EDIT_BOOK_LOADING : 
            return {
                ...state,
                isLoading: action.payload
            }
        case EDIT_BOOK_SUCCESS : 
        const updateBooks = state.books.filter(book => book.id !== action.payload.id)
            return {
                ...state,
                books: [...updateBooks, action.payload]
            }
        case EDIT_BOOK_ERROR : 
            return {
                ...state,
                error: action.payload
            }      
        default:
            return state;
    }
}

export default bookReducer;