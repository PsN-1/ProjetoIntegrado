import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import {
  SellerSkeleton,
  DashBoardSmallItem,
  DashBoardLargeItem,
  EndPoint,
  BoxLoading,
  useHttp,
} from "LojaUniversal";

export default function SellerDashboard() {
  const [activesProducts, setActivesProducts] = useState(0);

  const { isLoading, sendRequest } = useHttp();
  const { storeName } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchCount = async () => {
      const responseData = await sendRequest(
        EndPoint.seller.storeCount(storeName),
        false
      );

      setActivesProducts(responseData);
    };

    fetchCount();
  }, [sendRequest, storeName, history]);

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
