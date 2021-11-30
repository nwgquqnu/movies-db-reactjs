import * as React from 'react';
import * as css from './MovieSortBy.module.css';

export default ({ defaultValue = "release_date"}) => (
    <label className={css.movieSortBy}>
        <span>sort by</span>
        <select defaultValue={defaultValue}>
            <option value="release_date">Release Date</option>
            <option value="name">Name</option>
        </select>
    </label>
);
