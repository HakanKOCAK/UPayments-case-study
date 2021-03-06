import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProducts, newProduct, removeProduct } from '../api/products';
import { FormData } from '../pages/products/CreateProduct';
import { RootState } from './';

export interface Product {
  createdAt: number,
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

      // I had to iterate each product entry to convert them to desired state as stated in the demo pdf.
      // Normally I would return response.data directly however, other developers started to post products with
      // given types:
      //  product: {
      //    name: ['example'],
      //    price: ['40'],
      //    .
      //    .
      //    .
      //  } and it caused error at line 23 in /pages/Products.txs which is
      // return e.name.toLowerCase().includes(filterByName.toLocaleLowerCase())
      // and
      // line 81 did not work as expected which is 
      // e.price.toLocaleString('en-us', { minimumFractionDigits: 2 }
      return response.data.map((item) => ({
        name: (item.name || '').toString(),
        createdAt: item.createdAt,
        avatar: (item.avatar || '').toString(),
        developerEmail: (item.developerEmail || '').toString(),
        price: typeof item.price !== 'number' ? parseFloat(item.price || '0') : (item.price || 0),
        id: (item.id || '').toString(),
        category: (item.category || '').toString(),
        description: (item.description || '').toString()
      }));

      //return response.data;
    } catch (error) {
      //This to send error as payload if promise status finalized as rejected.
      console.log(error)
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
