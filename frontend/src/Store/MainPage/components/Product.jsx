import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Paths } from "LojaUniversal";

const Product = (props) => {
  const { storeName } = useParams();

  return (
    <Card sx={{ borderRadius: "10px" }}>
      <CardActionArea
        component={Link}
        to={Paths.DetailProductStore(storeName, props.id)}
      >
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
            {props.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Product;
