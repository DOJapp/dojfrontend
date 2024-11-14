import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Avatar,
  Button,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import List from "@mui/icons-material/List";
import { useNavigate } from "react-router-dom";
import logo_icon from "../../assets/images/logo_icon.png";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { createBanner } from "../../redux/Actions/bannerActions.js";
import { getActiveProducts } from "../../redux/Actions/productActions.js";

const Add = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const {
    success,
    error: bannerError,
    loading,
  } = useSelector((state) => state.banner);
  const activeProducts = useSelector((state) => state.product.products || []);

  // Local state
  const [redirectTo, setRedirectTo] = useState("");
  const [status, setStatus] = useState("Active");
  const [icon, setIcon] = useState({ file: logo_icon, bytes: "" });
  const [error, setError] = useState({});
  const [url, setUrl] = useState("");
  const [openImagePreview, setOpenImagePreview] = useState(false);

  // Fetch active products when the component mounts
  useEffect(() => {
    dispatch(getActiveProducts());
  }, [dispatch]);

  // Handle errors
  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  // Handle icon (image) file selection
  const handleIcon = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIcon({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      handleError("icon", null); // Clear icon error when user selects an image
    }
  };

  // Form validation
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

  // Success and error handling after the banner creation process
  useEffect(() => {
    if (success) {
      Swal.fire("Success!", "Banner added successfully.", "success");
      navigate("/banner");
      handleReset(); // Reset form state after success
    } else if (bannerError) {
      Swal.fire("Error!", "Failed to add banner.", "error");
    }
  }, [success, bannerError, navigate]);

  // Handle form submission
  const handleSubmit = async () => {
    if (validation()) {
      const formData = new FormData();
      formData.append("image", icon.bytes);
      formData.append("redirectTo", redirectTo);
      formData.append("status", status);

      if (redirectTo === "product") {
        formData.append("productId", url);
      } else if (redirectTo === "restaurant") {
        formData.append("restaurantId", url);
      }

      dispatch(createBanner(formData)); // Dispatch action to create the banner
    }
  };

  // Reset form fields
  const handleReset = () => {
    setIcon({ file: logo_icon, bytes: "" });
    setRedirectTo("");
    setUrl("");
    setStatus("Active");
    setError({});
  };

  return (
    <Paper sx={{ padding: 2, margin: "auto", mt: 1 }}>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Typography variant="h6">Add Banner</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/banner")}
            startIcon={<List />}
          >
            Display Banner
          </Button>
        </div>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl
            fullWidth
            variant="outlined"
            error={!!error.redirectTo}
            sx={{ minWidth: 120 }}
          >
            <InputLabel id="select-label">Select Redirect Page</InputLabel>
            <Select
              label="Select Page"
              labelId="select-label"
              value={redirectTo}
              onChange={(e) => {
                setRedirectTo(e.target.value);
                setUrl("");
                handleError("redirectTo", null);
              }}
            >
              <MenuItem value="product">Product</MenuItem>
              <MenuItem value="restaurant">Restaurant</MenuItem>
            </Select>
            {error.redirectTo && (
              <Typography variant="caption" color="error">
                {error.redirectTo}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Blocked">Blocked</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {redirectTo === "product" && (
          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              variant="outlined"
              error={!!error.url}
              sx={{ minWidth: 120 }}
            >
              <InputLabel id="product-select-label">Select Product</InputLabel>
              <Select
                label="Select Product"
                labelId="product-select-label"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              >
                {activeProducts.map((product) => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
              {error.url && (
                <Typography variant="caption" color="error">
                  {error.url}
                </Typography>
              )}
            </FormControl>
          </Grid>
        )}

        {redirectTo === "restaurant" && (
          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              variant="outlined"
              error={!!error.url}
              sx={{ minWidth: 120 }}
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
              {error.url && (
                <Typography variant="caption" color="error">
                  {error.url}
                </Typography>
              )}
            </FormControl>
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <Button variant="outlined" component="label">
            Upload Picture
            <input type="file" hidden accept="image/*" onChange={handleIcon} />
          </Button>
          {error.icon && (
            <Typography
              variant="caption"
              color="error"
              sx={{ display: "block", mt: 1 }}
            >
              {error.icon}
            </Typography>
          )}
          <Avatar
            src={icon.file}
            onClick={() => setOpenImagePreview(true)}
            sx={{
              cursor: "pointer",
              width: 56,
              height: 56,
              marginTop: 1,
            }}
          />
        </Grid>

        <Grid item xs={12} container justifyContent="center" spacing={2}>
          <Grid item>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              variant="contained"
              color="primary"
              startIcon={
                loading ? <CircularProgress size={20} color="inherit" /> : null
              }
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Grid>

          <Grid item>
            <Button onClick={handleReset} variant="contained" color="secondary">
              RESET
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        open={openImagePreview}
        onClose={() => setOpenImagePreview(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          <img
            src={icon.file}
            alt="Preview"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenImagePreview(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Add;
