import React, { useState } from "react";
import {
  Grid,
  Button,
  Paper,
  TextField,
  FormControl,
  Avatar,
  Typography,
} from "@mui/material";
import BankDetails from "./BankDetails";

const Common = ({
  firmType,
  firmDetails = { bankDetails: {}, documentPreviews: [] },
  onFirmDetailChange,
  onBankDetailChange,
  onFileChange,
}) => {

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", marginTop: "20px", backgroundColor: "#f9f9f9" }}
    >
      <Typography variant="h5">{firmType} Details</Typography>
      <Grid container spacing={2}>
        {/* Company PAN Number and PAN Image Upload */}
        <Grid item xs={6}>
          <TextField
            label="Company PAN Number"
            variant="outlined"
            required
            fullWidth
            value={firmDetails.panNumber || ""}
            onChange={(e) => onFirmDetailChange("panNumber", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={8}>
              <FormControl required fullWidth variant="outlined">
                <Button variant="outlined" component="label" fullWidth>
                  Upload Company PAN Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) =>
                      onFileChange("panImage", e.target.files[0])
                    }
                  />
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              {firmDetails.panImage && (
                <Avatar
                  alt="PAN Preview"
                  src={URL.createObjectURL(firmDetails.panImage)}
                  style={{ width: "50px", height: "50px", marginLeft: "10px" }}
                />
              )}
            </Grid>
          </Grid>
        </Grid>

        {firmType === "Propriter" && (
          <>
            <Grid item xs={6}>
              <TextField
                label="Aadhar Number"
                variant="outlined"
                required
                fullWidth
                value={firmDetails.aadharNumber || ""}
                onChange={(e) =>
                  onFirmDetailChange("aadharNumber", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={6} container alignItems="center">
              <Grid item xs={8}>
                <FormControl required fullWidth variant="outlined">
                  <Button variant="outlined" component="label" fullWidth>
                    Upload Aadhar Front Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) =>
                        onFileChange("aadharFrontImage", e.target.files[0])
                      }
                    />
                  </Button>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                {firmDetails.aadharFrontImage && (
                  <Avatar
                    alt="Aadhar Front Preview"
                    src={URL.createObjectURL(firmDetails.aadharFrontImage)}
                    style={{ width: "50px", height: "50px", marginLeft: "10px" }}
                  />
                )}
              </Grid>
            </Grid>

            <Grid item xs={6} container alignItems="center">
              <Grid item xs={8}>
                <FormControl required fullWidth variant="outlined">
                  <Button variant="outlined" component="label" fullWidth>
                    Upload Aadhar Back Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) =>
                        onFileChange("aadharBackImage", e.target.files[0])
                      }
                    />
                  </Button>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                {firmDetails.aadharBackImage && (
                  <Avatar
                    alt="Aadhar Back Preview"
                    src={URL.createObjectURL(firmDetails.aadharBackImage)}
                    style={{ width: "50px", height: "50px", marginLeft: "10px" }}
                  />
                )}
              </Grid>
            </Grid>
          </>
        )}

        <Grid item xs={6}>
          <FormControl required fullWidth variant="outlined">
            <Button variant="outlined" component="label" fullWidth>
              Upload Documents
              <input
                type="file"
                hidden
                accept="image/*,application/pdf"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  files.forEach((file) => onFileChange("documentPreviews", file));
                }}
              />
            </Button>
          </FormControl>
          <Grid item xs={12} container spacing={1}>
            {Array.isArray(firmDetails.documentPreviews) &&
              firmDetails.documentPreviews.map((preview, docIndex) => (
                <Grid item key={docIndex}>
                  <Avatar
                    alt={`Document Preview ${docIndex + 1}`}
                    src={URL.createObjectURL(preview)}
                    style={{ width: "50px", height: "50px", marginLeft: "10px" }}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>

        {/* CIN No field for non-Propriter and non-Partnership firm types */}
        {firmType !== "Propriter" && firmType !== "Partnership" && (
          <Grid item xs={6}>
            <TextField
              label="CIN No"
              variant="outlined"
              required
              fullWidth
              value={firmDetails.cinNo || ""}
              onChange={(e) => onFirmDetailChange("cinNo", e.target.value)}
            />
          </Grid>
        )}

        {/* Bank Details Component */}
        <Grid item xs={12}>
          <BankDetails
            bankName={firmDetails.bankDetails.bankName || ""}
            setBankName={(value) => onBankDetailChange("bankName", value)}
            accountNumber={firmDetails.bankDetails.accountNumber || ""}
            setAccountNumber={(value) =>
              onBankDetailChange("accountNumber", value)
            }
            ifscCode={firmDetails.bankDetails.ifscCode || ""}
            setIfscCode={(value) => onBankDetailChange("ifscCode", value)}
            accountHolderName={firmDetails.bankDetails.accountHolderName || ""}
            setAccountHolderName={(value) =>
              onBankDetailChange("accountHolderName", value)
            }
            accountType={firmDetails.bankDetails.accountType || ""}
            setAccountType={(value) => onBankDetailChange("accountType", value)}
          />
        </Grid>

       
      </Grid>
    </Paper>
  );
};

export default Common;
