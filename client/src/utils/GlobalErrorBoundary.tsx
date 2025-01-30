import React, { Component, ReactNode } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  errorMessage: string;
};

class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f8d7da",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              textAlign: "center",
              maxWidth: 400,
              backgroundColor: "#ffffff",
              borderRadius: 2,
            }}
          >
            <ErrorOutlineIcon
              sx={{ fontSize: 50, color: "#f44336", marginBottom: 2 }}
            />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Oops! Something Went Wrong
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#6c757d", marginBottom: 3 }}
            >
              {this.state.errorMessage}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => window.location.reload()}
              sx={{
                paddingX: 3,
                paddingY: 1,
                textTransform: "capitalize",
                fontWeight: "bold",
                boxShadow: 3,
              }}
            >
              Reload Page
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
