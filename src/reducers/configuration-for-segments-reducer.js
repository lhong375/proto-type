import { CHANGE_A_CONFIGURATION, SAVING_CONFIGURATIONS, REQUEST_CONFIGURATIONS, RECEIVE_CONFIGURATIONS } from "../constants/action-types";
import { getConfigurations } from '../transports/transport';
import _ from 'lodash';

/* configuration for all segments/per-segment looks like this
{  
  "auto-tune:3690c1cf-845f-4383-a4f4-368dea656444:android:segments:6535903:config": {
    "segment_id":"6535903",
    "params":[
      {
        "name":"shadowsOn",
        "type":"boolean",
        "value":false
      },
      {
        "name":"explosionParticles",
        "type":"integer",
        "value":32
      },
      {
        "name":"Quality_Name",
        "type":"string",
        "value":"Low"
      },
      {
        "name":"particlesRates",
        "type":"integer",
        "value":16
      }
    ]
  },
  "": {},
  ....
}
*/
const initialConfigurations = getConfigurations(true);


const configurationForSegmentsReducer = (state = initialConfigurations, action) => {
	switch(action.type) {
    case REQUEST_CONFIGURATIONS:
      console.log("REQUEST_CONFIGURATIONS");
      return Object.assign({}, state, {isFetching: true});
    case RECEIVE_CONFIGURATIONS://for one segment
      console.log("RECEIVE_CONFIGURATIONS", action);
      if(action.isLocal) {
        return Object.assign({}, state, {isFetching: false});
      } else {
        return Object.assign({}, state, {isFetching: false}, action.configObj)
      }
		case CHANGE_A_CONFIGURATION:
      console.log("CHANGE_A_CONFIGURATION, state:", state, "action.payload", action.payload);
      var copyState = Object.assign({}, state);
			return _.set(copyState, action.payload.path, action.payload.value);
    case SAVING_CONFIGURATIONS:
      console.log("SAVING_CONFIGURATIONS");
      return Object.assign({}, state, {isSaving: true})
		default:
			return state;
	}
};

export default configurationForSegmentsReducer;