import * as React from 'react';
import * as css from './MovieCard.module.scss'

interface MovieCardProps {
    posterUrl: string;
    title: string;
    year: string;
    genre: string;
}
export default (props: MovieCardProps) => (
    <article className={css.movieArticle}>
        <button className={css.movieDetailsBtn}>Details</button>
        < img src={props.posterUrl} alt={props.title} />
        <div className={css.movieInfo}>
            <h1 className={css.movieTitle}>{props.title}</h1>
            <p className={css.movieYear}>{props.year}</p>
            <p className={css.movieGenre}>{props.genre}</p>
        </div>
    </article>
);