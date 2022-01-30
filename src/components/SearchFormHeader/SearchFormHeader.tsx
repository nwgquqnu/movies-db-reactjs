import * as React from 'react';
import SearchForm from '../../containers/SearchForm';
import { useAppDispatch } from '../../hooks/storeHooks';
import { ActionType, MovieDbStateAction } from '../../types/movieActions';
import AddButton from '../AddButton';
import MainLogo from '../MainLogo';
import * as css from './SearchFormHeader.module.scss';

export default () => {
    const dispatch = useAppDispatch();

    return (
        <header className={css.appHeader}>
            <MainLogo />
            <AddButton text="+ Add Movie" handler={() => dispatch({ type: ActionType.ShowAddMovie })} />
            <SearchForm className={css.searchForm} placeholder="What do you want to watch?" dispatch={dispatch}/>
        </header>
    )
};
