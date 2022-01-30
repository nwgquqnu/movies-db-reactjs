import * as React from "react";
import { MovieDbStateAction } from "../types/movieActions";
import { Movie } from "../types/movieModels";
import { useAppDispatch, useAppSelector } from "./storeHooks";

export default (): [Readonly<Movie> | undefined, React.Dispatch<Readonly<MovieDbStateAction>>] => {
    const dispatch = useAppDispatch();
    const movie = useAppSelector(state => state.selectedMovie);
    return [movie, dispatch];
};