import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#1466d8", // Your primary blue color
      light: "#3182c1", // Lighter shade of blue
      dark: "#0f4b8b", // Darker shade of blue
      contrastText: "#ffffff", // White text for contrast
    },
    secondary: {
      main: "#f50057", // Pinkish-red as secondary color
      light: "#ff5983",
      dark: "#bb002f",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8f9fa", // Light background
      paper: "#ffffff", // Card or component backgrounds
    },
    text: {
      primary: "#333333", // Darker text
      secondary: "#555555", // For subtitles or less important text
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif", // Custom font family
    h5: {
      fontWeight: 600,
    },
  },
});

export default theme;
