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
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import * as PartnerActions from "../../../redux/Actions/partnerActions.js";

const FirmDetails = ({ partner }) => {
  const [isEditing, setIsEditing] = useState(false);
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

  const [fieldErrors, setFieldErrors] = useState({
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

  const dispatch = useDispatch();
  const { success, error, loading: reduxLoading } = useSelector((state) => state.partner);


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

  useEffect(() => {
    if (success) {
      Swal.fire('Success', 'Firm Details updated successfully', 'success');
      setIsEditing(false);
    }
    if (error) {
      Swal.fire('Error', error, 'error');
    }
  }, [success, error]);

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
          : "CIN Number must be valid in the format L17110MH1973PLC019786.";
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
    setFieldErrors((prev) => ({
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
    const formData = new FormData();

    for (const [key, value] of Object.entries(companyDetails)) {
      formData.append(key, value || '');
    }
    console.log("formData",formData)

    dispatch(PartnerActions.updatePartnerFirmDetails(partner._id, formData));
  };

  const handleKeyDown = (e, fieldName) => {
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
    if (fieldName === "panNumber" && !/[A-Za-z0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    } else if (fieldName === "aadharNumber" && !/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handlePanInputChange = (e) => {
    const formattedValue = e.target.value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    setCompanyDetails((prev) => ({
      ...prev,
      panNumber: formattedValue,
    }));
    const errorMessage = validateField("panNumber", formattedValue);
    setFieldErrors((prev) => ({
      ...prev,
      panNumber: errorMessage,
    }));
  };

  const handleCinInputChange = (e) => {
    const formattedValue = e.target.value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    setCompanyDetails((prev) => ({
      ...prev,
      cinNumber: formattedValue,
    }));
    const errorMessage = validateField("cinNumber", formattedValue);
    setFieldErrors((prev) => ({
      ...prev,
      cinNumber: errorMessage,
    }));
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px 0" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" mb={2}>Firm Details</Typography>
        {!isEditing && (
          <IconButton
            aria-label="edit"
            onClick={handleEditClick}
            sx={{ border: '1px solid red', mb: 2 }}
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
            error={!!fieldErrors.panNumber}
            helperText={fieldErrors.panNumber}
            inputProps={{ maxLength: 10 }}
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
            error={!!fieldErrors.aadharNumber}
            helperText={fieldErrors.aadharNumber}
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
            error={!!fieldErrors.firmName}
            helperText={fieldErrors.firmName}
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
            error={!!fieldErrors.firmAddress}
            helperText={fieldErrors.firmAddress}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUpload
            label="PAN Image"
            disabled={!isEditing}
            onChange={(e) => handleFileChange(e, "panImage")}
            error={fieldErrors.panImage || ""}
            preview={companyDetails?.panImage}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUpload
            label="Aadhar Front Image"
            disabled={!isEditing}
            onChange={(e) => handleFileChange(e, "aadharFrontImage")}
            error={fieldErrors.aadharFrontImage || ""}
            preview={companyDetails?.aadharFrontImage}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUpload
            label="Aadhar Back Image"
            disabled={!isEditing}
            onChange={(e) => handleFileChange(e, "aadharBackImage")}
            error={fieldErrors.aadharBackImage || ""}
            preview={companyDetails?.aadharBackImage}

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!fieldErrors.firmType}>
            <InputLabel id="firm-type-label">Firm Type</InputLabel>
            <Select
              labelId="firm-type-label"
              name="firmType"
              value={companyDetails.firmType}
              disabled={!isEditing}
              onChange={handleInputChange}
              label="Firm Type"
            >
              <MenuItem value="Proprietor">Proprietor</MenuItem>
              <MenuItem value="Partnership">Partnership</MenuItem>
              <MenuItem value="LLP">LLP</MenuItem>
              <MenuItem value="Private Limited">Private Limited</MenuItem>
            </Select>
            <Typography color="error">{fieldErrors.firmType}</Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="CIN Number"
            variant="outlined"
            name="cinNumber"
            value={companyDetails.cinNumber}
            disabled={!isEditing}
            onChange={handleCinInputChange}
            error={!!fieldErrors.cinNumber}
            helperText={fieldErrors.cinNumber}
            inputProps={{ maxLength: 21 }}
          />
        </Grid>
      </Grid>

      {isEditing && (
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitClick}
            disabled={reduxLoading}
            startIcon={reduxLoading && <CircularProgress size={20} sx={{ color: "white" }}/>}
          >
            Submit
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default FirmDetails;
