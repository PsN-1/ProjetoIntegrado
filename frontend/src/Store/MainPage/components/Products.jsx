import { Grid } from "@mui/material";
import Product from "./Product";

const Products = () => {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={4} md={3}>
          <Product
            image={product.image}
            name={product.name}
            price={product.price}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;

const products = [
  {
    id: Math.random.toString(),
    image:
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    name: "Blusa Laranja",
    price: "99,90",
  },
  {
    id: Math.random.toString(),
    image:
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
    name: "Camisa Social",
    price: "108,90",
  },
  {
    id: Math.random.toString(),
    image:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    name: "Camisa Basica",
    price: "47,90",
  },
  {
    id: Math.random.toString(),
    image:
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    name: "Blusa Xadrez",
    price: "83,90",
  },
  {
    id: Math.random.toString(),
    image:
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    name: "Blusa Laranja",
    price: "99,90",
  },
  {
    id: Math.random.toString(),
    image:
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
    name: "Camisa Social",
    price: "108,90",
  },
  {
    id: Math.random.toString(),
    image:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    name: "Camisa Basica",
    price: "47,90",
  },
  {
    id: Math.random.toString(),
    image:
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    name: "Blusa Xadrez",
    price: "83,90",
  },
].sort(() => Math.random() - 0.5);
