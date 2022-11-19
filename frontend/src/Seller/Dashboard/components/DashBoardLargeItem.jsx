import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import { LabelTypography, TitleTypography } from "LojaUniversal";

export default function DashBoardLargeItem(props) {
  return (
    <Box paddingTop={5}>
      <Typography
        sx={{
          textAlign: "left",
          fontStyle: "italic",
          fontWeight: "400",
          fontSize: "24px",
          lineHeight: "29px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {props.title}
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          background: "#F2F2F2",
          borderRadius: "20px",
          alignItems: "center",
        }}
      >
        <Container>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <TitleTypography textAlign="left">Produto</TitleTypography>
              <LabelTypography textAlign="left" p={2}>
                {props.product}
              </LabelTypography>
            </Grid>
            <Grid item xs={3}>
              <TitleTypography>Quantidade</TitleTypography>
              <LabelTypography>{props.quantity}</LabelTypography>
            </Grid>
            <Grid item xs={3}>
              {props.value && <TitleTypography>Valor</TitleTypography>}
              {props.value && (
                <LabelTypography>R$ {props.value}</LabelTypography>
              )}
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </Box>
  );
}
