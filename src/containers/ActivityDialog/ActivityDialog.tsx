import * as React from 'react'
import { ActionType, MovieDbStateAction } from '../../types/movieActions';
import { Movie, NewMovie, UpdateActivity } from '../../types/movieModels';
import ModifyMovieForm from '../ModifyMovieForm';
import DeleteMovieForm from '../DeleteMovieForm';
import Modal from '../Modal';

interface ActivityDialogProps {
    currentUpdateActivity: UpdateActivity | null;
    activityMovie: Movie | null;
    genreList: ReadonlyArray<string>;
    dispatch: React.Dispatch<MovieDbStateAction>;
}

class FormMovie implements Movie {
    id = ""
    title = "";
    year = "";
    genre = [];
    posterUrl = "";
    description = "";
    runtime = -1;
    rating = -1;
}

export default ({ currentUpdateActivity, activityMovie: movie, dispatch, genreList }: ActivityDialogProps) => {
    const closeHandler = React.useCallback(
        () => dispatch({ type: ActionType.HideMovieUpdate }),
        [dispatch],
    );
    const addSubmitHandler = React.useCallback(
        (movie: NewMovie) => dispatch({ type: ActionType.AddMovie, payload: movie }),
        [dispatch],
    );
    const editSubmitHandler = React.useCallback(
        (movie: Movie) => dispatch({ type: ActionType.EditMovie, payload: movie }),
        [dispatch],
    );
    const domParent = React.useMemo(() => document && document.getElementById("modal"), []);

    let modal = null;
    if (currentUpdateActivity == UpdateActivity.addActivity) {
        modal = (
            <Modal initialModalRoot={domParent}>
                <ModifyMovieForm<NewMovie>
                    title="Add Movie"
                    closeHandler={closeHandler}
                    emptyMovieCreator={FormMovie}
                    submitHandler={addSubmitHandler}
                    genreList={genreList} />
            </Modal>
        )
    } else if (currentUpdateActivity === UpdateActivity.editActivity) {
        modal = (
            <Modal initialModalRoot={domParent}>
                <ModifyMovieForm<Movie>
                    title="Edit Movie"
                    movie={movie!}
                    closeHandler={closeHandler}
                    emptyMovieCreator={FormMovie}
                    submitHandler={editSubmitHandler}
                    genreList={genreList} />
            </Modal>
        )
    } else if (currentUpdateActivity === UpdateActivity.deleteActivity) {
        modal = (
            <Modal initialModalRoot={domParent}>
                <DeleteMovieForm dispatch={dispatch} movie={movie!} />
            </Modal>
        )
    }
    return (
        <>
            {modal}
        </>
    )
};