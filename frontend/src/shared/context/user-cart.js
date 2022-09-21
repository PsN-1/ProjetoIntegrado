import { createContext } from "react";

export const UserCartContext = createContext({
  products: [],
  total: 0,
  addProduct: () => {},
  removeProduct: () => {},
  increaseAmount: () => {},
  decreaseAmount: () => {},
});
