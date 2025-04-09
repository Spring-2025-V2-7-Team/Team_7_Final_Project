import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as moderationAPI from "./moderationAPI";

export const fetchFlaggedPosts = createAsyncThunk(
  "moderation/fetchFlaggedPosts",
  async (_, thunkAPI) => {
    try {
      return await moderationAPI.getFlaggedPosts();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to load flagged posts"
      );
    }
  }
);

export const fetchReportedUsers = createAsyncThunk(
  "moderation/fetchReportedUsers",
  async (_, thunkAPI) => {
    try {
      return await moderationAPI.getReportedUsers();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to load reported users"
      );
    }
  }
);

const moderationSlice = createSlice({
  name: "moderation",
  initialState: {
    flaggedPosts: [],
    reportedUsers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlaggedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlaggedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.flaggedPosts = action.payload;
      })
      .addCase(fetchFlaggedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchReportedUsers.fulfilled, (state, action) => {
        state.reportedUsers = action.payload;
      });
  },
});

export default moderationSlice.reducer;