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
} from "@mui/material";
import { useStyles } from "../../assets/styles.js";
import Swal from "sweetalert2";
import { createRestaurant } from "../../redux/Actions/restaurantActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddRestaurant = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState({
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setRestaurant((prev) => ({
        ...prev,
        [name]: file,
      }));
      if (name === "image") {
        setImagePreview(URL.createObjectURL(file));
      } else if (name === "avatar") {
        setAvatarPreview(URL.createObjectURL(file));
      }
    } else {
      setRestaurant((prev) => ({
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
      if (!restaurant[field]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
        valid = false;
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (restaurant.email && !emailRegex.test(restaurant.email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }

    // Phone validation (example: US phone number)
    const phoneRegex = /^[6789]\d{9}$/; // Indian phone number format
    if (restaurant.phone && !phoneRegex.test(restaurant.phone)) {
      newErrors.phone =
        "Invalid phone number format. It should be 10 digits starting with 6, 7, 8, or 9.";
      valid = false;
    }

    // Zip code validation (example: US zip code)
    const zipCodeRegex = /^\d{6}$/; // Adjust regex as needed
    if (restaurant.zipCode && !zipCodeRegex.test(restaurant.zipCode)) {
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
    for (const key in restaurant) {
      formData.append(key, restaurant[key]);
    }
    formData.append("status", status);

    dispatch(createRestaurant(formData));
  };

  const restaurantState = useSelector((state) => state.restaurant);
  // console.log("restaurantState",restaurantState)
  useEffect(() => {
    if (restaurantState.loading) {
      setLoading(true);
      return;
    }
    setLoading(false);
    if (restaurantState.error) {
      console.log(restaurantState.error);
      setLoading(false);
      Swal.fire("Error!", restaurantState.error, "error");
    } else if (restaurantState.success) {
      setLoading(false);
      setRestaurant({
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

      setImagePreview(null);
      setAvatarPreview(null);
      navigate("/restaurants");
    }
  }, [restaurantState]);

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom align="left">
        Add Restaurant
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            name="name"
            value={restaurant.name}
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
            value={restaurant.email}
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
            type="password"
            value={restaurant.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!errors.password}
            helperText={errors.password}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl
            required
            fullWidth
            variant="outlined"
            error={!!errors.avatar}
          >
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
                {errors.avatar && (
                  <p style={{ color: "red" }}>{errors.avatar}</p>
                )}
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
            value={restaurant.phone}
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
            label="Restaurant Name"
            name="title"
            value={restaurant.title}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!errors.title}
            helperText={errors.title}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl
            required
            fullWidth
            variant="outlined"
            error={!!errors.image}
          >
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
            value={restaurant.address}
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
            value={restaurant.city}
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
            value={restaurant.state}
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
            value={restaurant.zipCode}
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
            {loading ? "Submit..." : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddRestaurant;
