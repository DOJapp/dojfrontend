import { Breadcrumbs, Container, Link, Stack, Typography } from "@mui/material";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import { Link } from "react-router-dom";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const BreadCrumb = ({ page }) => {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
      style={{ textDecoration: "none" }}
    >
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
      style={{ textDecoration: "none" }}
    >
      {page}
    </Link>,
  ];
  return (
    <>
      <div className="container" style={{ padding: "10px 0px" }}>
        <Typography variant="h5">Heading</Typography>
        <Stack spacing={2}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </div>
    </>
  );
};

export default BreadCrumb;
