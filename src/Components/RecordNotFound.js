import React from "react";
import { Box, Typography } from "@mui/material";
import { SearchOff } from "@mui/icons-material"; // Use an icon for better UX

const RecordNotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "200px", textAlign: "center" }}
    >
      <SearchOff style={{ fontSize: "50px", color: "#f50057" }} />
      <Typography variant="h6" style={{ marginTop: "20px" }}>
        No Records Found
      </Typography>
      <Typography variant="body1" style={{ color: "#888" }}>
        Please add some data to get started.
      </Typography>
    </Box>
  );
};

export default RecordNotFound;
