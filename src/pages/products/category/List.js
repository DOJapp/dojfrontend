import React, { useEffect } from "react";
import { useStyles } from "../../../assets/styles.js";
import { Grid, IconButton } from "@mui/material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, deleteCategory } from "../../../redux/Actions/categoryActions.js";
import { AddCircleRounded, Edit, Delete } from "@mui/icons-material";

const CategoryList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access categories from Redux store
  const categoriesData = useSelector((state) => state.category.categories);
  console.log("categoriesData", categoriesData);

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

  const displayTable = () => {
    const deepCopyCategoriesData = categoriesData.map((category) => ({
      ...category,
    }));

    return (
      <Grid container spacing={1}>
        <Grid item lg={12}>
          <MaterialTable
            title="Categories"
            data={deepCopyCategoriesData} // Use the deep-copied data
            columns={[
              {
                title: "S.No",
                render: (rowData) => rowData.tableData.id + 1, // Serial number
              },
              {
                title: "Image",
                render: (rowData) => (
                  <img
                    src={rowData.image}
                    alt={rowData.title}
                    style={{ width: 50, height: 50 }}
                  />
                ),
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
            }}
            actions={[
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
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
    <div className={classes.container}>
      <div className={classes.box}>{displayTable()}</div>
    </div>
  );
};

export default CategoryList;
