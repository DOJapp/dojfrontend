import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBanners, deleteBanner } from "../../redux/Actions/bannerActions.js";
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

  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage("");
  };

  const handleEdit = (rowData) => {
    navigate(`/banner/edit/${rowData.id}`);
  };

  const handleDelete = (rowData) => {
    dispatch(deleteBanner(rowData.id));
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
      field: "redirectTo",
      headerName: "Redirect To",
      width: 90,
      sortable: true,
    },
    {
      field: "productName",
      headerName: "Product Name",
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
          alt="Banner"
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

  const rows = bannersData.map((banner, index) => ({
    id: banner._id,
    serial: index + 1,
    redirectTo: banner.redirectTo || "N/A",
    productName:
      banner.redirectTo === "product" && banner.productId
        ? banner.productId.name
        : "N/A",
    image: banner.image,
    status: banner.status,
    createdAt: banner.createdAt,
  }));

  if (error) {
    return <div style={{ color: "red", padding: "10px" }}>{error}</div>;
  }

  return (
    <>
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

      <Paper elevation={3} style={{ padding: "10px", borderRadius: "8px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Display Banner
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleRounded />}
            onClick={() => navigate("/banner/add")}
          >
            Add New
          </Button>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Paper>
    </>
  );
};

export default BannerList;
