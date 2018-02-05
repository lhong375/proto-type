import React from 'react';

export default class AppInfoListHeader extends React.Component {
    render() {
        return (
            <thead>
                <tr>
                    {this.props.keys.map(
                      key => {
                            return <th>{key}</th>
                      }
                    )}
                </tr>
            </thead>
        );
    }
}
