import { Movie } from "../types/movieModels";

const movieDataList: Movie[] = [
    {
        id: "pf2004",
        title: "Pulp Fiction",
        year: "2004",
        genre: ["Action", "Adventure"],
        posterUrl: "/pulp_fiction.png",
        description:"Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra",
        runtime: 154,
        rating: 8.9,
    },
    {
        id: "awi2004",
        title: "Avengers: Infinity War",
        year: "2004",
        genre: ["Action", "Adventure"],
        posterUrl: "/avengers.png",
        description:"The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
        runtime: 149,
        rating: 8.4 ,
    },
    {
        id: "br2003",
        title: "Bohemian Rhapsody",
        year: "2003",
        genre: ["Drama", "Biography", "Music"],
        posterUrl: "/bohemian_rhapsody.png",
        description:"The story of the legendary British rock band Queen and lead singer Freddie Mercury, leading up to their famous performance at Live Aid (1985).",
        runtime: 134,
        rating: 7.9,
    },
    {
        id: "kbv21994",
        title: "Kill Bill: Vol 2",
        year: "1994",
        genre: ["Oscar winning Movie"],
        posterUrl: "/kill_bill_2.png",
        description:"The Bride continues her quest of vengeance against her former boss and lover Bill, the reclusive bouncer Budd, and the treacherous, one-eyed Elle.",
        runtime: 137,
        rating: 8,
    },
    {
        id: "i2003",
        title: "Inception",
        year: "2003",
        genre: ["Action", "Adventure"],
        posterUrl: "/inception.png",
        description:"A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
        runtime: 148,
        rating: 8.8,
    },
    {
        id: "rd1994",
        title: "Reservoir dogs",
        year: "1994",
        genre: ["Oscar winning Movie"],
        posterUrl: "/reservoir_dogs.png",
        description:"This made-for-television documentary explores the style, characters, performances, impact, and influence of Quentin Tarantino's landmark indie film Reservoir Dogs (1992).",
        runtime: 24,
        rating: 7,
    },
    {
        id: "fr1995",
        title: "Four Rooms",
        year: "1995",
        genre: ["Comedy"],
        posterUrl: "/four_rooms.png",
        description:"Four interlocking tales that take place in a fading hotel on New Year's Eve.",
        runtime: 98,
        rating: 6.8,
    },
];

const genreList = [
    "Comedy",
    "Crime",
    "Horror",
    "Action",
    "Adventure",
    "Drama",
    "Oscar winning Movie",
    "Biography",
    "Music",
].sort();

const MovieDataFetcher = {
    fetchMovieData: (): ReadonlyArray<Movie> => movieDataList,
    fetchGenreList: (): ReadonlyArray<string> => genreList,
}

export default MovieDataFetcher;