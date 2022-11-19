import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  SellerSkeleton,
  DashBoardSmallItem,
  DashBoardLargeItem,
  EndPoint,
  Paths,
  BoxLoading,
  AuthContext,
} from "../../LojaUniversal";

export default function SellerDashboard() {
  const [activesProducts, setActivesProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const fetchCount = async () => {
      setIsLoading(true);
      const response = await fetch(EndPoint.seller.storeCount(auth.storeName), {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });

      if (response.status < 200 || response.status > 299) {
        history.push(Paths.ErrorModal);
        return;
      }
      const responseData = await response.json();
      setActivesProducts(responseData);
      setIsLoading(false);
    };

    fetchCount();
  }, [auth.storeName, auth.token, history]);

  return (
    <React.Fragment>
      <SellerSkeleton>
        {isLoading && <BoxLoading />}
        {!isLoading && (
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <DashBoardSmallItem
                title="Produtos Ativos"
                value={activesProducts}
              />
            </Grid>
            <Grid item xs={3}>
              <DashBoardSmallItem title="Visitas Mês" value={3426} />
            </Grid>
            <Grid item xs={3}>
              <DashBoardSmallItem
                title="Faturamento Mês"
                value="R$47.590,62"
                fontSize="29px"
                lineHeight="35px"
              />
            </Grid>
            <Grid item xs={3}>
              <DashBoardSmallItem
                title="Cancelamentos Devoluções"
                value={3}
                fontSize="24px"
                lineHeight="29px"
              />
            </Grid>
            <Grid item xs={12}>
              <DashBoardLargeItem
                title="Últimas Vendas"
                product="Item Aleatório"
                quantity={2}
                value={420}
              />
            </Grid>
            <Grid item xs={12}>
              <DashBoardLargeItem
                title="Estoque Baixo"
                product="Item Aleatório"
                quantity={7}
              />
            </Grid>
          </Grid>
        )}
      </SellerSkeleton>
    </React.Fragment>
  );
}
