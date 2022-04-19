import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="bg-white rounded-lg shadow-xl px-4 py-3 flex justify-between items-center">
      <header
        className="italic font-semibold text-gray-600 text-lg md:text-2xl hover:cursor-pointer"
        onClick={() => navigate('/products', { state: { from: location } })}
      >
        UPayments Store
      </header>
      {/* Since registration is not needed for this demo I will comment out the Register text below. 
      Simply remove comment to display it again/
      <header className="italic font-semibold text-gray-600 text-lg md:text-2xl">Register</header> */}
    </div>
  );
}

export default Navbar;
