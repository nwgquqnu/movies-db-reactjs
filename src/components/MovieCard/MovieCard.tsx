import * as React from 'react';
import AddMovieForm from '../../containers/AddMovieForm';
import DeleteMovieForm from '../../containers/DeleteMovieForm';
import Modal from '../../containers/Modal';
import { ActionType, MovieDbStateAction } from '../../types/movieActions';
import { Movie, UpdateActivity } from '../../types/movieModels';
import DetailsButton from '../DetailsButton';
import * as css from './MovieCard.module.scss'

interface MovieCardProps {
    movie: Movie;
    dispatch: React.Dispatch<MovieDbStateAction>;
}

export default ({ movie, dispatch }: MovieCardProps) => {
    const selectMovieCallback = React.useCallback(
        () => dispatch({ type: ActionType.SelectMovie, payload: movie }),
        [dispatch],
    );

    return (
        <article className={css.movieArticle} onClick={selectMovieCallback}>
            <DetailsButton containerClassName={css.movieDetailsBtn} movie={movie} dispatch={dispatch} />
            <img src={movie.posterUrl} alt={movie.title} />
            <div className={css.movieInfo}>
                <h1 className={css.movieTitle}>{movie.title}</h1>
                <p className={css.movieYear}>{movie.year}</p>
                <p className={css.movieGenre}>{movie.genre.join(", ")}</p>
            </div>
        </article>
    );
};