import React, { useState, useEffect } from 'react';
import {
    Grid,
    Paper,
    Typography,
    TextField,
    IconButton,
    Box,
    Button,
    CircularProgress,
    Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FileUpload from '../../../Components/FileUpload';

function PartnerDetails({ partner, isLoading }) {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [companyDetails, setCompanyDetails] = useState([]);
    const [formErrors, setFormErrors] = useState({
        panNumber: '',
        aadharNumber: '',
        panImage: '',
        aadharFrontImage: '',
        aadharBackImage: '',
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        accountHolderName: '',
    });

    useEffect(() => {
        if (partner?.partners && Array.isArray(partner.partners)) {
            // Initialize or update state for all partners
            const updatedCompanyDetails = partner.partners.map((partnerDetails) => ({
                panNumber: partnerDetails.panNumber || '',
                aadharNumber: partnerDetails.aadharNumber || '',
                panImage: partnerDetails.panImage || null,
                aadharFrontImage: partnerDetails.aadharFrontImage || null,
                aadharBackImage: partnerDetails.aadharBackImage || null,
                bankName: partnerDetails.bankName || '',
                accountNumber: partnerDetails.accountNumber || '',
                ifscCode: partnerDetails.ifscCode || '',
                accountHolderName: partnerDetails.accountHolderName || '',
            }));
            setCompanyDetails(updatedCompanyDetails);
        }
    }, [partner]);

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

    useEffect(() => {
        if (!isEditing) {
            setFormErrors({
                panNumber: '',
                aadharNumber: '',
                panImage: '',
                aadharFrontImage: '',
                aadharBackImage: '',
                bankName: '',
                accountNumber: '',
                ifscCode: '',
                accountHolderName: '',
            });
        }
    }, [isEditing]);

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

    const formatIfscCode = (value) => {
        let formattedValue = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
        if (formattedValue.length <= 4) {
            return formattedValue.replace(/[^A-Z]/g, "");
        }
        if (formattedValue.length === 5) {
            return formattedValue.slice(0, 4) + (formattedValue[4] === "0" ? "0" : "");
        }
        if (formattedValue.length <= 11) {
            return formattedValue.slice(0, 4) + "0" + formattedValue.slice(5, 11).replace(/[^A-Z0-9]/g, "");
        }
        return formattedValue.slice(0, 11);
    };

    const validate = (field, value) => {
        switch (field) {
            case 'panNumber':
                return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)
                    ? ''
                    : 'PAN Number must be in the format AAAAA9999A.';
            case 'aadharNumber':
                return /^[0-9]{12}$/.test(value)
                    ? ''
                    : 'Aadhar Number must be exactly 12 digits.';
            case 'accountNumber':
                return /^[0-9]{12,16}$/.test(value)
                    ? ''
                    : 'Account Number must be between 12 and 16 digits.';
            case 'ifscCode':
                return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)
                    ? ''
                    : 'IFSC Code must be in the format XXXX0XXXXX (e.g., SBIN0000123).';
            case 'bankName':
                return value.length === 0 ? 'Bank Name is required' : '';
            case 'accountHolderName':
                return value.length === 0 ? 'Account Holder Name is required' : '';
            case 'panImage':
            case 'aadharFrontImage':
            case 'aadharBackImage':
                return value ? '' : 'This field is required.';
            default:
                return '';
        }
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedCompanyDetails = [...companyDetails];

        if (name === 'panNumber') {
            const formattedValue = formatPanNumber(value);
            updatedCompanyDetails[index].panNumber = formattedValue;
            setCompanyDetails(updatedCompanyDetails);

            setFormErrors((prev) => ({
                ...prev,
                panNumber: validate('panNumber', formattedValue),
            }));
        } else if (name === 'accountNumber') {
            const numericValue = value.replace(/[^0-9]/g, "").slice(0, 16);
            updatedCompanyDetails[index].accountNumber = numericValue;
            setCompanyDetails(updatedCompanyDetails);

            setFormErrors((prev) => ({
                ...prev,
                accountNumber: validate('accountNumber', numericValue),
            }));
        } else if (name === 'ifscCode') {
            const formattedIfscValue = formatIfscCode(value);
            updatedCompanyDetails[index].ifscCode = formattedIfscValue;
            setCompanyDetails(updatedCompanyDetails);

            setFormErrors((prev) => ({
                ...prev,
                ifscCode: validate('ifscCode', formattedIfscValue),
            }));
        } else {
            updatedCompanyDetails[index][name] = value;
            setCompanyDetails(updatedCompanyDetails);

            setFormErrors((prev) => ({
                ...prev,
                [name]: validate(name, value),
            }));
        }
    };

    const handleFileChange = (fieldName, index) => (e) => {
        const file = e.target.files[0];
        const updatedCompanyDetails = [...companyDetails];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                updatedCompanyDetails[index][fieldName] = reader.result;
                setCompanyDetails(updatedCompanyDetails);
            };
            reader.readAsDataURL(file);
        } else {
            updatedCompanyDetails[index][fieldName] = null;
            setCompanyDetails(updatedCompanyDetails);
        }
    };

    const handleSubmitClick = () => {
        setLoading(true);
        const errors = {};
        companyDetails.forEach((partnerDetail, index) => {
            Object.keys(partnerDetail).forEach((field) => {
                const errorMessage = validate(field, partnerDetail[field]);
                if (errorMessage) errors[`${field}-${index}`] = errorMessage;
            });
        });

        setFormErrors(errors);
        const hasErrors = Object.values(errors).some((msg) => msg !== '');

        if (!hasErrors) {
            setTimeout(() => {
                setLoading(false);
                setIsEditing(false);
            }, 2000);
        } else {
            setLoading(false);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', position: 'relative', margin: '20px 0px' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" gutterBottom>
                    Partner Details
                </Typography>
                {!isEditing && (
                    <IconButton
                        aria-label="edit"
                        onClick={handleEditClick}
                        style={{ border: '1px solid red', marginBottom: '20px' }}
                    >
                        <EditIcon />
                    </IconButton>
                )}
            </Box>
            {companyDetails.map((partnerDetail, index) => (
                <Grid container spacing={2} key={index} style={{ marginBottom: '20px' }}>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h6" gutterBottom>
                            Partner {index + 1}
                        </Typography>
                        <Divider style={{ marginBottom: "10px" }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="PAN Number"
                            variant="outlined"
                            required
                            fullWidth
                            name="panNumber"
                            value={partnerDetail.panNumber}
                            onKeyDown={(e) => handleKeyDown(e, "panNumber")}
                            onChange={(e) => handleChange(e, index)}
                            inputProps={{ maxLength: 10 }}
                            error={!!formErrors[`panNumber-${index}`]}
                            helperText={formErrors[`panNumber-${index}`]}
                            disabled={!isEditing}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Aadhar Number"
                            variant="outlined"
                            required
                            fullWidth
                            name="aadharNumber"
                            value={partnerDetail.aadharNumber}
                            onKeyDown={(e) => handleKeyDown(e, "aadharNumber")}
                            onChange={(e) => handleChange(e, index)}
                            inputProps={{ maxLength: 12 }}
                            error={!!formErrors[`aadharNumber-${index}`]}
                            helperText={formErrors[`aadharNumber-${index}`]}
                            disabled={!isEditing}
                        />
                    </Grid>
                    {/* File Uploads */}
                    <Grid item xs={12} md={6}>
                        <FileUpload
                            label="Upload PAN Image"
                            preview={partnerDetail.panImage}
                            onChange={(e) => handleFileChange('panImage', index)(e)}
                            disabled={!isEditing}
                        />
                    </Grid>
                    <Grid item container xs={12} md={6}>
                        <Grid item xs={12} md={6}>
                            <FileUpload
                                label="Aadhar Front"
                                preview={partnerDetail.aadharFrontImage}
                                onChange={(e) => handleFileChange('aadharFrontImage', index)(e)}
                                disabled={!isEditing}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FileUpload
                                label="Aadhar Back"
                                preview={partnerDetail.aadharBackImage}
                                onChange={(e) => handleFileChange('aadharBackImage', index)(e)}
                                disabled={!isEditing}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Bank Name"
                            variant="outlined"
                            required
                            fullWidth
                            name="bankName"
                            value={partnerDetail.bankName}
                            onChange={(e) => handleChange(e, index)}
                            error={!!formErrors[`bankName-${index}`]}
                            helperText={formErrors[`bankName-${index}`]}
                            disabled={!isEditing}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Account Number"
                            variant="outlined"
                            required
                            fullWidth
                            name="accountNumber"
                            value={partnerDetail.accountNumber}
                            onChange={(e) => handleChange(e, index)}
                            inputProps={{ maxLength: 16 }}
                            error={!!formErrors[`accountNumber-${index}`]}
                            helperText={formErrors[`accountNumber-${index}`]}
                            disabled={!isEditing}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="IFSC Code"
                            variant="outlined"
                            required
                            fullWidth
                            name="ifscCode"
                            value={partnerDetail.ifscCode}
                            onChange={(e) => handleChange(e, index)}
                            inputProps={{ maxLength: 11 }}
                            error={!!formErrors[`ifscCode-${index}`]}
                            helperText={formErrors[`ifscCode-${index}`]}
                            disabled={!isEditing}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Account Holder Name"
                            variant="outlined"
                            required
                            fullWidth
                            name="accountHolderName"
                            value={partnerDetail.accountHolderName}
                            onChange={(e) => handleChange(e, index)}
                            error={!!formErrors[`accountHolderName-${index}`]}
                            helperText={formErrors[`accountHolderName-${index}`]}
                            disabled={!isEditing}
                        />
                    </Grid>
                </Grid >
            ))
            }

            {
                isEditing && (
                    <Box display="flex" justifyContent="flex-end" marginTop="20px">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmitClick}
                            disabled={loading || Object.values(formErrors).some((err) => err !== "")}
                        >
                            {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Submit"}
                        </Button>
                    </Box>
                )
            }
        </Paper >
    );
}

export default PartnerDetails;
