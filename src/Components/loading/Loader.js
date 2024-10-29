import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";
import { connect } from "react-redux";

const Loader = ({ isLoading }) => {
  console.log(isLoading)
  return (
    <Modal open={isLoading}>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          height: "100vh",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.dashboard.isLoading,
});

export default connect(mapStateToProps, null)(Loader);

// import React from "react";
// import { CircularProgress, Button, Typography } from "@mui/material";
// import { Refresh } from "@mui/icons-material";
// import "./Loader.css"; // Import the CSS for the loader

// const Loader = ({ onReload }) => {
//   return (
//     <div className="loaderContainer">
//       <CircularProgress />
//       <Typography variant="h6" style={{ margin: "16px 0" }}>
//         Loading...
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         startIcon={<Refresh />}
//         onClick={onReload}
//       >
//         Reload
//       </Button>
//     </div>
//   );
// };

// export default Loader;
