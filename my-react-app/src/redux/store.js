import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";
import shopReducer from "./reducers/shop";
import sellerReducer from "./reducers/sellerReducer";
import orderReducer from "./reducers/order.Reducer.js";
import cartReducer from "./reducers/cartReducer";
import wishlistReducer from "./reducers/wishlistReducer";
import eventReducer from "./reducers/eventReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    shop: shopReducer,
    seller: sellerReducer,
    order: orderReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    event: eventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;