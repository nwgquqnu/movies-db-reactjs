import * as React from 'react';
import * as css from './App.module.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import ActivityDialog from './containers/ActivityDialog';
import MovieDataFetcher from './Services/MovieDataFetcher';
import MovieDbStateManager from './Services/StateManager';
import MovieContext from './types/movieContext';

function App() {
  const initialData = React.useMemo(() => MovieDataFetcher.fetchMovieData(), []);
  const allGenres = React.useMemo(() => MovieDataFetcher.fetchGenreList(), []);
  const [state, dispatch] = React.useReducer(MovieDbStateManager.reducer, initialData, MovieDbStateManager.initState);
  const updateActivity = state.currentUpdateActivity || null;
  const activityMovie = state.movieUnderUpdateActivity || null;
  return (
    <div className={css.app}>
      <MovieContext.Provider value={{ state, dispatch }}>
        <Header selectedMovie={state.selectedMovie} dispatch={dispatch} />
        <Main moviesList={state.filteredMoviesList} sortOrder={state.sortOrder} dispatch={dispatch} genres={state.genres} activeGenre={state.activeGenre} />
        <Footer />
        <ActivityDialog dispatch={dispatch} currentUpdateActivity={updateActivity} activityMovie={activityMovie} genreList={allGenres} />
      </MovieContext.Provider>
    </div>
  );
}

export default App;
