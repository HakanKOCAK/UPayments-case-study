import axios from 'axios';
import { API_URL } from './';
import { Product } from '../store/products';

export function getProducts() {
  return new Promise<{ data: Product[] }>((resolve, reject) => {
    axios.get(`${API_URL}/products`)
      .then((res) => resolve(res))
      .catch((err) => reject(err.message));
  });
}
