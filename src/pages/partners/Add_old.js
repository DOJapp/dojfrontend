import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Avatar,
  Select,
  MenuItem,
} from "@mui/material";
import WithoutGst from "./WithoutGst";
import Propriter from "./Propriter";
import PartnerShip from "./PartnerShip";
import Llp from "./Llp";
import PvtLtd from "./PvtLtd";
import Limited from "./Limited";

const AddPartner = () => {
  const [gstSelected, setGstSelected] = useState("");
  const [firmType, setFirmType] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});

  // State for firm details without GST
  const [firmDetailsWithoutGst, setFirmDetailsWithoutGst] = useState({
    panNumber: "",
    aadharNumber: "",
    firmName: "",
    firmAddress: "",
    bankDetails: {
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
      accountType: "",
    },
  });
  console.log("firmDetailsWithoutGst", firmDetailsWithoutGst);

  // State for firm details with GST
  const [firmDetailsWithGst, setFirmDetailsWithGst] = useState({
    gstFirmName: "",
    gstNumber: "",
    address: "",
    composition: "",
    panNumber: "",
    aadharNumber: "",
    bankDetails: {
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
      accountType: "",
    },
  });
  const [firmDetailsWithGstWithParther, setFirmDetailsWithGstWithParther] =
    useState({
      gstFirmName: "",
      gstNumber: "",
      address: "",
      composition: "",
      panNumber: "",
      aadharNumber: "",
      bankDetails: {
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
        accountType: "",
      },
      partherDetails: [
        {
          panNumber: "",
          aadharNumber: "",
          bankDetails: {
            bankName: "",
            accountNumber: "",
            ifscCode: "",
            accountHolderName: "",
            accountType: "",
          },
        },
      ],
    });

  console.log("firmDetailsWithGst", firmDetailsWithGst);

  const handleFirmDetailsChangeWithoutGst = (field, value) => {
    setFirmDetailsWithoutGst((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleFirmDetailsChangeWithGst = (field, value) => {
    setFirmDetailsWithGst((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleGstChange = (event) => {
    const value = event.target.value;
    setGstSelected(value);
    setFirmType(""); // Reset firm type when GST changes

    // Reset firm details based on GST selection
    if (value === "No") {
      setFirmDetailsWithGst({
        gstFirmName: "",
        gstNumber: "",
        address: "",
        composition: "",
        panNumber: "",
        aadharNumber: "",
        bankDetails: {
          bankName: "",
          accountNumber: "",
          ifscCode: "",
          accountHolderName: "",
          accountType: "",
        },
      });
    } else {
      setFirmDetailsWithoutGst({
        panNumber: "",
        aadharNumber: "",
        firmName: "",
        firmAddress: "",
        bankDetails: {
          bankName: "",
          accountNumber: "",
          ifscCode: "",
          accountHolderName: "",
          accountType: "",
        },
      });
    }
  };

  const handleFirmTypeChange = (event) => {
    setFirmType(event.target.value);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, avatar: "" }));
    }
  };

  const handleFileChange = (field, file) => {
    setFirmDetailsWithGst((prevDetails) => ({
      ...prevDetails,
      [field]: file,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!gstSelected) newErrors.gstSelected = "GST selection is required.";
    if (gstSelected === "Yes" && !avatarPreview) {
      newErrors.avatar = "Avatar upload is required.";
    }
    if (firmType === "Propriter" && gstSelected === "Yes") {
      if (!firmDetailsWithGst.panImage)
        newErrors.panImage = "PAN image is required.";
      if (!firmDetailsWithGst.aadharFrontImage)
        newErrors.aadharFrontImage = "Aadhar front image is required.";
      if (!firmDetailsWithGst.aadharBackImage)
        newErrors.aadharBackImage = "Aadhar back image is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const submissionData = {
        gstSelected,
        ...(gstSelected === "Yes"
          ? { firmType, firmDetails: firmDetailsWithGst, avatarPreview }
          : { firmDetails: firmDetailsWithoutGst }),
      };
      console.log("Submission Data:", submissionData);
      // Reset the form or handle submission here
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom align="left">
        Add Partner
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" required>
            <InputLabel>GST</InputLabel>
            <Select label="GST" value={gstSelected} onChange={handleGstChange}>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {gstSelected === "No" && (
          <WithoutGst
            firmDetails={firmDetailsWithoutGst}
            onFirmDetailChange={handleFirmDetailsChangeWithoutGst}
            onBankDetailChange={(field, value) =>
              setFirmDetailsWithoutGst((prevDetails) => ({
                ...prevDetails,
                bankDetails: { ...prevDetails.bankDetails, [field]: value },
              }))
            }
          />
        )}

        {gstSelected === "Yes" && (
          <>
            <Grid item xs={12} md={6}>
              <TextField
                label="GST Firm Name"
                variant="outlined"
                required
                fullWidth
                value={firmDetailsWithGst.gstFirmName}
                onChange={(e) =>
                  handleFirmDetailsChangeWithGst("gstFirmName", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="GST Number"
                variant="outlined"
                required
                fullWidth
                value={firmDetailsWithGst.gstNumber}
                onChange={(e) =>
                  handleFirmDetailsChangeWithGst("gstNumber", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Address"
                variant="outlined"
                required
                fullWidth
                value={firmDetailsWithGst.address}
                onChange={(e) =>
                  handleFirmDetailsChangeWithGst("address", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Composition"
                variant="outlined"
                required
                fullWidth
                value={firmDetailsWithGst.composition}
                onChange={(e) =>
                  handleFirmDetailsChangeWithGst("composition", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                required
                fullWidth
                variant="outlined"
                error={!!errors.avatar}
              >
                <Button variant="outlined" component="label" fullWidth>
                  Upload Avatar
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </Button>
                {errors.avatar && (
                  <p style={{ color: "red" }}>{errors.avatar}</p>
                )}
              </FormControl>
              {avatarPreview && (
                <Avatar
                  alt="Avatar Preview"
                  src={avatarPreview}
                  style={{ width: "50px", height: "50px" }}
                />
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel>Firm Type</InputLabel>
                <Select
                  label="Firm Type"
                  value={firmType}
                  onChange={handleFirmTypeChange}
                >
                  <MenuItem value="Propriter">Propriter</MenuItem>
                  <MenuItem value="Partnership">Partnership</MenuItem>
                  <MenuItem value="LLP">LLP</MenuItem>
                  <MenuItem value="PVT LTD">PVT LTD</MenuItem>
                  <MenuItem value="Limited">Limited</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {firmType === "Propriter" && (
              <Propriter
                firmDetails={firmDetailsWithGst}
                onFirmDetailChange={handleFirmDetailsChangeWithGst}
                onBankDetailChange={(field, value) =>
                  setFirmDetailsWithGst((prevDetails) => ({
                    ...prevDetails,
                    bankDetails: { ...prevDetails.bankDetails, [field]: value },
                  }))
                }
                onFileChange={handleFileChange}
              />
            )}
            {firmType === "Partnership" && (
              <PartnerShip
                firmDetails={firmDetailsWithGstWithParther}
                onFirmDetailChange={handleFirmDetailsChangeWithGst}
                onBankDetailChange={(field, value) =>
                  setFirmDetailsWithGstWithParther((prevDetails) => ({
                    ...prevDetails,
                    bankDetails: {
                      ...prevDetails.bankDetails,
                      [field]: value,
                    },
                  }))
                }
                onPartnerDetailChange={(index, field, value) =>
                  setFirmDetailsWithGstWithParther((prevDetails) => {
                    const updatedPartners = prevDetails.partherDetails.map(
                      (partner, i) =>
                        i === index ? { ...partner, [field]: value } : partner
                    );
                    return { ...prevDetails, partherDetails: updatedPartners };
                  })
                }
                onFileChange={handleFileChange}
              />
            )}
            {firmType === "LLP" && (
              <Llp
                firmDetails={firmDetailsWithGst}
                onFirmDetailChange={handleFirmDetailsChangeWithGst}
              />
            )}
            {firmType === "PVT LTD" && (
              <PvtLtd
                firmDetails={firmDetailsWithGst}
                onFirmDetailChange={handleFirmDetailsChangeWithGst}
              />
            )}
            {firmType === "Limited" && (
              <Limited
                firmDetails={firmDetailsWithGst}
                onFirmDetailChange={handleFirmDetailsChangeWithGst}
              />
            )}
          </>
        )}
      </Grid>

      <Grid item xs={12} style={{ marginTop: "20px" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Paper>
  );
};

export default AddPartner;
