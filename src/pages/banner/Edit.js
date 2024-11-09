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

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [redirectTo, setRedirectTo] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("Active");
  const [icon, setIcon] = useState({ file: logo_icon, bytes: "" });

  const { success, error: bannerError, loading } = useSelector(
    (state) => state.banner
  );

  useEffect(() => {
    const fetchBannerDetails = async () => {
      try {
        const banner = await dispatch(BannerActions.getBannerById(id));
        setRedirectTo(banner.redirectTo);
        setUrl(banner.redirectionUrl);
        setStatus(banner.status);
        setIcon({ file: banner.bannerImage, bytes: "" });
      } catch (error) {
        Swal.fire("Error!", "Failed to fetch banner details.", "error");
      }
    };

    fetchBannerDetails();
  }, [id, dispatch]);

  const handleUpdateResult = () => {
    if (success) {
      Swal.fire("Success!", "Banner updated successfully.", "success");
      navigate("/banner");
    } else if (bannerError) {
      Swal.fire("Error!", "Failed to update banner.", "error");
    }
  };

  useEffect(() => {
    if (success || bannerError) handleUpdateResult();
  }, [success, bannerError]);

  const handleIcon = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIcon({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
    }
  };

  const validation = () => {
    let isValid = true;
    if (!icon.bytes) {
      Swal.fire("Validation Error", "Please select a banner image", "error");
      isValid = false;
    }
    if (!redirectTo) {
      Swal.fire("Validation Error", "Please select a redirect page", "error");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      const data = {
        bannerImage: icon.bytes || icon.file,
        redirectTo,
        redirectionUrl: url,
        bannerFor: "app",
        status,
      };

      try {
        await dispatch(BannerActions.updateBanner(id, data));
      } catch {
        Swal.fire("Error!", "Failed to update banner.", "error");
      }
    }
  };

  const handleReset = () => {
    setRedirectTo("");
    setUrl("");
    setStatus("Active");
    setIcon({ file: logo_icon, bytes: "" });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mx: "auto", mt: 4 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Edit Banner
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/banner")}
          startIcon={<DvrIcon />}
          style={{
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: 8,
            padding: "8px 16px",
          }}
        >
          Display Banner
        </Button>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Select Redirect Page</InputLabel>
            <Select
              label="Select Redirect Page"
              value={redirectTo}
              onChange={(e) => setRedirectTo(e.target.value)}
            >
              <MenuItem value="product">Product</MenuItem>
              <MenuItem value="restaurant">Restaurant</MenuItem>
            </Select>
            {bannerError?.redirectTo && (
              <Typography variant="caption" color="error">
                {bannerError.redirectTo}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
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

        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Upload Picture
          </Typography>
          <input
            onChange={handleIcon}
            hidden
            accept="image/*"
            type="file"
            id="icon-upload"
          />
          <label htmlFor="icon-upload">
            <Button
              variant="outlined"
              component="label"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px 16px",
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: 8,
              }}
            >
              Choose File
            </Button>
          </label>
          {bannerError?.icon && (
            <Typography variant="caption" color="error" sx={{ mt: 1 }}>
              {bannerError.icon}
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
              sx={{
                color: "white",
                backgroundColor: "primary.main",
                textTransform: "none",
                px: 3,
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Update"
              )}
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleReset}
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "secondary.main",
                borderColor: "secondary.main",
                px: 3,
              }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Edit;
