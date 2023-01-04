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

export default function UserSettings() {
  const { isLoading, sendRequest } = useHttp();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [number, setNumber] = useState("");

  const history = useHistory();
  const { storeName } = useParams();

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const lastnameChangeHandler = (event) => {
    setLastname(event.target.value);
  };
  const cepChangeHandler = (event) => {
    setCep(event.target.value);
  };
  const numberChangeHandler = (event) => {
    setNumber(event.target.value);
  };

  const handleButtonAction = async (event) => {
    event.preventDefault();

    const updatedUser = {
      name: name,
      lastname: lastname,
      postalCode: cep,
      number: number,
    };

    const responseData = await sendRequest(
      EndPoint.seller.editSeller(storeName),
      false,
      "PATCH",
      JSON.stringify(updatedUser)
    );

    console.log(responseData);
    history.push(Paths.SellerDashboard(storeName));
  };

  useEffect(() => {
    const fetchSeller = async () => {
      const responseData = await sendRequest(
        EndPoint.seller.editSeller(storeName),
        false
      );
      const { name, lastname, email, cpf, postalCode, number } = responseData;

      setName(name);
      setLastname(lastname);
      setEmail(email);
      setCpf(cpf);
      setCep(postalCode);
      setNumber(number);
    };

    fetchSeller();
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
                    Alterar Dados do Usuário
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SignUpTextField
                    label="Nome"
                    value={name}
                    onChange={nameChangeHandler}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <SignUpTextField
                    label="Sobrenome"
                    value={lastname}
                    onChange={lastnameChangeHandler}
                  />
                </Grid>

                <Grid item xs={12}>
                  <SignUpTextField label="Email" value={email} disabled />
                </Grid>
                <Grid item xs={12}>
                  <PatternFormat
                    format="###.###.###-##"
                    label="CPF"
                    value={cpf}
                    customInput={SignUpTextField}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PatternFormat
                    format="##.###-###"
                    label="Cep"
                    value={cep}
                    onChange={cepChangeHandler}
                    customInput={SignUpTextField}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <NumericFormat
                    customInput={SignUpTextField}
                    label="Numero"
                    value={number}
                    onChange={numberChangeHandler}
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
