import React, { useEffect } from "react";
import { useStyles } from "../../assets/styles.js";
import { Grid, IconButton, Chip } from "@mui/material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPartners,
  deletePartner,
} from "../../redux/Actions/partnerActions.js";
import { AddCircleRounded, Edit, Delete } from "@mui/icons-material";

const PartnerList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access partner data from Redux store
  const partnerData = useSelector((state) => state.partner.partners);
  const error = useSelector((state) => state.partner.error);

  useEffect(() => {
    // Dispatch action to fetch partners
    dispatch(getPartners());
  }, [dispatch]);

  const handleEdit = (rowData) => {
    // Redirect to the edit page with the partner ID
    navigate(`/partners/edit/${rowData._id}`);
  };
  const handleStore = (rowData) => {
    // Redirect to the edit page with the partner ID
    navigate(`/partners/edit/${rowData._id}`);
  };

  const handleDelete = (rowData) => {
    // Dispatch delete action
    dispatch(deletePartner(rowData._id));
  };

  const displayTable = () => {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12}>
          <MaterialTable
            title="Partners"
            data={partnerData.map((partner, index) => ({
              ...partner,
              serial: index + 1,
            }))}
            columns={[
              {
                title: "S.No",
                field: "serial",
              },
              {
                title: "Name",
                field: "name", // Adjust based on your actual field name for title
              },
              {
                title: "Email",
                field: "email",
              },
              {
                title: "Phone No",
                field: "phone", // Ensure this field exists in your data
              },
              {
                title: "Status",
                render: (rowData) =>
                  rowData.status === "Active" ? (
                    <Chip
                      label="Active"
                      size="small"
                      variant="outlined"
                      color="success"
                    />
                  ) : (
                    <Chip
                      label="Blocked"
                      size="small"
                      variant="outlined"
                      color="error"
                    />
                  ),
              },
              {
                title: "Action",
                render: (rowData) => (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
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
                    <IconButton
                      onClick={() => handleStore(rowData)}
                      color="success"
                      aria-label="store"
                    >
                      <Chip
                        label="Store"
                        size="small"
                        variant="outlined"
                        color="success"
                      />
                    </IconButton>
                  </div>
                ),
              },
            ]}
            options={{
              sorting: true,
              search: true,
              paging: true,
              pageSize: 10,
              actionsColumnIndex: -1,
              emptyRowsWhenPaging: false,
              debounceInterval: 500,
            }}
            actions={[
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add Partner",
                isFreeAction: true,
                onClick: () => navigate("/partners/add"),
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

export default PartnerList;
