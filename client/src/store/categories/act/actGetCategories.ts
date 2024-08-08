import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = { id: number; title: string; prefix: string; img: string }[];

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const { data } = await axios.get<TResponse>(
        `${import.meta.env.VITE_SERVER_URL}/categories`
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

export default actGetCategories;
