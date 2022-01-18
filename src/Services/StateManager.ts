import { ActionType, MovieDbStateAction } from "../types/movieActions";
import { Movie, MovieDbState, NewMovie, SortOrder, UpdateActivity } from "../types/movieModels";

type SortHandler = (m1: Movie, m2: Movie) => number;

type SortOrderHandlers = Record<SortOrder, SortHandler>;

const sortOrderHandlers: SortOrderHandlers = {
    [SortOrder.ByNameAsc]: (m1: Movie, m2: Movie) => m1.title.toLocaleLowerCase().localeCompare(m2.title.toLocaleLowerCase()),
    [SortOrder.ByNameDesc]: (m1: Movie, m2: Movie) => m2.title.toLocaleLowerCase().localeCompare(m1.title.toLocaleLowerCase()),
    [SortOrder.ByReleaseAsc]: (m1: Movie, m2: Movie) => m1.release_date.localeCompare(m2.release_date),
    [SortOrder.ByReleaseDesc]: (m1: Movie, m2: Movie) => m2.release_date.localeCompare(m1.release_date),
};

export default class MovieDbStateManager {

    static initState(initList: ReadonlyArray<Movie>): Readonly<MovieDbState> {
        const sortOrder = SortOrder.ByReleaseAsc;
        const moviesList = [...initList].sort(sortOrderHandlers[sortOrder]);
        const genres = MovieDbStateManager.getGenresFromMovies(moviesList);
        return { moviesList, sortOrder, genres, filteredMoviesList: moviesList };
    }

    static reducer(state: Readonly<MovieDbState>, action: Readonly<MovieDbStateAction>): Readonly<MovieDbState> {
        switch (action.type) {
            case ActionType.AddMovie:
                return MovieDbStateManager.handleAddMovie(state, action.payload);
            case ActionType.DeleteMovie:
                return MovieDbStateManager.handleDeleteMovie(state, action.payload);
            case ActionType.EditMovie:
                return MovieDbStateManager.handleEditMovie(state, action.payload);
            case ActionType.SelectMovie:
                return MovieDbStateManager.handleSelectMovie(state, action.payload);
            case ActionType.SortMovies:
                return MovieDbStateManager.handleSortMovies(state, action.payload);
            case ActionType.ShowAddMovie:
                return MovieDbStateManager.handleShowHideAction(state, UpdateActivity.addActivity);
            case ActionType.ShowEditMovie:
                return MovieDbStateManager.handleShowHideAction(state, UpdateActivity.editActivity, action.payload);
            case ActionType.ShowDeleteMovie:
                return MovieDbStateManager.handleShowHideAction(state, UpdateActivity.deleteActivity, action.payload);
            case ActionType.HideMovieUpdate:
                return MovieDbStateManager.handleShowHideAction(state);
            case ActionType.ActiveGenreChange:
                return MovieDbStateManager.handleActiveGenreChange(state, action.payload);
            case ActionType.FetchedMovies:
            case ActionType.FetchedGenres:
                return state;
            default:
                const _exhaustiveCheck: never = action;
                return _exhaustiveCheck;
        }
    }

    private static handleAddMovie(state: Readonly<MovieDbState>, movie: Readonly<NewMovie>): Readonly<MovieDbState> {
        const newMovieState: Movie = { ...movie, id: MovieDbStateManager.generateId(movie, state.moviesList) };
        const moviesList = [...state.moviesList, newMovieState].sort(sortOrderHandlers[state.sortOrder]);
        const filteredMoviesList = MovieDbStateManager.getFilteredMoviesList(moviesList, state.activeGenre);
        const genres = MovieDbStateManager.getGenresFromMovies(moviesList);
        return {
            ...state, moviesList, genres, filteredMoviesList,
            currentUpdateActivity: undefined,
            movieUnderUpdateActivity: undefined
        };
    }

    private static generateId(movie: Readonly<NewMovie>, moviesList: ReadonlyArray<Movie>): string {
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

    private static handleDeleteMovie(state: Readonly<MovieDbState>, id: string): Readonly<MovieDbState> {
        const moviesList = state.moviesList.filter(movie => movie.id !== id);
        const genres = MovieDbStateManager.getGenresFromMovies(moviesList);
        const activeGenre = state.activeGenre && genres.includes(state.activeGenre) ? state.activeGenre : undefined;
        const filteredMoviesList = MovieDbStateManager.getFilteredMoviesList(moviesList, activeGenre);
        return {
            ...state, moviesList, genres, filteredMoviesList, activeGenre,
            currentUpdateActivity: undefined,
            movieUnderUpdateActivity: undefined
        };
    }

    private static handleEditMovie(state: Readonly<MovieDbState>, movie: Readonly<Movie>): Readonly<MovieDbState> {
        const index = state.moviesList.findIndex(m => m.id === movie.id);
        if (index === -1) {
            return state;
        }
        const moviesList = [...state.moviesList];
        moviesList[index] = Object.freeze(movie);
        moviesList.sort(sortOrderHandlers[state.sortOrder]);
        const genres = MovieDbStateManager.getGenresFromMovies(moviesList);
        const activeGenre = state.activeGenre && genres.includes(state.activeGenre) ? state.activeGenre : undefined;
        const filteredMoviesList = MovieDbStateManager.getFilteredMoviesList(moviesList, activeGenre);
        const selectedMovie = movie.id === state.selectedMovie?.id ? moviesList[index] : state.selectedMovie;
        return {
            ...state, moviesList, genres, filteredMoviesList, activeGenre,
            selectedMovie,
            currentUpdateActivity: undefined,
            movieUnderUpdateActivity: undefined
        };
    }

    private static handleSelectMovie(state: Readonly<MovieDbState>, movie: Readonly<Movie> | undefined): Readonly<MovieDbState> {
        const selectedMovie = movie;
        return { ...state, selectedMovie };
    }

    private static handleSortMovies(state: Readonly<MovieDbState>, sortOrder: SortOrder): Readonly<MovieDbState> {
        const moviesList = [...state.moviesList].sort(sortOrderHandlers[sortOrder]);
        const filteredMoviesList = MovieDbStateManager.getFilteredMoviesList(moviesList, state.activeGenre);
        return { ...state, sortOrder, moviesList, filteredMoviesList };
    }

    private static handleShowHideAction(state: Readonly<MovieDbState>,
        currentUpdateActivity?: UpdateActivity,
        movieUnderUpdateActivity?: Readonly<Movie>): Readonly<MovieDbState> {
        return { ...state, currentUpdateActivity, movieUnderUpdateActivity };
    }

    private static handleActiveGenreChange(state: Readonly<MovieDbState>, activeGenre: string): Readonly<MovieDbState> {
        const filteredMoviesList = MovieDbStateManager.getFilteredMoviesList(state.moviesList, activeGenre);
        return { ...state, activeGenre, filteredMoviesList };
    }

    private static getFilteredMoviesList(moviesList: ReadonlyArray<Movie>, activeGenre?: string): ReadonlyArray<Movie> {
        if (!activeGenre) {
            return moviesList;
        }
        return moviesList.filter(movie => movie.genres.includes(activeGenre));
    }

    private static getGenresFromMovies(moviesList: ReadonlyArray<Movie>): ReadonlyArray<string> {
        return [...new Set(moviesList.flatMap(m => m.genres))].sort();
    }

}