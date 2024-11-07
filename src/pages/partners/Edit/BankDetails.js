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
import * as PartnerActions from "../../../redux/Actions/partnerActions.js";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const BankDetails = ({ partner }) => {
  const [isEditing, setIsEditing] = useState(false);
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

  const dispatch = useDispatch();
  const { success, error, loading: reduxLoading } = useSelector((state) => state.partner);

  useEffect(() => {
    if (partner) {
      setFormData({
        bankName: partner.bankName || "",
        accountNumber: partner.accountNumber || "",
        ifscCode: partner.ifscCode || "",
        accountHolderName: partner.accountHolderName || "",
      });
    }
  }, [partner]);

  const handleUpdateResult = () => {
    if (success) {
      Swal.fire("Success!", "Bank details updated successfully.", "success");
      setIsEditing(false);
    } else if (error) {
      Swal.fire("Error!", "Failed to update bank details.", "error");
    }
  };

  useEffect(() => {
    if (success || error) handleUpdateResult();
  }, [success, error]);

  const formatIfscCode = (value) => {
    let formattedValue = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (formattedValue.length <= 4) {
      return formattedValue.replace(/[^A-Z]/g, "");
    }
    if (formattedValue.length === 5) {
      return formattedValue.slice(0, 4) + (formattedValue[4] === "0" ? "0" : "");
    }
    if (formattedValue.length <= 11) {
      return (
        formattedValue.slice(0, 4) +
        "0" +
        formattedValue.slice(5, 11).replace(/[^A-Z0-9]/g, "")
      );
    }
    return formattedValue.slice(0, 11);
  };

  const validate = (field, value) => {
    switch (field) {
      case "bankName":
        return value.length === 0 ? "Bank Name is required" : "";
      case "accountNumber":
        return !/^[0-9]{12,16}$/.test(value) ? "Account Number must be 12-16 digits" : "";
      case "ifscCode":
        return !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)
          ? "IFSC Code must be in the format XXXX0XXXXX (e.g., SBIN0000123)"
          : "";
      case "accountHolderName":
        return value.length === 0 ? "Account Holder Name is required" : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "accountNumber") {
      const numericValue = value.replace(/[^0-9]/g, "").slice(0, 16);
      setFormData({ ...formData, [name]: numericValue });
      setFormErrors({ ...formErrors, [name]: validate(name, numericValue) });
    } else if (name === "ifscCode") {
      const formattedIfscValue = formatIfscCode(value);
      setFormData({ ...formData, [name]: formattedIfscValue });
      setFormErrors({ ...formErrors, [name]: validate(name, formattedIfscValue) });
    } else {
      setFormData({ ...formData, [name]: value });
      setFormErrors({ ...formErrors, [name]: validate(name, value) });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmitClick = () => {
    dispatch(PartnerActions.updatePartnerBankDetails(partner._id, formData));
  };

  const renderField = (label, name, helperText, isRequired = false) => (
    <Grid item xs={12} md={6}>
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        required={isRequired}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        disabled={!isEditing}
        error={!!formErrors[name]}
        helperText={formErrors[name] || helperText}
      />
    </Grid>
  );

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
        {renderField("Bank Name", "bankName", "Enter the name of the bank.", true)}
        {renderField("Account Number", "accountNumber", "Account number should be 12-16 digits.", true)}
        {renderField("IFSC Code", "ifscCode", "Format: XXXX0XXXXX (e.g., SBIN0000123)")}
        {renderField("Account Holder Name", "accountHolderName", "Enter the name of the account holder.")}
      </Grid>
      {isEditing && (
        <Box display="flex" justifyContent="flex-end" marginTop="20px">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitClick}
            disabled={reduxLoading || Object.values(formErrors).some((err) => err !== "")}
          >
            {reduxLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Submit"}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default BankDetails;
