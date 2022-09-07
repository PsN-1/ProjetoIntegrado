import { Paper, Typography, Box } from "@mui/material";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import SellerSkeleton from "./SellerSkeleton";
import LabelTypography from "../../shared/components/LabelTypography";
import TitleTypography from "../../shared/components/TitleTypography";
import { Link } from "react-router-dom";
import { Paths, STORE_NAME } from "../../Routes";

export default function SellerProducts() {
  return (
    <SellerSkeleton>
      <DashBoardProducts items={DUMMY_ITENS} />
    </SellerSkeleton>
  );
}

const DashBoardProducts = (props) => {
  const handleRowClick = (row) => {
    console.log(row);
  };

  const handleDeleteClick = (row) => {
    console.log(+row.amount);
  };

  function addNew(data) {
    DUMMY_ITENS.push(data)
    console.log(DUMMY_ITENS)
  }
  return (
    <Box>
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
                <TitleTypography>Valor</TitleTypography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map((item) => (
              <TableRow
                hover
                onClick={() => handleRowClick(item)}
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <LabelTypography>{item.name}</LabelTypography>
                </TableCell>
                <TableCell align="center">
                  <LabelTypography>{item.amount}</LabelTypography>
                </TableCell>
                <TableCell align="center">
                  <LabelTypography>{item.value}</LabelTypography>
                </TableCell>
                <TableCell align="center">
                  {+item.amount === 0 && (
                    <DeleteIcon onClick={() => handleDeleteClick(item)} />
                  )}
                </TableCell>
              </TableRow>
            ))}
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
      >
        <Link to={Paths.SellerAddNewProduct(STORE_NAME)} underline="always" >
          Adicionar Novo Produto {<AddCircleOutlineIcon />}
        </Link>
      </Typography>
    </Box>
  );
};

let DUMMY_ITENS = [
  {
    id: "i1",
    name: "Blusa Laranja",
    amount: "5",
    value: "99,90",
  },
  {
    id: "i2",
    name: "Camisa Social",
    amount: "67",
    value: "108,90",
  },
  {
    id: "i3",
    name: "Blusa Xadrez",
    amount: "0",
    value: "83,90",
  },
  {
    id: "i4",
    name: "Calça Jeans",
    amount: "23",
    value: "132,90",
  }
];

const MyPaper = (props) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        marginTop: 3,
        background: "#F2F2F2",
        borderRadius: "20px",
        // alignItems: "center",
      }}
    >
      {props.children}
    </Paper>
  );
};
