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
import Common from "./Common";
import PartnerDetails from "./PartnerDetails";
import AddIcon from "@mui/icons-material/Add";

const AddPartner = () => {
  const [gstSelected, setGstSelected] = useState("");
  const [firmType, setFirmType] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [partners, setPartners] = useState([]);

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
    documentPreviews: [],
    panImage: null,
    aadharFrontImage: null,
    aadharBackImage: null,
  });

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
    setFirmType("");
    setErrors({});

    // Resetting fields based on GST selection
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
        documentPreviews: [],
        panImage: null,
        aadharFrontImage: null,
        aadharBackImage: null,
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
          ? {
              firmType,
              firmDetails: firmDetailsWithGst,
              avatarPreview,
              partners,
            }
          : { firmDetails: firmDetailsWithoutGst }),
      };
      console.log("Submission Data:", submissionData);
    }
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
        bankDetails: {
          bankName: "",
          accountNumber: "",
          ifscCode: "",
          accountHolderName: "",
          accountType: "",
        },
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

  const handleBankDetailChange = (index, field, value) => {
    setPartners((prevPartners) => {
      const updatedPartners = [...prevPartners];
      updatedPartners[index].bankDetails[field] = value;
      return updatedPartners;
    });
  };
console.log("partners",partners);
  const handlePartnerFileChange = (e, index, field) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPartners((prev) => {
        const updated = [...prev];
        updated[index][field].push(previewUrl); // Ensure it's an array for multiple previews
        return updated;
      });
    }
  };

  const handleRemovePartner = (index) => {
    setPartners((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev
    );
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

            {firmType && (
              <Common
                firmType={firmType}
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
            {firmType && firmType !== "Propriter" && (
              <Grid item xs={12} container>
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

                {Array.isArray(partners) &&
                  partners.map((partner, index) => (
                    <PartnerDetails
                      key={partner.id}
                      partner={partner}
                      index={index}
                      onPartnerChange={handlePartnerChange}
                      onFileChange={handlePartnerFileChange}
                      onRemove={() => handleRemovePartner(index)}
                      onBankDetailChange={handleBankDetailChange} // Ensure this function is passed correctly
                    />
                  ))}
              </Grid>
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
