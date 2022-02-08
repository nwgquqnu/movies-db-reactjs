import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { copyAndRemoveKey, enumFromStringValue } from "../Services/utils";
import { AppDispatch } from "../store/store";
import { DEFAULT_SORT_ORDER, SortOrder } from "../types/movieModels";
import { useAppDispatch } from "./storeHooks";

const SORT_BY_PARAM_NAME = "sortBy";

function setSelectedSortBy(searchParams: URLSearchParams, setSearchParams: (nextInit: URLSearchParamsInit) => void, dispatch: AppDispatch): (sortBy?: SortOrder) => void {
    return (sortBy?: SortOrder) => {
        const newParams = copyAndRemoveKey(searchParams, SORT_BY_PARAM_NAME);
        if (sortBy) {
            newParams.append(SORT_BY_PARAM_NAME, String(sortBy));
        }
        setSearchParams(newParams);
    }
}

export default (): [SortOrder, (sortBy?: SortOrder) => void] => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = enumFromStringValue(SortOrder, searchParams.get(SORT_BY_PARAM_NAME));
    const dispatch = useAppDispatch();

    return [
        sortBy || DEFAULT_SORT_ORDER,
        setSelectedSortBy(searchParams, setSearchParams, dispatch)
    ]
};