import React from 'react';
import { connect } from "react-redux";
import { changeAConfiguration } from '../actions/actions';
import { TableUnitWithActionButton } from './table-unit-with-action-button';

const mapDispatchToProps = dispatch => {
  return {
    changeValue: newValueObj => dispatch(changeAConfiguration(newValueObj))
  };
};

const ConfigTableUnit = connect(null, mapDispatchToProps)(TableUnitWithActionButton);
export default ConfigTableUnit;
