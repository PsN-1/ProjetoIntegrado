import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { CssBaseline, Link, Box, Grid, Typography } from "@mui/material";
import SignUpTextField from "../components/SignUpTextField";
import { SignUpButton, LoginButton } from "../components/SignUpButton";
import Copyright from "../../shared/components/Copyright";
import { EndPoint, Paths } from "../../Routes";
import React from "react";
import Loading from "../../shared/components/Loading";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";

export default function Login() {
  const [loginAction, setLoginAction] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const auth = useContext(AuthContext)
  const history = useHistory();
  let email = "";
  let password = "";

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsloading(true);
    if (!(password.length > 6 && email)) {
      setIsloading(false);
      return;
    }

    const response = await fetch(EndPoint.seller.login, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsloading(false);
    if (response.status !== 200) {
      history.push(Paths.ErrorModal);
      return;
    }

    const responseData = await response.json();
    
    auth.login(responseData.storeName, responseData.token)
    setLoginAction(true);
  };

  const handleEmailField = (event) => {
    email = event.target.value;
  };

  const handlePasswordField = (event) => {
    password = event.target.value;
  };

  return (
    <React.Fragment>
      {isLoading && <Loading />}
      {!isLoading && (
        <Grid container component="main" sx={{ height: "100vh" }}>
          {loginAction && (
            <Redirect to={Paths.SellerDashboard(auth.storeName)} />
          )}
          <CssBaseline />

          <Grid item xs={12} sm={8} md={3}>
            <Box
              sx={{
                height: "100vh",
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  fontStyle: "italic",
                  fontWeight: "600",
                  fontSize: "60px",
                  lineHeight: "73px",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                Loja
                <br /> Universal
              </Typography>

              <SignUpTextField
                onChange={handleEmailField}
                label="Email"
                margin="normal"
                type="email"
                autoComplete="email"
              />

              <SignUpTextField
                onChange={handlePasswordField}
                label="Password"
                margin="normal"
                type="password"
              />

              <LoginButton onClick={handleSubmit} buttoncolor="#EB445A">
                Login
              </LoginButton>
              <SignUpButton to={Paths.SignupUser} buttoncolor="#11445A">
                Cadastre-se
              </SignUpButton>
              <Grid container justifyContent="flex-end">
                <Grid item  >
                  <Link href={Paths.ForgotPassword} variant="body2">
                    Esqueci a Senha
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Grid>

          <Grid
            item
            xs={false}
            sm={4}
            md={9}
            sx={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>
      )}
    </React.Fragment>
  );
}
