import * as React from 'react';
import { useAppSelector } from '../../hooks/storeHooks';
import { MovieDbStateAction } from '../../types/movieActions';
import { Movie } from '../../types/movieModels';
import MovieDetailsHeader from '../MovieDetailsHeader';
import SearchFormHeader from '../SearchFormHeader';


export default () => {
    const selectedMovie = useAppSelector(state => state.selectedMovie);

    if (selectedMovie) {
        return <MovieDetailsHeader />;
    }
    return <SearchFormHeader />;
};
