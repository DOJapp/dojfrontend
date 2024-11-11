import React, { useState, useEffect } from "react";
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
  CircularProgress
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import FileUpload from "../../Components/FileUpload";
import BankDetails from "./BankDetails.js";
import { connect, useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/loading/Loader.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createPartner } from "../../redux/Actions/partnerActions.js";
import List from "@mui/icons-material/List";


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
        <Typography variant="h6" color="secondary" gutterBottom>{`Partner ${partner.index + 1
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
          onChange={(e) => handleFileChange(e, "aadharFrontImage", partner.index)}
          preview={partner.aadharFrontImage}
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


const AddPartner = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const dispatch = useDispatch();

  const [companyDetails, setCompanyDetails] = useState({
    gstSelected: "No",
    panNumber: "",
    panImage: null,
    aadharNumber: "",
    aadharFrontImage: null,
    aadharBackImage: null,
    firmName: "",
    firmAddress: "",
    documentImages: [],
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    gstNumber: "",
    gstType: "",
    compositonType: "",
    cessType: "",
    goodsServiceType: "",
    percentage: "",
    firmType: "",
    cinNumber: "",
    partners: [
      {
        panNumber: "",
        panImage: null,
        aadharNumber: "",
        aadharFrontImage: null,
        aadharBackImage: null,
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
    ],
  });


  // Handle GST selection change
  const handleGstChange = (event) => {
    setCompanyDetails({ ...companyDetails, gstSelected: event.target.value });
  };
  const handleGstTypeChange = (event) => {
    setCompanyDetails({ ...companyDetails, gstType: event.target.value });
  };

  const handleCompositonTypeChange = (event) => {
    setCompanyDetails({ ...companyDetails, compositonType: event.target.value });

  }
  const handleCessTypeChange = (event) => {
    setCompanyDetails({ ...companyDetails, cessType: event.target.value });

  }
  const handleGoosServiceTypeChange = (event) => {
    setCompanyDetails({ ...companyDetails, goodsServiceType: event.target.value });

  }
  // Handle Firm Type change
  const handleFirmTypeChange = (event) => {
    setCompanyDetails({ ...companyDetails, firmType: event.target.value });
  };

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let updatedValue = value;
    if (name === "panNumber" || name === "gstNumber") {
      updatedValue = value.toUpperCase();
    }

    if (name === "aadharNumber" && !/^\d*$/.test(value)) {
      return;
    }

    if (name === "aadharNumber") {
      if (!/^\d*$/.test(value)) {
        return;
      }
    }
    setCompanyDetails((prevDetails) => ({ ...prevDetails, [name]: updatedValue }));
  };

  // Handle file changes
  const handleFileChange = (event, name, index, isText = false) => {
    const value = isText ? event.target.value : event.target.files[0];

    if (!isText && value) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyDetails((prevDetails) => {
          const updatedPartners = [...prevDetails.partners];
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

    // const validationErrors = validateForm();
    // if (Object.keys(validationErrors).length > 0) {
    //   setError(validationErrors);
    //   return;
    // }
    console.log("ctesf", error);
    let formData;
    if (companyDetails.gstSelected === "No") {
      formData = {
        gstSelected: companyDetails.gstSelected,
        panNumber: companyDetails.panNumber,
        panImage: companyDetails.panImage,
        aadharNumber: companyDetails.aadharNumber,
        aadharFrontImage: companyDetails.aadharFrontImage,
        aadharBackImage: companyDetails.aadharBackImage,
        firmName: companyDetails.firmName,
        firmAddress: companyDetails.firmAddress,
        bankName: companyDetails.bankName,
        accountNumber: companyDetails.accountNumber,
        ifscCode: companyDetails.ifscCode,
        accountHolderName: companyDetails.accountHolderName,
        documentImages: companyDetails.documentImages,
      };
    } else {
      formData = {
        gstSelected: companyDetails.gstSelected,
        gstNumber: companyDetails.gstNumber,
        firmName: companyDetails.firmName,
        firmAddress: companyDetails.firmAddress,
        gstType: companyDetails.gstType,
        compositonType: companyDetails.compositonType,
        cessType: companyDetails.cessType,
        goodsServiceType: companyDetails.goodsServiceType,
        percentage: companyDetails.percentage,
        firmType: companyDetails.firmType,
        cinNumber: companyDetails.cinNumber,
        panNumber: companyDetails.panNumber,
        panImage: companyDetails.panImage,
        aadharNumber: companyDetails.aadharNumber,
        aadharFrontImage: companyDetails.aadharFrontImage,
        aadharBackImage: companyDetails.aadharBackImage,
        documentImages: companyDetails.documentImages,
        bankName: companyDetails.bankName,
        accountNumber: companyDetails.accountNumber,
        ifscCode: companyDetails.ifscCode,
        accountHolderName: companyDetails.accountHolderName,
        partners: companyDetails.partners,
      };
    }
    // Send formData to API
    console.log(formData);
    dispatch(createPartner(formData));
  };

  const partnerState = useSelector((state) => state.product);

  useEffect(() => {
    if (partnerState.loading) return;

  }, [partnerState]);

  // Handle add partner
  const handleAddPartner = () => {
    setCompanyDetails((prevDetails) => {
      const newPartner = {
        panNumber: "",
        panImage: null,
        aadharNumber: "",
        aadharFrontImage: null,
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


  const validateForm = () => {
    const errors = {};
    if (!companyDetails.firmName) {
      errors.firmName = "Firm Name is required.";
    }

    if (!companyDetails.firmAddress) {
      errors.firmAddress = "Firm Name is required.";
    }

    if (!companyDetails.panNumber) {
      errors.panNumber = "PAN Number is required.";
    } else if (companyDetails.panNumber.length !== 10) {
      errors.panNumber = "PAN Number must be exactly 10 characters.";
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(companyDetails.panNumber)) {
      errors.panNumber = "Invalid PAN Number format.";
    }

    if (!companyDetails.panImage) {
      errors.panImage = "PAN Image is required.";
    }

    if (!companyDetails.aadharNumber) {
      errors.aadharNumber = "Aadhar Number is required.";
    } else if (companyDetails.aadharNumber.length !== 12) {
      errors.aadharNumber = "Aadhar Number must be exactly 12 digits.";
    } else if (!/^\d{12}$/.test(companyDetails.aadharNumber)) {
      errors.aadharNumber = "Invalid Aadhar Number format. It must be a 12-digit number.";
    }

    if (!companyDetails.aadharFrontImage) {
      errors.aadharFrontImage = "aadhar Front Image is required.";
    }
    if (!companyDetails.aadharBackImage) {
      errors.aadharBackImage = "aadhar Back Image is required.";
    }

    if (!companyDetails.bankName) {
      errors.bankName = "Bank Name is required.";
    }
    if (!companyDetails.accountNumber) {
      errors.accountNumber = "Account Number is required.";
    }

    if (companyDetails.gstSelected === "Yes") {
      if (!companyDetails.gstNumber) {
        errors.gstNumber = "GST Number is required.";
      } else if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[Z]{1}[A-Z\d]{1}$/.test(companyDetails.gstNumber)) {
        errors.gstNumber = "Invalid GST Number format.";
      }


    }
    return errors;
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

      <Grid item xs={12}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <Typography variant="h6">Display Partner</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/partners")}
            startIcon={<List />}
            style={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: 8,
              padding: "8px 16px",
            }}
          >
            Add Partner
          </Button>
        </div>
      </Grid>
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
                required
                fullWidth
                name="panNumber"
                value={companyDetails.panNumber || ""}
                onChange={handleInputChange}
                error={!!error.panNumber}
                helperText={error.panNumber}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>
            <FileUpload
              label="Upload PAN Image"
              onChange={(e) => handleFileChange(e, "panImage")}
              preview={companyDetails.panImage}
              error={!!error.panImage}
              helperText={error.panImage}
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
                error={!!error.firmName}
                helperText={error.firmName}
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
                error={!!error.firmAddress}
                helperText={error.firmAddress}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Firm Details</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Aadhar Number"
                variant="outlined"
                required
                fullWidth
                name="aadharNumber"
                value={companyDetails.aadharNumber || ""}
                onChange={handleInputChange}
                error={!!error.aadharNumber}
                helperText={error.aadharNumber}
                inputProps={{ maxLength: 12 }}
              />
            </Grid>
            <FileUpload
              label="Upload Aadhar Front Image"
              onChange={(e) => handleFileChange(e, "aadharFrontImage")}
              preview={companyDetails.aadharFrontImage}
              error={!!error.aadharFrontImage}
              helperText={error.aadharFrontImage}
            />
            <Grid item xs={12} md={6} container spacing={2}>
              <Grid item xs={12} md={12}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  style={{
                    padding: "6px 10px",
                    color: "#fff",
                    borderRadius: 8,
                    background: "#1976d2"
                  }}
                >
                  Upload Document
                  <input
                    type="file"
                    hidden
                    accept="image/*,.pdf,.doc,.docx"
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
              <Grid item xs={12}>
                {companyDetails.documentImages &&
                  companyDetails.documentImages.length > 0 && (
                    <Grid item xs={4}>
                      <Grid container spacing={2}>
                        {companyDetails.documentImages.map((image, index) => (
                          <Grid item xs={4} key={index}>
                            <Avatar
                              alt={`Document Preview ${index + 1}`}
                              src={image}
                              style={{
                                width: "50px",
                                height: "50px",
                                marginLeft: "10px",
                                marginTop: "10px",
                              }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  )}
              </Grid>
            </Grid>
            <FileUpload
              label="Upload Aadhar Back Image"
              onChange={(e) => handleFileChange(e, "aadharBackImage")}
              preview={companyDetails.aadharBackImage}
              error={!!error.aadharBackImage}
              helperText={error.aadharBackImage}
            />



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
                label="GST Number "
                variant="outlined"
                required
                fullWidth
                placeholder="e.g., 22ABCDE1234F1Z5"
                name="gstNumber"
                value={companyDetails.gstNumber || ""}
                onChange={handleInputChange}
                error={!!error.gstNumber}
                helperText={error.gstNumber}
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
                error={!!error.firmName}
                helperText={error.firmName}
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
                error={!!error.firmAddress}
                helperText={error.firmAddress}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel>GST Type</InputLabel>
                <Select
                  label="GST Type"
                  value={companyDetails.gstType}
                  onChange={handleGstTypeChange}
                >
                  <MenuItem value="Compositon">Compositon</MenuItem>
                  <MenuItem value="Regular">Regular</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel>Compositon Type</InputLabel>
                <Select
                  label="Compositon Type"
                  value={companyDetails.compositonType}
                  onChange={handleCompositonTypeChange}
                >
                  <MenuItem value="Inclusive">Inclusive</MenuItem>
                  <MenuItem value="Exclusive">Exclusive</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel>Cess Type</InputLabel>
                <Select
                  label="Compositon Type"
                  value={companyDetails.cessType}
                  onChange={handleCessTypeChange}
                >
                  <MenuItem value="Cess">Cess</MenuItem>
                  <MenuItem value="E-cess">E-cess</MenuItem>
                  <MenuItem value="A-cess">A-cess</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Percentage"
                variant="outlined"
                required
                fullWidth
                name="percentage"
                value={companyDetails.percentage || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel>GST Type</InputLabel>
                <Select
                  label="Goods Service Type"
                  value={companyDetails.goodsServiceType}
                  onChange={handleGoosServiceTypeChange}
                >
                  <MenuItem value="CGST">CGST  (Central Goods and Services Tax)</MenuItem>
                  <MenuItem value="SGST">SGST (State Goods and Services. Tax )</MenuItem>
                  <MenuItem value="IGST">IGST (Integrated Goods and Services Tax)</MenuItem>
                </Select>
              </FormControl>
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
                  onChange={handleFirmTypeChange}
                >
                  <MenuItem value="Proprietor">Proprietor</MenuItem>
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
                name="panNumber"
                value={companyDetails.panNumber || ""}
                onChange={handleInputChange}
                error={!!error.panNumber}
                helperText={error.panNumber}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>
            <FileUpload
              label="Upload Company PAN Image"
              onChange={(e) => handleFileChange(e, "panImage")}
              preview={companyDetails.panImage}
            />
            {companyDetails.firmType == "Proprietor" && (
              <>
                <Grid item xs={6}>
                  <TextField
                    label="Aadhar Number"
                    variant="outlined"
                    required
                    fullWidth
                    name="aadharNumber"
                    value={companyDetails.aadharNumber || ""}
                    onChange={handleInputChange}
                    error={!!error.aadharNumber}
                    helperText={error.aadharNumber}
                    inputProps={{ maxLength: 12 }}
                  />
                </Grid>
                <FileUpload
                  label="Upload Aadhar Front Image"
                  onChange={(e) => handleFileChange(e, "aadharFrontImage")}
                  preview={companyDetails.aadharFrontImage}
                />
                <FileUpload
                  label="Upload Aadhar Back Image"
                  onChange={(e) => handleFileChange(e, "aadharBackImage")}
                  preview={companyDetails.aadharBackImage}
                />
              </>
            )}
            {companyDetails.firmType !== "Proprietor" && companyDetails.firmType !== "Partnership" && (

              <Grid item xs={6}>
                <TextField
                  label="CIN No"
                  variant="outlined"
                  required
                  fullWidth
                  name="cinNumber"
                  value={companyDetails.cinNumber || ""}
                  onChange={handleInputChange}
                />
              </Grid>
            )}
            <Grid item xs={12} md={6} container spacing={2}>
              <Grid item xs={8}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  style={{ backgroundColor: "#3f51b5", color: "#fff" }}
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
            {companyDetails.firmType !== "Proprietor" && (
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
            )}
            {companyDetails.firmType !== "Proprietor" && companyDetails.partners.map((partner, index) => (
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
        justifyContent="center"
        style={{ marginTop: "20px" }}
      >
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={partnerState.loading}
            style={{
              textTransform: "none",
              borderRadius: 5,
              padding: "6px 10px",
              color: "#fff",
              background: "#1976d2"
            }}
          >
            {partnerState.loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddPartner;
