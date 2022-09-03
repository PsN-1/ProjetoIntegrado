import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import SignUpTextField from "../components/SignUpTextField";
import { Redirect } from "react-router-dom";
import { useState } from "react";

export default function SignInSide() {
  const [loginAction, setLoginAction] = useState(false);
  const [signupAction, setSignupAction] = useState(false);

  let email = "";
  let password = "";

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    console.log({
      email,
      password,
    });
    setLoginAction(true);
  };

  const handleSignup = (event) => {
    event.preventDefault();
    setSignupAction(true);
  };

  const handleEmailField = (event) => {
    email = event.target.value;
  };

  const handlePasswordField = (event) => {
    password = event.target.value;
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {loginAction && <Redirect to="/:storeName/dashboard" />}
      {signupAction && <Redirect to="/signup" />}
      <CssBaseline />

      <Grid item xs={12} sm={8} md={3} component={Paper} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
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
            Login
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSignup}
            sx={{
              mt: 3,
              mb: 2,
              height: "48px",
              borderRadius: "10px",
              backgroundColor: "#11445A",
              "&:hover": {
                backgroundColor: "#631740",
              },
            }}
          >
            Cadastre-se
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgotpassword" variant="body2">
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

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Loja Universal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
