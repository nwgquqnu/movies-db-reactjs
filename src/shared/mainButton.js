import React from 'react';
import './mainButton.css'

class MainButton extends React.PureComponent {
    render() {
        return React.createElement('button', {
            className: 'main-button',
            onClick: this.props.handler
        }, this.props.text);
    }
}

export default MainButton;