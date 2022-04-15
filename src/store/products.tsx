import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProducts, newProduct, removeProduct } from '../api/products';
import { FormData } from '../pages/products/CreateProduct';
import { RootState } from './';

export interface Product {
  createdAt: string,
  name: string,
  avatar: string,
  id: string,
  description: string,
  price: number,
  category: string,
  developerEmail: string
};

interface ProductsState {
  entries: Product[],
  status: 'idle' | 'loading' | 'failed';
  createStatus: 'idle' | 'loading' | 'success' | 'failed',
  deleteStatus: 'idle' | 'loading' | 'success' | 'failed'
  error: string
};

const initialState: ProductsState = {
  entries: [],
  status: 'idle',
  createStatus: 'idle',
  deleteStatus: 'idle',
  error: ''
};

//Reject value can be configured to handle errors in a desired way
//For the demo purposes I set it as string.
export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProducts();
      return response.data;
    } catch (error) {
      //This to send error as payload if promise status finalized as rejected.

      //Normally it should return error directly or in an improved way but for the demo I will return a string.
      // return rejectWithValue(error);
      return rejectWithValue('Error fetching products');
    }
  }
);

export const createProduct = createAsyncThunk<Product, FormData, { rejectValue: string }>(
  'products/createProduct',
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await newProduct(data);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error creating product');
    }
  }
);

export const deleteProduct = createAsyncThunk<Product, string, { rejectValue: string }>(
  'products/deleteProduct',
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await removeProduct(data);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error deleting product');
    }
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = '';
    },
    onCreateSuccess: (state) => {
      state.createStatus = 'idle';
    },
    onDeleteSuccess: (state) => {
      state.deleteStatus = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'idle';
        state.entries = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(createProduct.pending, (state) => {
        state.createStatus = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.createStatus = 'success';
        const copyEntries = [...state.entries];
        copyEntries.push(action.payload);
        state.entries = copyEntries;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createStatus = 'failed';
        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(deleteProduct.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.deleteStatus = 'success';
        const copyEntries = [...state.entries].filter((entry) => entry.id !== action.payload.id);
        state.entries = copyEntries;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        if (action.payload) {
          state.error = action.payload;
        }
      })
  }
});

export const productsState = (state: RootState) => state.products;
export const { clearErrors, onCreateSuccess, onDeleteSuccess } = productSlice.actions;

export default productSlice.reducer;
