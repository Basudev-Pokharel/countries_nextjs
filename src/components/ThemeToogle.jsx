"use client";

import { IconButton } from "@mui/material";
import { useTheme } from "../app/context/ThemeContext";
import Brightness7 from "@mui/icons-material/Brightness7";
import Brightness4 from "@mui/icons-material/Brightness4";

export default function ThemeToogle() {
  const { isDarkMode, toogleTheme } = useTheme();
  return (
    <IconButton onClick={toogleTheme}>
      {isDarkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
