import React, { useEffect, useState } from "react";
import { useStyles } from '../../assets/styles.js';
import { Grid, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { AddCircleRounded, CloseRounded } from '@mui/icons-material';
import { get_all_users } from "../../utils/Constants.js"; // Ensure this endpoint returns user data
import { getData } from '../../utils/FetchNodeServices.js';
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const ListUsers = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [usersData, setUsersData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        const response = await getData(get_all_users);
        setUsersData(response.users || []);
    };

    const handleOpen = (rowData) => {
        setOpen(true);
        setSelectedUser(rowData);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    const handleSubmit = async () => {
        // Handle user update logic here
        handleClose(); // Close the dialog after submission
    };

    const displayTable = () => (
        <Grid container spacing={1}>
            <Grid item lg={12}>
                <TableContainer component={Paper}>
                    <Table aria-label="user table">
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersData.map((user, index) => (
                                <TableRow key={user._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>
                                        <button onClick={() => handleOpen(user)}>Edit</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );

    const showEditForm = () => (
        <Grid container spacing={2}>
            <Grid item lg={12}>
                <div className={classes.headingContainer}>
                    <div className={classes.heading}>Edit User</div>
                    <div onClick={handleClose} className={classes.closeButton}>
                        <CloseRounded />
                    </div>
                </div>
            </Grid>
            <Grid item lg={6}>
                <TextField
                    label="Name"
                    value={selectedUser?.name || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                    variant='outlined'
                    fullWidth
                />
            </Grid>
            <Grid item lg={6}>
                <TextField
                    label="Email"
                    value={selectedUser?.email || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    variant='outlined'
                    fullWidth
                />
            </Grid>
            <Grid item lg={6}>
                <TextField
                    label="Phone"
                    value={selectedUser?.phone || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                    variant='outlined'
                    fullWidth
                />
            </Grid>
            <Grid item lg={6}>
                <div onClick={handleSubmit} className={classes.submitbutton}>
                    Submit
                </div>
            </Grid>
        </Grid>
    );

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                {displayTable()}
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        {showEditForm()}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default ListUsers;
