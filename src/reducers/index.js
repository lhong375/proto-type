import { combineReducers } from 'redux'
import appInfoReducer from "../reducers/app-info-reducer";
import configurationForSegmentsReducer from "../reducers/configuration-for-segments-reducer";

export default combineReducers({
  appInfoReducer,
  configurationForSegmentsReducer
})