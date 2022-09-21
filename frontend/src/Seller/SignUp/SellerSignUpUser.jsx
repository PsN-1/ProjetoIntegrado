import { Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import { PatternFormat, NumericFormat } from "react-number-format";
import { useHistory } from "react-router-dom";
import { EndPoint, Paths } from "../../Routes";
import Loading from "../../shared/components/Loading";
import SignUpTextField from "../components/SignUpTextField";
import SellerSignUp from "./SellerSignUp";

const SellerSignUpUser = () => {
  const [isLoading, setIsloading] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const history = useHistory();

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

    if (newSeller.password !== newSeller.password2) {
      setIsloading(false);
      setInvalidPassword(true);
      return;
    }

    const response = await fetch(EndPoint.seller.createSeller, {
      method: "POST",
      body: JSON.stringify(newSeller),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    setIsloading(false);
    history.push({
      pathname: Paths.SignupStore,
      state: { email: responseData.email },
    });
  };

  return (
    <React.Fragment>
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
              <PatternFormat
                format="###.###.###-##"
                label="CPF"
                name="cpf"
                customInput={SignUpTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PatternFormat
                format="##.###-###"
                label="Cep"
                name="cep"
                customInput={SignUpTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <NumericFormat
                customInput={SignUpTextField}
                label="Numero"
                name="numero"
              />
            </Grid>
            <Grid item xs={12}>
              <SignUpTextField
                error={invalidPassword}
                helperText={invalidPassword ? "Passwords don't match" : ""}
                onFocus={() => setInvalidPassword(false)}
                label="Senha"
                name="senha"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <SignUpTextField
                error={invalidPassword}
                helperText={invalidPassword ? "Passwords don't match" : ""}
                onFocus={() => setInvalidPassword(false)}
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
