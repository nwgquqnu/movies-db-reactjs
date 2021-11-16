import React from 'react';
import MainButton from '../shared/mainButton';

export default class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
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