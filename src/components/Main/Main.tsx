import * as React from 'react'
import GenreToggle from '../GenreToggle';
import * as css from './Main.module.scss';
import MovieCard from '../MovieCard';
import MovieCounter from '../MovieCounter';
import MovieSortBy from '../MovieSortBy/MovieSortBy';
import ErrorBoundary from '../../containers/ErrorBoundary';
import { MovieDbStateAction } from '../../types/movieActions';
import { Movie, SortOrder, UpdateActivity } from '../../types/movieModels';

interface MainProps {
    activeGenre?: string;
    genres: ReadonlyArray<string>;
    moviesList: ReadonlyArray<Movie>;
    sortOrder: SortOrder;
    dispatch: React.Dispatch<MovieDbStateAction>;
}

export default (props: MainProps) => (
    <main className={css.appMain}>
        <ErrorBoundary>
            <nav className={css.navPanel}>
                <GenreToggle activeGenre={props.activeGenre} genres={props.genres} dispatch={props.dispatch} />
                <MovieSortBy sortOrder={props.sortOrder} dispatch={props.dispatch} />
            </nav>
            <MovieCounter count={props.moviesList.length} />
            <div className={css.movieContainer}>
                {props.moviesList.map((movieData) => (
                    <MovieCard key={movieData.id}
                        dispatch={props.dispatch}
                        movie={movieData} />
                ))}
            </div>
        </ErrorBoundary>
    </main>
);