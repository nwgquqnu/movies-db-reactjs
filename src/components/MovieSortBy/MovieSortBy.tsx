import * as React from 'react';
import { SortOrder } from '../../types/movieModels';
import * as css from './MovieSortBy.module.scss';

interface MovieSortByProps {
    sortOrder: SortOrder;
    selectedHandler: (selectedSortOrder: SortOrder) => void;
}
export default ({ sortOrder, selectedHandler }: MovieSortByProps) => {
    const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        selectedHandler(event.currentTarget.value as SortOrder);
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
