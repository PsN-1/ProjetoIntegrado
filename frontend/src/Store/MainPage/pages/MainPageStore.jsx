import { Box, Grid, Pagination } from "@mui/material";

import NavBar from "../../../shared/components/NavBar";
import Carousel from "../components/Carousel";
import Products from "../components/Products";
import SideBar from "../../../shared/components/SideBar";
import Copyright from "../../../shared/components/Copyright";
import { useEffect } from "react";
import { useState } from "react";

const filterItems = [
  "Casacos",
  "Camisetas",
  "Calcas",
  "Bermudas",
  "Oculos",
  "Tenis",
];

const MainPageStore = () => {
  const [loadedProducts, setLoadedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3030/api/user/stores/");
      const responseData = await response.json();
      setLoadedProducts(responseData);
    };
    fetchProducts();
  }, []);

  return (
    <Box>
      <NavBar />
      <Grid item xs={false}>
        <Carousel />
      </Grid>
      <Grid container spacing={3} p={2}>
        <Grid item xs={false} md={3}>
          <SideBar title="Tipo de produto" items={filterItems} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Products products={loadedProducts} />
          <Box display="flex" justifyContent="center" p={5}>
            <Pagination count={5} />
          </Box>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
};

export default MainPageStore;
