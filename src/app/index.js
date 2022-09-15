import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home';
import PlayPage from '../pages/Play';
import TutorialPage from '../pages/Tutorial';
import NewsPage from '../pages/News';
import ContactPage from '../pages/Contact';
import DuelPage from '../pages/Duel';
import Error404Page from '../pages/Error404';
import LoginPage from '../pages/Login';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/play" exact element={<PlayPage />} />
          <Route path="/tutorial" exact element={<TutorialPage />} />
          <Route path="/news" exact element={<NewsPage />} />
          <Route path="/contact" exact element={<ContactPage />} />
          <Route path="/play/:id" element={<DuelPage />} />
          <Route path="/login/" exact element={<LoginPage />} />
          <Route path='*' exact element={<Error404Page />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
