import { Movie, NewMovie } from "../types/movieModels";

const movieDataList: Movie[] = [
    {
        id: "pf2004",
        title: "Pulp Fiction",
        release_date: "2004-01-01",
        genres: ["Action", "Adventure"],
        poster_path: "/pulp_fiction.png",
        overview: "Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra",
        runtime: 154,
        vote_average: 8.9,
        vote_count: 0,
        budget: -1,
        tagline: "",
        revenue: 0,
    },
    {
        id: "awi2004",
        title: "Avengers: Infinity War",
        release_date: "2004-01-01",
        genres: ["Action", "Adventure"],
        poster_path: "/avengers.png",
        overview: "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
        runtime: 149,
        vote_average: 8.4,
        vote_count: 0,
        budget: -1,
        tagline: "",
        revenue: 0,
    },
    {
        id: "br2003",
        title: "Bohemian Rhapsody",
        release_date: "2003-01-01",
        genres: ["Drama", "Biography", "Music"],
        poster_path: "/bohemian_rhapsody.png",
        overview: "The story of the legendary British rock band Queen and lead singer Freddie Mercury, leading up to their famous performance at Live Aid (1985).",
        runtime: 134,
        vote_average: 7.9,
        vote_count: 0,
        budget: -1,
        tagline: "",
        revenue: 0,
    },
    {
        id: "kbv21994",
        title: "Kill Bill: Vol 2",
        release_date: "1994-01-01",
        genres: ["Oscar winning Movie"],
        poster_path: "/kill_bill_2.png",
        overview: "The Bride continues her quest of vengeance against her former boss and lover Bill, the reclusive bouncer Budd, and the treacherous, one-eyed Elle.",
        runtime: 137,
        vote_average: 8,
        vote_count: 0,
        budget: -1,
        tagline: "",
        revenue: 0,
    },
    {
        id: "i2003",
        title: "Inception",
        release_date: "2003-01-01",
        genres: ["Action", "Adventure"],
        poster_path: "/inception.png",
        overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
        runtime: 148,
        vote_average: 8.8,
        vote_count: 0,
        budget: -1,
        tagline: "",
        revenue: 0,
    },
    {
        id: "rd1994",
        title: "Reservoir dogs",
        release_date: "1994-01-01",
        genres: ["Oscar winning Movie"],
        poster_path: "/reservoir_dogs.png",
        overview: "This made-for-television documentary explores the style, characters, performances, impact, and influence of Quentin Tarantino's landmark indie film Reservoir Dogs (1992).",
        runtime: 24,
        vote_average: 7,
        vote_count: 0,
        budget: -1,
        tagline: "",
        revenue: 0,
    },
    {
        id: "fr1995",
        title: "Four Rooms",
        release_date: "1995-01-01",
        genres: ["Comedy"],
        poster_path: "/four_rooms.png",
        overview: "Four interlocking tales that take place in a fading hotel on New Year's Eve.",
        runtime: 98,
        vote_average: 6.8,
        vote_count: 0,
        budget: -1,
        tagline: "",
        revenue: 0,
    },
];

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

const MovieDataFetcher = {
    fetchMovieData: (): ReadonlyArray<Movie> => movieDataList,
    fetchGenreList: (): ReadonlyArray<string> => genreList,
}

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
        return fetch("http://localhost:4000/movies?" + new URLSearchParams(params)).
            then(response => response.json()).
            then(({ data }) => data);
    },
    addMovie: (movie: NewMovie): Promise<any> => {
        return fetch("http://localhost:4000/movies", {
            method: "POST",
            body: JSON.stringify(movie),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(response => response.json());
    },
    updateMovie: (movie: Movie): Promise<any> => {
        return fetch("http://localhost:4000/movies", {
            method: "PUT",
            body: JSON.stringify(movie),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(response => response.json());
    },
    deleteMovie: (movie: Movie): Promise<any> => {
        return fetch("http://localhost:4000/movies/" + movie.id, {
            method: "DELETE",
        }).then(response => response.status);
    },

    fetchGenreList: (): Promise<ReadonlyArray<string>> => Promise.resolve(genreList),
}


export default MovieDataFetcher;
export const MovieApi = MovieDataFetcherAPI;