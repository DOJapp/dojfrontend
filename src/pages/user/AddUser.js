import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Grid,
  TextField,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";

export const AddUser = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [altMobile, setAltMobile] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [addressTitle, setAddressTitle] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [status, setStatus] = useState(""); // Initialize as an empty string
  const [referralCode, setReferralCode] = useState("");
  const [submitText, setSubmitText] = useState("Submit");

  const handleSubmit = () => {
    const validationErrors = {};
    if (!firstName) {
      validationErrors.firstName = "First Name is required";
    }
    if (!lastName) {
      validationErrors.lastName = "Last Name is required";
    }
    if (!email) {
      validationErrors.email = "Email is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }
    if (!altMobile) {
      validationErrors.altMobile = "Alternate Mobile Number is required";
    }

    if (Object.keys(validationErrors).length === 0) {
      setSubmitText("Submitting...");
      // Implement submission logic here
      // Resetting submitText after submission logic
      setSubmitText("Submit");
    } else {
      setErrors(validationErrors);
    }
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setMobile("");
    setAltMobile("");
    setPassword("");
    setGender("");
    setArea("");
    setLandmark("");
    setAddressTitle("");
    setZipcode("");
    setWalletBalance("");
    setStatus(""); // Reset status
    setReferralCode("");
    setErrors({});
    setSubmitText("Submit");
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add User</div>
              <div
                onClick={() => navigate("/users")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Users</div>
              </div>
            </div>
          </Grid>

          <Grid item lg={6}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              label="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              label="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              label="Alternate Mobile Number"
              value={altMobile}
              onChange={(e) => setAltMobile(e.target.value)}
              error={!!errors.altMobile}
              helperText={errors.altMobile}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth variant="outlined">
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                displayEmpty
                variant="outlined"
                label="Gender"
              >
                <MenuItem value="" disabled>
                  Select Gender
                </MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <TextField
              label="Area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              label="Landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              label="Address Title"
              value={addressTitle}
              onChange={(e) => setAddressTitle(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              label="Zip Code"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              label="Wallet Balance"
              value={walletBalance}
              onChange={(e) => setWalletBalance(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              label="Referral Code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Status</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={status === "active"}
                      onChange={() => {
                        setStatus("active");
                      }}
                    />
                  }
                  label="Active"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={status === "inactive"}
                      onChange={() => {
                        setStatus("inactive");
                      }}
                    />
                  }
                  label="Inactive"
                />
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid
            item
            lg={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "16px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ marginRight: "8px" }}
            >
              {submitText}
            </Button>
            <Button variant="contained" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AddUser;
