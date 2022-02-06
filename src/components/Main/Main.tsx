import * as React from 'react';
import ErrorBoundary from '../../containers/ErrorBoundary';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import useSearchParamGenre from '../../hooks/useSearchParamGenre';
import useSearchParamSortBy from '../../hooks/useSearchParamSortBy';
import GenreToggle from '../GenreToggle';
import MovieCard from '../MovieCard';
import MovieCounter from '../MovieCounter';
import MovieSortBy from '../MovieSortBy/MovieSortBy';
import * as css from './Main.module.scss';

export default () => {
    const dispatch = useAppDispatch();
    const genres = useAppSelector(state => state.genres);
    const moviesList = useAppSelector(state => state.moviesList);
    const [currentSortOrder, setSearchParamSortOrder] = useSearchParamSortBy();
    const [currentGenre, setSearchParamGenre] = useSearchParamGenre();

    return (
        <main className={css.appMain}>
            <ErrorBoundary>
                <nav className={css.navPanel}>
                    <GenreToggle activeGenre={currentGenre} genres={genres} selectedHandler={(genre) => setSearchParamGenre(genre) } />
                    <MovieSortBy sortOrder={currentSortOrder} selectedHandler={(sortOrder) => setSearchParamSortOrder(sortOrder)} />
                </nav>
                <MovieCounter count={moviesList.length} />
                <div className={css.movieContainer}>
                    {moviesList.map((movieData) => (
                        <MovieCard key={movieData.id}
                            dispatch={dispatch}
                            movie={movieData} />
                    ))}
                </div>
            </ErrorBoundary>
        </main>
    )
};