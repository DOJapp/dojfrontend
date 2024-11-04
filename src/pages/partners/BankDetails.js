import React from "react";
import {
  Grid,
  Typography,
  TextField
} from "@mui/material";

// Bank details component
const BankDetails = ({ partner, handleBankDetailsChange }) => (
  <>
  
    <Grid item xs={12}>
      <Typography variant="h6">Bank Details</Typography>
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        label="Bank Name"
        variant="outlined"
        required
        fullWidth
        name="bankName"
        value={partner.bankName || ""}
        onChange={(e) => handleBankDetailsChange(e, "bankName", partner.index, true)}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        label="Account Number"
        variant="outlined"
        required
        fullWidth
        name="accountNumber"
        value={partner.accountNumber || ""}
        onChange={(e) =>
          handleBankDetailsChange(e, "accountNumber", partner.index, true)
        }
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        label="IFSC Code"
        variant="outlined"
        fullWidth
        name="ifscCode"
        value={partner.ifscCode || ""}
        onChange={(e) => handleBankDetailsChange(e, "ifscCode", partner.index, true)}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        label="Account Holder Name"
        variant="outlined"
        fullWidth
        name="accountHolderName"
        value={partner.accountHolderName || ""}
        onChange={(e) =>
          handleBankDetailsChange(e, "accountHolderName", partner.index, true)
        }
      />
    </Grid>
  </>
);

export default BankDetails;
