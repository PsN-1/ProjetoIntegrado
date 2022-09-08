import { styled, TextField } from "@mui/material";

const SignUpTextField = (props) => {
  return (
    <CssTextField
      id={props.label}
      required
      fullWidth
      value ={props.value}
      onChange={props.onChange}
      inputProps={{
        style: {
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: "10px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          ...props  
        },
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

export default SignUpTextField