import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box, Divider } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import StatusIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const BasicDetails = ({ partner }) => {
  const [formData, setFormData] = useState({
    name: "N/A",
    email: "N/A",
    phone: "N/A",
    secondaryPhone: "N/A",
    status: "N/A",
    createdAt: "N/A",
  });

  useEffect(() => {
    if (partner) {
      const formattedCreatedAt = partner.createdAt
        ? new Date(partner.createdAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })
        : "N/A";

      setFormData({
        name: partner.name || "N/A",
        email: partner.email || "N/A",
        phone: partner.phone || "N/A",
        secondaryPhone: partner.secondaryPhone || "N/A",
        status: partner.status || "N/A",
        createdAt: formattedCreatedAt,
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
          <Typography variant="body1" color="textPrimary" style={{ fontWeight: 500, fontSize: 16 }}>
            {value}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );

  return (
    <Paper elevation={3} style={{ padding: "30px", margin: "20px 0px", borderRadius: "10px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" gutterBottom style={{ color: "#1976d2" }}>
          <AccountCircleIcon style={{ marginRight: "10px", verticalAlign: "middle" }} />
          Basic Details
        </Typography>
      </Box>
      <Divider style={{ margin: "10px 0 20px" }} />
      <Grid container spacing={3}>
        {renderField("Name", formData.name, AccountCircleIcon)}
        {renderField("Email", formData.email, EmailIcon)}
        {renderField("Phone Number", formData.phone, PhoneIcon)}
        {renderField("Other Phone Number", formData.secondaryPhone, PhoneIcon)}
        {renderField("Status", formData.status, StatusIcon)}
        {renderField("Created At", formData.createdAt, AccessTimeIcon)}
      </Grid>
    </Paper>
  );
};

export default BasicDetails;
