import * as React from 'react';
import MainButton from '../shared/mainButton';

interface SearchFormProps {
    placeholder: string;
}

interface SearchFormState {
    value: string;
}

export default class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
    constructor(props: SearchFormProps) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event: React.SyntheticEvent<HTMLFormElement> | React.SyntheticEvent<HTMLButtonElement>) {
        alert('A search text was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Find your movie
                    <input type="text" value={this.state.value} placeholder={this.props.placeholder} onChange={this.handleChange} />
                </label>
                <MainButton text="Search" handler={this.handleSubmit} />
            </form>
        );
    }
}