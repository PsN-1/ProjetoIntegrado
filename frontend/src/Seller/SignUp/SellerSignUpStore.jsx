import Grid from "@mui/material/Grid";
import SignUpTextField from "./components/SignUpTextField";
import SellerSignUp from "./SellerSignUp";

const SellerSignUpStore = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <SellerSignUp title="Cadastrar Nova Loja" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SignUpTextField label="CNPJ" />
        </Grid>
        <Grid item xs={12}>
          <SignUpTextField label="Inscrição Estadual" />
        </Grid>
        <Grid item xs={12}>
          <SignUpTextField label="Razão Social" />
        </Grid>
        <Grid item xs={12}>
          <SignUpTextField label="Nome Fantasia" />
        </Grid>
        <Grid item xs={12}>
          <SignUpTextField label="Categoria" />
        </Grid>
      </Grid>
    </SellerSignUp>
  );
};

export default SellerSignUpStore;
