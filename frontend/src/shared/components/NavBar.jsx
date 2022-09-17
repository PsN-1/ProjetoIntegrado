import { AppBar, Toolbar, styled, alpha, Box, Container } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Person from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Paths } from "../../Routes";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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

const NavBar = () => {
  const auth = useContext(AuthContext);
  const { storeName } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2C5967" }}>
      <Container>
        <StyledToolbar>
          <Link to={Paths.MainPageStore(storeName)} color="transparent">
            <StorefrontIcon sx={{ fontSize: 45, color: "white" }} />
          </Link>
          {auth.isloggedIn && (
            <Link to={Paths.SellerDashboard(auth.storeName)}>
              <DashboardIcon sx={{ fontSize: 45, color: "white" }} />
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
            <ShoppingCartIcon sx={{ fontSize: 45 }} />
            <FavoriteIcon sx={{ fontSize: 45 }} />
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
                <>
                  <MenuItem onClick={handleClose}>Login</MenuItem>
                </>
              )}

              {auth.isloggedIn && (
                <>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>My Store</MenuItem>
                  <MenuItem onClick={auth.logout}>Logout</MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
