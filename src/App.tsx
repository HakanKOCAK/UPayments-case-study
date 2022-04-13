import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './pages/products/Products';

function App() {
  return (
    <div className="flex flex-col bg-radial-gradient from-very-light-pink to-light-grey pt-8 px-4 md:px-10 lg:px-14 pb-2">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/products" />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
