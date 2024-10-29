import React, { useState } from "react";
import {
  Grid,
  Button,
  Paper,
  TextField,
  FormControl,
  Avatar,
  Typography,
} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import BankDetails from "./BankDetails.js";
import PartnerDetails from "./PartnerDetails.js";
import AddIcon from "@mui/icons-material/Add";

const PartnerShip = () => {
  const [partnerShip, setPartnerShip] = useState({
    panNumber: "",
    panImagePreview: null,
    documentPreviews: [],
    bankDetails: {
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
      accountType: "",
    },
  });

  const [partners, setPartners] = useState([
    {
      id: Date.now(),
      name: "",
      email: "",
      phone: "",
      panNumber: "",
      aadharNumber: "",
      documentPreviews: [],
    },
  ]);

  const handleFileChange = (event, type) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const previews = files.map((file) => URL.createObjectURL(file));
      setPartnerShip((prev) => ({
        ...prev,
        [type]:
          type === "documentPreviews"
            ? [...prev.documentPreviews, ...previews]
            : previews[0],
      }));
    }
  };

  const handleChange = (field, value) => {
    setPartnerShip((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBankDetailsChange = (field, value) => {
    setPartnerShip((prev) => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        [field]: value,
      },
    }));
  };

  const handleAddPartner = () => {
    setPartners((prevPartners) => [
      ...prevPartners,
      {
        id: Date.now(),
        name: "",
        email: "",
        phone: "",
        panNumber: "",
        aadharNumber: "",
        documentPreviews: [],
      },
    ]);
  };

  const handlePartnerChange = (index, field, value) => {
    setPartners((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleRemovePartner = (index) => {
    setPartners((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev
    );
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", marginTop: "20px", backgroundColor: "#f9f9f9" }}
    >
      <Typography variant="h5" style={{  marginBottom: "20px", backgroundColor: "#f9f9f9" }}>Company PVT LTD Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Company PAN Number"
            variant="outlined"
            required
            fullWidth
            value={partnerShip.panNumber}
            onChange={(e) => handleChange("panNumber", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={8}>
              <FormControl required fullWidth variant="outlined">
                <Button variant="outlined" component="label" fullWidth>
                  Upload Company PAN Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "panImagePreview")}
                  />
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              {partnerShip.panImagePreview && (
                <Avatar
                  alt="PAN Preview"
                  src={partnerShip.panImagePreview}
                  style={{ width: "50px", height: "50px", marginLeft: "10px" }}
                />
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="CIN No"
            variant="outlined"
            required
            fullWidth
            value={partnerShip.cinNo}
            onChange={(e) => handleChange("cinNo", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <BankDetails
            bankName={partnerShip.bankDetails.bankName}
            setBankName={(value) => handleBankDetailsChange("bankName", value)}
            accountNumber={partnerShip.bankDetails.accountNumber}
            setAccountNumber={(value) =>
              handleBankDetailsChange("accountNumber", value)
            }
            ifscCode={partnerShip.bankDetails.ifscCode}
            setIfscCode={(value) => handleBankDetailsChange("ifscCode", value)}
            accountHolderName={partnerShip.bankDetails.accountHolderName}
            setAccountHolderName={(value) =>
              handleBankDetailsChange("accountHolderName", value)
            }
            accountType={partnerShip.bankDetails.accountType}
            setAccountType={(value) =>
              handleBankDetailsChange("accountType", value)
            }
          />
        </Grid>

        <Grid item xs={12} container justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPartner}
            startIcon={<AddIcon />}
          >
            Add More Partner
          </Button>
        </Grid>

        {partners.map((partner, index) => (
          <PartnerDetails
            key={partner.id}
            partner={partner}
            index={index}
            onChange={handlePartnerChange}
            onFileChange={handleFileChange}
            onRemove={handleRemovePartner}
          />
        ))}
      </Grid>
    </Paper>
  );
};

export default PartnerShip;
