"use client";

import Image from "next/image";
import Countries from "./countries/page";
import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Home() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      sx={{ padding: 1, width: "95%", mx: "auto" }}
    >
      <Typography variant="h2">About</Typography>
      <Typography variant="p">
        This is our React Advanced Course Project, featuring authentication and
        a backend powered by Supabase. You’re currently viewing the frontend,
        which is built using React, Next.js, and styled with Material UI (MUI).
      </Typography>
      <Stack>
        <Typography variant="h4">
          Connect with me on my social Handles:
        </Typography>

        <ButtonGroup variant="text" aria-label="Basic button group">
          <IconButton
            aria-label="LinkedIn"
            size="small"
            onClick={() =>
              (window.location.href = "https://github.com/Basudev-Pokharel")
            }
          >
            <GitHubIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="LinkedIn"
            size="small"
            onClick={() =>
              (window.location.href =
                "https://www.linkedin.com/in/basudev-pokharel/")
            }
          >
            <LinkedInIcon fontSize="inherit" />
          </IconButton>
        </ButtonGroup>
      </Stack>
    </Box>
  );
}

//new one just test
