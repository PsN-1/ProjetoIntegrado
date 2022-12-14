import { Grid } from "@mui/material";
import { Product } from "LojaUniversal";

const Products = (props) => {
  const { products } = props;

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={4} md={3} key={product._id}>
          <Product
            key={product._id}
            id={product._id}
            image={product.image}
            name={product.name}
            price={product.value}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
