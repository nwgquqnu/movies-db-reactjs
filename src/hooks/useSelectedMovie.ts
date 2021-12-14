import * as React from "react";
import { MovieDbStateAction } from "../types/movieActions";
import MovieContext from "../types/movieContext";
import { Movie } from "../types/movieModels";

export default (): [Readonly<Movie> | undefined, React.Dispatch<Readonly<MovieDbStateAction>>] => {
    const contextObj = React.useContext(MovieContext);
    const movie = contextObj.state.selectedMovie;
    const dispatch = contextObj.dispatch;
    return [movie, dispatch];
};