import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import Select from '../../components/Select';
import { categoriesState } from '../../store/categories';
import { useAppSelector } from '../../store/hooks';
import { Product, productsState } from '../../store/products';

const Products: React.FC = () => {
  const [filterByName, setFilterByName] = useState('');
  const [filterByCategory, setFilterByCategory] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const { entries, status, error: errorFecthingProducts } = useAppSelector(productsState);
  const { error: errorFecthingCategories, entries: categories } = useAppSelector(categoriesState);
  const [toDispay, setToDisplay] = useState<Product[]>([]);

  useEffect(() => {
    const copyEntries = [...entries];
    setToDisplay(copyEntries.filter((e) => {
      return e.name.toLowerCase().includes(filterByName.toLocaleLowerCase()) && //Filter by name 
        (!filterByCategory ? true : e.category === filterByCategory) //Check if category filter active and apply.
    }));
  }, [filterByName, filterByCategory, entries]);

  //Check if fetching products
  if (status === 'loading') {
    return (
      <div className="flex flex-grow items-center justify-center">
        <Loading />
      </div>
    );
  }

  //Check if there is an error related with api endpoint or internet connection
  if (errorFecthingProducts || errorFecthingCategories) {
    return (
      <div className="flex flex-grow items-center justify-center">
        <header className="text-bold text-gray-600 text-2xl text-center">
          Something went wrong. Please refresh the page. If the problem continues.....
        </header>
      </div>
    );
  }

  return (
    <div className="flex flex-grow mt-8 flex-col">
      <div className="flex flex-row w-full h-12 justify-between items-center">
        <Input
          dataCy="name-filter-input"
          disabled={entries.length === 0} //disable input if there are no products in the store atm.
          placeholder="Apple Watch, Samsung S21, Macbook Pro, Iphone11"
          value={filterByName}
          onChange={(value) => setFilterByName(value)}
        />
        <Select
          dataCy="category-filter-input"
          disabled={entries.length === 0} //disable select if there are no products in the store atm.
          placeholder="Category"
          onChange={(value) => setFilterByCategory(value)}
          value={filterByCategory}
          options={categories}
        />
      </div>
      <div className="flex mt-7 md:mt-9 justify-center h-4/6">
        {toDispay.length > 0 ? ( //Check if products exists in the store or filter active
          <div className="flex flex-row flex-wrap max-w-4xl justify-center">
            {toDispay.map((e) => (
              <div
                key={e.id}
                className="flex flex-col w-44 h-60 mx-3 mt-3 mb-12 bg-white rounded-lg duration-150 group group-hover:cursor-pointer hover:scale-110 "
                onClick={() => navigate(`/products/${e.id}`, { state: { details: { ...e }, from: location } })} //Navigate to /:id product
              >
                <div className="w-full h-full p-1 group-hover:-translate-y-10 duration-150">
                  <div className="flex w-full justify-center items-center mb-12 group-hover:-rotate-12 duration-150">
                    <img alt={`img-${e.id}`} src={e.avatar} className="h-24" />
                  </div>
                  <p className="text-sm md:text-base text-center font-semibold mt-2 group-hover:-translate-x-4 duration-100">{e.name.slice(0, 16)}</p>
                  <p className="text-sm md:text-base text-center font-bold mt-1 group-hover:-translate-x-3 duration-100">{`$${e.price.toLocaleString('en-us', { minimumFractionDigits: 2 })}`}</p>
                  <button className="font-semibold bg-gray-300 rounded-md w-24 opacity-0 p-2 ml-4 mt-6 delay-0 duration-75 group-hover:opacity-100 group-hover:delay-150 group-hover:duration-500 hover:bg-gray-400">Buy now</button>
                </div>

              </div>
            ))}
          </div>)
          : (
            <header className="text-bold text-gray-600 text-xl">
              {entries.length === 0 ? 'Currently there are no products in the store.' : 'There are no products with given filters.'}
            </header>
          )
        }

      </div>
      <img
        alt="add-product"
        src="add-circle.png"
        data-cy="add-product-btn"
        className="fixed bottom-10 w-14 right-0 md:right-14 delay-150 hover:scale-125 duration-300 hover:cursor-pointer"
        onClick={() => navigate('/products/new', { state: { from: location } })}
      />
    </div>
  );
}

export default Products;
