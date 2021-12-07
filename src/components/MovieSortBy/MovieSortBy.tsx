import * as React from 'react';
import * as css from './MovieSortBy.module.scss';
import { SortOrder } from '../../types/movieModels';
import { ActionType, MovieDbStateAction } from '../../types/movieActions';

interface MovieSortByProps {
    sortOrder: SortOrder;
    dispatch: React.Dispatch<MovieDbStateAction>;
}
export default ({ sortOrder, dispatch }: MovieSortByProps) => {
    const changeHandler = React.useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch({ type: ActionType.SortMovies, payload: event.currentTarget.value as SortOrder});
        },
        [dispatch],
    );
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
