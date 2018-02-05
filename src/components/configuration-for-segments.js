import _ from 'lodash';
import React from 'react';
import { connect } from "react-redux";
import AppInfoHeader from './app-info-list-header';
import ConfigTableUnit from './configuration-per-segment-item';
import { saveConfigurations, receiveConfigurations } from "../transports/transport";


const mapStateToProps = state => {
  return { configurations: state.configurationForSegmentsReducer };
};

const mapDispatchToProps = (dispatch, state) => {
    return {
        saveConfigurations: function(dbKey, segmentId, params) {
            dispatch(saveConfigurations(dbKey, segmentId, params));
        }
    }
};

class ConfigurationForASegment extends React.Component {

    render() {//note the this.props.dbKey is the full dbKey: "auto-tune:3690c1cf-845f-4383-a4f4-368dea656444:android:segments:6535903:config"
        console.log("ConfigurationForASegment, params:", this.props.params);
        let headers = this.props.params.map(param => param.name);
        let segmentName = this.props.dbKey.indexOf('default_config')>0 ? 'Default Config' : 'Segment: '+this.props.segmentId;
        return (
            <div>
              <h3>{segmentName}</h3>
              <table>
                <AppInfoHeader keys={headers}/>
                <tbody>
                  <tr>
                      {
                        this.props.params.map( (param, idx) => 
                          <ConfigTableUnit path={ this.props.dbKey +'.params.['+idx+'].value'} 
                          valueName={param.name} value={param.value} editable={true} />)
                      }
                  </tr>
                </tbody>
              </table>
              <div>
              <button onClick={this.props.saveConfigurations.bind(this, this.props.dbKey, this.props.segmentId, this.props.params)}>save your configurations</button>
              </div>
            </div>
        );
    }
}


const ConnectedConfigurationForSegments = ({ configurations, saveConfigurations }) => {
    console.log("configurations", configurations);
    return (
      <div>
        {
          _.filter( _.keys(configurations), (k) => k.indexOf("auto-tune")==0 ).map(
            key =>
                <ConfigurationForASegment dbKey={key} 
                segmentId={configurations[key].segment_id} 
                params={configurations[key].params} 
                saveConfigurations={saveConfigurations}/> )
        }
      </div>
    );
   
}

const ConfigurationForSegments = connect(mapStateToProps, mapDispatchToProps)(ConnectedConfigurationForSegments);

export default ConfigurationForSegments;
