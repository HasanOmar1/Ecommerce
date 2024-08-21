import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TCategory } from "@customTypes/category";

type TResponse = TCategory[];

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const { data } = await axios.get<TResponse>(`/categories`);
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

export default actGetCategories;
