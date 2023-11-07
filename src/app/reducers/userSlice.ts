import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { customFetch } from '../../service/apiService';

const apiUrl = process.env.REACT_APP_API_URL;

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  __v: number;
  role: string;
  favorites: string[];
  settings: {
    email: boolean;
  }
}

interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};

export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No session');
    }

    const response = await customFetch(`/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to fetch user profile');
    }

    const data = await response.json();

    return data;
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({ username, email, password, settings }: { username: string; email: string; password: string; settings?: { language: string, email: boolean } }, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No session');
    }

    const response = await customFetch(`/users/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        username,
        email,
        password,
        settings,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to update user profile');
    }

    if (response.headers.get('content-length') === '0') {
      return {};
    } else {
      const data = await response.json();
      return data;
    }
  }
);

export const patchUserProfile = createAsyncThunk(
  'user/patchUserProfile',
  async (update: { email?: string; username?: string; password?: string; settings?: { language?: string, email?: boolean } }, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No session');
    }

    const response = await customFetch(`/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(update),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to patch user profile');
    }

    const data = await response.json();

    return data;
  }
);

export const getUserPublicInfo = createAsyncThunk(
  'user/fetchPublicInfo',
  async (userId: string, thunkAPI) => {
    try {
      const response = await customFetch(`/users/${userId}/public`, {
        method: 'GET',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch user public info');
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      throw new Error('Failed to fetch user public info');
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserPublicInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserPublicInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(getUserPublicInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(patchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(patchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(patchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
      
  },
});

export default userSlice.reducer;