import axios from 'axios';
import { API_URL } from './';
import { Category } from '../store/categories';

export function getCategories() {
  return new Promise<{ data: Category[] }>((resolve, reject) => {
    axios.get(`${API_URL}/categories`)
      .then((res) => resolve(res))
      .catch((err) => reject(err.message));
  });
}
