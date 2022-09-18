import { Box, Grid } from "@mui/material";

import NavBar from "../../../shared/components/NavBar";
import SideBar from "../../../shared/components/SideBar";
import Copyright from "../../../shared/components/Copyright";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import * as React from "react";

import { useParams } from "react-router-dom";

import TitleTypography from "../../../shared/components/TitleTypography";
import { useContext } from "react";
import { UserCartContext } from "../../../shared/context/user-cart";
import UserCartItem from "./UserCartItem";
import { useState } from "react";
import LabelTypography from "../../../shared/components/LabelTypography";

const filterItems = [
  "Casacos",
  "Camisetas",
  "Calcas",
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
            storeName
            onDelete={cart.removeProduct}
            onAddAmount={cart.increaseAmount}
            onDecreaseAmount={cart.decreaseAmount}
          />
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
}

const Cart = (props) => {
  const [subtotal, setSubtotal] = useState("0");

  function handleOnAddAmount(item) {
    const newItem = props.onAddAmount(item);
    handleSubTotal();
    return newItem;
  }

  function handleOnDecreaseAmount(item) {
    const newItem = props.onDecreaseAmount(item);
    handleSubTotal();
    return newItem;
  }

  function handleSubTotal() {
    setSubtotal(
      props.items.reduce((total, item) => total + +item.amount * +item.value, 0)
    );
  }

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
                <TitleTypography>Valor Und.</TitleTypography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map((item) => (
              <UserCartItem
                key={item._id}
                item={item}
                onAddAmount={handleOnAddAmount}
                onDecreaseAmount={handleOnDecreaseAmount}
                onDelete={props.onDelete}
              />
            ))}
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">
                <TitleTypography>Total:</TitleTypography>
              </TableCell>
              <TableCell align="center">
                <LabelTypography>R$ {subtotal}</LabelTypography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        sx={{
          p: 3,
          textAlign: "right",
          fontStyle: "italic",
          fontWeight: "400",
          fontSize: "24px",
          lineHeight: "29px",
        }}
      ></Typography>
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
        // alignItems: "center",
      }}
    >
      {props.children}
    </Paper>
  );
};
