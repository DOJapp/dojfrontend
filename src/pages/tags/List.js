import React, { useEffect, useState } from "react";
import { Grid, IconButton, Chip, Snackbar, Paper, Box, Typography, Button } from "@mui/material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTags, deleteTag } from "../../redux/Actions/tagsActions.js";
import { AddCircleRounded, Edit, Delete } from "@mui/icons-material";
import Swal from "sweetalert2";
import Loader from "../../Components/loading/Loader.js";

const TagList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const [timeoutError, setTimeoutError] = useState(false);
  const [slowLoading, setSlowLoading] = useState(false);

  const { tags, error, success } = useSelector((state) => state.tag);

  const fetchTags = async () => {
    setLoading(true);
    setNetworkError(false);
    setTimeoutError(false);
    setSlowLoading(false);

    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 10000) // 10 seconds timeout
    );

    try {
      await Promise.race([dispatch(getTags()), timeout]);
    } catch (err) {
      if (err.message === "Timeout") {
        setTimeoutError(true); // Set timeout error state
      } else {
        console.error(err);
        setNetworkError(true); // Set network error state if any other error occurs
      }
    } finally {
      setLoading(false);
      setSlowLoading(!timeoutError && !networkError);
    }
  };

  useEffect(() => {
    fetchTags();
  }, [dispatch]);

  const handleEdit = (rowData) => {
    navigate(`/tags/edit/${rowData._id}`);
  };

  const handleDelete = async (rowData) => {
    try {
      await dispatch(deleteTag(rowData._id));
      Swal.fire("Success!", "Tag deleted successfully", "success");
    } catch (err) {
      Swal.fire("Error!", "Failed to delete tag", "error");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const displayTable = () => {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12}>
          <MaterialTable
            title="Tags"
            data={tags.map((tag, index) => ({
              ...tag,
              serial: index + 1,
              formattedDate: formatDate(tag.createdAt),
            }))}
            columns={[
              { title: "S.No", field: "serial" },
              { title: "Title", field: "title" },

              {
                title: "Status",
                render: (rowData) =>
                  rowData.status === "Active" ? (
                    <Chip label="Active" size="small" variant="outlined" color="success" />
                  ) : (
                    <Chip label="Blocked" size="small" variant="outlined" color="error" />
                  ),
              },
              { title: "Created Date", field: "formattedDate" },
              {
                title: "Action",
                render: (rowData) => (
                  <div>
                    <IconButton onClick={() => handleEdit(rowData)} color="primary" aria-label="edit">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(rowData)} color="secondary" aria-label="delete">
                      <Delete />
                    </IconButton>
                  </div>
                ),
              },
            ]}
            options={{
              sorting: true,
              search: true,
              paging: true,
              pageSize: 5,
              actionsColumnIndex: -1,
              emptyRowsWhenPaging: false,
              debounceInterval: 500,
            }}
            actions={[
              {
                icon: () => (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleRounded />}
                    onClick={() => navigate("/tags/add")}
                    style={{
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius: 8,
                      padding: "8px 16px",
                    }}
                  >
                    Add New
                  </Button>
                ),
                tooltip: "Add Tag",
                isFreeAction: true,
                onClick: () => navigate("/tags/add"),
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  };

  if (loading) {
    return (
      <Loader
        onReload={fetchTags}
        message={slowLoading ? "Fetching data... This is taking longer than usual." : "Loading..."}
      />
    );
  }

  if (timeoutError) {
    return (
      <Snackbar
        open={timeoutError}
        message="Network is slow or request timed out. Please try again."
        action={
          <IconButton size="small" color="inherit" onClick={fetchTags}>
            Retry
          </IconButton>
        }
        onClose={() => setTimeoutError(false)}
      />
    );
  }

  if (networkError) {
    return <div style={{ color: "red" }}>Failed to fetch tags. Please check your network connection.</div>;
  }

  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <Box display="flex" flexDirection="column" gap={2}>
        {displayTable()}
      </Box>
    </Paper>
  );
};

export default TagList;
