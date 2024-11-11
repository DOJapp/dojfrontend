import React, { useEffect, useState } from "react";
import { Grid, IconButton, Typography, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, deleteCategory } from "../../../redux/Actions/categoryActions.js";
import { AddCircleRounded, Edit, Delete } from "@mui/icons-material";

const CategoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access categories from Redux store
  const categoriesData = useSelector((state) => state.category.categories);
  console.log("categoriesData", categoriesData);

  const [openPreview, setOpenPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    // Dispatch action to fetch categories
    dispatch(getCategories());
  }, [dispatch]);

  const handleEdit = (rowData) => {
    // Redirect to the edit page with the category ID
    navigate(`/category/edit/${rowData._id}`);
  };

  const handleDelete = (rowData) => {
    // Dispatch delete action
    dispatch(deleteCategory({ _id: rowData._id }));
  };

  const handleImageClick = (imageUrl) => {
    setImagePreview(imageUrl);
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  // Format the date to IST (Indian Standard Time)
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

  // Create a deep copy of the categoriesData and format the createdAt field
  const displayTable = () => {
    const deepCopyCategoriesData = categoriesData.map((category) => ({
      ...category,
      formattedDate: formatDate(category.createdAt), // Format the createdAt date to IST
    }));

    return (
      <Grid container spacing={1}>
        <Grid item lg={12}>
          <MaterialTable
            title="Categories"
            data={deepCopyCategoriesData} // Use the formatted data
            columns={[
              {
                title: "S.No",
                render: (rowData) => rowData.tableData.id + 1,
              },
              {
                title: "Image",
                render: (rowData) => (
                  <img
                    src={rowData.image}
                    alt={rowData.title}
                    style={{ width: 50, height: 50, cursor: "pointer" }}
                    onClick={() => handleImageClick(rowData.image)}
                  />
                ),
              },
              { title: "Title", field: "title" },
              { title: "Status", field: "status" },
              { title: "Created Date", field: "formattedDate" },
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
            }}
            actions={[
              {
                icon: () => (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius: 8,
                      padding: "8px 16px",
                    }}
                    startIcon={<AddCircleRounded />}
                    onClick={() => navigate("/category/add")}
                  >
                    Add New
                  </Button>
                ),
                tooltip: "Add Category",
                isFreeAction: true,
                onClick: () => navigate("/category/add"),
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <Paper sx={{ padding: 3, marginTop: 4, marginX: "auto" }}>
      {displayTable()}

      {/* Dialog for image preview */}
      <Dialog open={openPreview} onClose={handleClosePreview}>
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          <img
            src={imagePreview}
            alt="Preview"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CategoryList;
