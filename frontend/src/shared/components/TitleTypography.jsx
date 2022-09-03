import { Typography } from "@mui/material";

export default function TitleTypography(props) {
    return (
      <Typography
        sx={{
          fontStyle: "italic",
          fontWeight: "600",
          fontSize: "24px",
          lineHeight: "29px",
          ...props,
        }}
      >
        {props.children}
      </Typography>
    );
  };