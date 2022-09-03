import { Typography } from "@mui/material";

export default function LabelTypography(props) {
  return (
    <Typography
      sx=
      {{
        p: 1,
        fontStyle: "italic",
        fontWeight: "400",
        fontSize: "24px",
        lineHeight: "29px",
        ...props,
      }}
      >{props.children}
    </Typography>
  );
}