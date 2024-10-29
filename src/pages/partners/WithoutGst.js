import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  FormControl,
  Avatar,
} from "@mui/material";
import BankDetails from "./BankDetails"; // Adjust the import path as necessary

const WithoutGst = ({ firmDetails, onFirmDetailChange, onBankDetailChange }) => {
  const [aadharFrontImagePreview, setAadharFrontImagePreview] = useState(null);
  const [aadharBackImagePreview, setAadharBackImagePreview] = useState(null);
  
  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (type === "aadharFront") {
        setAadharFrontImagePreview(previewUrl);
        onFirmDetailChange("aadharFront", file); // Store the file
      } else if (type === "aadharBack") {
        setAadharBackImagePreview(previewUrl);
        onFirmDetailChange("aadharBack", file); // Store the file
      } else {
        onFirmDetailChange(type, previewUrl); // For other file types
      }
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
      <Typography variant="h5" gutterBottom align="left">
        Add  Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="PAN Number"
            variant="outlined"
            required
            fullWidth
            value={firmDetails.panNumber}
            onChange={(e) => onFirmDetailChange("panNumber", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl required fullWidth variant="outlined">
            <Button variant="outlined" component="label" fullWidth>
              Upload PAN Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleFileChange(e, "panImage")}
              />
            </Button>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Aadhar Number"
            variant="outlined"
            required
            fullWidth
            value={firmDetails.aadharNumber}
            onChange={(e) => onFirmDetailChange("aadharNumber", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl required fullWidth variant="outlined">
            <Button variant="outlined" component="label" fullWidth>
              Upload Aadhar Front Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleFileChange(e, "aadharFront")}
              />
            </Button>
          </FormControl>
          {aadharFrontImagePreview && (
            <Avatar
              alt="Aadhar Front Preview"
              src={aadharFrontImagePreview}
              style={{
                width: "50px",
                height: "50px",
                marginLeft: "10px",
                marginTop: "10px",
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl required fullWidth variant="outlined">
            <Button variant="outlined" component="label" fullWidth>
              Upload Aadhar Back Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleFileChange(e, "aadharBack")}
              />
            </Button>
          </FormControl>
          {aadharBackImagePreview && (
            <Avatar
              alt="Aadhar Back Preview"
              src={aadharBackImagePreview}
              style={{
                width: "50px",
                height: "50px",
                marginLeft: "10px",
                marginTop: "10px",
              }}
            />
          )}
        </Grid>

        {/* Firm Name and Address */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Firm Name"
            variant="outlined"
            required
            fullWidth
            value={firmDetails.firmName}
            onChange={(e) => onFirmDetailChange("firmName", e.target.value)} // Corrected
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Firm Address"
            variant="outlined"
            required
            fullWidth
            value={firmDetails.firmAddress}
            onChange={(e) => onFirmDetailChange("firmAddress", e.target.value)} // Corrected
          />
        </Grid>
       
        {/* Bank Details Section */}
        <Grid item xs={12}>
          <BankDetails
            bankName={firmDetails.bankDetails.bankName}
            setBankName={(value) => onBankDetailChange("bankName", value)}
            accountNumber={firmDetails.bankDetails.accountNumber}
            setAccountNumber={(value) =>
              onBankDetailChange("accountNumber", value)
            }
            ifscCode={firmDetails.bankDetails.ifscCode}
            setIfscCode={(value) => onBankDetailChange("ifscCode", value)}
            accountHolderName={firmDetails.bankDetails.accountHolderName}
            setAccountHolderName={(value) =>
              onBankDetailChange("accountHolderName", value)
            }
            accountType={firmDetails.bankDetails.accountType}
            setAccountType={(value) => onBankDetailChange("accountType", value)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WithoutGst;
