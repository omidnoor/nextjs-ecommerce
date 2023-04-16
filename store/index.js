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
  version: 2,
  migrate: (state) => {
    return Promise.resolve(
      state
        ? { ...state, _persist: { ...state._persist, version: 1 } }
        : undefined,
    );
  },
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
// console.log("Store state:", store.getState());
export default store;
