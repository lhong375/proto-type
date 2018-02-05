import React from 'react';

/*
<tr>
<td>id</td> <td>value or, a input for vaue</td> <td>action button if any</td>
</tr>
*/
export class TableUnitWithActionButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    renderValue(editable, value) {
    if (this.state.isEditing) {
            return (
                
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <input type="text" defaultValue={this.props.value} handleKeyDown={this.handleKeyDown.bind(this)} ref="editInput" />
                    </form>
                
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
                    <button onClick={this.onSaveClick.bind(this)}>Save</button>
                    <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
                </div>
                
            );
        } else if (this.props.editable) {
        	return (
	            
	                <button onClick={this.onEditClick.bind(this)}>Edit</button>
	            
        	);
        } else {
        	return (<div></div>);
        }

        
    }

    render() {
        return (
            <td>
            {this.renderValue()}
            {this.renderAction()}
            </td>
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
        console.log("onSaveClick, newValue in path"+this.props.path, newValue);
        this.props.changeValue({'path': this.props.path, 'value': newValue});
        this.setState({ isEditing: false });
    }

}