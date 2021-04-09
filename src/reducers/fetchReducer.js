import {
    FETCH_BOOK_ERROR,
    FETCH_BOOK_LOADING,
    FETCH_BOOK_SUCCESS,
} from '../actions/constants';

const initialState = {
    books: [],
    error: null,
    isLoading: false
}

const fetchReducer = ( state = initialState, action) => {
    switch(action.type) {
        case FETCH_BOOK_LOADING : 
            return {
                ...state,
                isLoading: action.payload
            }
        case FETCH_BOOK_SUCCESS : 
            return {
                ...state,
                books: action.payload
            }
        case FETCH_BOOK_ERROR : 
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default fetchReducer;