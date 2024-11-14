import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTagById, updateTag } from "../../redux/Actions/tagsActions";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import DvrIcon from "@mui/icons-material/Dvr";

const EditTags = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Active");
  const [errors, setErrors] = useState({ title: "" });

  const {
    success,
    error: bannerError,
    loading,
    selectedTag,
  } = useSelector((state) => state.tag);

  useEffect(() => {
    if (id) {
      dispatch(getTagById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedTag) {
      setTitle(selectedTag.title);
      setStatus(selectedTag.status || "Active");
    }
  }, [selectedTag]);

  useEffect(() => {
    if (success) {
      Swal.fire("Success!", "Tag updated successfully", "success");
      navigate("/tags");
    } else if (bannerError) {
      Swal.fire("Error!", bannerError, "error");
    }
  }, [success, bannerError, navigate]);

  const validate = () => {
    let valid = true;
    const newErrors = { title: "" };

    if (!title) {
      newErrors.title = "Title is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleReset = () => {
    setTitle("");
    setStatus("Active");
    setErrors({ title: "" });
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const tagsData = { title, status };
    dispatch(updateTag(id, tagsData));
  };

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Edit Tag
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/tags")}
          startIcon={<DvrIcon />}
        >
          Display Tags
        </Button>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            fullWidth
            error={!!errors.title}
            helperText={errors.title}
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
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              startIcon={
                loading ? <CircularProgress size={20} color="inherit" /> : null
              }
            >
              {loading ? "Updating..." : "Update"}
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

export default EditTags;
