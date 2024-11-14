import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTags, deleteTag } from "../../redux/Actions/tagsActions.js";
import { AddCircleRounded, Edit, Delete } from "@mui/icons-material";
import {
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";

const TagList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tags, loading, error } = useSelector((state) => state.tag);

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  const handleEdit = (rowData) => {
    navigate(`/tags/edit/${rowData.id}`);
  };

  const handleDelete = async (rowData) => {
      await dispatch(deleteTag(rowData.id));
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

  const columns = [
    { field: "serial", headerName: "S.No", width: 100 },
    { field: "title", headerName: "Title", width: 180 },
    { field: "status", headerName: "Status", width: 180 },
    { field: "createdAt", headerName: "Created Date", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
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
        </div>
      ),
    },
  ];

  const rows = tags.map((tag, index) => ({
    id: tag._id,
    serial: index + 1,
    title: tag.title,
    status: tag.status === "Active" ? "Active" : "Blocked",
    createdAt: formatDate(tag.createdAt),
  }));

  if (loading) {
    return (
      <Paper
        elevation={3}
        style={{
          padding: 16,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return <div style={{ color: "red", padding: "10px" }}>{error}</div>;
  }

  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Display Tags
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleRounded />}
          onClick={() => navigate("/tags/add")}
        >
          Add New
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 25]}
        disableSelectionOnClick
        checkboxSelection
      />
    </Paper>
  );
};

export default TagList;
