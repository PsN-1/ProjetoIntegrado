import { Link, useHistory, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Paths, AuthContext, UserCartContext } from "LojaUniversal";
import {
  AppBar,
  Toolbar,
  styled,
  alpha,
  Box,
  Container,
  Badge,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";

import {
  Dashboard,
  Search as SearchIcon,
  Storefront,
  Person,
  ShoppingCart,
  Favorite,
} from "@mui/icons-material";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const NavBar = () => {
  const auth = useContext(AuthContext);
  const cart = useContext(UserCartContext);
  const history = useHistory();
  const { storeName } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [productsCount, setProductsCount] = useState(0);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    history.push(Paths.Login);
  };

  const handleUserSettingsClick = () => {
    history.push(Paths.UserSettings(storeName));
  };

  const handleStoreSettingsClick = () => {
    history.push(Paths.StoreSettings(storeName));
  };

  useEffect(() => {
    setProductsCount(cart.products.length);
  }, [cart.products.length]);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2C5967" }}>
      <Container>
        <StyledToolbar>
          <Link to={Paths.MainPageStore(storeName)} color="transparent">
            <Storefront sx={{ fontSize: 45, color: "white" }} />
          </Link>
          {auth.isloggedIn && (
            <Link to={Paths.SellerDashboard(auth.storeName)}>
              <Dashboard sx={{ fontSize: 45, color: "white" }} />
            </Link>
          )}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box
            sx={{
              display: "flex",
              gap: "30px",
            }}
          >
            <Link to={Paths.UserCart(storeName)}>
              <StyledBadge badgeContent={productsCount} color="info">
                <ShoppingCart sx={{ fontSize: 45, color: "white" }} />
              </StyledBadge>
            </Link>

            <Favorite sx={{ fontSize: 45 }} />
            <Person sx={{ fontSize: 45 }} onClick={handleClick} />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {!auth.isloggedIn && (
                <MenuItem onClick={handleLoginClick}>Login</MenuItem>
              )}

              {auth.isloggedIn && (
                <div>
                  <MenuItem onClick={handleUserSettingsClick}>
                    My account
                  </MenuItem>
                  <MenuItem onClick={handleStoreSettingsClick}>
                    My Store
                  </MenuItem>
                  <MenuItem onClick={auth.logout}>Logout</MenuItem>
                </div>
              )}
            </Menu>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
