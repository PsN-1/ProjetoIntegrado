import { useEffect, useState } from "react";

export const useCart = () => {
  const [products, setProducts] = useState([]);

  function addProduct(product) {
    console.log("added", product);
    let existingProductId = products.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductId !== -1) {
      setProducts((oldProducts) => {
        oldProducts[existingProductId].amount++;
        return oldProducts;
      });
      return;
    }

    setProducts((oldProducts) => [...oldProducts, product]);
    saveProducts();
  }

  function removeProduct(product) {
    setProducts((oldProducts) =>
      oldProducts.filter((item) => item._id !== product._id)
    );
    saveProducts();
  }

  function increaseAmount(product) {
    let index = products.findIndex((item) => item._id === product._id);

    let amount;
    setProducts((oldProducts) => {
      const maxAmount = +oldProducts[index].maxAmount;

      oldProducts[index].amount >= maxAmount
        ? (oldProducts[index].amount = maxAmount)
        : oldProducts[index].amount++;

      amount = oldProducts[index].amount;
      return oldProducts;
    });
    saveProducts();
    return amount;
  }

  function decreaseAmount(product) {
    let index = products.findIndex((item) => item._id === product._id);

    let amount;
    setProducts((oldProducts) => {
      oldProducts[index].amount < 1
        ? (oldProducts[index].amount = 0)
        : oldProducts[index].amount--;

      amount = oldProducts[index].amount;
      return oldProducts;
    });
    saveProducts();
    return amount;
  }

  function saveProducts() {
    try {
      const serializedProducts = JSON.stringify(products);
      localStorage.setItem("cart", serializedProducts);
    } catch (error) {
      return undefined;
    }
  }

  function getProducts() {
    try {
      const serializedProducts = localStorage.getItem("cart");
      if (serializedProducts === null) {
        return [];
      }
      return JSON.parse(serializedProducts);
    } catch (error) {
      return undefined;
    }
  }

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  return {
    products,
    addProduct,
    removeProduct,
    increaseAmount,
    decreaseAmount,
  };
};
