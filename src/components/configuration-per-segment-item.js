import React from 'react';
import { connect } from "react-redux";
import { changeAConfiguration } from '../actions/actions';
import { TableUnitWithActionButton } from './table-unit-with-action-button';

import { TableUnitWithActionButtonMUI } from './table-unit-with-action-button-material-ui';

const mapDispatchToProps = dispatch => {
  return {
    changeValue: newValueObj => dispatch(changeAConfiguration(newValueObj))
  };
};

const ConfigTableUnit = connect(null, mapDispatchToProps)(TableUnitWithActionButtonMUI);
export default ConfigTableUnit;
