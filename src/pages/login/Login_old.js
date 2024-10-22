// src/components/Login/Login.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import { Grid, TextField, Button, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import logo_icon from "../../assets/login_background.jpg";
import { loginRequest } from "../../redux/Actions/authActions.js"; // Import the login action
import { useStyles } from "../../assets/styles.js";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Get loading state from Redux store
  const isLoading = useSelector((state) => state.auth.isLoading); // Adjust the path according to your state structure

  const validation = () => {
    let valid = true;
    if (!userEmail) {
      valid = false;
      Swal.fire("Error", "Email is required", "error");
    }
    if (!password) {
      valid = false;
      Swal.fire("Error", "Password is required", "error");
    }
    return valid;
  };

  const handleLogin = () => {
    if (validation()) {
      dispatch(loginRequest(userEmail, password)); // Dispatch login request action
    }
  };

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <div className={classes.loginBox}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div
              className={classes.loginheadingContainer}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={logo_icon}
                alt="Logo"
                style={{
                  width: "5rem",
                  height: "5rem",
                  borderRadius: "50%",
                  marginBottom: "1rem",
                }}
              />
              <div
                className={classes.loginheading}
                style={{ textAlign: "center", color: "#000" }}
              >
                Doj Admin
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Username"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <Button onClick={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? "Hide" : "Show"}
                  </Button>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Login;
