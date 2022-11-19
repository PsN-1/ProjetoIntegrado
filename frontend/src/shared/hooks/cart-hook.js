import { useEffect, useState } from "react";

export default function useCart() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  function addProduct(product) {
    console.log("added", product);
    let existingProductId = products.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductId !== -1) {
      setProducts((oldProducts) => {
        oldProducts[existingProductId].amount++;
        saveProducts(oldProducts);
        return oldProducts;
      });
      return;
    }

    setProducts((oldProducts) => {
      let newArray = [...oldProducts, product];
      saveProducts(newArray);
      return newArray;
    });
  }

  function removeProduct(product) {
    setProducts((oldProducts) => {
      let newProducts = oldProducts.filter((item) => item._id !== product._id);
      saveProducts(newProducts);
      return newProducts;
    });

    console.log(products);
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
      saveProducts(oldProducts);
      return oldProducts;
    });

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
      saveProducts(oldProducts);
      return oldProducts;
    });

    return amount;
  }

  function updateTotal(products) {
    setTotal(
      products.reduce((total, item) => total + +item.amount * +item.value.split(' ')[1], 0)
    );
  }

  function saveProducts(products) {
    updateTotal(products);
    try {
      const serializedProducts = JSON.stringify(products);
      localStorage.setItem("cart", serializedProducts);
    } catch (error) {
      console.log(error);
      console.log("Error while saving cart");
      return undefined;
    }
  }

  function getProducts() {
    try {
      const serializedProducts = localStorage.getItem("cart");
      if (serializedProducts === null) {
        localStorage.setItem("cart", "[]");
        return [];
      }
      let products = JSON.parse(serializedProducts);

      return products;
    } catch (error) {
      console.log(error);
      console.log("Error while retrieving cart");
      return [];
    }
  }

  useEffect(() => {
    let products = getProducts();
    updateTotal(products);
    setProducts(products);
  }, []);

  return {
    products,
    total,
    addProduct,
    removeProduct,
    increaseAmount,
    decreaseAmount,
  };
};
