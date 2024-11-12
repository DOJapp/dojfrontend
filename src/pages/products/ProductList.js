import React, { useEffect, useState } from "react";
import { Grid, Chip, IconButton, Paper, Button, Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../../redux/Actions/productActions";
import { AddCircleRounded, Edit, Delete } from "@mui/icons-material";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access products from Redux store
  const productsData = useSelector((state) => state.product.products);
  const error = useSelector((state) => state.product.error);

  // State for the image preview dialog
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Dispatch action to fetch products
    dispatch(getProducts());
  }, [dispatch]);

  const handleEdit = (rowData) => {
    // Redirect to the edit page with the product ID
    navigate(`/products/edit/${rowData._id}`);
  };
  
  const handleDelete = (rowData) => {
    // Dispatch delete action
    dispatch(deleteProduct(rowData._id));
  };

  const handleImageClick = (image) => {
    // Open the dialog and set the selected image
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    // Close the dialog and reset selected image
    setOpen(false);
    setSelectedImage(null);
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

  const displayTable = () => (
    <Paper elevation={3} style={{ padding: "10px", borderRadius: "8px" }}>
      <MaterialTable
        title="Products"
        data={productsData.map((product, index) => ({
          ...product,
          serial: index + 1,
          formattedDate: formatDate(product.createdAt),
        }))}
        columns={[
          { title: "S.No", field: "serial" },
          { title: "Name", field: "name" },
          {
            title: "Image",
            field: "image",
            render: (rowData) => (
              <img
                src={rowData.image || "fallback_image_url"}
                alt={rowData.name}
                style={{ width: 50, height: 50, cursor: "pointer" }}
                onClick={() => handleImageClick(rowData.image)}
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
          { title: "Price", field: "price" },
          { title: "Quantity", field: "quantity" },
          {
            title: "Category",
            render: (rowData) => rowData.categoryId?.title || "N/A",
          },
          {
            title: "Admin",
            render: (rowData) => rowData.adminId?.name || "N/A",
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
                onClick={() => navigate("/products/add")}
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
            tooltip: "Add Product",
            isFreeAction: true,
          },
        ]}
      />
    </Paper>
  );

  if (error) {
    return (
      <Typography color="error" align="center" variant="h6" >
        {error}
      </Typography>
    );
  }

  return (
    <>
      {displayTable()}
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          <img
            src={selectedImage || "fallback_image_url"}
            alt="Selected banner"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductList;
