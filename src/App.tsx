import * as React from 'react';
import * as css from './App.module.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <div className={css.app}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
