import { Button, Grid, Typography, Box, Container } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { NumericFormat, PatternFormat } from "react-number-format";
import { useParams } from "react-router-dom";
import SignUpTextField from "../../../Seller/components/SignUpTextField";
import NavBar from "../../components/NavBar";

export default function UserSettings() {
  const [isLoading, setIsloading] = useState(false);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [number, setNumber] = useState("");

  const { storeName } = useParams();

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const lastnameChangeHandler = (event) => {
    setLastname(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const cpfChangeHandler = (event) => {
    setCpf(event.target.value);
  };
  const cepChangeHandler = (event) => {
    setCep(event.target.value);
  };
  const numberChangeHandler = (event) => {
    setNumber(event.target.value);
  };

  const handleButtonAction = async (event) => {};

  // useEffect(() => {
  //   const fetchStore = async () => {
  //     setIsloading(true);
  //     const response = await fetch();
  //   };
  // });

  return (
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
              <SignUpTextField
                label="Email"
                value={email}
                onChange={emailChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <PatternFormat
                format="###.###.###-##"
                label="CPF"
                value={cpf}
                onChange={cpfChangeHandler}
                customInput={SignUpTextField}
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
                onSubmit={handleButtonAction}
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
  );
}
