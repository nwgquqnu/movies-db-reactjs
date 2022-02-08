import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import * as css from './App.module.scss';
import Footer from './components/Footer';
import MainSearch from './components/MainSearch';

function App() {
  return (
    <div className={css.app}>
      <Routes>
        <Route path="/" element={<Navigate to="/search" replace />} />
        <Route path="search" element={<MainSearch/>}>
          <Route path=":searchQuery" element={<MainSearch/>} />
        </Route>
        <Route path="*" element={"Page Not Found"} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
