import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { AppProvider } from "@toolpad/core/AppProvider";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Typography,
  TextField,
  Container,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useLoginMutation, useSignupMutation } from "../services/api";
import { setUser } from "../redux/slices/userSlice";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function UserAuth() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between signup and login
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  // Use the login and signup hooks from userService
  const [login, { isLoading: isLoggingIn, error: loginError }] =
    useLoginMutation();
  const [signup, { isLoading: isSigningUp, error: signupError }] =
    useSignupMutation();

  const navigate = useNavigate();

  // React Hook Form initialization
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      tandc: false,
    },
  });

  interface FormData {
    email: string;
    password: string;
    name?: string;
    tandc?: boolean;
  }

  // Handle login and signup actions
  const handleSignIn = async (formData: FormData) => {
    const { email, password, name } = formData;

    if (isSignUp) {
      try {
        const response = await signup({ name: name || "", email, password }).unwrap();
        dispatch(setUser({ login: response.data.signup }));
        localStorage.setItem("accessToken", response.data.signup.accessToken);
        localStorage.setItem("refreshToken", response.data.signup.refreshToken);
        toast("Sign-Up Successful");
        setTimeout(() => {
          navigate("/");
        }, 4000);
      } catch (error) {
        console.log("Signup Error:", error);
      }
    } else {
      try {
        const response = await login({ email, password }).unwrap();
        dispatch(setUser(response.data));
        console.log(response)
        localStorage.setItem("accessToken", response.data.login.accessToken);
        localStorage.setItem("refreshToken", response.data.login.refreshToken);
        toast("Login Successful");
        setTimeout(() => {
          navigate("/");
        }, 4000);
      } catch (error) {
        console.log("Login Error:", error);
      }
    }
  };

  return (
    <AppProvider theme={theme}>
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ width: "100%" }}
        >
          <Paper
            sx={{
              padding: 4,
              boxShadow: 4,
              borderRadius: 3,
              backgroundColor: "white",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#333", marginBottom: 3 }}
            >
              {isSignUp ? "Create an Account" : "Welcome Back"}
            </Typography>

            <form onSubmit={handleSubmit(handleSignIn)}>
              {/* Name Field (Signup Only) */}
              {isSignUp && (
                <div>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">👤</InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
              )}

              {/* Email Field */}
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">📧</InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              {/* Password Field */}
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">🔒</InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              {/* Terms and Conditions */}
              {isSignUp && (
                <div style={{ marginTop: 10, display: "flex", alignItems: "center" }}>
                  <Controller
                    name="tandc"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        color="primary"
                        sx={{ padding: 0.5 }}
                      />
                    )}
                  />
                  <Typography variant="body2">
                    I agree with the Terms and Conditions
                  </Typography>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  marginTop: 3,
                  padding: 1.5,
                  backgroundColor: "#007bff",
                  "&:hover": { backgroundColor: "#0056b3" },
                }}
                disabled={isLoggingIn || isSigningUp}
              >
                {isSignUp
                  ? isSigningUp
                    ? "Signing Up..."
                    : "Sign Up"
                  : isLoggingIn
                  ? "Logging In..."
                  : "Login"}
              </Button>
            </form>

            {/* Error Messages */}
            {(loginError || signupError) && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginTop: 2 }}
              >
                {(isSignUp
                  ? (signupError as any)?.data?.message
                  : (loginError as any)?.data?.message) || "An error occurred"}
              </Typography>
            )}

            {/* Toggle between Login and Signup */}
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <Button
                    onClick={() => setIsSignUp(false)}
                    color="primary"
                    sx={{ textTransform: "none" }}
                  >
                    Login
                  </Button>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <Button
                    onClick={() => setIsSignUp(true)}
                    color="primary"
                    sx={{ textTransform: "none" }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </AppProvider>
  );
}
