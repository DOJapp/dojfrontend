import React, { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Components/loading/Loader.js";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { getTagById, updateTag } from "../../redux/Actions/tagsActions.js";

const Edit = ({ dispatch }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the tag ID from URL parameters
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const tag = await dispatch(getTagById(id)); // Fetch the tag by ID
        setTitle(tag.title);
        setStatus(tag.status);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tag:", error);
        Swal.fire("Error!", "Failed to fetch tag data.", "error");
      }
    };

    fetchTag();
  }, [dispatch, id]);

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    let isValid = true;

    if (!title) {
      handleError("title", "Title is required");
      isValid = false;
    } else {
      handleError("title", "");
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      setIsLoading(true);

      // Prepare the form data for updating
      const formData = new FormData();
      formData.append("title", title);
      formData.append("status", status);

      try {
        // Dispatch the action to update the tag
        await dispatch(updateTag(id, formData));

        // Show success message
        Swal.fire("Success!", "Tag updated successfully!", "success");

        // Navigate to tags list
        navigate("/tags");
      } catch (error) {
        console.error("Error updating tag:", error);
        Swal.fire("Error!", "Failed to update tag.", "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setTitle("");
    setStatus("Active");
    setError({});
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {isLoading && <Loader />}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Edit Tag</div>
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
              required
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
            <Grid item>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                variant="contained"
                color="primary"
              >
                Submit
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

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(null, mapDispatchToProps)(Edit);
