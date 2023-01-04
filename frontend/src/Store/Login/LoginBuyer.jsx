import {
  Copyright,
  EndPoint,
  Loading,
  NavBar,
  Paths,
  useHttp,
} from "LojaUniversal";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Container,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { NumericFormat, PatternFormat } from "react-number-format";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const theme = createTheme();

export default function SignUp() {
  const [invalidPassword, setInvalidPassword] = useState(false);

  const { isLoading, sendRequest } = useHttp();
  const history = useHistory();
  const { storeName } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const newBuyer = {
      name: data.get("firstName"),
      lastname: data.get("lastName"),
      cpf: data.get("cpf"),
      postalCode: data.get("cep"),
      number: data.get("numero"),
      email: data.get("email"),
      password: data.get("password"),
      password2: data.get("password2"),
    };

    console.log(newBuyer);
    console.log(JSON.stringify(newBuyer));

    if (newBuyer.password !== newBuyer.password2) {
      setInvalidPassword(true);
      return;
    }

    await sendRequest(
      EndPoint.user.createBuyer(storeName),
      true,
      "POST",
      JSON.stringify(newBuyer),
    );

    history.push(Paths.MainPageStore);
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <ThemeProvider theme={theme}>
          <NavBar />
          <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Box
              sx={{
                marginTop: 8,
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
                Loja Universal
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PatternFormat
                      format="###.###.###-##"
                      label="CPF"
                      name="cpf"
                      required
                      fullWidth
                      customInput={TextField}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <PatternFormat
                      required
                      fullWidth
                      format="##.###-###"
                      label="Cep"
                      name="cep"
                      customInput={TextField}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <NumericFormat
                      required
                      fullWidth
                      customInput={TextField}
                      label="Numero"
                      name="numero"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      error={invalidPassword}
                      helperText={
                        invalidPassword ? "Passwords dont' match" : ""
                      }
                      onFocus={() => setInvalidPassword(false)}
                      required
                      fullWidth
                      name="password"
                      label="Senha"
                      type="password"
                      autoComplete="new-password"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      error={invalidPassword}
                      helperText={
                        invalidPassword ? "Passwords dont' match" : ""
                      }
                      onFocus={() => setInvalidPassword(false)}
                      required
                      fullWidth
                      name="password2"
                      label="Repetir senha"
                      type="password"
                      autoComplete="new-password"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href={Paths.Login} variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}
