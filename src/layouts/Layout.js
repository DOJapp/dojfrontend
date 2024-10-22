import React from "react";
import SideBar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import "./layout.css";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from '../redux/Actions/dashboardActions';

const Layout = ({ dispatch, isSidebarOpen }) => {

  // console.log("isSidebarOpen",isSidebarOpen);

  const handleClickOutside = () => {
    dispatch(Actions.setIsSidebarOpen(!isSidebarOpen));
  };

  return (
    <div className="main-container">
      <SideBar />
      <div style={{ flex: 1, height: "100vh", overflowY: "auto" }}>
        <Header />
        <main className="maincontainer">
          <Outlet />
        </main>
      </div>
      <div
        onClick={handleClickOutside}
        className={`overlay ${isSidebarOpen ? "show" : ""}`}
      ></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isSidebarOpen: state.dashboard.isSidebarOpen,
});

// Directly returning dispatch in mapDispatchToProps for simplicity
export default connect(mapStateToProps)(Layout);
