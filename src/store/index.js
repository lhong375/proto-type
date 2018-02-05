import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from "redux";
import combineReducers from "../reducers/index";

const store = createStore(
	combineReducers,
	applyMiddleware (thunkMiddleware)
);

console.log("store init, state:", store.getState());

store.subscribe(() => console.log('something has changed for appInfoReducer, report from /store/index.js'));


export default store;