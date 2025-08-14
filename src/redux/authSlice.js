import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Check auth thunk (page refresh pe automatically check kare)
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${backendUrl}/checkauth`, {
        withCredentials: true
      });
      return res.data.user;
    } catch (err) {
      return rejectWithValue("Not authenticated");
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    authChecked: false, // Pehle check hua ya nahi
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.authChecked = true;
    },
    loginFail: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Check auth cases (refresh pe)
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.authChecked = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.authChecked = true;
      });
  },
});

export const { loginStart, loginSuccess, loginFail, logout, setUser } = authSlice.actions;
export default authSlice.reducer;