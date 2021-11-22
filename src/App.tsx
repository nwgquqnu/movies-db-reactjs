import * as React from 'react';
import './App.css';
import SearchForm from './header/searchForm';
import GenreToggle from './main/genreToggle';
import UselessCounter from './main/uselessCounter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SearchForm placeholder="What do you want to watch?" />
      </header>
      <main className="App-main">
        <GenreToggle/>
        <UselessCounter changeBy={2} />
      </main>
    </div>
  );
}

export default App;
