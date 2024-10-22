import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import { Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const PrivacyPolicy = () => {
  var classes = useStyles();
  const navigate = useNavigate();

  const [error, setError] = useState({
    shortBio: "",
  });

  const [shortBio, setShortBio] = useState("");

  const handleValidation = () => {
    let isValid = true;
    let newErrors = {};

    // Validate Description
    if (!shortBio.trim()) {
      newErrors.shortBio = "Description is required";
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      // Perform submit logic here
      // ...

      // Reset the form
      setShortBio("");
      setError({
        shortBio: "",
      });

      // Optionally, navigate to another page
      navigate("/your-success-page");
    }
  };

  const handleReset = () => {
    // Reset the form
    setShortBio("");
    setError({
      shortBio: "",
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Privacy Policy</div>
            </div>
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              label="Description"
              value={shortBio}
              variant="outlined"
              fullWidth
              error={!!error.shortBio}
              helperText={error.shortBio}
              onChange={(e) => setShortBio(e.target.value)}
            />
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              Submit
            </div>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleReset} className={classes.denyButton}>
              Reset
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PrivacyPolicy;