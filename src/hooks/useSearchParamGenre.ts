import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { copyAndRemoveKey } from "../Services/utils";
import { AppDispatch } from "../store/store";
import { useAppDispatch } from "./storeHooks";

const GENRE_PARAM_NAME = "genre";

function setSelectedGenre(searchParams: URLSearchParams, setSearchParams: (nextInit: URLSearchParamsInit) => void, dispatch: AppDispatch): (genre: string | null) => void {
    return (genre: string | null) => {
        const newParams = copyAndRemoveKey(searchParams, GENRE_PARAM_NAME);
        if (genre) {
            newParams.append(GENRE_PARAM_NAME, String(genre));
        }
        setSearchParams(newParams);
    }
}

export default (): [string | null, (genre: string | null) => void] => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const genre = searchParams.get(GENRE_PARAM_NAME);

    return [
        genre,
        setSelectedGenre(searchParams, setSearchParams, dispatch)
    ]
};