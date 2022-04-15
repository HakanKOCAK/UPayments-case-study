import React, { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import CreateProduct from './pages/products/CreateProduct';
import Product from './pages/products/Product';
import Products from './pages/products/Products';
import { categoriesState, fetchCategories } from './store/categories';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { isModalOpen, openModal } from './store/modal';
import { fetchProducts, productsState } from './store/products';

function App() {
  const isOpen = useAppSelector(isModalOpen);
  const dispatch = useAppDispatch();
  const { error: productsError } = useAppSelector(productsState);
  const { error: categoriesFetchingError } = useAppSelector(categoriesState);

  useEffect(() => {
    //Fetch products and categories on load.
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    //Check if an error occured while fetching the products or categories
    if (productsError || categoriesFetchingError) {
      dispatch(openModal({
        title: 'Error',
        text: `${productsError} \n${categoriesFetchingError}`, //Concatenate error messages
        isConfirmButtonActive: false,
        onConfirm: () => null,
        confirmButtonText: ''
      }));
    }
  }, [productsError, categoriesFetchingError, dispatch])
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
            <Route path="new" element={<CreateProduct />} />
            <Route index element={<Products />} />
          </Route>
        </Routes>
      </div>
      <Modal />
    </div>
  );
}

export default App;
