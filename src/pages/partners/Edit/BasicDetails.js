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
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function BasicDetails() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [secondaryPhone, setSecondaryPhone] = useState("");
    const [status, setStatus] = useState("");

    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        phone: "",
        secondaryPhone: "",
        status: "",
    });

    // Real-time validation function
    const validateField = (field, value) => {
        let error = "";

        switch (field) {
            case "name":
                error = /^[A-Za-z\s]+$/.test(value) ? "" : "Name must contain only alphabets and spaces.";
                break;
            case "email":
                // Email validation pattern
                error = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
                    ? ""
                    : "Invalid email format.";
                break;
            case "phone":
                error = /^[0-9]{10}$/.test(value) ? "" : "Phone number must be exactly 10 digits.";
                break;
            case "secondaryPhone":
                error = /^[0-9]{10}$/.test(value) || value === "" ? "" : "Secondary phone number must be exactly 10 digits.";
                break;
            case "status":
                error = value === "" ? "Status is required." : "";
                break;
            default:
                break;
        }

        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update field value
        if (name === "name") setName(value);
        else if (name === "email") setEmail(value);
        else if (name === "phone") setPhone(value);
        else if (name === "secondaryPhone") setSecondaryPhone(value);
        else if (name === "status") setStatus(value);

        // Validate the field in real-time
        const error = validateField(name, value);
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    // Restrict input to only numbers and limit to 10 digits
    const handlePhoneChange = (e) => {
        const { name, value } = e.target;
        if (/[^0-9]/.test(value) || value.length > 10) return;

        if (name === "phone") setPhone(value);
        else if (name === "secondaryPhone") setSecondaryPhone(value);

        // Validate the field in real-time
        const error = validateField(name, value);
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSubmitClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsEditing(false);
        }, 2000);
    };

    return (
        <Paper spacing={2} elevation={3} style={{ padding: "20px", position: "relative", margin: "20px 0px" }}>
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
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        required
                        fullWidth
                        name="name"
                        value={name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        error={!!formErrors.name}
                        helperText={formErrors.name || "Enter your full name."}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        required
                        fullWidth
                        name="email"
                        value={email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        error={!!formErrors.email}
                        helperText={formErrors.email || "Enter a valid email address."}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        name="phone"
                        value={phone}
                        onChange={handlePhoneChange} // Use handlePhoneChange for numeric input
                        disabled={!isEditing}
                        error={!!formErrors.phone}
                        helperText={formErrors.phone || "Enter a 10-digit phone number."}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Other Phone Number"
                        variant="outlined"
                        fullWidth
                        name="secondaryPhone"
                        value={secondaryPhone}
                        onChange={handlePhoneChange} // Use handlePhoneChange for numeric input
                        disabled={!isEditing}
                        error={!!formErrors.secondaryPhone}
                        helperText={formErrors.secondaryPhone || "Enter a 10-digit phone number or leave blank."}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" required disabled={!isEditing}>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            label="Status"
                            value={status}
                            onChange={handleChange}
                            name="status"
                            error={!!formErrors.status}
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
                        disabled={loading || Object.values(formErrors).some((err) => err !== "")}
                    >
                        {loading ? (
                            <CircularProgress size={24} sx={{ color: 'white' }} />
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </Box>
            )}
        </Paper>
    );
}

export default BasicDetails;
