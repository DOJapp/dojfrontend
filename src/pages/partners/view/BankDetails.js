import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box, Divider } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const BankDetails = ({ partner }) => {
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  });

  useEffect(() => {
    if (partner) {
      setFormData({
        bankName: partner.bankName || "N/A",
        accountNumber: partner.accountNumber ? partner.accountNumber.toString() : "N/A",
        ifscCode: partner.ifscCode || "N/A",
        accountHolderName: partner.accountHolderName || "N/A",
      });
    }
  }, [partner]);

  const renderField = (label, value, Icon) => (
    <Grid item xs={12} md={6}>
      <Box display="flex" alignItems="center">
        <Icon style={{ color: "#1976d2", marginRight: "10px" }} />
        <Box>
          <Typography variant="subtitle2" color="textSecondary">
            {label}
          </Typography>
          <Typography variant="body1" color="textPrimary" style={{ fontWeight: 500 ,fontSize:16}}>
            {value}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );

  return (
    <Paper elevation={3} style={{ padding: "30px", margin: "20px 0px", borderRadius: "10px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" gutterBottom style={{ color: "#1976d2" }}>
          <AccountBalanceWalletIcon style={{ marginRight: "10px", verticalAlign: "middle" }} />
          Bank Details
        </Typography>
      </Box>
      <Divider style={{ margin: "10px 0 20px" }} />
      <Grid container spacing={3}>
        {renderField("Bank Name", formData.bankName, AccountBalanceIcon)}
        {renderField("Account Number", formData.accountNumber, CreditCardIcon)}
        {renderField("IFSC Code", formData.ifscCode, AccountBalanceIcon)}
        {renderField("Account Holder Name", formData.accountHolderName, AccountCircleIcon)}
      </Grid>
    </Paper>
  );
};

export default BankDetails;
