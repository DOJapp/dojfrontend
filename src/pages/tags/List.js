import React, { useEffect } from "react";
import { useStyles } from "../../assets/styles.js";
import { Grid, IconButton } from "@mui/material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTags, deleteTag } from "../../redux/Actions/tagsActions.js"; // Correct action import
import { AddCircleRounded, Edit, Delete } from "@mui/icons-material";
import Swal from "sweetalert2"; // Import SweetAlert for delete confirmation

const TagList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access tags from Redux store
  const tagData = useSelector((state) => state.tag.tags);
  const error = useSelector((state) => state.tag.error);

  useEffect(() => {
    // Dispatch action to fetch tags
    dispatch(getTags());
  }, [dispatch]);

  const handleEdit = (rowData) => {
    // Redirect to the edit page with the tag ID
    navigate(`/tags/edit/${rowData._id}`);
  };

  const handleDelete = (rowData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTag(rowData._id));
      }
    });
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
              {
                title: "S.No",
                field: "serial",
              },
              { title: "Title", field: "title" },
              { title: "Status", field: "status" },
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

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>; // Error message
  }

  return (
    <div className={classes.container}>
      <div className={classes.box}>{displayTable()}</div>
    </div>
  );
};

export default TagList;
