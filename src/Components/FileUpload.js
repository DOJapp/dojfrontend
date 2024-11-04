import React from "react";
import { Grid, Button, Avatar } from "@mui/material";

// File upload component
const FileUpload = ({ label, onChange, preview }) => (
  <Grid item xs={12} md={6} container spacing={2}>
    <Grid item xs={8}>
      <Button
        variant="contained"
        component="label"
        fullWidth
        style={{ backgroundColor: "#3f51b5", color: "#fff" }}
      >
        {label}
        <input type="file" hidden accept="image/*" onChange={onChange} />
      </Button>
    </Grid>
    <Grid item xs={4}>
      <Avatar
        alt={`${label} Preview`}
        src={preview}
        style={{
          width: "50px",
          height: "50px",
          marginLeft: "10px",
          marginTop: "10px",
        }}
      />
    </Grid>
  </Grid>
);

export default FileUpload;
