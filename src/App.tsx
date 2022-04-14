import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Product from './pages/products/Product';
import Products from './pages/products/Products';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-radial-gradient from-very-light-pink to-light-grey pt-8 px-4 md:px-10 lg:px-14 pb-2">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/products" />} />

        {
          /* This is the nested route which contains /products and /products/:id. 
          /products is the index(parent) 
          */
        }
        <Route path="/products" element={<Outlet />}>
          <Route path=":productId" element={<Product />} />
          <Route index element={<Products />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
