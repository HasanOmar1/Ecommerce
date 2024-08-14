import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

export const getCartTotalQuantitySelector = createSelector(
  (state: RootState) => state.cartSlice.items,
  (items) => {
    const totalQuantity = Object.values(items).reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      },
      0
    );
    return totalQuantity;
  }
);
