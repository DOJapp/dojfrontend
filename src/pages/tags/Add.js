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

  const { success, error: bannerError, loading } = useSelector((state) => state.tag);

  useEffect(() => {
    if (success) {
      Swal.fire("Success!", "Tag added successfully.", "success");
      navigate("/tags");
    } else if (bannerError) {
      Swal.fire("Error!", bannerError, "error");
    }
  }, [success, bannerError, navigate]);

  const handleValidation = (value) => {
    if (!value) {
      setError("Title is required");
    } else {
      setError("");
    }
    setTitle(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      setError("Title is required");
    }

    if (!error && title) {
      const tagData = { title, status };
      dispatch(createTag(tagData));
    }
  };

  // Reset form
  const handleReset = () => {
    setTitle("");
    setStatus("Active");
    setError("");
  };

  return (
    <Paper style={{ padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Typography variant="h6">Add Tag</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/tags")}
            startIcon={<List />}
            style={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: 8,
              padding: "8px 16px",
            }}
          >
            Display Tags
          </Button>
        </div>
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
            <Button onClick={handleReset} variant="contained" color="secondary"
              style={{
                textTransform: "none",
                borderRadius: 5,
                padding: "6px 16px",
                color: "#fff",
                background: "#dc004e"
              }}
            >
              RESET
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Add;
