// /actions/actions.js

import { CHANGE_SAMPLE_RATE, FETCH_APP_INFO, CHANGE_A_CONFIGURATION, REQUEST_APP_INFO, RECEIVE_APP_INFO, INVALIDATE_APP_INFO, SAVING_CONFIGURATIONS } from "../constants/action-types";

export const fetchAppInfo = appInfoObj => ({ type: FETCH_APP_INFO, payload: appInfoObj});
export const changeSampleRate = sampleRateObj => ({ type: CHANGE_SAMPLE_RATE, payload: sampleRateObj });


export const changeAConfiguration = newValueObj => ({type: CHANGE_A_CONFIGURATION, payload: newValueObj});


//export const REQUEST_APP_INFO = 'REQUEST_APP_INFO' //move this to constants
export function requestAppInfo(projectId = "3690c1cf-845f-4383-a4f4-368dea656444") {
  return {
    type: REQUEST_APP_INFO,
    projectId
  }
}

//export const RECEIVE_APP_INFO = 'RECEIVE_APP_INFO'
export function receiveAppInfo(projectId, appInfoObj) {
  return {
    type: RECEIVE_APP_INFO,
    payload: appInfoObj,//json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

//export const INVALIDATE_APP_INFO = 'INVALIDATE_APP_INFO'
export function invalidateAppInfo(projectId) {
  return {
    type: INVALIDATE_APP_INFO,
    projectId
  }
}

export function requestConfigurations(projectId = "3690c1cf-845f-4383-a4f4-368dea656444") {
	return {
		type: REQUEST_CONFIGURATIONS,
		projectId
	}
}

export function receiveConfigurations(segmentId = "6535903", projectId = "3690c1cf-845f-4383-a4f4-368dea656444", platform = "android", configObj, isLocal = false) {
	return {
		type: RECEIVE_CONFIGURATIONS,
		segmentId: segmentId,
		projectId: projectId,
		platform: platform,
		configObj: configObj,
		isLocal: isLocal,
		receivedAt: Date.now()
	}
}

export function savingConfigurations(projectId = "3690c1cf-845f-4383-a4f4-368dea656444") {
	return {
		type: SAVING_CONFIGURATIONS
	}
}



