import React, { useState } from 'react';
import {
    Grid,
    Typography,
    TextField,
    Paper,
    Box,
    IconButton,
    Button,
    CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FileUpload from '../../../Components/FileUpload';

function PartnerDetails() {
    const [isEditing, setIsEditing] = useState(false);
    const [panNumber, setPanNumber] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [panImage, setPanImage] = useState(null);
    const [aadharFrontImage, setAadharFrontImage] = useState(null);
    const [aadharBackImage, setAadharBackImage] = useState(null);
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [accountHolderName, setAccountHolderName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleFileChange = (setter) => (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setter(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setter(null);
        }
    };

    const handleSubmitClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsEditing(false);
        }, 2000);
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
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="PAN Number"
                        variant="outlined"
                        required
                        fullWidth
                        value={panNumber}
                        onChange={handleInputChange(setPanNumber)}
                        inputProps={{ maxLength: 10 }}
                        disabled={!isEditing}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Aadhar Number"
                        variant="outlined"
                        required
                        fullWidth
                        value={aadharNumber}
                        onChange={handleInputChange(setAadharNumber)}
                        inputProps={{ maxLength: 12 }}
                        disabled={!isEditing}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FileUpload
                        label="Upload PAN Image"
                        preview={panImage}
                        onChange={handleFileChange(setPanImage)}
                        disabled={!isEditing}
                    />
                </Grid>
                <Grid item container xs={12} md={6}>
                    <Grid item xs={12} md={6}>
                        <FileUpload
                            label="Aadhar Front"
                            preview={aadharFrontImage}
                            onChange={handleFileChange(setAadharFrontImage)}
                            disabled={!isEditing}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FileUpload
                            label="Aadhar Back"
                            preview={aadharBackImage}
                            onChange={handleFileChange(setAadharBackImage)}
                            disabled={!isEditing}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Bank Details</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Bank Name"
                        variant="outlined"
                        required
                        fullWidth
                        value={bankName}
                        onChange={handleInputChange(setBankName)}
                        disabled={!isEditing}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Account Number"
                        variant="outlined"
                        required
                        fullWidth
                        value={accountNumber}
                        onChange={handleInputChange(setAccountNumber)}
                        disabled={!isEditing}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="IFSC Code"
                        variant="outlined"
                        fullWidth
                        value={ifscCode}
                        onChange={handleInputChange(setIfscCode)}
                        disabled={!isEditing}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Account Holder Name"
                        variant="outlined"
                        fullWidth
                        value={accountHolderName}
                        onChange={handleInputChange(setAccountHolderName)}
                        disabled={!isEditing}
                    />
                </Grid>
            </Grid>
            {isEditing && (
                <Box display="flex" justifyContent="flex-end" marginTop="20px">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmitClick}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} sx={{ color: 'white' }} />
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </Box>
            )}
        </Paper>
    );
}

export default PartnerDetails;
