import { Box, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { EndPoint, Paths, BoxLoading } from "../../../LojaUniversal";

const image =
  "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

const Carousel = (props) => {
  const [logoImage, setLogoImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchLogoImage = async () => {
      setIsLoading(true);
      const response = await fetch(EndPoint.user.storeLogoImage(props.title));

      if (response.status < 200 || response.status > 299) {
        history.push(Paths.ErrorModal);
        return;
      }

      const responseData = await response.json();

      setLogoImage(responseData.logoImage ? responseData.logoImage : image);
      setIsLoading(false);
    };
    fetchLogoImage();
  }, [history, props.title]);

  return (
    <>
      {isLoading ? (
        <BoxLoading />
      ) : (
        <Box paddingX={5} paddingY={3}>
          <Paper
            elevation={3}
            sx={{
              position: "relative",
              backgroundColor: "grey.800",
              color: "#fff",
              mb: 4,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: `url(${logoImage})`,
            }}
          >
            <Box
              sx={{
                position: "relative",
                p: { xs: 2, md: 2 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component="h1"
                variant="h1"
                color="inherit"
                gutterBottom
                sx={{ textShadow: "0px 4px 4px #000000" }}
                position="relative"
                height="100%"
                width="100%"
                justifyContent="center"
                alignItems="center"
                display="flex"
                backgroundColor="none"
                fontFamily="Comic Sans MS"
              >
                {props.title}
              </Typography>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default Carousel;
