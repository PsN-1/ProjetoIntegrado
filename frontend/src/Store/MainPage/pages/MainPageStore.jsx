import { Box, Grid, Pagination } from "@mui/material";

import NavBar from "../../../shared/components/NavBar";
import Carousel from "../components/Carousel";
import Products from "../components/Products";
import SideBar from "../../../shared/components/SideBar";
import Copyright from "../../../shared/components/Copyright";
import { useEffect } from "react";
import { useState } from "react";
import { EndPoint, Paths } from "../../../Routes";
import { BoxLoading } from "../../../shared/components/Loading";
import { useHistory, useParams } from "react-router-dom";

const filterItems = [
  "Casacos",
  "Camisetas",
  "Calcas",
  "Bermudas",
  "Oculos",
  "Tenis",
];

export default function MainPageStore() {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { storeName } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const storePath = EndPoint.user.stores(storeName);
      const response = await fetch(storePath);

      if (response.status < 200 || response.status > 299) {
        history.push(Paths.ErrorModal);
        return;
      }

      const responseData = await response.json();

      setIsLoading(false);
      if (response.status !== 200) {
        history.push(Paths.ErrorModal);
      }
      setLoadedProducts(responseData);
    };
    fetchProducts();
  }, [storeName, history]);

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
          {isLoading && <BoxLoading />}
          {!isLoading && <Products products={loadedProducts} />}
          <Box display="flex" justifyContent="center" p={5}>
            <Pagination count={5} />
          </Box>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
}
