import { Button, Grid, Typography, Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { NumericFormat, PatternFormat } from "react-number-format";
import { useHistory, useParams } from "react-router-dom";

import {
  EndPoint,
  Paths,
  SignUpTextField,
  BoxLoading,
  NavBar,
  AuthContext,
} from "LojaUniversal";

export default function StoreSettings(props) {
  const [isLoading, setIsLoading] = useState(false);

  const [cnpj, setCnpj] = useState("");
  const [ie, setIe] = useState("");
  const [corporateName, setCorporateName] = useState("");
  const [store, setStore] = useState("");
  const [category, setCategory] = useState("");
  const [logoImage, setLogoImage] = useState("");

  const auth = useContext(AuthContext);
  const history = useHistory();
  const { storeName } = useParams();

  const cnpjChangeHandler = (event) => {
    setCnpj(event.target.value);
  };

  const ieChangeHandler = (event) => {
    setIe(event.target.value);
  };

  const corporateNameChangeHandler = (event) => {
    setCorporateName(event.target.value);
  };

  const logoImageChangeHandler = (event) => {
    setLogoImage(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
  };

  const handleButtonAction = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const updatedStore = {
      cnpj,
      ie,
      corporateName,
      category,
      logoImage,
    };

    const response = await fetch(EndPoint.seller.editStore(storeName), {
      method: "PATCH",
      body: JSON.stringify(updatedStore),
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
    setIsLoading(false);
    history.push(Paths.SellerDashboard(auth.storeName));
  };

  useEffect(() => {
    const fetchStore = async () => {
      setIsLoading(true);
      const response = await fetch(EndPoint.seller.editStore(storeName), {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });

      if (response.status < 200 || response.status > 299) {
        history.push(Paths.ErrorModal);
        return;
      }

      const responseData = await response.json();
      const { cnpj, ie, corporateName, name, category, logoImage } =
        responseData;

      setCnpj(cnpj);
      setIe(ie);
      setCorporateName(corporateName);
      setStore(name);
      setCategory(category);

      setLogoImage(logoImage);

      setIsLoading(false);
    };

    fetchStore();
  }, [auth.token, storeName, history]);

  return (
    <>
      <Box>
        <NavBar />
        {isLoading && <BoxLoading />}
        {!isLoading && (
          <Container
            component="main"
            maxWidth="xs"
            sx={{
              mt: 10,
              p: 2,
              background: "#F2F2F2",
              borderRadius: "20px",
            }}
          >
            <Box
              sx={{
                marginTop: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "centerx",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} align="center">
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      fontWeight: "400",
                      fontSize: "30px",
                      lineHeight: "36px",
                      color: "black",
                      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    Alterar Dados da Loja
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <SignUpTextField
                    label="Nome Fantasia"
                    value={store}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <PatternFormat
                    format="##.###.###/####-##"
                    label="CNPJ"
                    value={cnpj}
                    onChange={cnpjChangeHandler}
                    customInput={SignUpTextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <NumericFormat
                    label="Inscrição Estadual"
                    value={ie}
                    onChange={ieChangeHandler}
                    customInput={SignUpTextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SignUpTextField
                    label="Razão Social"
                    value={corporateName}
                    onChange={corporateNameChangeHandler}
                  />
                </Grid>

                <Grid item xs={12}>
                  <SignUpTextField
                    required={false}
                    label="Logo da Empresa"
                    value={logoImage}
                    onChange={logoImageChangeHandler}
                  />
                </Grid>

                <Grid item xs={12}>
                  <SignUpTextField
                    label="Categoria"
                    value={category}
                    onChange={categoryChangeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    onClick={handleButtonAction}
                    fullWidth
                    variant="contained"
                    sx={{
                      height: "48px",
                      mb: 2,
                      borderRadius: "10px",
                      backgroundColor: "#EB445A",
                      "&:hover": {
                        backgroundColor: "#631740",
                      },
                    }}
                  >
                    Atualizar dados
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
}
