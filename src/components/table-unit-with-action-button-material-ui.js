import React from 'react';

import TextField from 'material-ui/TextField';
import { TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import Settings from 'material-ui/svg-icons/action/settings';



const style = {
  margin: 12,
};

export class TableUnitWithActionButtonMUI extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            value: 'default value'
        };
    }

    handleChange(event) {
    	this.setState({
    		value: event.target.value
    	})
    }

    renderValue(editable, value) {
    if (this.state.isEditing) {
            return (
                <TextField ref="editInput"
				    id="text-field-default"
				    defaultValue={this.props.value}
				    onChange = {this.handleChange.bind(this)}
				/>
            );
        }

        return (
            <div>{this.props.value+''}</div>
        );
    }

    renderAction() {
    	if (this.state.isEditing) {
            return (
                <div>
                	<RaisedButton label="Save" style={style} onClick={this.onSaveClick.bind(this)}/>
                	<RaisedButton label="Cancel" style={style} onClick={this.onCancelClick.bind(this)}/>
                </div>
                
            );
        } else if (this.props.editable) {
        	return (
        		<div>
        			<FlatButton
				      icon={<Settings />}
				      onClick={this.onEditClick.bind(this)}
				    />
			    </div>
        	);
        } else {
        	return (<div></div>);
        }

        
    }

    render() {
        return (
            <TableRowColumn style={{textAlign: 'center'}}>
            {this.renderValue()}
            {this.renderAction()}
            </TableRowColumn>
        );
    }

    handleKeyDown(evt) {
        switch (evt.keyCode) {
            case 13: // Enter
            case 9: // Tab
                this.setState({isEditing: false});
                break;
        }
    }

    onEditClick() {
        this.setState({ isEditing: true });
    }

    onCancelClick() {
        this.setState({ isEditing: false });
    }

    onSaveClick(event) {
        event.preventDefault();
        const newValue = this.state.value;
        console.log("onSaveClick, newValue in path"+this.props.path, newValue);
        this.props.changeValue({'path': this.props.path, 'value': newValue});
        this.setState({ isEditing: false });
    }

}