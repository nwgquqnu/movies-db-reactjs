import * as React from 'react';
import MainButton from '../MainButton';
import * as css from './SubmitButton.module.scss'

interface ButtonProps {
    text?: string;
    handler: <T extends React.SyntheticEvent<HTMLButtonElement>>(event: T) => void;
};

class SubmitButton extends React.PureComponent<ButtonProps> {
    render() {
        return <MainButton className={css.submitButton} text={this.props.text || "Submit"} handler={this.props.handler} />
    }
}

export default SubmitButton;