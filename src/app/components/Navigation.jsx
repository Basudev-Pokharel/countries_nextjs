"use client";
import { AppBar, Button, Toolbar } from "@mui/material";
import { useRouter } from "next/navigation";

const { useAuth } = require("../context/AuthContext");

const Navigation = ({ children }) => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  return (
    <>
      <AppBar position="static" color="gradient" sx={{ mb: 3 }}>
        <Toolbar>
          {user && (
            <Button
              color="inherit"
              onClick={() => {
                signOut();
              }}
            >
              Log Out
            </Button>
          )}
          {!user && (
            <Button
              color="inherit"
              onClick={() => {
                router.push("/login");
              }}
            >
              Log In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};
export default Navigation;
