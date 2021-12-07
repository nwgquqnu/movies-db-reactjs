import * as React from 'react';
import * as css from './App.module.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import MovieDbStateManager from './Services/StateManager';
import MovieDataFetcher from './Services/MovieDataFetcher';
import Modal from './containers/Modal';
import AddMovieForm from './containers/AddMovieForm';
import ActivityDialog from './containers/ActivityDialog';

function App() {
  const initialData = React.useMemo(() => MovieDataFetcher.fetchMovieData(), []);
  const genres = React.useMemo(() => MovieDataFetcher.fetchGenreList(), []);
  const [state, dispatch] = React.useReducer(MovieDbStateManager.reducer, initialData, MovieDbStateManager.initState);
  const updateActivity = state.currentUpdateActivity || null;
  const activityMovie = state.movieUnderUpdateActivity || null;
  return (
    <div className={css.app}>
      <Header selectedMovie={state.selectedMovie} dispatch={dispatch}/>
      <Main moviesList={state.moviesList} sortOrder={state.sortOrder} dispatch={dispatch}/>
      <Footer />
      <ActivityDialog dispatch={dispatch} currentUpdateActivity={updateActivity} activityMovie={activityMovie} genreList={genres}/>
    </div>
  );
}

export default App;
