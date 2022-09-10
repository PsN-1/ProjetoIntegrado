import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const Product = (props) => {
  return (
    <Card sx={{ borderRadius: "10px" }}>
      <CardActionArea>
        <CardMedia component="img" src={props.image} sx={{ height: 250 }} />
        <CardContent>
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              lineHeight: "24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {props.name}
            <br />
            <br />
            R${props.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Product;
