import { ActionType, MovieDbStateAction } from "../types/movieActions";
import { FetchApiMoviesParams, FetchedMoviesPayload, Movie, MovieDbState, SortOrder, UpdateActivity } from "../types/movieModels";

const initialState: Readonly<MovieDbState> = {
    moviesList: [],
    genres: [],
    sortOrder: SortOrder.ByNameAsc
}

export function rootReducer(state: Readonly<MovieDbState> = initialState, action: Readonly<MovieDbStateAction>): Readonly<MovieDbState> {
    switch (action.type) {
        case ActionType.SelectMovie:
            return handleSelectMovie(state, action.payload);
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
    const selectedMovie = getMovie(state.selectedMovie, movies);
    return {
        ...state,
        moviesList: movies,
        sortOrder: getSortOrder(params),
        activeGenre: params.filter?.shift(),
        selectedMovie,
        searchText: params.search,
        searchBy: params.searchBy,
    }
}

function getMovie(target: Movie | undefined, list: ReadonlyArray<Movie>): Movie | undefined {
    if (!target) {
        return;
    }
    return list.find(movie => movie.id === target.id);
}

function getSortOrder(params: FetchApiMoviesParams): SortOrder {
    if (params.sortOrder === "desc") {
        if (params.sortBy === "title") {
        return SortOrder.ByNameDesc
        } else {
            return SortOrder.ByReleaseDesc;
        }
    } else if (params.sortBy === "release") {
        return SortOrder.ByReleaseAsc;
    }
    return SortOrder.ByNameAsc;
}


function handleSelectMovie(state: Readonly<MovieDbState>, movie: Readonly<Movie> | undefined): Readonly<MovieDbState> {
    const selectedMovie = movie;
    return { ...state, selectedMovie };
}

function handleShowHideAction(state: Readonly<MovieDbState>,
    currentUpdateActivity?: UpdateActivity,
    movieUnderUpdateActivity?: Readonly<Movie>): Readonly<MovieDbState> {
    return { ...state, currentUpdateActivity, movieUnderUpdateActivity };
}
