import React, { useEffect, useState } from "react";
import "./header.css";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import logo_icon from "../../assets/login_background.jpg";
import { Colors } from "../../assets/styles";
import Swal from "sweetalert2";
import * as Actions from '../../redux/Actions/dashboardActions';

const Header = ({ dispatch, isSidebarOpen }) => {
  const [userToggle, setUserToggle] = useState(false); // You can use this state for user menu toggle
  const navigate = useNavigate();
  const [data, setData] = useState(null); 

  useEffect(() => {
    // Fetch user data (here assumed to be tokens) from local storage
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      setData({ accessToken, refreshToken }); // Simulate user data
    } else {
      // If no valid data, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  const toggle = () => {
    // Toggle sidebar state using Redux action
    dispatch(Actions.setIsSidebarOpen(!isSidebarOpen));
  };

  const handleLogout = async () => {
    // Confirmation dialog for logout
    const result = await Swal.fire({
      title: `Are you sure you want to logout?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.grayDark,
      confirmButtonText: "Logout",
    });

    if (result.isConfirmed) {
      console.log(("first"))
      try {
        setData(null);
        localStorage.clear();
        navigate("/login"); 
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <header className="header">
      <div className="header_wrapper">
        <div className="bars">
          <FaBars onClick={toggle} />
        </div>

        <div className="header_icon_name">
          <img
            src={logo_icon}
            alt="Logo"
            style={{ width: 40, height: 40, borderRadius: '50%' }}
          />
          <h3 style={{ marginLeft: 10 }}>DOJ</h3>
        </div>

        <div>
          <FaSignOutAlt onClick={handleLogout} className="user_icon" />
        </div>
      </div>
    </header>
  );
};

// Map Redux state to props (for sidebar state)
const mapStateToProps = (state) => ({
  isSidebarOpen: state.dashboard.isSidebarOpen,
});

export default connect(mapStateToProps)(Header);
