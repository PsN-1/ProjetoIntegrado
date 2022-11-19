import { useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  TextField,
  styled,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import {
  NavBar,
  SideBar,
  Copyright,
  TitleTypography,
  UserCartContext,
  UserCartItem,
  LabelTypography,
} from "../../../LojaUniversal";

const filterItems = [
  "Casacos",
  "Camisetas",
  "Calças",
  "Bermudas",
  "Oculos",
  "Tenis",
];

export default function UserCart() {
  const { storeName } = useParams;
  const cart = useContext(UserCartContext);

  return (
    <Box>
      <NavBar />
      <Grid container spacing={3} p={2}>
        <Grid item xs={false} md={3}>
          <SideBar
            title="Tipo de produto"
            items={filterItems}
            storeName={storeName}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Cart
            items={cart.products}
            total={cart.total}
            storeName
            onDelete={cart.removeProduct}
            onAddAmount={cart.increaseAmount}
            onDecreaseAmount={cart.decreaseAmount}
          />
          <Grid container>
            <Grid item xs={8}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  background: "#F2F2F2",
                  mr: 3,
                  mt: 3,
                  mb: 2,
                  height: "48px",
                  borderRadius: "10px",
                }}
              >
                <Grid container>
                  <Grid item xs={8} sx={{ pr: 2 }}>
                    <CepTextField name="cep" label="CEP:" />
                  </Grid>
                  <Grid item xs={4} sx={{ pt: 0.5 }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        height: "48px",
                        borderRadius: "10px",
                        backgroundColor: "rgba(138, 160, 167, 0.8)",
                        "&:hover": {
                          backgroundColor: "#631740",
                        },
                      }}
                    >
                      Calcular Frete
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={4} sx={{ pr: 2 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 6,
                  mb: 2,
                  height: "48px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(44, 89, 103, 0.8)",
                  "&:hover": {
                    backgroundColor: "#631740",
                  },
                }}
              >
                Finalizar Pedido
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
}

const Cart = (props) => {
  return (
    <div>
      <TableContainer component={MyPaper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TitleTypography>Produto</TitleTypography>
              </TableCell>
              <TableCell align="center">
                <TitleTypography>Quantidade</TitleTypography>
              </TableCell>
              <TableCell align="center">
                <TitleTypography>Und.</TitleTypography>
              </TableCell>
              <TableCell align="center">
                <TitleTypography>Valor</TitleTypography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map((item) => (
              <UserCartItem
                key={item._id}
                item={item}
                onAddAmount={props.onAddAmount}
                onDecreaseAmount={props.onDecreaseAmount}
                onDelete={props.onDelete}
              />
            ))}
            {!(props.items.length === 0) && (
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell align="right">
                  <TitleTypography>Total:</TitleTypography>
                </TableCell>
                <TableCell align="center">
                  <LabelTypography>R$ {props.total}</LabelTypography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const MyPaper = (props) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        background: "#F2F2F2",
        borderRadius: "20px",
      }}
    >
      {props.children}
    </Paper>
  );
};

const CepTextField = (props) => {
  return (
    <CssTextField
      id={props.label}
      fullWidth
      value={props.value}
      onChange={props.onChange}
      inputProps={{
        style: {
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: "10px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          ...props,
        },
      }}
      {...props}
    />
  );
};
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "gray",
      borderRadius: "10px",
    },
  },
});
