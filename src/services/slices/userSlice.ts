import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUserApi, updateUserApi, loginUserApi, registerUserApi, logoutApi, TRegisterData, TLoginData } from '../../utils/burger-api';
import { TUser } from '../../utils/types';

export interface UserState {
  user: TUser | null;
  loading: boolean;
  error: string | null;
  updateSuccess: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  updateSuccess: false,
};

export const fetchUser = createAsyncThunk<TUser, void, { rejectValue: string }>(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserApi();
      return res.user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка получения пользователя');
    }
  }
);

export const updateUser = createAsyncThunk<TUser, Partial<TUser>, { rejectValue: string }>(
  'user/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await updateUserApi(userData);
      return res.user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка обновления пользователя');
    }
  }
);

export const loginUser = createAsyncThunk<TUser, TLoginData, { rejectValue: string }>(
  'user/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const res = await loginUserApi(loginData);
      return res.user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка авторизации');
    }
  }
);

export const registerUser = createAsyncThunk<TUser, TRegisterData, { rejectValue: string }>(
  'user/registerUser',
  async (registerData, { rejectWithValue }) => {
    try {
      const res = await registerUserApi(registerData);
      return res.user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка регистрации');
    }
  }
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка выхода');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUpdateSuccess(state) {
      state.updateSuccess = false;
    },
    clearUser(state) {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка получения пользователя';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.loading = false;
        state.user = action.payload;
        state.updateSuccess = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка обновления пользователя';
        state.updateSuccess = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка авторизации';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка регистрации';
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка выхода';
      });
  },
});

export const { clearUpdateSuccess, clearUser } = userSlice.actions;
export default userSlice.reducer; 