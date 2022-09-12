import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { EndPoint, getStoreName, Paths } from "../../Routes";
import Loading from "../../shared/components/Loading";
import SignUpTextField, {
  DescriptionTextField,
} from "../components/SignUpTextField";
import SellerSkeleton from "./SellerSkeleton";

export default function SellerNewProduct(props) {
  const [submitAction, setSubmitAction] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const handleButtonAction = async (event) => {
    event.preventDefault();
    setIsloading(true);

    const data = new FormData(event.currentTarget);
    const newProduct = {
      name: data.get("Nome"),
      image: data.get("Imagem"),
      description: data.get("Descricao"),
      amount: data.get("Quantidade"),
      value: data.get("Valor"),
    };

    const response = await fetch(EndPoint.seller.stores(getStoreName()), {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    console.log(responseData);

    setIsloading(false);
    setSubmitAction(true);
  };

  return (
    <React.Fragment>
      {isLoading && <Loading />}
      {!isLoading && (
        <SellerSkeleton>
          {submitAction && (
            <Redirect to={Paths.SellerProducts(getStoreName())} />
          )}
          <Typography
            sx={{
              paddingLeft: 5,
              textAlign: "left",
              fontStyle: "italic",
              fontWeight: "400",
              fontSize: "24px",
              lineHeight: "29px",
            }}
          >
            Novo Produto
          </Typography>
          <Grid container>
            <Grid item xs={8}>
              <Paper
                sx={{
                  background: "#F2F2F2",
                  borderRadius: "20px",
                }}
              >
                <Container>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleButtonAction}
                    sx={{
                      p: 3,
                      mt: 3,
                    }}
                  >
                    <SignUpTextField name="Nome" label="Nome" margin="normal" />
                    <SignUpTextField
                      name="Imagem"
                      label="Imagem"
                      margin="normal"
                    />

                    <DescriptionTextField
                      name="Descricao"
                      label="Descrição"
                      margin="normal"
                      multiline
                      rows={4}
                    />
                    <SignUpTextField
                      name="Quantidade"
                      label="Quantidade"
                      margin="normal"
                    />
                    <SignUpTextField
                      name="Valor"
                      label="Valor"
                      margin="normal"
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        height: "48px",
                        borderRadius: "10px",
                        backgroundColor: "#EB445A",
                        "&:hover": {
                          backgroundColor: "#631740",
                        },
                      }}
                    >
                      Cadastrar Produto
                    </Button>
                  </Box>
                </Container>
              </Paper>
            </Grid>
          </Grid>
        </SellerSkeleton>
      )}
    </React.Fragment>
  );
}
