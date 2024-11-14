import React, { useEffect, useState } from "react";
import { IconButton, Chip, Button, Typography, Paper, Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPartners, deletePartner } from "../../redux/Actions/partnerActions.js";
import { AddCircleRounded, Edit, Delete, Visibility } from "@mui/icons-material";

const PartnerList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("serial");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const partnerData = useSelector((state) => state.partner.partners);
  const error = useSelector((state) => state.partner.error);

  useEffect(() => {
    dispatch(getPartners());
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
    if (window.confirm(`Are you sure you want to delete partner: ${rowData._id}?`)) {
      dispatch(deletePartner(rowData._id));
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  const displayTable = () => (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, marginTop: 2 }}>
      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === "serial" ? order : false}>
                <TableSortLabel
                  active={orderBy === "serial"}
                  direction={orderBy === "serial" ? order : "asc"}
                  onClick={(e) => handleRequestSort(e, "serial")}
                >
                  S.No
                </TableSortLabel>
              </TableCell>
              <TableCell>Pan Number</TableCell>
              <TableCell>Firm Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {partnerData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((partner, index) => (
                <TableRow key={partner._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{partner.panNumber}</TableCell>
                  <TableCell>{partner.firmName}</TableCell>
                  <TableCell>
                    {partner.status === "Active" ? (
                      <Chip label="Active" size="small" variant="outlined" color="success" />
                    ) : (
                      <Chip label="Blocked" size="small" variant="outlined" color="error" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        onClick={() => handleView(partner)}
                        color="primary"
                        aria-label="view"
                        sx={{ border: "1px solid gray", mx: 0.5 }}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        onClick={() => handleEdit(partner)}
                        color="primary"
                        aria-label="edit"
                        sx={{ border: "1px solid gray", mx: 0.5 }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(partner)}
                        color="secondary"
                        aria-label="delete"
                        sx={{ border: "1px solid gray", mx: 0.5 }}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={partnerData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
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
    </>
  );
};

export default PartnerList;
