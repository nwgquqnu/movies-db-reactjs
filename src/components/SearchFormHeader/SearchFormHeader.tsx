import * as React from 'react';
import SearchForm from '../../containers/SearchForm';
import { ActionType, MovieDbStateAction } from '../../types/movieActions';
import AddButton from '../AddButton';
import MainLogo from '../MainLogo';
import * as css from './SearchFormHeader.module.scss';

interface SearchFormHeaderProps {
    dispatch: React.Dispatch<MovieDbStateAction>;
}

export default (props: SearchFormHeaderProps) => {
    const showAddMovieModal = React.useCallback(
        () => {
            props.dispatch({ type: ActionType.ShowAddMovie })
        },
        [props.dispatch],
    );

    return (
        <header className={css.appHeader}>
            <MainLogo />
            <AddButton text="+ Add Movie" handler={showAddMovieModal} />
            <SearchForm className={css.searchForm} placeholder="What do you want to watch?" />
        </header>
    )
};
