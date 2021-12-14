import * as React from 'react';
import { MovieDbStateAction } from '../../types/movieActions';
import { Movie } from '../../types/movieModels';
import MovieDetailsHeader from '../MovieDetailsHeader';
import SearchFormHeader from '../SearchFormHeader';

interface HeaderProps {
    selectedMovie?: Movie;
    dispatch: React.Dispatch<MovieDbStateAction>;
}

export default (props: HeaderProps) => {
    if (props.selectedMovie) {
        return <MovieDetailsHeader />;
    }
    return <SearchFormHeader dispatch={props.dispatch} />;
};
