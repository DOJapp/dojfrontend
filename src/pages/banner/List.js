import React, { useEffect } from "react";
import { useStyles } from "../../assets/styles.js";
import { Grid, IconButton } from "@mui/material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBanners, deleteBanner } from "../../redux/Actions/bannerActions.js";
import { AddCircleRounded, Edit, Delete } from "@mui/icons-material";

const BannerList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access banners from Redux store
  const bannersData = useSelector((state) => state.banner.banners);
  const error = useSelector((state) => state.banner.error);

  useEffect(() => {
    // Dispatch action to fetch banners
    dispatch(getBanners());
  }, [dispatch]);

  const handleEdit = (rowData) => {
    // Redirect to the edit page with the banner ID
    navigate(`/banner/edit/${rowData._id}`);
  };

  const handleDelete = (rowData) => {
    // Dispatch delete action
    dispatch(deleteBanner(rowData._id));
  };

  const displayTable = () => {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12}>
          <MaterialTable
            title="Banners"
            data={bannersData.map((banner, index) => ({
              ...banner,
              serial: index + 1,
            }))} // Map data to add a serial number
            columns={[
              {
                title: "S.No",
                field: "serial",
              },
              {
                title: "Image",
                field: "image",
                render: (rowData) => (
                  <img
                    src={rowData.image || "fallback_image_url"}
                    alt={rowData.title}
                    style={{ width: 50, height: 50 }}
                  />
                ),
              },
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
              actionsColumnIndex: -1, // Place action buttons at the end
              emptyRowsWhenPaging: false, // Avoid extra empty rows
              debounceInterval: 500, // Debounce search input for better performance
            }}
            actions={[
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add Banner",
                isFreeAction: true,
                onClick: () => navigate("/banner/add"),
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

export default BannerList;
