import * as React from 'react'
import { ActionType, MovieDbStateAction } from '../../types/movieActions';
import { Movie, NewMovie, UpdateActivity } from '../../types/movieModels';
import ModifyMovieForm from '../ModifyMovieForm';
import DeleteMovieForm from '../DeleteMovieForm';
import Modal from '../Modal';
import { AppDispatch } from '../../store/store';
import { addMovie, updateMovie } from '../../store/moviesThunk';

interface ActivityDialogProps {
    currentUpdateActivity: UpdateActivity | null;
    activityMovie: Movie | null;
    genreList: ReadonlyArray<string>;
    dispatch: AppDispatch;
}

class FormMovie implements Movie {
    id = ""
    title = "";
    release_date = "";
    genres = [];
    poster_path = "";
    overview = "";
    runtime = -1;
    vote_average = -1;
    vote_count = 0;
    budget = 0;
    tagline = "some tagline";
    revenue = 0;
}

export default ({ currentUpdateActivity, activityMovie: movie, dispatch, genreList }: ActivityDialogProps) => {
    const closeHandler = () => dispatch({ type: ActionType.HideMovieUpdate });
    const addSubmitHandler = (movie: Movie) => {
        const movieWithoutId: Omit<Movie, "id"> & Pick<Partial<Movie>, "id"> = movie;
        delete movieWithoutId.id;
        dispatch(addMovie(movie));
        closeHandler();
    }
    const editSubmitHandler = (movie: Movie) => {
        dispatch(updateMovie(movie));
        closeHandler();
    }
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