import React, { FormEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import Select from '../../components/Select';
import { categoriesState } from '../../store/categories';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearErrors, createProduct, onCreateSuccess, productsState } from '../../store/products';

export type FormData = {
  name: string,
  description: string,
  avatar: string,
  category: string,
  price: string
}

type FormErrors = {
  name: boolean,
  description: boolean,
  avatar: boolean,
  category: boolean,
  price: boolean
}
type FormValidator = {
  isValid: boolean,
  errors: FormErrors
};

const CreateProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { entries } = useAppSelector(categoriesState);
  const { createStatus } = useAppSelector(productsState);
  const [form, setForm] = useState<FormData>({
    name: '',
    description: '',
    avatar: '',
    category: '',
    price: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: false,
    description: false,
    avatar: false,
    category: false,
    price: false
  });

  useEffect(() => {
    if (createStatus === 'failed') { //Set erros as '' after dialog pops up
      dispatch(clearErrors());
    } else if (createStatus === 'success') { //If status is success set status back to idle and navigate to /products
      dispatch(onCreateSuccess());
      navigate('/products', { state: { from: location } });
    }
  }, [createStatus, dispatch, navigate, location]);


  const handlePriceChange = (value: any) => {
    let maskedValue: string = value;
    if (isNaN(value)) { //Check if is given value contains strings other than '.'
      maskedValue = maskedValue.replace(/[^0-9.]/g, ''); //Remove characters other than numbers and '.'
      if (maskedValue.split('.').length > 2) //Do not allow entering second '.'
        maskedValue = maskedValue.replace(/\.+$/, '');
    } else {
      //Check if floating number length is bigger than two and prevent more input
      if (maskedValue.split('.').length === 2) {
        if (maskedValue.split('.')[1].length > 2) {
          return;
        }
      }
    }

    //Check if masked values is not empty set flag to false
    if (maskedValue) setFormErrors((prev) => ({ ...prev, price: false }));

    return setForm((prev) => ({ ...prev, price: maskedValue }));
  }

  const validateForm = (): FormValidator => {
    return {
      isValid: form.name !== '' &&
        form.description !== ''
        && form.avatar !== ''
        && form.category !== ''
        && parseFloat(form.price) > 0, //Check if inputs are valid
      errors: {
        name: form.name === '',
        description: form.description === '',
        avatar: form.avatar === '',
        category: form.category === '',
        price: isNaN(parseFloat(form.price)) || parseFloat(form.price) <= 0 //Check for errors and set flags
      }
    };
  }

  const handleChange = (key: string, value: string): void => {
    //Check if value is not empty string and set validation to false.
    if (value) {
      setFormErrors((prev) => ({ ...prev, [key]: false }));
    }

    //Set form details
    return setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const formValidator = validateForm();
    e.preventDefault();
    if (formValidator.isValid && createStatus !== 'loading') { //Check if form is valid and is not submitting at the moment
      dispatch(createProduct(form));
    } else {
      //Set form error flags
      setFormErrors(formValidator.errors);
    }
  }

  return (
    <div className="flex flex-grow flex-col justify-center items-center mt-10 pb-32">
      <header className="font-semibold text-xl md:text-2xl text-gray-800 mb-6">Create Product</header>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <Input
          dataCy="name-input"
          placeholder="Product name"
          value={form.name}
          error={formErrors.name}
          onChange={(value) => handleChange('name', value)}
          extraClasses="w-64 md:w-80 lg:w-96 mb-6"
        />

        <textarea
          data-cy="description-input"
          placeholder="Description"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          className={`w-64 md:w-80 lg:w-96 mb-6 p-2 rounded-lg focus:outline-none text-sm shadow-xl ${formErrors.description ? 'border-2 border-red-500' : ''}`}
        />

        <Input
          dataCy="avatar-input"
          placeholder="Image URL"
          value={form.avatar}
          error={formErrors.avatar}
          onChange={(value) => handleChange('avatar', value)}
          extraClasses="w-64 md:w-80 lg:w-96 mb-6"
        />

        <Select
          dataCy="category-input"
          extraClasses="w-64 md:w-80 lg:w-96 mb-6"
          placeholder="Category"
          value={form.category}
          error={formErrors.category}
          onChange={(value) => handleChange('category', value)}
          options={entries}
        />

        <Input
          dataCy="price-input"
          placeholder="Price"
          value={form.price}
          error={formErrors.price}
          onChange={(value) => handlePriceChange(value)}
          extraClasses="w-64 md:w-80 lg:w-96 mb-6"
        />

        {
          createStatus === 'loading' ? (
            <div className="w-64 md:w-80 lg:w-96 mb-6">
              <Loading />
            </div>
          ) : (
            <button
              type="submit"
              className="w-64 md:w-80 lg:w-96 mb-6 bg-white rounded-md h-10 focus:outline-none text-sm shadow-xl hover:bg-gray-300 duration-75"
            >
              Submit
            </button>
          )
        }
      </form>
    </div>
  );
}

export default CreateProduct;
