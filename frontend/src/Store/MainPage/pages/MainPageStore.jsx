import { Box, Grid, Pagination } from "@mui/material";

import NavBar from "../../../shared/components/NavBar";
import Carousel from "../components/Carousel";
import Products from "../components/Products";
import SideBar from "../../../shared/components/SideBar";
import Copyright from "../../../shared/components/Copyright";
import { useEffect } from "react";
import { useState } from "react";
import { EndPoint } from "../../../Routes";
import Loading from "../../../shared/components/Loading";
import { useParams } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState(false);

  const { storeName } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await fetch(EndPoint.user.stores);
      const responseData = await response.json();
      setLoadedProducts(responseData);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <Box>
      <NavBar />
      <Grid item xs={false}>
        <Carousel title={storeName} />
      </Grid>
      <Grid container spacing={3} p={2}>
        <Grid item xs={false} md={3}>
          <SideBar title="Tipo de produto" items={filterItems} />
        </Grid>
        <Grid item xs={12} md={8}>
          {isLoading && <Loading />}

          {!isLoading && <Products products={loadedProducts} />}
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
