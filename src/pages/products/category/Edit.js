import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCategoryById,
  updateCategory,
} from "../../../redux/Actions/categoryActions";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const EditCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Local state to hold category data
  const [category, setCategory] = useState({
    title: "",
    status: "",
    image: null,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [titleError, setTitleError] = useState(""); // State for title error
  const [statusError, setStatusError] = useState(""); // State for status error
  const [imageError, setImageError] = useState(""); // State for image error
  const [imagePreview, setImagePreview] = useState(null); // State to hold image preview

  // Fetch the category data when the component mounts
  useEffect(() => {
    dispatch(getCategoryById(id));
  }, [dispatch, id]);

  // Get the category from Redux store
  const fetchedCategory = useSelector(
    (state) => state.category.selectedCategory
  );

  useEffect(() => {
    if (fetchedCategory) {
      setCategory({ ...fetchedCategory, image: fetchedCategory.image || null });
      setImagePreview(fetchedCategory.image || null); 
    }
  }, [fetchedCategory]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Reset error messages when user interacts
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
      const result = await dispatch(updateCategory(id, formData)); // Pass the FormData to the action
      if (result) {
        setSnackbarMessage("Category updated successfully!");
        setIsError(false);
        // Reset form after successful update
        setCategory({ title: "", status: "", image: null });
        setImagePreview(null);
        navigate("/category");
      } else {
        setSnackbarMessage("Failed to update category.");
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

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom align="left">
        Edit Category
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
          <FormControl
            fullWidth
            required
            variant="outlined"
            error={!!statusError}
          >
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
            {statusError && (
              <p style={{ color: "red", margin: "4px 0 0 0" }}>{statusError}</p>
            )}
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
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </Grid>
          )}
        </Grid>
        {imageError && (
          <p style={{ color: "red", margin: "4px 0 0 0" }}>{imageError}</p>
        )}

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Update Category
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
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

export default EditCategory;
