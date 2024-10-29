import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const BankDetails = ({
  bankName,
  setBankName,
  accountNumber,
  setAccountNumber,
  ifscCode,
  setIfscCode,
  accountHolderName,
  setAccountHolderName,
  accountType,
  setAccountType,
}) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Bank Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Bank Name"
            variant="outlined"
            fullWidth
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Account Number"
            variant="outlined"
            fullWidth
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="IFSC Code"
            variant="outlined"
            fullWidth
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Account Holder Name"
            variant="outlined"
            fullWidth
            value={accountHolderName}
            onChange={(e) => setAccountHolderName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Account Type</InputLabel>
            <Select
              label="Account Type"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            >
              <MenuItem value="Savings">Savings</MenuItem>
              <MenuItem value="Current">Current</MenuItem>
              <MenuItem value="Fixed Deposit">Fixed Deposit</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default BankDetails;
