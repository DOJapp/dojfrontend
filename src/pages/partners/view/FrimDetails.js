import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Box, Divider, Avatar } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedIcon from "@mui/icons-material/Verified";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ImageIcon from "@mui/icons-material/Image";

const FirmDetails = ({ partner }) => {
  const [companyDetails, setCompanyDetails] = useState({
    panNumber: "N/A",
    aadharNumber: "N/A",
    firmName: "N/A",
    firmAddress: "N/A",
    panImage: null,
    aadharFrontImage: null,
    aadharBackImage: null,
    firmType: "N/A",
    cinNumber: "N/A",
    documents: [] // Initialize documents as an array
  });

  useEffect(() => {
    if (partner) {
      setCompanyDetails({
        panNumber: partner.panNumber || "N/A",
        aadharNumber: partner.aadharNumber || "N/A",
        firmName: partner.firmName || "N/A",
        firmAddress: partner.firmAddress || "N/A",
        panImage: partner.panImage || null,
        aadharFrontImage: partner.aadharFrontImage || null,
        aadharBackImage: partner.aadharBackImage || null,
        firmType: partner.firmType || "N/A",
        cinNumber: partner.cinNumber || "N/A",
        documents: partner.documents || [] // Set documents array
      });
    }
  }, [partner]);

  const renderField = (label, value, Icon) => (
    <Grid item xs={12} md={6}>
      <Box display="flex" alignItems="center">
        <Icon style={{ color: "#1976d2", marginRight: "10px" }} />
        <Box>
          <Typography variant="subtitle2" color="textSecondary">
            {label}
          </Typography>
          <Typography variant="body1" style={{ fontWeight: 500, fontSize: 16 }}>
            {value}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );

  const renderImageField = (label, value) => (
    <Grid item xs={12} md={6}>
      <Box display="flex" alignItems="center">
        <ImageIcon style={{ color: "#1976d2", marginRight: "10px" }} />
        <Box>
          <Typography variant="subtitle2" color="textSecondary">
            {label}
          </Typography>
          {Array.isArray(value) && value.length > 0 ? (
            value.map((doc, index) => (
              <a href={doc} target="_blank" rel="noopener noreferrer" key={index} style={{ display: "block", color: "#1976d2" }}>
                <Typography variant="body1" style={{ fontWeight: 500, fontSize: 16 }}>
                  View Document {index + 1}
                </Typography>
              </a>
            ))
          ) : (
            <Typography variant="body1" style={{ fontWeight: 500, fontSize: 16 }}>
              N/A
            </Typography>
          )}
        </Box>
      </Box>
    </Grid>
  );

  return (
    <Paper elevation={3} style={{ padding: "30px", margin: "20px 0px", borderRadius: "10px" }}>
      <Box display="flex" alignItems="center">
        <Typography variant="h6" gutterBottom style={{ color: "#1976d2" }}>
          <BusinessIcon style={{ marginRight: "10px", verticalAlign: "middle" }} />
          Firm Details
        </Typography>
      </Box>
      <Divider style={{ margin: "10px 0 20px" }} />
      <Grid container spacing={3}>
        {renderField("PAN Number", companyDetails.panNumber, CreditCardIcon)}
        {companyDetails.firmType === "Proprietor" && renderField("Aadhar Number", companyDetails.aadharNumber, VerifiedIcon)}
        {renderField("Firm Name", companyDetails.firmName, BusinessIcon)}
        {renderField("Firm Address", companyDetails.firmAddress, LocationOnIcon)}
        {renderField("Firm Type", companyDetails.firmType, AccountBalanceIcon)}
        {renderImageField("PAN Image", [companyDetails.panImage])}
        {companyDetails.firmType !== "Proprietor" && companyDetails.firmType !== "Partnership" && renderField("CIN Number", companyDetails.cinNumber, DescriptionIcon)}
        {companyDetails.firmType === "Proprietor" && renderImageField("Aadhar Front Image", [companyDetails.aadharFrontImage])}
        {companyDetails.firmType === "Proprietor" && renderImageField("Aadhar Back Image", [companyDetails.aadharBackImage])}
        {renderImageField("Documents", companyDetails.documents)}
      </Grid>
    </Paper>
  );
};

export default FirmDetails;
