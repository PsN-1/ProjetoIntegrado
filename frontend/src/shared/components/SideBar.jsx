import { Container, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Paths, AuthContext } from "LojaUniversal";

const Item = styled(Paper)(({ theme }) => ({
  background: "#F2F2F2",
  borderRadius: "20px",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function SideBar(props) {
  const auth = useContext(AuthContext);

  return (
    <Container>
      <Item>
        <h1>{props.title}:</h1>
        {props.items.map((item) => (
          <h3 key={item}>
            {props.title === "Guia Rápido" && (
              <Link
                to={getPathFor(item, auth.storeName)}
                underline="always"
                color="inherit"
              >
                {item}
              </Link>
            )}

            {props.title === "Tipo de produto" && (
              <Link
                to={() => {}}
                onClick={() => props.onClick(item)}
                underline="always"
                color="inherit"
              >
                {item}
              </Link>
            )}
          </h3>
        ))}
      </Item>
    </Container>
  );
}

function getPathFor(item, storeName) {
  if (item === "Produtos") {
    return Paths.SellerProducts(storeName);
  } else if (item === "Dashboard") {
    return Paths.SellerDashboard(storeName);
  }

  return "#";
}
