import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCategories } from '../api/category';
import { RootState } from './';

export interface Category {
  createdAt: string,
  name: string,
  id: string
};

interface CategoryState {
  entries: Category[],
  status: 'idle' | 'loading' | 'failed';
  error: string
};

const initialState: CategoryState = {
  entries: [],
  status: 'idle',
  error: ''
};

//Reject value can be configured to handle errors in a desired way
//For the demo purposes I set it as string.
export const fetchCategories = createAsyncThunk<Category[], void, { rejectValue: string }>(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCategories();
      return response.data;
    } catch (error) {
      //This to send error as payload if promise status finalized as rejected.

      //Normally it should return error directly or in an improved way but for the demo I will return a string.
      // return rejectWithValue(error);
      return rejectWithValue('Error fetching categories');
    }
  }
);

export const categorySlice = createSlice({
  name: 'products',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => { //Sets status to loading while fetching
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => { //Sets details and status if fullfilled
        state.status = 'idle';
        state.entries = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => { //Sets error(if exists) and status if rejected
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        }
      })
  }
});

export const categoriesState = (state: RootState) => state.categories;

export default categorySlice.reducer;

