"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import SecurityIcon from "@mui/icons-material/Security";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ThemeToogle from "./ThemeToogle";

const Navigation = ({ children }) => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div>
      <AppBar position="static" color="primary" sx={{ mb: 3 }}>
        <Toolbar>
          {/* Logo/Brand */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 0,
              mr: 4,
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => handleNavigation("/")}
          >
            Countries App
          </Typography>

          {/* Navigation Links */}
          <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
            <Button
              color="inherit"
              startIcon={<HomeIcon />}
              onClick={() => handleNavigation("/")}
            >
              Home
            </Button>

            <Button
              color="inherit"
              startIcon={<PublicIcon />}
              onClick={() => handleNavigation("/countries")}
            >
              Countries
            </Button>
            <ThemeToogle />

            {user && (
              <Button
                color="inherit"
                startIcon={<SecurityIcon />}
                onClick={() => handleNavigation("/protected")}
              >
                Protected
              </Button>
            )}
          </Box>
          {/* // Add this after the favourites button in the navigation */}
          {user && (
            <Button color="inherit" onClick={() => router.push("/profile")}>
              Profile
            </Button>
          )}

          {/* Auth Buttons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {user ? (
              <>
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mr: 2,
                    opacity: 0.9,
                  }}
                >
                  Welcome, {user.email}
                </Typography>
                <Button
                  color="inherit"
                  startIcon={<LogoutIcon />}
                  onClick={() => signOut()}
                  variant="outlined"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                color="inherit"
                startIcon={<LoginIcon />}
                onClick={() => handleNavigation("/login")}
                variant="outlined"
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default Navigation;
