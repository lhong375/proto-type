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
        saveConfigurations: function(segmentId, params) {
          console.log("mapDispatchToProps for saveConfigurations", state);
            dispatch(saveConfigurations(segmentId, params));
        }
    }
};

class ConfigurationForASegment extends React.Component {

    render() {
        let headers = this.props.params.map(param => param.name);
        return (
            <div>
              <h3>{this.props.segmentId}</h3>
              <table>
                <AppInfoHeader keys={headers}/>
                <tbody>
                  <tr>
                      {
                        this.props.params.map( (param, idx) => 
                          <ConfigTableUnit path={this.props.segmentId+'.params.['+idx+'].value'} 
                          valueName={param.name} value={param.value} editable={true} />)
                      }
                  </tr>
                </tbody>
              </table>
              <div>
              <button onClick={this.props.saveConfigurations.bind(this, this.props.segmentId, this.props.params)}>save your configurations</button>
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
          _.keys(configurations).map(
            key => <ConfigurationForASegment segmentId={key} params={configurations[key].params} saveConfigurations={saveConfigurations}/> )
        }
      </div>
    );
   
}

const ConfigurationForSegments = connect(mapStateToProps, mapDispatchToProps)(ConnectedConfigurationForSegments);

export default ConfigurationForSegments;
