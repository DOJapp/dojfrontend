import React, { useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Avatar,
  Paper,
  Box,
  IconButton
} from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";

function GstDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [gstSelected, setGstSelected] = useState('No');
  const [gstDetails, setGstDetails] = useState({
    gstNumber: '',
    gstType: '',
    compositionType: '',
    cessType: '',
    percentage: '',
    goodsServiceType: '',
    firmType: '',
    cinNumber: '',
    documentImages: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGstDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setGstDetails((prevDetails) => ({
      ...prevDetails,
      documentImages: previews,
    }));
  };

  const handleSubmitClick = () => {
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleGstChange = (e) => {
    const { value } = e.target;
    setGstSelected(value);
    if (value === 'No') {
      setGstDetails({
        gstNumber: '',
        gstType: '',
        compositionType: '',
        cessType: '',
        percentage: '',
        goodsServiceType: '',
        firmType: '',
        cinNumber: '',
        documentImages: [],
      });
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px 0px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
        <Typography variant="h6" gutterBottom>
          GST Details
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
          <FormControl fullWidth variant="outlined" required>
            <InputLabel>GST</InputLabel>
            <Select
              label="GST"
              value={gstSelected}
              onChange={handleGstChange}
              disabled={!isEditing}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {gstSelected === 'Yes' && (
          <>
            <Grid item xs={12} md={6}>
              <TextField
                label="GST Number"
                variant="outlined"
                required
                fullWidth
                placeholder="e.g., 22ABCDE1234F1Z5"
                name="gstNumber"
                value={gstDetails.gstNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" required disabled={!isEditing}>
                <InputLabel>GST Type</InputLabel>
                <Select
                  label="GST Type"
                  name="gstType"
                  value={gstDetails.gstType}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                >
                  <MenuItem value="Composition">Composition</MenuItem>
                  <MenuItem value="Regular">Regular</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" required disabled={!isEditing}>
                <InputLabel>Composition Type</InputLabel>
                <Select
                  label="Composition Type"
                  name="compositionType"
                  value={gstDetails.compositionType}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                >
                  <MenuItem value="Inclusive">Inclusive</MenuItem>
                  <MenuItem value="Exclusive">Exclusive</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" required disabled={!isEditing}>
                <InputLabel>Cess Type</InputLabel>
                <Select
                  label="Cess Type"
                  name="cessType"
                  value={gstDetails.cessType}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                >
                  <MenuItem value="Cess">Cess</MenuItem>
                  <MenuItem value="E-cess">E-cess</MenuItem>
                  <MenuItem value="A-cess">A-cess</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Percentage"
                variant="outlined"
                required
                fullWidth
                name="percentage"
                value={gstDetails.percentage}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" required disabled={!isEditing}>
                <InputLabel>Goods Service Type</InputLabel>
                <Select
                  label="Goods Service Type"
                  name="goodsServiceType"
                  value={gstDetails.goodsServiceType}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                >
                  <MenuItem value="CGST">CGST (Central Goods and Services Tax)</MenuItem>
                  <MenuItem value="SGST">SGST (State Goods and Services Tax)</MenuItem>
                  <MenuItem value="IGST">IGST (Integrated Goods and Services Tax)</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} container spacing={2}>
              <Grid item xs={8}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  style={{ backgroundColor: "#3f51b5", color: "#fff", marginTop: "20px" }}
                  disabled={!isEditing}
                >
                  Upload Document
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Avatar
                  alt="Upload Document Preview"
                  src={gstDetails.documentImages.length > 0 ? gstDetails.documentImages[0] : ''}
                  style={{
                    width: "50px",
                    height: "50px",
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
      
      {isEditing && (
        <Box display="flex" justifyContent="flex-end" marginTop="20px">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitClick}
          >
            Submit
          </Button>
        </Box>
      )}
    </Paper>
  );
}

export default GstDetails;
