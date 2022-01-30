import * as React from 'react';
import * as css from './App.module.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import ActivityDialog from './containers/ActivityDialog';
import { fetchGenres, fetchMovies } from './store/moviesThunk';
import { store } from './store/store';

function App() {
  React.useEffect(() => {
    store.dispatch(fetchMovies({}));
    store.dispatch(fetchGenres());
  })
  return (
    <div className={css.app}>
      <Header />
      <Main />
      <Footer />
      <ActivityDialog />
    </div>
  );
}

export default App;
