import React, { useState, useEffect } from "react";
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
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Icons for password visibility
import { useStyles } from "../../assets/styles.js";
import Swal from "sweetalert2";
import { createPartner, getPartnerById } from "../../redux/Actions/partnerActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditPartner = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get partner ID from URL

  const [partner, setPartner] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    title: "",
    image: null,
    avatar: null,
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [status, setStatus] = useState("Active");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  useEffect(() => {
    // Fetch partner data by ID when the component mounts
    dispatch(getPartnerById(id));
  }, [dispatch, id]);

  const partnerState = useSelector((state) => state.partner);

  useEffect(() => {
    if (partnerState.loading) {
      setLoading(true);
      return;
    }

    if (partnerState.error) {
      setLoading(false);
      Swal.fire("Error!", partnerState.error, "error");
    } else if (partnerState.partner) {
      // Set the partner state with the fetched data
      const fetchedPartner = partnerState.partner;
      setPartner({
        name: fetchedPartner.name || "",
        email: fetchedPartner.email || "",
        phone: fetchedPartner.phone || "",
        password: "", // Resetting password for security
        title: fetchedPartner.title || "",
        address: fetchedPartner.address || "",
        city: fetchedPartner.city || "",
        state: fetchedPartner.state || "",
        zipCode: fetchedPartner.zipCode || "",
        image: null, // Resetting image since it will be uploaded again
        avatar: null, // Resetting avatar since it will be uploaded again
      });
      setImagePreview(fetchedPartner.image);
      setAvatarPreview(fetchedPartner.avatar);
      setStatus(fetchedPartner.status || "Active");
      setLoading(false);
    }
  }, [partnerState]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setPartner((prev) => ({
        ...prev,
        [name]: file,
      }));
      if (name === "image") {
        setImagePreview(URL.createObjectURL(file));
      } else if (name === "avatar") {
        setAvatarPreview(URL.createObjectURL(file));
      }
    } else {
      setPartner((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    let valid = true;

    const requiredFields = [
      "name",
      "email",
      "password",
      "phone",
      "title",
      "image",
      "avatar",
      "address",
      "city",
      "state",
      "zipCode",
    ];

    requiredFields.forEach((field) => {
      if (!partner[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        valid = false;
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (partner.email && !emailRegex.test(partner.email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }

    // Phone validation
    const phoneRegex = /^[6789]\d{9}$/; // Indian phone number format
    if (partner.phone && !phoneRegex.test(partner.phone)) {
      newErrors.phone = "Invalid phone number format. It should be 10 digits starting with 6, 7, 8, or 9.";
      valid = false;
    }

    // Zip code validation
    const zipCodeRegex = /^\d{6}$/; // 6 digit zip code
    if (partner.zipCode && !zipCodeRegex.test(partner.zipCode)) {
      newErrors.zipCode = "Invalid zip code format.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    setErrors({});

    if (!validate()) return;

    const formData = new FormData();
    for (const key in partner) {
      formData.append(key, partner[key]);
    }
    formData.append("status", status);

    dispatch(createPartner(formData));
  };

  useEffect(() => {
    if (partnerState.success) {
      Swal.fire("Success!", "Partner updated successfully!", "success");
      navigate("/partners");
    }
  }, [partnerState.success, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom align="left">
        Edit Partner
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            name="name"
            value={partner.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            name="email"
            value={partner.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"} // Toggle password visibility
            value={partner.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant="outlined" error={!!errors.avatar}>
            <InputLabel>Avatar</InputLabel>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={10}>
                <Button variant="outlined" component="label" fullWidth>
                  Upload Avatar
                  <input
                    type="file"
                    name="avatar"
                    hidden
                    accept="image/*"
                    onChange={handleChange}
                  />
                </Button>
                {errors.avatar && <p style={{ color: "red" }}>{errors.avatar}</p>}
              </Grid>
              <Grid item xs={2}>
                {avatarPreview && (
                  <Avatar
                    alt="Avatar Preview"
                    src={avatarPreview}
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </Grid>
            </Grid>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone"
            name="phone"
            value={partner.phone}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Partner Name"
            name="title"
            value={partner.title}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!errors.title}
            helperText={errors.title}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant="outlined" error={!!errors.image}>
            <InputLabel>Image</InputLabel>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={10}>
                <Button variant="outlined" component="label" fullWidth>
                  Upload Image
                  <input
                    type="file"
                    name="image"
                    hidden
                    accept="image/*"
                    onChange={handleChange}
                  />
                </Button>
              </Grid>
              <Grid item xs={2}>
                {imagePreview && (
                  <Avatar
                    alt="Image Preview"
                    src={imagePreview}
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </Grid>
            </Grid>
            {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Address"
            name="address"
            value={partner.address}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!errors.address}
            helperText={errors.address}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="City"
            name="city"
            value={partner.city}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!errors.city}
            helperText={errors.city}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="State"
            name="state"
            value={partner.state}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!errors.state}
            helperText={errors.state}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Zip Code"
            name="zipCode"
            value={partner.zipCode}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!errors.zipCode}
            helperText={errors.zipCode}
          />
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

        <Grid item xs={12} container justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EditPartner;
