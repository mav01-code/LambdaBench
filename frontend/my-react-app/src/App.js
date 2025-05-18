import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import BenchmarkForm from './BenchmarkForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/get-started" element={<BenchmarkForm />} />
      </Routes>
    </Router>
  );
}

export default App;

