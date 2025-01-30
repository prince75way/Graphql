import React from "react";
import { Box, Grid, Typography, IconButton, Link } from "@mui/material";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#212121", // Dark background
        color: "white", // White text for contrast
        py: 4,
        mt: 5,
      }}
    >
      <Grid container spacing={4} sx={{ textAlign: "center" }}>
        {/* Left Column: Company Information */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2" paragraph>
            Your Learning Management System (LMS) provides a seamless way to
            manage, deliver, and track courses online. We are committed to
            empowering educators and students.
          </Typography>
          <Typography variant="body2">
            &copy; 2025 Your LMS Name. All rights reserved.
          </Typography>
        </Grid>

        {/* Middle Column: Quick Links */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Link href="#" sx={{ display: "block", color: "white", mb: 1 }}>
            Home
          </Link>
          <Link href="#" sx={{ display: "block", color: "white", mb: 1 }}>
            Courses
          </Link>
          <Link href="#" sx={{ display: "block", color: "white", mb: 1 }}>
            Contact
          </Link>
          <Link href="#" sx={{ display: "block", color: "white", mb: 1 }}>
            Privacy Policy
          </Link>
        </Grid>

        {/* Right Column: Social Media */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box>
            <IconButton
              color="primary"
              sx={{
                "&:hover": {
                  backgroundColor: "transparent", // Clear hover background
                  color: "#4267B2", // Facebook color on hover
                },
                mr: 1,
              }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              color="primary"
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#E4405F", // Instagram color on hover
                },
                mr: 1,
              }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              color="primary"
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#0077B5", // LinkedIn color on hover
                },
                mr: 1,
              }}
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
