import { Box, Button, Grid, Paper, Typography, Container } from "@mui/material";
import { useContext, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Redirect, useHistory } from "react-router-dom";

import {
  EndPoint,
  Paths,
  BoxLoading,
  AuthContext,
  SignUpTextField,
  DescriptionTextField,
  SellerSkeleton,
} from "../../LojaUniversal";

export default function SellerNewProduct(props) {
  const [submitAction, setSubmitAction] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const auth = useContext(AuthContext);
  const history = useHistory();

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

    const response = await fetch(EndPoint.seller.stores(auth.storeName), {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
    });

    if (response.status < 200 || response.status > 299) {
      history.push(Paths.ErrorModal);
      return;
    }

    const responseData = await response.json();
    console.log(responseData);

    setIsloading(false);
    setSubmitAction(true);
  };

  return (
    <>
      {submitAction && <Redirect to={Paths.SellerProducts(auth.storeName)} />}
      <SellerSkeleton>
        {isLoading && <BoxLoading />}
        {!isLoading && (
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
                    }}
                  >
                    <Typography
                      sx={{
                        p: 2,
                        textAlign: "left",
                        fontStyle: "italic",
                        fontWeight: "400",
                        fontSize: "24px",
                        lineHeight: "29px",
                      }}
                    >
                      Novo Produto
                    </Typography>

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
                    <NumericFormat
                      customInput={SignUpTextField}
                      allowNegative={false}
                      name="Quantidade"
                      label="Quantidade"
                      margin="normal"
                    />
                    <NumericFormat
                      customInput={SignUpTextField}
                      prefix={"R$ "}
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={2}
                      allowNegative={false}
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
        )}
      </SellerSkeleton>
    </>
  );
}
