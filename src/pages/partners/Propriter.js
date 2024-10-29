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

const Propriter = ({ firmDetails, onFirmDetailChange, onBankDetailChange }) => {
  const [panImagePreview, setPanImagePreview] = useState(null);
  const [aadharFrontImagePreview, setAadharFrontImagePreview] = useState(null);
  const [aadharBackImagePreview, setAadharBackImagePreview] = useState(null);
  const [documentPreview, setDocumentPreview] = useState(null);

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (type === "panImage") {
        setPanImagePreview(previewUrl);
        onFirmDetailChange("panImage", file); // Store the PAN image file
      } else if (type === "aadharFront") {
        setAadharFrontImagePreview(previewUrl);
        onFirmDetailChange("aadharFront", file); // Store the Aadhar front image file
      } else if (type === "aadharBack") {
        setAadharBackImagePreview(previewUrl);
        onFirmDetailChange("aadharBack", file); // Store the Aadhar back image file
      } else if (type === "document") {
        setDocumentPreview(previewUrl);
        onFirmDetailChange("document", file); // Store the document file
      }
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
      <Typography variant="h5" gutterBottom align="left">
        Add Propriter
      </Typography>
      <Grid container spacing={2}>
        {/* Left Section: PAN and Aadhar Details */}
        <Grid item xs={12} md={6}>
          {/* PAN Details */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="PAN Number"
                variant="outlined"
                required
                fullWidth
                value={firmDetails.panNumber}
                onChange={(e) => onFirmDetailChange("panNumber", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} container alignItems="center">
              <Grid item xs={8}>
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
              <Grid item xs={4}>
                {panImagePreview && (
                  <Avatar
                    alt="PAN Preview"
                    src={panImagePreview}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginLeft: "10px",
                    }}
                  />
                )}
              </Grid>
            </Grid>

            {/* Aadhar Details */}
            <Grid item xs={12}>
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
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} container alignItems="center">
              <Grid item xs={8}>
                <FormControl required fullWidth variant="outlined">
                  <Button variant="outlined" component="label" fullWidth>
                    Upload Document
                    <input
                      type="file"
                      hidden
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileChange(e, "document")}
                    />
                  </Button>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                {documentPreview && (
                  <Avatar
                    alt="Document Preview"
                    src={documentPreview}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginLeft: "10px",
                    }}
                  />
                )}
              </Grid>
            </Grid>

            {/* Bank Details Component */}
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
                setAccountType={(value) =>
                  onBankDetailChange("accountType", value)
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Propriter;
