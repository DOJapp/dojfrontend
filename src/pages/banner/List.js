import React, { useState, useEffect } from "react";
import { Grid, IconButton, Chip, Dialog, DialogContent, DialogTitle, Paper, Button } from "@mui/material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBanners, deleteBanner } from "../../redux/Actions/bannerActions.js";
import { AddCircleRounded, Edit, Delete } from "@mui/icons-material";

const BannerList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const bannersData = useSelector((state) => state.banner.banners);
  const error = useSelector((state) => state.banner.error);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  const handleEdit = (rowData) => {
    navigate(`/banner/edit/${rowData._id}`);
  };

  const handleDelete = (rowData) => {
    // Confirmation prompt before deleting
    if (window.confirm(`Are you sure you want to delete banner: ${rowData._id}?`)) {
      dispatch(deleteBanner(rowData._id));
    }
  };

  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const displayTable = () => (
    <Paper elevation={3} style={{ padding: "10px", borderRadius: "8px" }}>
      <MaterialTable
        title="Banners"
        data={bannersData.map((banner, index) => ({
          ...banner,
          serial: index + 1,
          formattedDate: formatDate(banner.createdAt),
        }))}
        columns={[
          { title: "S.No", field: "serial" },
          {
            title: "Redirect To",
            render: (rowData) => (rowData.redirectTo ? rowData.redirectTo : "N/A"),
          },
          {
            title: "Product Name",
            render: (rowData) => {
              if (rowData.redirectTo === "product" && rowData.productId) {
                return rowData.productId.name || "N/A";  // Directly access name from productId object
              }
              return "N/A";
            },
          },
          {
            title: "Image",
            field: "image",
            render: (rowData) => (
              <img
                src={rowData.image || "fallback_image_url"}
                alt={rowData.title || "No Title"}
                style={{ width: 50, height: 50, cursor: "pointer" }}
                onClick={() => handleClickOpen(rowData.image)}
              />
            ),
          },
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
                onClick={() => navigate("/banner/add")}
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
            tooltip: "Add Banner",
            isFreeAction: true,
          },
        ]}
      />
    </Paper>
  );

  if (error) {
    return <div style={{ color: "red", padding: "10px" }}>{error}</div>;
  }

  return (
    <>
      {displayTable()}
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle>Banner Image</DialogTitle>
        <DialogContent>
          <img
            src={selectedImage || "fallback_image_url"}
            alt="Selected banner"
            style={{ width: "100%" }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BannerList;
