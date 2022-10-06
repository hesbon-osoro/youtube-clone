import React from 'react';
import { Home, Search, Watch } from './pages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
