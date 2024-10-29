import React from "react";
import {
  Grid,
  TextField,
  Button,
  Avatar,
  FormControl,
  Typography,
  Divider,
} from "@mui/material";
import BankDetails from "./BankDetails";

const PartnerDetails = ({
  partner = { bankDetails: {}, documentPreviews: [] },
  index,
  onPartnerChange,
  onFileChange,
  onRemove,
  onBankDetailChange,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>{`Partner ${index + 1}`}</Typography>
          {index > 0 && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onRemove(index)}
              size="small"
            >
              Remove
            </Button>
          )}
        </div>
        <Divider style={{ marginBottom: "10px" }} />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          {/* Left Side (PAN and Aadhar Fields) */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {/* PAN Number Field */}
              <Grid item xs={12}>
                <TextField
                  label="PAN Number"
                  variant="outlined"
                  required
                  fullWidth
                  value={partner.panNumber || ""}
                  onChange={(e) => onPartnerChange(index, "panNumber", e.target.value)}
                />
              </Grid>

              {/* PAN Image Upload */}
              <Grid item xs={12} container alignItems="center">
                <Grid item xs={8}>
                  <FormControl required fullWidth variant="outlined">
                    <Button variant="outlined" component="label" fullWidth>
                      Upload PAN Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => onFileChange(e, index, "panImagePreview")}
                      />
                    </Button>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  {partner.panImagePreview && (
                    <Avatar
                      alt="PAN Preview"
                      src={partner.panImagePreview}
                      style={{ width: "50px", height: "50px", marginLeft: "10px" }}
                    />
                  )}
                </Grid>
              </Grid>

              {/* Aadhar Number Field */}
              <Grid item xs={12}>
                <TextField
                  label="Aadhar Number"
                  variant="outlined"
                  required
                  fullWidth
                  value={partner.aadharNumber || ""}
                  onChange={(e) => onPartnerChange(index, "aadharNumber", e.target.value)}
                />
              </Grid>

              {/* Aadhar Front Image Upload */}
              <Grid item xs={12} container alignItems="center">
                <Grid item xs={8}>
                  <FormControl required fullWidth variant="outlined">
                    <Button variant="outlined" component="label" fullWidth>
                      Upload Aadhar Front Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => onFileChange(e, index, "aadharFrontImagePreview")}
                      />
                    </Button>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  {partner.aadharFrontImagePreview && (
                    <Avatar
                      alt="Aadhar Front Preview"
                      src={partner.aadharFrontImagePreview}
                      style={{ width: "50px", height: "50px", marginLeft: "10px" }}
                    />
                  )}
                </Grid>
              </Grid>

              {/* Aadhar Back Image Upload */}
              <Grid item xs={12} container alignItems="center">
                <Grid item xs={8}>
                  <FormControl required fullWidth variant="outlined">
                    <Button variant="outlined" component="label" fullWidth>
                      Upload Aadhar Back Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => onFileChange(e, index, "aadharBackImagePreview")}
                      />
                    </Button>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  {partner.aadharBackImagePreview && (
                    <Avatar
                      alt="Aadhar Back Preview"
                      src={partner.aadharBackImagePreview}
                      style={{ width: "50px", height: "50px", marginLeft: "10px" }}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Side (Document Upload and Bank Details) */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {/* Document Upload */}
              <Grid item xs={12}>
                <FormControl required fullWidth variant="outlined">
                  <Button variant="outlined" component="label" fullWidth>
                    Upload Documents
                    <input
                      type="file"
                      hidden
                      accept="image/*,application/pdf"
                      multiple
                      onChange={(e) => onFileChange(e, index, "documentPreviews")}
                    />
                  </Button>
                </FormControl>
              </Grid>

              {/* Render uploaded document previews */}
              <Grid item xs={12} container spacing={1}>
                {partner.documentPreviews && partner.documentPreviews.map((preview, docIndex) => (
                  <Grid item key={docIndex}>
                    <Avatar
                      alt={`Document Preview ${docIndex + 1}`}
                      src={preview}
                      style={{ width: "50px", height: "50px", marginLeft: "10px" }}
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Bank Details Section */}
              <Grid item xs={12}>
                <BankDetails
                  bankName={partner.bankDetails.bankName || ""}
                  setBankName={(value) => onBankDetailChange(index, "bankName", value)}
                  accountNumber={partner.bankDetails.accountNumber || ""}
                  setAccountNumber={(value) => onBankDetailChange(index, "accountNumber", value)}
                  ifscCode={partner.bankDetails.ifscCode || ""}
                  setIfscCode={(value) => onBankDetailChange(index, "ifscCode", value)}
                  accountHolderName={partner.bankDetails.accountHolderName || ""}
                  setAccountHolderName={(value) => onBankDetailChange(index, "accountHolderName", value)}
                  accountType={partner.bankDetails.accountType || ""}
                  setAccountType={(value) => onBankDetailChange(index, "accountType", value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PartnerDetails;
