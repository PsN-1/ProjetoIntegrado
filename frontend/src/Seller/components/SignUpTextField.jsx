import { styled, TextField } from "@mui/material";

export const SignUpTextField = (props) => {
  return (
    <CssTextField
      id={props.label}
      required
      fullWidth
      value={props.value}
      onChange={props.onChange}
      inputProps={{
        style: {
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: "10px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          ...props,
        },
      }}
      {...props}
    />
  );
};

export const DescriptionTextField = (props) => {
  return (
    <CssDescriptionTextField
      id={props.label}
      required
      fullWidth
      value={props.value}
      onChange={props.onChange}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: "20px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
      {...props}
    />
  );
};

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "gray",
      borderRadius: "10px",
    },
  },
});

const CssDescriptionTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  "& .MuiOutlinedInput-root": {
    '& fieldset': {
      borderRadius: "20px",
    },

    "&.Mui-focused fieldset": {
      borderColor: "gray",
      borderRadius: "20px",
    },
  },
});

