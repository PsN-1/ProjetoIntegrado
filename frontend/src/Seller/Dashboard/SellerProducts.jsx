import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import SellerSkeleton from "./SellerSkeleton";
import LabelTypography from "../../shared/components/LabelTypography";
import TitleTypography from "../../shared/components/TitleTypography";
import { Link, useHistory } from "react-router-dom";
import { Paths, STORE_NAME } from "../../Routes";
import { useEffect, useState } from "react";

export default function SellerProducts() {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:3030/api/seller/stores/");
      const responseData = await response.json();
      setLoadedProducts(responseData);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <SellerSkeleton>
      <DashBoardProducts items={loadedProducts} />
    </SellerSkeleton>
  );
}

const DashBoardProducts = (props) => {
  const history = useHistory()
  const handleRowClick = (item) => {    
    history.push(Paths.SellerEditProduct(STORE_NAME, item._id), item)
  };

  const handleDeleteClick = (row) => {
    console.log(+row.amount);
  };

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
                // component={Link}
                // to={Paths.SellerAddNewProduct}
                hover
                onClick={() => handleRowClick(item)}
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {console.log(item)}
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
        <Link to={Paths.SellerAddNewProduct(STORE_NAME)} underline="always">
          Adicionar Novo Produto {<AddCircleOutlineIcon />}
        </Link>
      </Typography>
    </Box>
  );
};

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
