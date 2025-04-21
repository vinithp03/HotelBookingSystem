import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddRoom from './pages/AddRoom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddRoom />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
