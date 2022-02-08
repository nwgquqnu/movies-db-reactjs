import * as React from 'react';
import FindInput from '../../components/FindInput';
import SearchButton from '../../components/SearchButton';

interface SearchFormProps {
    initialText?: string;
    placeholder: string;
    className: string;
    handleSubmit: (queryText: string) => void;
}

export default (props: SearchFormProps) => {
    const [queryString, setQueryString] = React.useState(props.initialText || "");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQueryString(event.target.value);
    };
    const handleFormSubmit = (event: React.SyntheticEvent<HTMLFormElement | HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        props.handleSubmit(queryString);
    };

    return (
        <form className={props.className} onSubmit={handleFormSubmit}>
            <FindInput value={queryString} placeholder={props.placeholder} handleChange={handleChange} />
            <SearchButton handler={handleFormSubmit} />
        </form>
    );
}