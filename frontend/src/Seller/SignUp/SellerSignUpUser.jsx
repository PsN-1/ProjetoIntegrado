import { Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { EndPoint, Paths } from "../../Routes";
import Loading from "../../shared/components/Loading";
import SignUpTextField from "../components/SignUpTextField";
import SellerSignUp from "./SellerSignUp";

const SellerSignUpUser = () => {
  const [submitAction, setSubmitAction] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsloading(true);

    const data = new FormData(event.currentTarget);
    const newSeller = {
      name: data.get("nome"),
      lastname: data.get("sobrenome"),
      email: data.get("email"),
      cpf: data.get("cpf"),
      postalCode: data.get("cep"),
      number: data.get("numero"),
      password: data.get("senha"),
      password2: data.get("senha2"),
    };

    const response = await fetch(EndPoint.seller.createSeller, {
      method: "POST",
      body: JSON.stringify(newSeller),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json()
    console.log(responseData)
    setEmail(newSeller.email);
    setIsloading(false);
    setSubmitAction(true);
  };

  return (
    <React.Fragment>
      {submitAction && (
        <Redirect
          push
          to={{
            pathname: Paths.SignupStore,
            state: { email: email },
          }}
        />
      )}
      {isLoading && <Loading />}
      {!isLoading && (
        <SellerSignUp title="Cadastrar Novo Cliente" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <SignUpTextField label="Nome" name="nome" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SignUpTextField label="Sobrenome" name="sobrenome" />
            </Grid>
            <Grid item xs={12}>
              <SignUpTextField label="Email" name="email" />
            </Grid>
            <Grid item xs={12}>
              <SignUpTextField label="CPF" name="cpf" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SignUpTextField label="Cep" name="cep" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SignUpTextField label="Numero" name="numero" />
            </Grid>
            <Grid item xs={12}>
              <SignUpTextField label="Senha" name="senha" type="password" />
            </Grid>
            <Grid item xs={12}>
              <SignUpTextField
                label="Repetir Senha"
                name="senha2"
                type="password"
              />
            </Grid>
          </Grid>
        </SellerSignUp>
      )}
    </React.Fragment>
  );
};

export default SellerSignUpUser;
