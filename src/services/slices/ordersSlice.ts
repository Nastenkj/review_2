import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '../../utils/burger-api';
import { TOrder, TOrdersData } from '../../utils/types';

export interface OrdersState {
  feedOrders: TOrder[];
  userOrders: TOrder[];
  feedData: TOrdersData | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  feedOrders: [],
  userOrders: [],
  feedData: null,
  loading: false,
  error: null,
};

export const fetchFeedOrders = createAsyncThunk<TOrdersData, void, { rejectValue: string }>(
  'orders/fetchFeedOrders',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFeedsApi();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка получения ленты заказов');
    }
  }
);

export const fetchUserOrders = createAsyncThunk<TOrder[], void, { rejectValue: string }>(
  'orders/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка получения истории заказов');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addFeedOrder: (state, action: PayloadAction<TOrder>) => {
      state.feedOrders.unshift(action.payload);
      if (state.feedData) {
        state.feedData.total += 1;
        state.feedData.totalToday += 1;
      }
    },
    addUserOrder: (state, action: PayloadAction<TOrder>) => {
      state.userOrders.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedOrders.fulfilled, (state, action: PayloadAction<TOrdersData>) => {
        state.loading = false;
        state.feedOrders = action.payload.orders;
        state.feedData = action.payload;
      })
      .addCase(fetchFeedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка получения ленты заказов';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action: PayloadAction<TOrder[]>) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка получения истории заказов';
      });
  },
});

export const { addFeedOrder, addUserOrder } = ordersSlice.actions;
export default ordersSlice.reducer; 