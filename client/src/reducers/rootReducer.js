import authState from './authState';
import userState from './userState';
import postState from './postState';
import {combineReducers} from 'redux';

//Combine all the sub reducers
const rootReducer = combineReducers({
    authState: authState,
    userState: userState,
    posts: postState
})

export default rootReducer