import * as React from 'react';
import MainButton from '../MainButton';
import * as css from './ResetButton.module.scss'

interface ButtonProps { 
    handler: <T extends React.SyntheticEvent<HTMLButtonElement>>(event: T) => void;
};

class ResetButton extends React.PureComponent<ButtonProps> {
    render() {
        return <MainButton className={css.resetButton} text="Reset" handler={this.props.handler} />
    }
}

export default ResetButton;