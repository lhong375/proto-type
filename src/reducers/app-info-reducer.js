import { CHANGE_SAMPLE_RATE, FETCH_APP_INFO, RECEIVE_APP_INFO, REQUEST_APP_INFO } from "../constants/action-types";
import { fetchAppInfo } from '../transports/transport';
//import _ from 'lodash';

/* initialState looks like this
{
  appInfo: {
  	"appName": "Tanks",
  	"platfrom": "Android",
  	"bundleId": "com.lindasoft.tanks",
  	"appVersion": "1.0",
  	"sampleRate": 50,
  	"analyticsProjectId": "3690c1cf-845f-4383-a4f4-368dea656444",
  	"unityVersion": "5.3",
  	"pluginVersion": "1.0.0"
  }
};*/
const isLocal = false;
const initialState = {
  isFetching: false,
  appInfo: {
    "appName": "...",
    "platfrom": "...",
    "bundleId": "...",
    "appVersion": "1.0",
    "sampleRate": 50,
    "analyticsProjectId": "...",
    "unityVersion": "5.3",
    "pluginVersion": "1.0.0"
  }
};


const appInfoReducer = (state = initialState, action) => {
	switch(action.type) {
    case RECEIVE_APP_INFO :
      console.log("RECEIVE_APP_INFO", action.payload);
      return Object.assign({}, state, {isFetching: false, appInfo: action.payload})
    case REQUEST_APP_INFO :
       console.log("REQUEST_APP_INFO");
       return Object.assign({}, state, {isFetching: true});
		case CHANGE_SAMPLE_RATE:
			return { ...state, appInfo: { ...state.appInfo, ...action.payload  } }
		default:
			return state;
	}
};

export default appInfoReducer;