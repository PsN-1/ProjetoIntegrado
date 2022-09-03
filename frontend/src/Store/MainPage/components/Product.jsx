import {
  Card,
  CardActionArea,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Product = (props) => {
  return (
    <Card >
      <CardActionArea>
        <CardMedia component="img" src={props.image} sx={{ height: 250 }} />
        <Typography>{props.name}</Typography>
        <p>por: R${props.price}</p>
      </CardActionArea>
    </Card>
  );
};

export default Product;
