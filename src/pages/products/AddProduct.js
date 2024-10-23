import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/Actions/categoryActions";
import { useStyles } from "../../assets/styles.js";
import { createProduct } from "../../redux/Actions/productActions";
import Swal from "sweetalert2"; // Import Swal for alerts

const AddProduct = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    categoryId: "",
    price: "",
    discount: "",
    quantity: "",
    image: null,
    deliveryMode: "",
  });

  const [status, setStatus] = useState("Active"); // State for product status
  const [imagePreview, setImagePreview] = useState(null);

  // State for error messages
  const [errors, setErrors] = useState({
    name: "",
    categoryId: "",
    price: "",
    quantity: "",
    deliveryMode: "",
    image: "",
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setProduct((prev) => ({
        ...prev,
        [name]: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      name: "",
      categoryId: "",
      price: "",
      quantity: "",
      deliveryMode: "",
      image: "",
    };

    if (!product.name) {
      newErrors.name = "Name is required.";
      valid = false;
    }
    if (!product.categoryId) {
      newErrors.categoryId = "Category is required.";
      valid = false;
    }
    if (!product.price) {
      newErrors.price = "Price is required.";
      valid = false;
    }
    if (!product.quantity) {
      newErrors.quantity = "Quantity is required.";
      valid = false;
    }
    if (!product.deliveryMode) {
      newErrors.deliveryMode = "Delivery mode is required.";
      valid = false;
    }
    if (!product.image) {
      newErrors.image = "Image is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid; // Return whether the form is valid
  };

  const handleSubmit = () => {
    // Reset errors
    setErrors({
      name: "",
      categoryId: "",
      price: "",
      quantity: "",
      deliveryMode: "",
      image: "",
    });

    if (!validate()) return; // Validate and stop if there are errors

    // Create FormData to handle file uploads
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("categoryId", product.categoryId);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    formData.append("quantity", product.quantity);
    formData.append("image", product.image);
    formData.append("deliveryMode", product.deliveryMode);
    formData.append("status", status); // Append status to FormData

    // Dispatch the create product action
    dispatch(createProduct(formData));
  };

  // Listen for changes in product creation success or failure
  const productState = useSelector((state) => state.product);

  useEffect(() => {
    if (productState.loading) return;

    if (productState.error) {
      Swal.fire("Error!", productState.error, "error");
    } else if (productState.products.length > 0) {
      Swal.fire("Success!", "Product added successfully!", "success");
      // Reset form after submission
      setProduct({
        name: "",
        description: "",
        categoryId: "",
        price: "",
        discount: "",
        quantity: "",
        image: null,
        deliveryMode: "",
      });
      setStatus("Active"); // Reset status to default
      setImagePreview(null);
    }
  }, [productState]);

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom align="left">
        Add Product
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            required
            variant="outlined"
            error={!!errors.categoryId}
          >
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              name="categoryId"
              value={product.categoryId}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
            {errors.categoryId && (
              <p style={{ color: "red" }}>{errors.categoryId}</p>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            name="price"
            type="text"
            value={product.price}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!errors.price}
            helperText={errors.price}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Discount"
            name="discount"
            type="text"
            value={product.discount}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Quantity"
            name="quantity"
            type="text"
            value={product.quantity}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!errors.quantity}
            helperText={errors.quantity}
          />
        </Grid>

        <Grid item xs={12} sm={6} container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <Button variant="outlined" component="label" fullWidth required>
              Upload Image
              <input
                type="file"
                name="image"
                hidden
                accept="image/*"
                onChange={handleChange}
              />
            </Button>
            {errors.image && (
              <p style={{ color: "red" }}>{errors.image}</p>
            )}
          </Grid>
          {imagePreview && (
            <Grid item xs={4}>
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </Grid>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required variant="outlined" error={!!errors.deliveryMode}>
            <InputLabel>Delivery Mode</InputLabel>
            <Select
              label="Delivery Mode"
              name="deliveryMode"
              value={product.deliveryMode}
              onChange={handleChange}
            >
              <MenuItem value="">Select Delivery Mode</MenuItem>
              <MenuItem value="instant">Instant</MenuItem>
              <MenuItem value="scheduled">Scheduled</MenuItem>
            </Select>
            {errors.deliveryMode && (
              <p style={{ color: "red" }}>{errors.deliveryMode}</p>
            )}
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

        <Grid item xs={12} sm={12}>
          <TextField
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            multiline
          />
        </Grid>

        <Grid item xs={12} container justifyContent="center">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Product
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddProduct;