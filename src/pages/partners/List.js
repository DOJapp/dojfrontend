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
import { AddCircleRounded, Edit, Delete, Visibility } from "@mui/icons-material";

const PartnerList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access partner data from Redux store
  const partnerData = useSelector((state) => state.partner.partners);
  const error = useSelector((state) => state.partner.error);

  useEffect(() => {
    dispatch(getPartners());
  }, [dispatch]);

  const handleEdit = (rowData) => {
    navigate(`/partners/edit/${rowData._id}`);
  };

  const handleView = (rowData) => {
    navigate(`/partners/views/${rowData._id}`);
  };

  const handleStore = (rowData) => {
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
                title: "Pan Number",
                field: "panNumber",
              },
              {
                title: "Firm Name",
                field: "firmName",
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
                      onClick={() => handleView(rowData)}
                      color="primary"
                      aria-label="edit"
                      style={{ border: "1px solid gray", margin: "0 2px" }}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      onClick={() => handleEdit(rowData)}
                      color="primary"
                      aria-label="edit"
                      style={{ border: "1px solid gray", margin: "0 4px" }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(rowData)}
                      color="secondary"
                      aria-label="delete"
                      style={{ border: "1px solid gray", margin: "0 4px" }}
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
