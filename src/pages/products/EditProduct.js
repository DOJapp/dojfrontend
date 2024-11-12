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
import { getProductById, updateProduct } from "../../redux/Actions/productActions";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import List from "@mui/icons-material/List";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the product ID from the URL params

  const categories = useSelector((state) => state.category.categories);
  const { success, error, loading, product: fetchedProduct } = useSelector((state) => state.product); // Assuming product state has fetchedProduct

  const [openImagePreview, setOpenImagePreview] = useState(false);
  const [openGalleryImagePreview, setOpenGalleryImagePreview] = useState(false);

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

  const [galleryImages, setGalleryImages] = useState([]);
  const [status, setStatus] = useState("Active");
  const [imagePreview, setImagePreview] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getCategories());
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (fetchedProduct) {
      setProduct({
        name: fetchedProduct.name,
        description: fetchedProduct.description,
        categoryId: fetchedProduct.categoryId,
        price: fetchedProduct.price,
        discount: fetchedProduct.discount,
        quantity: fetchedProduct.quantity,
        image: null,
        deliveryMode: fetchedProduct.deliveryMode,
      });
      setImagePreview(fetchedProduct.image);
      setStatus(fetchedProduct.status);
      setGalleryPreview(fetchedProduct.galleryImages || []);
    }
  }, [fetchedProduct]);

  const validate = () => {
    const newErrors = {};
    if (!product.name) newErrors.name = "Name is required.";
    if (!product.categoryId) newErrors.categoryId = "Category is required.";
    if (!product.price) newErrors.price = "Price is required.";
    if (!product.quantity) newErrors.quantity = "Quantity is required.";
    if (!product.deliveryMode) newErrors.deliveryMode = "Delivery mode is required.";

    if (parseFloat(product.discount) > parseFloat(product.price)) {
      newErrors.discount = "Discount cannot be greater than price.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if ((name === "price" || name === "discount" || name === "quantity") && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    if (files) {
      if (name === "galleryImages") {
        const selectedFiles = Array.from(files);
        setGalleryImages(selectedFiles);
        setGalleryPreview(selectedFiles.map((file) => URL.createObjectURL(file)));
      } else {
        const file = files[0];
        setProduct((prev) => ({ ...prev, [name]: file }));
        setImagePreview(URL.createObjectURL(file));
      }
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
    validate();
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
    if (product.image) {
      formData.append("image", product.image);
    }
    formData.append("deliveryMode", product.deliveryMode);
    formData.append("status", status);

    galleryImages.forEach((file) => {
      formData.append("galleryImages", file);
    });

    dispatch(updateProduct(id, formData));
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
    setGalleryImages([]);
    setGalleryPreview([]);
    setStatus("Active");
    setImagePreview(null);
    setErrors({});
  };

  const handleUpdateResult = () => {
    if (success) {
      Swal.fire("Success!", "Product updated successfully!", "success");
      navigate("/products");
      handleReset();
    } else if (error) {
      Swal.fire("Error!", error, "error");
    }
  };

  useEffect(() => {
    handleUpdateResult();
  }, [success, error]);

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Grid item xs={12}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <Typography variant="h6">Edit Product</Typography>
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

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.deliveryMode}>
            <InputLabel>Delivery Mode</InputLabel>
            <Select
              label="Delivery Mode"
              name="deliveryMode"
              value={product.deliveryMode}
              onChange={handleChange}
            >
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
            Upload Image
            <input
              type="file"

              hidden
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </Button>
          {errors.image && <Typography variant="caption" color="error" sx={{ display: "block", mt: 1 }}>{errors.image}</Typography>}
          {imagePreview && (
            <Avatar
              src={imagePreview}
              sx={{
                width: 100,
                height: 100,
                mt: 2,
                cursor: "pointer",
                border: "2px solid #ccc",
                objectFit: "cover",
              }}
              onClick={() => setOpenImagePreview(true)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
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
            Upload Gallery Images
            <input
              type="file"
              hidden
              accept="image/*"
              multiple
              name="galleryImages"
              onChange={handleChange}
            />
          </Button>
          {galleryPreview.length > 0 && (
            <Grid container spacing={2} mt={2}>
              {galleryPreview.map((image, index) => (
                <Grid item xs={4} key={index}>
                  <Avatar
                    src={image}
                    sx={{
                      width: 100,
                      height: 100,
                      cursor: "pointer",
                      border: "2px solid #ccc",
                      objectFit: "cover",
                    }}
                    onClick={() => setOpenGalleryImagePreview(true)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>Description</Typography>
          <ReactQuill
            value={product.description}
            onChange={(value) => setProduct((prev) => ({ ...prev, description: value }))}
          />
          {errors.description && (
            <Typography color="error" variant="caption" sx={{ display: "block", mt: 1 }}>
              {errors.description}
            </Typography>
          )}
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
            <Button
              onClick={handleReset}
              variant="contained"
              color="secondary"
              style={{
                textTransform: "none",
                borderRadius: 5,
                padding: "6px 10px",
                color: "#fff",
                background: "#dc004e"
              }}
            >
              RESET
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={openImagePreview} onClose={() => setOpenImagePreview(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "380px", borderRadius: "8px" }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenImagePreview(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openGalleryImagePreview}
        onClose={() => setOpenGalleryImagePreview(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Gallery Image Preview</DialogTitle>
        <DialogContent>
          {galleryPreview.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery Preview ${index}`}
              style={{ width: "100%", height: "380px", borderRadius: "8px", marginBottom: 10 }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGalleryImagePreview(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default EditProduct;