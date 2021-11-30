import * as React from 'react';
import * as css from './MovieSortBy.module.css';

export default () => (
    <label className={css.movieSortBy}>
        <span>sort by</span>
        <select>
            <option value="release_date" selected>Release Date</option>
            <option value="name">Name</option>
        </select>
    </label>
);
