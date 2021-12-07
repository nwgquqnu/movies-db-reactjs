import * as React from 'react';
import { ActionType, MovieDbStateAction } from '../../types/movieActions';
import { Movie } from '../../types/movieModels';
import AddButton from '../AddButton';
import MainLogo from '../MainLogo';
import * as css from './MovieDetailsHeader.module.scss';

interface MovieDetailsHeaderProps {
    selectedMovie: Movie;
    dispatch: React.Dispatch<MovieDbStateAction>;
}

export default (props: MovieDetailsHeaderProps) => {
    const closeCallBack = React.useCallback(
        () => {
            props.dispatch({ type: ActionType.SelectMovie })
        },
        [props.dispatch],
    );
    return (
    <header className={css.appHeader}>
        <MainLogo />
        <AddButton text="Close" handler={closeCallBack} />
        <div>Some details</div>
    </header>
)};
