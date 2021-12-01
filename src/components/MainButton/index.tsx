import * as React from 'react';
import * as css from './MainButton.module.scss'

interface ButtonProps { 
    handler: <T extends React.SyntheticEvent<HTMLButtonElement>>(event: T) => void;
    text: string;
};

class MainButton extends React.PureComponent<ButtonProps> {
    render() {
        return React.createElement('button', {
            className: css.mainButton,
            onClick: this.props.handler
        }, this.props.text);
    }
}

export default MainButton;