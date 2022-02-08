import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { copyAndRemoveKey } from "../Services/utils";

const MOVIE_PARAM_NAME = "movie";

function setSelectedMovie(searchParams: URLSearchParams, setSearchParams: (nextInit: URLSearchParamsInit) => void): (movieId?: number) => void {
    return (movieId?: number) => {
        const newParams = copyAndRemoveKey(searchParams, MOVIE_PARAM_NAME);
        if (movieId) {
            newParams.append(MOVIE_PARAM_NAME, String(movieId));
        }
        setSearchParams(newParams);
    }
}

export default (): [number | undefined, (movieId?: number) => void] => {
    const [searchParams, setSearchParams] = useSearchParams();
    const movieId = Number(searchParams.get(MOVIE_PARAM_NAME));

    return [
        Number.isNaN(movieId) ? undefined : movieId,
        setSelectedMovie(searchParams, setSearchParams)
    ]
};