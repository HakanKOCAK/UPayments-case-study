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
    return <Loading />
  }

  //Check if there is an error related with api endpoint or internet connection
  if (errorFecthingProducts || errorFecthingCategories) {
    return (
      <div className="flex flex-grow items-center justify-center">
        <header className="text-bold text-gray-600 text-2xl">
          Something went wrong. Please refresh the page. If the problem continues.....
        </header>
      </div>
    );
  }

  return (
    <div className="flex flex-grow mt-8 flex-col">
      <div className="flex flex-row w-full h-12 justify-between items-center">
        <Input
          disabled={entries.length === 0} //disable input if there are no products in the store atm.
          placeholder="Apple Watch, Samsung S21, Macbook Pro, Iphone11"
          value={filterByName}
          onChange={(value) => setFilterByName(value)}
        />
        <Select
          disabled={entries.length === 0} //disable select if there are no products in the store atm.
          placeholder="Category"
          onChange={(value) => setFilterByCategory(value)}
          value={filterByCategory}
          options={categories}
        />
      </div>
      <div className="flex mt-7 md:mt-9 justify-center h-4/6">
        {toDispay.length > 0 ? ( //Check if products exists in the store or filter active
          <div className="flex flex-row flex-wrap max-w-2xl justify-center">
            {toDispay.map((e) => (
              <div
                key={e.id}
                className="flex flex-col p-1 w-36 h-60 mx-3 my-3 hover:scale-110 duration-150 hover:cursor-pointer"
                onClick={() => navigate(`/products/${e.id}`, { state: { details: { ...e }, from: location } })} //Navigate to /:id product
              >
                <div className="flex w-full justify-center bg-white rounded-lg h-full items-center">
                  <img alt={`img-${e.id}`} src={e.avatar} className="h-24" />
                </div>
                <p className="text-sm md:text-base font-semibold mt-2 mx-1 truncate h-9">{e.name}</p>
                <p className="text-sm md:text-base text-center font-bold mt-1">{`$${e.price}`}</p>
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
        className="fixed bottom-10 w-14 right-0 md:right-14 delay-150 hover:scale-125 duration-300 hover:cursor-pointer"
        onClick={() => navigate('/products/new', { state: { from: location } })}
      />
    </div>
  );
}

export default Products;
