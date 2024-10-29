import React, { useState, useEffect, useCallback } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import List from "@mui/icons-material/List";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/loading/Loader.js";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux"; // Use useDispatch instead of connect
import {
  createTag,
  createTagFailure,
} from "../../redux/Actions/tagsActions.js";

const Add = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch(); // Use dispatch from useDispatch
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState({});
  const tagState = useSelector((state) => state.tag); // Get tag state from Redux

  // Form validation logic
  const validate = useCallback(() => {
    const newError = {};
    if (!title) newError.title = "Title is required";
    setError(newError);
    return Object.keys(newError).length === 0; // Return true if no errors
  }, [title]);

  // Submit handler for creating the tag
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (validate()) {
      const tagData = { title, status };

      try {
        // Dispatch the createTag action
        await dispatch(createTag(tagData));
      } catch (error) {
        // Dispatch failure action and show error alert from API response
        dispatch(createTagFailure("Failed to add tag"));
      }
    }
  };

  // Handle success and error after tagState changes
  useEffect(() => {
    if (tagState.loading) return;

    if (tagState.error) {
      Swal.fire("Error!", tagState.error, "error");
    } else if (tagState.success) {
      // Reset form after successful submission
      setTitle("");
      setStatus("Active");
      setError({});
      navigate("/tags"); // Navigate after success
    }
  }, [tagState, navigate]);

  // Reset form handler
  const handleReset = () => {
    setTitle("");
    setStatus("Active");
    setError({});
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {tagState.loading && <Loader />}
        <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Tags</div>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/tags")}
                className={classes.addButtontext}
              >
                <List /> Display Tags
              </Button>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              fullWidth
              error={!!error.title}
              helperText={error.title}
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
            <Grid item >
              <Button
                variant="contained"
                color="primary"
                type="submit" // Change to type submit for form submission
                disabled={tagState.loading}
              >
                {tagState.loading ? "Submitting..." : "Submit"} {/* Changed the text */}
              </Button>
            </Grid>

            <Grid item>
              <Button
                onClick={handleReset}
                variant="outlined"
                color="secondary"
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Add;
