import { Movie, NewMovie } from "../types/movieModels";

const moviesBaseUrl = "http://localhost:4000/movies";

const genreList = [
    'Drama',
    'Romance',
    'Animation',
    'Adventure',
    'Family',
    'Comedy',
    'Fantasy',
    'Science Fiction',
    'Action',
    'Mystery',
    'Thriller',
    'Music',
    'War',
    'Crime',
    'History',
    'Horror',
    'Western',
    'Documentary',
    'TV Movie'
].sort();

const MovieDataFetcherAPI = {
    fetchMovieData: (
        sortBy?: string,
        sortOrder?: "asc" | "desc",
        search?: string,
        searchBy?: "title" | "genre",
        filter?: string[],
    ): Promise<ReadonlyArray<Movie>> => {
        const params: string[][] = Object.entries({
            sortBy,
            sortOrder,
            search,
            searchBy,
            filter: filter?.join(",")
        }).filter(entry => entry[1]) as Array<[string, string]>;
        return fetch(moviesBaseUrl + "?" + new URLSearchParams(params)).
            then(response => response.json()).
            then(({ data }) => data);
    },
    addMovie: (movie: NewMovie): Promise<any> => {
        return fetch(moviesBaseUrl, {
            method: "POST",
            body: JSON.stringify(movie),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(response => response.json());
    },
    updateMovie: (movie: Movie): Promise<any> => {
        return fetch(moviesBaseUrl, {
            method: "PUT",
            body: JSON.stringify(movie),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(response => response.json());
    },
    deleteMovie: (movie: Movie): Promise<any> => {
        return fetch(moviesBaseUrl + "/" + movie.id, {
            method: "DELETE",
        }).then(response => response.status);
    },

    fetchGenreList: (): Promise<ReadonlyArray<string>> => Promise.resolve(genreList),
}


export const MovieApi = MovieDataFetcherAPI;