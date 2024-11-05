import React from "react";
import { Grid, Button, Avatar, Typography } from "@mui/material";

// File upload component
const FileUpload = ({ label, onChange, preview, error, helperText }) => (
  <Grid item xs={12} md={6} container spacing={2}>
    <Grid item xs={9}>
      <Button
        variant="contained"
        component="label"
        fullWidth
        style={{ backgroundColor: "#3f51b5", color: "#fff" }}
      >
        {label}
        <input type="file" hidden accept="image/*" onChange={onChange} />
      </Button>
      {error && (
        <Typography variant="body2" color="error" style={{ marginTop: '4px' }}>
          {helperText || 'This field is required.'}
        </Typography>
      )}

    </Grid>
    <Grid item xs={3}>
      <Avatar
        alt={`${label} Preview`}
        src={preview}
        style={{
          width: "60px",
          height: "60px",
          marginLeft: "10px",
          marginTop: "0px",
        }}
      />
    </Grid>
  </Grid>
);

export default FileUpload;
