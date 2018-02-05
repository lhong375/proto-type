//import _ from 'lodash';
import React from 'react';
import { connect } from "react-redux";
import AppInfoHeader from './app-info-list-header';
import AppInfoItem from './app-info-item';
import {fetchAppInfo} from "../transports/transport"


const mapStateToProps = state => {
  return { appInfo: state.appInfoReducer.appInfo };
};

const mapDispatchToProps = (dispatch, state) => {
    return {
        fetchAppInfo: function() {
            dispatch(fetchAppInfo());
        }
    }
};

class ConnectedAppInfo extends React.Component {
    componentDidMount() {
        console.log("dispatch fetchAppInfo");
        this.props.fetchAppInfo();
    }

    render() {
        return (
          <table>
            <AppInfoHeader keys={['key','value']}/>
            <tbody>
            {_.keys(this.props.appInfo).map(
              key => {
                        return <AppInfoItem id={key} value={this.props.appInfo[key]} 
                            editable={ key==="sampleRate"?true:false }
                        />
               }
            )}
            </tbody>
           </table>
        ); 
    }
}

const AppInfo = connect(mapStateToProps, mapDispatchToProps)(ConnectedAppInfo);

export default AppInfo;


/*
const ConnectedAppInfo = ({ appInfo }) => { 
    return (
      <table>
        <AppInfoHeader keys={['key','value']}/>
        <tbody>
        {_.keys(appInfo).map(
          key => {
                    return <AppInfoItem id={key} value={appInfo[key]} 
                        editable={ key==="sampleRate"?true:false }
                    />
           }
        )}
        </tbody>
       </table>
    ); 
}
*/
/*
export default class AppInfo extends React.Component {

    isEditable(key) {//this should be part of AppInfoObj
        if(key === "sampleRate") {
            return true;
        } else {
            return false;
        }
    }

    saveValue(newValue) {
        console.log("save newValue:"+newValue);
        this.props.store.dispatch( changeSampleRate({
            "sampleRate": newValue
        }))
    }

    

    render() {
        const appInfo = this.props.appInfo;
        let rows = _.keys(appInfo).map(
            key => {
                return <AppInfoItem id={key} value={this.props.appInfo[key]} editable={this.isEditable(key)} saveValue={this.saveValue} />
            }
        );
        
        return (
            <table>
                <AppInfoHeader />
                <tbody>
                   {rows}
                </tbody>
            </table>
        );
    }
}
*/
