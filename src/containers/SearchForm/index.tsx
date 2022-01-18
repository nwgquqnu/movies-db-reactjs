import * as React from 'react';
import FindInput from '../../components/FindInput';
import SearchButton from '../../components/SearchButton';
import { fetchMovies } from '../../store/moviesThunk';
import { AppDispatch } from '../../store/store';

interface SearchFormProps {
    placeholder: string;
    className: string;
    dispatch: AppDispatch;
}

interface SearchFormState {
    value: string;
}

export default class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
    state = { value: '' };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ value: event.target.value });
    };

    handleSubmit = (event: React.SyntheticEvent<HTMLFormElement> | React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.dispatch(fetchMovies({search: this.state.value}));
    };

    render() {
        return (
            <form className={this.props.className} onSubmit={this.handleSubmit}>
                <FindInput value={this.state.value} placeholder={this.props.placeholder} handleChange={this.handleChange} />
                <SearchButton handler={this.handleSubmit} />
            </form>
        );
    }
}