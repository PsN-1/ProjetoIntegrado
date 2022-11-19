import { Box, CircularProgress } from "@mui/material";

export function Loading() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        background: "rgba(255, 255, 255, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export function BoxLoading() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        position: "relative",
        top: "0",
        left: "0",
        background: "rgba(255, 255, 255, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
