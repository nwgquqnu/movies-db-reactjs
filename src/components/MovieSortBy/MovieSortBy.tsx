import * as React from 'react';
import * as css from './MovieSortBy.module.scss';
import { SortOrder } from '../../types/movieModels';
import { ActionType, MovieDbStateAction } from '../../types/movieActions';
import { AppDispatch } from '../../store/store';
import { fetchMovies } from '../../store/moviesThunk';

interface MovieSortByProps {
    sortOrder: SortOrder;
    dispatch: AppDispatch;
}
export default ({ sortOrder, dispatch }: MovieSortByProps) => {
    const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(fetchMovies({ sortOrder: event.currentTarget.value as SortOrder}));
    };
    return (
    <label className={css.movieSortBy}>
        <span>sort by</span>
        <select value={sortOrder} onChange={changeHandler}>
            <option value={SortOrder.ByReleaseAsc}>Release Date</option>
            <option value={SortOrder.ByNameAsc}>Name</option>
            <option value={SortOrder.ByReleaseDesc}>Release Date Descending</option>
            <option value={SortOrder.ByNameDesc}>Name Descending</option>
        </select>
    </label>
)};
