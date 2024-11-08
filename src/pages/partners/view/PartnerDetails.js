import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Box, Divider } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedIcon from "@mui/icons-material/Verified";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const PartnerDetails = ({ partner }) => {
    const [formErrors, setFormErrors] = useState([]);

    useEffect(() => {
        if (partner?.partners && Array.isArray(partner.partners)) {
            const updatedFormErrors = partner.partners.map((partnerDetails) => ({
                panNumber: partnerDetails.panNumber || "N/A",
                aadharNumber: partnerDetails.aadharNumber || "N/A",
                panImage: partnerDetails.panImage || "N/A",
                aadharFrontImage: partnerDetails.aadharFrontImage || "N/A",
                aadharBackImage: partnerDetails.aadharBackImage || "N/A",
                bankName: partnerDetails.bankName || "N/A",
                accountNumber: partnerDetails.accountNumber || "N/A",
                ifscCode: partnerDetails.ifscCode || "N/A",
                accountHolderName: partnerDetails.accountHolderName || "N/A",
            }));
            setFormErrors(updatedFormErrors); // Store all partners details
        }
    }, [partner]);

    const renderField = (label, value, Icon) => (
        <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
                <Icon style={{ color: "#1976d2", marginRight: "15px", fontSize: "24px" }} />
                <Box>
                    <Typography variant="subtitle1" color="textSecondary" style={{ fontWeight: "bold" }}>
                        {label}
                    </Typography>
                    <Typography variant="body1" style={{ fontSize: "16px", fontWeight: 500 }}>
                        {value}
                    </Typography>
                </Box>
            </Box>
        </Grid>
    );

    const renderImageField = (label, value) => (
        <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
                <DescriptionIcon style={{ color: "#1976d2", marginRight: "15px", fontSize: "24px" }} />
                <Box>
                    <Typography variant="subtitle1" color="textSecondary" style={{ fontWeight: "bold" }}>
                        {label}
                    </Typography>
                    {value !== "N/A" ? (
                        <a href={value} target="_blank" rel="noopener noreferrer">
                            <Typography
                                variant="body1"
                                style={{
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    color: "#1976d2",
                                    textDecoration: "underline",
                                }}
                            >
                                View Image
                            </Typography>
                        </a>
                    ) : (
                        <Typography variant="body1" style={{ fontSize: "16px", fontWeight: 500 }}>
                            {value}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Grid>
    );

    return (
        <Paper elevation={3} style={{ padding: "30px", margin: "20px 0px", borderRadius: "10px" }}>
            <Box display="flex" alignItems="center" mb={3}>
                <BusinessIcon style={{ marginRight: "10px", fontSize: "30px", color: "#1976d2" }} />
                <Typography variant="h5" style={{ color: "#1976d2", fontWeight: "bold" }}>
                    Partner Details
                </Typography>
            </Box>

            {formErrors.map((partnerDetail, index) => (
                <Box key={index} mb={4}>
                    <Typography variant="h6" gutterBottom style={{ fontWeight: "bold", color: "#1976d2" }}>
                        Partner {index + 1}
                    </Typography>
                    <Divider style={{ marginBottom: "20px", marginTop: "10px" }} />
                    <Grid container spacing={3}>
                        {renderField("PAN Number", partnerDetail.panNumber, CreditCardIcon)}
                        {renderField("Aadhar Number", partnerDetail.aadharNumber, VerifiedIcon)}
                        {renderImageField("PAN Image", partnerDetail.panImage)}
                        {renderImageField("Aadhar Front Image", partnerDetail.aadharFrontImage)}
                        {renderImageField("Aadhar Back Image", partnerDetail.aadharBackImage)}
                        {renderField("Bank Name", partnerDetail.bankName, AccountBalanceIcon)}
                        {renderField("Account Number", partnerDetail.accountNumber, DescriptionIcon)}
                        {renderField("IFSC Code", partnerDetail.ifscCode, LocationOnIcon)}
                        {renderField("Account Holder Name", partnerDetail.accountHolderName, CreditCardIcon)}
                    </Grid>
                </Box>
            ))}
        </Paper>
    );
};

export default PartnerDetails;
