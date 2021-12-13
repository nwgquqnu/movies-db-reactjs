import * as React from 'react';
import MainButton from '../MainButton';
import * as css from './SearchButton.module.scss'

interface ButtonProps { 
    handler: <T extends React.SyntheticEvent<HTMLButtonElement>>(event: T) => void;
};

class SearchButton extends React.PureComponent<ButtonProps> {
    render() {
        return <MainButton className={css.searchButton} text="Search" {...this.props} />
    }
}

export default SearchButton;