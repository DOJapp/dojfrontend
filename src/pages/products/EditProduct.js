import React, { useState } from "react";
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
import { useStyles } from "../../assets/styles.js";

const EditProduct = () => {
  const classes = useStyles();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    discount: "",
    quantity: "",
    image: null,
    deliveryMode: "",
  });

  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Validate numeric inputs
    if (name === "price" || name === "discount" || name === "quantity") {
      const numericValue = value.replace(/[^0-9.]/g, "");
      setProduct((prev) => ({ ...prev, [name]: numericValue }));
      return;
    }

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

  const handleSubmit = () => {
    console.log("Product Added:", product);
    // Reset the form after submission
    setProduct({
      name: "",
      description: "",
      category: "",
      price: "",
      discount: "",
      quantity: "",
      image: null,
      deliveryMode: "",
    });
    setImagePreview(null);
  };

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
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required variant="outlined">
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              name="category"
              value={product.category}
              onChange={handleChange}
            >
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="home">Home</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            name="price"
            type="text" // Changed to text for custom validation
            value={product.price}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Discount"
            name="discount"
            type="text" // Changed to text for custom validation
            value={product.discount}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Quantity"
            name="quantity"
            type="text" // Changed to text for custom validation
            value={product.quantity}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
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
          </Grid>
          {imagePreview && (
            <Grid item xs={4}>
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            </Grid>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required variant="outlined">
            <InputLabel>Delivery Mode</InputLabel>
            <Select
              label="Delivery Mode"
              name="deliveryMode"
              value={product.deliveryMode}
              onChange={handleChange}
            >
              <MenuItem value="standard">Standard</MenuItem>
              <MenuItem value="express">Express</MenuItem>
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
            required
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

export default EditProduct;
