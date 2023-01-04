import { Button, Grid, Typography, Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { NumericFormat, PatternFormat } from "react-number-format";
import { useHistory, useParams } from "react-router-dom";

import {
  EndPoint,
  Paths,
  SignUpTextField,
  BoxLoading,
  NavBar,
  useHttp,
} from "LojaUniversal";

export default function StoreSettings() {
  const [cnpj, setCnpj] = useState("");
  const [ie, setIe] = useState("");
  const [corporateName, setCorporateName] = useState("");
  const [store, setStore] = useState("");
  const [category, setCategory] = useState("");
  const [logoImage, setLogoImage] = useState("");

  const history = useHistory();
  const { storeName } = useParams();
  const { isLoading, sendRequest } = useHttp();

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

    const updatedStore = {
      cnpj,
      ie,
      corporateName,
      category,
      logoImage,
    };

    const responseData = await sendRequest(
      EndPoint.seller.editStore(storeName),
      false,
      "PATCH",
      JSON.stringify(updatedStore)
    );

    console.log(responseData);
    history.push(Paths.SellerDashboard(storeName));
  };

  useEffect(() => {
    const fetchStore = async () => {
      const responseData = await sendRequest(
        EndPoint.seller.editStore(storeName),
        false
      );

      const { cnpj, ie, corporateName, name, category, logoImage } =
        responseData;

      setCnpj(cnpj);
      setIe(ie);
      setCorporateName(corporateName);
      setStore(name);
      setCategory(category);

      setLogoImage(logoImage);
    };

    fetchStore();
  }, [sendRequest, storeName, history]);

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
