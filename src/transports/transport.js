import thunkMiddleware from 'redux-thunk'
import { requestAppInfo, receiveAppInfo, receiveConfigurations, savingConfigurations } from "../actions/actions";

//fixtures for testing without a server
const appInfo = require('../../fixtures/tanksAppInfo.json');
const configurations = require('../../fixtures/tanksSegmentsConfig.json');


const localOnly = false; //todo: should be app state when you start the app-server
const localHost = "http://localhost:3000";
const projectId = "3690c1cf-845f-4383-a4f4-368dea656444";
const platform = "android";

export const getConfigurations = function (local = localOnly) {
    if(!local) {
        //todo
    } else {
        console.log("local, return configurations:", configurations);
        return configurations;
    }
}

export function saveConfigurations(segmentId = "6535903", params) {
    console.log("transport.saveConfigurations #"+segmentId+" localOnly?"+localOnly, params);
    if(localOnly) {
        //actually a no-op
        return function(dispatch) {
            dispatch(receiveConfigurations(segmentId, projectId, platform, {}, true)); 
        }
    }
    return function(dispatch) {
        dispatch(savingConfigurations(projectId))
        let configId = "auto-tune:"+projectId+":"+platform+":segments:"+segmentId+":config"; //auto-tune:3690c1cf-845f-4383-a4f4-368dea656444:android:segments:6535903:config
        let url = localHost+'/saveConfigurations/'+configId;
        console.log("url:"+url);
        let newConfig = Object.assign({}, 
            {
                segmentId: segmentId,
                params: params
            }
        );
        let reqH = new Headers();
        let reqInit = {
            method: 'POST',
            headers : reqH,
            mode : 'cors',
            cache: 'default',
            body: {'dbKey':configId, 'newConfig': JSON.stringify(newConfig) }
        };
        let testReq = new Request(url, reqInit);
        return fetch(testReq).
        then(
            response => response.json(),
            error => console.error('saveConfigurations error!!!', error)
        )
        .then(json => 
            dispatch(receiveConfigurations(segmentId, projectId, platform, JSON.parse(json), false))
        )
    }
}

export function fetchAppInfo(projectId = "3690c1cf-845f-4383-a4f4-368dea656444", platform = "android", localOnly = localOnly) {
    if(localOnly) {
        return function(dispatch) { dispatch(receiveAppInfo(projectId, appInfo)); }
    }
    return function(dispatch) {
        dispatch(requestAppInfo(projectId))
        let param_id = "auto-tune:"+projectId+":"+platform; //"auto-tune:3690c1cf-845f-4383-a4f4-368dea656444:android"
        let url = localHost+'/getAppInfo/'+param_id;
        console.log("url:"+url);
        let reqH = new Headers();
        let reqInit = {
            method: 'GET',
            headers : reqH,
            mode : 'cors',
            cache: 'default'
        };
        let testReq = new Request(url, reqInit);
        return fetch(testReq).
        then(
            response => response.json(),
            error => console.error('error!!!', error)
        )
        .then(json => 
            dispatch(receiveAppInfo(projectId, JSON.parse(json)))
        )
    }
}
/*
function shouldFetchPosts(state, projectId) {
    const posts = state.postsBySubreddit[projectId]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(projectId) {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.

  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), projectId)) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchPosts(projectId))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}*/


export const testHealth = function (local = localOnly) {
	if(!local) {
		let url = localHost+'/health';
        let reqH = new Headers();
        let reqInit = {
            method: 'GET',
            headers : reqH,
            mode : 'cors',
            cache: 'default'
        };
        let testReq = new Request(url, reqInit);
        fetch(testReq)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log("DATA:", data);
        })
        .catch(function(error) {
            console.error("ERROR!", error);
        })
	} else {
        //console.log("local, return ",data);
        return data;     
	}
}

