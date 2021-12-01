import * as React from 'react';
import * as css from './MovieCounter.module.scss';

interface MovieCounterProps {
    count: number;
}
export default (props: MovieCounterProps) => (
    <div className={css.movieCounter}>
        <strong>{props.count}</strong> movie{props.count !== 1 ? "s": ""} found
    </div>
);
