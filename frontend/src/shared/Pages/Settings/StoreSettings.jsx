import { Button, Grid, Typography, Box, Container } from "@mui/material";
import { useState } from "react";
import { NumericFormat, PatternFormat } from "react-number-format";
import SignUpTextField from "../../../Seller/components/SignUpTextField";
import NavBar from "../../components/NavBar";

export default function StoreSettings(props) {
  const [isLoading, setIsloading] = useState(false);

  const [cnpj, setCnpj] = useState("");
  const [ie, setIe] = useState("");
  const [corporateName, setCorporateName] = useState("");
  const [store, setStore] = useState("");
  const [category, setCategory] = useState("");

  const cnpjChangeHandler = (event) => {
    setCnpj(event.target.value);
  };

  const ieChangeHandler = (event) => {
    setIe(event.target.value);
  };

  const corporateNameChangeHandler = (event) => {
    setCorporateName(event.target.value);
  };

  const storeChangeHandler = (event) => {
    setStore(event.target.value);
  };

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
                Alterar Dados da Loja
              </Typography>
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
                label="Nome Fantasia"
                value={store}
                onChange={storeChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <SignUpTextField
                label="Categoria"
                value={category}
                onChange={corporateNameChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
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
