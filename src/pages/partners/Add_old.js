import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Avatar,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import FileUpload from "../../Components/FileUpload";
import BankDetails from "./BankDetails.js";

// Partner Details Component
const PartnerDetails = ({ partner, handleFileChange, onRemove }) => {
  return (
    <Grid item xs={12}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>{`Partner ${
          partner.index + 1
        }`}</Typography>
        {partner.index !== 0 && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={onRemove}
          >
            Remove
          </Button>
        )}
      </div>
      <Divider style={{ marginBottom: "10px" }} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="PAN Number"
            variant="outlined"
            required
            fullWidth
            name="panNumber"
            value={partner.panNumber || ""}
            onChange={(e) =>
              handleFileChange(e, "panNumber", partner.index, true)
            }
          />
        </Grid>
        <FileUpload
          label="Upload PAN Image"
          onChange={(e) => handleFileChange(e, "panImage", partner.index)}
          preview={partner.panImage}
        />
        <Grid item xs={6}>
          <TextField
            label="Aadhar Number"
            variant="outlined"
            required
            fullWidth
            name="aadharNumber"
            value={partner.aadharNumber || ""}
            onChange={(e) =>
              handleFileChange(e, "aadharNumber", partner.index, true)
            }
          />
        </Grid>
        <FileUpload
          label="Upload Aadhar Front Image"
          onChange={(e) => handleFileChange(e, "aadharImage", partner.index)}
          preview={partner.aadharImage}
        />
        <FileUpload
          label="Upload Aadhar Back Image"
          onChange={(e) =>
            handleFileChange(e, "aadharBackImage", partner.index)
          }
          preview={partner.aadharBackImage}
        />
        <Grid item xs={12}>
          <Typography variant="h6">Bank Details</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Bank Name"
            variant="outlined"
            required
            fullWidth
            name="bankName"
            value={partner.bankName || ""}
            onChange={(e) =>
              handleFileChange(e, "bankName", partner.index, true)
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Account Number"
            variant="outlined"
            required
            fullWidth
            name="accountNumber"
            value={partner.accountNumber || ""}
            onChange={(e) =>
              handleFileChange(e, "accountNumber", partner.index, true)
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="IFSC Code"
            variant="outlined"
            fullWidth
            name="ifscCode"
            value={partner.ifscCode || ""}
            onChange={(e) =>
              handleFileChange(e, "ifscCode", partner.index, true)
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Account Holder Name"
            variant="outlined"
            fullWidth
            name="accountHolderName"
            value={partner.accountHolderName || ""}
            onChange={(e) =>
              handleFileChange(e, "accountHolderName", partner.index, true)
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

// Main AddPartner Component
const AddPartner = () => {
  const [companyDetails, setCompanyDetails] = useState({
    gstSelected: "No",
    companyPanNumber: "",
    companyPanImage: null,
    aadharNumber: "",
    aadharImage: null,
    aadharBackImage: null,
    firmName: "",
    firmAddress: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    gstNo: "",
    composition: "",
    firmType: "",
    cinNo: "",
    partners: [
      {
        panNumber: "",
        panImage: null,
        aadharNumber: "",
        aadharImage: null,
        aadharBackImage: null,
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
    ],
  });

  console.log("companyDetails", companyDetails);

  // Handle GST selection change
  const handleGstChange = (event) => {
    setCompanyDetails({ ...companyDetails, gstSelected: event.target.value });
  };
  // Handle GST selection change
  const handleFrimTypeChange = (event) => {
    setCompanyDetails({ ...companyDetails, firmType: event.target.value });
  };

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCompanyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle file changes
  const handleFileChange = (event, name, index, isText = false) => {
    const value = isText ? event.target.value : event.target.files[0];

    if (!isText && value) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyDetails((prevDetails) => {
          const updatedPartners = [...prevDetails.partners];
          // Check if index is provided for partners
          if (index !== undefined) {
            updatedPartners[index][name] = reader.result; // Update partner's image
          } else {
            prevDetails[name] = reader.result; // Update company image
          }
          return { ...prevDetails, partners: updatedPartners };
        });
      };
      reader.readAsDataURL(value);
    } else {
      setCompanyDetails((prevDetails) => {
        const updatedPartners = [...prevDetails.partners];
        // Check if index is provided for partners
        if (index !== undefined) {
          updatedPartners[index][name] = value; // Update partner's text field
        } else {
          prevDetails[name] = value; // Update company text field
        }
        return { ...prevDetails, partners: updatedPartners };
      });
    }
  };

  const handleBankDetailsChange = (event, fieldName, index) => {
    const { name, value } = event.target;

    setCompanyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      let formData;
      if (companyDetails.gstSelected === "No") {
        // Prepare data for GST "No"
        formData = {
          gstSelected: companyDetails.gstSelected,
          companyPanNumber: companyDetails.companyPanNumber,
          companyPanImage: companyDetails.companyPanImage,
          aadharNumber: companyDetails.aadharNumber,
          aadharImage: companyDetails.aadharImage,
          aadharBackImage: companyDetails.aadharBackImage,
          firmName: companyDetails.firmName,
          firmAddress: companyDetails.firmAddress,
          bankName: companyDetails.bankName,
          accountNumber: companyDetails.accountNumber,
          ifscCode: companyDetails.ifscCode,
          accountHolderName: companyDetails.accountHolderName,
        };
      } else {
        // Prepare data for GST "Yes"
        formData = {
          gstSelected: companyDetails.gstSelected,
          gstNo: companyDetails.gstNo,
          firmName: companyDetails.firmName,
          firmAddress: companyDetails.firmAddress,
          composition: companyDetails.composition,
          firmType: companyDetails.firmType,
          cinNo: companyDetails.cinNo,
          companyPanNumber: companyDetails.companyPanNumber,
          companyPanImage: companyDetails.companyPanImage,
          aadharNumber: companyDetails.aadharNumber,
          aadharImage: companyDetails.aadharImage,
          aadharBackImage: companyDetails.aadharBackImage,
          bankName: companyDetails.bankName,
          accountNumber: companyDetails.accountNumber,
          ifscCode: companyDetails.ifscCode,
          accountHolderName: companyDetails.accountHolderName,
          partners: companyDetails.partners,
        };
      }
      // Send formData to API
      const response = await axios.post("/api/company", formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle add partner
  const handleAddPartner = () => {
    setCompanyDetails((prevDetails) => {
      const newPartner = {
        panNumber: "",
        panImage: null,
        aadharNumber: "",
        aadharImage: null,
        aadharBackImage: null,
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      };
      return {
        ...prevDetails,
        partners: [...prevDetails.partners, newPartner],
      };
    });
  };

  // Handle remove partner
  const handleRemovePartner = (index) => {
    setCompanyDetails((prevDetails) => {
      const updatedPartners = [...prevDetails.partners];
      updatedPartners.splice(index, 1);
      return { ...prevDetails, partners: updatedPartners };
    });
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
            <Select
              label="GST"
              value={companyDetails.gstSelected}
              onChange={handleGstChange}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {companyDetails.gstSelected === "No" && (
          <>
            <Grid item xs={12}>
              <Typography variant="h6">Firm Details</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="PAN Number"
                variant="outlined"
                name="companyPanNumber"
                required
                fullWidth
                value={companyDetails.companyPanNumber || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <FileUpload
              label="Upload PAN Image"
              onChange={(e) => handleFileChange(e, "companyPanImage")}
              preview={companyDetails.companyPanImage}
            />
            <Grid item xs={12} md={6}>
              <TextField
                label="Aadhar Number"
                variant="outlined"
                required
                fullWidth
                name="aadharNumber"
                value={companyDetails.aadharNumber || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <FileUpload
              label="Upload Aadhar Front Image"
              onChange={(e) => handleFileChange(e, "aadharImage")}
              preview={companyDetails.aadharImage}
            />
            <FileUpload
              label="Upload Aadhar Back Image"
              onChange={(e) => handleFileChange(e, "aadharBackImage")}
              preview={companyDetails.aadharBackImage}
            />
            <Grid item xs={12} md={6}>
              <TextField
                label="Firm Name"
                variant="outlined"
                required
                fullWidth
                name="firmName"
                value={companyDetails.firmName || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Firm Address"
                variant="outlined"
                required
                fullWidth
                name="firmAddress"
                value={companyDetails.firmAddress || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                style={{ backgroundColor: "#3 f51b5", color: "#fff" }}
              >
                Upload Document
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const previews = files.map((file) =>
                      URL.createObjectURL(file)
                    );
                    setCompanyDetails((prevDetails) => ({
                      ...prevDetails,
                      documentImages: previews,
                    }));
                  }}
                />
              </Button>
            </Grid>
            <BankDetails
              partner={companyDetails}
              handleBankDetailsChange={handleBankDetailsChange}
            />
          </>
        )}

        {companyDetails.gstSelected === "Yes" && (
          <>
            <Grid item xs={12}>
              <Typography variant="h5" component="h2" gutterBottom>
                GST Details
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="GST Number"
                variant="outlined"
                required
                fullWidth
                name="gstNo"
                value={companyDetails.gstNo || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Firm Name"
                variant="outlined"
                required
                fullWidth
                name="firmName"
                value={companyDetails.firmName || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Firm Address"
                variant="outlined"
                required
                fullWidth
                name="firmAddress"
                value={companyDetails.firmAddress || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Composition"
                variant="outlined"
                required
                fullWidth
                name="composition"
                value={companyDetails.composition || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h2" gutterBottom>
                Firm Details
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="firm-type-label">Firm Type</InputLabel>
                <Select
                  labelId="firm-type-label"
                  label="Firm Type"
                  value={companyDetails.firmType || ""}
                  onChange={handleFrimTypeChange}
                >
                  <MenuItem value="Propriter">Propriter</MenuItem>
                  <MenuItem value="Partnership">Partnership</MenuItem>
                  <MenuItem value="LLP">LLP</MenuItem>
                  <MenuItem value="PVT LTD">PVT LTD</MenuItem>
                  <MenuItem value="Limited">Limited</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Company PAN Number"
                variant="outlined"
                required
                fullWidth
                name="companyPanNumber"
                value={companyDetails.companyPanNumber || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <FileUpload
              label="Upload Company PAN Image"
              onChange={(e) => handleFileChange(e, "companyPanImage")}
              preview={companyDetails.companyPanImage}
            />
            <Grid item xs={6}>
              <TextField
                label="Aadhar Number"
                variant="outlined"
                required
                fullWidth
                name="aadharNumber"
                value={companyDetails.aadharNumber || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <FileUpload
              label="Upload Aadhar Front Image"
              onChange={(e) => handleFileChange(e, "aadharImage")}
              preview={companyDetails.aadharImage}
            />
            <FileUpload
              label="Upload Aadhar Back Image"
              onChange={(e) => handleFileChange(e, "aadharBack Image")}
              preview={companyDetails.aadharBackImage}
            />
            <Grid item xs={6}>
              <TextField
                label="CIN No"
                variant="outlined"
                required
                fullWidth
                name="cinNo"
                value={companyDetails.cinNo || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6} container spacing={2}>
              <Grid item xs={8}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  style={{ backgroundColor: "#3 f51b5", color: "#fff" }}
                >
                  Upload Document
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      const previews = files.map((file) =>
                        URL.createObjectURL(file)
                      );
                      setCompanyDetails((prevDetails) => ({
                        ...prevDetails,
                        documentImages: previews,
                      }));
                    }}
                  />
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Avatar
                  alt="Upload Document Preview"
                  src={
                    companyDetails.documentImages &&
                    companyDetails.documentImages[0]
                  }
                  style={{
                    width: "50px",
                    height: "50px",
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                />
              </Grid>
            </Grid>
            <BankDetails
              partner={companyDetails}
              handleBankDetailsChange={handleBankDetailsChange}
            />

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
            </Grid>
            {companyDetails.partners.map((partner, index) => (
              <PartnerDetails
                key={index}
                partner={{ ...partner, index }}
                handleFileChange={handleFileChange}
                onRemove={() => handleRemovePartner(index)}
              />
            ))}
          </>
        )}
      </Grid>

      <Grid
        container
        spacing={2}
        justifyContent="flex-start"
        style={{ marginTop: "20px" }}
      >
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddPartner;
