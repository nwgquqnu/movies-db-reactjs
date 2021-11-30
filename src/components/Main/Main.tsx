import * as React from 'react'
import GenreToggle from '../GenreToggle';
import * as css from './Main.module.css';
import MovieCard from '../MovieCard';
import MovieCounter from '../MovieCounter';
import MovieSortBy from '../MovieSortBy/MovieSortBy';
import ErrorBoundary from '../../containers/ErrorBoundary';

const movieDataList = [
    {
        title: "Pulp Fiction",
        year: "2004",
        genre: "Action&Adventure",
        posterUrl: "/pulp_fiction.png"
    },
    {
        title: "Avengers: War of Infinity",
        year: "2004",
        genre: "Action&Adventure",
        posterUrl: "/avengers.png"
    },
    {
        title: "Bohemian Rhapsody",
        year: "2003",
        genre: "Drama, Biography, Music",
        posterUrl: "/bohemian_rhapsody.png"
    },
    {
        title: "Kill Bill: Vol 2",
        year: "1994",
        genre: "Oscar winning Movie",
        posterUrl: "/kill_bill_2.png"
    },
    {
        title: "Inception",
        year: "2003",
        genre: "Action & Adventure",
        posterUrl: "/inception.png"
    },
    {
        title: "Reservoir dogs",
        year: "1994",
        genre: "Oscar winning Movie",
        posterUrl: "/reservoir_dogs.png"
    },
    {
        title: "Four Rooms",
        year: "1995",
        genre: "Comedy",
        posterUrl: "/four_rooms.png"
    },
];

export default () => (
    <main className={css.appMain}>
        <ErrorBoundary>
            <nav className={css.navPanel}>
                <GenreToggle />
                <MovieSortBy />
            </nav>
            <MovieCounter count={movieDataList.length}/>
            <div className={css.movieContainer}>
                {movieDataList.map((movieData)=>(
                    <MovieCard {...movieData} />
                ))}
            </div>
        </ErrorBoundary>
    </main>
);