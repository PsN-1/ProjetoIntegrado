import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import SignUpTextField from "../components/SignUpTextField";
import SellerSkeleton from "./SellerSkeleton";

export default function SellerNewProduct(props) {
  const handleButtonAction = (event) => {
    event.preventDefault();
  };
  return (
    <SellerSkeleton>
      <Typography
        sx={{
          paddingLeft: 5,
          textAlign: "left",
          fontStyle: "italic",
          fontWeight: "400",
          fontSize: "24px",
          lineHeight: "29px",
        }}
      >
        {" "}
        Novo Produto
      </Typography>
      <Grid container>
        <Grid item xs={8}>
          <Paper
            sx={{
              background: "#F2F2F2",
              borderRadius: "20px",
            }}
          >
            <Container>
              <Box
                component="form"
                noValidate
                onSubmit={handleButtonAction}
                sx={{
                  p: 3,
                  mt: 3,
                }}
              >
                <SignUpTextField label="Nome" margin="normal"></SignUpTextField>
                <SignUpTextField
                  label="Imagem"
                  margin="normal"
                ></SignUpTextField>
                <SignUpTextField
                  label="Descricao"
                  margin="normal"
                  height="180px"
                ></SignUpTextField>
                <SignUpTextField
                  label="Quantidade"
                  margin="normal"
                ></SignUpTextField>
                <SignUpTextField
                  label="Valor"
                  margin="normal"
                ></SignUpTextField>

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
                  Cadastrar Produto
                </Button>
              </Box>
            </Container>
          </Paper>
        </Grid>
      </Grid>
    </SellerSkeleton>
  );
}
