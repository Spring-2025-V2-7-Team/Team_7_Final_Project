import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as userAPI from "./userAPI";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      return await userAPI.getUserProfile();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to fetch profile"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (formData, thunkAPI) => {
    try {
      return await userAPI.updateUserProfile(formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to update profile"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export default userSlice.reducer;