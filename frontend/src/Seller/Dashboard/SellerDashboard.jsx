import { Grid } from "@mui/material";

import SellerSkeleton from "./SellerSkeleton";
import DashBoardSmallItem from './components/DashBoardSmallItem'
import DashBoardLargeItem from './components/DashBoardLargeItem'

export default function SellerDashboard() {
  return (
    <SellerSkeleton>
      <Grid container spacing={3}>
            <Grid item xs={3}>
              <DashBoardSmallItem title="Produtos Ativos" value={47} />
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
            <Grid item xs={12} >
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
    </SellerSkeleton>
  );
}

