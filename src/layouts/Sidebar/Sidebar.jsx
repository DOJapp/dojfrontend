import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BiAbacus } from "react-icons/bi";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logoIcon from "../../assets/login_background.jpg"; // Consider renaming for clarity
import SidebarMenu from "./SidebarMenu";
import "./sideBar.css";
import { connect } from "react-redux";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/users",
    name: "Users",
    icon: <BiAbacus />,
  },
  {
    path: "/category",
    name: "Category",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/category",
        name: "List",
        icon: <BiAbacus />,
      },
      {
        path: "/category/add",
        name: "Add Category",
        icon: <BiAbacus />,
      },
    ],
  },
  {
    path: "/tags",
    name: "Tag",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/tags",
        name: "List",
        icon: <BiAbacus />,
      },
      {
        path: "/tags/add",
        name: "Add Tags",
        icon: <BiAbacus />,
      },
    ],
  },
  {
    path: "/products",
    name: "Products",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/products", // This route will show the list of products
        name: "List",
        icon: <BiAbacus />,
      },
      {
        path: "/products/add", // This route will show the add product form
        name: "Add Products",
        icon: <BiAbacus />,
      },
    ],
  },
  {
    path: "/partners",
    name: "Partners",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/partners", 
        name: "List",
        icon: <BiAbacus />,
      },
      {
        path: "/partners/add", 
        name: "Add",
        icon: <BiAbacus />,
      },
    ],
  },
  {
    path: "/banner",
    name: "Banner",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/banner",
        name: "List",
        icon: <BiAbacus />,
      },
      {
        path: "/banner/add",
        name: "Add Banner",
        icon: <BiAbacus />,
      },
    ],
  },
];

const inputAnimation = {
  hidden: {
    width: 0,
    padding: 0,
    transition: {
      duration: 0.2,
    },
  },
  show: {
    width: "140px",
    padding: "5px 15px",
    transition: {
      duration: 0.2,
    },
  },
};

const showAnimation = {
  hidden: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  show: {
    opacity: 1,
    width: "auto",
    transition: {
      duration: 0.5,
    },
  },
};

const SideBar = ({ isSidebarOpen }) => {
  const [hiddenSidebarWidth, setHiddenSidebarWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setHiddenSidebarWidth(window.innerWidth > 991 ? 45 : 0);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      animate={{
        width: isSidebarOpen ? "250px" : `${hiddenSidebarWidth}px`,
        transition: {
          duration: 0.5,
          type: "spring",
          damping: 10,
        },
      }}
      className="sidebar"
    >
      <div className="top_section">
        {isSidebarOpen ? (
          <span>Doj Admin</span>
        ) : (
          <img src={logoIcon} style={{ width: 30, height: 30, borderRadius: '50%' }} alt="Logo" />
        )}
      </div>
      <section className="routes">
        {routes.map((route, index) => {
          if (route.subRoutes) {
            return (
              <SidebarMenu
                route={route}
                key={index}
                showAnimation={showAnimation}
                isSidebarOpen={isSidebarOpen}
              />
            );
          }

          return (
            <div key={index} className="side_Bar">
              <NavLink
                to={route.path}
                className="link"
                activeClassName="active" // Ensure you're using the correct prop based on your version of react-router
                exact // This ensures that the link only gets active when the path exactly matches
              >
                <div className="icon">{route.icon}</div>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            </div>
          );
        })}
      </section>
    </motion.div>
  );
};

const mapStateToProps = (state) => ({
  isSidebarOpen: state.dashboard.isSidebarOpen,
});

export default connect(mapStateToProps)(SideBar);
