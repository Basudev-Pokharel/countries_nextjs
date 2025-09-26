"use client";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Protected = (Pro) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "Center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!user) {
    return <AuthRedirect />;
  }

  return <Typography variant="h1">Protected Route Here</Typography>;
};
export default Protected;
