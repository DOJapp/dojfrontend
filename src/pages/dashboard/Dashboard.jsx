import React, { useEffect, useState } from "react";
import "../dashboard/dashboard.css";
import { useStyles } from "../dashboard/dashboardStyles";
import Chart from "react-apexcharts";
import { Grid, Tooltip } from "@mui/material";
import { connect } from "react-redux";
import * as DashboardActions from '../../redux/Actions/dashboardActions';
import Loader from "../../Components/loading/Loader";

const Dashboard = ({ dashboardData, dispatch }) => {
  const classes = useStyles();

  useEffect(() => {
    dispatch(DashboardActions.getDashboard());
  }, [dispatch]);

  const salesData = {
    options: {
      chart: {
        id: "sales-trends",
        toolbar: { show: false },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
      title: {
        text: "Sales Over Time",
        align: "center",
      },
    },
    series: [
      {
        name: "Sales",
        data: [30, 40, 45, 50, 49, 60, 70],
      },
    ],
  };

  const orderDistribution = {
    options: {
      chart: {
        id: "order-distribution",
        type: "pie",
      },
      title: {
        text: "Order Distribution",
        align: "center",
      },
    },
    series: [44, 55, 41, 17],
    labels: ["Food", "Beverages", "Desserts", "Others"],
  };

  const topProducts = {
    options: {
      chart: {
        id: "top-products",
        type: "bar",
        toolbar: { show: false },
      },
      xaxis: {
        categories: ["Pizza", "Burger", "Sushi", "Salad"],
      },
      title: {
        text: "Top Products",
        align: "center",
      },
    },
    series: [
      {
        name: "Sales",
        data: [80, 50, 30, 20],
      },
    ],
  };

  return (
    <div className={classes.dashboard_container}>
      <Loader />
      <div className={classes.dashboard_inner_container}>
        <Grid container spacing={2}>
          {/* Summary Cards */}
          {[
            { img: "zodiac.png", label: "All Users", value: dashboardData?.total_astrologers },
            { img: "team.png", label: "All Users", value: dashboardData?.total_customers },
            { img: "phone-call.png", label: "No. Of Calls", value: dashboardData?.total_call },
            { img: "comment.png", label: "No. Of Chats", value: dashboardData?.total_chat },
          ].map((item, index) => (
            <Grid item lg={3} sm={12} md={12} xs={12} key={index}>
              <div className={`${classes.dashboard_card} card-hover`}>
                <Tooltip title={item.label}>
                  <div className="donut">
                    <img
                      src={require(`../../assets/images/${item.img}`)}
                      alt={item.label}
                      style={{ height: "8rem", width: "8rem" }}
                    />
                    <h1 style={{ paddingTop: "10px" }}>{item.value}</h1>
                    <h4>{item.label}</h4>
                  </div>
                </Tooltip>
              </div>
            </Grid>
          ))}
          {/* Graphs */}
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <Chart
              options={salesData.options}
              series={salesData.series}
              type="line"
              width="100%"
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <Chart
              options={orderDistribution.options}
              series={orderDistribution.series}
              type="pie"
              width="100%"
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <Chart
              options={topProducts.options}
              series={topProducts.series}
              type="bar"
              width="100%"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dashboardData: state.dashboard.dashboardData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
