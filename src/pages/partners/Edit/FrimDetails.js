import React, { useState } from "react";
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

const FirmDetails = () => {
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
  });
  const [error, setError] = useState({
    panNumber: "",
    aadharNumber: "",
    firmName: "",
    firmAddress: "",
    panImage: "",
    aadharFrontImage: "",
    aadharBackImage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCompanyDetails((prev) => ({
          ...prev,
          [fieldName]: reader.result, // Store the Data URL for preview
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setCompanyDetails((prev) => ({
        ...prev,
        [fieldName]: null, // Reset if no file is selected
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
            style={{ border: "1px solid red", marginBottom: "20px" }}
          >
            <EditIcon />
          </IconButton>
        )}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="PAN Number"
            variant="outlined"
            required
            fullWidth
            name="panNumber"
            value={companyDetails.panNumber}
            onChange={handleInputChange}
            error={!!error.panNumber}
            helperText={error.panNumber}
            inputProps={{ maxLength: 10 }}
            disabled={!isEditing} // Disable if not editing
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Aadhar Number"
            variant="outlined"
            required
            fullWidth
            name="aadharNumber"
            value={companyDetails.aadharNumber}
            onChange={handleInputChange}
            error={!!error.aadharNumber}
            helperText={error.aadharNumber}
            inputProps={{ maxLength: 12 }}
            disabled={!isEditing} // Disable if not editing
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUpload
            label="Upload PAN Image"
            preview={companyDetails.panImage}
            error={!!error.panImage}
            helperText={error.panImage}
            onChange={(e) => handleFileChange(e, "panImage")}
            disabled={!isEditing} // Disable if not editing
          />
        </Grid>
        
        <Grid item container xs={12} md={6}>
          <Grid item xs={12} md={6}>
            <FileUpload
              label="Aadhar Front"
              preview={companyDetails.aadharFrontImage}
              error={!!error.aadharFrontImage}
              helperText={error.aadharFrontImage}
              onChange={(e) => handleFileChange(e, "aadharFrontImage")}
              disabled={!isEditing} // Disable if not editing
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FileUpload
              label="Aadhar Back"
              preview={companyDetails.aadharBackImage}
              error={!!error.aadharBackImage}
              helperText={error.aadharBackImage}
              onChange={(e) => handleFileChange(e, "aadharBackImage")}
              disabled={!isEditing} 
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Firm Name"
            variant="outlined"
            required
            fullWidth
            name="firmName"
            value={companyDetails.firmName}
            onChange={handleInputChange}
            error={!!error.firmName}
            helperText={error.firmName}
            disabled={!isEditing} // Disable if not editing
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Firm Address"
            variant="outlined"
            required
            fullWidth
            name="firmAddress"
            value={companyDetails.firmAddress}
            onChange={handleInputChange}
            error={!!error.firmAddress}
            helperText={error.firmAddress}
            disabled={!isEditing} // Disable if not editing
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" required disabled={!isEditing}> {/* Disable if not editing */}
            <InputLabel id="firm-type-label">Firm Type</InputLabel>
            <Select
              labelId="firm-type-label"
              label="Firm Type"
              name="firmType"
              disabled={!isEditing} // Disable if not editing
            >
              <MenuItem value="Proprietor">Proprietor</MenuItem>
              <MenuItem value="Partnership">Partnership</MenuItem>
              <MenuItem value="LLP">LLP</MenuItem>
              <MenuItem value="PVT LTD">PVT LTD</MenuItem>
              <MenuItem value="Limited">Limited</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            label="CIN No"
            variant="outlined"
            required
            fullWidth
            name="cinNumber"
            disabled={!isEditing} // Disable if not editing
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
            {partnerState.loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default FirmDetails;
