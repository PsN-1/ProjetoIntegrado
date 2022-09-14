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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import SellerSkeleton from "./SellerSkeleton";
import LabelTypography from "../../shared/components/LabelTypography";
import TitleTypography from "../../shared/components/TitleTypography";
import { Link } from "react-router-dom";
import { EndPoint, getStoreName, Paths } from "../../Routes";
import { useEffect, useState } from "react";
import Loading from "../../shared/components/Loading";

export default function SellerProducts() {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await fetch(EndPoint.seller.stores(getStoreName()));
      const responseData = await response.json();
      setLoadedProducts(responseData);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <SellerSkeleton>
      {isLoading && <Loading />}
      {!isLoading && <DashBoardProducts items={loadedProducts} />}
    </SellerSkeleton>
  );
}

const DashBoardProducts = (props) => {
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
                <TitleTypography>Valor</TitleTypography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map((item) => (
              <TableRow
                component={Link} // This is causing all the errors, alternative not found
                to={Paths.SellerEditProduct(getStoreName(), item._id)}
                hover
                key={item._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
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
        <Link to={Paths.SellerAddNewProduct(getStoreName())} underline="always">
          Adicionar Novo Produto {<AddCircleOutlineIcon />}
        </Link>
      </Typography>
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
