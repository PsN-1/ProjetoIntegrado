import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { EndPoint, getStoreName, Paths, setStoreName } from "../../Routes";
import Loading from "../../shared/components/Loading";
import SignUpTextField from "../components/SignUpTextField";
import SellerSignUp from "./SellerSignUp";

const SellerSignUpStore = (props) => {
  const [submitAction, setSubmitAction] = useState(false);
  const [isLoading, setIsloading] = useState(false);

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
      },
    });

    const responseData = await response.json();

    console.log(responseData);

    setStoreName(newStore.name);
    setIsloading(false);
    setSubmitAction(true);
  };
  return (
    <React.Fragment>
      {submitAction && <Redirect to={Paths.SellerDashboard(getStoreName())} />}
      {isLoading && <Loading />}
      {!isLoading && (
        <SellerSignUp title="Cadastrar Nova Loja" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SignUpTextField label="CNPJ" name="cnpj" />
            </Grid>
            <Grid item xs={12}>
              <SignUpTextField label="Inscrição Estadual" name="ie" />
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
