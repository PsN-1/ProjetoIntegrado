import {
  Box,
  Button,
  CssBaseline,
  Typography,
  Grid,
  Container,
} from "@mui/material";

const SellerSignUp = (props) => {
  return (
    <Grid
      container
      sx={{
        height: "100vh",
        backgroundAttachment: "scroll",
        backgroundPosition: "center",
        backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        display: "flex",

        backgroundImage:
          "url(https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80)",
      }}
    >
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "centerx",
          }}
        >
          <Typography
            sx={{
              fontStyle: "italic",
              fontWeight: "600",
              fontSize: "60px",
              lineHeight: "73px",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              color: "#FFFFFF",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            Loja Universal
          </Typography>
          <Typography
            sx={{
              fontStyle: "italic",
              fontWeight: "600",
              fontSize: "40px",
              lineHeight: "48px",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              color: "#FFFFFF",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            {props.title}
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={props.onSubmit}
            sx={{ mt: 3 }}
          >
            {props.children}
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
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
};

export default SellerSignUp;
