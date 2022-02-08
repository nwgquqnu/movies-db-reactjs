import * as React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SearchForm from '../../containers/SearchForm';
import { useAppDispatch } from '../../hooks/storeHooks';
import { ActionType } from '../../types/movieActions';
import AddButton from '../AddButton';
import MainLogo from '../MainLogo';
import * as css from './SearchFormHeader.module.scss';

type MovieParams = {
    searchQuery: string;
} 

export default () => {
    const dispatch = useAppDispatch();
    const { searchQuery } = useParams<MovieParams>();
    const location = useLocation();
    const navigate = useNavigate();
    const handleSubmit = (queryString: string) => {
        navigate(queryString + location.search);
    }

    return (
        <header className={css.appHeader}>
            <MainLogo />
            <AddButton text="+ Add Movie" handler={() => dispatch({ type: ActionType.ShowAddMovie })} />
            <SearchForm className={css.searchForm} placeholder="What do you want to watch?" initialText={searchQuery} handleSubmit={handleSubmit}/>
        </header>
    )
};
