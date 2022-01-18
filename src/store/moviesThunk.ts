import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { MovieApi } from '../Services/MovieDataFetcher';
import { ActionType, FetchedGenresAction, FetchedMoviesAction } from '../types/movieActions';
import { FetchApiMoviesParams, Movie, MovieDbState, NewMovie, newMovieFields, SortOrder } from '../types/movieModels';
import { AppDispatch } from './store';

type FetchMoviesParams = {
    sortOrder?: SortOrder;
    search?: string;
    activeGenre?: string | null;
}

type ActionPayload = {
    list: ReadonlyArray<Movie>,
    transformations: FetchApiMoviesParams,
};

//synchronous action creator
const fetchMoviesSuccess = (movies: ReadonlyArray<Movie>, params: FetchApiMoviesParams): FetchedMoviesAction => ({
    type: ActionType.FetchedMovies,
    payload: { list: movies, params }
});

/*asynchronous thunk action creator
  calls the api, then dispatches the synchronous action creator
*/
export const fetchMovies = (fetchParams: FetchMoviesParams) => {
    return async (dispatch: AppDispatch, getState: () => MovieDbState) => {
        try {
            const state = getState();
            const sortOrder = fetchParams.sortOrder !== undefined ? fetchParams.sortOrder : state.sortOrder;
            const activeGenre = fetchParams.activeGenre !== undefined ? fetchParams.activeGenre : state.activeGenre;
            const params: FetchApiMoviesParams = {
                search: fetchParams.search !== undefined ? fetchParams.search : state.searchText,
                searchBy: fetchParams.search !== undefined ? "title" : state.searchBy,
                sortBy: getSortBy(sortOrder),
                sortOrder: getSortDirection(sortOrder),
                filter: activeGenre ? [activeGenre] : undefined,
            };
            let movies = await MovieApi.fetchMovieData(
                params.sortBy,
                params.sortOrder,
                params.search,
                params.searchBy,
                params.filter
            );
            dispatch(fetchMoviesSuccess(movies, params));
        } catch (e) {
            console.log(e)
        }
    }
};

/*asynchronous thunk action creator
  calls the api, then dispatches the synchronous action creator
*/
export const addMovie = (movie: NewMovie) => {
    return async (dispatch: AppDispatch) => {
        try {
            await MovieApi.addMovie(movie);
            dispatch(fetchMovies({}));
        } catch (e) {
            console.log(e)
        }
    }
};
/*asynchronous thunk action creator
  calls the api, then dispatches the synchronous action creator
*/
export const updateMovie = (movie: Movie) => {
    return async (dispatch: AppDispatch) => {
        try {
            await MovieApi.updateMovie(movie);
            dispatch(fetchMovies({}));
        } catch (e) {
            console.log(e)
        }
    }
};
/*asynchronous thunk action creator
  calls the api, then dispatches the synchronous action creator
*/
export const deleteMovie = (movie: Movie) => {
    return async (dispatch: AppDispatch) => {
        try {
            await MovieApi.deleteMovie(movie);
            dispatch(fetchMovies({}));
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

// export const fetchMoviesAT = createAsyncThunk<ActionPayload, FetchApiMoviesParams, { state: MovieDbState }>(
//     ActionType.FetchedMovies,
//     async (config: FetchApiMoviesParams, { getState }) => {
//         const state = getState();
//         const response = await MovieApi.fetchMovieData(
//             getSortBy(state.sortOrder) || config.sortBy,
//             getSortDirection(state.sortOrder) || config.sortOrder,
//             config.search,
//             config.searchBy,
//             state.activeGenre && [state.activeGenre] || config.filter
//         );
//         // The value we return becomes the `fulfilled` action payload
//         return {
//             list: response,
//             transformations: config,
//         };
//     }
// );

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
