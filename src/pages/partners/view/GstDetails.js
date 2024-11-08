import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Box, Divider, Avatar } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedIcon from "@mui/icons-material/Verified";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const GstDetails = ({ partner }) => {
  const [gstDetails, setGstDetails] = useState({
    gst: "N/A",
    gstNumber: "N/A",
    gstType: "N/A",
    compositionType: "N/A",
    cessType: "N/A",
    percentage: "N/A",
    goodsServiceType: "N/A",
    documentImages: [],
  });

  useEffect(() => {
    if (partner) {
      setGstDetails({
        gst: partner.gst || "N/A",
        gstNumber: partner.gstNumber || "N/A",
        gstType: partner.gstType || "N/A",
        compositionType: partner.compositionType || "N/A",
        cessType: partner.cessType || "N/A",
        percentage: partner.percentage || "N/A",
        goodsServiceType: partner.goodsServiceType || "N/A",
        documentImages: partner?.documents || [],
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

  const renderImage = (file, index) => {
    const imageSrc = file && (typeof file === "string" ? file : URL.createObjectURL(file));

    return (
      <Grid item key={index}>
        <Avatar
          alt={`Document Preview ${index + 1}`}
          src={imageSrc}
          sx={{
            width: 50,
            height: 50,
            ml: 1,
            mt: 1,
            cursor: "pointer",
            "&:hover": {
              opacity: 0.8,
            },
          }}
          onClick={() => window.open(imageSrc, "_blank")}
        />
      </Grid>
    );
  };

  return (
    <Paper elevation={3} style={{ padding: "30px", margin: "20px 0px", borderRadius: "10px" }}>
      <Box display="flex" alignItems="center">
        <Typography variant="h6" gutterBottom style={{ color: "#1976d2" }}>
          <DocumentScannerIcon style={{ marginRight: "10px", verticalAlign: "middle" }} />
          GST Details
        </Typography>
      </Box>
      <Divider style={{ margin: "10px 0 20px" }} />
      <Grid container spacing={3}>

        {renderField("GST", gstDetails.gst, CreditCardIcon)}

        {gstDetails.gst === "Yes" && (
          <>
            {renderField("GST Number", gstDetails.gstNumber, CreditCardIcon)}
            {renderField("GST Type", gstDetails.gstType, VerifiedIcon)}
            {renderField("Composition Type", gstDetails.compositionType, LocationOnIcon)}
            {renderField("Cess Type", gstDetails.cessType, DescriptionIcon)}
            {renderField("Percentage", gstDetails.percentage, CreditCardIcon)}
            {renderField("Goods/Service Type", gstDetails.goodsServiceType, BusinessIcon)}

            {gstDetails.documentImages.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                  Documents:
                </Typography>
                <Grid container spacing={1}>
                  {gstDetails.documentImages.map((file, index) => renderImage(file, index))}
                </Grid>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Paper>
  );
};

export default GstDetails;
