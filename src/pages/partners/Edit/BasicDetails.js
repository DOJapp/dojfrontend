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
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import * as PartnerActions from "../../../redux/Actions/partnerActions.js";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const BasicDetails = ({ partner }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        secondaryPhone: "",
        status: "",
    });
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        phone: "",
        secondaryPhone: "",
        status: "",
    });

    const dispatch = useDispatch();
    const { success, error, loading: reduxLoading } = useSelector((state) => state.partner);

    // Set form data when partner props change
    useEffect(() => {
        if (partner) {
            setFormData({
                name: partner.name || "",
                email: partner.email || "",
                phone: partner.phone || "",
                secondaryPhone: partner.secondaryPhone || "",
                status: partner.status || "",
            });
        }
    }, [partner]);

    // Handle success or error from API
    useEffect(() => {
        if (success) {
            Swal.fire("Success!", "Details updated successfully.", "success");
            setIsEditing(false);
        } else if (error) {
            Swal.fire("Error!", "Failed to update details.", "error");
        }
    }, [success, error]);

    // Validate each form field
    const validate = (field, value) => {
        switch (field) {
            case "name":
                return /^[A-Za-z\s]+$/.test(value) ? "" : "Name must contain only alphabets and spaces.";
            case "email":
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? "" : "Invalid email format.";
            case "phone":
            case "secondaryPhone":
                return value ? "" : "This field is required.";
            case "status":
                return value ? "" : "Status is required.";
            default:
                return "";
        }
    };

    // Corrected phone number change handler
    const handlePhoneChange = (e) => {
        const { name, value } = e.target;

        // Prevent non-numeric characters and update the value
        if (!/^[0-9]*$/.test(value)) {
            e.preventDefault();
            return; // Stop non-numeric input
        }

        // Limit the input to a max length of 10 characters
        if (value.length <= 10) {
            setFormData((prevData) => ({ ...prevData, [name]: value }));

            // Validate the input
            const error = validate(name, value);
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [name]: error,
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: validate(name, value) });
    };

    // Toggle edit mode
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Submit form data to redux action
    const handleSubmitClick = () => {
        const updatedFormData = {
            ...formData,
            phone: formData.phone.toString(),
            secondaryPhone: formData.secondaryPhone ? formData.secondaryPhone.toString() : "",
        };
        dispatch(PartnerActions.updatePartnerBasicDetails(partner._id, updatedFormData));
    };

    // Render form field
    const renderField = (label, name, helperText, isRequired = false) => (
        <Grid item xs={12} md={6}>
            <TextField
                label={label}
                variant="outlined"
                fullWidth
                required={isRequired}
                name={name}
                value={formData[name]}
                onChange={name.includes("phone") || name.includes("secondaryPhone") ? handlePhoneChange : handleChange}
                disabled={!isEditing}
                error={!!formErrors[name]}
                helperText={formErrors[name] || helperText}
            />
        </Grid>
    );

    return (
        <Paper elevation={3} style={{ padding: "20px", margin: "20px 0px" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" gutterBottom>
                    Basic Details
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
                {renderField("Name", "name", "Enter your full name.", true)}
                {renderField("Email", "email", "Enter a valid email address.", true)}
                {renderField("Phone Number", "phone", "Enter a 10-digit phone number.", true)}
                {renderField("Other Phone Number", "secondaryPhone", "Enter a 10-digit phone number or leave blank.")}
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" required disabled={!isEditing}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={formData.status}
                            onChange={handleChange}
                            name="status"
                            error={!!formErrors.status}
                            label="Status"
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Blocked">Blocked</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            {isEditing && (
                <Box display="flex" justifyContent="flex-end" marginTop="20px">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmitClick}
                        disabled={reduxLoading || Object.values(formErrors).some((err) => err)}
                    >
                        {reduxLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Submit"}
                    </Button>
                </Box>
            )}
        </Paper>
    );
};

export default BasicDetails;
