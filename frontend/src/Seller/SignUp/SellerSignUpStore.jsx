import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { NumericFormat, PatternFormat } from "react-number-format";
import { useHistory } from "react-router-dom";

import {
  EndPoint,
  Paths,
  Loading,
  AuthContext,
  SignUpTextField,
  SellerSignUp,
  useHttp,
} from "LojaUniversal";

const SellerSignUpStore = (props) => {
  const { isLoading, sendRequest } = useHttp();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const newStore = {
      cnpj: data.get("cnpj"),
      ie: data.get("ie"),
      corporateName: data.get("razaoSocial"),
      name: data.get("nomeFantasia"),
      category: data.get("categoria"),
      email: props.location.state.email,
    };

    console.log(newStore);

    const responseData = await sendRequest(
      EndPoint.seller.createStore,
      false,
      "POST",
      JSON.stringify(newStore)
    );

    console.log(responseData);
    auth.login(responseData.storeName, responseData.token);

    history.push(Paths.SellerDashboard(responseData.storeName));
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <SellerSignUp title="Cadastrar Nova Loja" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PatternFormat
                format="##.###.###/####-##"
                label="CNPJ"
                name="cnpj"
                customInput={SignUpTextField}
              />
            </Grid>
            <Grid item xs={12}>
              <NumericFormat
                label="Inscrição Estadual"
                name="ie"
                customInput={SignUpTextField}
              />
            </Grid>
            <Grid item xs={12}>
              <SignUpTextField label="Razão Social" name="razaoSocial" />
            </Grid>
            <Grid item xs={12}>
              <SignUpTextField label="Nome Fantasia" name="nomeFantasia" />
            </Grid>
            <Grid item xs={12}>
              <SignUpTextField label="Categoria" name="categoria" />
            </Grid>
          </Grid>
        </SellerSignUp>
      )}
    </>
  );
};

export default SellerSignUpStore;
