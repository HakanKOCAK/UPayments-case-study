import React, { useState } from 'react'
import Input from '../../components/Input';
import Select from '../../components/Select';

const mockProductList = [
  {
    "createdAt": "2022-04-13T18:12:13.814Z",
    "name": "Product 1",
    "avatar": "iphone.png",
    "id": "1",
    "price": 48,
    "category": "electronics",
    "description": "What an awesome description",
    "developerEmail": "upayments@casestudy.com"
  },
  {
    "createdAt": "2022-04-13T18:14:39.131Z",
    "name": "elsa",
    "avatar": "iphone.png",
    "id": "2",
    "price": 100,
    "category": "What an awesome description 2",
    "description": "sdsad",
    "developerEmail": "upayments@casestudy.com"
  },
  {

    "createdAt": "2022-04-13T18:15:32.327Z",
    "name": "maria",
    "avatar": "iphone.png",
    "id": "3",
    "price": 98,
    "category": "accessories",
    "description": "What an awesome description 3",
    "developerEmail": "upayments@casestudy.com"
  },
  {
    "createdAt": "2022-04-13T18:12:13.814Z",
    "name": "Product 1",
    "avatar": "iphone.png",
    "id": "4",
    "price": 48,
    "category": "electronics",
    "description": "What an awesome description",
    "developerEmail": "upayments@casestudy.com"
  },
  {
    "createdAt": "2022-04-13T18:14:39.131Z",
    "name": "elsa",
    "avatar": "iphone.png",
    "id": "5",
    "price": 100,
    "category": "What an awesome description 2",
    "description": "sdsad",
    "developerEmail": "upayments@casestudy.com"
  },
  {

    "createdAt": "2022-04-13T18:15:32.327Z",
    "name": "maria",
    "avatar": "iphone.png",
    "id": "6",
    "price": 98,
    "category": "accessories",
    "description": "What an awesome description 3",
    "developerEmail": "upayments@casestudy.com"
  },
  {
    "createdAt": "2022-04-13T18:12:13.814Z",
    "name": "Product 1",
    "avatar": "iphone.png",
    "id": "7",
    "price": 48,
    "category": "electronics",
    "description": "What an awesome description",
    "developerEmail": "upayments@casestudy.com"
  },
  {
    "createdAt": "2022-04-13T18:14:39.131Z",
    "name": "elsa",
    "avatar": "iphone.png",
    "id": "8",
    "price": 100,
    "category": "What an awesome description 2",
    "description": "sdsad",
    "developerEmail": "upayments@casestudy.com"
  },
  {

    "createdAt": "2022-04-13T18:15:32.327Z",
    "name": "maria",
    "avatar": "iphone.png",
    "id": "9",
    "price": 98,
    "category": "accessories",
    "description": "What an awesome description 3",
    "developerEmail": "upayments@casestudy.com"
  },
]
const Products = () => {
  const [filterByName, setFilterByName] = useState('');
  const [filterByCategory, setFilterByCategory] = useState('');
  return (
    <div className="flex flex-grow mt-8 flex-col">
      <div className="flex flex-row w-full h-12 justify-between items-center">
        <Input
          placeholder="Apple Watch, Samsung S21, Macbook Pro, Iphone11"
          value={filterByName}
          onChange={(value) => setFilterByName(value)}
        />
        <Select
          placeholder="Category"
          onChange={(value) => setFilterByCategory(value)}
          value={filterByCategory}
        />
      </div>
      <div className="flex mt-7 md:mt-9 justify-center h-4/6">
        <div className="flex flex-row flex-wrap max-w-2xl justify-center">
          {mockProductList.map((e) => (
            <div key={e.id} className="flex flex-col p-1 w-36 h-60 mx-3 my-3 hover:scale-110 duration-150 hover:cursor-pointer">
              <div className="flex w-full justify-center bg-white rounded-lg h-full items-center">
                <img alt={`img-${e.id}`} src={e.avatar} className="h-24" />
              </div>
              <p className="text-sm md:text-base font-semibold mt-2 mx-1">{e.name}</p>
              <p className="text-sm md:text-base text-center font-bold mt-1">{`$${e.price}`}</p>
            </div>
          ))}
        </div>
      </div>
      <img
        alt="add-product"
        src="add-circle.png"
        className="fixed bottom-10 w-14 right-0 md:right-14 delay-150 hover:scale-125 duration-300 hover:cursor-pointer"
      />
    </div>
  );
}

export default Products;
