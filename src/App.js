import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlayPage from "./pages/PlayPage";
import ContactPage from "./pages/ContactPage";
import DuelPage from "./pages/DuelPage";
import Error404Page from "./pages/Error404Page";
import DuelNotFoundPage from "./pages/DuelNotFoundPage";
import ScrollToTop from "./components/scrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/play" exact element={<PlayPage />} />
        <Route path="/contact" exact element={<ContactPage />} />
        <Route path="/contact/report-issue" exact element={<ContactPage report={true} />} />
        <Route path="/play/:id" exact element={<DuelPage />} />
        <Route path="/noduel" exact element={<DuelNotFoundPage />} />
        <Route path="/404" exact element={<Error404Page />} />
        <Route path="*" exact element={<Error404Page />} />
      </Routes>
    </Router>
  );
}

export default App;
