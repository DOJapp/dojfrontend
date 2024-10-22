import React, { useEffect, useState } from "react";
import { useStyles } from "../../assets/styles.js";
import { Grid, TextField, Button } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    // Dummy product data
    const dummyProducts = [
      { id: 1, name: "Product 1", price: "$10", category: "Category A" },
      { id: 2, name: "Product 2", price: "$20", category: "Category B" },
      { id: 3, name: "Product 3", price: "$30", category: "Category C" },
      { id: 4, name: "Product 4", price: "$40", category: "Category D" },
    ];
    setProductsData(dummyProducts);
  }, []);

  const handleEdit = (rowData) => {
    // Navigate to the edit page with the product ID
    navigate(`/products/edit/${rowData.id}`);
  };

  const handleChange = (e, field) => {
    setEditingProduct((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    setProductsData((prev) =>
      prev.map((product) =>
        product.id === editingProduct.id ? editingProduct : product
      )
    );
    setEditingProduct(null);
  };

  const displayTable = () => (
    <Grid container spacing={1}>
      <Grid item lg={12}>
        <MaterialTable
          title="Products"
          data={productsData}
          columns={[
            { title: "S.No", render: (rowData, index) => index + 1 },
            { title: "Name", field: "name" },
            { title: "Price", field: "price" },
            { title: "Category", field: "category" },
            {
              title: "Action",
              render: (rowData) => (
                <Button onClick={() => handleEdit(rowData)} color="primary">
                  Edit
                </Button>
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
              tooltip: "Add Product",
              isFreeAction: true,
              onClick: () => navigate("/products/add"),
            },
          ]}
        />
      </Grid>
      {editingProduct && (
        <Grid item lg={12}>
          <div className={classes.editForm}>
            <Grid container spacing={2}>
              <Grid item lg={4}>
                <TextField
                  label="Name"
                  value={editingProduct.name}
                  onChange={(e) => handleChange(e, "name")}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item lg={4}>
                <TextField
                  label="Price"
                  value={editingProduct.price}
                  onChange={(e) => handleChange(e, "price")}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item lg={4}>
                <TextField
                  label="Category"
                  value={editingProduct.category}
                  onChange={(e) => handleChange(e, "category")}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item lg={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      )}
    </Grid>
  );

  return (
    <div className={classes.container}>
      <div className={classes.box}>{displayTable()}</div>
    </div>
  );
};

export default ProductList;
