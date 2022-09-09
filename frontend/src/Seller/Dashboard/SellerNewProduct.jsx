import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Paths, STORE_NAME } from "../../Routes";
import SignUpTextField from "../components/SignUpTextField";
import SellerSkeleton from "./SellerSkeleton";

export default function SellerNewProduct(props) {
  const [submitAction, setSubmitAction] = useState(false);

  const handleButtonAction = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const newProduct = {
      name: data.get("Nome"),
      image: data.get("Imagem"),
      description: data.get("Descricao"),
      amount: data.get("Quantidade"),
      value: data.get("Valor"),
    };
    console.log(newProduct);
    const response = await fetch("http://localhost:3030/api/seller/stores/", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    console.log(responseData);

    // props.onNewProduct(data)
    setSubmitAction(true);
  };

  return (
    <SellerSkeleton>
      {submitAction && <Redirect to={Paths.SellerProducts(STORE_NAME)} />}
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
                <SignUpTextField name="Imagem" label="Imagem" margin="normal" />
                <SignUpTextField
                  name="Descricao"
                  label="Descricao"
                  margin="normal"
                  height="180px"
                />
                <SignUpTextField
                  name="Quantidade"
                  label="Quantidade"
                  margin="normal"
                />
                <SignUpTextField name="Valor" label="Valor" margin="normal" />

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
  );
}
