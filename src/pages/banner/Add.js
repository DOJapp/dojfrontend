import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Avatar,
  Button,
} from "@mui/material";
import List from "@mui/icons-material/List";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/loading/Loader.js";
import logo_icon from "../../assets/images/logo_icon.png";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { createBanner } from "../../redux/Actions/bannerActions.js";

const Add = ({ dispatch }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [redirectTo, setRedirectTo] = useState("");  // Determines if redirect is to product or restaurant
  const [status, setStatus] = useState("Active");
  const [icon, setIcon] = useState({ file: logo_icon, bytes: "" });
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");  // Holds productId or restaurantId depending on selection

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const handleIcon = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIcon({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],  // Stores the file itself for submission
      });
      handleError("icon", null);
    }
  };

  const validation = () => {
    let isValid = true;

    if (!icon.bytes) {
      handleError("icon", "Please select a banner image");
      isValid = false;
    }

    if (!redirectTo) {
      handleError("redirectTo", "Please select a redirect page");
      isValid = false;
    }

    if (!url) {
      handleError("url", "Please select a product or restaurant");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      setIsLoading(true);

      // Use FormData to handle file uploads
      const formData = new FormData();
      formData.append("image", icon.bytes);  // Append the image file
      formData.append("status", status);

      // Conditionally add either productId or restaurantId to the form data
      if (redirectTo === "product") {
        formData.append("productId", url);
      } else if (redirectTo === "restaurant") {
        formData.append("restaurantId", url);
      }

      // Dispatch the action to create the banner
      dispatch(createBanner(formData));

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating a delay

        navigate("/banner");
      } catch (error) {
        console.error("Error adding banner:", error);
        Swal.fire("Error!", "Failed to add banner.", "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setIcon({ file: logo_icon, bytes: "" });
    setRedirectTo("");
    setUrl("");  // Reset product or restaurant selection
    setStatus("Active");
    setError({});
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {isLoading && <Loader />}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Banner</div>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/banner")}
                className={classes.addButtontext}
              >
                <List /> Display Banner
              </Button>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              variant="outlined"
              error={!!error.redirectTo}
            >
              <InputLabel id="select-label">Select Redirect Page</InputLabel>
              <Select
                label="Select Page"
                labelId="select-label"
                value={redirectTo}
                onChange={(e) => {
                  setRedirectTo(e.target.value);
                  setUrl("");  // Reset the product/restaurant selection when changing redirect
                  handleError("redirectTo", null); // Clear error on change
                }}
              >
                <MenuItem value="">Select Options</MenuItem>
                <MenuItem value="product">Product</MenuItem>
                <MenuItem value="restaurant">Restaurant</MenuItem>
              </Select>
              <div className={classes.errorstyles}>{error.redirectTo}</div>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" required>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Block">Blocked</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Conditional rendering for Product Dropdown */}
          {redirectTo === "product" && (
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" error={!!error.url}>
                <InputLabel id="product-select-label">
                  Select Product
                </InputLabel>
                <Select
                  label="Select Product"
                  labelId="product-select-label"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                >
                  <MenuItem value="product1">Product 1</MenuItem>
                  <MenuItem value="product2">Product 2</MenuItem>
                  <MenuItem value="product3">Product 3</MenuItem>
                </Select>
                <div className={classes.errorstyles}>{error.url}</div>
              </FormControl>
            </Grid>
          )}

          {/* Conditional rendering for Restaurant Dropdown */}
          {redirectTo === "restaurant" && (
            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!error.url}
              >
                <InputLabel id="restaurant-select-label">
                  Select Restaurant
                </InputLabel>
                <Select
                  label="Select Restaurant"
                  labelId="restaurant-select-label"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                >
                  <MenuItem value="restaurant1">Restaurant 1</MenuItem>
                  <MenuItem value="restaurant2">Restaurant 2</MenuItem>
                  <MenuItem value="restaurant3">Restaurant 3</MenuItem>
                </Select>
                <div className={classes.errorstyles}>{error.url}</div>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} md={6} className={classes.uploadContainer}>
            <label className={classes.uploadImageButton}>
              Upload Picture
              <input
                onChange={handleIcon}
                hidden
                accept="image/*"
                type="file"
              />
            </label>
            <div className={classes.errorstyles}>{error.icon}</div>
            <Avatar src={icon.file} style={{ width: 56, height: 56 }} />
          </Grid>

          <Grid item xs={12} container justifyContent="center" spacing={2}>
            <Grid item>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Grid>

            <Grid item>
              <Button
                onClick={handleReset}
                variant="outlined"
                color="secondary"
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(null, mapDispatchToProps)(Add);
