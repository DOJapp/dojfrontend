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
  Snackbar,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createCategory } from "../../../redux/Actions/categoryActions"; // Adjust the import path
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Reset error messages when user interacts
    if (name === "title") {
      setTitleError("");
    } else if (name === "status") {
      setStatusError("");
    } else if (name === "image") {
      setImageError("");
    }

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

  const handleSubmit = async () => {
    let hasError = false;

    // Validate Title
    if (!category.title) {
      setTitleError("Title is required.");
      hasError = true;
    }

    // Validate Status
    if (!category.status) {
      setStatusError("Status is required.");
      hasError = true;
    }

    // Validate Image
    if (!category.image) {
      setImageError("Image is required.");
      hasError = true;
    }

    if (hasError) {
      return; // Stop submission if there are errors
    }

    // Prepare form data for submission
    const formData = new FormData();
    formData.append("title", category.title);
    formData.append("status", category.status);
    formData.append("image", category.image);

    try {
      const result = await dispatch(createCategory(formData));
      if (result) {
        setSnackbarMessage("Category added successfully!");
        setIsError(false);
        setCategory({ title: "", status: "", image: null });
        setImagePreview(null);
        
        navigate('/category'); 
      } else {
        setSnackbarMessage("Failed to add category.");
        setIsError(true);
      }
    } catch (error) {
      setSnackbarMessage(error.message);
      setIsError(true);
    }
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const isFormValid = () => {
    return category.title && category.status && category.image; // Check if all fields are filled
  };

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom align="left">
        Add Category
      </Typography>
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
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required variant="outlined" error={!!statusError}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              name="status"
              value={category.status}
              onChange={handleChange}
            >
              <MenuItem value="">Select Status</MenuItem> 
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Block">Blocked</MenuItem>
            </Select>
            {statusError && <p style={{ color: 'red', margin: '4px 0 0 0' }}>{statusError}</p>} 
          </FormControl>
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
              <div className="image-preview" style={{ textAlign: "center" }}>
                <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "auto" }} />
              </div>
            </Grid>
          )}
        </Grid>
        {imageError && <p style={{ color: 'red', margin: '4px 0 0 0' }}>{imageError}</p>} 

        <Grid item xs={12} container justifyContent="center">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit} 
            disabled={!isFormValid()} // Disable button if form is invalid
          >
            Add Category
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Positioning the Snackbar
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={isError ? "error" : "success"}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default AddCategory;
