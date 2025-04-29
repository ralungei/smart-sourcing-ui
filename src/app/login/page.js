"use client";
import { authApi } from "@/lib/authApi";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Eye, EyeOff, Lock, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Slogan from "../components/Slogan";

const BackgroundContainer = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("/background.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to bottom right, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.1))",
    zIndex: 0,
  },
  [theme.breakpoints.down("sm")]: {
    backgroundAttachment: "scroll",
  },
}));

const GlassContainer = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "row",
  width: "900px",
  maxWidth: "90%",
  height: "600px",
  maxHeight: "90vh",
  zIndex: 1,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    width: "100%",
    height: "auto",
  },
}));

const MarketingColumn = styled(Box)(({ theme }) => ({
  flex: "0 0 50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  color: "white",
  position: "relative",
  height: "100%",
  width: "50%",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const FormColumn = styled(Box)(({ theme }) => ({
  flex: "0 0 50%",
  padding: theme.spacing(6),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  width: "50%",
  [theme.breakpoints.down("sm")]: {
    flex: "1 1 auto",
    width: "100%",
    padding: theme.spacing(4),
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "50%",
  width: "80px",
  height: "80px",
  marginBottom: theme.spacing(3),
  border: "1px solid rgba(255, 255, 255, 0.12)",
}));

const FormContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(2),
}));

const FormFieldsContainer = styled(Box)(({ theme }) => ({
  borderRadius: "15px",
  padding: theme.spacing(3),
  width: "100%",
}));

const MarketingMessage = styled(Typography)(({ theme }) => ({
  fontWeight: "700",
  fontSize: "2.5rem",
  lineHeight: "1.2",
  marginBottom: theme.spacing(3),
  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
}));

const MarketingSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  marginBottom: theme.spacing(4),
  opacity: 0.9,
}));

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await authApi.login(username, password);
      if (response.success) {
        router.push("/");
      } else {
        setError(response.message || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <BackgroundContainer>
      <GlassContainer elevation={6}>
        <MarketingColumn>
          <Box sx={{ zIndex: 1, p: (t) => t.spacing(6, 6, 1, 6) }}>
            <MarketingMessage variant="h1">
              Smarter Sourcing. Less Work.
            </MarketingMessage>
            <MarketingSubtitle>
              AI finds, contacts, compares, and picks the best supplier — so you
              don&apos;t have to.
            </MarketingSubtitle>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              height: "100%",
            }}
          >
            <Slogan />
          </Box>
        </MarketingColumn>

        <FormColumn>
          <LogoContainer>
            <Truck size={42} style={{ color: "rgba(255, 255, 255, 0.9)" }} />
          </LogoContainer>

          <Typography
            component="h1"
            variant="h3"
            color="white"
            fontWeight="500"
            textAlign="center"
          >
            Sign In
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2, mt: 2 }}>
              {error}
            </Alert>
          )}

          <FormContainer component="form" onSubmit={handleSubmit}>
            <FormFieldsContainer>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  sx: {
                    backgroundColor: "rgba(255, 255, 255, 0.11)",
                    color: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.7)",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: { color: "rgba(255, 255, 255, 0.7)" },
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  sx: {
                    backgroundColor: "rgba(255, 255, 255, 0.11)",
                    color: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.7)",
                    },
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? "hide password" : "show password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  sx: { color: "rgba(255, 255, 255, 0.7)" },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                startIcon={<Lock size={18} />}
              >
                Sign In
              </Button>
            </FormFieldsContainer>
          </FormContainer>
        </FormColumn>
      </GlassContainer>
    </BackgroundContainer>
  );
}
