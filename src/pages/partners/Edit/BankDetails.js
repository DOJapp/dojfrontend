import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  IconButton,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const BankDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmitClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
    }, 2000);
  };

  return (
    <Paper spacing={2} elevation={3} style={{ padding: "20px", position: "relative", margin: "20px 0px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" gutterBottom>
          Bank Details
        </Typography>
        {!isEditing && (
          <IconButton
            aria-label="edit"
            onClick={handleEditClick}
            style={{ border: "1px solid red", marginBottom: "20px" }}
          >
            <EditIcon />
          </IconButton>
        )}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Bank Name"
            variant="outlined"
            required
            fullWidth
            name="bankName"
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Account Number"
            variant="outlined"
            required
            fullWidth
            name="accountNumber"
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="IFSC Code"
            variant="outlined"
            fullWidth
            name="ifscCode"
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Account Holder Name"
            variant="outlined"
            fullWidth
            name="accountHolderName"
            disabled={!isEditing}
          />
        </Grid>
      </Grid>
      {isEditing && (
        <Box display="flex" justifyContent="flex-end" marginTop="20px">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitClick}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Submit"}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default BankDetails;
