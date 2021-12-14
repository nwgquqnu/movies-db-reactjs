import clsx from 'clsx';
import * as React from 'react';
import * as css from './MainButton.module.scss'

interface ButtonProps { 
    handler: <T extends React.SyntheticEvent<HTMLButtonElement>>(event: T) => void;
    text: string;
    className?: string;
};

class MainButton extends React.PureComponent<ButtonProps> {
    render() {
        return React.createElement('button', {
            className: clsx(css.mainButton, this.props.className),
            onClick: this.props.handler
        }, this.props.text);
    }
}

export default MainButton;