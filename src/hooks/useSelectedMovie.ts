import * as React from "react";
import { MovieApi } from "../Services/MovieDataFetcher";
import { Movie } from "../types/movieModels";
import useSearchParamMovieId from "./useSearchParamMovieId";

export default (): [Movie | null, (movieId?: number | undefined) => void] => {
    const [movieId, setSearchParamMovieId] = useSearchParamMovieId();
    const [stateMovie, setMovie] = React.useState<Movie | null>(null);

    React.useEffect(() => {
        let cancelled = false;
        if (movieId) {
            MovieApi.getMovie(movieId).
                then(movie => {
                    if (!cancelled) {
                        setMovie(movie)
                    }
                }).
                catch(console.log);
        }
        return () => {
            cancelled = true;
        };
    }, [movieId]);

    return [
        stateMovie,
        setSearchParamMovieId
    ]
}