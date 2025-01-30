import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse, SignupResponse } from '../../services/api';
import { userService } from '../../services/api';

// Define the initial state for auth
interface AuthState {
  user: {
    name: string;
    email: string;
    accessToken: string;
    refreshToken:string;
  } | null;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
  enrolled: boolean | null; // New property to store enrollment status
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
  loading: false,
  enrolled: null, // Initialize as null to indicate no enrollment check done yet
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<LoginResponse['data']>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setEnrollmentStatus: (state, action: PayloadAction<boolean | null>) => {
      state.enrolled = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userService.endpoints.login.matchFulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          const { payload } = action;
          state.user = payload.data;
          state.isAuthenticated = true;
          state.error = null;
          state.enrolled = null; // Reset enrollment status after login
        }
      )
      .addMatcher(
        userService.endpoints.login.matchRejected,
        (state, action) => {
          const error = action.payload;
          if (error && 'data' in error) {
            state.error = (error.data as { error: string }).error || 'Login failed';
          } else {
            state.error = 'Login failed';
          }
          state.isAuthenticated = false;
        }
      )
      .addMatcher(
        userService.endpoints.signup.matchFulfilled,
        (state, action: PayloadAction<SignupResponse>) => {
          const { payload } = action;
          state.user = payload.data;
          state.isAuthenticated = true;
          state.error = null;
          state.enrolled = null; // Reset enrollment status after signup
        }
      )
      .addMatcher(
        userService.endpoints.signup.matchRejected,
        (state, action) => {
          const { payload } = action;
          if (payload && 'data' in payload) {
            state.error = (payload.data as { error: string }).error || 'Signup failed';
          } else {
            state.error = 'Signup failed';
          }
          state.isAuthenticated = false;
        }
      )
    
  },
});

// Export the actions from the slice
export const { setUser, logout, setLoading, setError } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
