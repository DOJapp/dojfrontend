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
  CircularProgress,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/Actions/categoryActions";
import { createProduct } from "../../redux/Actions/productActions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import List from "@mui/icons-material/List";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openImagePreview, setOpenImagePreview] = useState(false);

  const categories = useSelector((state) => state.category.categories);
  const { success, error, loading } = useSelector((state) => state.product);

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

  const [status, setStatus] = useState("Active");
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const validate = () => {
    const newErrors = {};
    if (!product.name) newErrors.name = "Name is required.";
    if (!product.categoryId) newErrors.categoryId = "Category is required.";
    if (!product.price) newErrors.price = "Price is required.";
    if (!product.quantity) newErrors.quantity = "Quantity is required.";
    if (!product.deliveryMode) newErrors.deliveryMode = "Delivery mode is required.";
    if (!product.image) newErrors.image = "Image is required.";

    // Check if discount is greater than price
    if (parseFloat(product.discount) > parseFloat(product.price)) {
      newErrors.discount = "Discount cannot be greater than price.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // For price and discount fields, allow only numbers and decimals
    if ((name === "price" || name === "discount") && !/^\d*\.?\d*$/.test(value)) {
      return; // Prevent change if value doesn't match the pattern
    }

    if (files) {
      const file = files[0];
      setProduct((prev) => ({ ...prev, [name]: file }));
      setImagePreview(URL.createObjectURL(file)); // Set image preview
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }

    validate(); // Re-run validation after changes
  };

  const handleIcon = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file)); // Set image preview
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("categoryId", product.categoryId);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    formData.append("quantity", product.quantity);
    formData.append("image", product.image);
    formData.append("deliveryMode", product.deliveryMode);
    formData.append("status", status);

    dispatch(createProduct(formData)); // Dispatch the action to create product
  };

  const handleReset = () => {
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
    setStatus("Active");
    setImagePreview(null);
    setErrors({});
  };

  const handleUpdateResult = () => {
    if (success) {
      navigate("/products"); // Navigate to products page on success
      handleReset();
    } else if (error) {
      Swal.fire("Error!", error, "error"); // Show error message if something goes wrong
    }
  };

  useEffect(() => {
    if (success || error) handleUpdateResult(); // Trigger result handling on success or error
  }, [success, error]);

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Grid item xs={12}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <Typography variant="h6">Add Product</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/products")}
            startIcon={<List />}
            style={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: 8,
              padding: "8px 16px",
            }}
          >
            Display Product
          </Button>
        </div>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.categoryId}>
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
              <Typography color="error" variant="caption">
                {errors.categoryId}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            name="price"
            value={product.price}
            onChange={handleChange}
            fullWidth
            error={!!errors.price}
            helperText={errors.price}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Discount"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            error={!!errors.discount}
            helperText={errors.discount}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            fullWidth
            error={!!errors.quantity}
            helperText={errors.quantity}
          />
        </Grid>

        <Grid item xs={12} md={6}>
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
            Upload Picture
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleIcon}
            />
          </Button>
          {errors.image && <Typography variant="caption" color="error" sx={{ display: "block", mt: 1 }}>{errors.image}</Typography>}
          <Avatar
            src={imagePreview}
            sx={{
              width: 120,
              height: 120,
              mt: 2,
              cursor: "pointer",
              border: "2px solid #ccc",
              objectFit: "cover",
            }}
            onClick={() => setOpenImagePreview(true)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.deliveryMode}>
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
              <Typography color="error" variant="caption">
                {errors.deliveryMode}
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

        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
            fullWidth
            multiline
          />
        </Grid>

        <Grid item xs={12} container justifyContent="center" spacing={2}>
          <Grid item>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleReset} variant="contained" color="secondary">
              Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Image Preview Dialog */}
      <Dialog open={openImagePreview} onClose={() => setOpenImagePreview(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          <img src={imagePreview} alt="Preview" style={{ width: "100%", borderRadius: "8px" }} />
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

export default AddProduct;
