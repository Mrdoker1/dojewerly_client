import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MessageType } from '../../components/Messages/messageTypes';
import { customFetch } from '../../service/apiService';

const apiUrl = process.env.REACT_APP_API_URL;

class AppError extends Error {
  type: MessageType;

  constructor(message: string, type: MessageType) {
    super(message);
    this.type = type;
  }
}

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, username, password }: { email: string; username: string; password: string; }, thunkAPI) => {
    const response = await customFetch(`/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        role: "user"
      })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new AppError(data.message || 'Failed to register', 'error');
    }

    const data = await response.json();
    return data;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string; }, thunkAPI) => {
    const response = await customFetch(`/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new AppError(data.message || 'Failed to login', 'error');
    }

    const data = await response.json();
    return data;
  }
);

export const checkUserSession = createAsyncThunk(
  'auth/checkUserSession',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      throw new AppError('Register to Save Favourites and Earn Discount', 'default');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new AppError('No session', 'error');
    }

    const response = await customFetch(`/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new AppError(data.message || 'Failed to logout', 'error');
    }

    // After successful logout on the server, remove the token from local storage
    localStorage.removeItem('token');
    return true;
  }
);

export const validateToken = createAsyncThunk(
  'auth/validate',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new AppError('Token expired or not exist!', 'error');
    }

    const response = await customFetch(`/auth/validate`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new AppError(data.message || 'Failed to validate token', 'error');
    }

    return token;
  }
);

// Then, create the slice
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    email: null,
    token: null as string | null,
    status: 'idle',
    session: null as 'started' | 'expired' | null,
    error: null as { message: string; type: string } | null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSessionExpired: (state) => {
      state.session = 'expired';
    },
  },
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
          state.status = 'succeeded';
          state.token = action.payload.token;
          localStorage.setItem('token', action.payload.token);
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = {
            message: action.error.message || 'Unknown error',
            type: (action.error as AppError).type || 'error'
          };
        })
        .addCase(loginUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
          state.status = 'succeeded';
          state.token = action.payload.token;
          state.session = 'started';
          localStorage.setItem('token', action.payload.token);
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = {
            message: action.error.message || 'Unknown error',
            type: (action.error as AppError).type || 'error'
          };
        })
        .addCase(checkUserSession.fulfilled, (state, action: PayloadAction<string>) => {
          state.status = 'succeeded';
          state.session = 'started'; 
          state.token = action.payload; // action.payload will be a string
        })
        .addCase(checkUserSession.rejected, (state, action) => {
          state.status = 'failed';
          state.session = null; 
          state.token = null;
          // state.error = {
          //   message: '',
          //   type: 'default'
          // };
        })
        .addCase(logoutUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.status = 'succeeded';
          state.session = null;
          state.token = null;
        })
        .addCase(logoutUser.rejected, (state, action) => {
          state.status = 'failed';
          state.session = null;
          state.token = null;
          state.error = {
            message: action.error.message || 'Unknown error',
            type: (action.error as AppError).type || 'error'
          };
          localStorage.removeItem('token'); // Remove the token from localStorage even if the request was rejected
        })
        .addCase(validateToken.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(validateToken.fulfilled, (state, action: PayloadAction<string>) => {
          state.status = 'succeeded';
          state.token = action.payload;
        })
        .addCase(validateToken.rejected, (state, action) => {
          state.status = 'failed';
          state.token = null;
          console.log('ERROR', state.error);
          // state.error = {
          //   message: 'no token',
          //   type: 'default'
          // };
          localStorage.removeItem('token'); // Remove the token from localStorage if validation failed
        });
    },
  });

export const { clearError, setSessionExpired } = authSlice.actions;
export default authSlice.reducer;