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
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FileUpload from "../../../Components/FileUpload";

const FirmDetails = ({ partner, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [partnerState, setPartnerState] = useState({ loading: false });
  const [companyDetails, setCompanyDetails] = useState({
    panNumber: "",
    aadharNumber: "",
    firmName: "",
    firmAddress: "",
    panImage: null,
    aadharFrontImage: null,
    aadharBackImage: null,
    firmType: "",
    cinNumber: "",
  });
  const [error, setError] = useState({
    panNumber: "",
    aadharNumber: "",
    firmName: "",
    firmAddress: "",
    panImage: "",
    aadharFrontImage: "",
    aadharBackImage: "",
    firmType: "",
    cinNumber: "",
  });

  useEffect(() => {
    if (partner) {
      setCompanyDetails({
        panNumber: partner.panNumber || "",
        aadharNumber: partner.aadharNumber || "",
        firmName: partner.firmName || "",
        firmAddress: partner.firmAddress || "",
        panImage: partner.panImage || null,
        aadharFrontImage: partner.aadharFrontImage || null,
        aadharBackImage: partner.aadharBackImage || null,
        firmType: partner.firmType || "",
        cinNumber: partner.cinNumber || "",
      });
    }
  }, [partner]);

  const validateField = (field, value) => {
    let errorMessage = "";
    switch (field) {
      case "panNumber":
        errorMessage = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)
          ? ""
          : "PAN Number must be in the format AAAAA9999A.";
        break;
      case "aadharNumber":
        errorMessage = /^[0-9]{12}$/.test(value)
          ? ""
          : "Aadhar Number must be 12 digits.";
        break;
      case "firmName":
        errorMessage = /^[A-Za-z\s]+$/.test(value)
          ? ""
          : "Firm Name should only contain letters and spaces.";
        break;
      case "firmAddress":
        errorMessage = value.trim() === "" ? "Firm Address is required." : "";
        break;
      case "panImage":
      case "aadharFrontImage":
      case "aadharBackImage":
        errorMessage = value ? "" : "This field is required.";
        break;
      case "cinNumber":
        errorMessage = /^[A-Z]{1}[A-Z0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/.test(value)
          ? ""
          : "CIN Number must be valid. in the format L17110MH1973PLC019786.";
        break;
      default:
        break;
    }
    return errorMessage;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    const errorMessage = validateField(name, value);
    setError((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCompanyDetails((prev) => ({
          ...prev,
          [fieldName]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setCompanyDetails((prev) => ({
        ...prev,
        [fieldName]: null,
      }));
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmitClick = () => {
    setPartnerState({ loading: true });
    setTimeout(() => {
      setPartnerState({ loading: false });
      setIsEditing(false);
    }, 2000);
  };

  const handleKeyDown = (e, fieldName) => {
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

    if (fieldName === "panNumber") {
      if (!/[A-Za-z0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    } else if (fieldName === "aadharNumber") {
      if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }
  };

  const formatCinNumber = (value) => {
    let formattedValue = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    const length = formattedValue.length;
    if (length <= 1) {
      return formattedValue.slice(0, 1);
    }
    if (length <= 6) {
      return (
        formattedValue.slice(0, 1) +
        formattedValue.slice(1, 6).replace(/[^0-9]/g, "")
      );
    }
    if (length <= 8) {
      return (
        formattedValue.slice(0, 1) +
        formattedValue.slice(1, 6).replace(/[^0-9]/g, "") +
        formattedValue.slice(6, 8).replace(/[^A-Za-z]/g, "")
      );
    }
    if (length <= 12) {
      return (
        formattedValue.slice(0, 1) +
        formattedValue.slice(1, 6).replace(/[^0-9]/g, "") +
        formattedValue.slice(6, 8).replace(/[^A-Za-z]/g, "") +
        formattedValue.slice(8, 12).replace(/[^0-9]/g, "")
      );
    }
    return (
      formattedValue.slice(0, 1) +
      formattedValue.slice(1, 6).replace(/[^0-9]/g, "") +
      formattedValue.slice(6, 8).replace(/[^A-Za-z]/g, "") +
      formattedValue.slice(8, 12).replace(/[^0-9]/g, "") +
      formattedValue.slice(12, 15).replace(/[^A-Za-z]/g, "") +
      formattedValue.slice(15, 21).replace(/[^0-9]/g, "")
    );
  };

  const formatPanNumber = (value) => {
    let formattedValue = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (formattedValue.length <= 5) {
      return formattedValue.replace(/[^A-Za-z]/g, '');
    }
    if (formattedValue.length <= 9) {
      return formattedValue.slice(0, 5) + formattedValue.slice(5).replace(/[^0-9]/g, '');
    }
    return formattedValue.slice(0, 5) + formattedValue.slice(5, 9).replace(/[^0-9]/g, '') + formattedValue.slice(9, 10).replace(/[^A-Za-z]/g, '');
  };

  const handlePanInputChange = (e) => {
    const { value } = e.target;
    const formattedPanValue = formatPanNumber(value);
    setCompanyDetails((prev) => ({
      ...prev,
      panNumber: formattedPanValue,
    }));

    const panErrorMessage = validateField("panNumber", formattedPanValue);
    setError((prev) => ({
      ...prev,
      panNumber: panErrorMessage, // Set PAN error
    }));
  };

  const handleCinInputChange = (e) => {
    const { value } = e.target;
    const formattedCinValue = formatCinNumber(value);
    setCompanyDetails((prev) => ({
      ...prev,
      cinNumber: formattedCinValue,
    }));

    const cinErrorMessage = validateField("cinNumber", formattedCinValue); // Validate CIN number
    setError((prev) => ({
      ...prev,
      cinNumber: cinErrorMessage, // Set CIN error
    }));
  };

  return (
    <Paper spacing={2} elevation={3} style={{ padding: "20px", position: "relative", margin: "20px 0px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" gutterBottom>
          Firm Details
        </Typography>
        {!isEditing && (
          <IconButton
            aria-label="edit"
            onClick={handleEditClick}
            style={{ marginLeft: "10px", color: "#4f83cc" }}
          >
            <EditIcon />
          </IconButton>
        )}
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="PAN Number"
            variant="outlined"
            name="panNumber"
            value={companyDetails.panNumber}
            disabled={!isEditing}
            onChange={handlePanInputChange}
            onKeyDown={(e) => handleKeyDown(e, "panNumber")}
            error={!!error.panNumber}
            helperText={error.panNumber}
            inputProps={{ maxLength: 10 }
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Aadhar Number"
            variant="outlined"
            name="aadharNumber"
            disabled={!isEditing}
            value={companyDetails.aadharNumber}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, "aadharNumber")}
            error={!!error.aadharNumber}
            helperText={error.aadharNumber}
            inputProps={{ maxLength: 12 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Firm Name"
            variant="outlined"
            name="firmName"
            disabled={!isEditing}
            value={companyDetails.firmName}
            onChange={handleInputChange}
            error={!!error.firmName}
            helperText={error.firmName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Firm Address"
            variant="outlined"
            name="firmAddress"
            disabled={!isEditing}
            value={companyDetails.firmAddress}
            onChange={handleInputChange}
            error={!!error.firmAddress}
            helperText={error.firmAddress}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Firm Type</InputLabel>
            <Select
              label="Firm Type"
              name="firmType"
              disabled={!isEditing}
              value={companyDetails.firmType}
              onChange={handleInputChange}
              error={!!error.firmType}
            >
              <MenuItem value="">Select Firm Type</MenuItem>
              <MenuItem value="Proprietor">Proprietor</MenuItem>
              <MenuItem value="Company">Company</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="CIN Number"
            variant="outlined"
            name="cinNumber"
            disabled={!isEditing}
            value={companyDetails.cinNumber}
            onChange={handleCinInputChange}
            error={!!error.cinNumber}
            helperText={error.cinNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUpload
            label="Pan Image"
            file={companyDetails.panImage}
            onFileChange={(e) => handleFileChange(e, "panImage")}
            error={error.panImage}
            preview={companyDetails.panImage}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUpload
            label="Aadhar Front Image"
            file={companyDetails.aadharFrontImage}
            onFileChange={(e) => handleFileChange(e, "aadharFrontImage")}
            error={error.aadharFrontImage}
            preview={companyDetails.aadharFrontImage}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUpload
            label="Aadhar Back Image"
            file={companyDetails.aadharBackImage}
            onFileChange={(e) => handleFileChange(e, "aadharBackImage")}
            error={error.aadharBackImage}
            preview={companyDetails.aadharBackImage}
          />
        </Grid>
      </Grid>
      {isEditing && (
        <Box display="flex" justifyContent="flex-end" marginTop="20px">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitClick}
            disabled={partnerState.loading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </Box>
      )}

    </Paper>
  );
};

export default FirmDetails;
