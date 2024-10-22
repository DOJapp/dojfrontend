import React, { useEffect, useState } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Components/loading/Loader.js";
import logo_icon from "../../assets/images/logo_icon.png";
import { Colors } from "../../assets/styles.js";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import * as BannerActions from "../../redux/Actions/bannerActions.js";

const Edit = ({ dispatch }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the banner ID from the URL
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [redirectTo, setRedirectTo] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("Active");
  const [icon, setIcon] = useState({ file: logo_icon, bytes: "" });
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch the existing banner details using the ID
    const fetchBannerDetails = async () => {
      setIsLoading(true);
      try {
        const banner = await dispatch(BannerActions.getBannerById(id)); // Make sure this action exists
        setTitle(banner.title);
        setRedirectTo(banner.redirectTo);
        setUrl(banner.redirectionUrl);
        setStatus(banner.status);
        setIcon({ file: banner.bannerImage, bytes: "" }); // Assuming bannerImage is a URL
      } catch (error) {
        Swal.fire("Error!", "Failed to fetch banner details.", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBannerDetails();
  }, [id, dispatch]);

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const handleIcon = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIcon({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      handleError("icon", null);
    }
  };

  const validation = () => {
    let isValid = true;

    if (!title) {
      handleError("title", "Please input title");
      isValid = false;
    }

    if (!icon.bytes) {
      handleError("icon", "Please select a banner image");
      isValid = false;
    }

    if (!redirectTo) {
      handleError("redirectTo", "Please select a redirect page");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      setIsLoading(true);
      const data = {
        title,
        bannerImage: icon.bytes || icon.file, // Use the new image or the existing one
        redirectTo,
        redirectionUrl: url,
        bannerFor: "app",
        status,
      };

      dispatch(BannerActions.updateAppBanner(id, data)) // Make sure this action exists
        .then(() => {
          setIsLoading(false);
          Swal.fire("Success!", "Banner updated successfully.", "success");
          navigate("/banner");
        })
        .catch((err) => {
          setIsLoading(false);
          Swal.fire("Error!", "Failed to update banner.", "error");
        });
    }
  };

  const handleReset = () => {
    setTitle("");
    setIcon({ file: logo_icon, bytes: "" });
    setRedirectTo("");
    setUrl("");
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
              <div className={classes.heading}>Edit Banner</div>
              <div
                onClick={() => navigate("/banner")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Banner</div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Enter Title"
              error={!!error.title}
              helperText={error.title}
              value={title}
              onFocus={() => handleError("title", null)}
              onChange={(event) => setTitle(event.target.value)}
              variant="outlined"
              fullWidth
            />
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
                onChange={(e) => setRedirectTo(e.target.value)}
              >
                <MenuItem value="1">Read Page</MenuItem>
                <MenuItem value="customer_home">Customer Home</MenuItem>
                <MenuItem value="astrologer_profile">
                  Astrologers Profile
                </MenuItem>
                <MenuItem value="astrologer_home">Astrologers Home</MenuItem>
                <MenuItem value="4">Recharge Page</MenuItem>
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
                <MenuItem value="Blocked">Blocked</MenuItem>
              </Select>
            </FormControl>
          </Grid>
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
            <Avatar
              color={Colors.primaryDark}
              src={icon.file}
              style={{ width: 56, height: 56 }}
            />
          </Grid>

          <Grid item xs={12} container justifyContent="center" spacing={2}>
            <Grid item>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                variant="contained"
                color="primary"
              >
                Update
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

export default connect(null, mapDispatchToProps)(Edit);
