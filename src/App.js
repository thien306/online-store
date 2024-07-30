import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListOrder from './components/ListOrder';
import AddOrder from './components/AddOrder';

const App = () => (
    <Router>
      <Routes>
        <Route path="/" element={<ListOrder />} />
        <Route path="/add-order" element={<AddOrder />} />
      </Routes>
    </Router>
);

export default App;