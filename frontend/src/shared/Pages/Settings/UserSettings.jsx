import { Button, Grid, Typography, Box, Container } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { NumericFormat, PatternFormat } from "react-number-format";
import { useHistory, useParams } from "react-router-dom";
import { EndPoint, Paths } from "../../../Routes";
import SignUpTextField from "../../../Seller/components/SignUpTextField";
import Loading from "../../components/Loading";
import NavBar from "../../components/NavBar";
import { AuthContext } from "../../context/auth-context";

export default function UserSettings() {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [number, setNumber] = useState("");

  const auth = useContext(AuthContext);
  const history = useHistory()
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
    setIsLoading(true);

    const updatedUser = {
      name: name,
      lastname: lastname,
      postalCode: cep,
      number: number,
    };

    const response = await fetch(EndPoint.seller.editSeller(storeName), {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
    });

    const responseData = await response.json()
    console.log(responseData)
    setIsLoading(false);
    history.push(Paths.SellerDashboard(auth.storeName))
  };

  useEffect(() => {
    const fetchSeller = async () => {
      setIsLoading(true);
      const response = await fetch(EndPoint.seller.editSeller(storeName), {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });

      const responseData = await response.json();
      const { name, lastname, email, cpf, postalCode, number } = responseData;

      setName(name);
      setLastname(lastname);
      setEmail(email);
      setCpf(cpf);
      setCep(postalCode);
      setNumber(number);

      setIsLoading(false);
    };

    fetchSeller();
  }, [auth.token, storeName]);

  return (
    <React.Fragment>
      {isLoading && <Loading />}
      {!isLoading && (
        <Box>
          <NavBar />
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
        </Box>
      )}
    </React.Fragment>
  );
}
