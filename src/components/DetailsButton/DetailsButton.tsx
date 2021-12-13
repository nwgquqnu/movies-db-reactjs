import * as React from 'react';
import clsx from 'clsx';
import { ActionType, MovieDbStateAction } from '../../types/movieActions';
import { Movie } from '../../types/movieModels';
import * as css from './DetailsButton.module.scss';

interface DetailsButtonProps {
    movie: Movie;
    dispatch: React.Dispatch<MovieDbStateAction>;
    containerClassName: string;
}

function dispatchMovieEvent(event: React.MouseEvent,
    dispatch: React.Dispatch<MovieDbStateAction>,
    type: ActionType.ShowEditMovie | ActionType.ShowDeleteMovie,
    payload: Movie) {
    event.stopPropagation();
    event.preventDefault();
    dispatch({ type, payload });
}

export default ({ containerClassName, movie, dispatch }: DetailsButtonProps) => {
    const clickEditHandler = React.useCallback(
        (e: React.MouseEvent) => dispatchMovieEvent(e, dispatch, ActionType.ShowEditMovie, movie),
        [movie, dispatch],
    );
    const clickDeleteHandler = React.useCallback(
        (e: React.MouseEvent) => dispatchMovieEvent(e, dispatch, ActionType.ShowDeleteMovie, movie),
        [movie, dispatch],
    );
    return (
        <nav className={clsx(css.detailsBtnContainer, containerClassName)} role="navigation">
            <ul>
                <li className={css.detailsBtn}><button aria-haspopup="true">Details</button>
                    <ul className="dropdown" aria-label="submenu">
                        <li onClick={clickEditHandler}><button>Edit</button></li>
                        <li onClick={clickDeleteHandler}><button>Delete</button></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
};