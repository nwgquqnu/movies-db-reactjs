import * as React from "react";
import { MovieDbStateAction } from "./movieActions";
import { MovieDbState, SortOrder } from "./movieModels";

interface MovieContextObject {
    state: Readonly<MovieDbState>;
    dispatch: React.Dispatch<Readonly<MovieDbStateAction>>;
}

const defaultContextValue: MovieContextObject = {
    state: {
        moviesList: [],
        filteredMoviesList: [],
        genres: [],
        sortOrder: SortOrder.ByNameAsc,
    },
    dispatch: () => null,
};
const MovieContext = React.createContext(defaultContextValue);
export default MovieContext;