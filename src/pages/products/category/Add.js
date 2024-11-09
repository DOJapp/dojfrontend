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
  Snackbar,
  CircularProgress,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../../redux/Actions/categoryActions";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import List from "@mui/icons-material/List";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    title: "",
    status: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [imageError, setImageError] = useState("");
  const [openImagePreview, setOpenImagePreview] = useState(false);

  const { success, error, loading } = useSelector((state) => state.category);

  useEffect(() => {
    if (loading) return;

    if (error) {
      Swal.fire("Error!", error, "error");
    } else if (success) {
      setSnackbarMessage("Category added successfully!");
      setIsError(false);
      setOpenSnackbar(true);
      setCategory({ title: "", status: "", image: null });
      setImagePreview(null);
      navigate("/category");
    }
  }, [success, error, loading, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Reset error messages on change
    if (name === "title") setTitleError("");
    else if (name === "status") setStatusError("");
    else if (name === "image") setImageError("");

    if (files) {
      const file = files[0];
      setCategory((prev) => ({
        ...prev,
        [name]: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setCategory((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    let hasError = false;
    if (!category.title) {
      setTitleError("Title is required.");
      hasError = true;
    }
    if (!category.status) {
      setStatusError("Status is required.");
      hasError = true;
    }
    if (!category.image) {
      setImageError("Image is required.");
      hasError = true;
    }
    return hasError;
  };

  const handleSubmit = async () => {
    if (validateForm()) return;

    const formData = new FormData();
    formData.append("title", category.title);
    formData.append("status", category.status);
    formData.append("image", category.image);

    try {
      await dispatch(createCategory(formData)); // Dispatch action to create category
    } catch (error) {
      setSnackbarMessage("Failed to add category.");
      setIsError(true);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Typography variant="h6">Add Category</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/category")}
            startIcon={<List />}
            style={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: 8,
              padding: "8px 16px",
            }}
          >
            Display Category
          </Button>
        </div>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Title"
            name="title"
            value={category.title}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!titleError}
            helperText={titleError}
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required variant="outlined" error={!!statusError} sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              name="status"
              value={category.status}
              onChange={handleChange}
            >
              <MenuItem value="">Select Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Blocked">Blocked</MenuItem>
            </Select>
            {statusError && <Typography variant="body2" color="error">{statusError}</Typography>}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <Button variant="outlined" component="label" fullWidth required sx={{ mb: 2 }}>
              Upload Image
              <input
                type="file"
                name="image"
                hidden
                accept="image/*"
                onChange={handleChange}
              />
            </Button>
            {imageError && <Typography variant="body2" color="error">{imageError}</Typography>}
          </Grid>
          {imagePreview && (
            <Grid item xs={4}>
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
          )}
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
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Grid>

          <Grid item>
            <Button
              onClick={() => setCategory({ title: "", status: "", image: null })}
              variant="contained"
              color="secondary"
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={isError ? "error" : "success"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

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

export default AddCategory;
