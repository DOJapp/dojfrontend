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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTagById, updateTag } from "../../redux/Actions/tagsActions"; // Assume you have these actions
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditTags = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tagsState = useSelector((state) => state.tag); // Assuming you have a tags reducer
  const { id } = useParams();

  const [title, setTitle] = useState(""); // State for title
  const [status, setStatus] = useState("Active"); // State for status
  const [errors, setErrors] = useState({ title: "" });

  useEffect(() => {
    // Fetch existing tag if editing
    if (id) {
      dispatch(getTagById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    // Populate the fields if fetched from the state
    if (tagsState.selectedTag) {
      setTitle(tagsState.selectedTag.title); // Correctly accessing selectedTag
      setStatus(tagsState.selectedTag.status || "Active"); // Set default status if not present
    }
  }, [tagsState.selectedTag]);

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

  const handleSubmit = () => {
    setErrors({ title: "" });

    if (!validate()) return;

    const tagsData = { title, status }; // Prepare data for update
    dispatch(updateTag(id, tagsData)); // Dispatch action to update tag
  };

  useEffect(() => {
    if (tagsState.loading) return;

    if (tagsState.error) {
      Swal.fire("Error!", tagsState.error, "error");
    } else if (tagsState.success) {
      setTitle("");
      setStatus("Active"); 
      navigate('/tags');
    }
  }, [tagsState]);

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom align="left">
        Edit Tags
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
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

        <Grid item xs={6}>
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

        <Grid item xs={12} container justifyContent="center">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Update Tags
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EditTags;
