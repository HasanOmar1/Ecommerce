import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "@customTypes/product";

type TResponse = TProduct[];

const actGetProductsByCatPrefix = createAsyncThunk(
  "products/actGetProductsByCatPrefix",
  async (prefix: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const { data } = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An enexpected error");
      }
    }
  }
);

export default actGetProductsByCatPrefix;
