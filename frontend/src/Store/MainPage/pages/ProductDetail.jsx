import { useEffect, useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import {
  EndPoint,
  Paths,
  NavBar,
  Copyright,
  BoxLoading,
  DescriptionTextField,
  UserCartContext,
  useHttp,
} from "LojaUniversal";

export default function ProductDetail() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [amount, setAmount] = useState("");

  const { isLoading, sendRequest } = useHttp();
  const { storeName, pid } = useParams();
  const cart = useContext(UserCartContext);
  const history = useHistory();

  function handleAddCart() {
    let product = {
      _id: pid,
      name: name,
      image: image,
      value: value,
      amount: 1,
      maxAmount: amount,
    };
    cart.addProduct(product);
    history.push(Paths.UserCart(storeName));
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const responseData = await sendRequest(
        EndPoint.user.storeWithId(storeName, pid),
        true
      );
      const { name, image, description, value, amount } = responseData.product;

      setName(name);
      setImage(image);
      setDescription(description);
      setAmount(amount);

      setValue(value);
    };
    fetchProduct();
  }, [sendRequest, pid, storeName, history]);

  return (
    <>
      <Box>
        <NavBar />
        {isLoading && <BoxLoading />}
        {!isLoading && (
          <Grid container spacing={3} pt={8} justifyContent="center">
            <Grid item xs={8}>
              <Card
                sx={{
                  display: "flex",
                  background: "#CDCCC7",
                  borderRadius: "20px",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: "626px", width: "435px" }}
                  image={image}
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography
                      sx={{
                        mt: 3,
                        mb: 2,
                        fontStyle: "italic",
                        fontWeight: "400",
                        fontSize: "40px",
                        lineHeight: "48px",
                        display: "flex",
                        alignItems: "center",
                        color: "#FFFFFF",
                        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      {name}
                    </Typography>
                    <Typography
                      sx={{
                        mt: 3,
                        mb: 2,
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "30px",
                        lineHeight: "36px",
                        display: "flex",
                        alignItems: "center",
                        color: "#FFFFFF",
                        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      {value}
                    </Typography>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={handleAddCart}
                      sx={{
                        mt: 3,
                        mb: 2,
                        height: "48px",
                        borderRadius: "10px",
                        backgroundColor: "rgba(44, 89, 103, 0.8)",
                        "&:hover": {
                          backgroundColor: "#631740",
                        },
                      }}
                    >
                      Adicionar ao Carrinho
                    </Button>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        height: "48px",
                        borderRadius: "10px",
                        backgroundColor: "rgba(138, 160, 167, 0.8)",
                        "&:hover": {
                          backgroundColor: "#631740",
                        },
                      }}
                    >
                      Adicionar aos Favoritos
                    </Button>
                    <DescriptionTextField
                      multiline
                      fullWidth
                      rows={6}
                      value={description}
                      sx={{
                        mt: 3,
                        mb: 2,
                        borderRadius: "20px",
                        backgroundColor: "white",
                        fontFamily: "Inter",
                        fontStyle: "italic",
                        fontWeight: "300",
                        fontSize: "25px",
                        lineHeight: "30px",
                      }}
                    />
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          </Grid>
        )}
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </>
  );
}
