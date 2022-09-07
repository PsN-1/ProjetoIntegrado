import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SignUpTextField from "../components/SignUpTextField";
import Copyright from "../../shared/components/Copyright";

export default function ForgetPassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />

      <Grid item xs={12} sm={8} md={3} component={Paper} square>
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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <SignUpTextField label="CPF / CNPJ" margin="normal" />

            <SignUpTextField label="E-mail" margin="normal" />

            <Button
              type="submit"
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
              Recuperar Senha
            </Button>

            <Copyright sx={{ mt: 5 }} />
          </Box>
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
