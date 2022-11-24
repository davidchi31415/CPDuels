import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlayPage from "./pages/PlayPage";
import ContactPage from "./pages/ContactPage";
import DuelPage from "./pages/DuelPage";
import Error404Page from "./pages/Error404Page";
import ScrollToTop from "./components/scrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/play" exact element={<PlayPage />} />
        <Route path="/contact" exact element={<ContactPage />} />
        <Route path="/play/:id" element={<DuelPage />} />
        <Route path="/404" exact element={<Error404Page />} />
        <Route path="*" exact element={<Error404Page />} />
      </Routes>
    </Router>
  );
}

export default App;
