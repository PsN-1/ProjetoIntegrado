import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function SignUpButton(props) {
  return (
    <Button
      component={RouterLink}
      to="/"
      type="submit"
      fullWidth
      variant="contained"
      sx={{
        mt: 3,
        mb: 2,
        height: "48px",
        borderRadius: "10px",
        backgroundColor: props.buttoncolor,
        "&:hover": {
          backgroundColor: "#631740",
        },
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
}

export function LoginButton(props) {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{
        mt: 3,
        mb: 2,
        height: "48px",
        borderRadius: "10px",
        backgroundColor: props.buttoncolor,
        "&:hover": {
          backgroundColor: "#631740",
        },
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
}