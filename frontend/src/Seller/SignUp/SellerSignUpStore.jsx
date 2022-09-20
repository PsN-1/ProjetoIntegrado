import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { useContext } from "react";
import { NumericFormat, PatternFormat } from "react-number-format";
import { Redirect } from "react-router-dom";
import { EndPoint, Paths } from "../../Routes";
import Loading from "../../shared/components/Loading";
import { AuthContext } from "../../shared/context/auth-context";
import SignUpTextField from "../components/SignUpTextField";
import SellerSignUp from "./SellerSignUp";

const SellerSignUpStore = (props) => {
  const [submitAction, setSubmitAction] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const auth = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsloading(true);

    const data = new FormData(event.currentTarget);
    const newStore = {
      cnpj: data.get("cnpj"),
      ie: data.get("ie"),
      corporateName: data.get("razaoSocial"),
      name: data.get("nomeFantasia"),
      category: data.get("categoria"),
      email: props.location.state.email
    };

    const response = await fetch(EndPoint.seller.createStore, {
      method: "POST",
      body: JSON.stringify(newStore),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
    });

    const responseData = await response.json();

    console.log(responseData);

    auth.login(responseData.storeName, responseData.token)
    setIsloading(false);
    setSubmitAction(true);
  };

  return (
    <React.Fragment>
      {submitAction && <Redirect to={Paths.SellerDashboard(auth.storeName)} />}
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
              <NumericFormat label="Inscrição Estadual" name="ie" customInput={SignUpTextField}/>
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
    </React.Fragment>
  );
};

export default SellerSignUpStore;
