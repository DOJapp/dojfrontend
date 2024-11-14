import React, { useEffect, useState } from "react";
import {
  Grid,
  Chip,
  IconButton,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../../redux/Actions/productActions";
import { AddCircleRounded, Edit, Delete } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productsData = useSelector((state) => state.product.products);
  const error = useSelector((state) => state.product.error);

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleEdit = (rowData) => {
    navigate(`/products/edit/${rowData.id}`);
  };

  const handleDelete = (rowData) => {
    dispatch(deleteProduct(rowData.id));
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const columns = [
    { field: "serial", headerName: "S.No", width: 90, sortable: true },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "image",
      headerName: "Image",
      width: 120,
      renderCell: (params) => (
        <img
          src={params.value || "fallback_image_url"}
          alt={params.row.name}
          style={{ width: 50, height: 50, cursor: "pointer" }}
          onClick={() => handleImageClick(params.value)}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) =>
        params.value === "Active" ? (
          <Chip
            label="Active"
            size="small"
            variant="outlined"
            color="success"
          />
        ) : (
          <Chip label="Blocked" size="small" variant="outlined" color="error" />
        ),
    },
    { field: "price", headerName: "Price", width: 130 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "admin", headerName: "Admin", width: 150 },
    {
      field: "createdAt",
      headerName: "Created Date",
      width: 180,
      valueFormatter: (params) => formatDate(params.value),
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => handleEdit(params.row)}
            color="primary"
            aria-label="edit"
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row)}
            color="secondary"
            aria-label="delete"
          >
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  const rows = productsData.map((product, index) => ({
    id: product._id, // Required by DataGrid to identify each row
    serial: index + 1,
    name: product.name,
    image: product.image,
    status: product.status,
    price: product.price,
    quantity: product.quantity,
    category: product.categoryId?.title || "N/A",
    admin: product.adminId?.name || "N/A",
    createdAt: product.createdAt,
  }));

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

  if (error) {
    return (
      <Typography color="error" align="center" variant="h6">
        {error}
      </Typography>
    );
  }

  return (
    <>
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

      <Paper elevation={3} style={{ padding: 16 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Product List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleRounded />}
            onClick={() => navigate("/products/add")}
          >
            Add New
          </Button>
        </Box>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          pagination
          paginationMode="client"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newSize) => setRowsPerPage(newSize)}
          sortingMode="server"
          disableSelectionOnClick
        />
      </Paper>
    </>
  );
};

export default ProductList;
