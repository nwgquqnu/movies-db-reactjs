import { ActionType, MovieDbStateAction } from "../types/movieActions";
import { FetchedMoviesPayload, FetchApiMoviesParams, Movie, MovieDbState, NewMovie, SortOrder, UpdateActivity } from "../types/movieModels";

type SortHandler = (m1: Movie, m2: Movie) => number;

type SortOrderHandlers = Record<SortOrder, SortHandler>;

const sortOrderHandlers: SortOrderHandlers = {
    [SortOrder.ByNameAsc]: (m1: Movie, m2: Movie) => m1.title.toLocaleLowerCase().localeCompare(m2.title.toLocaleLowerCase()),
    [SortOrder.ByNameDesc]: (m1: Movie, m2: Movie) => m2.title.toLocaleLowerCase().localeCompare(m1.title.toLocaleLowerCase()),
    [SortOrder.ByReleaseAsc]: (m1: Movie, m2: Movie) => m1.release_date.localeCompare(m2.release_date),
    [SortOrder.ByReleaseDesc]: (m1: Movie, m2: Movie) => m2.release_date.localeCompare(m1.release_date),
};

const initialState: Readonly<MovieDbState> = {
    moviesList: [],
    filteredMoviesList: [],
    genres: [],
    sortOrder: SortOrder.ByNameAsc
}

export function rootReducer(state: Readonly<MovieDbState> = initialState, action: Readonly<MovieDbStateAction>): Readonly<MovieDbState> {
    switch (action.type) {
        case ActionType.AddMovie:
            return handleAddMovie(state, action.payload);
        case ActionType.DeleteMovie:
            return handleDeleteMovie(state, action.payload);
        case ActionType.EditMovie:
            return handleEditMovie(state, action.payload);
        case ActionType.SelectMovie:
            return handleSelectMovie(state, action.payload);
        case ActionType.SortMovies:
            return handleSortMovies(state, action.payload);
        case ActionType.ShowAddMovie:
            return handleShowHideAction(state, UpdateActivity.addActivity);
        case ActionType.ShowEditMovie:
            return handleShowHideAction(state, UpdateActivity.editActivity, action.payload);
        case ActionType.ShowDeleteMovie:
            return handleShowHideAction(state, UpdateActivity.deleteActivity, action.payload);
        case ActionType.HideMovieUpdate:
            return handleShowHideAction(state);
        case ActionType.ActiveGenreChange:
            return handleActiveGenreChange(state, action.payload);
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
        filteredMoviesList: movies,
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

function handleAddMovie(state: Readonly<MovieDbState>, movie: Readonly<NewMovie>): Readonly<MovieDbState> {
    const newMovieState: Movie = { ...movie, id: generateId(movie, state.moviesList) };
    const moviesList = [...state.moviesList, newMovieState].sort(sortOrderHandlers[state.sortOrder]);
    const filteredMoviesList = getFilteredMoviesList(moviesList, state.activeGenre);
    return {
        ...state, moviesList, filteredMoviesList,
        currentUpdateActivity: undefined,
        movieUnderUpdateActivity: undefined
    };
}

function generateId(movie: Readonly<NewMovie>, moviesList: ReadonlyArray<Movie>): string {
    const firstTitleLetters = movie.title.split(" ").map(word => word[0]).join().toLowerCase();
    const initialId = firstTitleLetters + movie.release_date;
    const moviesIdsSet: ReadonlySet<string> = new Set(moviesList.map(m => m.id));
    let finalId = initialId;
    let nextIndex = 1;
    while (moviesIdsSet.has(finalId)) {
        finalId = `${initialId}_${nextIndex}`;
        nextIndex++;
    }
    return finalId;
}

function handleDeleteMovie(state: Readonly<MovieDbState>, id: string): Readonly<MovieDbState> {
    const moviesList = state.moviesList.filter(movie => movie.id !== id);
    const activeGenre = state.activeGenre;
    const filteredMoviesList = getFilteredMoviesList(moviesList, activeGenre);
    return {
        ...state, moviesList, filteredMoviesList, activeGenre,
        currentUpdateActivity: undefined,
        movieUnderUpdateActivity: undefined
    };
}

function handleEditMovie(state: Readonly<MovieDbState>, movie: Readonly<Movie>): Readonly<MovieDbState> {
    const index = state.moviesList.findIndex(m => m.id === movie.id);
    if (index === -1) {
        return state;
    }
    const moviesList = [...state.moviesList];
    moviesList[index] = Object.freeze(movie);
    moviesList.sort(sortOrderHandlers[state.sortOrder]);
    const activeGenre = state.activeGenre;
    const filteredMoviesList = getFilteredMoviesList(moviesList, activeGenre);
    const selectedMovie = movie.id === state.selectedMovie?.id ? moviesList[index] : state.selectedMovie;
    return {
        ...state, moviesList, filteredMoviesList, activeGenre,
        selectedMovie,
        currentUpdateActivity: undefined,
        movieUnderUpdateActivity: undefined
    };
}

function handleSelectMovie(state: Readonly<MovieDbState>, movie: Readonly<Movie> | undefined): Readonly<MovieDbState> {
    const selectedMovie = movie;
    return { ...state, selectedMovie };
}

function handleSortMovies(state: Readonly<MovieDbState>, sortOrder: SortOrder): Readonly<MovieDbState> {
    const moviesList = [...state.moviesList].sort(sortOrderHandlers[sortOrder]);
    const filteredMoviesList = getFilteredMoviesList(moviesList, state.activeGenre);
    return { ...state, sortOrder, moviesList, filteredMoviesList };
}

function handleShowHideAction(state: Readonly<MovieDbState>,
    currentUpdateActivity?: UpdateActivity,
    movieUnderUpdateActivity?: Readonly<Movie>): Readonly<MovieDbState> {
    return { ...state, currentUpdateActivity, movieUnderUpdateActivity };
}

function handleActiveGenreChange(state: Readonly<MovieDbState>, activeGenre: string): Readonly<MovieDbState> {
    const filteredMoviesList = getFilteredMoviesList(state.moviesList, activeGenre);
    return { ...state, activeGenre, filteredMoviesList };
}

function getFilteredMoviesList(moviesList: ReadonlyArray<Movie>, activeGenre?: string): ReadonlyArray<Movie> {
    if (!activeGenre) {
        return moviesList;
    }
    return moviesList.filter(movie => movie.genres.includes(activeGenre));
}

