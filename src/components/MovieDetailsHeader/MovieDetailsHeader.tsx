import * as React from 'react';
import useSelectedMovie from '../../hooks/useSelectedMovie';
import MainLogo from '../MainLogo';
import * as css from './MovieDetailsHeader.module.scss';

function formatMinutes(minutes?: number): string {
    if (minutes == null) {
        return 'No data';
    }
    return `${Math.floor(minutes / 60)}h ${('0' + (minutes % 60)).slice(-2)}m`;
}

function formatVoteAverage(vote_average?: number): string {
    if (vote_average == null) {
        return 'N/A';
    }
    return vote_average.toPrecision(2);
}

function getYear(date: string | undefined): string {
    if (!date) {
        return '';
    }
    return date.slice(0, 4);
}

export default () => {
    const [movie, setSearchParamMovieId] = useSelectedMovie();

    const displayLength = React.useMemo(() => formatMinutes(movie?.runtime), [movie?.runtime]);
    React.useEffect(() => window.scrollTo(0, 0), [movie]);

    return (
        <header className={css.detailsAppHeader}>
            <MainLogo />
            <button onClick={() => setSearchParamMovieId()}>X</button>
            <img className={css.moviePoster} src={movie?.poster_path} alt={movie?.title} />
            <div className={css.movieInfo}>
                <h1 className={css.movieTitle}>{movie?.title}<span>{formatVoteAverage(movie?.vote_average)}</span></h1>
                <p className={css.movieGenre}>{movie?.genres.join(", ")}</p>
                <p className={css.movieYearAndLength}>
                    <span>{getYear(movie?.release_date)}</span>
                    <span>{displayLength}</span>
                </p>
                <p className={css.movieDescription}>{movie?.overview}</p>
            </div>
        </header>
    )
};
