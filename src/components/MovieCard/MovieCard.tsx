import * as React from 'react';
import { ActionType, MovieDbStateAction } from '../../types/movieActions';
import { Movie } from '../../types/movieModels';
import DetailsButton from '../DetailsButton';
import * as css from './MovieCard.module.scss';

interface MovieCardProps {
    movie: Movie;
    dispatch: React.Dispatch<MovieDbStateAction>;
}

function getYear(date: string): string {
    return date.slice(0, 4);
}

export default ({ movie, dispatch }: MovieCardProps) => {
    const selectMovieCallback = React.useCallback(
        () => dispatch({ type: ActionType.SelectMovie, payload: movie }),
        [dispatch],
    );

    return (
        <article className={css.movieArticle} onClick={selectMovieCallback}>
            <DetailsButton containerClassName={css.movieDetailsBtn} movie={movie} dispatch={dispatch} />
            <img src={movie.poster_path} alt={movie.title} />
            <div className={css.movieInfo}>
                <h1 className={css.movieTitle}>{movie.title}</h1>
                <p className={css.movieYear}>{getYear(movie.release_date)}</p>
                <p className={css.movieGenre}>{movie.genres.join(", ")}</p>
            </div>
        </article>
    );
};