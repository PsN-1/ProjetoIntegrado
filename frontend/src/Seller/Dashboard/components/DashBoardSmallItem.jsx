import { Paper, Typography } from "@mui/material";

export default function DashBoardSmallItem(props) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        height: "160px",
        background: "#F2F2F2",
        borderRadius: "20px",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontStyle: "italic",
          fontWeight: "400",
          fontSize: "30px",
          lineHeight: "36px",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          ...props,
        }}
      >
        {props.title}: <br />
        <br />
        {props.value}
      </Typography>
    </Paper>
  );
}
