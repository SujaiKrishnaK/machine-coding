import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.fulfilled, (state, action: number) => {
        state.value += action.payload;
      })
      .addCase(incrementAsync.pending, () => {
        console.log("Pending");
      })
      .addCase(incrementAsync.rejected, (error) => {
        console.error();
      });
  },
});

export const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  async (amount) => {
    await new Promise((res) => setTimeout(res, 1000));
    return amount;
  },
);
export const { increment, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
