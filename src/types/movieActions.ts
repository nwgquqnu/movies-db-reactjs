import { Movie, NewMovie, SortOrder } from "./movieModels";

export enum ActionType {
    AddMovie = "ADD_MOVIE",
    EditMovie = "EDIT_MOVIE",
    DeleteMovie = "DELETE_MOVIE",
    SelectMovie = "SELECT_MOVIE",
    SortMovies = "SORT_MOVIES",
    ShowAddMovie = "SHOW_ADD_MOVIE",
    ShowDeleteMovie = "SHOW_DELETE_MOVIE",
    ShowEditMovie = "SHOW_EDIT_MOVIE",
    HideMovieUpdate = "HIDE_MOVIE_UPDATE",
}

interface NoPayloadAction {
    type: ActionType.ShowAddMovie | ActionType.HideMovieUpdate;
}

interface EditMovieAction {
    type: ActionType.EditMovie | ActionType.ShowEditMovie | ActionType.ShowDeleteMovie;
    payload: Movie;
}

interface SelectMovieAction {
    type: ActionType.SelectMovie;
    payload?: Movie;
}

interface AddMovieAction {
    type: ActionType.AddMovie;
    payload: NewMovie;
}

interface DeleteMovieAction {
    type: ActionType.DeleteMovie;
    payload: string;
}

interface SortMoviesAction {
    type: ActionType.SortMovies;
    payload: SortOrder;
}

export type MovieDbStateAction = (
    AddMovieAction
    | DeleteMovieAction
    | EditMovieAction
    | SelectMovieAction
    | SortMoviesAction
    | NoPayloadAction
);