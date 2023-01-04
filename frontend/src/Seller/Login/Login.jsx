import { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { CssBaseline, Link, Box, Grid, Typography } from "@mui/material";

import {
  SignUpTextField,
  SignUpButton,
  LoginButton,
  Copyright,
  EndPoint,
  Paths,
  Loading,
  AuthContext,
  useHttp,
} from "LojaUniversal";

export default function Login() {
  const [loginAction, setLoginAction] = useState(false);

  const { isLoading, sendRequest } = useHttp();
  const auth = useContext(AuthContext);
  let email = "";
  let password = "";

  useEffect(() => {
    setLoginAction(auth.isloggedIn);
  }, [auth]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!(password.length > 6 && email)) {
      return;
    }

    const responseData = await sendRequest(
      EndPoint.seller.login,
      true,
      "POST",
      JSON.stringify({
        email: email,
        password: password,
      })
    );

    auth.login(responseData.storeName, responseData.token);
    setLoginAction(true);
  };

  const handleEmailField = (event) => {
    email = event.target.value;
  };

  const handlePasswordField = (event) => {
    password = event.target.value;
  };

  return (
    <>
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
                <Grid item>
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
    </>
  );
}
