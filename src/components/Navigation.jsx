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
  Drawer,
  useMediaQuery,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import SecurityIcon from "@mui/icons-material/Security";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ThemeToogle from "./ThemeToogle";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";

const Navigation = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();
  const isSevenHundred = useMediaQuery("(max-width:700px)");

  const handleNavigation = (path) => {
    router.push(path);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    console.log("clicked");
  };

  const buttonCommonStyle = {
    width: "150px",
    padding: "5px",
  };

  const DrawerList = (
    <Box
      display={"flex"}
      p={2}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      {/* // Add this after the favourites button in the navigation */}

      {/* Auth Buttons */}
      <Box
        sx={{ display: "flex", gap: 1 }}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        {user ? (
          <>
            <Typography
              variant="h4"
              sx={{
                display: "flex",
                alignItems: "center",
                mr: 2,
                opacity: 0.9,
              }}
            >
              Welcome, {user.user_metadata.full_name}
            </Typography>
            <Button
              color="inherit"
              startIcon={<AccountBoxIcon />}
              onClick={() => router.push("/profile")}
              variant="outlined"
            >
              Profile
            </Button>
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
      <Button
        color="inherit"
        startIcon={<CloseIcon />}
        onClick={() => toggleDrawer(false)}
        variant="outlined"
        sx={{ ...buttonCommonStyle, mt: 5 }}
      >
        Close
      </Button>
    </Box>
  );
  const DrawerList2 = (
    <Box
      display={"flex"}
      p={2}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Box
        display={"flex"}
        p={2}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        sx={{
          flexGrow: 1,
          display: "flex",
          gap: 1,
        }}
      >
        <Button
          color="inherit"
          startIcon={<HomeIcon />}
          onClick={() => handleNavigation("/")}
          variant="outlined"
          sx={buttonCommonStyle}
        >
          Home
        </Button>
        <Button
          color="inherit"
          startIcon={<PublicIcon />}
          onClick={() => handleNavigation("/countries")}
          variant="outlined"
          sx={buttonCommonStyle}
        >
          Countries
        </Button>

        <Box
          sx={{
            "& button": {
              width: "150px",
              padding: "5px",
            },
          }}
        >
          <ThemeToogle />
        </Box>
        {user && (
          <>
            <Button
              color="inherit"
              startIcon={<SecurityIcon />}
              onClick={() => handleNavigation("/protected")}
              variant="outlined"
              sx={buttonCommonStyle}
            >
              Protected
            </Button>
            <Button
              color="inherit"
              startIcon={<FavoriteIcon />}
              onClick={() => handleNavigation("/favourites")}
              variant="outlined"
              sx={buttonCommonStyle}
            >
              Favourites
            </Button>
          </>
        )}
      </Box>

      {/* Auth Buttons */}
      <Box
        sx={{ display: "flex", gap: 1 }}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        mt={5}
      >
        {user ? (
          <>
            <Typography
              variant="h4"
              sx={{
                display: "flex",
                alignItems: "center",
                mr: 2,
                opacity: 0.9,
              }}
            >
              Welcome, {user.user_metadata.full_name}
            </Typography>
            <Button
              color="inherit"
              startIcon={<AccountBoxIcon />}
              onClick={() => router.push("/profile")}
              variant="outlined"
              sx={buttonCommonStyle}
            >
              Profile
            </Button>
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={() => signOut()}
              variant="outlined"
              sx={buttonCommonStyle}
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
      <Button
        color="inherit"
        startIcon={<CloseIcon />}
        onClick={() => toggleDrawer(false)}
        variant="outlined"
        sx={{ ...buttonCommonStyle, mt: 5 }}
      >
        Close
      </Button>
    </Box>
  );

  return (
    <div>
      <AppBar position="static" color="primary" sx={{ mb: 3 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              gap: 1,
              "@media(max-width:700px)": {
                display: "none",
              },
            }}
          >
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
              <>
                <Button
                  color="inherit"
                  startIcon={<SecurityIcon />}
                  onClick={() => handleNavigation("/protected")}
                >
                  Protected
                </Button>
                <Button
                  color="inherit"
                  startIcon={<FavoriteIcon />}
                  onClick={() => handleNavigation("/favourites")}
                >
                  Favourites
                </Button>
              </>
            )}
          </Box>

          {/* Drawer starts here */}
          <IconButton
            aria-label="delete"
            sx={{
              display: {
                sm: "block",
                lg: "none",
              },
            }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            open={open}
            onClose={toggleDrawer(false)}
            onClick={toggleDrawer(false)}
          >
            {isSevenHundred ? DrawerList2 : DrawerList}
          </Drawer>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "none",
                lg: "flex",
              },
            }}
          >
            {/* // Add this after the favourites button in the navigation */}
            {user && (
              <Button
                color="inherit"
                onClick={() => router.push("/profile")}
                startIcon={<AccountBoxIcon />}
              >
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
                    Welcome, {user.user_metadata.full_name}
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
          </Box>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default Navigation;
