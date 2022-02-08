import { FetchedMoviesPayload, Movie } from "./movieModels";

export enum ActionType {
    ShowAddMovie = "SHOW_ADD_MOVIE",
    ShowDeleteMovie = "SHOW_DELETE_MOVIE",
    ShowEditMovie = "SHOW_EDIT_MOVIE",
    HideMovieUpdate = "HIDE_MOVIE_UPDATE",
    FetchedMovies = "FETCHED_MOVIES",
    FetchedGenres = "FETCHED_GENRES",

}

interface NoPayloadAction {
    type: ActionType.ShowAddMovie | ActionType.HideMovieUpdate;
}

interface EditMovieAction {
    type: ActionType.ShowEditMovie | ActionType.ShowDeleteMovie;
    payload: Movie;
}

export interface FetchedMoviesAction {
    type: ActionType.FetchedMovies;
    payload: FetchedMoviesPayload;
}

export interface FetchedGenresAction {
    type: ActionType.FetchedGenres;
    payload: ReadonlyArray<string>;
}

export type MovieDbStateAction = (
    EditMovieAction
    | NoPayloadAction
    | FetchedMoviesAction
    | FetchedGenresAction
);