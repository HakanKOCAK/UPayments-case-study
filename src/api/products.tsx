import axios from 'axios';
import { API_URL } from './';
import { Product } from '../store/products';
import { FormData } from '../pages/products/CreateProduct';

export function getProducts() {
  return new Promise<{ data: Product[] }>((resolve, reject) => {
    axios.get(`${API_URL}/products`)
      .then((res) => resolve(res))
      .catch((err) => reject(err.message));
  });
}

export function newProduct(data: FormData) {
  const copyData = { ...data, price: parseFloat(data.price), developerEmail: 'hknkocak97@icloud.com' }
  return new Promise<{ data: Product }>((resolve, reject) => {
    axios.post(`${API_URL}/products`, copyData)
      .then((res) => resolve(res))
      .catch((err) => reject(err.message));
  });
}
