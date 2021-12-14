import * as React from 'react';
import { ActionType, MovieDbStateAction } from '../../types/movieActions';
import MovieContext from '../../types/movieContext';
import { Movie } from '../../types/movieModels';
import AddButton from '../AddButton';
import MainLogo from '../MainLogo';
import * as css from './MovieDetailsHeader.module.scss';

function formatMinutes(minutes?: number): string {
    if (minutes == null) {
        return 'No data';
    }
    return `${Math.floor(minutes / 60)}h ${('0' + (minutes % 60)).slice(-2)}m`;
}

function formatRating(rating?: number): string {
    if (rating == null) {
        return 'N/A';
    }
    return rating.toPrecision(2)
}
export default () => {
    const contextObj = React.useContext(MovieContext);
    const movie = contextObj.state.selectedMovie;
    const dispatch = contextObj.dispatch;
    const displayLength = React.useMemo(() => formatMinutes(movie?.runtime), [movie?.runtime]);

    return (
        <header className={css.detailsAppHeader}>
            <MainLogo />
            <button onClick={() => dispatch({ type: ActionType.SelectMovie })}>X</button>
            <img className={css.moviePoster} src={movie?.posterUrl} alt={movie?.title} />
            <div className={css.movieInfo}>
                <h1 className={css.movieTitle}>{movie?.title}<span>{formatRating(movie?.rating)}</span></h1>
                <p className={css.movieGenre}>{movie?.genre.join(", ")}</p>
                <p className={css.movieYearAndLength}>
                    <span>{movie?.year}</span>
                    <span>{displayLength}</span>
                </p>
                <p className={css.movieDescription}>{movie?.description}</p>
            </div>
        </header>
    )
};
