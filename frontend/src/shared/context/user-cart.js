import { createContext } from "react";

export const UserCartContext = createContext({
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
  updateProduct: () => {},
});
