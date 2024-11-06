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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!isEditing}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        required
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isEditing}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={!isEditing}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Other Phone Number"
                        variant="outlined"
                        fullWidth
                        value={secondaryPhone}
                        onChange={(e) => setSecondaryPhone(e.target.value)}
                        disabled={!isEditing}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" required disabled={!isEditing}>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            label="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
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
                        disabled={loading}
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
