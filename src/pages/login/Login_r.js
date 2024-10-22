import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import { Grid, TextField, Button } from "@mui/material";
import Swal from "sweetalert2";
import logo_icon from "../../assets/login_background.jpg";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

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
      try {
        // Replace this with a real authentication logic
        localStorage.setItem("userDetails", userEmail);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      } catch (error) {
        console.error(error.message);
        Swal.fire("Error", "Login failed, please try again", "error");
      }
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
                style={{ textAlign: "center", color: "#fff" }}
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
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginBottom: "1rem" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <Button onClick={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? "Hide" : "Show"}
                  </Button>
                ),
              }}
              style={{ marginBottom: "1rem" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Login;
