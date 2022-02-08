import { useParams } from "react-router-dom";
import { FetchMoviesParams, SearchPathParams } from "../types/movieModels";
import useSearchParamGenre from "./useSearchParamGenre";
import useSearchParamSortBy from "./useSearchParamSortBy";

export default (): FetchMoviesParams => {
    const { searchQuery: search } = useParams<SearchPathParams>();
    const [sortOrder] = useSearchParamSortBy();
    const [activeGenre] = useSearchParamGenre();
    return {
        search,
        activeGenre,
        sortOrder,
    }
};