import React, { useEffect, useState } from "react";
import { IconButton, Chip, Button, Typography, Paper, Dialog, DialogTitle, DialogContent } from "@mui/material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPartners, deletePartner } from "../../redux/Actions/partnerActions.js";
import { AddCircleRounded, Edit, Delete, Visibility } from "@mui/icons-material";

const PartnerList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

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

  const handleClose = () => {
    setOpen(false);
    setSelectedImage("");
  };

  const handleDelete = (rowData) => {
    dispatch(deletePartner(rowData._id));
  };


  const displayTable = () => (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, marginTop: 2 }}>
      <MaterialTable
        title="Partners"
        data={partnerData.map((partner, index) => ({
          ...partner,
          serial: index + 1,
        }))}
        columns={[
          { title: "S.No", field: "serial" },
          { title: "Pan Number", field: "panNumber" },
          { title: "Firm Name", field: "firmName" },
          {
            title: "Status",
            render: (rowData) =>
              rowData.status === "Active" ? (
                <Chip label="Active" size="small" variant="outlined" color="success" />
              ) : (
                <Chip label="Blocked" size="small" variant="outlined" color="error" />
              ),
          },
          {
            title: "Action",
            render: (rowData) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => handleView(rowData)}
                  color="primary"
                  aria-label="view"
                  sx={{ border: "1px solid gray", mx: 0.5 }}
                >
                  <Visibility />
                </IconButton>
                <IconButton
                  onClick={() => handleEdit(rowData)}
                  color="primary"
                  aria-label="edit"
                  sx={{ border: "1px solid gray", mx: 0.5 }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(rowData)}
                  color="secondary"
                  aria-label="delete"
                  sx={{ border: "1px solid gray", mx: 0.5 }}
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
          pageSize: 10,
          actionsColumnIndex: -1,
          emptyRowsWhenPaging: false,
          debounceInterval: 500,
        }}
        actions={[
          {
            icon: () => (
              <Button
                startIcon={<AddCircleRounded />}
                variant="contained"
                color="primary"
                style={{
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: 8,
                  padding: "8px 16px",
                }}
                onClick={() => navigate("/partners/add")}
              >
                <Typography variant="button">Add Partner</Typography>
              </Button>
            ),
            tooltip: "Add Partner",
            isFreeAction: true,
          },
        ]}
      />
    </Paper>
  );

  if (error) {
    return <div style={{ color: "red", padding: "10px" }}>{error}</div>;
  }

  return (
    <>
      {displayTable()}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Partner Image</DialogTitle>
        <DialogContent>
          <img src={selectedImage} alt="Selected partner" style={{ width: "100%" }} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PartnerList;
