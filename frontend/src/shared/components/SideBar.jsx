import { Container, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Paths, STORE_NAME } from "../../Routes";

const Item = styled(Paper)(({ theme }) => ({
  background: "#F2F2F2",
  borderRadius: "20px",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function SideBar(props) {
  return (
    <Container>
      <Item>
        <h1>{props.title}:</h1>
        {props.items.map((item) => (
          <h3 key={item}>
            <Link to={getPathFor(item)} underline="always" color="inherit">
              {item}
            </Link>
          </h3>
        ))}
      </Item>
    </Container>
  );
}

function getPathFor(item) {
  if (item === "Produtos") {
    return Paths.SellerProducts(STORE_NAME);
  } else if (item === "Dashboard") {
    return Paths.SellerDashboard(STORE_NAME);
  }

  return "#";
}
