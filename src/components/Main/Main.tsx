import * as React from 'react'
import GenreToggle from '../GenreToggle';
import * as css from './Main.module.scss';
import MovieCard from '../MovieCard';
import MovieCounter from '../MovieCounter';
import MovieSortBy from '../MovieSortBy/MovieSortBy';
import ErrorBoundary from '../../containers/ErrorBoundary';
import { MovieDbStateAction } from '../../types/movieActions';
import { Movie, SortOrder, UpdateActivity } from '../../types/movieModels';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';

export default () => {
    const dispatch = useAppDispatch();
    const activeGenre = useAppSelector(state => state.activeGenre);
    const genres = useAppSelector(state => state.genres);
    const moviesList = useAppSelector(state => state.moviesList);
    const sortOrder = useAppSelector(state => state.sortOrder);
    return (
    <main className={css.appMain}>
        <ErrorBoundary>
            <nav className={css.navPanel}>
                <GenreToggle activeGenre={activeGenre} genres={genres} dispatch={dispatch} />
                <MovieSortBy sortOrder={sortOrder} dispatch={dispatch} />
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
)};