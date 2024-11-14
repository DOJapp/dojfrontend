import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  deleteCategory,
} from "../../../redux/Actions/categoryActions.js";
import { AddCircleRounded, Edit, Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Chip,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const CategoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoriesData = useSelector(
    (state) => state.category.categories || []
  );
  const error = useSelector((state) => state.category.error);

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage("");
  };

  const handleEdit = (rowData) => {
    navigate(`/category/edit/${rowData.id}`);
  };

  const handleDelete = (rowData) => {
    dispatch(deleteCategory(rowData.id));
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

  const columns = [
    {
      field: "serial",
      headerName: "S.No",
      width: 50,
      sortable: true,
    },
    {
      field: "title",
      headerName: "Title",
      width: 180,
      sortable: true,
    },
    {
      field: "image",
      headerName: "Image",
      width: 90,
      renderCell: (params) => (
        <img
          src={params.value || "fallback_image_url"}
          alt="Category"
          style={{ width: 50, height: 50, cursor: "pointer" }}
          onClick={() => handleClickOpen(params.value)}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value === "Active" ? "Active" : "Blocked"}
          size="small"
          variant="outlined"
          color={params.value === "Active" ? "success" : "error"}
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      width: 180,
      sortable: true,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: "auto",
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Edit />}
            onClick={() => handleEdit(params.row)}
            size="small"
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Delete />}
            onClick={() => handleDelete(params.row)}
            size="small"
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const rows = categoriesData.map((category, index) => ({
    id: category._id,
    serial: index + 1,
    title: category.title,
    image: category.image,
    status: category.status,
    createdAt: category.createdAt,
  }));

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle>Category Image</DialogTitle>
        <DialogContent>
          <img
            src={selectedImage || "fallback_image_url"}
            alt="Selected Category"
            style={{ width: "100%" }}
          />
        </DialogContent>
      </Dialog>

      <Paper elevation={3} style={{ padding: 16 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Category List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleRounded />}
            onClick={() => navigate("/category/add")}
          >
            Add New Category
          </Button>
        </Box>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 25]}
          checkboxSelection
          disableSelectionOnClick
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </Paper>
    </>
  );
};

export default CategoryList;
