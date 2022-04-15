import React, { FormEvent, useState } from 'react'
import Input from '../../components/Input';
import Select from '../../components/Select';

const CreateProduct: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const handlePriceChange = (value: any) => {
    let maskedValue: string = value;
    if (isNaN(value)) { //Check if is given value contains strings other than '.'
      maskedValue = maskedValue.replace(/[^0-9.]/g, ''); //Remove characters other than numbers and '.'
      if (maskedValue.split('.').length > 2) //Do not allow entering second '.'
        maskedValue = maskedValue.replace(/\.+$/, '');
    }
    return setPrice(maskedValue);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <div className="flex flex-grow flex-col justify-center items-center mt-10 pb-32">
      <header className="font-semibold text-xl md:text-2xl text-gray-800 mb-6">Create Product</header>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <Input
          placeholder="Product name"
          value={name}
          onChange={(value) => setName(value)}
          extraClasses="w-64 md:w-80 lg:w-96 mb-6"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-64 md:w-80 lg:w-96 mb-6 p-2 rounded-lg focus:outline-none text-sm shadow-xl"
        />

        <Input
          placeholder="Image URL"
          value={avatar}
          onChange={(value) => setAvatar(value)}
          extraClasses="w-64 md:w-80 lg:w-96 mb-6"
        />

        <Select
          extraClasses="w-64 md:w-80 lg:w-96 mb-6"
          placeholder="Category"
          value={category}
          onChange={(value) => setCategory(value)}
        />

        <Input
          placeholder="Price"
          value={price}
          onChange={(value) => handlePriceChange(value)}
          extraClasses="w-64 md:w-80 lg:w-96 mb-6"
        />

        <button
          type="submit"
          className="w-64 md:w-80 lg:w-96 mb-6 bg-white rounded-md h-10 focus:outline-none text-sm shadow-xl hover:bg-gray-300 duration-75"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
