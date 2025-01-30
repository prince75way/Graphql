import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import ResponsiveNavbar from "../components/Navbar"; // Updated component name
import Footer from "../components/Footer";
import styles from "./Basic.module.css";

const Basic: React.FC = () => {
  return (
    <Box className={styles.root}>
      {/* Navbar */}
      <Box className={styles.navbar}>
        <ResponsiveNavbar />
      </Box>

      {/* Main Content */}
      <Box className={styles.contentWrapper}>
        <Box className={styles.content}>
          <Outlet />
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Basic;
