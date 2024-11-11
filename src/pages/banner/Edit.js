import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as BannerActions from "../../redux/Actions/bannerActions.js";
import Swal from "sweetalert2";
import logo_icon from "../../assets/images/logo_icon.png";
import DvrIcon from "@mui/icons-material/Dvr";
import { getActiveProducts } from "../../redux/Actions/productActions.js";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [redirectTo, setRedirectTo] = useState("");
  const [url, setUrl] = useState(""); // This represents productId or restaurant
  const [status, setStatus] = useState("Active");
  const [icon, setIcon] = useState({ file: logo_icon, bytes: "" });
  const [error, setError] = useState({});

  const { success, error: bannerError, loading, selectedBanner } = useSelector(
    (state) => state.banner
  );

  const activeProducts = useSelector((state) => state.product.products || []);

  useEffect(() => {
    if (id) {
      dispatch(BannerActions.getBannerById(id));
    }
    dispatch(getActiveProducts());
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedBanner) {
      setRedirectTo(selectedBanner.redirectTo || "");
      setUrl(selectedBanner.productId || ""); // Ensure productId is handled properly
      setStatus(selectedBanner.status || "Active");
      setIcon({ file: selectedBanner.image || logo_icon, bytes: "" });
    }
  }, [selectedBanner]);

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  useEffect(() => {
    if (success) {
      Swal.fire("Success!", "Banner updated successfully.", "success");
      navigate("/banner");
    } else if (bannerError) {
      Swal.fire("Error!", "Failed to update banner.", "error");
    }
  }, [success, bannerError, navigate]);

  const handleIcon = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIcon({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      handleError("icon", null);
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!icon.bytes && icon.file === logo_icon) {
      handleError("icon", "Please select a banner image");
      isValid = false;
    }

    if (!redirectTo) {
      handleError("redirectTo", "Please select a redirect page");
      isValid = false;
    }

    if (!url) {
      handleError("url", "Please select a valid URL");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const data = {
        image: icon.bytes || icon.file,
        redirectTo,
        status,
        productId: url, // Use url for productId or restaurant
      };

      try {
        await dispatch(BannerActions.updateBanner(id, data));
      } catch {
        Swal.fire("Error!", "Failed to update banner.", "error");
      }
    }
  };

  const handleReset = () => {
    if (selectedBanner) {
      setRedirectTo(selectedBanner.redirectTo || "");
      setUrl(selectedBanner.productId || "");
      setStatus(selectedBanner.status || "Active");
      setIcon({ file: selectedBanner.image || logo_icon, bytes: "" });
      setError({});
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mx: "auto", mt: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <Typography variant="h5" gutterBottom>
          Edit Banner
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/banner")}
          startIcon={<DvrIcon />}
          style={{ textTransform: "none", fontWeight: "bold", borderRadius: 8, padding: "8px 16px" }}
        >
          Display Banner
        </Button>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!error.redirectTo}>
            <InputLabel>Select Redirect Page</InputLabel>
            <Select
              label="Select Redirect Page"
              value={redirectTo}
              onChange={(e) => {
                setRedirectTo(e.target.value);
                setUrl(""); // Reset URL when redirect page changes
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
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Blocked">Blocked</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {redirectTo === "product" && (
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!error.url}>
              <InputLabel>Select Product</InputLabel>
              <Select
                label="Select Product"
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
            <FormControl fullWidth error={!!error.url}>
              <InputLabel>Select Restaurant</InputLabel>
              <Select
                label="Select Restaurant"
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
          <Button
            variant="outlined"
            component="label"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "6px 10px",
              fontWeight: "bold",
              borderRadius: 8,
              background: "#1976d2",
              color: "#fff",
            }}
          >
            Upload Picture
            <input type="file" hidden accept="image/*" onChange={handleIcon} />
          </Button>
          {error.icon && (
            <Typography variant="caption" color="error" sx={{ mt: 1 }}>
              {error.icon}
            </Typography>
          )}
          <Avatar src={icon.file} sx={{ width: 56, height: 56, mt: 1 }} />
        </Grid>

        <Grid item xs={12} container justifyContent="center" spacing={2}>
          <Grid item>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              variant="contained"
              color="primary"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {loading ? "Loading..." : "Update"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleReset}
              variant="contained"
              color="secondary"
              style={{
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: 8,
                padding: "8px 16px",
              }}
            >
              RESET
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Edit;
