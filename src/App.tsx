import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import Product from './pages/products/Product';
import Products from './pages/products/Products';
import { useAppSelector } from './store/hooks';
import { isModalOpen } from './store/modal';

function App() {
  const isOpen = useAppSelector(isModalOpen);

  return (
    <div className="flex min-h-screen bg-radial-gradient from-very-light-pink to-light-grey pt-8 px-4 md:px-10 lg:px-14 pb-2 z-0">
      <div className={`flex flex-col flex-grow ${isOpen ? 'blur-xs' : ''}`}>
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
      <Modal />
    </div>
  );
}

export default App;
