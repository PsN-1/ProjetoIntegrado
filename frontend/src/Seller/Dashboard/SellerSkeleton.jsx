import { Grid, Box } from "@mui/material";
import NavBar from "../../shared/components/NavBar";
import SideBar from "../../shared/components/SideBar";

const filterItems = [
  "Produtos",
  "Dashboard",
  "Vendas",
  "Financeiro",
  "Visitas",
  "Suporte",
  "Auxiliares",
  "Relatórios",
];

export default function SellerSkeleton(props) {
  return (
    <Box>
      <NavBar />
      <Grid container spacing={3} p={2} paddingTop={10}>
        <Grid item xs={false} md={3}>
          <SideBar title="Guia Rápido" items={filterItems} />
        </Grid>

        <Grid item xs={8}>
            {props.children}
        </Grid>
      </Grid>
    </Box>
  );
}
