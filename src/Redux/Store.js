import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './Reducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;