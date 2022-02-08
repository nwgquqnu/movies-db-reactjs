import { ActionType, MovieDbStateAction } from "../types/movieActions";
import { FetchedMoviesPayload, Movie, MovieDbState, UpdateActivity } from "../types/movieModels";

const initialState: Readonly<MovieDbState> = {
    moviesList: [],
    genres: [],
}

export function rootReducer(state: Readonly<MovieDbState> = initialState, action: Readonly<MovieDbStateAction>): Readonly<MovieDbState> {
    switch (action.type) {
        case ActionType.ShowAddMovie:
            return handleShowHideAction(state, UpdateActivity.addActivity);
        case ActionType.ShowEditMovie:
            return handleShowHideAction(state, UpdateActivity.editActivity, action.payload);
        case ActionType.ShowDeleteMovie:
            return handleShowHideAction(state, UpdateActivity.deleteActivity, action.payload);
        case ActionType.HideMovieUpdate:
            return handleShowHideAction(state);
        case ActionType.FetchedMovies:
            return handleFetchedMovies(state, action.payload);
        case ActionType.FetchedGenres:
            return handleFetchedGenres(state, action.payload);
        default:
            const _exhaustiveCheck: never = action;
            return state;
    }
}

function handleFetchedGenres(state: Readonly<MovieDbState>, payload: ReadonlyArray<string>): Readonly<MovieDbState> {
    return {
        ...state,
        genres: payload,
    }
}

function handleFetchedMovies(state: Readonly<MovieDbState>, payload: FetchedMoviesPayload): Readonly<MovieDbState> {
    const movies = payload.list;
    const params = payload.params;
    return {
        ...state,
        moviesList: movies,
    }
}

function handleShowHideAction(state: Readonly<MovieDbState>,
    currentUpdateActivity?: UpdateActivity,
    movieUnderUpdateActivity?: Readonly<Movie>): Readonly<MovieDbState> {
    return { ...state, currentUpdateActivity, movieUnderUpdateActivity };
}
