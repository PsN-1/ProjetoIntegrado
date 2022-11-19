import { createContext } from "react";

export default createContext({
  products: [],
  total: 0,
  addProduct: () => {},
  removeProduct: () => {},
  increaseAmount: () => {},
  decreaseAmount: () => {},
});
