import { Box, Button, Grid } from "@mui/material";

import NavBar from "../../../shared/components/NavBar";
import SideBar from "../../../shared/components/SideBar";
import Copyright from "../../../shared/components/Copyright";
import { useEffect } from "react";
import { useState } from "react";
import { EndPoint } from "../../../Routes";
import Loading from "../../../shared/components/Loading";
import { useParams } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import React from "react";
import { DescriptionTextField } from "../../../Seller/components/SignUpTextField";

const filterItems = [
  "Casacos",
  "Camisetas",
  "Calcas",
  "Bermudas",
  "Oculos",
  "Tenis",
];

export default function ProductDetail() {
  //   const [submitAction, setSubmitAction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const { storeName, pid } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const response = await fetch(EndPoint.user.storeWithId(storeName, pid)); 
      const responseData = await response.json();
      const { name, image, description, value } = responseData.product;

      setName(name);
      setImage(image);
      setDescription(description);

      setValue(value);
      setIsLoading(false);
    };
    fetchProduct();
  }, [pid, storeName]);

  return (
    <React.Fragment>
      {isLoading && <Loading />}
      {!isLoading && (
        <Box>
          <NavBar />
          <Grid container spacing={3} p={2}>
            <Grid item xs={false} md={3}>
              <SideBar title="Tipo de produto" items={filterItems} />
            </Grid>
            <Grid item xs={6}>
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
                <Box
                  
                  sx={{ display: "flex", flexDirection: "column" }}
                >
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
                      R${value}
                    </Typography>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
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
                      rows={4}
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
          <Copyright sx={{ mt: 5 }} />
        </Box>
      )}
    </React.Fragment>
  );
}
