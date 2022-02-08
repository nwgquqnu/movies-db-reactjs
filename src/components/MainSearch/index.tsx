import * as React from "react";
import ActivityDialog from "../../containers/ActivityDialog";
import useFetchParams from "../../hooks/useFetchParams";
import { fetchGenres, fetchMovies } from "../../store/moviesThunk";
import { store } from "../../store/store";
import Header from "../Header";
import Main from "../Main";

export default function MainSearch() {
    const params = useFetchParams();
    React.useEffect(() => {
      store.dispatch(fetchMovies(params));
      store.dispatch(fetchGenres());
    }, [params.activeGenre, params.search, params.sortOrder]);
  
    return (
      <>
        <Header />
        <Main />
        <ActivityDialog />
      </>
    );
  }