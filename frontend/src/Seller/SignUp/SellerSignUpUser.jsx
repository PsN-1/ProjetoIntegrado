import { Grid } from "@mui/material";
import SignUpTextField from "../components/SignUpTextField";
import SellerSignUp from "./SellerSignUp";

const SellerSignUpUser = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <SellerSignUp title="Cadastrar Novo Cliente" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <SignUpTextField label="Nome" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SignUpTextField label="Sobrenome" />
        </Grid>
        <Grid item xs={12}>
          <SignUpTextField label="Email" />
        </Grid>
        <Grid item xs={12}>
          <SignUpTextField label="CPF" />
        </Grid>
        <Grid item xs={12}>
          <SignUpTextField label="Endereço" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SignUpTextField label="Cidade" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SignUpTextField label="Estado" />
        </Grid>
        <Grid item xs={12}>
          <SignUpTextField label="CEP" />
        </Grid>
      </Grid>
    </SellerSignUp>
  );
};

export default SellerSignUpUser;
