import React, { useState, useEffect } from "react";
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
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  });
  const [formErrors, setFormErrors] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  });

  useEffect(() => {
    if (!isEditing) {
      setFormErrors({
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      });
    }
  }, [isEditing]);

  // Format IFSC code similar to PAN number format
  const formatIfscCode = (value) => {
    let formattedValue = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase(); // Remove non-alphanumeric characters and convert to uppercase
    if (formattedValue.length <= 4) {
      return formattedValue.replace(/[^A-Za-z]/g, ''); // Only allow the first four letters (e.g., "SBIN")
    }

    if (formattedValue.length <= 10) {
      return formattedValue.slice(0, 4) + formattedValue.slice(4).replace(/[^0-9A-Za-z]/g, ''); // Format the next part with the digit and letter pattern
    }

    return formattedValue.slice(0, 4) + formattedValue.slice(4, 5).replace(/[^0-9]/g, '') + formattedValue.slice(5, 10).replace(/[^A-Za-z0-9]/g, ''); // Add validation for the last part
  };

  const validate = (field, value) => {
    switch (field) {
      case "bankName":
        return value.length === 0 ? "Bank Name is required" : "";
      case "accountNumber":
        return !/^[0-9]{12,16}$/.test(value) ? "Account Number must be 12-16 digits" : "";
      case "ifscCode":
        return !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value) ? "Invalid IFSC Code. Example: SBIN0000123" : ""; // IFSC format validation
      case "accountHolderName":
        return value.length === 0 ? "Account Holder Name is required" : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict non-numeric characters for account number
    if (name === "accountNumber") {
      const numericValue = value.replace(/[^0-9]/g, ""); // Allow only digits
      setFormData({ ...formData, [name]: numericValue });

      // Validate the field after change
      setFormErrors({
        ...formErrors,
        [name]: validate(name, numericValue),
      });
    }

    // Restrict invalid characters for IFSC code
    else if (name === "ifscCode") {
      const formattedIfscValue = formatIfscCode(value); // Format and allow valid IFSC characters
      setFormData({ ...formData, [name]: formattedIfscValue });

      // Validate the field after change
      setFormErrors({
        ...formErrors,
        [name]: validate(name, formattedIfscValue),
      });
    } 
    // For other fields, set the value normally
    else {
      setFormData({ ...formData, [name]: value });

      // Validate the field after change
      setFormErrors({
        ...formErrors,
        [name]: validate(name, value),
      });
    }
  };

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
            value={formData.bankName}
            disabled={!isEditing}
            onChange={handleChange}
            error={!!formErrors.bankName}
            helperText={formErrors.bankName || "Enter the name of the bank."}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Account Number"
            variant="outlined"
            required
            fullWidth
            name="accountNumber"
            value={formData.accountNumber}
            disabled={!isEditing}
            onChange={handleChange}
            error={!!formErrors.accountNumber}
            helperText={formErrors.accountNumber || "Account number should be 12-16 digits."}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="IFSC Code"
            variant="outlined"
            fullWidth
            name="ifscCode"
            value={formData.ifscCode}
            disabled={!isEditing}
            onChange={handleChange}
            error={!!formErrors.ifscCode}
            helperText={formErrors.ifscCode || "Format: XXXX0XXXXX (e.g., SBIN0000123)"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Account Holder Name"
            variant="outlined"
            fullWidth
            name="accountHolderName"
            value={formData.accountHolderName}
            disabled={!isEditing}
            onChange={handleChange}
            error={!!formErrors.accountHolderName}
            helperText={formErrors.accountHolderName || "Enter the name of the account holder."}
          />
        </Grid>
      </Grid>
      {isEditing && (
        <Box display="flex" justifyContent="flex-end" marginTop="20px">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitClick}
            disabled={loading || Object.values(formErrors).some((err) => err !== "")}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Submit"}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default BankDetails;
