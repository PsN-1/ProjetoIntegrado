import { Box, Card, CardMedia, Typography } from "@mui/material";

const image = "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3RvcmV8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60";
const Carousel = (props) => {
  return (
    <Box paddingX={5} paddingY={3}>
      <Card elevation={3} position="relative">
        <CardMedia height={200} component="img" src={image} />
        <Typography
          sx={{ textShadow: "0px 4px 4px #000000" }}
          gutterBottom
          variant="h1"
          component="h1"
          position="absolute"
          top="16%"
          width="100%"
          textAlign="center"
          color="White"
          backgroundColor="none"
          fontFamily="Comic Sans MS"
        >
          {props.title}
        </Typography>
      </Card>
    </Box>
  );
};

export default Carousel;
