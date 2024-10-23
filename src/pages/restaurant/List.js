import React, { useEffect } from "react";
import { useStyles } from "../../assets/styles.js";
import { Grid, IconButton, Chip } from "@mui/material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurants,
  deleteRestaurant,
} from "../../redux/Actions/restaurantActions.js";
import { AddCircleRounded, Edit, Delete } from "@mui/icons-material";

const RestaurantList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access restaurant data from Redux store
  const restaurantData = useSelector((state) => state.restaurant.restaurants);
  const error = useSelector((state) => state.restaurant.error);

  useEffect(() => {
    // Dispatch action to fetch restaurants
    dispatch(getRestaurants());
  }, [dispatch]);

  const handleEdit = (rowData) => {
    // Redirect to the edit page with the restaurant ID
    navigate(`/restaurants/edit/${rowData._id}`);
  };

  const handleDelete = (rowData) => {
    // Dispatch delete action
    dispatch(deleteRestaurant(rowData._id));
  };

  const displayTable = () => {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12}>
          <MaterialTable
            title="Restaurants"
            data={restaurantData.map((restaurant, index) => ({
              ...restaurant,
              serial: index + 1,
            }))}
            columns={[
              {
                title: "S.No",
                field: "serial",
              },
              {
                title: "Title",
                field: "title", // Adjust based on your actual field name for title
              },
              {
                title: "Image",
                field: "image",
                render: (rowData) => (
                  <img
                    src={rowData.image || "fallback_image_url"}
                    alt={rowData.name}
                    style={{ width: 50, height: 50 }}
                  />
                ),
              },
              {
                title: "Address",
                field: "address", // Ensure this field exists in your data
              },
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
                title: "Open",
                render: (rowData) =>
                  rowData.isOpen ? (
                    <Chip
                      label="Open"
                      size="small"
                      variant="outlined"
                      color="success"
                    />
                  ) : (
                    <Chip
                      label="Close"
                      size="small"
                      variant="outlined"
                      color="error"
                    />
                  ),
              },
              {
                title: "Admin",
                render: (rowData) => rowData.adminId?.name || "N/A", // Assuming adminId contains a name property
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
              pageSize: 10,
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
                tooltip: "Add Restaurant",
                isFreeAction: true,
                onClick: () => navigate("/restaurants/add"),
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

export default RestaurantList;
