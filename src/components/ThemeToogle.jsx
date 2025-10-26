"use client";

import { Button, IconButton, useMediaQuery } from "@mui/material";
import { useTheme } from "../app/context/ThemeContext";
import Brightness7 from "@mui/icons-material/Brightness7";
import Brightness4 from "@mui/icons-material/Brightness4";

export default function ThemeToogle() {
  let isSevenHundred = useMediaQuery("@media(max-width:700px)");
  const { isDarkMode, toogleTheme } = useTheme();
  return (
    <>
      {isDarkMode ? (
        <Button
          color="inherit"
          startIcon={<Brightness7 />}
          onClick={toogleTheme}
          variant={isSevenHundred ? "outlined" : ""}
          sx={{ p: 0, width: "fit-content" }}
        >
          Theme
        </Button>
      ) : (
        <Button
          color="inherit"
          startIcon={<Brightness4 />}
          sx={{ p: 0, width: "fit-content" }}
          onClick={toogleTheme}
          variant={isSevenHundred ? "outlined" : ""}
        >
          Theme
        </Button>
      )}
    </>
  );
}
