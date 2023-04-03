import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import cart from "./cartSlice";

const reducers = combineReducers({ cart });

const config = {
  key: "root",
  storage,
};

const reducer = persistReducer(config, reducers);

const store = configureStore({
  reducer: reducer,
  devTools:
    process.env.NODE_ENV !== "production"
      ? {
          actionSanitizer: (action) => action.type,
          stateSanitizer: (state) => state,
          serialize: true,
        }
      : false,
  middleware: [thunk],
});

export const persistor = persistStore(store);
export default store;
