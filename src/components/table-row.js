import React from 'react';

/*
<tr>
<td>id</td> <td>value or, a input for vaue</td> <td>action button if any</td>
</tr>
*/
export class TableRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    renderValue(editable, value) {
    if (this.state.isEditing) {
            return (
                <td>
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <input type="text" defaultValue={this.props.value} handleKeyDown={this.handleKeyDown.bind(this)} ref="editInput" />
                    </form>
                </td>
            );
        }

        return (
            <td>{this.props.value}</td>
        );
    }

    renderAction() {
    	if (this.state.isEditing) {
            return (
                <td>
                    <button onClick={this.onSaveClick.bind(this)}>Save</button>
                    <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
                </td>
            );
        } else if (this.props.editable) {
        	return (
	            <td>
	                <button onClick={this.onEditClick.bind(this)}>Edit</button>
	            </td>
        	);
        } else {
        	return (<td></td>);
        }

        
    }

    render() {
    	let {id}= this.props;
        return (
            <tr>
                <td>{id}</td>
                {this.renderValue()}
                {this.renderAction()}
            </tr>
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

        const newValue = this.refs.editInput.value;
        const newSamepleRateObj = {"sampleRate": newValue};
        //console.log("newSamepleRateObj:", newSamepleRateObj);
        this.props.changeValue(newSamepleRateObj);
        this.setState({ isEditing: false });
    }

}