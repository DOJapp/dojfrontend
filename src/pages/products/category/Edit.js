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
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getCategoryById, updateCategory } from "../../../redux/Actions/categoryActions";
import MuiAlert from "@mui/material/Alert";
import Swal from "sweetalert2"; // Ensure this is imported if used for alerting
import { List } from "@mui/icons-material"; // Import the List icon

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const EditCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [category, setCategory] = useState({
    title: "",
    status: "",
    image: null,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [imageError, setImageError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const { selectedCategory, loading, error, success } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoryById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (loading) return;

    if (error) {
      Swal.fire("Error!", error, "error");
      setSnackbarMessage("Failed to update category.");
      setIsError(true);
      setOpenSnackbar(true);
    } else if (success) {
      setSnackbarMessage("Category updated successfully!");
      setIsError(false);
      setOpenSnackbar(true);
      navigate("/category");
    }
  }, [success, error, loading, navigate]);

  useEffect(() => {
    if (selectedCategory) {
      setCategory({
        title: selectedCategory.title || "",
        status: selectedCategory.status || "",
        image: selectedCategory.image || null,
      });
      setImagePreview(selectedCategory.image || null);
    }
  }, [selectedCategory]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

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

    if (hasError) {
      return;
    }

    const formData = new FormData();
    formData.append("title", category.title);
    formData.append("status", category.status);
    formData.append("image", category.image);

    await dispatch(updateCategory(id, formData));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleReset = () => {
    setCategory({
      title: "",
      status: "",
      image: null,
    });
    setImagePreview(null);
  };

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Typography variant="h6">Update Category</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/category")}
            startIcon={<List />}
          
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
              <MenuItem value="Blocked">Blocked</MenuItem>
            </Select>
            {statusError && <p style={{ color: "red", margin: "4px 0" }}>{statusError}</p>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <Button
              variant="outlined"
              component="label"
            >
              Upload Image
              <input
                type="file"
                name="image"
                hidden
                accept="image/*"
                onChange={handleChange}
              />
            </Button>
            {imageError && <p style={{ color: "red", margin: "4px 0" }}>{imageError}</p>}
          </Grid>
          {imagePreview && (
            <Grid item xs={4}>
              <div style={{ textAlign: "center" }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </Grid>
          )}
        </Grid>

        <Grid item xs={12} container justifyContent="center" spacing={2}>
          <Grid item>
            <Grid item>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                variant="contained"
                color="primary"
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {loading ? "Loading..." : "Update"}
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              onClick={handleReset}
              variant="contained"
              color="secondary"
            >
              RESET
            </Button>
          </Grid>

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
