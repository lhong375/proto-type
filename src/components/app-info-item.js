import React from 'react';
import { connect } from "react-redux";
import { changeSampleRate } from '../actions/actions';
import { TableRow } from './table-row';

const mapDispatchToProps = dispatch => {
  return {
    changeValue: sampleRateObj => dispatch(changeSampleRate(sampleRateObj))
  };
};

const appInfoItem = connect(null, mapDispatchToProps)(TableRow);
export default appInfoItem;
