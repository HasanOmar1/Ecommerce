import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import categoriesSlice from "./categories/categoriesSlice";
import productsSlice from "./products/productsSlice";
import cartSlice from "./cart/cartSlice";

const cartPersistConfig = {
  key: "cartSlice",
  storage,
  whitelist: ["items"],
};
const rootReducer = combineReducers({
  categoriesSlice,
  productsSlice,
  cartSlice: persistReducer(cartPersistConfig, cartSlice),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
