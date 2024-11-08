import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import * as PartnerActions from "../../../redux/Actions/partnerActions.js";

function GstDetails({ partner }) {
  const [isEditing, setIsEditing] = useState(false);
  const [gstSelected, setGstSelected] = useState('No');
  const [gstDetails, setGstDetails] = useState({
    gstNumber: '',
    gstType: '',
    compositionType: '',
    cessType: '',
    percentage: '',
    goodsServiceType: '',
    documentImages: [],
  });
  const [gstError, setGstError] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const dispatch = useDispatch();
  const { success, error, loading: reduxLoading } = useSelector((state) => state.partner);

  // GST Number Validation Regex (For India GST Number format)
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;

  useEffect(() => {
    if (partner) {
      setGstDetails({
        gstNumber: partner.gstNumber || '',
        gstType: partner.gstType || '',
        compositionType: partner.compositionType || '',
        cessType: partner.cessType || '',
        percentage: partner.percentage || '',
        goodsServiceType: partner.goodsServiceType || '',
        documentImages: partner?.documents || [],
      });
      setGstSelected(partner.gstNumber ? 'Yes' : 'No');
    }
  }, [partner]);
  
  useEffect(() => {
    if (success) {
      Swal.fire('Success', 'GST Details updated successfully', 'success');
      setIsEditing(false);
    }
    if (error) {
      Swal.fire('Error', error, 'error');
    }
  }, [success, error]);

  const formatGstNumber = (value) => {
    let formattedValue = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

    if (formattedValue.length <= 2) return formattedValue.replace(/[^0-9]/g, '');
    if (formattedValue.length <= 7) return formattedValue.slice(0, 2) + formattedValue.slice(2).replace(/[^A-Za-z]/g, '');
    if (formattedValue.length <= 11) return formattedValue.slice(0, 7) + formattedValue.slice(7).replace(/[^0-9]/g, '');
    if (formattedValue.length <= 12) return formattedValue.slice(0, 11) + formattedValue.slice(11).replace(/[^A-Za-z]/g, '');
    if (formattedValue.length <= 13) return formattedValue.slice(0, 12) + formattedValue.slice(12).replace(/[^1-9A-Za-z]/g, '');
    return formattedValue.slice(0, 14) + formattedValue.slice(14, 15);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "percentage") {
      let numericValue = value.replace(/[^0-9.]/g, '');
      if (numericValue !== '') {
        numericValue = parseFloat(numericValue);
        if (numericValue > 100) numericValue = 100;
        else if (numericValue < 0) numericValue = 0;
      }

      setGstDetails((prevDetails) => ({
        ...prevDetails,
        percentage: numericValue.toString(),
      }));
    } else if (name === 'gstNumber') {
      const formattedValue = formatGstNumber(value);
      setGstDetails((prevDetails) => ({
        ...prevDetails,
        gstNumber: formattedValue,
      }));

      if (!gstRegex.test(formattedValue)) {
        setGstError('Invalid GST Number format 22AAAAA0000A1Z5');
      } else {
        setGstError('');
      }
    } else {
      setGstDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setGstDetails((prevDetails) => ({
      ...prevDetails,
      documentImages: files,
    }));
    setPreviewImage(URL.createObjectURL(files[0]));
  };

  const handleSubmitClick = () => {
    if (gstError) {
      Swal.fire('Error', 'Please correct the form before submitting', 'error');
      return;
    }
    const formData = new FormData();

    formData.append('gstNumber', gstDetails.gstNumber || '');
    formData.append('gstType', gstDetails.gstType || '');
    formData.append('compositionType', gstDetails.compositionType || '');
    formData.append('cessType', gstDetails.cessType || '');
    formData.append('percentage', gstDetails.percentage || '');
    formData.append('goodsServiceType', gstDetails.goodsServiceType || '');

    gstDetails.documentImages.forEach((file, index) => {
      formData.append('documents', file);
    });

    dispatch(PartnerActions.updatePartnerGstDetails(partner._id, formData));
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
        documentImages: [],
      });
      setGstError('');
      setPreviewImage('');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 2, position: 'relative' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
        <Typography variant="h6" gutterBottom>
          GST Details
        </Typography>
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
                error={!!gstError}
                helperText={gstError}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" required>
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
              <FormControl fullWidth variant="outlined" required>
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
              <FormControl fullWidth variant="outlined" required>
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
              <FormControl fullWidth variant="outlined" required>
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
                  sx={{ mt: 2, bgcolor: 'primary.main', color: '#fff' }}
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
              <Grid item xs={12} container spacing={1}>
                {gstDetails.documentImages.map((file, index) => (
                  <Grid item key={index}>
                    <Avatar
                      alt={`Document Preview ${index + 1}`}
                      src={file || URL.createObjectURL(file)}
                      sx={{
                        width: 50,
                        height: 50,
                        ml: 1,
                        mt: 1,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </>
        )}
      </Grid>

      {isEditing && (
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitClick}
            disabled={!!gstError || reduxLoading}
          >
            {reduxLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Submit"}

          </Button>
        </Box>
      )}
    </Paper>
  );
}

export default GstDetails;
