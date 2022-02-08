import * as React from 'react';
import useSearchParamMovieId from '../../hooks/useSearchParamMovieId';
import MovieDetailsHeader from '../MovieDetailsHeader';
import SearchFormHeader from '../SearchFormHeader';


export default () => {
    const [movieId] = useSearchParamMovieId();
    if (movieId) {
        return <MovieDetailsHeader />;
    }
    return <SearchFormHeader />;
};
