import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TConstructorIngredient, TOrder } from '../../utils/types';

export interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk<TOrder, void, { rejectValue: string }>(
  'constructor/createOrder',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any;
      const { bun, ingredients } = state.constructor;
      
      if (!bun) {
        return rejectWithValue('Добавьте булку');
      }
      
      const orderData = [bun._id, ...ingredients.map((item: TConstructorIngredient) => item._id), bun._id];
      const response = await orderBurgerApi(orderData);
      return response.order;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка создания заказа');
    }
  }
);

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.ingredients.splice(index, 1);
      }
    },
    moveIngredient: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedItem = state.ingredients[dragIndex];
      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, draggedItem);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.orderModalData = null;
    },
    closeOrderModal: (state) => {
      state.orderModalData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<TOrder>) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.payload || 'Ошибка создания заказа';
      });
  },
});

export const { 
  addIngredient, 
  removeIngredient, 
  moveIngredient, 
  clearConstructor, 
  closeOrderModal 
} = constructorSlice.actions;

export default constructorSlice.reducer; 