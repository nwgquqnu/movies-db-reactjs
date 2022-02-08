import { MovieApi } from '../Services/MovieDataFetcher';
import { ActionType, FetchedGenresAction, FetchedMoviesAction } from '../types/movieActions';
import { DEFAULT_SORT_ORDER, FetchApiMoviesParams, FetchMoviesParams, Movie, NewMovie, newMovieFields, SortOrder } from '../types/movieModels';
import { AppDispatch } from './store';

//synchronous action creator
const fetchMoviesSuccess = (movies: ReadonlyArray<Movie>, params: FetchApiMoviesParams): FetchedMoviesAction => ({
    type: ActionType.FetchedMovies,
    payload: { list: movies, params }
});

/*asynchronous thunk action creator
  calls the api, then dispatches the synchronous action creator
*/
export const fetchMovies = (fetchParams: FetchMoviesParams) => {
    return async (dispatch: AppDispatch) => {
        try {
            const sortOrder = fetchParams.sortOrder ?? DEFAULT_SORT_ORDER;
            const activeGenre = fetchParams.activeGenre;
            const params: FetchApiMoviesParams = {
                search: fetchParams.search,
                searchBy: fetchParams.search !== undefined ? "title" : undefined,
                sortBy: getSortBy(sortOrder),
                sortOrder: getSortDirection(sortOrder),
                filter: activeGenre ? [activeGenre] : undefined,
            };
            let movies = await MovieApi.fetchMovieData(params);
            dispatch(fetchMoviesSuccess(movies, params));
        } catch (e) {
            console.log(e)
        }
    }
};

/*asynchronous thunk action creator
  calls the api, then dispatches the synchronous action creator
*/
export const addMovie = (movie: NewMovie, fetchParams: FetchMoviesParams) => {
    return async (dispatch: AppDispatch) => {
        try {
            await MovieApi.addMovie(movie);
            dispatch(fetchMovies(fetchParams));
        } catch (e) {
            console.log(e)
        }
    }
};
/*asynchronous thunk action creator
  calls the api, then dispatches the synchronous action creator
*/
export const updateMovie = (movie: Movie, fetchParams: FetchMoviesParams) => {
    return async (dispatch: AppDispatch) => {
        try {
            await MovieApi.updateMovie(movie);
            dispatch(fetchMovies(fetchParams));
        } catch (e) {
            console.log(e)
        }
    }
};
/*asynchronous thunk action creator
  calls the api, then dispatches the synchronous action creator
*/
export const deleteMovie = (movie: Movie, fetchParams: FetchMoviesParams) => {
    return async (dispatch: AppDispatch) => {
        try {
            await MovieApi.deleteMovie(movie);
            dispatch(fetchMovies(fetchParams));
        } catch (e) {
            console.log(e)
        }
    }
};

//synchronous action creator
const fetchGenresSuccess = (genres: ReadonlyArray<string>): FetchedGenresAction => ({
    type: ActionType.FetchedGenres,
    payload: genres
});

/*asynchronous thunk action creator
  calls the api, then dispatches the synchronous action creator
*/
export const fetchGenres = () => {
    return async (dispatch: AppDispatch) => {
        try {
            let genres = await MovieApi.fetchGenreList();
            dispatch(fetchGenresSuccess(genres))
        } catch (e) {
            console.log(e)
        }
    }
};

function getSortBy(order: SortOrder): string {
    switch (order) {
        case SortOrder.ByNameAsc:
        case SortOrder.ByNameDesc:
            return newMovieFields.title;
        case SortOrder.ByReleaseAsc:
        case SortOrder.ByReleaseDesc:
            return newMovieFields.release_date;
        default:
            const _exhaustiveCheck: never = order;
            return _exhaustiveCheck;
    }
}

function getSortDirection(order: SortOrder): "asc" | "desc" {
    switch (order) {
        case SortOrder.ByNameAsc:
        case SortOrder.ByReleaseAsc:
            return "asc";
        case SortOrder.ByNameDesc:
        case SortOrder.ByReleaseDesc:
            return "desc";
        default:
            const _exhaustiveCheck: never = order;
            return _exhaustiveCheck;
    }
}
