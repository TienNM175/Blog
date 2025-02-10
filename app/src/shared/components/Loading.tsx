import { Box, Typography, CircularProgress } from "@mui/material";

export const Loading = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      opacity: 0.8,
      zIndex: 10,
      transition: "opacity 0.3s ease",
    }}
  >
    <CircularProgress
      size={60}
      sx={{
        color: "#00796b",
        borderWidth: 6,
        animation: "spin 1s infinite linear",
        opacity: 0.7,
      }}
    />

    <Typography
      variant="h6"
      sx={{
        marginTop: 2,
        color: "#00796b",
        fontSize: "18px",
        fontWeight: 500,
      }}
    >
      Loading...
    </Typography>
  </Box>
);