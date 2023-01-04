import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CardMedia,
} from "@mui/material";

import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import {
  EndPoint,
  Paths,
  SellerSkeleton,
  LabelTypography,
  TitleTypography,
  BoxLoading,
  useHttp,
} from "LojaUniversal";

export default function SellerProducts() {
  const [loadedProducts, setLoadedProducts] = useState([]);

  const { isLoading, sendRequest } = useHttp();
  const { storeName } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      const responseData = await sendRequest(
        EndPoint.seller.stores(storeName),
        false
      );

      setLoadedProducts(responseData);
    };

    fetchProducts();
  }, [sendRequest, storeName, history]);

  return (
    <SellerSkeleton>
      {isLoading && <BoxLoading />}
      {!isLoading && (
        <DashBoardProducts items={loadedProducts} storeName={storeName} />
      )}
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
              <TableCell></TableCell>
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
                to={Paths.SellerEditProduct(props.storeName, item._id)}
                hover
                key={item._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>
                  <CardMedia
                    component="img"
                    src={item.image}
                    sx={{ height: 100, width: 100 }}
                  />
                </TableCell>
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
        <Link
          to={Paths.SellerAddNewProduct(props.storeName)}
          underline="always"
        >
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
      }}
    >
      {props.children}
    </Paper>
  );
};
