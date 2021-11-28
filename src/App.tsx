import * as React from 'react';
import * as appStyles from './App.module.css';
import SearchForm from './header/SearchForm';
import GenreToggle from './main/GenreToggle';
import UselessCounter from './main/UselessCounter';

function App() {
  return (
    <div className={appStyles.app}>
      <header className={appStyles.appHeader}>
        <SearchForm placeholder="What do you want to watch?" />
      </header>
      <main className={appStyles.appMain}>
        <GenreToggle/>
        <UselessCounter changeBy={2} />
      </main>
    </div>
  );
}

export default App;
