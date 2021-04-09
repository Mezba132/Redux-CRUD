import { combineReducers } from 'redux';
import fetch from './fetchReducer';
import create from './createReducer';
import edit from './editReducers';
import remove from './deleteReducers';

export default combineReducers({
    fetchData : fetch,
    createData : create,
    editData : edit,
    removeData : remove
})