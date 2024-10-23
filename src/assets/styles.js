import { makeStyles } from "@mui/styles";
import login_background from "./images/login_background.jpg";

export const Colors = {
  primaryDark: "#F16134",
  primaryLight: "#F48534",
  white: "#fff",
  whiteDark: "#F5F5F5",
  grayLight: "#ECEAEA",
  gray: "#A3A3A3",
  grayDark: "#666666",
  black: "#090A0A",
  greenLight: "#46BC67",
  greenDark: "#34A853",
  greenDark2: "#0A882D",
  green_parrot: "#5DC709",
  red: "#FF0000",
  red_a: "#eb2f06",
  blueFacebook: "#1877F2",
  skyblue: "#46A6FF",
  bodyColor: "#EDF2F5",
  splash_background: "#FFEDCA",
  light_Pink: "#f7e7d7",
  dark_Pink: "#EFD0B0",
  darkBlue: "#1B1B45",
};


export const useStyles = makeStyles((theme) => ({
  loginBox: {
    padding: theme.spacing(4), // Use theme spacing for consistency
    maxWidth: "30rem",
    borderRadius: 20,
    backgroundColor: "white",
  },
  loginHeadingContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  login: {
    fontSize: "1.2rem",
    marginTop: 10,
  },
  loginHeading: {
    fontSize: "2rem",
    fontFamily: "Philosopher",
  },
  container: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    // maxWidth: "600px",
    width: "98%",
  },
  box: {
    width: "100%",
    height: "auto",
    padding: theme.spacing(2), // Use theme spacing for consistency
    background: "#fff",
    boxShadow: "0px 0px 5px lightgrey",
    borderRadius: 15,
  },
  headingContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: "2rem",
    fontFamily: "Philosopher",
  },
  addButton: {
    padding: "5px 10px",
    backgroundColor: Colors.primaryDark,
    borderRadius: 5,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    fontFamily: "Philosopher",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  addButtonText: {
    marginLeft: 5,
  },
  submitButton: {
    background: Colors.primaryLight,
    width: "100%",
    padding: theme.spacing(1), // Use theme spacing for consistency
    textAlign: "center",
    borderRadius: 10,
    color: Colors.white,
    fontFamily: "Philosopher",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  denyButton: {
    background: Colors.bodyColor,
    width: "100%",
    padding: theme.spacing(1), // Use theme spacing for consistency
    textAlign: "center",
    borderRadius: 10,
    color: Colors.black,
    fontFamily: "Philosopher",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  closeButton: {
    color: Colors.primaryDark,
    cursor: "pointer",
    padding: 5,
    "&:hover": {
      backgroundColor: Colors.grayLight,
      borderRadius: 10,
    },
  },
  uploadContainer: {
    display: "flex",
    alignItems: "center",
  },
  uploadImageButton: {
    background: Colors.dark_Pink,
    width: "100%",
    padding: theme.spacing(1), // Use theme spacing for consistency
    textAlign: "center",
    borderRadius: 10,
    color: Colors.black,
    fontFamily: "Philosopher",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  errorStyles: {
    color: "#d32f2f",
    fontSize: "0.8rem",
    fontFamily: "Arial",
    lineHeight: 1.66,
    letterSpacing: "0.03333rem",
    textAlign: "left",
    margin: "3px 14px 0", // Use shorthand for margin
  },
  chips: {
    margin: 10,
  },
  checkbox: {
    color: "#333",
    fontSize: "1.2rem",
    fontFamily: "Philosopher",
  },
  
}));

export const propStyles = {
  tableStyles: {
    sorting: false,
    search: true,
    searchFieldAlignment: "right",
    filtering: true,
    paging: true,
    pageSize: 5,
    paginationType: "stepped",
    showFirstLastPageButtons: true,
    paginationPosition: "bottom",
    exportButton: false,
    exportAllData: false,
    exportFileName: "Category data",
    addRowPosition: "first",
    actionsColumnIndex: -1,
    selection: false,
    showSelectAllCheckbox: false,
    headerStyle: { fontSize: "1.2rem", fontWeight: 600 },
    tableLayout: "auto",
    // headerStyle: { width: 'auto' }
  },
};

// options={{
//     sorting: true,
//     search: true,
//     searchFieldAlignment: "right",
//     filtering: true,
//     paging: true,
//     pageSize: 5,
//     paginationType: "stepped",
//     showFirstLastPageButtons: true,
//     paginationPosition: "bottom",
//     exportButton: false,
//     exportAllData: false,
//     exportFileName: "Category data",
//     addRowPosition: "first",
//     actionsColumnIndex: -1,
//     selection: false,
//     showSelectAllCheckbox: false,
// }}
