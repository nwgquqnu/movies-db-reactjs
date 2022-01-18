import * as React from 'react';
import * as css from './App.module.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import ActivityDialog from './containers/ActivityDialog';
import { useAppDispatch, useAppSelector } from './hooks/storeHooks';

function App() {
  const dispatch = useAppDispatch();
  const allGenres = useAppSelector(state => state.genres);
  const updateActivity = useAppSelector(state => state.currentUpdateActivity || null);
  const activityMovie = useAppSelector(state => state.movieUnderUpdateActivity || null);
  return (
    <div className={css.app}>
      <Header />
      <Main />
      <Footer />
      <ActivityDialog dispatch={dispatch} currentUpdateActivity={updateActivity} activityMovie={activityMovie} genreList={allGenres} />
    </div>
  );
}

export default App;
