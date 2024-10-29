import React, { useEffect, useState } from "react";
import { useStyles } from "../../assets/styles.js";
import { Grid, IconButton, Chip, Snackbar } from "@mui/material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTags, deleteTag } from "../../redux/Actions/tagsActions.js";
import { AddCircleRounded, Edit, Delete } from "@mui/icons-material";
import Swal from "sweetalert2";
import Loader from "../../Components/loading/Loader.js"; // Import your loader component

const TagList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const [timeoutError, setTimeoutError] = useState(false); // Track timeout errors
  const [slowLoading, setSlowLoading] = useState(false); // Track slow loading state
  const tagData = useSelector((state) => state.tag.tags);
  const error = useSelector((state) => state.tag.error);

  const fetchTags = async () => {
    setLoading(true);
    setNetworkError(false);
    setTimeoutError(false);
    setSlowLoading(false);

    const timeout = new Promise(
      (_, reject) => setTimeout(() => reject(new Error("Timeout")), 10000) // 10 seconds timeout
    );

    try {
      // Wait for either the fetch or the timeout to complete
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
      setSlowLoading(!timeoutError && !networkError); // Set slow loading if not timeout or network error
    }
  };

  useEffect(() => {
    fetchTags();
  }, [dispatch]);

  const handleEdit = (rowData) => {
    navigate(`/tags/edit/${rowData._id}`);
  };

  const handleDelete = (rowData) => {
    dispatch(deleteTag(rowData._id));
  };

  const displayTable = () => {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12}>
          <MaterialTable
            title="Tags"
            data={tagData.map((tag, index) => ({
              ...tag,
              serial: index + 1,
            }))}
            columns={[
              { title: "S.No", field: "serial" },
              { title: "Title", field: "title" },
              {
                title: "Status",
                render: (rowData) =>
                  rowData.status === "Active" ? (
                    <Chip
                      label="Active"
                      size="small"
                      variant="outlined"
                      color="success"
                    />
                  ) : (
                    <Chip
                      label="Blocked"
                      size="small"
                      variant="outlined"
                      color="error"
                    />
                  ),
              },
              {
                title: "Action",
                render: (rowData) => (
                  <div>
                    <IconButton
                      onClick={() => handleEdit(rowData)}
                      color="primary"
                      aria-label="edit"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(rowData)}
                      color="secondary"
                      aria-label="delete"
                    >
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
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
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

  // Show loader if loading or there is a network error or timeout error
  if (loading) {
    return (
      <Loader
        onReload={fetchTags}
        message={
          slowLoading
            ? "Fetching data... This is taking longer than usual."
            : "Loading..."
        }
      />
    );
  }

  if (timeoutError) {
    return (
      <Snackbar
        open={timeoutError}
        message="Network is slow or request timed out. Please try again."
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={fetchTags} // Retry fetching tags
          >
            Retry
          </IconButton>
        }
        onClose={() => setTimeoutError(false)} // Close message
      />
    );
  }

  if (networkError) {
    return (
      <div style={{ color: "red" }}>
        Failed to fetch tags. Please check your network connection.
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.box}>{displayTable()}</div>
    </div>
  );
};

export default TagList;
