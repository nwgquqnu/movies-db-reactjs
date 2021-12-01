import * as React from 'react';
import SearchForm from '../../containers/SearchForm';
import * as css from './Header.module.scss';
import MainLogo from '../MainLogo';
import AddButton from '../AddButton';

function dummyHandler() {}

export default () => (
    <header className={css.appHeader}>
        <MainLogo />
        <AddButton text="+ Add Movie" handler={dummyHandler} />
        <SearchForm className={css.searchForm} placeholder="What do you want to watch?" />
    </header>
);
