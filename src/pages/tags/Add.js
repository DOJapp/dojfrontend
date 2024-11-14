import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import List from "@mui/icons-material/List";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { createTag } from "../../redux/Actions/tagsActions.js";

const Add = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState("");

  const {
    success,
    error: bannerError,
    loading,
  } = useSelector((state) => state.tag);

  useEffect(() => {
    if (success) {
      navigate("/tags");
    } else if (bannerError) {
      Swal.fire("Error!", bannerError, "error");
    }
  }, [success, bannerError, navigate]);

  const handleValidation = (value) => {
    if (!value) {
      setError("Title is required");
    } else {
      setError(""); // Clear error if title is valid
    }
    setTitle(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if title is valid before dispatching action
    if (!title) {
      setError("Title is required");
      return; // Prevent form submission if title is invalid
    }

    // Proceed if no error
    if (!error && title) {
      const tagData = { title, status };
      dispatch(createTag(tagData));
    }
  };

  // Reset form fields
  const handleReset = () => {
    setTitle("");
    setStatus("Active");
    setError("");
  };

  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Add Tag</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/tags")}
            startIcon={<List />}
          >
            Display Tags
          </Button>
        </Box>
      </Grid>
      <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => handleValidation(e.target.value)}
            variant="outlined"
            fullWidth
            error={!!error}
            helperText={error}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
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

        <Grid item xs={12} container justifyContent="center" spacing={2}>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={
                loading ? <CircularProgress size={20} color="inherit" /> : null
              }
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Grid>

          <Grid item>
            <Button variant="contained" color="secondary" onClick={handleReset}>
              RESET
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Add;
