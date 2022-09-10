import { useState } from "react";
import { Redirect } from "react-router-dom";

import { CssBaseline, Link, Box, Grid, Typography } from "@mui/material";

import SignUpTextField from "../components/SignUpTextField";
import { SignUpButton, LoginButton } from "../components/SignUpButton";
import Copyright from "../../shared/components/Copyright";
import { getStoreName, Paths, setStoreName } from "../../Routes";

export default function Login(props) {
  const [loginAction, setLoginAction] = useState(false);

  let email = "";
  let password = "";

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!(password.length > 6 && email)) {
      return;
    }
    console.log({
      email,
      password,
    });

    setStoreName(email);
    // TODO: Get store name from server
    setLoginAction(true);
  };

  const handleEmailField = (event) => {
    email = event.target.value;
  };

  const handlePasswordField = (event) => {
    password = event.target.value;
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {loginAction && <Redirect to={Paths.SellerDashboard(getStoreName())} />}
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

          <Grid container>
            <Grid item xs>
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
  );
}

/* <RouteLink to="/:lojaName">
<Button
  fullWidth
  variant="contained"
  sx={{
    mt: 3,
    mb: 2,
    height: "48px",
    borderRadius: "10px",
    backgroundColor: "#EB445A",
    "&:hover": {
      backgroundColor: "#631740",
    },
  }}
>
  RouteLink
</Button>
</RouteLink>

<Button
   fullWidth
   href="/:lojaName"
   variant="contained"
   sx={{
     mt: 3,
     mb: 2,
     height: "48px",
     borderRadius: "10px",
     backgroundColor: "#EB445A",
     "&:hover": {
       backgroundColor: "#631740",
     },
   }}
>Link</Button> */
